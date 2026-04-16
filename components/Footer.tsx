import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid rgba(0,180,216,0.08)', padding: '3rem 4rem' }}>
      <style>{`
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0.5;
        }
        .footer-copy {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-dim);
          opacity: 0.6;
        }
        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-dim);
          opacity: 0.4;
          letter-spacing: 0.05em;
        }
        @media (max-width: 600px) {
          .footer-inner { flex-direction: column; gap: 1.5rem; text-align: center; }
          footer { padding: 2.5rem 1.5rem; }
          .footer-tagline { display: none; }
        }
      `}</style>

      <div className="footer-inner">
        <div className="footer-logo">
          <Image src="/logo.jpeg" alt="Wishbox" width={28} height={28} style={{ borderRadius: 3, opacity: 0.7 }} />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 200, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
            Wishbox
          </span>
        </div>

        <p className="footer-copy">© 2025 Wishbox Ltd. All rights reserved.</p>

        <p className="footer-tagline">We operate where conventional research ends.</p>
      </div>
    </footer>
  );
}
