import React from 'react';
import { Mail } from 'lucide-react';
import { CONFIG } from '../config';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-primary)',
              padding: '20px 40px 15px',
              borderTop: '1px solid var(--border-medium)',
            }}>
      {/* Shader overlay (ready for your custom gradient) */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'transparent' }} />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        {/* Main footer content */}
        <div className="flex justify-between items-start flex-wrap gap-10 mb-8">
          {/* Brand - Logo SVG + Nom + Version */}
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo.svg"
                alt="ToneLab"
                className="h-8 w-auto"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-text-primary text-lg font-bold leading-none">ToneLab</span>
                <span className="text-text-muted text-xs">v{CONFIG.APP_VERSION}</span>
              </div>
            </div>
          </div>

          {/* Links - Rapprochés des bords */}
          <div className="flex gap-8 flex-wrap">
            {/* Links column */}
            <div>
              <h4 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                Liens
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}.Setup.exe`}
                     download={`ToneLab-${CONFIG.APP_VERSION}.Setup.exe`}
                     className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2">
                    Télécharger
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a href="#"
                     className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2">
                    Version PWA
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a href="#features"
                     className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2">
                    Documentation
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Community column */}
            <div>
              <h4 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                Communauté
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href={CONFIG.GITHUB_REPO}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-text-secondary text-sm hover:text-accent-primary transition-colors inline-flex items-center gap-2">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center flex-wrap gap-4">
          <div className="text-text-muted text-sm">
            © {new Date().getFullYear()} ToneLab. Tous droits réservés.
          </div>
          <div className="flex gap-4">
            <a href={CONFIG.GITHUB_REPO}
               target="_blank"
               rel="noopener noreferrer"
               className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:bg-[rgba(43,79,67,0.2)] transition-all"
               style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
               aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="mailto:{CONFIG.CONTACT_EMAIL}"
               className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:bg-[rgba(43,79,67,0.2)] transition-all"
               style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
               aria-label="Contact par email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;