'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ── 3-D cube helpers ────────────────────────────────────────────────────
    const SIZE = Math.min(W, H) * 0.28;

    // 8 unit-cube vertices  (±1)
    const BASE_VERTS: [number, number, number][] = [
      [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
      [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1],
    ];

    // 6 faces as vertex index quads
    const FACES = [
      [0,1,2,3], // back
      [4,5,6,7], // front
      [0,4,7,3], // left
      [1,5,6,2], // right
      [0,1,5,4], // bottom
      [3,2,6,7], // top
    ];

    // 12 edges
    const EDGES = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];

    // rotate around Y then X
    const rotateVert = (
      v: [number, number, number],
      ry: number,
      rx: number
    ): [number, number, number] => {
      let [x, y, z] = v;
      // Y-axis
      const cx = x * Math.cos(ry) + z * Math.sin(ry);
      const cz = -x * Math.sin(ry) + z * Math.cos(ry);
      x = cx; z = cz;
      // X-axis
      const cy = y * Math.cos(rx) - z * Math.sin(rx);
      const cz2 = y * Math.sin(rx) + z * Math.cos(rx);
      y = cy; z = cz2;
      return [x, y, z];
    };

    // simple perspective projection
    const project = (
      v: [number, number, number]
    ): [number, number, number] => {
      const fov = 3.5;
      const scale = fov / (fov + v[2]);
      return [
        W / 2 + v[0] * SIZE * scale,
        H / 2 + v[1] * SIZE * scale,
        v[2],
      ];
    };

    // spotlight — slow circular orbit
    const spotlight = { angle: 0, r: Math.min(W, H) * 0.38, radius: Math.min(W, H) * 0.46 };

    let angleY = 0.3;
    let angleX = 0.18;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // --- deep background
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, W, H);

      // spotlight position (orbit)
      spotlight.angle += 0.0025;
      const spX = W / 2 + Math.cos(spotlight.angle) * spotlight.r * 0.55;
      const spY = H / 2 + Math.sin(spotlight.angle * 0.7) * spotlight.r * 0.35;

      // spotlight gradient (the moving flashlight)
      const grad = ctx.createRadialGradient(spX, spY, 0, spX, spY, spotlight.radius);
      grad.addColorStop(0,   'rgba(0, 180, 216, 0.07)');
      grad.addColorStop(0.4, 'rgba(0, 140, 180, 0.03)');
      grad.addColorStop(1,   'rgba(0,   0,   0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // --- rotate cube slowly
      angleY += 0.003;
      angleX += 0.0012;

      // project all 8 verts
      const proj = BASE_VERTS.map(v => project(rotateVert(v, angleY, angleX)));

      // draw faces (back-to-front painter's sort by avg Z)
      const sortedFaces = FACES
        .map((f, i) => ({ f, i, z: f.reduce((s, vi) => s + proj[vi][2], 0) / 4 }))
        .sort((a, b) => a.z - b.z);

      sortedFaces.forEach(({ f }) => {
        ctx.beginPath();
        ctx.moveTo(proj[f[0]][0], proj[f[0]][1]);
        for (let k = 1; k < f.length; k++) ctx.lineTo(proj[f[k]][0], proj[f[k]][1]);
        ctx.closePath();

        // face fill: darkest when away from spotlight, slightly lit when near
        const cx = f.reduce((s, vi) => s + proj[vi][0], 0) / 4;
        const cy = f.reduce((s, vi) => s + proj[vi][1], 0) / 4;
        const dist = Math.hypot(cx - spX, cy - spY);
        const lit = Math.max(0, 1 - dist / spotlight.radius);
        const alpha = 0.06 + lit * 0.12;
        ctx.fillStyle = `rgba(10, 20, 40, ${alpha})`;
        ctx.fill();
      });

      // draw edges
      EDGES.forEach(([a, b]) => {
        const ax = proj[a][0], ay = proj[a][1];
        const bx = proj[b][0], by = proj[b][1];
        const mx = (ax + bx) / 2, my = (ay + by) / 2;

        // proximity to spotlight
        const dist = Math.hypot(mx - spX, my - spY);
        const lit = Math.max(0, 1 - dist / (spotlight.radius * 0.7));

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);

        const edgeAlpha = 0.08 + lit * 0.55;
        const edgeWidth = 0.5 + lit * 1.5;
        ctx.strokeStyle = `rgba(0, 180, 216, ${edgeAlpha})`;
        ctx.lineWidth = edgeWidth;
        ctx.stroke();

        // glow on lit edges
        if (lit > 0.25) {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(72, 202, 228, ${lit * 0.18})`;
          ctx.lineWidth = edgeWidth * 4;
          ctx.stroke();
        }
      });

      // vignette overlay
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.15, W/2, H/2, H*0.8);
      vig.addColorStop(0, 'rgba(3,3,5,0)');
      vig.addColorStop(1, 'rgba(3,3,5,0.82)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#030305' }}
    >
      <style>{`
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 160px 2rem 0;
          max-width: 900px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-content { padding-top: 90px; }
          .hero-desc { margin-bottom: 2.5rem !important; }
        }
        .hero-wordmark {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: clamp(1.9rem, 8vw, 3.8rem);
          letter-spacing: clamp(0.1em, 2.5vw, 0.6em);
          text-transform: uppercase;
          color: var(--white);
          margin-bottom: 0.5rem;
          line-height: 1;
          width: 100%;
          overflow: hidden;
        }
        .hero-wordmark span { color: var(--cyan); }
        .hero-divider {
          width: 60px;
          height: 1px;
          background: var(--cyan-dim);
          margin: 1.8rem auto;
          opacity: 0.6;
        }
        .hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1.5rem, 3.5vw, 2.8rem);
          letter-spacing: 0.08em;
          color: var(--text-bright);
          margin-bottom: 2rem;
          line-height: 1.2;
        }
        .hero-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: clamp(0.75rem, 1.3vw, 0.9rem);
          letter-spacing: 0.18em;
          color: var(--text-dim);
          margin-bottom: 4rem;
          line-height: 1.9;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        .hero-scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--cyan-dim), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>

      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <motion.div
          className="hero-wordmark"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Wishbox <span>Intelligence</span>
        </motion.div>

        <motion.div
          className="hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.h1
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Turning Wishes Into Facts
        </motion.h1>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
        >
          We deliver decisive intelligence in moments where uncertainty is not an option.
        </motion.p>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <div className="hero-scroll-line" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
