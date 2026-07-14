import React from 'react';
import { CONFIG } from '../config';

const primaryBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1D7195, #2898C8)',
  boxShadow: '0 4px 15px rgba(29, 113, 149, 0.3)',
  transition: 'all 200ms ease-out',
};

const ghostBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(29, 113, 149, 0.5)',
  color: '#4EAFC8',
  transition: 'all 200ms ease-out',
};

const Shimmer: React.FC = () => (
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
);

const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: '100vh', minHeight: '600px', padding: '0 40px' }}
    >
      {/* Fond dégradé cyan qui respire */}
      <div
        className="absolute inset-0 pointer-events-none animate-breathe"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(29,113,149,0.35) 0%, rgba(29,113,149,0.08) 35%, transparent 70%)',
        }}
      />

      {/* Logo en arrière-plan avec opacité */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logo.svg"
          alt=""
          className="w-[600px] h-auto"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto text-center">
        {/* Titre avec dégradé + halo + shimmer au chargement */}
        <h1
          className="text-7xl font-extrabold mb-5 animate-fadeInUp"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #1D7195 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(29, 113, 149, 0.25)',
          }}
        >
          ToneLab
        </h1>

        {/* Description */}
        <p
          className="text-xl text-text-secondary max-w-[600px] mx-auto mb-10 leading-relaxed animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          L'application de bureau complète pour les musiciens. Métronome, accordeur, gestion de setlists et plus encore.
        </p>

        {/* CTA group : Windows + Linux primaires, PWA ghost */}
        <div
          className="flex flex-col gap-3 justify-center items-center animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
            <a
              href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
              download={`ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
              className="group relative px-6 py-2 rounded-lg font-semibold text-sm text-white inline-flex items-center gap-2 overflow-hidden"
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.3)';
              }}
            >
              <Shimmer />
              <img src="/assets/icons/windows.svg" alt="Windows" className="w-5 h-5 brightness-0 invert" />
              Télécharger pour Windows
            </a>

            <a
              href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
              download={`ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
              className="group relative px-6 py-2 rounded-lg font-semibold text-sm text-white inline-flex items-center gap-2 overflow-hidden"
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.3)';
              }}
            >
              <Shimmer />
              <img src="/assets/icons/linux.svg" alt="Linux" className="w-5 h-5 brightness-0 invert" />
              Télécharger pour Linux
            </a>
          </div>

          {/* PWA en ghost/outline */}
          <a
            href={CONFIG.PWA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
            style={ghostBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(29, 113, 149, 0.12)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Ouvrir la version PWA
          </a>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <button
        type="button"
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scrollHint text-text-muted hover:text-accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-light)]"
        aria-label="Défiler vers les fonctionnalités"
        style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
