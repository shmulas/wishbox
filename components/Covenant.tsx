'use client';

import { motion } from 'framer-motion';

const pledges = [
  {
    title: 'Clean Intelligence',
    desc: 'Adhering to strict legal and ethical standards to ensure results are sustainable and usable in any forum.',
  },
  {
    title: 'Hermetic Discretion',
    desc: 'Absolute commitment to client anonymity and the sensitivity of the mission — from intake to delivery.',
  },
  {
    title: 'Bespoke Architecture',
    desc: 'Tailor-made collection plans focused on the "Golden Evidence" — the breakthrough that decides the campaign.',
  },
];

export default function Covenant() {
  return (
    <section id="covenant" style={{ background: 'var(--dark)', padding: '10rem 4rem' }}>
      <style>{`
        .covenant-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .covenant-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: var(--white);
          margin-top: 1rem;
          margin-bottom: 5rem;
          letter-spacing: 0.04em;
        }
        .covenant-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        .covenant-card {
          padding: 2.5rem;
          border: 1px solid rgba(0,180,216,0.1);
          background: var(--surface2);
          position: relative;
          transition: border-color 0.35s, background 0.35s;
        }
        .covenant-card:hover {
          border-color: rgba(0,180,216,0.3);
          background: var(--surface3);
        }
        .covenant-number {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 3rem;
          color: rgba(0,180,216,0.12);
          line-height: 1;
          margin-bottom: 1.5rem;
          transition: color 0.3s;
        }
        .covenant-card:hover .covenant-number {
          color: rgba(0,180,216,0.3);
        }
        .covenant-bar {
          width: 30px;
          height: 2px;
          background: var(--cyan);
          opacity: 0.5;
          margin-bottom: 1.5rem;
          transition: width 0.4s, opacity 0.4s;
        }
        .covenant-card:hover .covenant-bar {
          width: 50px;
          opacity: 1;
        }
        .covenant-card-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-bright);
          margin-bottom: 1.2rem;
          transition: color 0.3s;
        }
        .covenant-card:hover .covenant-card-title {
          color: var(--cyan-light);
        }
        .covenant-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.8rem;
          line-height: 2;
          color: var(--text-dim);
          transition: color 0.3s;
        }
        .covenant-card:hover .covenant-desc {
          color: var(--text);
        }
        @media (max-width: 800px) {
          .covenant-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          section#covenant { padding: 6rem 1.5rem; }
        }
      `}</style>

      <motion.div
        className="covenant-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">The Wishbox Covenant</div>
        <h2 className="covenant-title">Bound by Integrity. Driven by Results.</h2>

        <div className="covenant-grid">
          {pledges.map((p, i) => (
            <motion.div
              key={p.title}
              className="covenant-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="covenant-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="covenant-bar" />
              <div className="covenant-card-title">{p.title}</div>
              <p className="covenant-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
