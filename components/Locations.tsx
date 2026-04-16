'use client';

import { motion } from 'framer-motion';

const cities = ['Tel Aviv', 'London', 'New York', 'Singapore', 'Zurich'];

export default function Locations() {
  return (
    <section id="locations" style={{ background: 'var(--black)', padding: '9rem 4rem' }}>
      <style>{`
        .locations-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .locations-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: var(--white);
          margin-bottom: 3rem;
          letter-spacing: 0.08em;
        }
        .locations-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .location-city {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: clamp(0.75rem, 1.5vw, 0.9rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-dim);
          padding: 0.5rem 1.2rem;
          transition: color 0.3s;
        }
        .location-city:hover {
          color: var(--cyan-light);
        }
        .location-dot {
          color: var(--cyan);
          opacity: 0.5;
          font-size: 1.2rem;
          line-height: 1;
        }
        .locations-sub {
          margin-top: 3rem;
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-dim);
          opacity: 0.5;
        }
      `}</style>

      <motion.div
        className="locations-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>Global Presence</div>
        <h2 className="locations-title">Operating Worldwide</h2>

        <div className="locations-list">
          {cities.map((city, i) => (
            <span key={city} style={{ display: 'flex', alignItems: 'center' }}>
              <span className="location-city">{city}</span>
              {i < cities.length - 1 && <span className="location-dot">·</span>}
            </span>
          ))}
        </div>

        <p className="locations-sub">Active Operations Across 6 Continents</p>
      </motion.div>
    </section>
  );
}
