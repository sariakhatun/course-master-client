// components/LightBackground.jsx
import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-purple-350 via-purple-150 to-purple-300">

      {/* Floating Educational Icons – subtle & beautiful */}
      
      {/* Books */}
      <div className="absolute top-[62%] left-[5%] text-indigo-200 opacity-100">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>

      <div className="absolute top-[65%] right-[6%] text-blue-200 opacity-100 rotate-12">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>

      {/* Graduation Caps */}
      <div className="absolute top-[60%] right-[6%] text-purple-300 opacity-100">
        <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
          <path d="M6 12v5c0 1 2 2 6 2s6-1 6-2v-5"/>
        </svg>
      </div>

      <div className="absolute bottom-[30%] left-[6%] text-indigo-200 opacity-90 -rotate-12">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
          <path d="M6 12v5c0 1 2 2 6 2s6-1 6-2v-5"/>
        </svg>
      </div>

      {/* Light Bulbs */}
      <div className="absolute top-[40%] left-[28%] text-yellow-300 opacity-90">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18h6"/><path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.5.64 2.85 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
        </svg>
      </div>

      <div className="absolute top-[45%] right-[15%] text-yellow-300 opacity-90">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18h6"/><path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.5.64 2.85 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
        </svg>
      </div>

      {/* Pencils */}
      <div className="absolute bottom-[50%] right-[6%] text-orange-300 opacity-90 rotate-45">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </div>

      <div className="absolute top-[55%] left-[10%] text-red-200 opacity-90 -rotate-30">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute top-[48%] left-[6%] text-purple-300 opacity-90">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>

      <div className="absolute top-[55%] right-[8%] text-blue-300 opacity-90">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>

      {/* Certificate */}
      <div className="absolute bottom-[20%] left-[10%] text-indigo-200 opacity-90 rotate-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/>
        </svg>
      </div>

      <div className="absolute top-[75%] right-[9%] text-purple-300 opacity-90 -rotate-6">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/>
        </svg>
      </div>

      {/* Soft Blobs */}
      <div className="absolute top-[30%] right-[5%] w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-[25%] left-[10%] w-40 h-40 bg-blue-100 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute top-[10%] left-[35%] w-36 h-36 bg-indigo-100 rounded-full opacity-20 blur-2xl"></div>

      {/* এখানে তোমার Header, Main, Footer আসবে */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;