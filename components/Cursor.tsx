'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

      // Ring lerps behind
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    };
    const onLeave = () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    // Hover on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background: #00b4d8;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s, background 0.2s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(0, 180, 216, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-color 0.2s;
        }
        .cursor-dot.cursor-hover {
          width: 12px;
          height: 12px;
          top: -6px;
          left: -6px;
          background: #48cae4;
        }
        .cursor-ring.cursor-hover {
          width: 50px;
          height: 50px;
          top: -25px;
          left: -25px;
          border-color: rgba(0, 180, 216, 0.7);
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
