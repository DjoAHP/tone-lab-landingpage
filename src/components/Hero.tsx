import React from 'react';
import { CONFIG } from '../config';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden flex items-center justify-center"
             style={{
               height: '100vh',
               minHeight: '600px',
               padding: '0 40px',
             }}>
      {/* Shader overlay (ready for your custom gradient) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'transparent' }} />

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
        {/* Title with gradient text */}
        <h1 className="text-7xl font-extrabold mb-5 animate-fadeInUp"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #1D7195 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
          ToneLab
        </h1>

        {/* Description */}
        <p className="text-xl text-text-secondary max-w-[600px] mx-auto mb-10 leading-relaxed animate-fadeInUp"
           style={{ animationDelay: '0.2s' }}>
          L'application de bureau complète pour les musiciens. Métronome, accordeur, gestion de setlists et plus encore.
        </p>

        {/* Buttons with modern hover effects */}
        <div className="flex gap-5 justify-center animate-fadeInUp"
             style={{ animationDelay: '0.4s' }}>
          {/* Primary download button */}
          <a
            href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}.Setup.exe`}
            download={`ToneLab-${CONFIG.APP_VERSION}.Setup.exe`}
            className="relative px-6 py-2 rounded-lg font-semibold text-sm text-white inline-flex items-center gap-2 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1D7195, #2898C8)',
              boxShadow: '0 4px 15px rgba(29, 113, 149, 0.3)',
              transition: 'all 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.3)';
            }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
            Télécharger (.exe)
          </a>

          {/* PWA button */}
          <button
            className="relative px-6 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--accent-primary)',
              border: '1px solid var(--border-medium)',
              backdropFilter: 'blur(10px)',
              transition: 'all 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.4)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border-medium)';
            }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
            Version PWA
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;