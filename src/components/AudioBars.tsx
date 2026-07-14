import React from 'react';

interface AudioBarsProps {
  bars?: number;
  className?: string;
}

const AudioBars: React.FC<AudioBarsProps> = ({ bars = 16, className = '' }) => {
  return (
    <div className={`audio-bars${className ? ' ' + className : ''}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${(i % 5) * 0.12}s`,
            animationDuration: `${1 + (i % 3) * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioBars;
