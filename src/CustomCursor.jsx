import { useEffect, useRef, useState } from 'react';

const HOVERABLE = 'a, button, [role="button"], .resume-card-wrap, .sp-card-wrap, .sc-bar-outer, .sc-info-bar-wrap, .wo-backdrop';

export default function CustomCursor() {
  const dotRef      = useRef(null);
  const ringWrapRef = useRef(null);
  const pos         = useRef({ x: -200, y: -200 });
  const ringPos     = useRef({ x: -200, y: -200 });
  const [state, setState] = useState('idle'); // 'idle' | 'hover' | 'active'

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverable = el && el.closest(HOVERABLE);
      setState(prev => prev === 'active' ? 'active' : (hoverable ? 'hover' : 'idle'));
    };

    const onDown = () => setState('active');

    const onUp = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverable = el && el.closest(HOVERABLE);
      setState(hoverable ? 'hover' : 'idle');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    let raf;
    const tick = () => {
      const lag = 0.13;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lag;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lag;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringWrapRef.current) {
        ringWrapRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }

        .cc-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          background: #c4001a;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transition: background 0.1s ease, width 0.1s ease, height 0.1s ease;
        }
        .cc-dot.hover  { background: #ffffff; width: 10px; height: 10px; }
        .cc-dot.active { background: #ff2a2a; width: 5px;  height: 5px;  }

        .cc-ring-wrap {
          position: fixed; top: 0; left: 0;
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
        }
        .cc-ring {
          width: 36px; height: 36px;
          border: 2px solid rgba(60, 226, 255, 0.6);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: cc-spin 5s linear infinite;
          transition:
            width       0.25s cubic-bezier(0.22, 1, 0.36, 1),
            height      0.25s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.2s ease;
        }
        @keyframes cc-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .cc-ring.hover  { width: 52px; height: 52px; border-color: #3ce2ff; }
        .cc-ring.active { width: 22px; height: 22px; border-color: #c4001a; }
      `}</style>

      <div
        ref={dotRef}
        className={`cc-dot${state !== 'idle' ? ' ' + state : ''}`}
      />
      <div ref={ringWrapRef} className="cc-ring-wrap">
        <div className={`cc-ring${state !== 'idle' ? ' ' + state : ''}`} />
      </div>
    </>
  );
}
