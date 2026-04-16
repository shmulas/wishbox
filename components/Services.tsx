'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    numeral: 'I',
    title: 'Evidence-Grade Intelligence™',
    category: 'Strategic Litigation Support & Complex Disputes',
    intro: 'WISHBOX serves as a force multiplier for legal teams. While counsel manages the courtroom, we secure the evidentiary foundation to shift the balance of power.',
    bullets: [
      { label: 'Forensic Evaluation', desc: 'Deep analysis of the legal file and factual-evidential basis.' },
      { label: 'Strategic Gaps', desc: 'Identifying vulnerabilities to force early resolution or tactical leverage.' },
      { label: 'Surgical Collection', desc: 'Global mapping and securing of evidence via OSINT, HUMINT, and specialized data mining.' },
      { label: 'The Accelerator', desc: 'We build an evolving intelligence roadmap that ensures the legal team maintains an offensive initiative.' },
    ],
  },
  {
    numeral: 'II',
    title: 'Competitive Supremacy',
    category: 'Strategic Business Intelligence',
    intro: 'In modern markets, the information you lack is your greatest risk. We unmask hidden intentions and see through corporate facades.',
    bullets: [
      { label: 'Market Deep-Dives', desc: 'Intelligence on competitors and significant market players.' },
      { label: 'Operational Leverage', desc: 'Identifying financial, regulatory, or operational weaknesses for client advantage.' },
      { label: 'Influence Mapping', desc: 'Uncovering clandestine power centers and cross-border connections.' },
    ],
  },
  {
    numeral: 'III',
    title: 'Counter-Intelligence',
    category: 'Protecting What Cannot Be Exposed',
    intro: 'In a world where information is leverage, your vulnerabilities are someone else\'s strategy. We identify threats before they materialize — from within and from without.',
    bullets: [
      { label: 'Leak Detection', desc: 'Identifying the source and scope of internal information breaches before they reach hostile hands.' },
      { label: 'Threat Mapping', desc: 'Profiling external actors, competitors, or adversaries conducting surveillance or intelligence operations against your organization.' },
      { label: 'Digital Exposure Audit', desc: 'Assessing your digital footprint and identifying data points that can be exploited against you.' },
      { label: 'Insider Threat Analysis', desc: 'Detecting behavioral and operational indicators of internal compromise or espionage.' },
    ],
  },
  {
    numeral: 'IV',
    title: 'Intelligence Due Diligence',
    category: 'Strategic Transaction Support',
    intro: 'Supporting high-value M&A and sensitive deals by uncovering critical truths absent from formal documentation.',
    bullets: [
      { label: 'Integrity Audits', desc: 'Background verification to identify "skeletons in the closet" of potential partners.' },
      { label: 'Hidden Motives', desc: 'Analyzing the true drivers and underlying interests of the opposing party.' },
      { label: 'Risk Mitigation', desc: 'Identifying reputational and legal landmines before they jeopardize the investment.' },
    ],
  },
  {
    numeral: 'V',
    title: 'Asset Tracing & Mapping',
    category: "Penetrating the 'Smoke Screen'",
    intro: "Locating and analyzing global assets where conventional legal tools reach a dead end.",
    bullets: [
      { label: 'Global Reach', desc: 'Worldwide mapping of hidden assets and corporate entities.' },
      { label: 'Structure Penetration', desc: "Piercing complex corporate layers and financial 'smoke screens' in international tax havens." },
      { label: 'Recovery Support', desc: 'Providing the intelligence required for seizure and collection in cross-border proceedings.' },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" style={{ background: 'var(--black)', padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)' }}>
      <style>{`
        .services-header {
          max-width: 1200px;
          margin: 0 auto 5rem;
        }
        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--white);
          margin-top: 1rem;
          letter-spacing: 0.05em;
        }
        .services-list {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(0,180,216,0.07);
          border: 1px solid rgba(0,180,216,0.07);
        }
        .service-row {
          background: var(--surface2);
          transition: background 0.3s;
        }
        .service-row:hover {
          background: var(--surface3);
        }
        .service-header-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: center;
          padding: 2.5rem 3rem;
          gap: 2rem;
          cursor: pointer;
        }
        .service-numeral {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 2.8rem;
          color: rgba(0,180,216,0.25);
          line-height: 1;
          transition: color 0.3s;
        }
        .service-row.is-open .service-numeral,
        .service-row:hover .service-numeral {
          color: rgba(0,180,216,0.5);
        }
        .service-name-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .service-category {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--cyan-dim);
        }
        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          color: var(--text-bright);
          letter-spacing: 0.03em;
          transition: color 0.3s;
        }
        .service-row.is-open .service-title,
        .service-row:hover .service-title {
          color: var(--white);
        }
        .service-toggle {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(0,180,216,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .service-row.is-open .service-toggle {
          background: rgba(0,180,216,0.1);
          border-color: var(--cyan);
        }
        .service-toggle-icon {
          width: 10px;
          height: 10px;
          position: relative;
        }
        .service-toggle-icon::before,
        .service-toggle-icon::after {
          content: '';
          position: absolute;
          background: var(--cyan);
          border-radius: 2px;
        }
        .service-toggle-icon::before {
          width: 10px; height: 1px;
          top: 50%; left: 0;
          transform: translateY(-50%);
        }
        .service-toggle-icon::after {
          width: 1px; height: 10px;
          top: 0; left: 50%;
          transform: translateX(-50%);
          transition: transform 0.3s, opacity 0.3s;
        }
        .service-row.is-open .service-toggle-icon::after {
          transform: translateX(-50%) rotate(90deg);
          opacity: 0;
        }
        .service-body {
          padding: 0 3rem 0 calc(80px + 3rem + 2rem);
          overflow: hidden;
        }
        .service-intro {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.82rem;
          line-height: 2;
          color: var(--text);
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(0,180,216,0.07);
        }
        .service-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }
        .service-bullet {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
        }
        .bullet-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--cyan);
          flex-shrink: 0;
          margin-top: 0.55em;
        }
        .bullet-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--cyan-light);
          min-width: 180px;
        }
        .bullet-desc {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.78rem;
          line-height: 1.8;
          color: var(--text-dim);
        }
        @media (max-width: 700px) {
          .service-header-row { grid-template-columns: 50px 1fr auto; padding: 1.5rem 1rem; gap: 0.75rem; }
          .service-body { padding: 0 1rem 0 1rem; }
          .bullet-label { min-width: unset; width: 100%; }
          .service-bullet { flex-wrap: wrap; }
        }
      `}</style>

      <div className="services-header">
        <div className="section-label">Core Services</div>
        <h2 className="services-title">Our Capabilities</h2>
      </div>

      <div className="services-list">
        {services.map((s, i) => {
          const isOpen = active === i;
          return (
            <motion.div
              key={s.numeral}
              className={`service-row${isOpen ? ' is-open' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="service-header-row" onClick={() => setActive(isOpen ? null : i)}>
                <div className="service-numeral">{s.numeral}</div>
                <div className="service-name-block">
                  <span className="service-category">{s.category}</span>
                  <span className="service-title">{s.title}</span>
                </div>
                <div className="service-toggle">
                  <div className="service-toggle-icon" />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="service-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="service-intro">{s.intro}</p>
                    <ul className="service-bullets">
                      {s.bullets.map((b) => (
                        <li key={b.label} className="service-bullet">
                          <span className="bullet-dot" />
                          <span className="bullet-label">{b.label}:</span>
                          <span className="bullet-desc">{b.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
