import React from 'react';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'diapa',
    icon: <img src="/assets/icons/diapa-tool.svg" alt="Diapa" className="w-7 h-7 brightness-0 invert" />,
    title: 'Diapa',
    description: 'Diapason avancé sous forme de clavier virtuel.',
  },
  {
    id: 'stack',
    icon: <img src="/assets/icons/stack-tool.svg" alt="Stack" className="w-7 h-7 brightness-0 invert" />,
    title: 'Stack',
    description: 'Recherche de sons et identité sonore via interface plugins et instruments.',
  },
  {
    id: 'metro',
    icon: <img src="/assets/icons/metro-tool.svg" alt="Metro" className="w-7 h-7 brightness-0 invert" />,
    title: 'Metro',
    description: 'Métronome avancé avec signaux visuels et auditifs précis.',
  },
  {
    id: 'setlist',
    icon: <img src="/assets/icons/setlist-tool.svg" alt="Setlist" className="w-7 h-7 brightness-0 invert" />,
    title: 'Setlist',
    description: 'Permet de créer des setlists pour groupe de musique.',
  },
];

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#1A1D27',
  padding: '100px 40px',
};

const overlayStyle: React.CSSProperties = {
  background: `
    radial-gradient(circle at 10% 90%, rgba(29, 113, 149), 0.1) 0%, transparent 40%),
    radial-gradient(circle at 90% 10%, rgba(29, 113, 149), 0.08) 0%, transparent 40%)
  `,
};

const gridStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #13151C, #1A1D27)',
  borderColor: 'rgba(29, 113, 149), 0.2)',
  transition: 'all 200ms ease-out',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1D7195, #2898C8)',
  transition: 'transform 200ms ease-out',
};

const Features: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="features-heading" style={sectionStyle}>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={overlayStyle} />

      <div className="relative z-10" style={gridStyle}>
        <h2 id="features-heading" className="text-4xl font-bold text-text-primary text-center mb-5">
          Fonctionnalités
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          Découvrez tous les outils intégrés pour améliorer votre pratique musicale
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl p-8 border cursor-pointer"
              style={{
                ...cardStyle,
                transition: 'all 200ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(132,118,46,0.3)';
                e.currentTarget.style.borderColor = 'rgba(132,118,46,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(132,118,46,0.2)';
              }}
            >
              <div
                className="w-[60px] h-[60px] rounded-xl flex items-center justify-center mb-5"
                style={{...iconContainerStyle, transition: 'transform 200ms ease-out'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.25) rotate(6deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold text-text-primary mb-3"
                style={{ transition: 'color 200ms ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2898C8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
