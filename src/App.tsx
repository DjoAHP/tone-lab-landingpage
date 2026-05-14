import React from 'react';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Download from './components/Download';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main>
        <Hero />
        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>
        <Features />
        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>
        <Demo />
        <div className="max-w-[1500px] mx-auto px-4">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>
        <Download />
      </main>
      <div className="max-w-[1500px] mx-auto px-4">
        <hr className="border-t border-[var(--border-subtle)]" />
      </div>
      <Footer />
    </div>
  );
};

export default App;