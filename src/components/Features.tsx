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
    icon: <img src="/assets/icons/diapa-tool.svg" alt="Diapa" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'Diapa',
    description: 'Diapason avancé sous forme de clavier virtuel.',
  },
  {
    id: 'stack',
    icon: <img src="/assets/icons/stack-tool.svg" alt="Stack" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'Stack',
    description: 'Recherche de sons et identité sonore via interface plugins et instruments.',
  },
  {
    id: 'metro',
    icon: <img src="/assets/icons/metro-tool.svg" alt="Metro" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'Metro',
    description: 'Métronome avancé avec signaux visuels et auditifs précis.',
  },
  {
    id: 'setlist',
    icon: <img src="/assets/icons/setlist-tool.svg" alt="Setlist" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'Setlist',
    description: 'Permet de créer des setlists pour groupe de musique.',
  },
  {
    id: 'chrono',
    icon: <img src="/assets/icons/chrono-tool.svg" alt="Chrono" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'Chrono',
    description: 'Chronomètre précis pour chronométrer vos morceaux de musique.',
  },
  {
    id: 'docv',
    icon: <img src="/assets/icons/docv-tool.svg" alt="DocV" className="w-7 h-7 brightness-0 invert" loading="lazy" />,
    title: 'DocV',
    description: 'Visionneuse de documents pour visualiser vos fichiers JPG, PNG et PDF.',
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
  cursor: 'pointer',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  transition: 'transform 200ms ease-out',
};

const Features: React.FC = () => {
  return (
    <section id="features" className="relative overflow-hidden py-20"
             style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Shader overlay (ready for your custom gradient) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'transparent' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-5">
          Fonctionnalités
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          6 outils intégrés pour couvrir tous vos besoins musicaux
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={gridStyle}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group p-8 rounded-2xl border"
              style={{
                ...cardStyle,
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(29, 113, 149, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110"
                style={iconContainerStyle}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
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