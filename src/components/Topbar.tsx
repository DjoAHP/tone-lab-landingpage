import React from 'react';

const Topbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 animate-slideDown"
         style={{
           backgroundColor: 'rgba(26, 29, 39, 0.8)',
           backdropFilter: 'blur(10px)',
           borderBottom: '1px solid rgba(42, 61, 92, 0.3)',
         }}>
      <div className="max-w-[1500px] mx-auto px-10 py-4 flex items-center justify-between">
        {/* Logo + Nom + Version à gauche */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.svg"
            alt="ToneLab"
            className="h-8 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-text-primary text-lg font-bold leading-none">ToneLab</span>
            <span className="text-text-muted text-xs">v2.3.4</span>
          </div>
        </div>

        {/* Download button à droite */}
        <a
          href="https://github.com/DjoAHP/tone-lab-electron/releases/download/v2.3.4/ToneLab-2.3.4.Setup.exe"
          download="ToneLab-2.3.4.Setup.exe"
          className="px-6 py-2 rounded-lg font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #2A3D5C, #3A5478)',
            boxShadow: '0 4px 15px rgba(42, 61, 92, 0.3)',
            transition: 'all 200ms ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(42, 61, 92, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(42, 61, 92, 0.3)';
          }}
        >
          Télécharger
        </a>
      </div>
    </nav>
  );
};

export default Topbar;
