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
        <Features />
        <Demo />
        <Download />
      </main>
      <Footer />
    </div>
  );
};

export default App;
