import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden flex items-center justify-center"
             style={{
               background: 'linear-gradient(180deg, #13151C 0%, #1A1D27 50%, #13151C 100%)',
               height: '100vh',
               minHeight: '600px',
               padding: '0 40px',
             }}>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: `
               radial-gradient(circle at 20% 50%, rgba(132, 118, 46, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 80% 50%, rgba(132, 118, 46, 0.15) 0%, transparent 50%)
             `,
           }} />

      {/* Logo en arrière-plan avec opacité */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logo.svg"
          alt=""
          className="w-[600px] h-auto"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto text-center">
        {/* Title with gradient text */}
        <h1 className="text-7xl font-extrabold mb-5 animate-fadeInUp"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #84762E 100%)',
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
            href="https://github.com/DjoAHP/tone-lab-electron/releases/download/v2.4.4/ToneLab-2.4.4.Setup.exe"
            download="ToneLab-2.4.4.Setup.exe"
            className="relative px-10 py-4 rounded-xl font-semibold text-lg text-white inline-flex items-center gap-3 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #84762E, #B19E3E)',
              boxShadow: '0 8px 25px rgba(132, 118, 46, 0.4)',
              transition: 'all 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(132, 118, 46, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(132, 118, 46, 0.4)';
            }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
            Télécharger (.exe)
          </a>

          {/* PWA button */}
          <button
            className="relative px-10 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#84762E',
              border: '2px solid rgba(132, 118, 46, 0.5)',
              backdropFilter: 'blur(10px)',
              transition: 'all 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(132, 118, 46, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(132, 118, 46, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(132, 118, 46, 0.5)';
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
