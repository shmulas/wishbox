'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    code: 'HUMINT',
    label: 'Human Intelligence',
    desc: 'Field operatives and trusted networks delivering ground-truth intelligence from primary sources.',
  },
  {
    code: 'OSINT',
    label: 'Open Source Analysis',
    desc: 'Structured exploitation of public data, dark web signals, and cross-jurisdictional records.',
  },
  {
    code: 'TECHINT',
    label: 'Technical Intelligence',
    desc: 'Digital forensics, communications analysis, and technical vulnerability assessment.',
  },
];

export default function Methodology() {
  return (
    <section id="methodology" style={{ background: 'var(--surface)', padding: '10rem 4rem' }}>
      <style>{`
        .method-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .method-quote-wrap {
          text-align: center;
          margin-bottom: 7rem;
          padding-bottom: 7rem;
          border-bottom: 1px solid rgba(0,180,216,0.08);
        }
        .method-quote {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1.4rem, 2.8vw, 2.2rem);
          line-height: 1.6;
          color: var(--text-bright);
          max-width: 820px;
          margin: 0 auto;
        }
        .method-quote-mark {
          font-size: 5rem;
          line-height: 0;
          vertical-align: -0.5em;
          color: var(--cyan-dim);
          opacity: 0.4;
          font-family: 'Cormorant Garamond', serif;
        }
        .method-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem;
        }
        .method-col {
          position: relative;
          padding-top: 2rem;
        }
        .method-col::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40px;
          height: 2px;
          background: var(--cyan);
          opacity: 0.6;
        }
        .method-code {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 0.75rem;
        }
        .method-label {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.4rem;
          color: var(--white);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }
        .method-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.8rem;
          line-height: 1.9;
          color: var(--text-dim);
        }
        @media (max-width: 768px) {
          .method-cols { grid-template-columns: 1fr; gap: 3rem; }
          section#methodology { padding: 6rem 1.5rem; }
        }
      `}</style>

      <div className="method-inner">
        <motion.div
          className="method-quote-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '3rem' }}>Methodology</div>
          <blockquote className="method-quote">
            <span className="method-quote-mark">&ldquo;</span>
            Every engagement begins with a single question: What does our client need to win?
            <span className="method-quote-mark">&rdquo;</span>
          </blockquote>
        </motion.div>

        <div className="method-cols">
          {pillars.map((p, i) => (
            <motion.div
              key={p.code}
              className="method-col"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div className="method-code">{p.code}</div>
              <div className="method-label">{p.label}</div>
              <p className="method-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
