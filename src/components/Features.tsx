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
  background: 'rgba(26, 29, 39, 0.4)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderColor: 'rgba(29, 113, 149, 0.15)',
  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'none',
};

const Features: React.FC = () => {
  return (
    <section id="features" className="relative overflow-hidden py-20"
             style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
                transitionDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => {
                // Tilt 3D
                const rect = e.currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const rotateY = ((mouseX - centerX) / rect.width) * 6;
                const rotateX = ((centerY - mouseY) / rect.height) * 6;

                e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
                e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.5)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(29, 113, 149, 0.12)';

                // Glow sur l'icône
                const iconEl = e.currentTarget.querySelector(".icon-glow") as HTMLElement | null;
                if (iconEl) {
                  iconEl.style.boxShadow = '0 0 25px rgba(29, 113, 149, 0.5), 0 0 50px rgba(29, 113, 149, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.15)';
                e.currentTarget.style.boxShadow = 'none';

                const iconEl = e.currentTarget.querySelector(".icon-glow") as HTMLElement | null;
                if (iconEl) {
                  iconEl.style.boxShadow = 'none';
                }
              }}
            >
              <div
                className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 icon-glow"
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