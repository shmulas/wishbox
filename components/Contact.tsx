'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type Phase = 'idle' | 'classifying' | 'encrypting' | 'transmitting' | 'done';

const TERMINAL_LINES = [
  '> INITIATING SECURE CHANNEL...',
  '> ENCRYPTING PAYLOAD...',
  '> ROUTING VIA CLASSIFIED NODE...',
  '> TRANSMITTING...',
  '> WISH RECEIVED.',
];

function useTypewriter(lines: string[], active: boolean) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (!active) { setDisplayed([]); setCurrentLine(0); setCurrentChar(0); return; }
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[currentLine]]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [active, currentLine, currentChar, lines]);

  const partial = active && currentLine < lines.length
    ? lines[currentLine].slice(0, currentChar)
    : '';

  return { displayed, partial, done: currentLine >= lines.length };
}

function ShootingStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    const stars: { x: number; y: number; r: number; alpha: number }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.9 + 0.2,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    // shooting stars pool
    type Meteor = { x: number; y: number; vx: number; vy: number; len: number; alpha: number; done: boolean };
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = 18 + Math.random() * 14;
      meteors.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 80 + Math.random() * 80,
        alpha: 1,
        done: false,
      });
    };

    spawnMeteor();
    const spawnTimer = setInterval(spawnMeteor, 1500);

    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(3,3,5,0.25)';
      ctx.fillRect(0, 0, W, H);

      // static stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,220,${s.alpha})`;
        ctx.fill();
      });

      // meteors
      meteors.forEach(m => {
        if (m.done) return;
        const tailX = m.x - m.vx * (m.len / (Math.sqrt(m.vx ** 2 + m.vy ** 2)));
        const tailY = m.y - m.vy * (m.len / (Math.sqrt(m.vx ** 2 + m.vy ** 2)));

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, `rgba(0,180,216,0)`);
        grad.addColorStop(0.6, `rgba(0,180,216,${m.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${m.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // head glow
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
        glow.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        glow.addColorStop(1, `rgba(0,180,216,0)`);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.018;
        if (m.alpha <= 0 || m.x > W + 50 || m.y > H + 50) m.done = true;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      clearInterval(spawnTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '320px', display: 'block' }}
    />
  );
}

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const terminalActive = phase === 'encrypting' || phase === 'transmitting';
  const { displayed, partial, done: termDone } = useTypewriter(TERMINAL_LINES, terminalActive);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhase('classifying');
    timerRef.current = setTimeout(() => setPhase('encrypting'), 900);
  };

  useEffect(() => {
    if (termDone && phase === 'encrypting') {
      timerRef.current = setTimeout(() => setPhase('transmitting'), 400);
    }
    if (phase === 'transmitting') {
      timerRef.current = setTimeout(() => setPhase('done'), 1800);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [termDone, phase]);

  return (
    <section id="contact" style={{ background: 'var(--black)', padding: '10rem 4rem' }}>
      <style>{`
        .contact-inner { max-width: 760px; margin: 0 auto; }

        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--white);
          letter-spacing: 0.05em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }
        .contact-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          color: var(--text-dim);
          letter-spacing: 0.05em;
          margin-bottom: 4rem;
        }
        .contact-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--cyan-dim), transparent);
          opacity: 0.25;
          margin-bottom: 4rem;
        }

        /* ── Form ── */
        .contact-form { display: flex; flex-direction: column; gap: 3rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .form-field { position: relative; }
        .form-field label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 0.9rem;
          transition: color 0.3s;
        }
        .form-field.is-focused label { color: var(--cyan); }
        .form-field input, .form-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,180,216,0.12);
          padding: 0.5rem 0;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.1rem;
          color: var(--text-bright);
          outline: none;
          transition: border-color 0.4s;
          resize: none;
          letter-spacing: 0.03em;
        }
        .form-field input::placeholder, .form-field textarea::placeholder {
          color: rgba(106,106,136,0.35);
          font-style: italic;
        }
        .form-field.is-focused input, .form-field.is-focused textarea {
          border-bottom-color: var(--cyan);
        }
        .form-underline {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: var(--cyan);
          transition: width 0.4s ease;
          pointer-events: none;
        }
        .form-field.is-focused .form-underline { width: 100%; }

        .contact-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .contact-submit {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.68rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--cyan);
          border: 1px solid var(--cyan);
          padding: 1rem 2.8rem;
          transition: background 0.3s, color 0.3s;
        }
        .contact-submit:hover { background: transparent; color: var(--cyan); }

        .contact-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 0.95rem;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        /* ── Animation container ── */
        .anim-box {
          position: relative;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── CLASSIFIED stamp ── */
        .classified-stamp {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: 0.35em;
          color: transparent;
          border: 4px solid rgba(200,30,30,0.85);
          padding: 0.4em 0.8em;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0 0 20px rgba(200,30,30,0.3), inset 0 0 20px rgba(200,30,30,0.05);
          -webkit-text-stroke: 2px rgba(200,30,30,0.85);
          user-select: none;
        }

        /* ── Terminal ── */
        .terminal {
          font-family: 'Courier New', monospace;
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          color: var(--cyan);
          line-height: 2;
          letter-spacing: 0.05em;
          width: 100%;
          max-width: 500px;
          text-align: left;
        }
        .terminal-cursor {
          display: inline-block;
          width: 8px; height: 1.1em;
          background: var(--cyan);
          vertical-align: middle;
          margin-left: 2px;
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Radar rings ── */
        .radar-wrap {
          position: relative;
          width: 180px; height: 180px;
          display: flex; align-items: center; justify-content: center;
        }
        .radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--cyan);
          animation: radarPulse 1.6s ease-out infinite;
        }
        .radar-ring:nth-child(1){ width:40px;  height:40px;  animation-delay:0s; }
        .radar-ring:nth-child(2){ width:40px;  height:40px;  animation-delay:0.4s; }
        .radar-ring:nth-child(3){ width:40px;  height:40px;  animation-delay:0.8s; }
        .radar-ring:nth-child(4){ width:40px;  height:40px;  animation-delay:1.2s; }
        .radar-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 12px var(--cyan), 0 0 24px rgba(0,180,216,0.4);
          z-index: 1;
        }
        @keyframes radarPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(5.5); opacity: 0; }
        }

        /* ── Success ── */
        .success-text {
          text-align: center;
        }
        .success-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--cyan);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }
        .success-sub {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; gap: 2.5rem; }
          section#contact { padding: 6rem 1.5rem; }
          .contact-footer-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <motion.div
        className="contact-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h2 className="contact-title">Make A Wish</h2>
        <p className="contact-sub">From intent to intelligence</p>
        <div className="contact-divider" />

        <AnimatePresence mode="wait">

          {/* ── FORM ── */}
          {phase === 'idle' && (
            <motion.form
              key="form"
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.4 } }}
            >
              <div className="form-row">
                {[
                  { id: 'name', label: 'Name', placeholder: 'Your full name' },
                  { id: 'tel',  label: 'Tel',  placeholder: '+1 (000) 000-0000' },
                ].map(({ id, label, placeholder }) => (
                  <div key={id} className={`form-field${focused === id ? ' is-focused' : ''}`}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id} type={id === 'tel' ? 'tel' : 'text'}
                      placeholder={placeholder} required
                      onFocus={() => setFocused(id)}
                      onBlur={() => setFocused(null)}
                    />
                    <div className="form-underline" />
                  </div>
                ))}
              </div>

              <div className={`form-field${focused === 'wish' ? ' is-focused' : ''}`}>
                <label htmlFor="wish">Your Wish</label>
                <textarea
                  id="wish" rows={4}
                  placeholder="Describe what you need to know..."
                  required
                  onFocus={() => setFocused('wish')}
                  onBlur={() => setFocused(null)}
                />
                <div className="form-underline" />
              </div>

              <div className="contact-footer-row">
                <button type="submit" className="contact-submit">
                  Drop it into the WishBox
                </button>
                <span className="contact-tagline">Turning Wishes Into Facts</span>
              </div>
            </motion.form>
          )}

          {/* ── SHOOTING STAR ── */}
          {phase === 'classifying' && (
            <motion.div
              key="shooting-star"
              className="anim-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShootingStar />
            </motion.div>
          )}

          {/* ── TERMINAL ── */}
          {(phase === 'encrypting') && (
            <motion.div
              key="terminal"
              className="anim-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="terminal">
                {displayed.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {partial && (
                  <div>
                    {partial}<span className="terminal-cursor" />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── RADAR ── */}
          {phase === 'transmitting' && (
            <motion.div
              key="radar"
              className="anim-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="radar-wrap">
                <div className="radar-ring" />
                <div className="radar-ring" />
                <div className="radar-ring" />
                <div className="radar-ring" />
                <div className="radar-dot" />
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS ── */}
          {phase === 'done' && (
            <motion.div
              key="success"
              className="anim-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="success-text">
                <p className="success-headline">Wish Received.</p>
                <p className="success-sub">We will be in contact within 24 hours.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </section>
  );
}
