import React from 'react';

const DarkBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-950">
      {/* Floating Educational Icons */}
     
      {/* Books */}
      <div className="absolute top-[12%] left-[8%] text-indigo-300 opacity-30">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>
     
      <div className="absolute top-[65%] right-[15%] text-blue-300 opacity-25 rotate-12">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>

      {/* Graduation Caps */}
      <div className="absolute top-[25%] right-[10%] text-purple-300 opacity-30">
        <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
          <path d="M6 12v5c0 1 2 2 6 2s6-1 6-2v-5"/>
        </svg>
      </div>
     
      <div className="absolute bottom-[20%] left-[12%] text-indigo-300 opacity-25 -rotate-12">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
          <path d="M6 12v5c0 1 2 2 6 2s6-1 6-2v-5"/>
        </svg>
      </div>

      {/* Light Bulbs */}
      <div className="absolute top-[40%] left-[15%] text-yellow-300 opacity-25">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.5.64 2.85 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
        </svg>
      </div>

      <div className="absolute top-[8%] right-[25%] text-yellow-400 opacity-30">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.5.64 2.85 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
        </svg>
      </div>

      {/* Pencils */}
      <div className="absolute bottom-[30%] right-[20%] text-orange-300 opacity-25 rotate-45">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </div>

      <div className="absolute top-[55%] left-[5%] text-red-300 opacity-20 -rotate-30">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </div>

      {/* Stars/Sparkles */}
      <div className="absolute top-[18%] left-[25%] text-purple-400 opacity-25">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>

      <div className="absolute bottom-[15%] right-[8%] text-blue-400 opacity-30">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>

      {/* Certificate/Document */}
      <div className="absolute bottom-[40%] left-[20%] text-indigo-300 opacity-25 rotate-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M8 13h8"/>
          <path d="M8 17h8"/>
        </svg>
      </div>

      <div className="absolute top-[75%] right-[25%] text-purple-300 opacity-20 -rotate-6">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M8 13h8"/>
          <path d="M8 17h8"/>
        </svg>
      </div>

      {/* Web Developer Skills Icons */}
     
      {/* React Logo */}
      <div className="absolute top-[15%] left-[40%] text-cyan-400 opacity-30">
        <svg width="55" height="55" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 12 12)"/>
        </svg>
      </div>

      <div className="absolute bottom-[35%] right-[18%] text-cyan-500 opacity-25">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 12 12)"/>
        </svg>
      </div>

      {/* HTML Tag */}
      <div className="absolute top-[32%] right-[12%] text-orange-400 opacity-30">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l2 16 6 2 6-2 2-16z"/>
          <path d="M8 8h8"/>
          <path d="M9 12h6"/>
          <path d="M10 16h4"/>
        </svg>
      </div>

      <div className="absolute bottom-[48%] left-[18%] text-red-400 opacity-25">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l2 16 6 2 6-2 2-16z"/>
          <path d="M8 8h8"/>
          <path d="M9 12h6"/>
          <path d="M10 16h4"/>
        </svg>
      </div>

      {/* CSS Tag */}
      <div className="absolute top-[70%] right-[35%] text-blue-400 opacity-25 -rotate-6">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l2 16 6 2 6-2 2-16z"/>
          <path d="M8 10h8"/>
          <path d="M9 14h6"/>
        </svg>
      </div>

      <div className="absolute top-[45%] right-[5%] text-blue-500 opacity-20 rotate-12">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l2 16 6 2 6-2 2-16z"/>
          <path d="M8 10h8"/>
          <path d="M9 14h6"/>
        </svg>
      </div>

      {/* JavaScript */}
      <div className="absolute top-[52%] left-[25%] text-yellow-400 opacity-30">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <text x="12" y="17" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">JS</text>
        </svg>
      </div>

      <div className="absolute top-[22%] right-[38%] text-yellow-500 opacity-25 rotate-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <text x="12" y="17" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">JS</text>
        </svg>
      </div>

      {/* Code Brackets */}
      <div className="absolute top-[88%] left-[30%] text-emerald-400 opacity-25">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6"/>
          <path d="M8 6l-6 6 6 6"/>
        </svg>
      </div>

      <div className="absolute top-[5%] left-[55%] text-green-400 opacity-30 rotate-12">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6"/>
          <path d="M8 6l-6 6 6 6"/>
        </svg>
      </div>

      {/* Laptop/Computer */}
      <div className="absolute bottom-[55%] right-[28%] text-sky-400 opacity-25">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M2 17h20"/>
          <path d="M1 21h22"/>
        </svg>
      </div>

      <div className="absolute top-[60%] left-[38%] text-cyan-400 opacity-20 rotate-6">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M2 17h20"/>
          <path d="M1 21h22"/>
        </svg>
      </div>

      {/* GitHub Icon */}
      <div className="absolute bottom-[8%] left-[45%] text-gray-400 opacity-25">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      </div>

      {/* Terminal/Command Line */}
      <div className="absolute top-[82%] right-[15%] text-green-400 opacity-25">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8l4 4-4 4"/>
          <path d="M12 16h6"/>
        </svg>
      </div>

      {/* Subtle Circles/Blobs for depth */}
      <div className="absolute top-[30%] right-[5%] w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[25%] left-[10%] w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-[10%] left-[35%] w-36 h-36 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[60%] right-[40%] w-38 h-38 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
     
      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DarkBackground;
