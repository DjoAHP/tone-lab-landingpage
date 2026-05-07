import React from 'react';

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#13151C',
  padding: '100px 40px',
};

const overlayStyle: React.CSSProperties = {
  background: `radial-gradient(circle at 50% 50%, rgba(29, 113, 149), 0.08) 0%, transparent 60%)`,
};

const containerStyle: React.CSSProperties = {
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 100px rgba(29, 113, 149), 0.15)',
  border: '1px solid rgba(29, 113, 149), 0.3)',
};

const videoWrapperStyle: React.CSSProperties = {
  position: 'relative' as const,
  width: '100%',
  paddingTop: '56.25%', // 16:9 aspect ratio
};

const Demo: React.FC = () => {
  return (
    <section className="relative overflow-hidden" style={sectionStyle}>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={overlayStyle} />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-5">
          Démo
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          Découvrez ToneLab en action avec cette vidéo de démonstration
        </p>

        {/* YouTube Video container */}
        <div className="max-w-[1000px] mx-auto rounded-2xl overflow-hidden" style={containerStyle}>
          <div style={videoWrapperStyle}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/wkIuMtFKtQE?autoplay=1&mute=1&loop=1&playlist=wkIuMtFKtQE&controls=1&modestbranding=1&rel=0"
              title="Démonstration de ToneLab"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ backgroundColor: '#0D0F14' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
