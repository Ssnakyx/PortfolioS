# Convertit un modele (FBX ou GLB) en GLB leger pour le showcase du site.
# Usage : blender -b --python convert_model.py -- <source> <sortie.glb> [texture_max]
# TEXDIRS (separes par ;) : dossiers ou retrouver les textures referencees par le FBX.
# COLORS (JSON) : couleurs que le jeu applique a l'execution, car absentes du FBX.
#   {"materials": {"Cle": {"color": [r, g, b], "neon": true}}} : objets nommes "<Piece>__<Cle>" (Ylyndore)
#   {"tints": {"Piece": "#RRGGBB"}, "baseTexture": "<png>"} : teinte multipliee sur la texture (Candy Cloud Tycoon)
import json
import os
import re
import sys

import bpy

args = sys.argv[sys.argv.index("--") + 1:]
src, out = args[0], args[1]
tex_max = int(args[2]) if len(args) > 2 else 512

bpy.ops.wm.read_factory_settings(use_empty=True)
if src.lower().endswith(".glb"):
    bpy.ops.import_scene.gltf(filepath=src)
else:
    bpy.ops.import_scene.fbx(filepath=src)

dirs = [d for d in os.environ.get("TEXDIRS", "").split(";") if d]
for img in list(bpy.data.images):
    if img.size[0] == 0:
        base = os.path.basename(bpy.path.abspath(img.filepath).replace("\\", "/"))
        found = next((os.path.join(d, base) for d in dirs if os.path.exists(os.path.join(d, base))), None)
        if found:
            img.filepath = found
            img.reload()

# Une texture introuvable casserait le GLB : on retire son noeud.
for mat in bpy.data.materials:
    if mat.use_nodes:
        for node in list(mat.node_tree.nodes):
            if node.type == "TEX_IMAGE" and (node.image is None or node.image.size[0] == 0):
                mat.node_tree.nodes.remove(node)


def linear(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


colors = json.loads(os.environ.get("COLORS", "{}"))
for obj in [o for o in bpy.data.objects if o.type == "MESH"]:
    base = re.sub(r"\.\d+$", "", obj.name)
    key = base.split("__")[-1]
    entry = colors.get("materials", {}).get(key)
    if entry:
        mat = bpy.data.materials.get(key) or bpy.data.materials.new(key)
        mat.use_nodes = True
        bsdf = next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
        rgb = [linear(c) for c in entry["color"]]
        bsdf.inputs["Base Color"].default_value = (*rgb, 1)
        bsdf.inputs["Roughness"].default_value = 0.8
        if entry.get("neon"):
            bsdf.inputs["Emission Color"].default_value = (*rgb, 1)
            bsdf.inputs["Emission Strength"].default_value = 1.5
        obj.data.materials.clear()
        obj.data.materials.append(mat)
    tint = colors.get("tints", {}).get(key)
    if tint:
        rgb = [linear(int(tint[i:i + 2], 16)) for i in (1, 3, 5)]
        for slot in obj.material_slots:
            mat = slot.material
            mat.use_nodes = True
            nt = mat.node_tree
            bsdf = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
            link = next(iter(bsdf.inputs["Base Color"].links), None)
            if link is None and colors.get("baseTexture"):
                node = nt.nodes.new("ShaderNodeTexImage")
                node.image = bpy.data.images.load(colors["baseTexture"], check_existing=True)
                link = nt.links.new(node.outputs["Color"], bsdf.inputs["Base Color"])
            if link is None:
                bsdf.inputs["Base Color"].default_value = (*rgb, 1)
                continue
            mix = nt.nodes.new("ShaderNodeMix")
            mix.data_type = "RGBA"
            mix.blend_type = "MULTIPLY"
            mix.inputs["Factor"].default_value = 1
            nt.links.new(link.from_socket, mix.inputs["A"])
            mix.inputs["B"].default_value = (*rgb, 1)
            nt.links.new(mix.outputs["Result"], bsdf.inputs["Base Color"])

for img in bpy.data.images:
    w, h = img.size
    if w and max(w, h) > tex_max:
        scale = tex_max / max(w, h)
        img.scale(max(1, int(w * scale)), max(1, int(h * scale)))

bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    export_image_format="WEBP",
    export_image_quality=80,
    export_draco_mesh_compression_enable=True,
    export_animations=False,
)
print(f"SHOWCASE {os.path.basename(out)} {os.path.getsize(out) // 1024} Ko")
