'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 30, suffix: '+', label: 'Languages spoken\nby our operatives' },
  { value: 6, suffix: '', label: 'Continents of\nactive operations' },
  { value: 100, suffix: '%', label: 'Legally compliant\nmethodologies' },
  { value: 2010, suffix: '', label: 'Trusted by leading\nfirms globally' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="pillars" style={{ background: 'var(--dark)', padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)', borderTop: '1px solid rgba(0,180,216,0.07)', borderBottom: '1px solid rgba(0,180,216,0.07)' }}>
      <style>{`
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1100px;
          margin: 0 auto;
          gap: 0;
        }
        .pillar-item {
          text-align: center;
          padding: 2rem;
          position: relative;
        }
        .pillar-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0,180,216,0.12);
        }
        .pillar-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3rem, 5vw, 4.5rem);
          color: var(--cyan);
          line-height: 1;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .pillar-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          line-height: 1.8;
          white-space: pre-line;
        }
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .pillar-item:nth-child(2)::after { display: none; }
          section#pillars { padding: 5rem 1.5rem; }
        }
      `}</style>

      <div className="pillars-grid" ref={ref}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="pillar-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <div className="pillar-num">
              <CountUp target={s.value} suffix={s.suffix} active={inView} />
            </div>
            <div className="pillar-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
