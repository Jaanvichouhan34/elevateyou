import React from 'react';

const HeroDarkIllustration = () => {
  return (
    <div className="relative w-full max-w-[480px] h-[480px] 
      flex items-center justify-center mx-auto">
      
      <svg viewBox="0 0 380 380" fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full scale-110">
        
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06d6a0"/>
            <stop offset="100%" stopColor="#0891b2"/>
          </linearGradient>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="15"/>
          </filter>
        </defs>

        {/* Background orbs */}
        <circle cx="190" cy="190" r="140" fill="#6366f1" 
          fillOpacity="0.05" filter="url(#softBlur)">
          <animate attributeName="r" 
            values="140;155;140" dur="6s" repeatCount="indefinite"/>
        </circle>

        {/* Outer rotating ring */}
        <circle cx="190" cy="190" r="130" stroke="#6366f1" 
          strokeWidth="1" strokeOpacity="0.2" 
          strokeDasharray="6 4">
          <animateTransform attributeName="transform" 
            type="rotate" from="0 190 190" to="360 190 190" 
            dur="20s" repeatCount="indefinite"/>
        </circle>

        {/* Inner rotating ring */}
        <circle cx="190" cy="190" r="95" stroke="#06d6a0" 
          strokeWidth="1" strokeOpacity="0.2" 
          strokeDasharray="4 5">
          <animateTransform attributeName="transform" 
            type="rotate" from="360 190 190" to="0 190 190" 
            dur="14s" repeatCount="indefinite"/>
        </circle>

        {/* Center core */}
        <circle cx="190" cy="190" r="52" 
          fill="#1e1b4b" stroke="#6366f1" 
          strokeWidth="1.5" strokeOpacity="0.7"/>
        <circle cx="190" cy="190" r="52" 
          fill="url(#g1)" fillOpacity="0.12"/>

        {/* Pulse ring */}
        <circle cx="190" cy="190" r="52" 
          stroke="#6366f1" strokeWidth="2" 
          fill="none" strokeOpacity="0.4">
          <animate attributeName="r" 
            values="52;68;52" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="strokeOpacity" 
            values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>

        {/* Center text */}
        <text x="190" y="183" textAnchor="middle" 
          fill="#a5b4fc" fontSize="9" 
          fontFamily="monospace" fontWeight="bold">ELEVATE</text>
        <text x="190" y="198" textAnchor="middle" 
          fill="#06d6a0" fontSize="20" 
          fontFamily="monospace" fontWeight="bold" 
          filter="url(#glow)">AI</text>
        <text x="190" y="211" textAnchor="middle" 
          fill="#8b5cf6" fontSize="7" 
          fontFamily="monospace">CORE</text>

        {/* Orbiting dot 1 */}
        <circle r="5" fill="#6366f1" filter="url(#glow)">
          <animateMotion dur="20s" repeatCount="indefinite">
            <mpath href="#orbit1"/>
          </animateMotion>
        </circle>
        <path id="orbit1" 
          d="M 190 60 A 130 130 0 1 1 189.99 60" fill="none"/>

        {/* Orbiting dot 2 */}
        <circle r="4" fill="#06d6a0" filter="url(#glow)">
          <animateMotion dur="14s" repeatCount="indefinite" begin="-4s">
            <mpath href="#orbit2"/>
          </animateMotion>
        </circle>
        <path id="orbit2" 
          d="M 190 95 A 95 95 0 1 0 189.99 95" fill="none"/>

        {/* Card 1 - Outfit Scanner (top left) */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" 
            type="translate" values="0,0;0,-6;0,0" 
            dur="4s" repeatCount="indefinite"/>
          <rect x="10" y="50" width="118" height="72" rx="12" 
            fill="#0f172a" stroke="#6366f1" 
            strokeWidth="1.2" strokeOpacity="0.7"/>
          <rect x="10" y="50" width="118" height="4" rx="2" 
            fill="url(#g1)"/>
          <circle cx="32" cy="78" r="13" 
            fill="#6366f1" fillOpacity="0.15"/>
          <text x="32" y="83" textAnchor="middle" 
            fontSize="13">👗</text>
          <text x="53" y="73" fill="#a5b4fc" 
            fontSize="7.5" fontFamily="monospace" 
            fontWeight="bold">OUTFIT</text>
          <text x="53" y="83" fill="#6366f1" 
            fontSize="7.5" fontFamily="monospace">SCANNER</text>
          <circle cx="22" cy="98" r="2.5" fill="#06d6a0"/>
          <text x="29" y="101" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Upload Photo</text>
          <circle cx="22" cy="111" r="2.5" fill="#8b5cf6"/>
          <text x="29" y="114" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Describe Look</text>
        </g>

        {/* Card 2 - Event Prep (top right) */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" 
            type="translate" values="0,0;0,-5;0,0" 
            dur="5s" repeatCount="indefinite" begin="-2s"/>
          <rect x="252" y="45" width="118" height="72" rx="12" 
            fill="#0f172a" stroke="#06d6a0" 
            strokeWidth="1.2" strokeOpacity="0.7"/>
          <rect x="252" y="45" width="118" height="4" rx="2" 
            fill="url(#g2)"/>
          <circle cx="274" cy="73" r="13" 
            fill="#06d6a0" fillOpacity="0.15"/>
          <text x="274" y="78" textAnchor="middle" 
            fontSize="13">📋</text>
          <text x="295" y="68" fill="#6ee7b7" 
            fontSize="7.5" fontFamily="monospace" 
            fontWeight="bold">EVENT</text>
          <text x="295" y="78" fill="#06d6a0" 
            fontSize="7.5" fontFamily="monospace">PREP GUIDE</text>
          <text x="262" y="96" fill="#06d6a0" 
            fontSize="9" fontFamily="monospace">✓</text>
          <text x="274" y="96" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Outfit Guide</text>
          <text x="262" y="109" fill="#06d6a0" 
            fontSize="9" fontFamily="monospace">✓</text>
          <text x="274" y="109" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Body Language</text>
        </g>

        {/* Card 3 - AI Trainer (bottom) */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" 
            type="translate" values="0,0;0,-6;0,0" 
            dur="4.5s" repeatCount="indefinite" begin="-1s"/>
          <rect x="115" y="290" width="150" height="75" rx="12" 
            fill="#0f172a" stroke="#ec4899" 
            strokeWidth="1.2" strokeOpacity="0.7"/>
          <rect x="115" y="290" width="150" height="4" rx="2" 
            fill="url(#g3)"/>
          <circle cx="140" cy="318" r="13" 
            fill="#ec4899" fillOpacity="0.15"/>
          <text x="140" y="323" textAnchor="middle" 
            fontSize="13">🤖</text>
          <text x="162" y="312" fill="#f9a8d4" 
            fontSize="7.5" fontFamily="monospace" 
            fontWeight="bold">AI TRAINER</text>
          <text x="162" y="322" fill="#ec4899" 
            fontSize="7" fontFamily="monospace">20 LEVELS</text>
          <text x="125" y="340" fill="#f59e0b" 
            fontSize="8" fontFamily="monospace">🧠</text>
          <text x="138" y="340" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Quiz Module</text>
          <text x="210" y="340" fill="#06d6a0" 
            fontSize="8" fontFamily="monospace">💬</text>
          <text x="222" y="340" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Chatbot</text>
          <text x="125" y="354" fill="#6366f1" 
            fontSize="8" fontFamily="monospace">📈</text>
          <text x="138" y="354" fill="#94a3b8" 
            fontSize="6.5" fontFamily="monospace">Progress Tracking</text>
        </g>

        {/* Connecting lines */}
        <line x1="128" y1="118" x2="158" y2="160" 
          stroke="#6366f1" strokeWidth="1" 
          strokeOpacity="0.3" strokeDasharray="4 3">
          <animate attributeName="strokeOpacity" 
            values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
        </line>
        <line x1="252" y1="112" x2="222" y2="158" 
          stroke="#06d6a0" strokeWidth="1" 
          strokeOpacity="0.3" strokeDasharray="4 3">
          <animate attributeName="strokeOpacity" 
            values="0.3;0.7;0.3" dur="3s" 
            repeatCount="indefinite" begin="-1s"/>
        </line>
        <line x1="190" y1="290" x2="190" y2="242" 
          stroke="#ec4899" strokeWidth="1" 
          strokeOpacity="0.3" strokeDasharray="4 3">
          <animate attributeName="strokeOpacity" 
            values="0.3;0.7;0.3" dur="3s" 
            repeatCount="indefinite" begin="-2s"/>
        </line>

        {/* Sparkles */}
        {[[50,30],[330,30],[20,280],[360,280],[190,15]].map(([x,y],i) => (
          <g key={i}>
            <line x1={x} y1={y-6} x2={x} y2={y+6} 
              stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="strokeOpacity" 
                values="0.5;1;0.5" 
                dur={`${3+i}s`} repeatCount="indefinite"/>
            </line>
            <line x1={x-6} y1={y} x2={x+6} y2={y} 
              stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="strokeOpacity" 
                values="0.5;1;0.5" 
                dur={`${3+i}s`} repeatCount="indefinite"/>
            </line>
          </g>
        ))}

        {/* Floating badges */}
        {/* Streak */}
        <g>
          <animateTransform attributeName="transform" 
            type="translate" values="0,0;-3,0;0,0" 
            dur="5s" repeatCount="indefinite"/>
          <rect x="14" y="190" width="75" height="26" rx="13" 
            fill="#0f172a" stroke="#f59e0b" 
            strokeWidth="1" strokeOpacity="0.6"/>
          <text x="30" y="208" textAnchor="middle" 
            fontSize="12">🔥</text>
          <text x="55" y="205" textAnchor="middle" 
            fill="#fbbf24" fontSize="9" 
            fontFamily="monospace" fontWeight="bold">7 days</text>
        </g>

        {/* Score */}
        <g>
          <animateTransform attributeName="transform" 
            type="translate" values="0,0;3,0;0,0" 
            dur="6s" repeatCount="indefinite"/>
          <rect x="291" y="185" width="80" height="26" rx="13" 
            fill="#0f172a" stroke="#06d6a0" 
            strokeWidth="1" strokeOpacity="0.6"/>
          <text x="307" y="203" textAnchor="middle" 
            fontSize="12">⭐</text>
          <text x="336" y="201" textAnchor="middle" 
            fill="#6ee7b7" fontSize="9" 
            fontFamily="monospace" fontWeight="bold">9.2/10</text>
        </g>

      </svg>
    </div>
  );
};

export default HeroDarkIllustration;
