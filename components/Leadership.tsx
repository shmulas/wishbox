'use client';

import { motion } from 'framer-motion';

const leaders = [
  { name: 'Jonathan Reed', role: 'Senior Partner' },
  { name: 'Michael Stone', role: 'Senior Partner' },
  { name: 'David Harman', role: 'Senior Partner' },
  { name: '[ Undisclosed ]', role: 'In Recruitment', pending: true },
];

export default function Leadership() {
  return (
    <section id="leadership" style={{ background: 'var(--surface)', padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)' }}>
      <style>{`
        .leadership-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .leadership-header {
          margin-bottom: 5rem;
        }
        .leadership-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: var(--white);
          margin-top: 1rem;
          letter-spacing: 0.04em;
          line-height: 1.3;
        }
        .leadership-sub {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          margin-top: 1rem;
          line-height: 1.8;
        }
        .leadership-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(0,180,216,0.08);
          border: 1px solid rgba(0,180,216,0.08);
        }
        .leader-card {
          background: var(--surface2);
          padding: 3rem 2.5rem;
          position: relative;
          transition: background 0.3s;
        }
        .leader-card:hover {
          background: var(--surface3);
        }
        .leader-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--cyan);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .leader-card:hover::before {
          transform: scaleX(1);
        }
        .leader-index {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 2.5rem;
          color: rgba(0,180,216,0.15);
          line-height: 1;
          margin-bottom: 2rem;
          transition: color 0.3s;
        }
        .leader-card:hover .leader-index {
          color: rgba(0,180,216,0.35);
        }
        .leader-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.4rem;
          color: var(--text-bright);
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
          transition: color 0.3s;
        }
        .leader-card:hover .leader-name {
          color: var(--white);
        }
        .leader-role {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: color 0.3s;
        }
        .leader-card.is-pending .leader-name {
          color: var(--text-dim);
          font-style: italic;
        }
        .leader-card.is-pending .leader-role {
          color: var(--cyan-dim);
        }
        @media (max-width: 900px) {
          .leadership-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .leadership-grid { grid-template-columns: 1fr; }
          section#leadership { padding: 6rem 1.5rem; }
        }
      `}</style>

      <motion.div
        className="leadership-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="leadership-header">
          <div className="section-label">The Leadership</div>
          <h2 className="leadership-title">
            Built on Experience.<br />Proven in the Field.
          </h2>
          <p className="leadership-sub">
            A unique combination of legal, investigative and intelligence expertise — built to deliver results where it counts.
          </p>
        </div>

        <div className="leadership-grid">
          {leaders.map((l, i) => (
            <motion.div
              key={l.name}
              className={`leader-card${l.pending ? ' is-pending' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="leader-index">{String(i + 1).padStart(2, '0')}</div>
              <div className="leader-name">{l.name}</div>
              <div className="leader-role">{l.role}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
