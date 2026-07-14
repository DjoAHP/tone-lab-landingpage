import React, { useEffect, useState } from 'react';
import { CONFIG } from '../config';

const SECTIONS = ['features', 'demo', 'download'] as const;
type SectionId = (typeof SECTIONS)[number];

const Topbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const linkStyle = (id: SectionId): React.CSSProperties => ({
    cursor: 'pointer',
    transition: 'color 0.3s ease-out, transform 0.2s ease-out',
    color: active === id ? 'var(--accent-light)' : undefined,
  });

  const renderLink = (id: SectionId, label: string) => (
    <button
      onClick={() => scrollToSection(id)}
      style={linkStyle(id)}
      className={`text-sm hover:text-accent-primary ${active === id ? 'text-accent-light' : 'text-text-muted'}`}
    >
      {label}
    </button>
  );

  return (
    <nav
      className="sticky top-0 z-50 animate-slideDown"
      style={{
        backgroundColor: 'rgba(26, 29, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(29, 113, 149, 0.3)',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 focus:outline-none" style={{ cursor: 'pointer' }} aria-label="Retour à l'accueil">
          <img src="/assets/logo.svg" alt="ToneLab" className="h-8 w-auto" loading="lazy" style={{ cursor: 'pointer' }} />
          <div className="flex flex-col">
            <span className="text-text-primary text-lg font-bold leading-none">ToneLab</span>
            <span className="text-text-muted text-xs">v{CONFIG.APP_VERSION}</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {renderLink('features', 'Fonctionnalités')}
          {renderLink('demo', 'Démo')}
          {renderLink('download', 'Télécharger')}
        </div>

        <button className="md:hidden p-2 text-text-primary" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ cursor: 'pointer' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-4" style={{ borderTop: '1px solid rgba(29, 113, 149, 0.2)' }}>
          <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('demo')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Démo</button>
          <button onClick={() => scrollToSection('download')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Télécharger</button>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
