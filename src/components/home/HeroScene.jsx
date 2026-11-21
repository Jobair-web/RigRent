/** Decorative construction-site illustration (inline SVG, no external assets). */
export default function HeroScene({ className }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1B34" /><stop offset=".55" stopColor="#1E3A8A" /><stop offset=".82" stopColor="#E08A2E" /><stop offset="1" stopColor="#F6B35C" />
        </linearGradient>
        <radialGradient id="hs-glow"><stop offset="0" stopColor="#FDE68A" stopOpacity=".8" /><stop offset="1" stopColor="#FDE68A" stopOpacity="0" /></radialGradient>
        <pattern id="hs-win" width="14" height="20" patternUnits="userSpaceOnUse"><rect x="4" y="5" width="5" height="8" fill="#FCD34D" opacity=".55" /></pattern>
      </defs>
      <rect width="800" height="500" fill="url(#hs-sky)" />
      <g fill="#fff" opacity=".7"><circle cx="600" cy="40" r="1.6" /><circle cx="680" cy="90" r="1.2" /><circle cx="420" cy="60" r="1.4" /><circle cx="760" cy="30" r="1.6" /><circle cx="330" cy="30" r="1.2" /><circle cx="540" cy="110" r="1.2" /></g>
      <circle cx="520" cy="380" r="230" fill="url(#hs-glow)" /><circle cx="520" cy="380" r="64" fill="#FDE68A" />
      <g id="hs-bl"><rect x="40" y="300" width="60" height="150" /><rect x="110" y="230" width="50" height="220" /><rect x="170" y="320" width="70" height="130" /><rect x="560" y="250" width="60" height="200" /><rect x="630" y="320" width="50" height="130" /><rect x="690" y="210" width="80" height="240" /></g>
      <use href="#hs-bl" fill="#14305F" /><use href="#hs-bl" fill="url(#hs-win)" />
      <g stroke="#F59E0B" fill="none" strokeLinecap="round">
        <path d="M134 440V110M148 440V110" strokeWidth="3" />
        <path d="M134 440L148 410L134 380L148 350L134 320L148 290L134 260L148 230L134 200L148 170L134 140L148 110" strokeWidth="1.5" opacity=".8" />
        <path d="M40 110H330" strokeWidth="4" />
        <path d="M141 76L330 108M141 76L40 108M141 76V110" strokeWidth="2" />
        <path d="M60 110L80 96L100 110L120 96M170 110L190 96L210 110L230 96L250 110L270 96L290 110" strokeWidth="1.5" opacity=".8" />
        <path d="M290 110V226" stroke="#CBD5E1" strokeWidth="1.5" /><path d="M290 214L262 232M290 214L318 232" stroke="#CBD5E1" strokeWidth="1.5" />
      </g>
      <rect x="128" y="94" width="26" height="16" rx="3" fill="#0B1B34" /><rect x="40" y="112" width="26" height="18" fill="#1E293B" /><rect x="258" y="232" width="64" height="9" rx="2" fill="#94A3B8" />
      <path d="M0 438C140 424 260 446 400 440S660 428 800 440V500H0Z" fill="#050D1C" />
      <path d="M0 438C140 424 260 446 400 440S660 428 800 440" fill="none" stroke="#F59E0B" strokeOpacity=".4" strokeWidth="2" />
      <g>
        <rect x="430" y="418" width="230" height="36" rx="18" fill="#050D1C" />
        <circle cx="452" cy="436" r="12" fill="#1E293B" /><circle cx="545" cy="436" r="9" fill="#1E293B" /><circle cx="638" cy="436" r="12" fill="#1E293B" />
        <rect x="465" y="360" width="160" height="58" rx="8" fill="#0F2547" /><rect x="465" y="392" width="160" height="8" fill="#F59E0B" />
        <path d="M530 360V318H590L612 360Z" fill="#12305C" /><path d="M538 356V326H584L600 356Z" fill="#7DD3FC" opacity=".55" />
        <rect x="612" y="366" width="42" height="48" rx="6" fill="#0B1B34" />
        <path d="M482 372L398 286" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" /><path d="M398 286L338 372" stroke="#D97706" strokeWidth="12" strokeLinecap="round" />
        <path d="M472 350L424 300M394 292L366 336" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <path d="M326 362L292 378L304 410L348 402Z" fill="#F59E0B" />
      </g>
    </svg>
  );
}
