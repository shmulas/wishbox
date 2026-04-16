'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--dark)', padding: '10rem 2rem' }}>
      <style>{`
        .about-inner {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── Architects title with shimmer ── */
        .about-architects {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(1rem, 2.2vw, 1.5rem);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          display: inline-block;
          position: relative;

          /* base color */
          color: var(--cyan-dim);

          /* shimmer via background-clip */
          background: linear-gradient(
            100deg,
            var(--cyan-dim)   0%,
            var(--cyan-dim)   30%,
            var(--cyan-light) 48%,
            #ffffff            50%,
            var(--cyan-light) 52%,
            var(--cyan-dim)   70%,
            var(--cyan-dim)   100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%   { background-position: 200% center; }
          60%  { background-position: -50% center; }
          100% { background-position: -50% center; }
        }

        .about-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--white);
          letter-spacing: 0.12em;
          margin-bottom: 2.5rem;
          line-height: 1.3;
        }
        .about-headline span {
          color: var(--cyan);
        }
        .about-divider {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, var(--cyan-dim), transparent);
          margin: 0 auto 2.5rem;
          opacity: 0.5;
        }
        .about-body {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: clamp(0.82rem, 1.4vw, 0.95rem);
          line-height: 2.1;
          color: var(--text);
          letter-spacing: 0.05em;
        }
      `}</style>

      <motion.div
        className="about-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.p
          className="about-architects"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.45em' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          The Architects of Facts
        </motion.p>

        <h2 className="about-headline">
          Clarity.<span> Precision.</span> Advantage.
        </h2>

        <div className="about-divider" />

        <p className="about-body">
          With years of experience in the fields of intelligence, law, and investigative —
          we don&apos;t interpret the facts, we create the advantage.
        </p>
      </motion.div>
    </section>
  );
}
