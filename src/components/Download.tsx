import React from 'react';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-primary)',
  padding: '100px 40px',
  textAlign: 'center',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-medium)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(29, 113, 149, 0.1)',
  transition: 'all 200ms ease-out',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  boxShadow: '0 10px 30px rgba(29, 113, 149, 0.4)',
};

const primaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  boxShadow: '0 10px 30px rgba(29, 113, 149, 0.4)',
  transition: 'all 200ms ease-out',
};

const pwaButtonStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  border: '2px solid var(--border-strong)',
  backdropFilter: 'blur(10px)',
  transition: 'all 200ms ease-out',
};

const Download: React.FC = () => {
  return (
    <section className="relative overflow-hidden" style={sectionStyle}>
      {/* Shader overlay (ready for your custom gradient) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'transparent' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-text-primary mb-5">
          Télécharger
        </h2>
        <p className="text-lg text-text-secondary max-w-[600px] mx-auto mb-15 leading-relaxed">
          Obtenez ToneLab dès maintenant et commencez à améliorer votre pratique musicale
        </p>

        {/* Download card */}
        <div className="max-w-[600px] mx-auto rounded-2xl p-[52px]"
             style={cardStyle}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-8px)';
               e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(29, 113, 149, 0.15)';
               e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.6)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(29, 113, 149, 0.1)';
               e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.3)';
             }}
        >
          {/* Download icon */}
          <div className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center mx-auto mb-8"
               style={iconContainerStyle}>
            <span className="text-4xl text-white" aria-hidden="true">⬇</span>
          </div>

          {/* Primary download button */}
          <a
            href="https://github.com/DjoAHP/tone-lab-electron/releases/download/v2.5.5/ToneLab-2.5.5.Setup.exe"
            download="ToneLab-2.5.5.Setup.exe"
            aria-label="Télécharger ToneLab v2.5.5 pour Windows (134 MB, compatible 10/11 64-bit)"
            className="inline-block px-6 py-2 rounded-lg font-semibold text-sm text-white mb-5"
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(29, 113, 149, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 113, 149, 0.4)';
            }}
          >
            <span className="inline-flex items-center gap-3">
              Télécharger pour Windows
            </span>
          </a>

          {/* Version info */}
          <div className="text-text-secondary text-sm mb-8 leading-relaxed">
            <strong className="text-text-primary">Version 2.5.5</strong> • 134 MB<br />
            Compatible Windows 10/11 (64-bit)
          </div>

          {/* PWA button */}
          <button
            aria-label="Ouvrir la version Progressive Web App (PWA) de ToneLab"
            aria-disabled="true"
            className="px-[40px] py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3"
            style={pwaButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.8)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 113, 149, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.5)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Ouvrir la version PWA (bientôt disponible)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Download;
