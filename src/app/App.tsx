import React, { useState, useEffect, useRef } from 'react';
import { Home, Mic, RotateCcw, Zap, User, Lightbulb, ListChecks, BookOpen, MessageSquare, Scissors, Share2, Trash2 } from 'lucide-react';

// ─── Color Tokens ─────────────────────────────────────────────────────────────
const LIGHT_C = {
  bg: '#F5F0EB', card: '#EDE5D8', cardDeep: '#DDD0BC', text: '#1E1508',
  sec: '#A08050', secDark: '#6A5030', indian: '#C4722A', terracottaDeep: '#9A4E18',
  terracottaLight: '#E09050', idaAccent: '#C9B8A0', idaLabel: '#6A5030',
  idaPrimary: '#EDE5D8', pingalaRed: '#9A4E18', pingalaOrange: '#C4722A',
  pingalaGlow: '#E09050', gold: '#D4A847', brightGold: '#ECC870', honey: '#D4A847',
  prana: '#C9B8A0', tejas: '#C4722A', ojas: '#D4A847', btn: '#C4722A', green: '#4A7C59',
  panel: '#1E1508', navBg: 'rgba(250,243,236,0.96)',
};
const DARK_C = {
  bg: '#0F0A04', card: '#1C1408', cardDeep: '#2C1E0C', text: '#F0E4CC',
  sec: '#7A6040', secDark: '#C0A878', indian: '#D4823A', terracottaDeep: '#9A4E18',
  terracottaLight: '#E09050', idaAccent: '#5A4830', idaLabel: '#C0A878',
  idaPrimary: '#1C1408', pingalaRed: '#B05820', pingalaOrange: '#D4823A',
  pingalaGlow: '#E09050', gold: '#D4A847', brightGold: '#ECC870', honey: '#D4A847',
  prana: '#5A4830', tejas: '#D4823A', ojas: '#D4A847', btn: '#C4722A', green: '#5A9C6A',
  panel: '#0C0804', navBg: 'rgba(15,10,4,0.97)',
};
type ThemeMode = 'light' | 'dark' | 'system';
type ColorTokens = typeof LIGHT_C;
const ThemeCtx = React.createContext<{
  colors: ColorTokens; themeMode: ThemeMode; setThemeMode: (m: ThemeMode) => void;
}>({ colors: LIGHT_C, themeMode: 'system', setThemeMode: () => {} });
function useColors(): ColorTokens { return React.useContext(ThemeCtx).colors; }
function useThemeMode() { const { themeMode, setThemeMode } = React.useContext(ThemeCtx); return { themeMode, setThemeMode }; }

type ScreenId = 'welcome' | 'signin' | 'onboarding' | 'wristband' | 'tutorial' | 'home' | 'speak' | 'captured' | 'revisit' | 'restore' | 'profile';
interface ScreenProps { onNav: (id: ScreenId) => void; sc: number; }
const s = (n: number, sc: number) => n * sc;

// ─── Responsive Scale Hook ─────────────────────────────────────────────────────
function useResponsiveSc() {
  const [vw, setVw] = useState(() => window.innerWidth);
  const [vh, setVh] = useState(() => window.innerHeight);
  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const TOOLBAR_H = 48, PILLS_H = 72, PROTO_PAD_V = 56, SIDE_PANEL_W = 320, PROTO_GAP = 36;
  const protoH  = vh - TOOLBAR_H - PILLS_H - PROTO_PAD_V;
  const protoW  = vw - SIDE_PANEL_W - PROTO_GAP - 40;
  const protoSc = Math.min(protoH / 852, protoW / 393, 0.96);
  const canvasSc = Math.min(vw - 104, 170 * 3.5) / 3.5 / 393;
  return { protoSc: Math.max(protoSc, 0.48), canvasSc: Math.max(canvasSc, 0.30) };
}

// ─── Live Clock Hook ───────────────────────────────────────────────────────────
function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  const mm = String(m).padStart(2,'0');
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return {
    dateLabel: `${DAYS[now.getDay()]} · ${hh}:${mm} ${ampm}`,
    timeShort: `${hh}:${mm}`,
    greeting,
  };
}

// ─── Status Bar ────────────────────────────────────────────────────────────────
function StatusBar({ sc, dark = false }: { sc: number; dark?: boolean }) {
  const C = useColors();
  const { timeShort } = useLiveClock();
  const col = dark ? 'rgba(245,240,235,0.9)' : C.text;
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: s(50, sc), display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: `0 ${s(22, sc)}px ${s(8, sc)}px`, zIndex: 50, pointerEvents: 'none' }}>
      <span style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(11.5, sc), fontWeight: 500, color: col, letterSpacing: 0.3 }}>{timeShort}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: s(5, sc) }}>
        {/* Signal bars */}
        <svg width={s(15, sc)} height={s(11, sc)} viewBox="0 0 15 11" fill={col}>
          <rect x="0"   y="8"   width="3" height="3"   rx="0.6" opacity="1"/>
          <rect x="4"   y="5.5" width="3" height="5.5" rx="0.6" opacity="1"/>
          <rect x="8"   y="2.5" width="3" height="8.5" rx="0.6" opacity="1"/>
          <rect x="12"  y="0"   width="3" height="11"  rx="0.6" opacity="0.35"/>
        </svg>
        {/* WiFi */}
        <svg width={s(14, sc)} height={s(11, sc)} viewBox="0 0 18 14" fill="none">
          <path d="M1,5 Q4.5,1.5 9,1.5 Q13.5,1.5 17,5" stroke={col} strokeWidth="1.6" strokeLinecap="round" opacity="0.35"/>
          <path d="M3.5,8 Q6,5.5 9,5.5 Q12,5.5 14.5,8" stroke={col} strokeWidth="1.6" strokeLinecap="round" opacity="0.65"/>
          <path d="M6,11 Q7.5,9.5 9,9.5 Q10.5,9.5 12,11" stroke={col} strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="9" cy="13.2" r="1.3" fill={col}/>
        </svg>
        {/* Battery */}
        <svg width={s(22, sc)} height={s(11, sc)} viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke={col} strokeWidth="1.2"/>
          <rect x="20.8" y="3.8" width="3" height="4.4" rx="1" fill={col} opacity="0.55"/>
          <rect x="2" y="2.5" width="14.5" height="7" rx="1.5" fill={col}/>
        </svg>
      </div>
    </div>
  );
}

// ─── PhoneFrame ────────────────────────────────────────────────────────────────
function PhoneFrame({ children, sc = 1 }: { children: React.ReactNode; sc?: number }) {
  const C = useColors();
  return (
    <div style={{ width: s(393, sc), height: s(852, sc), borderRadius: s(47, sc), background: '#111', position: 'relative', flexShrink: 0, boxShadow: `0 0 0 ${s(1.5, sc)}px #3A3A3A, 0 ${s(24, sc)}px ${s(60, sc)}px rgba(0,0,0,0.6), 0 ${s(8, sc)}px ${s(20, sc)}px rgba(0,0,0,0.3)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: s(47, sc), overflow: 'hidden', background: C.bg, fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif' }}>
        {children}
      </div>
      {/* Dynamic Island */}
      <div style={{ position: 'absolute', top: s(14, sc), left: '50%', transform: 'translateX(-50%)', width: s(126, sc), height: s(37, sc), background: '#080808', borderRadius: s(20, sc), zIndex: 200, pointerEvents: 'none' }} />
    </div>
  );
}

// ─── BottomNav ─────────────────────────────────────────────────────────────────
function BottomNav({ active, onNav, sc }: { active: ScreenId; onNav: (id: ScreenId) => void; sc: number }) {
  const C = useColors();
  const tabs: { id: ScreenId; label: string; Icon: React.ElementType; speakSize?: boolean }[] = [
    { id: 'home',    label: 'Home',    Icon: Home    },
    { id: 'speak',   label: 'Speak',   Icon: Mic, speakSize: true },
    { id: 'revisit', label: 'Revisit', Icon: RotateCcw },
    { id: 'restore', label: 'Restore', Icon: Zap     },
    { id: 'profile', label: 'Profile', Icon: User    },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: s(84, sc), background: C.navBg, backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 100, borderTop: `${s(0.5, sc)}px solid rgba(138,117,96,0.12)` }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const iconSz = tab.speakSize ? s(22, sc) : s(20, sc);
        return (
          <div key={tab.id} onClick={() => onNav(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: s(3, sc), position: 'relative', paddingTop: s(6, sc), paddingBottom: s(8, sc) }}>
            <tab.Icon size={iconSz} strokeWidth={1.8} color={isActive ? C.btn : 'rgba(138,117,96,0.55)'} style={{ transition: 'color 0.18s' }} />
            <span style={{ fontSize: s(9, sc), fontWeight: isActive ? 600 : 500, color: isActive ? C.btn : 'rgba(138,117,96,0.55)', fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', letterSpacing: 0.3, transition: 'color 0.18s' }}>{tab.label}</span>
            {isActive && <div style={{ position: 'absolute', bottom: s(6, sc), width: s(18, sc), height: s(2.5, sc), background: C.btn, borderRadius: s(2, sc) }} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── EnergyBlob ────────────────────────────────────────────────────────────────
function EnergyBlob({ value, sc }: { value: number; sc: number }) {
  const C = useColors();
  return (
    <div style={{ width: s(195, sc), height: s(195, sc), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <div style={{ position: 'absolute', width: '138%', height: '138%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,71,0.12) 0%, rgba(192,57,43,0.07) 55%, transparent 80%)', animation: 'blobPulse 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: '112%', height: '112%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,71,0.08) 0%, rgba(192,57,43,0.04) 60%, transparent 80%)', animation: 'blobPulse 6s ease-in-out infinite reverse' }} />
      <div style={{ width: '100%', height: '100%', background: `radial-gradient(circle at 35% 35%, ${C.brightGold}, ${C.pingalaOrange} 45%, ${C.pingalaGlow} 70%, ${C.btn})`, animation: 'blobPulse 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: s(9, sc), color: 'rgba(255,255,255,0.78)', letterSpacing: s(2.5, sc), textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>ENERGY</span>
        <span style={{ fontSize: s(52, sc), color: '#fff', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 100, lineHeight: 1 }}>{value}</span>
      </div>
    </div>
  );
}

// ─── BraidedBand SVG ──────────────────────────────────────────────────────────
function BraidedBand({ sc, strapColor = '#C9B8A0', state = 'neutral' }: { sc: number; strapColor?: string; state?: 'warm' | 'cool' | 'neutral' }) {
  const coreGrad = state === 'warm' ? [['0%','#ECC870'],['60%','#C4722A'],['100%','#8A4E1A']] : state === 'cool' ? [['0%','#E4D8C4'],['60%','#A89880'],['100%','#6A5030']] : [['0%','#C8A870'],['60%','#A08050'],['100%','#6A5030']];
  const ringColor = state === 'warm' ? '#C4722A' : state === 'cool' ? '#A89880' : '#A08050';
  const strandOpacity = state === 'cool' ? 0.6 : state === 'neutral' ? 0.8 : 1;
  const breatheDur = state === 'warm' ? '1.8s' : state === 'cool' ? '4s' : '2.8s';
  const breatheDelay = state === 'warm' ? '-0.9s' : state === 'cool' ? '-2s' : '-1.4s';
  const uid = `bb-${state}-${strapColor.replace('#','')}`;
  const w = s(280, sc), h = s(66, sc);
  return (
    <svg width={w} height={h} viewBox="0 0 280 66" style={{ overflow: 'visible' }}>
      <defs>
        <style>{`.bbr-${uid}{animation:bandBreathe ${breatheDur} ease-in-out infinite;transform-origin:140px 33px;animation-delay:${breatheDelay}}.bbc-${uid}{animation:bandBreathe ${breatheDur} ease-in-out infinite;transform-origin:140px 33px}`}</style>
        <clipPath id={`clip-${uid}`}><rect x="11" y="5" width="258" height="56" rx="28"/></clipPath>
        <linearGradient id={`strap-${uid}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={strapColor} stopOpacity="0"/><stop offset="22%" stopColor={strapColor}/><stop offset="78%" stopColor={strapColor}/><stop offset="100%" stopColor={strapColor} stopOpacity="0"/></linearGradient>
        <radialGradient id={`core-${uid}`} cx="50%" cy="50%" r="50%">{coreGrad.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color}/>)}</radialGradient>
      </defs>
      <rect x="11" y="5" width="258" height="56" rx="28" fill={`url(#strap-${uid})`} stroke="#A89880" strokeWidth="0.5"/>
      <g clipPath={`url(#clip-${uid})`}>
        <path d="M11,33 Q55,17 99,33 Q143,49 187,33 Q220,19 269,33" fill="none" stroke="#8A4E1A" strokeWidth="13" strokeOpacity={0.5 * strandOpacity}/>
        <path d="M11,33 Q55,17 99,33 Q143,49 187,33 Q220,19 269,33" fill="none" stroke="#C4722A" strokeWidth="8" strokeOpacity={strandOpacity}/>
        <path d="M11,33 Q55,49 99,33 Q143,17 187,33 Q220,47 269,33" fill="none" stroke="#9A7828" strokeWidth="14" strokeOpacity={0.5 * strandOpacity}/>
        <path d="M11,33 Q55,49 99,33 Q143,17 187,33 Q220,47 269,33" fill="none" stroke="#D4A847" strokeWidth="9" strokeOpacity={strandOpacity}/>
        <path d="M11,27 Q55,33 99,27 Q143,21 187,27 Q220,31 269,27" fill="none" stroke="#A89880" strokeWidth="7" strokeOpacity={0.8 * strandOpacity}/>
      </g>
      <rect x="8"   y="14" width="13" height="34" rx="2.5" fill="#3E3018" stroke="#6A5030" strokeWidth="0.8"/>
      <circle cx="14.5" cy="23" r="1.6" fill="#6A5030"/><circle cx="14.5" cy="31" r="1.6" fill="#6A5030"/><circle cx="14.5" cy="39" r="1.6" fill="#6A5030"/>
      <rect x="259" y="14" width="13" height="34" rx="2.5" fill="#3E3018" stroke="#6A5030" strokeWidth="0.8"/>
      <circle cx="265.5" cy="23" r="1.6" fill="#6A5030"/><circle cx="265.5" cy="31" r="1.6" fill="#6A5030"/><circle cx="265.5" cy="39" r="1.6" fill="#6A5030"/>
      <ellipse cx="140" cy="33" rx="22" ry="17" fill="#2E2010" stroke="#6A5030" strokeWidth="1.5"/>
      <ellipse cx="140" cy="33" rx="15" ry="12" fill="#1E1508" stroke="#8A4E1A" strokeWidth="0.8"/>
      <circle cx="140" cy="33" r="15" fill={ringColor} fillOpacity="0.18" className={`bbr-${uid}`}/>
      <circle cx="140" cy="33" r="10" fill={`url(#core-${uid})`} className={`bbc-${uid}`}/>
      <ellipse cx="136" cy="28.5" rx="3.5" ry="2" fill="white" fillOpacity={state === 'cool' ? 0.14 : state === 'warm' ? 0.32 : 0.22}/>
      <rect x="162" y="27" width="10" height="12" rx="2.5" fill="#3E3018" stroke="#A08050" strokeWidth="0.7"/>
      <circle cx="167" cy="33" r="3" fill="#8A4E1A" fillOpacity="0.75"/>
    </svg>
  );
}

// ─── Flame Logo SVG ────────────────────────────────────────────────────────────
function FlameLogo({ size, sc }: { size: number; sc: number }) {
  return (
    <div style={{ width: s(size, sc), height: s(size, sc), flexShrink: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" rx="42" fill="url(#wTile)"/>
        <ellipse cx="100" cy="130" rx="50" ry="22" fill="rgba(180,60,20,0.35)"/>
        <path d="M100 30 C100 30 58 82 58 118 C58 145 76 168 100 168 C124 168 142 145 142 118 C142 82 100 30 100 30Z" fill="url(#wPetal1)"/>
        <path d="M100 52 C100 52 68 94 68 120 C68 142 82 158 100 158 C118 158 132 142 132 120 C132 94 100 52 100 52Z" fill="url(#wPetal2)"/>
        <path d="M100 74 C100 74 80 106 80 122 C80 138 89 150 100 150 C111 150 120 138 120 122 C120 106 100 74 100 74Z" fill="url(#wPetal3)"/>
        <defs>
          <linearGradient id="wTile" x1="0" y1="0" x2="200" y2="200"><stop offset="0%" stopColor="#CE7E35"/><stop offset="100%" stopColor="#8A4E1A"/></linearGradient>
          <radialGradient id="wPetal1" cx="50%" cy="65%" r="55%"><stop offset="0%" stopColor="#F0C84A" stopOpacity="0.7"/><stop offset="50%" stopColor="#C4722A" stopOpacity="0.75"/><stop offset="100%" stopColor="#7A3810" stopOpacity="0.9"/></radialGradient>
          <radialGradient id="wPetal2" cx="50%" cy="60%" r="55%"><stop offset="0%" stopColor="#F5D870" stopOpacity="0.85"/><stop offset="55%" stopColor="#D4A847" stopOpacity="0.8"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0.7"/></radialGradient>
          <radialGradient id="wPetal3" cx="50%" cy="55%" r="55%"><stop offset="0%" stopColor="#FFFBE8" stopOpacity="1"/><stop offset="40%" stopColor="#F0D060" stopOpacity="0.95"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0.8"/></radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// ─── Screen 01 - Welcome ───────────────────────────────────────────────────────
function WelcomeScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  return (
    <div style={{ height: '100%', background: `linear-gradient(175deg, ${C.bg} 0%, ${C.card} 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: `${s(68, sc)}px ${s(28, sc)}px ${s(44, sc)}px`, overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(20, sc) }}>
        <div style={{ filter: `drop-shadow(0 ${s(12, sc)}px ${s(32, sc)}px rgba(196,114,42,0.4))`, animation: 'floatLogo 4s ease-in-out infinite' }}>
          <FlameLogo size={110} sc={sc} />
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(8, sc) }}>
          <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(60, sc), fontWeight: 100, color: C.indian, letterSpacing: s(14, sc), lineHeight: 1 }}>NADI</div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 600, color: C.sec, lineHeight: 1.6, letterSpacing: s(1.5, sc) }}>feel your energy</p>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: s(12, sc), alignItems: 'center' }}>
        <button onClick={() => onNav('onboarding')} style={{ width: '100%', height: s(56, sc), background: C.btn, borderRadius: s(16, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(17, sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(196,114,42,0.38)` }}>Create account</button>
        <button onClick={() => onNav('signin')} style={{ width: '100%', height: s(52, sc), background: 'transparent', borderRadius: s(16, sc), border: `${s(1.5, sc)}px solid rgba(196,114,42,0.4)`, color: C.text, fontFamily: 'DM Sans, sans-serif', fontSize: s(17, sc), fontWeight: 500, cursor: 'pointer' }}>Sign in</button>
        <p style={{ fontSize: s(11, sc), letterSpacing: 0.5, color: 'rgba(138,117,96,0.7)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>A NEW SENSE FOR YOUR MIND</p>
      </div>
    </div>
  );
}

// ─── Screen 02 - Sign In ───────────────────────────────────────────────────────
function SignInScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', padding: `${s(54, sc)}px ${s(24, sc)}px ${s(36, sc)}px`, overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      <button onClick={() => onNav('welcome')} style={{ background: 'none', border: 'none', color: C.sec, fontSize: s(15, sc), cursor: 'pointer', textAlign: 'left', padding: 0, marginBottom: s(28, sc), fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>← Back</button>
      <div style={{ marginBottom: s(32, sc) }}>
        <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(34, sc), fontWeight: 500, color: C.text, marginBottom: s(8, sc) }}>Welcome back.</h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 600, color: C.sec }}>Sign in to continue your rhythm.</p>
      </div>
      <div style={{ marginBottom: s(16, sc) }}>
        <div style={{ fontSize: s(12, sc), color: C.secDark, letterSpacing: 0.6, fontWeight: 600, textTransform: 'uppercase', marginBottom: s(7, sc), fontFamily: 'DM Sans, sans-serif' }}>Email</div>
        <div style={{ height: s(52, sc), background: C.card, borderRadius: s(14, sc), border: `1px solid rgba(138,117,96,0.2)`, display: 'flex', alignItems: 'center', padding: `0 ${s(16, sc)}px` }}>
          <div style={{ width: '55%', height: s(1.5, sc), background: 'rgba(138,117,96,0.35)', borderRadius: 1 }} />
        </div>
      </div>
      <div style={{ marginBottom: s(10, sc) }}>
        <div style={{ fontSize: s(12, sc), color: C.secDark, letterSpacing: 0.6, fontWeight: 600, textTransform: 'uppercase', marginBottom: s(7, sc), fontFamily: 'DM Sans, sans-serif' }}>Password</div>
        <div style={{ height: s(52, sc), background: C.card, borderRadius: s(14, sc), border: `1px solid rgba(138,117,96,0.2)`, display: 'flex', alignItems: 'center', padding: `0 ${s(16, sc)}px` }}>
          <div style={{ width: '40%', height: s(1.5, sc), background: 'rgba(138,117,96,0.35)', borderRadius: 1 }} />
        </div>
      </div>
      <div style={{ textAlign: 'right', marginBottom: s(24, sc) }}>
        <span style={{ fontSize: s(14, sc), color: C.indian, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Forgot password?</span>
      </div>
      <button onClick={() => onNav('home')} style={{ width: '100%', height: s(54, sc), background: C.btn, borderRadius: s(16, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(17, sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(192,57,43,0.35)`, marginBottom: s(22, sc) }}>Sign in</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: s(10, sc), marginBottom: s(18, sc) }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(138,117,96,0.18)' }} />
        <span style={{ fontSize: s(13, sc), color: 'rgba(106,80,48,0.8)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(138,117,96,0.18)' }} />
      </div>
      {/* Apple sign-in button */}
      <div style={{ height: s(52, sc), background: C.card, borderRadius: s(14, sc), border: `1px solid rgba(138,117,96,0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: s(9, sc), cursor: 'pointer', marginBottom: s(10, sc), fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 600, color: C.text }}>
        {/* Apple logo — correct silhouette */}
        <svg width={s(18, sc)} height={s(22, sc)} viewBox="0 0 24 24" fill={C.text}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        Continue with Apple
      </div>
      {/* Google sign-in button */}
      <div style={{ height: s(52, sc), background: C.card, borderRadius: s(14, sc), border: `1px solid rgba(138,117,96,0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: s(9, sc), cursor: 'pointer', marginBottom: s(10, sc), fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 600, color: C.text }}>
        {/* Google G logo */}
        <svg width={s(18, sc)} height={s(18, sc)} viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </div>
    </div>
  );
}

// ─── Screen 03 - Onboarding ───────────────────────────────────────────────────
function OnboardingScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [slide, setSlide] = useState(0);
  const [showPermissions, setShowPermissions] = useState(false);
  const [granted, setGranted] = useState([false, false, false]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    if (w === 0) return;
    const idx = Math.round(scrollRef.current.scrollLeft / w);
    setSlide(Math.min(2, Math.max(0, idx)));
  };

  const goToSlide = (i: number) => {
    scrollRef.current?.scrollTo({ left: i * (scrollRef.current.offsetWidth), behavior: 'smooth' });
    setSlide(i);
  };

  const infographics = [
    {
      id: 'decisions', label: 'The Problem', stat: '35,000', unit: 'decisions / day',
      caption: 'Most are invisible — and collectively drain your cognitive reserves by afternoon.',
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4722A" stopOpacity="0.95"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0.5"/></linearGradient>
            <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9A4E18" stopOpacity="0.95"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0.4"/></linearGradient>
          </defs>
          <path d="M20,25 Q50,20 80,30 Q110,42 130,55 Q155,70 175,90 Q200,108 250,115" fill="none" stroke="#C4722A" strokeWidth="2.5" strokeOpacity="0.35" strokeDasharray="4 3"/>
          {[{x:22,h:90,label:'8am',color:'url(#barGrad1)',opacity:1},{x:57,h:78,label:'10am',color:'url(#barGrad1)',opacity:0.9},{x:92,h:60,label:'12pm',color:'url(#barGrad1)',opacity:0.75},{x:127,h:44,label:'2pm',color:'url(#barGrad2)',opacity:0.65},{x:162,h:28,label:'4pm',color:'url(#barGrad2)',opacity:0.5},{x:197,h:15,label:'6pm',color:'url(#barGrad2)',opacity:0.35},{x:232,h:8,label:'8pm',color:'url(#barGrad2)',opacity:0.22}].map(({x,h,label,color,opacity})=>(
            <g key={x} opacity={opacity}><rect x={x} y={108-h} width="24" height={h} rx="5" fill={color}/><text x={x+12} y={127} textAnchor="middle" fontFamily="Josefin Sans" fontSize="8" fill="#A08050">{label}</text></g>
          ))}
          <text x="14" y="16" fontFamily="Josefin Sans" fontSize="8" fill="#C4722A" opacity="0.8">COGNITIVE CAPACITY</text>
          <rect x="168" y="93" width="100" height="22" rx="5" fill="#9A4E18" fillOpacity="0.08"/>
          <text x="218" y="107" textAnchor="middle" fontFamily="Josefin Sans" fontSize="7.5" fill="#9A4E18" opacity="0.7">DEPLETED ZONE</text>
        </svg>
      ),
    },
    {
      id: 'channels', label: 'Your Energy', stat: '3', unit: 'nadi channels',
      caption: 'Drive · Balance · Rest — NADI reads all three simultaneously through your skin.',
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="driveGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C4722A" stopOpacity="0"/><stop offset="30%" stopColor="#C4722A" stopOpacity="0.9"/><stop offset="70%" stopColor="#C4722A" stopOpacity="0.9"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0"/></linearGradient>
            <linearGradient id="balGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#D4A847" stopOpacity="0"/><stop offset="30%" stopColor="#D4A847" stopOpacity="0.9"/><stop offset="70%" stopColor="#D4A847" stopOpacity="0.9"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0"/></linearGradient>
            <linearGradient id="restGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C9B8A0" stopOpacity="0"/><stop offset="30%" stopColor="#C9B8A0" stopOpacity="0.9"/><stop offset="70%" stopColor="#C9B8A0" stopOpacity="0.9"/><stop offset="100%" stopColor="#C9B8A0" stopOpacity="0"/></linearGradient>
          </defs>
          <text x="10" y="38" fontFamily="Josefin Sans" fontSize="8.5" fill="#C4722A">DRIVE</text>
          <text x="10" y="70" fontFamily="Josefin Sans" fontSize="8.5" fill="#D4A847">BALANCE</text>
          <text x="10" y="102" fontFamily="Josefin Sans" fontSize="8.5" fill="#C9B8A0">REST</text>
          <path d="M56,34 Q70,18 84,34 Q98,50 112,34 Q126,18 140,34 Q154,50 168,34 Q182,18 196,34 Q210,50 224,34 Q238,18 252,34" fill="none" stroke="url(#driveGrad)" strokeWidth="9"/>
          <path d="M56,66 Q84,54 112,66 Q140,78 168,66 Q196,54 224,66 Q252,78 280,66" fill="none" stroke="url(#balGrad)" strokeWidth="7"/>
          <path d="M56,98 Q84,88 112,98 Q140,108 168,98 Q196,88 224,98 Q252,108 280,98" fill="none" stroke="url(#restGrad)" strokeWidth="8"/>
          <circle cx="140" cy="66" r="7" fill="#D4A847" fillOpacity="0.22" stroke="#D4A847" strokeWidth="1.5"/>
          <circle cx="140" cy="66" r="4" fill="#D4A847" fillOpacity="0.9"/>
          <text x="150" y="62" fontFamily="Josefin Sans" fontSize="7.5" fill="#D4A847" opacity="0.9">sensing now</text>
          <text x="140" y="133" textAnchor="middle" fontFamily="Josefin Sans" fontSize="8" fill="#A08050">REAL-TIME · THROUGH YOUR SKIN</text>
        </svg>
      ),
    },
    {
      id: 'language', label: 'Thermal Language', stat: '°C', unit: 'speaks in temperature',
      caption: "No numbers on screen. No vibrations. The band becomes part of your body's own language.",
      visual: (
        <svg width="100%" height="100%" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="warmGlow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C4722A" stopOpacity="0.35"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0"/></radialGradient>
            <radialGradient id="neutGlow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#D4A847" stopOpacity="0.28"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0"/></radialGradient>
            <radialGradient id="coolGlow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C9B8A0" stopOpacity="0.22"/><stop offset="100%" stopColor="#C9B8A0" stopOpacity="0"/></radialGradient>
          </defs>
          {[{cx:54,color:'#C4722A',glow:'url(#warmGlow2)',label:'Warm',temp:'37–38°C',glowR:38},{cx:140,color:'#D4A847',glow:'url(#neutGlow2)',label:'Neutral',temp:'34–35°C',glowR:32},{cx:226,color:'#C9B8A0',glow:'url(#coolGlow2)',label:'Cooling',temp:'30–32°C',glowR:28}].map(({cx,color,glow,label,temp,glowR})=>(
            <g key={label}>
              <ellipse cx={cx} cy={62} rx={glowR} ry={glowR*0.7} fill={glow}/>
              <rect x={cx-32} y={48} width={64} height={26} rx={13} fill="#DDD0BC" stroke="#C9B8A0" strokeWidth="0.9"/>
              <path d={`M${cx-28},62 Q${cx-14},54 ${cx},62 Q${cx+14},70 ${cx+28},62`} fill="none" stroke={color} strokeWidth="4" strokeOpacity="0.85"/>
              <circle cx={cx} cy={62} r={10} fill="#2E2010" stroke="#6A5030" strokeWidth="1"/>
              <circle cx={cx} cy={62} r={7} fill={color} fillOpacity="0.88"/>
              <text x={cx} y={93} textAnchor="middle" fontFamily="Josefin Sans" fontSize="9" fill={color}>{label}</text>
              <text x={cx} y={106} textAnchor="middle" fontFamily="DM Sans" fontSize="8" fill="#A08050">{temp}</text>
            </g>
          ))}
          <text x="90" y="64" textAnchor="middle" fontFamily="DM Sans" fontSize="10" fill="#A08050" opacity="0.5">→</text>
          <text x="178" y="64" textAnchor="middle" fontFamily="DM Sans" fontSize="10" fill="#A08050" opacity="0.5">→</text>
          <text x="140" y="133" textAnchor="middle" fontFamily="Josefin Sans" fontSize="8" fill="#A08050">NO SCREEN · NO ALERTS · JUST FEEL</text>
        </svg>
      ),
    },
  ];

  const permissions = [
    { icon: '📡', title: 'Wristband', desc: 'Connect for real-time cognitive sensing.', accent: C.idaAccent },
    { icon: '🎙️', title: 'Microphone', desc: 'Voice thought capture when you press & speak.', accent: C.gold },
    { icon: '🫀', title: 'Health Baseline', desc: 'Establish your personal energy patterns over 7 days.', accent: C.pingalaOrange },
  ];
  const toggle = (i: number) => setGranted(prev => prev.map((v, idx) => idx === i ? !v : v));

  if (showPermissions) {
    return (
      <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: `${s(52, sc)}px ${s(22, sc)}px ${s(28, sc)}px`, boxSizing: 'border-box' }}>
        <StatusBar sc={sc} />
        <div style={{ display: 'flex', gap: s(5, sc), marginBottom: s(20, sc), flexShrink: 0 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ flex: i === 3 ? 2 : 1, height: s(3, sc), background: C.indian, borderRadius: s(2, sc) }}/>)}
        </div>
        <div style={{ flexShrink: 0, fontSize: s(11, sc), letterSpacing: s(2.5, sc), color: C.secDark, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 400, textTransform: 'uppercase', marginBottom: s(6, sc) }}>Getting started</div>
        <h1 style={{ flexShrink: 0, fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 500, color: C.text, marginBottom: s(5, sc), lineHeight: 1.25 }}>Establish your rhythm.</h1>
        <p style={{ flexShrink: 0, fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, color: C.sec, marginBottom: s(16, sc), lineHeight: 1.6 }}>These signals help NADI learn your personal energy baseline over the first 7 days.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(9, sc), flexShrink: 0 }}>
          {permissions.map((card, i) => (
            <div key={card.title} onClick={() => toggle(i)} style={{ background: C.card, borderRadius: s(14, sc), padding: `${s(12, sc)}px ${s(13, sc)}px`, border: granted[i] ? `1px solid ${card.accent}` : `1px solid ${C.cardDeep}`, boxShadow: granted[i] ? `0 0 0 ${s(2, sc)}px ${card.accent}28` : 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(11, sc), cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: s(42, sc), height: s(42, sc), borderRadius: s(12, sc), background: `${card.accent}33`, border: `1.5px solid ${card.accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(18, sc), flexShrink: 0 }}>{card.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: s(15, sc), color: C.text, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', marginBottom: s(2, sc) }}>{card.title}</div>
                <div style={{ fontSize: s(13, sc), color: C.sec, fontWeight: 500, lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif' }}>{card.desc}</div>
              </div>
              <div style={{ width: s(22, sc), height: s(22, sc), borderRadius: s(6, sc), background: granted[i] ? card.accent : 'transparent', border: `1.5px solid ${granted[i] ? card.accent : C.cardDeep}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: s(11, sc), color: '#fff', transition: 'all 0.2s' }}>{granted[i] ? '✓' : ''}</div>
            </div>
          ))}
        </div>
        <div style={{ flexShrink: 0, background: 'rgba(212,168,71,0.08)', borderRadius: s(11, sc), border: `1px solid rgba(212,168,71,0.22)`, padding: `${s(9, sc)}px ${s(12, sc)}px`, margin: `${s(14, sc)}px 0`, fontSize: s(13, sc), color: C.sec, fontWeight: 600, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>🔒 All processing happens on device. NADI never sells or shares your data.</div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: s(10, sc) }}>
          <button onClick={() => setShowPermissions(false)} style={{ flex: 1, height: s(48, sc), background: 'transparent', borderRadius: s(13, sc), border: `1.5px solid ${C.cardDeep}`, color: C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, cursor: 'pointer' }}>← Back</button>
          <button onClick={() => onNav('wristband')} style={{ flex: 2, height: s(48, sc), background: C.btn, borderRadius: s(13, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(16, sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.35)` }}>Allow &amp; Continue →</button>
        </div>
      </div>
    );
  }

  const progressH = s(55, sc);
  const footerH   = s(114, sc);
  const carouselH = s(852, sc) - progressH - footerH;
  const slidePad  = s(34, sc);
  const lblBlk    = s(18, sc);
  const statBlk   = s(64, sc);
  const capBlk    = s(54, sc);
  const visualH   = Math.max(carouselH - slidePad - lblBlk - statBlk - capBlk, s(60, sc));

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      <div style={{ height: progressH, display: 'flex', alignItems: 'flex-end', padding: `0 ${s(22, sc)}px ${s(4, sc)}px`, flexShrink: 0, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: s(5, sc), width: '100%' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: i === slide ? 2.5 : 1, height: s(3, sc), background: i <= slide ? C.indian : C.cardDeep, borderRadius: s(2, sc), transition: 'all 0.35s ease' }}/>
          ))}
        </div>
      </div>
      <div ref={scrollRef} onScroll={handleScroll} style={{ width: '100%', height: carouselH, flexShrink: 0, display: 'flex', flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        {infographics.map((info) => (
          <div key={info.id} style={{ minWidth: '100%', width: '100%', height: carouselH, flexShrink: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', padding: `${s(22, sc)}px ${s(22, sc)}px ${s(12, sc)}px`, boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ flexShrink: 0, fontSize: s(11, sc), letterSpacing: s(3, sc), color: C.secDark, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 400, textTransform: 'uppercase', marginBottom: s(8, sc) }}>{info.label}</div>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: s(8, sc), marginBottom: s(8, sc) }}>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(56, sc), fontWeight: 100, color: C.indian, lineHeight: 1 }}>{info.stat}</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), color: C.sec, fontWeight: 500 }}>{info.unit}</span>
            </div>
            <p style={{ flexShrink: 0, fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, color: C.sec, lineHeight: 1.6, marginBottom: s(14, sc) }}>{info.caption}</p>
            <div style={{ width: '100%', height: visualH, flexShrink: 0, background: C.card, borderRadius: s(18, sc), border: `1px solid ${C.cardDeep}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {info.visual}
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: footerH, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: `0 ${s(22, sc)}px ${s(28, sc)}px`, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: s(8, sc), marginBottom: s(16, sc) }}>
          {infographics.map((_, i) => (
            <div key={i} onClick={() => goToSlide(i)} style={{ width: slide === i ? s(22, sc) : s(8, sc), height: s(8, sc), borderRadius: s(4, sc), background: slide === i ? C.indian : C.cardDeep, cursor: 'pointer', transition: 'all 0.25s ease' }}/>
          ))}
        </div>
        <button onClick={() => slide < 2 ? goToSlide(slide + 1) : setShowPermissions(true)} style={{ width: '100%', height: s(50, sc), background: slide === 2 ? C.btn : 'transparent', borderRadius: s(14, sc), border: slide === 2 ? 'none' : `1.5px solid rgba(196,114,42,0.35)`, color: slide === 2 ? '#fff' : C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(16, sc), fontWeight: slide === 2 ? 600 : 500, cursor: 'pointer', boxShadow: slide === 2 ? `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.38)` : 'none', transition: 'all 0.3s ease' }}>
          {slide === 2 ? 'Get Started →' : 'Continue →'}
        </button>
        <p style={{ textAlign: 'center', marginTop: s(8, sc), fontSize: s(9, sc), color: 'rgba(160,128,80,0.5)', fontFamily: 'DM Sans, sans-serif' }}>swipe to advance</p>
      </div>
    </div>
  );
}

// ─── Screen 04 - Wristband / Band Config ──────────────────────────────────────
function WristbandScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [selectedColour, setSelectedColour] = useState(0);
  const [selectedState, setSelectedState] = useState<'warm'|'cool'|'neutral'>('warm');

  // Auto-cycle warm → neutral → cool → warm every 2.8s
  useEffect(() => {
    const cycle: Array<'warm'|'neutral'|'cool'> = ['warm','neutral','cool'];
    let idx = 0;
    const t = setInterval(() => {
      idx = (idx + 1) % 3;
      setSelectedState(cycle[idx]);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const colours = [
    { name: 'Warm Stone',    personality: 'The quiet one.',    hex: '#C9B8A0', desc: "Blends into any outfit. Wear it and forget it's there." },
    { name: 'Warm Charcoal', personality: 'The composed one.', hex: '#2A2018', desc: 'Makes the amber channels glow by contrast.' },
    { name: 'Natural Sand',  personality: 'The open one.',     hex: '#E0CBA8', desc: 'Sits closest to skin — grows from the wrist.' },
  ];
  const states = [
    { key: 'warm'    as const, color: '#C4722A', label: 'Warm',    temp: '37–38°C' },
    { key: 'neutral' as const, color: '#A08050', label: 'Neutral', temp: '34–35°C' },
    { key: 'cool'    as const, color: '#A89880', label: 'Cooling', temp: '30–32°C' },
  ];

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      {/* Header */}
      <div style={{ padding: `${s(52, sc)}px ${s(20, sc)}px ${s(10, sc)}px`, flexShrink: 0 }}>
        <div style={{ display: 'inline-block', background: `${C.indian}18`, border: `1px solid ${C.indian}40`, borderRadius: s(20, sc), padding: `${s(4, sc)}px ${s(12, sc)}px`, marginBottom: s(8, sc) }}>
          <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), letterSpacing: s(2, sc), color: C.indian, fontWeight: 400, textTransform: 'uppercase' }}>Configure Your Band</span>
        </div>
        <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 500, color: C.text, lineHeight: 1.2, marginBottom: s(4, sc) }}>Your band. Your colour.</h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, color: C.sec, lineHeight: 1.6 }}>The channels are the same in every band. Confirm the colour matching your order.</p>
      </div>

      {/* Band live preview — full-width card */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.cardDeep}`, borderBottom: `1px solid ${C.cardDeep}`, padding: `${s(20, sc)}px ${s(12, sc)}px ${s(14, sc)}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(10, sc), marginBottom: s(14, sc), flexShrink: 0 }}>
        <BraidedBand sc={sc} strapColor={colours[selectedColour].hex} state={selectedState} />
        {/* State indicator pills */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: s(6, sc) }}>
          {states.map(st => (
            <div key={st.key} onClick={() => setSelectedState(st.key)} style={{ display: 'flex', alignItems: 'center', gap: s(4, sc), background: selectedState === st.key ? C.bg : 'transparent', border: `1px solid ${selectedState === st.key ? st.color : C.cardDeep}`, borderRadius: s(16, sc), padding: `${s(4, sc)}px ${s(9, sc)}px`, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: st.color, boxShadow: selectedState === st.key ? `0 0 ${s(4, sc)}px ${st.color}88` : 'none', transition: 'box-shadow 0.3s' }} />
              <span style={{ fontSize: s(10, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 500, color: selectedState === st.key ? C.text : C.sec, letterSpacing: 0.5 }}>{st.label}</span>
              <span style={{ fontSize: s(9.5, sc), color: st.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{st.temp}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: s(8.5, sc), fontFamily: 'Josefin Sans, sans-serif', letterSpacing: s(1.5, sc), color: C.sec, fontWeight: 200 }}>
          {colours[selectedColour].name.toUpperCase()} · AUTO PREVIEW
        </div>
      </div>

      {/* Scrollable lower section */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 0, paddingLeft: s(20, sc), paddingRight: s(20, sc), paddingBottom: s(20, sc) }}>
        {/* Colour swatches */}
        <div style={{ marginBottom: s(14, sc) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: s(10, sc) }}>
            <span style={{ fontSize: s(11, sc), letterSpacing: s(2.5, sc), color: C.secDark, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 400, textTransform: 'uppercase' }}>Band Colour</span>
            <span style={{ fontSize: s(11, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>matches your order</span>
          </div>
          {/* Colour row cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(8, sc) }}>
            {colours.map((col, i) => (
              <div key={col.name} onClick={() => setSelectedColour(i)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(12, sc), background: selectedColour === i ? C.card : 'transparent', borderRadius: s(14, sc), padding: `${s(10, sc)}px ${s(12, sc)}px`, border: selectedColour === i ? `1px solid ${C.indian}55` : `1px solid transparent`, cursor: 'pointer', transition: 'all 0.2s' }}>
                {/* Round swatch button */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: s(36, sc), height: s(36, sc), borderRadius: '50%', background: col.hex, border: selectedColour === i ? `${s(2.5, sc)}px solid ${C.indian}` : `${s(1.5, sc)}px solid rgba(0,0,0,0.12)`, boxShadow: selectedColour === i ? `0 0 0 ${s(3, sc)}px rgba(196,114,42,0.2)` : `0 ${s(1, sc)}px ${s(4, sc)}px rgba(0,0,0,0.12)`, transition: 'all 0.2s' }} />
                  {selectedColour === i && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width={s(13, sc)} height={s(13, sc)} viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5l3.5 3.5 5.5-5.5" stroke={col.hex === '#2A2018' ? '#C9B8A0' : '#1E1508'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: s(14, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 500, color: C.text, marginBottom: s(2, sc) }}>{col.name}</div>
                  <div style={{ fontSize: s(12, sc), fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 600, color: C.indian }}>{col.personality}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => onNav('tutorial')} style={{ width: '100%', height: s(52, sc), background: C.btn, borderRadius: s(16, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.35)` }}>
          {colours[selectedColour].name} — this is my band →
        </button>
        <p style={{ textAlign: 'center', marginTop: s(7, sc), fontSize: s(9, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif' }}>You can update this in Settings at any time.</p>
      </div>
    </div>
  );
}

// ─── Screen 05 - Tutorial (horizontal swipe) ───────────────────────────────────
function TutorialScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    if (w === 0) return;
    const idx = Math.round(scrollRef.current.scrollLeft / w);
    setPage(Math.min(2, Math.max(0, idx)));
  };

  const goToPage = (i: number) => {
    scrollRef.current?.scrollTo({ left: i * (scrollRef.current.offsetWidth), behavior: 'smooth' });
    setPage(i);
  };

  const pages = [
    {
      title: 'Energy Channels', sanskrit: 'Nadi',
      desc: 'Your cognitive energy flows through three natural channels. NADI monitors all three to give you a whole picture.',
      items: [
        { color: C.idaAccent, name: 'Rest Channel',     sk: 'Ida',      desc: 'Recovery, calm, and inward flow' },
        { color: C.btn,       name: 'Drive Channel',    sk: 'Pingala',  desc: 'Outward focus, action, and heat' },
        { color: C.gold,      name: 'Balance Channel',  sk: 'Sushumna', desc: 'Integration of both channels' },
      ],
    },
    {
      title: 'Mental Energy System', sanskrit: 'Prana · Tejas · Ojas',
      desc: "Three forms of energy power your cognition. When they're in balance, thinking feels effortless.",
      items: [
        { color: C.prana, name: 'Input Flow',      sk: 'Prana', desc: 'Vitality — how much you take in' },
        { color: C.tejas, name: 'Thinking Fuel',   sk: 'Tejas', desc: 'Clarity, discernment, focus' },
        { color: C.ojas,  name: 'Reserve Energy',  sk: 'Ojas',  desc: 'Deep resilience and stamina' },
      ],
    },
    {
      title: 'Cognitive States', sanskrit: 'The Five States of Mind',
      desc: 'Your mind naturally moves through five states. Knowing where you are helps you work with your energy, not against it.',
      items: [
        { color: C.btn,    name: 'Scattered', sk: 'Ksipta',   desc: 'Restless and distracted' },
        { color: C.sec,    name: 'Dull',      sk: 'Mudha',    desc: 'Heavy, foggy, slow' },
        { color: C.indian, name: 'Wavering',  sk: 'Viksipta', desc: 'Partially focused' },
        { color: C.gold,   name: 'Absorbed',  sk: 'Ekagra',   desc: 'Deep, flowing attention' },
        { color: C.green,  name: 'Mastered',  sk: 'Niruddha', desc: 'Complete calm clarity' },
      ],
    },
  ];

  const headerH  = s(100, sc);  // status + progress + eyebrow + padding
  const footerH  = s(100, sc);  // CTA + nav dots
  const slideH   = s(852, sc) - headerH - footerH;

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar sc={sc} />

      {/* ── Fixed header: progress + eyebrow ── */}
      <div style={{ height: headerH, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: `0 ${s(22, sc)}px ${s(10, sc)}px`, flexShrink: 0 }}>
        {/* Progress bars — tap to jump */}
        <div style={{ display: 'flex', gap: s(6, sc), marginBottom: s(14, sc) }}>
          {[0,1,2].map(i => (
            <div key={i} onClick={() => goToPage(i)} style={{ flex: i === page ? 2.5 : 1, height: s(3, sc), borderRadius: s(2, sc), background: i === page ? C.indian : i < page ? `${C.indian}66` : 'rgba(138,117,96,0.28)', transition: 'all 0.3s ease', cursor: 'pointer' }} />
          ))}
        </div>
        <div style={{ fontSize: s(12, sc), color: C.indian, letterSpacing: 0.5, fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 600 }}>{pages[page].sanskrit}</div>
      </div>

      {/* ── Swipeable slide area ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ flex: 1, display: 'flex', flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', height: slideH } as React.CSSProperties}
      >
        {pages.map((pg, pgIdx) => (
          <div key={pgIdx} style={{ minWidth: '100%', width: '100%', flexShrink: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', padding: `0 ${s(22, sc)}px`, boxSizing: 'border-box', overflowY: 'auto' }}>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(30, sc), fontWeight: 500, color: C.text, marginBottom: s(8, sc), lineHeight: 1.25, flexShrink: 0 }}>{pg.title}</h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, color: C.sec, lineHeight: 1.6, marginBottom: s(20, sc), flexShrink: 0 }}>{pg.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: s(9, sc) }}>
              {pg.items.map(item => (
                <div key={item.sk} style={{ background: C.card, borderRadius: s(15, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid rgba(138,117,96,0.11)`, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(12, sc) }}>
                  <div style={{ width: s(36, sc), height: s(36, sc), borderRadius: s(11, sc), background: `${item.color}28`, border: `${s(1.5, sc)}px solid ${item.color}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: s(10, sc), height: s(10, sc), borderRadius: '50%', background: item.color, boxShadow: `0 0 ${s(5, sc)}px ${item.color}66` }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: s(15, sc), color: C.text, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', marginBottom: s(2, sc) }}>{item.name}</div>
                    <div style={{ fontSize: s(13, sc), color: C.sec, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>{item.desc}</div>
                  </div>
                  <div style={{ fontSize: s(12, sc), color: C.indian, opacity: 0.9, fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 600, textAlign: 'right' as const }}>{item.sk}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Fixed footer: dots + CTA ── */}
      <div style={{ height: footerH, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: `0 ${s(22, sc)}px ${s(28, sc)}px`, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: s(8, sc), marginBottom: s(14, sc) }}>
          {pages.map((_, i) => (
            <div key={i} onClick={() => goToPage(i)} style={{ width: page === i ? s(20, sc) : s(7, sc), height: s(7, sc), borderRadius: s(4, sc), background: page === i ? C.indian : C.cardDeep, cursor: 'pointer', transition: 'all 0.25s ease' }}/>
          ))}
        </div>
        <button onClick={() => page < 2 ? goToPage(page + 1) : onNav('home')} style={{ width: '100%', height: s(50, sc), background: C.btn, borderRadius: s(16, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(16, sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(192,57,43,0.35)` }}>
          {page < 2 ? `Next — ${pages[page + 1]?.title ?? ''} →` : 'Begin NADI'}
        </button>
      </div>
    </div>
  );
}

// ─── Screen 06 - Home Dashboard (premium redesign) ────────────────────────────
function HomeScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const { dateLabel, greeting } = useLiveClock();
  const channels = [
    { label: 'Drive',   color: C.indian, pct: 84 },
    { label: 'Balance', color: C.gold,   pct: 41 },
    { label: 'Rest',    color: C.idaAccent, pct: 18 },
  ];
  const barVals = [0.68, 0.82, 0.55, 0.88, 0.48, 0.72, 0.79];
  const days = ['M','T','W','T','F','S','S'];
  const todayIdx = 4;

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar sc={sc} />

      {/* ── Slim top bar — band status + avatar only ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: `${s(54, sc)}px ${s(20, sc)}px ${s(4, sc)}px`, flexShrink: 0, gap: s(8, sc) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(4, sc) }}>
          <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: C.green, boxShadow: `0 0 ${s(5, sc)}px ${C.green}` }} />
          <span style={{ fontSize: s(11, sc), color: C.green, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Band</span>
        </div>
        <div onClick={() => onNav('profile')} style={{ width: s(38, sc), height: s(38, sc), borderRadius: '50%', background: `linear-gradient(135deg, ${C.indian}, ${C.btn})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Josefin Sans, sans-serif', fontSize: s(15, sc), fontWeight: 300, cursor: 'pointer', boxShadow: `0 ${s(2, sc)}px ${s(10, sc)}px rgba(196,114,42,0.3)` }}>D</div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: s(90, sc) }}>

        {/* Energy card — greeting + concentric rings + channel bars */}
        <div style={{ margin: `${s(6, sc)}px ${s(16, sc)}px ${s(12, sc)}px`, background: C.card, borderRadius: s(20, sc), padding: `${s(16, sc)}px ${s(18, sc)}px ${s(16, sc)}px`, border: `1px solid rgba(138,117,96,0.12)`, boxShadow: `0 ${s(2, sc)}px ${s(16, sc)}px rgba(30,21,8,0.06)` }}>
          {/* Greeting inside the card */}
          <div style={{ marginBottom: s(12, sc) }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), fontWeight: 400, color: C.secDark, letterSpacing: s(1.5, sc), textTransform: 'uppercase', marginBottom: s(2, sc) }}>{dateLabel}</div>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 500, color: C.text, lineHeight: 1.1 }}>{greeting}, Dia.</h1>
          </div>
          {/* Concentric rings + value */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: s(16, sc) }}>
            <div style={{ position: 'relative', width: s(140, sc), height: s(140, sc), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer ring */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `${s(1, sc)}px solid rgba(196,114,42,0.12)`, animation: 'blobPulse 9s ease-in-out infinite' }} />
              {/* Mid ring */}
              <div style={{ position: 'absolute', inset: s(12, sc), borderRadius: '50%', border: `${s(1.5, sc)}px solid rgba(196,114,42,0.22)`, animation: 'blobPulse 6s ease-in-out infinite reverse' }} />
              {/* Inner ring */}
              <div style={{ position: 'absolute', inset: s(24, sc), borderRadius: '50%', border: `${s(1.5, sc)}px solid rgba(196,114,42,0.35)` }} />
              {/* Core circle */}
              <div style={{ position: 'absolute', inset: s(36, sc), borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${C.brightGold}, ${C.pingalaOrange} 50%, ${C.btn})`, animation: 'glowPulse 4s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(8, sc), color: 'rgba(255,255,255,0.75)', letterSpacing: s(1.5, sc), textTransform: 'uppercase' }}>energy</span>
                <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(36, sc), fontWeight: 100, color: '#fff', lineHeight: 1 }}>78</span>
              </div>
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 600, fontSize: s(14, sc), color: C.sec, marginTop: s(8, sc), textAlign: 'center' }}>Balanced — strong focus window</p>
          </div>
          {/* Channel bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(7, sc) }}>
            {channels.map(ch => (
              <div key={ch.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: s(3, sc) }}>
                  <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 400, color: C.secDark, letterSpacing: 0.5 }}>{ch.label}</span>
                  <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 500, color: ch.color }}>{ch.pct}%</span>
                </div>
                <div style={{ height: s(4, sc), background: `${ch.color}1A`, borderRadius: s(2, sc), overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ch.pct}%`, background: `linear-gradient(to right, ${ch.color}88, ${ch.color})`, borderRadius: s(2, sc), transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NADI SUGGESTS — dark ink card */}
        <div style={{ margin: `0 ${s(16, sc)}px ${s(12, sc)}px`, background: C.panel, borderRadius: s(18, sc), padding: `${s(16, sc)}px ${s(16, sc)}px ${s(14, sc)}px` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: s(7, sc), marginBottom: s(10, sc) }}>
            <div style={{ width: s(7, sc), height: s(7, sc), borderRadius: '50%', background: C.terracottaLight, boxShadow: `0 0 ${s(7, sc)}px ${C.terracottaLight}`, animation: 'glowPulse 3s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 400, color: '#A08050', letterSpacing: s(2, sc), textTransform: 'uppercase' }}>NADI SUGGESTS</span>
          </div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 600, fontSize: s(16, sc), color: '#EDE5D8', lineHeight: 1.65, marginBottom: s(12, sc) }}>
            Want to learn about Figma design? Your energy is high right now — this is the window.
          </p>
          <button onClick={() => onNav('revisit')} style={{ background: 'transparent', border: `${s(1, sc)}px solid rgba(196,114,42,0.45)`, borderRadius: s(20, sc), padding: `${s(7, sc)}px ${s(16, sc)}px`, color: C.terracottaLight, fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer', letterSpacing: 0.3 }}>
            Revisit it →
          </button>
        </div>

        {/* Two shortcut cards */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: s(10, sc), margin: `0 ${s(16, sc)}px ${s(12, sc)}px` }}>
          {/* Capture */}
          <div onClick={() => onNav('speak')} style={{ flex: 1, background: C.card, borderRadius: s(18, sc), padding: `${s(16, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: s(8, sc) }}>
            <div style={{ width: s(38, sc), height: s(38, sc), borderRadius: s(11, sc), background: `rgba(196,114,42,0.12)`, border: `1px solid rgba(196,114,42,0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(18, sc) }}>●</div>
            <div>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, color: C.text, marginBottom: s(2, sc) }}>Capture</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 500, color: C.sec }}>Voice a thought</div>
            </div>
          </div>
          {/* Restore */}
          <div onClick={() => onNav('restore')} style={{ flex: 1, background: C.card, borderRadius: s(18, sc), padding: `${s(16, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: s(8, sc) }}>
            <div style={{ width: s(38, sc), height: s(38, sc), borderRadius: s(11, sc), background: `rgba(212,168,71,0.12)`, border: `1px solid rgba(212,168,71,0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(18, sc) }}>✦</div>
            <div>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, color: C.text, marginBottom: s(2, sc) }}>Restore</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 500, color: C.sec }}>Recovery mode</div>
            </div>
          </div>
        </div>

        {/* Weekly energy chart */}
        <div style={{ margin: `0 ${s(16, sc)}px`, background: C.card, borderRadius: s(18, sc), padding: `${s(14, sc)}px ${s(14, sc)}px ${s(12, sc)}px`, border: '1px solid rgba(138,117,96,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s(10, sc) }}>
            <span style={{ fontSize: s(14, sc), color: C.text, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>Weekly Energy</span>
            <span style={{ fontSize: s(11, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>This week</span>
          </div>
          <div style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent calc(100%/5 - 1px), rgba(138,117,96,0.055) calc(100%/5 - 1px), rgba(138,117,96,0.055) calc(100%/5))', borderRadius: s(6, sc), height: s(72, sc), display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: s(5, sc), padding: `${s(6, sc)}px ${s(2, sc)}px` }}>
            {barVals.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', width: '72%', height: '100%' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', background: 'rgba(138,117,96,0.09)', borderRadius: `${s(3, sc)}px ${s(3, sc)}px 0 0` }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${val * 100}%`, background: i === todayIdx ? `linear-gradient(to top, ${C.btn}, ${C.gold})` : `linear-gradient(to top, rgba(192,57,43,0.45), rgba(196,114,42,0.65))`, borderRadius: `${s(3, sc)}px ${s(3, sc)}px 0 0`, boxShadow: i === todayIdx ? `0 0 ${s(6, sc)}px rgba(192,57,43,0.4)` : 'none', zIndex: 1 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: s(6, sc), gap: s(5, sc) }}>
            {days.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: s(11, sc), fontWeight: i === todayIdx ? 700 : 500, color: i === todayIdx ? C.indian : 'rgba(106,80,48,0.8)', fontFamily: 'DM Sans, sans-serif' }}>{d}</div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 07 - Speak ────────────────────────────────────────────────────────
function SpeakScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [recording, setRecording] = useState(false);
  const waveHeights = [6, 10, 16, 12, 18, 14, 8, 12, 16, 10];
  const handlePress = () => { if (recording) { setRecording(false); onNav('captured'); } else { setRecording(true); } };
  return (
    <div style={{ height: '100%', background: `radial-gradient(ellipse at 50% 50%, rgba(192,57,43,0.07) 0%, ${C.bg} 70%)`, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: `${s(58, sc)}px ${s(20, sc)}px ${s(8, sc)}px`, flexShrink: 0 }}>
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', color: C.sec, fontSize: s(15, sc), cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Cancel</button>
        <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(17, sc), fontWeight: 500, color: C.text, letterSpacing: s(2, sc) }}>SPEAK</span>
        <div style={{ width: s(50, sc) }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(40, sc), paddingBottom: s(84, sc) }}>
        <div style={{ width: s(220, sc), height: s(220, sc), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {recording && [0, 0.5, 1].map((delay, i) => (
            <div key={i} style={{ position: 'absolute', width: s(104, sc), height: s(104, sc), borderRadius: '50%', border: `${s(1.5, sc)}px solid rgba(192,57,43,${0.45 - i * 0.12})`, animation: `rippleOut 2.2s ease-out ${delay}s infinite` }} />
          ))}
          <div onClick={handlePress} style={{ width: s(104, sc), height: s(104, sc), borderRadius: '50%', background: recording ? `radial-gradient(circle at 40% 40%, ${C.pingalaGlow}, ${C.btn})` : `radial-gradient(circle at 40% 40%, rgba(192,57,43,0.18), rgba(192,57,43,0.06))`, border: `2px solid ${recording ? C.btn : 'rgba(192,57,43,0.5)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', animation: recording ? 'glowPulse 4s ease-in-out infinite' : 'none', position: 'relative', zIndex: 10 }}>
            {recording ? <div style={{ width: s(28, sc), height: s(28, sc), borderRadius: s(6, sc), background: '#fff' }} /> : <div style={{ width: s(36, sc), height: s(36, sc), borderRadius: '50%', background: C.btn }} />}
          </div>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(8, sc) }}>
          <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(20, sc), fontStyle: 'italic', fontWeight: 400, color: C.text }}>{recording ? 'Listening...' : 'Say anything on your mind.'}</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, color: C.sec }}>{recording ? 'Tap to stop recording.' : 'Tasks, ideas, worries, or questions.'}</p>
          {recording && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: s(5, sc), alignItems: 'center', marginTop: s(8, sc) }}>
              {waveHeights.map((h, i) => <div key={i} style={{ width: s(3, sc), height: s(h, sc), background: C.btn, borderRadius: s(2, sc), opacity: 0.5 + (i % 3) * 0.18 }} />)}
            </div>
          )}
        </div>
      </div>
      <BottomNav active="speak" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 08 - Captured ─────────────────────────────────────────────────────
function CapturedScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  return (
    <div style={{ height: '100%', background: `radial-gradient(ellipse at 50% 45%, rgba(74,124,89,0.1) 0%, ${C.bg} 70%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: `0 ${s(32, sc)}px`, gap: s(16, sc), overflow: 'hidden' }}>
      <StatusBar sc={sc} />
      <div style={{ width: s(80, sc), height: s(80, sc), borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(74,124,89,0.22), rgba(74,124,89,0.06))', border: `2px solid rgba(74,124,89,0.45)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(32, sc), boxShadow: `0 0 ${s(30, sc)}px rgba(74,124,89,0.25)`, flexShrink: 0 }}>✓</div>
      <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(36, sc), fontWeight: 500, color: C.text, textAlign: 'center' }}>Captured.</h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(16, sc), fontWeight: 500, color: C.sec, textAlign: 'center', lineHeight: 1.6, maxWidth: s(270, sc) }}>Your voice note is saved. Head to the <span style={{ color: C.indian, fontWeight: 700 }}>Revisit tab</span> to find all your captured thoughts when your energy is ready.</p>
      <div style={{ background: C.card, borderRadius: s(16, sc), padding: s(14, sc), width: '100%', border: '1px solid rgba(74,124,89,0.22)', flexShrink: 0 }}>
        <div style={{ fontSize: s(11, sc), color: C.green, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: s(8, sc), fontFamily: 'DM Sans, sans-serif' }}>Auto-categorized</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: s(6, sc) }}>
          {['Task', 'Est. 20 min', 'Best at: 4pm window'].map(tag => (
            <div key={tag} style={{ padding: `${s(5, sc)}px ${s(10, sc)}px`, background: 'rgba(74,124,89,0.1)', border: '1px solid rgba(74,124,89,0.3)', borderRadius: s(18, sc), fontSize: s(13, sc), color: C.green, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{tag}</div>
          ))}
        </div>
      </div>
      <div style={{ background: C.card, borderRadius: s(14, sc), padding: s(12, sc), width: '100%', border: '1px solid rgba(212,168,71,0.2)', flexShrink: 0 }}>
        <div style={{ fontSize: s(11, sc), color: C.gold, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: s(5, sc), fontFamily: 'DM Sans, sans-serif' }}>Suggested window</div>
        <div style={{ fontSize: s(14, sc), color: C.text, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>4:00 PM today — 45 min free, high focus predicted</div>
      </div>
      <button onClick={() => onNav('home')} style={{ width: '100%', height: s(50, sc), background: C.btn, borderRadius: s(14, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(16, sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(14, sc)}px rgba(192,57,43,0.35)`, flexShrink: 0 }}>Done</button>
    </div>
  );
}

// ─── Screen 09 - Revisit (Thoughts | Voice Notes tabs) ────────────────────────
function RevisitScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [tab, setTab] = useState<'thoughts' | 'notes'>('thoughts');
  const [expandedNote, setExpandedNote] = useState<number | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [transcriptKey, setTranscriptKey] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [deletedKeys, setDeletedKeys] = useState<Set<string>>(new Set());
  const [shareNoteKey, setShareNoteKey] = useState<string | null>(null);
  const [shareNoteTitle, setShareNoteTitle] = useState<string>('');
  const [trimNoteKey, setTrimNoteKey] = useState<string | null>(null);
  const [trimNoteTitle, setTrimNoteTitle] = useState<string>('');
  const [trimNoteDuration, setTrimNoteDuration] = useState<string>('');
  const [trimIn, setTrimIn] = useState(0);
  const [trimOut, setTrimOut] = useState(100);
  const [trimDragging, setTrimDragging] = useState<'in' | 'out' | null>(null);
  const trimBarRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const thoughts = [
    { type: 'Idea', text: 'Launch a micro-SaaS for habit tracking tailored to wellness brands — lightweight, beautiful UI', color: C.gold, time: '2h ago', hint: 'High energy match — explore now?' },
    { type: 'Future Thought', text: 'Consider relocating to a smaller city in 3 years — better pace, lower overhead, closer to nature', color: C.idaAccent, time: 'Yesterday', hint: 'Park for reflection this weekend?' },
    { type: 'Skill to Improve', text: 'Go deep on Figma auto-layout and component properties this month — block 2h sessions', color: C.pingalaOrange, time: '2 days ago', hint: 'Schedule a learning block?' },
    { type: 'Article to Read', text: 'The Prana–Dopamine connection: ancient energy models meeting modern neuroscience', color: C.green, time: '3 days ago', hint: 'Low energy? Perfect for reading.' },
  ];

  const voiceNotes: {
    category: string; IconComp: React.ElementType; color: string;
    notes: { title: string; duration: string; time: string; played: boolean; transcript: string }[];
  }[] = [
    {
      category: 'Ideas', IconComp: Lightbulb, color: C.gold,
      notes: [
        { title: 'Wellness micro-SaaS concept', duration: '1:24', time: '2h ago', played: false, transcript: "So I've been thinking — there's a real gap in the wellness software market for something that feels beautiful and lightweight. Not another dashboarded health app. Something closer to a ritual. Track habits, log energy states, maybe even sync with a wearable. Keep it focused: one problem, done elegantly." },
        { title: 'Partnership with yoga studios', duration: '0:48', time: 'Yesterday', played: true, transcript: "Reach out to two or three local studios about a pilot program. Offer them the app at cost in exchange for user feedback. The community angle is strong — studios already have wellness-minded people who'd get it immediately." },
      ],
    },
    {
      category: 'Tasks', IconComp: ListChecks, color: C.indian,
      notes: [
        { title: 'Figma deep-dive sessions plan', duration: '2:02', time: '2 days ago', played: true, transcript: "Block out Tuesday and Thursday mornings, two hours each. Focus purely on auto-layout and component variants. No Slack, no email. End each session by building one real component from scratch using only what I practised." },
        { title: 'Review Q2 roadmap before Monday', duration: '0:55', time: '3 days ago', played: true, transcript: "Go through the Q2 doc before the Monday meeting. Annotate anything that feels off. Specifically check whether the March milestones are still realistic given the two-week slip in January. Come with three concrete questions." },
      ],
    },
    {
      category: 'Reflections', IconComp: BookOpen, color: C.idaAccent,
      notes: [
        { title: 'On slowing down and trusting the pace', duration: '3:11', time: '4 days ago', played: false, transcript: "There's this tension I keep noticing — between wanting to move fast and knowing that the best work needs time to breathe. I think I've been confusing urgency with productivity. The days I feel most depleted are the ones where I filled every hour. The days I'm most creative, I left space. I want to remember this feeling and design my schedule around it, not fight against it." },
      ],
    },
  ];

  const timeSlots = [
    { time: '2:00 PM', label: 'Team meeting', color: C.btn },
    { time: '3:15 PM', label: 'Free window', color: C.green },
    { time: '4:00 PM', label: '⚡ High focus window', color: C.gold },
  ];

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar sc={sc} />

      {/* Header */}
      <div style={{ padding: `${s(54, sc)}px ${s(18, sc)}px ${s(8, sc)}px`, flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(30, sc), fontWeight: 500, color: C.text, marginBottom: s(3, sc) }}>Revisit</h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500, color: C.sec }}>Your captured thoughts, ready when you are.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', flexDirection: 'row', padding: `0 ${s(18, sc)}px`, gap: s(2, sc), marginBottom: s(10, sc), flexShrink: 0 }}>
        {(['thoughts', 'notes'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: s(38, sc), background: tab === t ? C.text : 'transparent', borderRadius: s(10, sc), border: tab === t ? 'none' : `1px solid ${C.cardDeep}`, color: tab === t ? '#F5F0EB' : C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: tab === t ? 600 : 500, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t === 'thoughts' ? 'Thoughts' : 'Voice Notes'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 0, paddingLeft: s(16, sc), paddingRight: s(16, sc), paddingBottom: s(90, sc), display: 'flex', flexDirection: 'column', gap: s(8, sc) }}>

        {tab === 'thoughts' && (
          <>
            {/* Calendar strip */}
            <div style={{ background: C.card, borderRadius: s(14, sc), padding: s(12, sc), border: '1px solid rgba(138,117,96,0.11)', flexShrink: 0 }}>
              <div style={{ fontSize: s(9, sc), color: C.sec, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: s(8, sc), fontFamily: 'DM Sans, sans-serif' }}>Today's windows</div>
              {timeSlots.map((slot, i) => (
                <div key={slot.time} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(9, sc), marginBottom: i < timeSlots.length - 1 ? s(7, sc) : 0 }}>
                  <div style={{ width: s(3, sc), height: s(20, sc), borderRadius: s(2, sc), background: slot.color, flexShrink: 0 }} />
                  <span style={{ fontSize: s(9.5, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', width: s(40, sc), flexShrink: 0 }}>{slot.time}</span>
                  <span style={{ fontSize: s(11, sc), color: C.text, fontFamily: 'DM Sans, sans-serif' }}>{slot.label}</span>
                </div>
              ))}
            </div>
            {/* Thought cards */}
            {thoughts.map((thought) => (
              <div key={thought.type} style={{ background: C.card, borderRadius: s(16, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: '1px solid rgba(138,117,96,0.1)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s(5, sc) }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                    <div style={{ width: s(7, sc), height: s(7, sc), borderRadius: '50%', background: thought.color, boxShadow: `0 0 ${s(5, sc)}px ${thought.color}` }} />
                    <span style={{ fontSize: s(11, sc), color: thought.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'DM Sans, sans-serif' }}>{thought.type}</span>
                  </div>
                  <span style={{ fontSize: s(11, sc), color: 'rgba(106,80,48,0.8)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{thought.time}</span>
                </div>
                <p style={{ fontSize: s(15, sc), color: C.text, fontWeight: 500, lineHeight: 1.6, marginBottom: s(4, sc), fontFamily: 'DM Sans, sans-serif' }}>{thought.text}</p>
                <p style={{ fontSize: s(13, sc), color: C.sec, fontWeight: 500, marginBottom: s(9, sc), fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif' }}>{thought.hint}</p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: s(5, sc) }}>
                  {[{ label: 'Work now', bg: `rgba(192,57,43,0.07)`, border: C.btn, color: C.btn }, { label: 'Park later', bg: 'transparent', border: C.sec, color: C.sec }, { label: 'Delete', bg: 'transparent', border: 'rgba(192,57,43,0.18)', color: 'rgba(192,57,43,0.65)' }].map(btn => (
                    <button key={btn.label} style={{ flex: 1, height: s(30, sc), background: btn.bg, border: `1px solid ${btn.border}`, borderRadius: s(8, sc), color: btn.color, fontSize: s(12, sc), fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>{btn.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'notes' && (
          <>
            {/* Toast notification */}
            {toastMsg && (
              <div style={{ position: 'fixed', bottom: s(100, sc), left: '50%', transform: 'translateX(-50%)', background: C.panel, color: '#F5F0EB', borderRadius: s(10, sc), padding: `${s(8, sc)}px ${s(16, sc)}px`, fontSize: s(11, sc), fontWeight: 500, fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', zIndex: 999, whiteSpace: 'nowrap', boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(0,0,0,0.25)`, pointerEvents: 'none' }}>
                {toastMsg}
              </div>
            )}
            {voiceNotes.map((section) => {
              const sectionNotes = section.notes.filter(n => !deletedKeys.has(`${section.category}__${n.title}`));
              if (sectionNotes.length === 0) return null;
              return (
                <div key={section.category}>
                  {/* Section header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(7, sc), marginBottom: s(7, sc), padding: `0 ${s(2, sc)}px` }}>
                    <section.IconComp size={s(14, sc)} strokeWidth={1.8} color={section.color} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 700, color: section.color, letterSpacing: s(1.5, sc), textTransform: 'uppercase' as const }}>{section.category}</span>
                    <div style={{ flex: 1, height: 1, background: `${section.color}28` }} />
                  </div>
                  {/* Notes */}
                  {sectionNotes.map((note) => {
                    const noteKey = `${section.category}__${note.title}`;
                    const isPlaying = playingKey === noteKey;
                    const showTx = transcriptKey === noteKey;
                    return (
                      <div key={note.title} style={{ background: C.card, borderRadius: s(14, sc), paddingTop: s(11, sc), paddingLeft: s(13, sc), paddingRight: s(13, sc), paddingBottom: s(11, sc), border: `1px solid ${showTx ? section.color + '44' : 'rgba(138,117,96,0.1)'}`, marginBottom: s(7, sc), transition: 'border-color 0.2s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: s(10, sc) }}>
                          {/* Play / Pause button */}
                          <div
                            onClick={() => setPlayingKey(isPlaying ? null : noteKey)}
                            style={{ width: s(32, sc), height: s(32, sc), borderRadius: '50%', background: isPlaying ? section.color : `${section.color}1A`, border: `1px solid ${section.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', transition: 'background 0.18s' }}
                          >
                            {isPlaying ? (
                              /* Pause icon */
                              <div style={{ display: 'flex', gap: s(2.5, sc) }}>
                                <div style={{ width: s(3, sc), height: s(9, sc), borderRadius: s(1.5, sc), background: '#fff' }} />
                                <div style={{ width: s(3, sc), height: s(9, sc), borderRadius: s(1.5, sc), background: '#fff' }} />
                              </div>
                            ) : (
                              /* Play triangle */
                              <div style={{ width: 0, height: 0, borderTop: `${s(5, sc)}px solid transparent`, borderBottom: `${s(5, sc)}px solid transparent`, borderLeft: `${s(8, sc)}px solid ${section.color}`, marginLeft: s(2, sc) }} />
                            )}
                          </div>
                          {/* Waveform bars */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: s(2, sc), flex: 1 }}>
                            {[3,5,9,6,11,7,4,8,6,10,5,7,9,4,6].map((h, i) => (
                              <div key={i} style={{ width: s(2.5, sc), height: s(h * (isPlaying ? 1 : 0.7), sc), borderRadius: s(1.5, sc), background: isPlaying ? section.color : note.played ? `${section.color}88` : section.color, opacity: note.played && !isPlaying ? 0.6 : 1, transition: 'height 0.3s', transitionDelay: `${i * 0.03}s` }} />
                            ))}
                          </div>
                          <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                            <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(12, sc), color: isPlaying ? section.color : C.sec, fontWeight: 600, transition: 'color 0.2s' }}>{note.duration}</div>
                            <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(11, sc), color: 'rgba(106,80,48,0.7)', marginTop: s(1, sc), fontWeight: 500 }}>{note.time}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(12, sc), color: C.text, fontWeight: 500, marginTop: s(7, sc), lineHeight: 1.5 }}>{note.title}</div>

                        {/* Transcript panel */}
                        {showTx && (
                          <div style={{ marginTop: s(9, sc), background: `${section.color}0D`, borderRadius: s(10, sc), padding: `${s(10, sc)}px ${s(12, sc)}px`, border: `1px solid ${section.color}22` }}>
                            <div style={{ fontSize: s(8.5, sc), fontWeight: 600, color: section.color, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: s(6, sc), fontFamily: 'DM Sans, sans-serif' }}>Transcript</div>
                            <p style={{ fontSize: s(11, sc), color: C.text, fontWeight: 500, lineHeight: 1.65, fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', margin: 0 }}>{note.transcript}</p>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div style={{ display: 'flex', flexDirection: 'row', gap: s(6, sc), marginTop: s(9, sc) }}>
                          {[
                            { icon: MessageSquare, label: 'Transcript', color: showTx ? section.color : C.sec, active: showTx,
                              onClick: () => setTranscriptKey(showTx ? null : noteKey) },
                            { icon: Scissors, label: 'Trim', color: C.sec, active: false,
                              onClick: () => { setTrimNoteKey(noteKey); setTrimNoteTitle(note.title); setTrimNoteDuration(note.duration); setTrimIn(0); setTrimOut(100); } },
                            { icon: Share2, label: 'Share', color: C.sec, active: false,
                              onClick: () => { setShareNoteKey(noteKey); setShareNoteTitle(note.title); } },
                            { icon: Trash2, label: 'Delete', color: 'rgba(154,78,24,0.75)', active: false,
                              onClick: () => {
                                setDeletedKeys(prev => new Set([...prev, noteKey]));
                                if (playingKey === noteKey) setPlayingKey(null);
                                if (transcriptKey === noteKey) setTranscriptKey(null);
                                showToast('Voice note deleted');
                              }},
                          ].map(({ icon: BtnIcon, label, color, active, onClick }) => (
                            <button
                              key={label}
                              onClick={onClick}
                              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(3, sc), background: active ? `${section.color}15` : 'transparent', border: `1px solid ${active ? section.color + '55' : 'rgba(138,117,96,0.15)'}`, borderRadius: s(8, sc), paddingTop: s(5, sc), paddingBottom: s(5, sc), paddingLeft: s(2, sc), paddingRight: s(2, sc), cursor: 'pointer', transition: 'all 0.18s' }}
                            >
                              <BtnIcon size={s(13, sc)} strokeWidth={1.8} color={color} />
                              <span style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(8, sc), fontWeight: 500, color }}>{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* ── Trim Editor ── */}
      {trimNoteKey && (() => {
        const totalSecs = (() => {
          const [m, s2] = trimNoteDuration.split(':').map(Number);
          return (m || 0) * 60 + (s2 || 0);
        })();
        const fmtSec = (pct: number) => {
          const t = Math.round((pct / 100) * totalSecs);
          const mm = Math.floor(t / 60), ss = t % 60;
          return `${mm}:${String(ss).padStart(2,'0')}`;
        };
        const handlePointerMove = (e: React.PointerEvent) => {
          if (!trimDragging || !trimBarRef.current) return;
          const rect = trimBarRef.current.getBoundingClientRect();
          const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
          if (trimDragging === 'in')  setTrimIn(Math.min(pct, trimOut - 5));
          if (trimDragging === 'out') setTrimOut(Math.max(pct, trimIn + 5));
        };
        return (
          <div
            onPointerMove={handlePointerMove}
            onPointerUp={() => setTrimDragging(null)}
            onClick={() => setTrimNoteKey(null)}
            style={{ position: 'absolute', inset: 0, zIndex: 310, background: 'rgba(30,21,8,0.6)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: `${s(24,sc)}px ${s(24,sc)}px 0 0`, padding: `${s(20,sc)}px ${s(20,sc)}px ${s(36,sc)}px`, display: 'flex', flexDirection: 'column', gap: s(16,sc) }}>
              {/* Handle */}
              <div style={{ width: s(36,sc), height: s(4,sc), borderRadius: s(2,sc), background: C.cardDeep, margin: '0 auto' }} />
              {/* Header */}
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11,sc), fontWeight: 600, color: C.sec, textTransform: 'uppercase', letterSpacing: 1, marginBottom: s(4,sc) }}>Trim Voice Note</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(14,sc), fontWeight: 600, color: C.text, lineHeight: 1.4 }}>"{trimNoteTitle}"</div>
              </div>
              {/* Waveform + handles */}
              <div style={{ position: 'relative', userSelect: 'none' }}>
                {/* Waveform bars */}
                <div
                  ref={trimBarRef}
                  style={{ height: s(56,sc), background: C.card, borderRadius: s(10,sc), display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative', border: `1px solid ${C.cardDeep}` }}
                >
                  {/* dim overlay left */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: `${trimIn}%`, height: '100%', background: 'rgba(0,0,0,0.38)', zIndex: 2 }} />
                  {/* dim overlay right */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: `${100 - trimOut}%`, height: '100%', background: 'rgba(0,0,0,0.38)', zIndex: 2 }} />
                  {/* selected range highlight */}
                  <div style={{ position: 'absolute', top: 0, left: `${trimIn}%`, width: `${trimOut - trimIn}%`, height: '100%', background: 'rgba(196,114,42,0.12)', borderTop: `2px solid ${C.btn}`, borderBottom: `2px solid ${C.btn}`, zIndex: 1 }} />
                  {/* Waveform bars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(2,sc), padding: `0 ${s(6,sc)}px`, width: '100%', height: '100%', position: 'relative', zIndex: 0 }}>
                    {[4,7,12,9,15,11,6,13,8,14,7,10,13,5,9,12,8,15,6,11,9,14,7,10,12,5,8,13,9,6,11,14,8,12,5,9,13,7,11,6].map((h, i) => {
                      const pct = (i / 40) * 100;
                      const inRange = pct >= trimIn && pct <= trimOut;
                      return (
                        <div key={i} style={{ flex: 1, height: `${(h / 15) * 80}%`, borderRadius: s(1.5,sc), background: inRange ? C.btn : C.cardDeep, opacity: inRange ? 0.85 : 0.4, transition: 'background 0.1s' }} />
                      );
                    })}
                  </div>
                  {/* In handle */}
                  <div
                    onPointerDown={e => { e.stopPropagation(); setTrimDragging('in'); e.currentTarget.setPointerCapture(e.pointerId); }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: `${trimIn}%`, width: s(20,sc), transform: 'translateX(-50%)', zIndex: 10, cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div style={{ width: s(4,sc), height: '80%', background: C.btn, borderRadius: s(2,sc), boxShadow: `0 0 ${s(6,sc)}px ${C.btn}` }} />
                  </div>
                  {/* Out handle */}
                  <div
                    onPointerDown={e => { e.stopPropagation(); setTrimDragging('out'); e.currentTarget.setPointerCapture(e.pointerId); }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: `${trimOut}%`, width: s(20,sc), transform: 'translateX(-50%)', zIndex: 10, cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div style={{ width: s(4,sc), height: '80%', background: C.btn, borderRadius: s(2,sc), boxShadow: `0 0 ${s(6,sc)}px ${C.btn}` }} />
                  </div>
                </div>
                {/* Time labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: s(8,sc) }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10,sc), color: C.sec, fontWeight: 500 }}>Start</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14,sc), color: C.btn, fontWeight: 400 }}>{fmtSec(trimIn)}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10,sc), color: C.sec, fontWeight: 500 }}>Duration</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14,sc), color: C.text, fontWeight: 400 }}>{fmtSec(trimOut - trimIn)}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10,sc), color: C.sec, fontWeight: 500 }}>End</div>
                    <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14,sc), color: C.btn, fontWeight: 400 }}>{fmtSec(trimOut)}</div>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div style={{ background: C.card, borderRadius: s(10,sc), padding: `${s(9,sc)}px ${s(12,sc)}px`, border: `1px solid ${C.cardDeep}`, display: 'flex', alignItems: 'center', gap: s(8,sc) }}>
                <Scissors size={s(13,sc)} strokeWidth={1.8} color={C.sec} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12,sc), color: C.sec, fontWeight: 500 }}>Drag the orange handles to set your in and out points. The original is kept until you save.</span>
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: s(10,sc) }}>
                <button onClick={() => setTrimNoteKey(null)} style={{ flex: 1, height: s(46,sc), background: 'transparent', border: `1px solid ${C.cardDeep}`, borderRadius: s(13,sc), color: C.secDark, fontFamily: 'DM Sans, sans-serif', fontSize: s(14,sc), fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { showToast(`Trim saved — ${fmtSec(trimIn)} to ${fmtSec(trimOut)}`); setTrimNoteKey(null); }} style={{ flex: 2, height: s(46,sc), background: C.btn, border: 'none', borderRadius: s(13,sc), color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(14,sc), fontWeight: 600, cursor: 'pointer', boxShadow: `0 ${s(3,sc)}px ${s(12,sc)}px rgba(196,114,42,0.35)` }}>Save Trim</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Share Sheet ── */}
      {shareNoteKey && (
        <div
          onClick={() => setShareNoteKey(null)}
          style={{ position: 'absolute', inset: 0, zIndex: 300, background: 'rgba(30,21,8,0.55)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: `${s(24, sc)}px ${s(24, sc)}px 0 0`, padding: `${s(20, sc)}px ${s(20, sc)}px ${s(36, sc)}px`, display: 'flex', flexDirection: 'column', gap: s(16, sc) }}>
            {/* Handle */}
            <div style={{ width: s(36, sc), height: s(4, sc), borderRadius: s(2, sc), background: C.cardDeep, margin: '0 auto' }} />
            {/* Title */}
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), fontWeight: 600, color: C.sec, textTransform: 'uppercase', letterSpacing: 1, marginBottom: s(4, sc) }}>Share voice note</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 600, color: C.text, lineHeight: 1.4 }}>"{shareNoteTitle}"</div>
            </div>
            {/* App row */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: s(16, sc), overflowX: 'auto', paddingBottom: s(4, sc) }}>
              {[
                { label: 'iMessage', bg: '#34C759', icon: (
                  <svg width={s(26, sc)} height={s(26, sc)} viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="white"/>
                  </svg>
                )},
                { label: 'WhatsApp', bg: '#25D366', icon: (
                  <svg width={s(26, sc)} height={s(26, sc)} viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                )},
                { label: 'Telegram', bg: '#2AABEE', icon: (
                  <svg width={s(26, sc)} height={s(26, sc)} viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )},
                { label: 'Mail', bg: '#007AFF', icon: (
                  <svg width={s(26, sc)} height={s(26, sc)} viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="1.5" fill="none"/>
                    <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="1.5" fill="none"/>
                  </svg>
                )},
                { label: 'Copy link', bg: C.cardDeep, icon: (
                  <svg width={s(26, sc)} height={s(26, sc)} viewBox="0 0 24 24" fill="none">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={C.secDark} strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={C.secDark} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )},
              ].map(app => (
                <div
                  key={app.label}
                  onClick={() => { showToast(`Shared via ${app.label}`); setShareNoteKey(null); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(6, sc), cursor: 'pointer', flexShrink: 0 }}
                >
                  <div style={{ width: s(54, sc), height: s(54, sc), borderRadius: s(14, sc), background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 ${s(2, sc)}px ${s(10, sc)}px rgba(0,0,0,0.12)` }}>
                    {app.icon}
                  </div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), fontWeight: 500, color: C.secDark, textAlign: 'center', maxWidth: s(58, sc) }}>{app.label}</span>
                </div>
              ))}
            </div>
            {/* Transcript preview */}
            <div style={{ background: C.card, borderRadius: s(12, sc), padding: `${s(10, sc)}px ${s(13, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), fontWeight: 600, color: C.sec, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: s(4, sc) }}>Share as</div>
              <div style={{ display: 'flex', gap: s(8, sc) }}>
                {['Audio file', 'Transcript text', 'Both'].map(opt => (
                  <button key={opt} onClick={() => { showToast(`Sharing as ${opt}…`); setShareNoteKey(null); }} style={{ flex: 1, height: s(34, sc), background: opt === 'Audio file' ? C.btn : 'transparent', border: `1px solid ${opt === 'Audio file' ? 'none' : C.cardDeep}`, borderRadius: s(8, sc), color: opt === 'Audio file' ? '#fff' : C.secDark, fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 600, cursor: 'pointer' }}>{opt}</button>
                ))}
              </div>
            </div>
            {/* Cancel */}
            <button onClick={() => setShareNoteKey(null)} style={{ width: '100%', height: s(46, sc), background: C.card, border: `1px solid ${C.cardDeep}`, borderRadius: s(14, sc), color: C.secDark, fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <BottomNav active="revisit" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 10 - Restore ──────────────────────────────────────────────────────
function RestoreScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [started, setStarted] = useState<string | null>(null);

  const channels = [
    { key: 'drive',   label: 'Drive',   color: '#C4722A', pct: 84, sub: 'Overactive', icon: '↑' },
    { key: 'balance', label: 'Balance', color: '#D4A847', pct: 41, sub: 'Slipping',   icon: '~' },
    { key: 'rest',    label: 'Rest',    color: '#C9B8A0', pct: 18, sub: 'Depleted',   icon: '↓' },
  ];

  const suggestions = [
    { id: 'hands',   label: 'Make something with your hands',    why: 'Your Drive channel is locked in output mode. Manual work — folding, drawing, cooking — shifts processing to the motor cortex and lets the prefrontal cortex go quiet.', duration: '15 – 30 min', channelLabel: 'Quiets Drive',     icon: '✦', color: '#C4722A' },
    { id: 'walk',    label: 'No-agenda walk. No destination.',   why: "Walking without purpose is one of the few activities that restores Ojas without demanding Tejas. Don't listen to anything. Let your eyes go soft.",               duration: '10 – 20 min', channelLabel: 'Rebuilds Rest',    icon: '⟶', color: '#C9B8A0' },
    { id: 'eyes',    label: 'Lie down. Eyes open or closed.',    why: 'Not sleep — deliberate non-doing. Your nervous system needs permission to stop processing. Even 8 minutes of horizontal stillness measurably lowers cortical load.', duration: '8 – 15 min',  channelLabel: 'Restores Balance', icon: '◦',  color: '#D4A847' },
    { id: 'sound',   label: 'Put on one album. Do nothing else.', why: 'Passive listening — no multitasking — activates the default mode network, which processes and consolidates. Your captured thoughts need this quiet to settle.',  duration: '1 album',     channelLabel: 'Rebuilds Rest',    icon: '♩',  color: '#C9B8A0' },
    { id: 'water',   label: 'Slow shower or bath. No timer.',    why: 'Warm water lowers peripheral vascular resistance — the same physiological pathway NADI uses to warm your band when you are balanced. You can do it for yourself.', duration: '20 min',      channelLabel: 'Restores Balance', icon: '〰', color: '#D4A847' },
    { id: 'fiction', label: 'Read fiction. A story, not news.',  why: "Fiction requires imaginative absorption — not analytical processing. It rebuilds your capacity for sustained attention without charging the Drive channel further.", duration: '20 – 40 min', channelLabel: 'Quiets Drive',     icon: '□',  color: '#C4722A' },
  ];

  const activeS = suggestions.find(sg => sg.id === activeCard);

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <StatusBar sc={sc} />

      {/* Detail drawer */}
      {activeCard && activeS && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(30,21,8,0.6)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setActiveCard(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: `${s(22, sc)}px ${s(22, sc)}px 0 0`, padding: `${s(18, sc)}px ${s(20, sc)}px ${s(40, sc)}px`, display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
            <div style={{ width: s(36, sc), height: s(4, sc), borderRadius: s(2, sc), background: C.cardDeep, margin: '0 auto' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: s(12, sc) }}>
              <div style={{ width: s(40, sc), height: s(40, sc), borderRadius: s(12, sc), background: `${activeS.color}18`, border: `1px solid ${activeS.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(18, sc), flexShrink: 0 }}>{activeS.icon}</div>
              <div>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(15, sc), fontWeight: 300, color: C.text, lineHeight: 1.3, marginBottom: s(4, sc) }}>{activeS.label}</div>
                <div style={{ display: 'flex', gap: s(8, sc) }}>
                  <span style={{ fontSize: s(9, sc), fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1, color: activeS.color, background: `${activeS.color}14`, border: `1px solid ${activeS.color}30`, borderRadius: s(10, sc), padding: `${s(2, sc)}px ${s(8, sc)}px` }}>{activeS.channelLabel}</span>
                  <span style={{ fontSize: s(9, sc), fontFamily: 'DM Sans, sans-serif', color: C.sec, background: C.card, border: `1px solid ${C.cardDeep}`, borderRadius: s(10, sc), padding: `${s(2, sc)}px ${s(8, sc)}px` }}>{activeS.duration}</span>
                </div>
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: s(14, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(8.5, sc), letterSpacing: 2, color: activeS.color, marginBottom: s(7, sc), textTransform: 'uppercase' as const }}>Why NADI is suggesting this for you</div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.7, fontWeight: 500 }}>{activeS.why}</p>
            </div>
            {started === activeS.id ? (
              <div style={{ textAlign: 'center' as const, padding: `${s(6, sc)}px 0` }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(14, sc), color: C.text, lineHeight: 1.65, marginBottom: s(12, sc) }}>Good. NADI will keep sensing.<br/>Your band will tell you when you've shifted.</div>
                <button onClick={() => { setStarted(null); setActiveCard(null); }} style={{ background: 'transparent', border: `1px solid ${C.cardDeep}`, borderRadius: s(12, sc), padding: `${s(10, sc)}px ${s(20, sc)}px`, color: C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <button onClick={() => setStarted(activeS.id)} style={{ width: '100%', height: s(50, sc), background: C.btn, borderRadius: s(14, sc), border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(14, sc)}px rgba(196,114,42,0.3)` }}>Begin — {activeS.duration}</button>
            )}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: s(90, sc) }}>
        <div style={{ padding: `${s(56, sc)}px ${s(20, sc)}px ${s(10, sc)}px` }}>
          <div style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase' as const, marginBottom: s(5, sc) }}>Recovery Mode</div>
          <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 300, color: C.text, marginBottom: s(5, sc) }}>Restore</h1>
          <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(13.5, sc), color: C.sec, lineHeight: 1.65 }}>
            Dia, your Drive has been running hard since 10am.<br/>Rest is not recovery — it is the rebuild.
          </p>
        </div>

        {/* Channel Infographic */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(16, sc) }}>
          <div style={{ background: C.panel, borderRadius: s(18, sc), padding: `${s(16, sc)}px ${s(16, sc)}px ${s(14, sc)}px` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: s(12, sc) }}>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(9, sc), letterSpacing: 2, color: '#A08050', textTransform: 'uppercase' as const }}>Your Channels Right Now</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(9, sc), color: '#6A5030' }}>3:42 PM</span>
            </div>
            {channels.map(ch => (
              <div key={ch.key} style={{ marginBottom: s(10, sc) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: s(4, sc) }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                    <span style={{ fontSize: s(9, sc), color: ch.color, fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1 }}>{ch.icon}</span>
                    <span style={{ fontSize: s(11, sc), color: '#DDD0BC', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 300 }}>{ch.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                    <span style={{ fontSize: s(9, sc), color: ch.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{ch.sub}</span>
                    <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color: ch.color }}>{ch.pct}%</span>
                  </div>
                </div>
                <div style={{ height: s(6, sc), background: '#2E2010', borderRadius: s(3, sc), overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ch.pct}%`, background: `linear-gradient(to right, ${ch.color}88, ${ch.color})`, borderRadius: s(3, sc), transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: s(10, sc), borderTop: '1px solid #2E2010', paddingTop: s(10, sc) }}>
              <div style={{ fontSize: s(8, sc), color: '#6A5030', fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1, marginBottom: s(6, sc) }}>TODAY'S DRIVE CHANNEL</div>
              <svg width="100%" height={s(44, sc)} viewBox="0 0 280 44" preserveAspectRatio="none">
                <defs><linearGradient id="driveArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4722A" stopOpacity="0.35"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0"/></linearGradient></defs>
                <path d="M0,40 L0,32 Q20,28 40,24 Q60,18 80,14 Q100,10 120,9 Q140,8 160,10 Q180,12 200,16 Q220,20 240,22 Q260,24 280,22 L280,40 Z" fill="url(#driveArea)"/>
                <path d="M0,32 Q20,28 40,24 Q60,18 80,14 Q100,10 120,9 Q140,8 160,10 Q180,12 200,16 Q220,20 240,22 Q260,24 280,22" fill="none" stroke="#C4722A" strokeWidth="1.8" strokeOpacity="0.9"/>
                <line x1="200" y1="4" x2="200" y2="40" stroke="#D4A847" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6"/>
                <circle cx="200" cy="16" r="3" fill="#D4A847" fillOpacity="0.9"/>
                <text x="4"   y="43" fontFamily="Josefin Sans" fontSize="7" fill="#6A5030">8am</text>
                <text x="94"  y="43" fontFamily="Josefin Sans" fontSize="7" fill="#6A5030">12pm</text>
                <text x="193" y="43" fontFamily="Josefin Sans" fontSize="7" fill="#D4A847">now</text>
                <text x="262" y="43" fontFamily="Josefin Sans" fontSize="7" fill="#6A5030">8pm</text>
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: s(8, sc), background: '#2E2010', borderRadius: s(9, sc), padding: `${s(7, sc)}px ${s(10, sc)}px` }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10, sc), color: '#A08050', fontWeight: 500 }}>Estimated recovery window</span>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), color: '#D4A847', fontWeight: 300 }}>45 – 90 min of true rest</span>
            </div>
          </div>
        </div>

        {/* Suggestion grid */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
          <div style={{ marginBottom: s(10, sc) }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), letterSpacing: s(0.5, sc), color: C.text, textTransform: 'uppercase' as const, fontWeight: 700 }}>Suggested for Dia now</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: s(10, sc) }}>
            {suggestions.map(sug => (
              <div key={sug.id} onClick={() => setActiveCard(sug.id)} style={{ background: started === sug.id ? `${sug.color}10` : C.card, borderRadius: s(17, sc), padding: `${s(14, sc)}px ${s(12, sc)}px`, border: `1px solid ${started === sug.id ? sug.color + '40' : C.cardDeep}`, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' as const }}>
                {started === sug.id && <div style={{ position: 'absolute' as const, top: s(8, sc), right: s(10, sc), fontSize: s(10, sc), color: sug.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, letterSpacing: 0.5 }}>IN PROGRESS</div>}
                <div style={{ width: s(36, sc), height: s(36, sc), borderRadius: s(10, sc), background: `${sug.color}20`, border: `1.5px solid ${sug.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: s(8, sc) }}>
                  <span style={{ fontSize: s(17, sc), color: sug.color }}>{sug.icon}</span>
                </div>
                <div style={{ fontSize: s(13, sc), color: C.text, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, lineHeight: 1.3, marginBottom: s(4, sc) }}>{sug.label}</div>
                <div style={{ fontSize: s(11, sc), color: sug.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: 0.3, marginBottom: s(2, sc) }}>{sug.channelLabel}</div>
                <div style={{ fontSize: s(11, sc), color: C.secDark, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{sug.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What NADI is reading */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
          <div style={{ background: C.card, borderRadius: s(16, sc), border: `1px solid ${C.cardDeep}`, padding: `${s(14, sc)}px ${s(15, sc)}px` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(9, sc), letterSpacing: 2, color: C.indian, marginBottom: s(10, sc), textTransform: 'uppercase' as const }}>What NADI is reading</div>
            {[
              { label: 'Skin temp',   val: '30.4°C',  note: 'Cooling — Rest channel fading', color: C.secDark },
              { label: 'Conductance', val: 'Elevated', note: 'Sustained cognitive arousal',   color: '#C4722A' },
              { label: 'HRV trend',   val: '↓ 18%',   note: 'Below your personal baseline',  color: '#D4A847' },
            ].map(({ label, val, note, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: s(8, sc), paddingBottom: s(8, sc), borderBottom: `1px solid ${C.cardDeep}` }}>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.secDark, fontWeight: 600, marginBottom: s(2, sc) }}>{label}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), color: C.sec, fontWeight: 500 }}>{note}</div>
                </div>
                <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(14, sc), color, fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(12, sc), color: C.sec, lineHeight: 1.7, marginTop: s(4, sc) }}>
              Your body has been in output mode for 5 hours and 14 minutes. This is not a warning — it is information. What you do with it is yours.
            </p>
          </div>
        </div>

        {/* 72-Hour Protocol */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(16, sc) }}>
          <div style={{ background: 'rgba(154,78,24,0.06)', borderRadius: s(14, sc), padding: `${s(13, sc)}px ${s(15, sc)}px`, border: '1px solid rgba(154,78,24,0.18)' }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 1.5, color: C.pingalaRed, marginBottom: s(5, sc), textTransform: 'uppercase' as const }}>72-Hour Protocol</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.65, fontWeight: 500 }}>
              If your Rest channel stays below 20% for 72 hours, NADI will gently suggest reaching out to someone you trust. You won't be prompted more than once.
            </p>
          </div>
        </div>

        {/* Personalisation note */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(20, sc) }}>
          <div style={{ borderTop: `1px solid ${C.cardDeep}`, paddingTop: s(14, sc), display: 'flex', alignItems: 'flex-start', gap: s(8, sc) }}>
            <svg width={s(18, sc)} height={s(10, sc)} viewBox="0 0 36 12" style={{ flexShrink: 0, marginTop: s(3, sc) }}>
              <path d="M0,6 Q7,2 14,6 Q21,10 28,6 Q32,4 36,6" fill="none" stroke="#C4722A" strokeWidth="2" strokeOpacity="0.6"/>
              <path d="M0,6 Q7,10 14,6 Q21,2 28,6 Q32,8 36,6" fill="none" stroke="#D4A847" strokeWidth="1.8" strokeOpacity="0.5"/>
              <path d="M0,4 Q7,6 14,4 Q21,2 28,4 Q32,5 36,4" fill="none" stroke="#C9B8A0" strokeWidth="1.5" strokeOpacity="0.45"/>
            </svg>
            <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(12, sc), color: C.sec, lineHeight: 1.7 }}>
              NADI is still learning you. Each day, these suggestions grow a little closer to who you actually are.
            </p>
          </div>
        </div>
      </div>

      <BottomNav active="restore" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 11 - Profile ──────────────────────────────────────────────────────
function ProfileScreen({ onNav, sc }: ScreenProps) {
  const C = useColors();
  const { themeMode, setThemeMode } = useThemeMode();
  const [modal, setModal] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const stats = [
    { label: 'Avg Energy', val: '78', sub: 'out of 100' },
    { label: 'Captures',   val: '24', sub: 'this week'  },
    { label: 'Restored',   val: '11', sub: 'moments'    },
  ];

  const modalContent: Record<string, { title: string; body: React.ReactNode }> = {
    'How it works': {
      title: 'How NADI Works',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          {[
            { icon: '〰', label: 'The Braid Reads You', text: 'Three woven strands — Drive, Balance, Rest — each carry a different sensor signal. NADI reads skin temperature, conductance, and heart rate simultaneously through The Seat.' },
            { icon: '🌡', label: 'Temperature is the Language', text: 'When your cognitive load rises, your peripheral skin temperature shifts. NADI detects this and responds — warming or cooling the band to mirror your internal state.' },
            { icon: '✦', label: 'No Screen. No Alerts.', text: "NADI never interrupts you. It becomes part of your body's own feedback loop — a feeling, not a notification." },
          ].map(({ icon, label, text }) => (
            <div key={label} style={{ display: 'flex', gap: s(12, sc), alignItems: 'flex-start' }}>
              <div style={{ fontSize: s(18, sc), width: s(28, sc), flexShrink: 0, textAlign: 'center' as const }}>{icon}</div>
              <div>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color: C.indian, letterSpacing: 1, marginBottom: s(3, sc) }}>{label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.6, fontWeight: 500 }}>{text}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    'FAQ': {
      title: 'FAQ',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          {[
            { q: 'Does NADI track my location?', a: 'Never. NADI has no GPS. All sensing is physiological — your skin, your heart rate, your temperature. Nothing about where you are.' },
            { q: 'How long does the battery last?', a: 'The band charges inductively. Full charge lasts approximately 4 days of continuous wear. A gentle pulse warns you 12 hours before depletion.' },
            { q: 'Can I wear it while sleeping?', a: 'Yes. Night wear gives NADI your baseline rest data — the foundation it uses to calibrate daytime readings. Most users find it quickly becomes imperceptible.' },
            { q: 'What if my temperature reading seems off?', a: 'NADI calibrates over 7 days. Early readings are estimates. By day 8, it knows your personal baselines and its accuracy increases significantly.' },
            { q: 'Is it waterproof?', a: 'Water-resistant to IPX4 — splash and sweat safe. Not designed for swimming or prolonged submersion.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: `1px solid ${C.cardDeep}`, paddingBottom: s(12, sc) }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 500, color: C.text, marginBottom: s(4, sc) }}>{q}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.6, fontWeight: 500 }}>{a}</div>
            </div>
          ))}
          <div style={{ paddingBottom: s(4, sc) }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 500, color: C.text, marginBottom: s(10, sc) }}>How do suggestions get more personalised over time?</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.65, fontWeight: 500, marginBottom: s(14, sc) }}>NADI builds its picture of you gradually — not from a questionnaire, but from repeated days of real sensing. The suggestions on the Restore screen start with what works for most people, and quietly shift toward what works for you specifically.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: s(10, sc) }}>
              {[
                { days: 'Days 1–7',  label: 'Baseline', color: '#C9B8A0', desc: 'NADI listens without assuming. It maps your personal floor — the resting state your body returns to when nothing is pulling at it.', last: false },
                { days: 'Days 8–21', label: 'Pattern',  color: '#D4A847', desc: 'Your depletion signature begins to emerge — when Drive peaks in your day, how long your Rest channel takes to rebuild, what your body does before you notice anything is wrong.', last: false },
                { days: 'Day 22+',   label: 'Memory',   color: '#C4722A', desc: 'Suggestions become specific to you. Not what generally restores people — what restores you. The band starts to feel less like a device and more like something that already knows.', last: true },
              ].map(({ days, label, color, desc, last }) => (
                <div key={days} style={{ display: 'flex', gap: s(12, sc), alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: s(3, sc) }}>
                    <div style={{ width: s(9, sc), height: s(9, sc), borderRadius: '50%', background: color, boxShadow: `0 0 ${s(5, sc)}px ${color}55` }} />
                    {!last && <div style={{ width: 1, height: s(32, sc), background: C.cardDeep, marginTop: s(2, sc) }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: last ? 0 : s(4, sc) }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: s(7, sc), marginBottom: s(3, sc) }}>
                      <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color, letterSpacing: 0.5 }}>{label}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(9.5, sc), color: C.sec, fontWeight: 500 }}>{days}</span>
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 500 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    'Data & privacy': {
      title: 'Data & Privacy',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          <div style={{ background: C.card, borderRadius: s(12, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 2, color: C.indian, marginBottom: s(6, sc) }}>WHAT WE COLLECT</div>
            {['Skin temperature readings', 'Heart rate variability', 'Skin conductance patterns', 'Voice captures (local only)', 'Usage patterns (anonymised)'].map(item => (
              <div key={item} style={{ display: 'flex', gap: s(8, sc), alignItems: 'center', marginBottom: s(5, sc) }}>
                <div style={{ width: s(4, sc), height: s(4, sc), borderRadius: '50%', background: C.indian, flexShrink: 0 }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, borderRadius: s(12, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 2, color: C.indian, marginBottom: s(6, sc) }}>WHAT WE NEVER DO</div>
            {['Sell your data to third parties', 'Use data for advertising', 'Share with employers or insurers', 'Store voice audio beyond capture window'].map(item => (
              <div key={item} style={{ display: 'flex', gap: s(8, sc), alignItems: 'center', marginBottom: s(5, sc) }}>
                <span style={{ color: C.sec, fontSize: s(10, sc), flexShrink: 0 }}>✕</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.6, fontWeight: 500 }}>All physiological data is processed on-device. Only anonymised, aggregated patterns are used for model improvement — and only if you have opted in.</p>
        </div>
      ),
    },
    '72-hour protocol': {
      title: '72-Hour Protocol',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(13, sc), color: C.text, lineHeight: 1.65 }}>The 72-hour protocol is a voluntary full digital rest.</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), color: C.sec, lineHeight: 1.65, fontWeight: 500 }}>When activated, NADI disconnects from all sync, stops sending captures, and enters pure sensing mode. The band continues reading your energy — but nothing leaves the device. No cloud, no app, no prompts.</p>
          <div style={{ background: C.card, borderRadius: s(12, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 2, color: C.indian, marginBottom: s(8, sc) }}>DURING PROTOCOL</div>
            {[
              { label: 'Band still reads', val: 'All three channels active' },
              { label: 'Captures', val: 'Stored locally, not surfaced' },
              { label: 'Sync', val: 'Fully paused' },
              { label: 'Duration', val: 'Exactly 72 hours' },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: s(6, sc) }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, fontWeight: 300 }}>{label}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.text, fontWeight: 400 }}>{val}</span>
              </div>
            ))}
          </div>
          <button style={{ background: C.btn, border: 'none', borderRadius: s(13, sc), padding: `${s(13, sc)}px`, color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer' }}>Begin 72-Hour Protocol</button>
        </div>
      ),
    },
    'Data on device': {
      title: 'Data on Device',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(12, sc) }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300 }}>Your physiological data is processed and stored locally on your device. NADI's core sensing never requires a cloud connection.</p>
          {[
            { label: 'Captures stored', val: '24',    unit: 'voice notes' },
            { label: 'Energy logs',     val: '14',    unit: 'days' },
            { label: 'Storage used',    val: '2.4',   unit: 'MB' },
            { label: 'Last sync',       val: 'Today', unit: '11:32 AM' },
          ].map(({ label, val, unit }) => (
            <div key={label} style={{ background: C.card, borderRadius: s(11, sc), padding: `${s(10, sc)}px ${s(13, sc)}px`, border: `1px solid ${C.cardDeep}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, fontWeight: 300 }}>{label}</span>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(13, sc), color: C.text, fontWeight: 300 }}>{val} <span style={{ fontSize: s(9, sc), color: C.sec }}>{unit}</span></span>
            </div>
          ))}
        </div>
      ),
    },
  };

  const groups = [
    {
      label: 'NADI',
      items: [
        { name: 'How it works',    action: () => setModal('How it works'), icon: '→' },
        { name: 'Wristband guide', action: () => onNav('wristband'),       icon: '→' },
        { name: 'Tutorial recap',  action: () => onNav('tutorial'),        icon: '→' },
        { name: 'FAQ',             action: () => setModal('FAQ'),          icon: '→' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { name: 'Notifications',       action: () => setNotifications(n => !n), toggle: true, toggled: notifications },
        { name: 'Restore preferences', action: () => onNav('restore'),           icon: '→' },
        { name: 'Calendar sync',       action: () => setCalendarSync(n => !n),  toggle: true, toggled: calendarSync },
        { name: 'Appearance',          action: () => {},                          theme: true },
        { name: 'Data & privacy',      action: () => setModal('Data & privacy'), icon: '→' },
      ],
    },
    {
      label: 'Sovereignty',
      items: [
        { name: '72-hour protocol', action: () => setModal('72-hour protocol'), icon: '→' },
        { name: 'Data on device',   action: () => setModal('Data on device'),   icon: '→' },
        { name: 'Delete all data',  action: () => setDeleteConfirm(true),       icon: '→', danger: true },
      ],
    },
  ];

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <StatusBar sc={sc} />

      {/* Modal bottom sheet */}
      {modal && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(30,21,8,0.55)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setModal(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: `${s(22, sc)}px ${s(22, sc)}px 0 0`, padding: `${s(20, sc)}px ${s(20, sc)}px ${s(36, sc)}px`, maxHeight: '78%', display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
            <div style={{ width: s(36, sc), height: s(4, sc), borderRadius: s(2, sc), background: C.cardDeep, margin: '0 auto', marginBottom: s(4, sc) }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(18, sc), fontWeight: 300, color: C.text }}>{modal}</h2>
              <button onClick={() => setModal(null)} style={{ background: C.card, border: `1px solid ${C.cardDeep}`, borderRadius: '50%', width: s(28, sc), height: s(28, sc), cursor: 'pointer', color: C.sec, fontSize: s(14, sc), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>{modalContent[modal]?.body}</div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(30,21,8,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `0 ${s(24, sc)}px` }}>
          <div style={{ background: C.bg, borderRadius: s(20, sc), padding: `${s(24, sc)}px`, border: `1px solid ${C.cardDeep}`, width: '100%' }}>
            {deleted ? (
              <div style={{ textAlign: 'center' as const, padding: `${s(16, sc)}px 0` }}>
                <div style={{ fontSize: s(28, sc), marginBottom: s(10, sc) }}>✦</div>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(16, sc), fontWeight: 300, color: C.text, marginBottom: s(8, sc) }}>All data cleared.</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, marginBottom: s(20, sc) }}>Your band is ready to begin again. The body doesn't forget — but NADI will.</div>
                <button onClick={() => { setDeleteConfirm(false); setDeleted(false); onNav('welcome'); }} style={{ background: C.btn, border: 'none', borderRadius: s(13, sc), padding: `${s(12, sc)}px ${s(24, sc)}px`, color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), cursor: 'pointer' }}>Return to start →</button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(16, sc), fontWeight: 300, color: C.text, marginBottom: s(8, sc) }}>Delete all data?</div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300, marginBottom: s(20, sc) }}>This will permanently erase all captures, energy logs, baselines, and personal preferences. Your band will return to factory state. This cannot be undone.</p>
                <div style={{ display: 'flex', gap: s(10, sc) }}>
                  <button onClick={() => setDeleteConfirm(false)} style={{ flex: 1, height: s(46, sc), background: 'transparent', borderRadius: s(13, sc), border: `1.5px solid ${C.cardDeep}`, color: C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => setDeleted(true)} style={{ flex: 1, height: s(46, sc), background: 'rgba(154,78,24,0.12)', borderRadius: s(13, sc), border: `1.5px solid rgba(154,78,24,0.4)`, color: '#9A4E18', fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), fontWeight: 500, cursor: 'pointer' }}>Delete everything</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Avatar header — tapping navigates back to home */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(7, sc), paddingTop: s(58, sc), paddingBottom: s(14, sc), flexShrink: 0 }}>
        <div style={{ width: s(68, sc), height: s(68, sc), borderRadius: '50%', background: `linear-gradient(135deg, ${C.indian}, ${C.btn})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 300, boxShadow: `0 ${s(4, sc)}px ${s(20, sc)}px rgba(196,114,42,0.35)` }}>D</div>
        <div style={{ fontSize: s(16, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Dia</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(5, sc) }}>
          <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: C.green, boxShadow: `0 0 ${s(4, sc)}px ${C.green}` }} />
          <span style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif' }}>Band connected · 14 days streak</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: s(10, sc), padding: `0 ${s(18, sc)}px`, marginBottom: s(16, sc), flexShrink: 0 }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ flex: 1, background: C.card, borderRadius: s(14, sc), padding: `${s(11, sc)}px ${s(8, sc)}px`, textAlign: 'center', border: `1px solid ${C.cardDeep}` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(22, sc), color: C.text, fontWeight: 300 }}>{stat.val}</div>
            <div style={{ fontSize: s(9, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif', marginTop: s(1, sc) }}>{stat.label}</div>
            <div style={{ fontSize: s(8, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', opacity: 0.6 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Scrollable settings */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 0, paddingLeft: s(18, sc), paddingRight: s(18, sc), paddingBottom: s(90, sc) }}>
        {groups.map(group => (
          <div key={group.label} style={{ marginBottom: s(20, sc) }}>
            <div style={{ fontSize: s(9, sc), color: C.indian, letterSpacing: s(2.5, sc), textTransform: 'uppercase', marginBottom: s(8, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200 }}>{group.label}</div>
            <div style={{ background: C.card, borderRadius: s(16, sc), overflow: 'hidden', border: `1px solid ${C.cardDeep}` }}>
              {group.items.map((item: any, i: number) => (
                <div key={item.name} onClick={item.theme ? undefined : item.action} style={{ padding: `${s(item.theme ? 10 : 14, sc)}px ${s(16, sc)}px`, borderBottom: i < group.items.length - 1 ? `1px solid ${C.cardDeep}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: item.theme ? 'default' : 'pointer' }}>
                  <span style={{ fontSize: s(13, sc), color: item.danger ? 'rgba(154,78,24,0.85)' : C.text, fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>{item.name}</span>
                  {item.theme ? (
                    <div style={{ display: 'flex', gap: s(4, sc), background: C.cardDeep, borderRadius: s(10, sc), padding: s(3, sc) }}>
                      {(['light','dark','system'] as ThemeMode[]).map(m => (
                        <button key={m} onClick={() => setThemeMode(m)} style={{ height: s(26, sc), paddingLeft: s(10, sc), paddingRight: s(10, sc), borderRadius: s(7, sc), border: 'none', background: themeMode === m ? C.btn : 'transparent', color: themeMode === m ? '#fff' : C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.18s' }}>
                          {m === 'light' ? '☀ Light' : m === 'dark' ? '☾ Dark' : '⟳ Auto'}
                        </button>
                      ))}
                    </div>
                  ) : item.toggle ? (
                    <div style={{ width: s(40, sc), height: s(24, sc), borderRadius: s(12, sc), background: item.toggled ? C.indian : C.cardDeep, position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: s(4, sc), left: item.toggled ? s(20, sc) : s(4, sc), width: s(16, sc), height: s(16, sc), borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </div>
                  ) : (
                    <span style={{ fontSize: s(18, sc), color: 'rgba(160,128,80,0.4)', lineHeight: 1 }}>›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center' as const, padding: `${s(10, sc)}px 0 ${s(4, sc)}px` }}>
          <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), color: C.indian, letterSpacing: 4, fontWeight: 200 }}>NADI</div>
          <div style={{ fontSize: s(10, sc), fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif', fontWeight: 500, color: 'rgba(160,128,80,0.6)', marginTop: s(3, sc), letterSpacing: 0.5 }}>feel your energy</div>
          <div style={{ fontSize: s(9, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', marginTop: s(6, sc), opacity: 0.5 }}>v1.0.0 · Band FW 2.4.1</div>
        </div>
      </div>

      <BottomNav active="profile" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screens Registry ──────────────────────────────────────────────────────────
const SCREENS: { id: ScreenId; label: string; short: string; Component: React.ComponentType<ScreenProps> }[] = [
  { id: 'welcome',    label: '01 - Welcome',    short: 'Welcome',    Component: WelcomeScreen    },
  { id: 'signin',     label: '02 - Sign In',    short: 'Sign In',    Component: SignInScreen      },
  { id: 'onboarding', label: '03 - Onboarding', short: 'Onboarding', Component: OnboardingScreen  },
  { id: 'wristband',  label: '04 - Wristband',  short: 'Wristband',  Component: WristbandScreen   },
  { id: 'tutorial',   label: '05 - Tutorial',   short: 'Tutorial',   Component: TutorialScreen    },
  { id: 'home',       label: '06 - Home',       short: 'Home',       Component: HomeScreen        },
  { id: 'speak',      label: '07 - Speak',      short: 'Speak',      Component: SpeakScreen       },
  { id: 'captured',   label: '08 - Captured',   short: 'Captured',   Component: CapturedScreen    },
  { id: 'revisit',    label: '09 - Revisit',    short: 'Revisit',    Component: RevisitScreen     },
  { id: 'restore',    label: '10 - Restore',    short: 'Restore',    Component: RestoreScreen     },
  { id: 'profile',    label: '11 - Profile',    short: 'Profile',    Component: ProfileScreen     },
];

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<'canvas' | 'prototype'>('canvas');
  const [active, setActive] = useState<ScreenId>('welcome');
  const [hovered, setHovered] = useState<ScreenId | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [sysDark, setSysDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const { protoSc: PROTO_SC, canvasSc: CANVAS_SC } = useResponsiveSc();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedDark = themeMode === 'dark' || (themeMode === 'system' && sysDark);
  const resolvedColors = resolvedDark ? DARK_C : LIGHT_C;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Josefin+Sans:wght@100;200;300;400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      @keyframes blobPulse {
        0%   { border-radius: 42% 58% 55% 45% / 48% 52% 48% 52%; }
        33%  { border-radius: 55% 45% 48% 52% / 55% 45% 55% 45%; }
        66%  { border-radius: 48% 52% 42% 58% / 45% 55% 48% 52%; }
        100% { border-radius: 42% 58% 55% 45% / 48% 52% 48% 52%; }
      }
      @keyframes rippleOut { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.8); opacity: 0; } }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 15px 4px rgba(196,114,42,0.3), 0 0 40px 8px rgba(154,78,24,0.15); }
        50%       { box-shadow: 0 0 30px 8px rgba(196,114,42,0.55), 0 0 70px 16px rgba(154,78,24,0.3); }
      }
      @keyframes floatLogo { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      @keyframes bandBreathe { 0%,100% { transform: scale(1); opacity: 0.72; } 50% { transform: scale(1.13); opacity: 1; } }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }, []);

  const navigate = (id: ScreenId) => setActive(id);
  const activeIdx = SCREENS.findIndex(s => s.id === active);
  const goLeft  = () => setActive(SCREENS[Math.max(0, activeIdx - 1)].id);
  const goRight = () => setActive(SCREENS[Math.min(SCREENS.length - 1, activeIdx + 1)].id);

  return (
    <ThemeCtx.Provider value={{ colors: resolvedColors, themeMode, setThemeMode }}>
    <div style={{ minHeight: '100vh', background: resolvedDark ? '#0A0603' : '#1E1508', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, DM Sans, sans-serif' }}>

      {/* ── Toolbar ── */}
      <div style={{ height: 48, background: '#1E1508', borderBottom: '1px solid #3E3018', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 20px', gap: 16, flexShrink: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 120 120" fill="none">
            <rect width="120" height="120" rx="26" fill="url(#tbTile2)"/>
            <ellipse cx="60" cy="76" rx="22" ry="12" fill="rgba(180,60,20,0.45)"/>
            <path d="M60 25 C60 25 38 55 38 72 C38 85 48 95 60 95 C72 95 82 85 82 72 C82 55 60 25 60 25Z" fill="url(#tbF1)"/>
            <path d="M60 38 C60 38 44 60 44 73 C44 83 51 90 60 90 C69 90 76 83 76 73 C76 60 60 38 60 38Z" fill="url(#tbF2)"/>
            <path d="M60 52 C60 52 50 66 50 74 C50 80 54 86 60 86 C66 86 70 80 70 74 C70 66 60 52 60 52Z" fill="url(#tbF3)"/>
            <defs>
              <linearGradient id="tbTile2" x1="0" y1="0" x2="120" y2="120"><stop offset="0%" stopColor="#C4722A"/><stop offset="100%" stopColor="#8A4E1A"/></linearGradient>
              <radialGradient id="tbF1" cx="50%" cy="60%" r="50%"><stop offset="0%" stopColor="#F0C84A" stopOpacity="0.9"/><stop offset="60%" stopColor="#E09050" stopOpacity="0.8"/><stop offset="100%" stopColor="#8A4E1A" stopOpacity="0.6"/></radialGradient>
              <radialGradient id="tbF2" cx="50%" cy="55%" r="50%"><stop offset="0%" stopColor="#ECC870" stopOpacity="0.95"/><stop offset="70%" stopColor="#D4A847" stopOpacity="0.7"/><stop offset="100%" stopColor="#C4722A" stopOpacity="0.5"/></radialGradient>
              <radialGradient id="tbF3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFFBE8"/><stop offset="50%" stopColor="#F0C84A" stopOpacity="0.9"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0.7"/></radialGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'Josefin Sans, sans-serif', color: '#E09050', fontSize: 13, letterSpacing: 6, fontWeight: 200 }}>NADI</span>
          <span style={{ color: '#555', fontSize: 12 }}>/ Design System / App Screens v2.0</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: '#2E2010', borderRadius: 8, padding: 3, display: 'flex', gap: 2 }}>
          {(['canvas', 'prototype'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ background: mode === m ? '#3E3018' : 'transparent', border: 'none', color: mode === m ? '#E09050' : '#6A5030', padding: '4px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: mode === m ? 500 : 400 }}>
              {m === 'canvas' ? '⊞ Canvas' : '▶ Prototype'}
            </button>
          ))}
        </div>
        <span style={{ color: '#6A5030', fontSize: 11 }}>iPhone 14 Pro · 393×852</span>
        <span style={{ color: '#3E3018', fontSize: 11 }}>|</span>
        <span style={{ color: '#6A5030', fontSize: 11 }}>11 screens</span>
      </div>

      {/* ── Canvas Mode ── */}
      {mode === 'canvas' && (
        <div style={{ flex: 1, overflowY: 'auto', background: 'radial-gradient(circle, #3E3018 1px, transparent 1px) 0 0 / 24px 24px', padding: 52, display: 'flex', flexWrap: 'wrap', gap: '56px 40px', alignItems: 'flex-start' }}>
          {SCREENS.map(screen => {
            const Comp = screen.Component;
            return (
              <div key={screen.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setMode('prototype'); setActive(screen.id); }}>
                <span style={{ fontSize: 10, color: '#A08050', textTransform: 'uppercase', letterSpacing: 0.4 }}>{screen.label}</span>
                <div onMouseEnter={() => setHovered(screen.id)} onMouseLeave={() => setHovered(null)} style={{ transform: hovered === screen.id ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.15s ease' }}>
                  <PhoneFrame sc={CANVAS_SC}><Comp onNav={() => {}} sc={CANVAS_SC} /></PhoneFrame>
                </div>
                <span style={{ fontSize: 10, color: '#A08050', background: '#2E2010', borderRadius: 4, padding: '2px 8px', border: '1px solid #3E3018' }}>click to preview</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Prototype Mode ── */}
      {mode === 'prototype' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px', gap: 20, overflow: 'auto', background: 'radial-gradient(circle, #3E3018 1px, transparent 1px) 0 0 / 24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, justifyContent: 'center', maxWidth: 820 }}>
            {SCREENS.map(screen => (
              <button key={screen.id} onClick={() => setActive(screen.id)} style={{ background: active === screen.id ? 'rgba(196,114,42,0.85)' : '#2E2010', border: `1px solid ${active === screen.id ? '#C4722A' : '#3E3018'}`, color: active === screen.id ? '#fff' : '#6A5030', padding: '4px 12px', borderRadius: 6, fontSize: 10, cursor: 'pointer', fontWeight: active === screen.id ? 600 : 400, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s' }}>{screen.short}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 36 }}>
            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {(() => { const screen = SCREENS.find(s => s.id === active)!; const Comp = screen.Component; return (<PhoneFrame sc={PROTO_SC}><Comp onNav={navigate} sc={PROTO_SC} /></PhoneFrame>); })()}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                {SCREENS.map(screen => (<div key={screen.id} onClick={() => setActive(screen.id)} style={{ width: active === screen.id ? 18 : 6, height: 6, borderRadius: 3, background: active === screen.id ? '#C4722A' : '#3E3018', cursor: 'pointer', transition: 'all 0.2s' }} />))}
              </div>
            </div>
            {/* Side panel */}
            <div style={{ maxWidth: 200, paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 13, color: '#E09050', fontWeight: 200, letterSpacing: 2, marginBottom: 10 }}>{SCREENS.find(s => s.id === active)?.label}</div>
              <p style={{ fontSize: 11, color: '#A08050', lineHeight: 1.7, marginBottom: 20 }}>Tap any button inside the phone to navigate between screens.</p>
              <div style={{ borderTop: '1px solid #3E3018', paddingTop: 14, marginBottom: 14 }}>
                {[
                  ['Frame', 'iPhone 14 Pro'],
                  ['Screen', '393 × 852 pt'],
                  ['Scale', `${Math.round(PROTO_SC * 100)}%`],
                  ['Fonts', 'Josefin · Plus Jakarta Sans'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: '#6A5030' }}>{k}</span>
                    <span style={{ fontSize: 10, color: '#A08050' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #3E3018', paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: '#6A5030', letterSpacing: 0.5, marginBottom: 8 }}>NAVIGATE</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={goLeft}  disabled={activeIdx === 0}                    style={{ flex: 1, height: 28, background: '#2E2010', border: '1px solid #3E3018', borderRadius: 6, color: activeIdx === 0 ? '#3E3018' : '#A08050', fontSize: 14, cursor: activeIdx === 0 ? 'default' : 'pointer' }}>←</button>
                  <button onClick={goRight} disabled={activeIdx === SCREENS.length - 1}   style={{ flex: 1, height: 28, background: '#2E2010', border: '1px solid #3E3018', borderRadius: 6, color: activeIdx === SCREENS.length - 1 ? '#3E3018' : '#A08050', fontSize: 14, cursor: activeIdx === SCREENS.length - 1 ? 'default' : 'pointer' }}>→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ThemeCtx.Provider>
  );
}
