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
  {
    id: 'chrono',
    icon: <img src="/assets/icons/chrono-tool.svg" alt="Chrono" className="w-7 h-7 brightness-0 invert" />,
    title: 'Chrono',
    description: 'Chronomètre précis pour chronométrer vos morceaux de musique.',
  },
];

const gridStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-primary)',
  borderColor: 'var(--border-subtle)',
  transition: 'all 200ms ease-out',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  transition: 'transform 200ms ease-out',
};

const Features: React.FC = () => {
  return (
    <section className="relative overflow-hidden"
             style={{ backgroundColor: 'var(--bg-primary)', padding: '100px 40px' }}>

      <div className="relative z-10" style={gridStyle}>
        <h2 id="features-heading" className="text-4xl font-bold text-text-primary text-center mb-5">
          Fonctionnalités
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          Découvrez tous les outils intégrés pour améliorer votre pratique musicale
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
                e.currentTarget.style.boxShadow = '0 15px 40px var(--border-medium)';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
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
                  e.currentTarget.style.color = 'var(--accent-light)';
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
