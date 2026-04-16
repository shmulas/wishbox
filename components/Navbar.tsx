'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const links = ['About', 'Leadership', 'Services', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <motion.nav
        style={scrolled || menuOpen ? {
          background: 'rgba(3,3,5,0.96)',
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
            top: 0; left: 0; right: 0;
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
            z-index: 1001;
          }
          .nav-logo-img { width: 150px; height: 150px; object-fit: contain; }
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
          .nav-links a:hover { color: var(--text-bright); }
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
          .nav-cta:hover { background: rgba(0,180,216,0.1); border-color: var(--cyan); }

          /* Hamburger */
          .nav-burger {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            padding: 8px;
            z-index: 1001;
          }
          .nav-burger span {
            display: block;
            width: 24px;
            height: 1px;
            background: var(--cyan);
            transition: transform 0.3s, opacity 0.3s;
          }
          .nav-burger.is-open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
          .nav-burger.is-open span:nth-child(2) { opacity: 0; }
          .nav-burger.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

          @media (max-width: 768px) {
            .navbar { padding: 0 1.5rem; height: 90px; }
            .nav-logo-img { width: 72px; height: 72px; }
            .nav-logo-text { font-size: 0.72rem; }
            .nav-links { display: none; }
            .nav-cta { display: none; }
            .nav-burger { display: flex; }
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

        {/* Desktop links */}
        <motion.ul
          className="nav-links"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
        >
          {links.map((link) => (
            <motion.li key={link} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link); }}>
                {link}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop CTA */}
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

        {/* Hamburger */}
        <button
          className={`nav-burger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 90,
              left: 0, right: 0,
              background: 'rgba(3,3,5,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              borderBottom: '1px solid rgba(0,180,216,0.12)',
              padding: '2rem 1.5rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 200,
                  fontSize: '1.1rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--text-bright)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0,180,216,0.08)',
                  paddingBottom: '1rem',
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('Contact'); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 200,
                fontSize: '0.75rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--cyan)',
                border: '1px solid rgba(0,180,216,0.4)',
                padding: '1rem',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop: '0.5rem',
              }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
