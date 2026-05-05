import React from 'react';

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#13151C',
  padding: '100px 40px',
};

const overlayStyle: React.CSSProperties = {
  background: `radial-gradient(circle at 50% 50%, rgba(43, 79, 67, 0.08) 0%, transparent 60%)`,
};

const containerStyle: React.CSSProperties = {
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 100px rgba(43, 79, 67, 0.15)',
  border: '1px solid rgba(43, 79, 67, 0.3)',
};

const videoWrapperStyle: React.CSSProperties = {
  position: 'relative' as const,
  width: '100%',
  paddingTop: '56.25%',
};

const videoStyle: React.CSSProperties = {
  backgroundColor: '#0D0F14',
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

        {/* Video container */}
        <div className="max-w-[1000px] mx-auto rounded-2xl overflow-hidden" style={containerStyle}>
          <div style={videoWrapperStyle}>
            <video
              controls
              autoPlay
              muted
              loop
              aria-label="Démonstration de ToneLab"
              preload="auto"
              className="absolute top-0 left-0 w-full h-full"
              poster="/assets/demo/poster.png"
              style={videoStyle}
            >
              <source src="/assets/demo/tonelab-demo.mp4" type="video/mp4" />
              <source src="/assets/demo/tonelab-demo.webm" type="video/webm" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
