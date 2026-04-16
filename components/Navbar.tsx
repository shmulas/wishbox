'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const links = ['About', 'Leadership', 'Services', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      style={scrolled ? {
        background: 'rgba(3,3,5,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,180,216,0.08)',
      } : {
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid transparent',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="navbar"
    >
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          height: 160px;
          transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .nav-logo-img {
          width: 150px;
          height: 150px;
          object-fit: contain;
        }
        .nav-logo-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #e8e8f8;
          line-height: 1.2;
        }
        .nav-logo-sub {
          display: block;
          font-size: 0.55rem;
          letter-spacing: 0.45em;
          color: var(--cyan-dim);
          font-weight: 200;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
        }
        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: color 0.3s;
          text-decoration: none;
        }
        .nav-links a:hover {
          color: var(--text-bright);
        }
        .nav-cta {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--cyan);
          border: 1px solid rgba(0,180,216,0.4);
          padding: 0.6rem 1.4rem;
          background: transparent;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
          text-decoration: none;
        }
        .nav-cta:hover {
          background: rgba(0,180,216,0.1);
          border-color: var(--cyan);
        }
        @media (max-width: 768px) {
          .navbar { padding: 0 1.5rem; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* Logo */}
      <a href="#" className="nav-logo">
        <Image src="/logo.jpeg" alt="Wishbox" width={150} height={150} className="nav-logo-img" style={{ borderRadius: 4 }} />
        <span className="nav-logo-text">
          Wishbox
          <span className="nav-logo-sub">Intelligence</span>
        </span>
      </a>

      {/* Links */}
      <motion.ul
        className="nav-links"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
        }}
      >
        {links.map((link) => (
          <motion.li
            key={link}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link); }}>
              {link}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      {/* CTA */}
      <motion.a
        href="#contact"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); scrollTo('Contact'); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Contact Us
      </motion.a>
    </motion.nav>
  );
}
