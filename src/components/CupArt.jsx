const GLASS_CUP = 'M10,16 L70,16 L58,90 L22,90 Z'
const LIQUID_CUP_HIGH = 'M13,30 L67,30 L58,88 L22,88 Z'
const LIQUID_CUP_LOW = 'M13,34 L67,34 L58,88 L22,88 Z'
const GLASS_JAR = 'M10,26 Q10,86 40,86 Q70,86 70,26 L58,16 L22,16 Z'
const LIQUID_JAR = 'M13,34 Q13,82 40,82 Q67,82 67,34 Z'

function GlassOutline({ d = GLASS_CUP }) {
  return <path d={d} fill="var(--elev-2)" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
}

function Straw({ x, color }) {
  return <line x1={x} y1="4" x2={x} y2="34" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
}

const ARTS = {
  mora: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cff" />
          <stop offset="1" stopColor="#3d2fae" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_HIGH} fill={`url(#${gid})`} />
      <ellipse cx="40" cy="30" rx="27" ry="6" fill="#a98bff" />
      <line x1="58" y1="4" x2="44" y2="32" stroke="#f5f4fb" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  mango: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd23d" />
          <stop offset="1" stopColor="#ff8a1e" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_HIGH} fill={`url(#${gid})`} />
      <ellipse cx="40" cy="30" rx="27" ry="6" fill="#ffe28a" />
      <line x1="58" y1="4" x2="44" y2="32" stroke="#f5f4fb" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  maracuya: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a3d" />
          <stop offset="1" stopColor="#e8551f" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_HIGH} fill={`url(#${gid})`} />
      <ellipse cx="40" cy="30" rx="27" ry="6" fill="#ffbd85" />
      <line x1="58" y1="4" x2="44" y2="32" stroke="#f5f4fb" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  tropical: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7dffc4" />
          <stop offset="1" stopColor="#ffb14e" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_HIGH} fill={`url(#${gid})`} />
      <line x1="58" y1="4" x2="44" y2="32" stroke="#f5f4fb" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  michClasica: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd23d" />
          <stop offset="1" stopColor="#c98a1a" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_LOW} fill={`url(#${gid})`} />
      <ellipse cx="40" cy="34" rx="27" ry="6" fill="#fff3c2" />
      <path d="M20,80 h40" stroke="#ffb14e" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  michBora: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a3d" />
          <stop offset="1" stopColor="#c9451a" />
        </linearGradient>
      </defs>
      <GlassOutline />
      <path d={LIQUID_CUP_LOW} fill={`url(#${gid})`} />
      <ellipse cx="40" cy="34" rx="27" ry="6" fill="#ffd7ad" />
      <circle cx="30" cy="20" r="3" fill="var(--pink)" />
      <circle cx="49" cy="20" r="3" fill="var(--mint)" />
    </>
  ),
  pecTropical: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5f9e" />
          <stop offset="1" stopColor="#9b1a5a" />
        </linearGradient>
      </defs>
      <GlassOutline d={GLASS_JAR} />
      <path d={LIQUID_JAR} fill={`url(#${gid})`} />
      <Straw x="30" color="#f5f4fb" />
      <Straw x="50" color="var(--mint)" />
    </>
  ),
  pecExplosiva: (gid) => (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb8ff" />
          <stop offset="1" stopColor="#1a5a9b" />
        </linearGradient>
      </defs>
      <GlassOutline d={GLASS_JAR} />
      <path d={LIQUID_JAR} fill={`url(#${gid})`} />
      <Straw x="30" color="#f5f4fb" />
      <Straw x="50" color="var(--pink)" />
    </>
  ),
  shot: () => (
    <>
      <path d="M26,20 L54,20 L48,66 L32,66 Z" fill="var(--elev-2)" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
      <path d="M29,32 L51,32 L47,64 L33,64 Z" fill="#ffd23d" />
      <rect x="24" y="66" width="32" height="8" fill="var(--elev-2)" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
    </>
  ),
  botella: () => (
    <>
      <path
        d="M34,10 L46,10 L46,26 L54,38 L54,86 L26,86 L26,38 L34,26 Z"
        fill="var(--elev-2)"
        stroke="rgba(255,255,255,.18)"
        strokeWidth="1.5"
      />
      <path d="M28,44 L52,44 L52,84 L28,84 Z" fill="#7a4a1e" />
      <rect x="33" y="14" width="14" height="6" fill="var(--mint)" />
    </>
  ),
}

export default function CupArt({ variant }) {
  const build = ARTS[variant]
  if (!build) return null
  const gid = 'g-' + variant
  return (
    <svg viewBox="0 0 80 100" width="100%" height="100%">
      {build(gid)}
    </svg>
  )
}
