import React from 'react';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Download from './components/Download';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main>
        <Hero />
        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        <ScrollReveal delay={0}>
          <Features />
        </ScrollReveal>

        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        <ScrollReveal delay={0.2}>
          <Demo />
        </ScrollReveal>

        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        <ScrollReveal delay={0.4}>
          <Download />
        </ScrollReveal>
      </main>

      <div className="max-w-[1500px] mx-auto px-4">
        <hr className="border-t border-[var(--border-subtle)]" />
      </div>

      <ScrollReveal delay={0.15}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default App;