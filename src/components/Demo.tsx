import React from "react";

const sectionStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-primary)",
  padding: "100px 40px",
};

const videoWrapperStyle: React.CSSProperties = {
  position: "relative" as const,
  width: "100%",
  paddingTop: "56.25%",
};

const Demo: React.FC = () => {
  return (
    <section id="demo" className="relative overflow-hidden" style={sectionStyle}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-5">
          Démo
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          Découvrez ToneLab en action avec cette vidéo de démonstration
        </p>

        {/* Conteneur "fenêtre produit" avec halo */}
        <div
          className="max-w-[1000px] mx-auto rounded-2xl overflow-hidden animate-glowPulse"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-medium)",
          }}
        >
          {/* Chrome de fenêtre */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-subtle)" }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--text-muted)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent-primary)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent-light)" }} />
            <span className="ml-3 text-text-muted text-xs">Démo — ToneLab</span>
          </div>

          <div style={videoWrapperStyle}>
            <video
              className="absolute top-0 left-0 w-full h-full"
              src="https://res.cloudinary.com/dmj4wyxcw/video/upload/v1779187633/Demo02_dmngg8.mov"
              title="Démonstration de ToneLab"
              controls
              controlsList="nodownload"
              muted
              autoPlay
              loop
              playsInline
              disablePictureInPicture
              style={{ backgroundColor: "var(--bg-primary)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
