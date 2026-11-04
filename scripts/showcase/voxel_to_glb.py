# Convertit un modele voxel de Pet Fusion (module Luau de boites) en GLB leger, couleurs en attribut de sommet.
# Usage : blender -b --python voxel_to_glb.py -- <module.luau> <sortie.glb>
import os
import re
import sys

import bpy

args = sys.argv[sys.argv.index("--") + 1:]
src, out = args[0], args[1]
text = open(src, encoding="utf8").read()
num = r"(-?[\d.]+)"
vec = rf"V\({num},\s*{num},\s*{num}\)"
BOX = re.compile(rf'\{{\s*"\w+",\s*{vec},\s*{vec},\s*C\((\d+),\s*(\d+),\s*(\d+)\),\s*"(\w+)"')

FACES = [(0, 2, 3, 1), (4, 5, 7, 6), (0, 1, 5, 4), (2, 6, 7, 3), (0, 4, 6, 2), (1, 3, 7, 5)]


def to_linear(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


verts, faces, colors, neon = [], [], [], []
for m in BOX.finditer(text):
    cx, cy, cz, sx, sy, sz = map(float, m.groups()[:6])
    rgb = tuple(to_linear(int(x)) for x in m.groups()[6:9])
    base = len(verts)
    for i in range(8):
        # Roblox (x, y, z) vers Blender (x, -z, y)
        x = cx + (sx / 2 if i & 4 else -sx / 2)
        y = cy + (sy / 2 if i & 2 else -sy / 2)
        z = cz + (sz / 2 if i & 1 else -sz / 2)
        verts.append((x, -z, y))
    for f in FACES:
        faces.append(tuple(base + i for i in f))
        colors.append(rgb)
        neon.append(m.group(10) == "Neon")

bpy.ops.wm.read_factory_settings(use_empty=True)
mesh = bpy.data.meshes.new("Voxel")
mesh.from_pydata(verts, [], faces)
mesh.update()
attr = mesh.color_attributes.new("Col", "FLOAT_COLOR", "CORNER")
for poly, rgb in zip(mesh.polygons, colors):
    for li in poly.loop_indices:
        attr.data[li].color = (*rgb, 1)


def material(name, glow):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    node = nt.nodes.new("ShaderNodeVertexColor")
    node.layer_name = "Col"
    nt.links.new(node.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.65
    if glow:
        nt.links.new(node.outputs["Color"], bsdf.inputs["Emission Color"])
        bsdf.inputs["Emission Strength"].default_value = 1.5
    return mat


mesh.materials.append(material("Matte", False))
mesh.materials.append(material("Neon", True))
for poly, glow in zip(mesh.polygons, neon):
    poly.material_index = 1 if glow else 0
obj = bpy.data.objects.new("Voxel", mesh)
bpy.context.collection.objects.link(obj)

bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    export_draco_mesh_compression_enable=True,
    export_animations=False,
    export_vertex_color="ACTIVE",
)
print(f"SHOWCASE {os.path.basename(out)} {len(faces) // 6} boites {os.path.getsize(out) // 1024} Ko")
