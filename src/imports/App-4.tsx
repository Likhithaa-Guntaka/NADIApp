import React, { useState, useEffect } from 'react';

// ─── Color Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: '#F5F0EB',          // parchment
  card: '#EDE5D8',        // parchment-mid
  cardDeep: '#DDD0BC',    // parchment-dark
  text: '#1E1508',        // ink
  sec: '#A08050',         // warm-tone-2
  secDark: '#6A5030',     // warm-tone-1
  indian: '#C4722A',      // terracotta
  terracottaDeep: '#9A4E18',
  terracottaLight: '#E09050',
  idaAccent: '#C9B8A0',   // stone
  idaLabel: '#6A5030',    // warm-tone-1
  idaPrimary: '#EDE5D8',  // parchment-mid
  pingalaRed: '#9A4E18',  // terracotta-deep
  pingalaOrange: '#C4722A',
  pingalaGlow: '#E09050', // terracotta-light
  gold: '#D4A847',
  brightGold: '#ECC870',  // gold-light
  honey: '#D4A847',
  prana: '#C9B8A0',       // stone
  tejas: '#C4722A',
  ojas: '#D4A847',
  btn: '#C4722A',         // terracotta (primary CTA)
  green: '#4A7C59',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
type ScreenId = 'welcome' | 'signin' | 'onboarding' | 'wristband' | 'tutorial' | 'home' | 'speak' | 'captured' | 'revisit' | 'restore' | 'profile';

interface ScreenProps {
  onNav: (id: ScreenId) => void;
  sc: number;
}

// ─── Scale Helper ─────────────────────────────────────────────────────────────
const s = (n: number, sc: number) => n * sc;

// ─── Responsive Scale Hook ────────────────────────────────────────────────────
// Base design: iPhone 14 Pro = 393 × 852px
// sc is the multiplier applied to every s() call — changes dynamically with viewport.
function useResponsiveSc() {
  const [vw, setVw] = useState(() => window.innerWidth);
  const [vh, setVh] = useState(() => window.innerHeight);

  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Prototype: phone fills available vertical space, side panel respected ──
  const TOOLBAR_H    = 48;
  const PILLS_H      = 72;
  const PROTO_PAD_V  = 56;
  const SIDE_PANEL_W = 320;
  const PROTO_GAP    = 36;

  const protoH = vh - TOOLBAR_H - PILLS_H - PROTO_PAD_V;
  const protoW = vw - SIDE_PANEL_W - PROTO_GAP - 40;
  const scByH  = protoH / 852;
  const scByW  = protoW / 393;
  const protoSc = Math.min(scByH, scByW, 0.96);

  // ── Canvas: fit cleanly in a responsive grid ──────────────────────────────
  const canvasAvailW = vw - 104;
  const phoneTargetW = Math.min(canvasAvailW / 3.5, 170);
  const canvasSc     = phoneTargetW / 393;

  return {
    protoSc:  Math.max(protoSc,  0.48),
    canvasSc: Math.max(canvasSc, 0.30),
  };
}

// ─── PhoneFrame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, sc = 1 }: { children: React.ReactNode; sc?: number }) {
  return (
    <div style={{
      width: s(393, sc),
      height: s(852, sc),
      borderRadius: s(47, sc),
      background: '#111',
      position: 'relative',
      flexShrink: 0,
      boxShadow: `0 0 0 ${s(1.5, sc)}px #3A3A3A, 0 ${s(24, sc)}px ${s(60, sc)}px rgba(0,0,0,0.6), 0 ${s(8, sc)}px ${s(20, sc)}px rgba(0,0,0,0.3)`,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: s(47, sc),
        overflow: 'hidden',
        background: C.bg,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {children}
      </div>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute',
        top: s(14, sc),
        left: '50%',
        transform: 'translateX(-50%)',
        width: s(126, sc),
        height: s(37, sc),
        background: '#080808',
        borderRadius: s(20, sc),
        zIndex: 200,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────
function BottomNav({ active, onNav, sc }: { active: ScreenId; onNav: (id: ScreenId) => void; sc: number }) {
  const tabs: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '⬡' },
    { id: 'speak', label: 'Speak', icon: '●' },
    { id: 'revisit', label: 'Revisit', icon: '↻' },
    { id: 'restore', label: 'Restore', icon: '✦' },
    { id: 'profile', label: 'Profile', icon: '◎' },
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: s(84, sc),
      background: 'rgba(250,243,236,0.94)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 100,
      borderTop: `${s(0.5, sc)}px solid rgba(138,117,96,0.12)`,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <div
            key={tab.id}
            onClick={() => onNav(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: s(2, sc),
              position: 'relative',
              paddingTop: s(6, sc),
              paddingBottom: s(8, sc),
            }}
          >
            <span style={{
              fontSize: tab.id === 'speak' ? s(21, sc) : s(16, sc),
              color: isActive ? C.btn : 'rgba(138,117,96,0.6)',
              lineHeight: 1,
            }}>{tab.icon}</span>
            <span style={{
              fontSize: s(9, sc),
              fontWeight: isActive ? 500 : 400,
              color: isActive ? C.btn : 'rgba(138,117,96,0.6)',
              fontFamily: 'DM Sans, sans-serif',
            }}>{tab.label}</span>
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: s(6, sc),
                width: s(16, sc),
                height: s(2.5, sc),
                background: C.btn,
                borderRadius: s(2, sc),
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── EnergyBlob ───────────────────────────────────────────────────────────────
function EnergyBlob({ value, sc }: { value: number; sc: number }) {
  return (
    <div style={{
      width: s(195, sc),
      height: s(195, sc),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    }}>
      <div style={{
        position: 'absolute',
        width: '138%',
        height: '138%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,71,0.12) 0%, rgba(192,57,43,0.07) 55%, transparent 80%)',
        animation: 'blobPulse 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '112%',
        height: '112%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,71,0.08) 0%, rgba(192,57,43,0.04) 60%, transparent 80%)',
        animation: 'blobPulse 6s ease-in-out infinite reverse',
      }} />
      <div style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 35% 35%, ${C.brightGold}, ${C.pingalaOrange} 45%, ${C.pingalaGlow} 70%, ${C.btn})`,
        animation: 'blobPulse 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{
          fontSize: s(10, sc),
          color: 'rgba(255,255,255,0.78)',
          letterSpacing: s(2.5, sc),
          textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif',
        }}>ENERGY</span>
        <span style={{
          fontSize: s(54, sc),
          color: '#fff',
          fontFamily: 'Josefin Sans, sans-serif',
          fontWeight: 300,
          lineHeight: 1,
        }}>{value}</span>
      </div>
    </div>
  );
}

// ─── Screen 01 - Welcome ──────────────────────────────────────────────────────
function WelcomeScreen({ onNav, sc }: ScreenProps) {
  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(175deg, #F5F0EB 0%, #DDD0BC 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${s(68, sc)}px ${s(28, sc)}px ${s(44, sc)}px`,
      overflowY: 'auto',
    }}>
      {/* NADI Flame Logo */}
      <div style={{
        width: s(110, sc),
        height: s(110, sc),
        flexShrink: 0,
        filter: `drop-shadow(0 ${s(12, sc)}px ${s(32, sc)}px rgba(196,114,42,0.4))`,
        animation: 'floatLogo 4s ease-in-out infinite',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          <rect width="200" height="200" rx="42" fill="url(#wTile)"/>
          <ellipse cx="100" cy="130" rx="50" ry="22" fill="rgba(180,60,20,0.35)"/>
          <path d="M100 30 C100 30 58 82 58 118 C58 145 76 168 100 168 C124 168 142 145 142 118 C142 82 100 30 100 30Z" fill="url(#wPetal1)"/>
          <path d="M100 52 C100 52 68 94 68 120 C68 142 82 158 100 158 C118 158 132 142 132 120 C132 94 100 52 100 52Z" fill="url(#wPetal2)"/>
          <path d="M100 74 C100 74 80 106 80 122 C80 138 89 150 100 150 C111 150 120 138 120 122 C120 106 100 74 100 74Z" fill="url(#wPetal3)"/>
          <defs>
            <linearGradient id="wTile" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#CE7E35"/>
              <stop offset="100%" stopColor="#8A4E1A"/>
            </linearGradient>
            <radialGradient id="wPetal1" cx="50%" cy="65%" r="55%">
              <stop offset="0%" stopColor="#F0C84A" stopOpacity="0.7"/>
              <stop offset="50%" stopColor="#C4722A" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#7A3810" stopOpacity="0.9"/>
            </radialGradient>
            <radialGradient id="wPetal2" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#F5D870" stopOpacity="0.85"/>
              <stop offset="55%" stopColor="#D4A847" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#C4722A" stopOpacity="0.7"/>
            </radialGradient>
            <radialGradient id="wPetal3" cx="50%" cy="55%" r="55%">
              <stop offset="0%" stopColor="#FFFBE8" stopOpacity="1"/>
              <stop offset="40%" stopColor="#F0D060" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#D4A847" stopOpacity="0.8"/>
            </radialGradient>
            <radialGradient id="wDotRemoved" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFBE8"/>
              <stop offset="100%" stopColor="#ECC870"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Center wordmark */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(10, sc) }}>
        <div style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: s(60, sc),
          fontWeight: 100,
          color: C.indian,
          letterSpacing: s(14, sc),
          lineHeight: 1,
        }}>NADI</div>
        <p style={{
          fontFamily: 'IM Fell English, serif',
          fontStyle: 'italic',
          fontSize: s(14, sc),
          fontWeight: 300,
          color: C.sec,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: s(260, sc),
          letterSpacing: s(1, sc),
        }}>feel your energy</p>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: s(12, sc), alignItems: 'center' }}>
        <button
          onClick={() => onNav('onboarding')}
          style={{
            width: '100%',
            height: s(56, sc),
            background: C.btn,
            borderRadius: s(16, sc),
            border: 'none',
            color: '#fff',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: s(15, sc),
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(196,114,42,0.38)`,
          }}
        >Create account</button>
        <button
          onClick={() => onNav('signin')}
          style={{
            width: '100%',
            height: s(52, sc),
            background: 'transparent',
            borderRadius: s(16, sc),
            border: `${s(1.5, sc)}px solid rgba(196,114,42,0.4)`,
            color: C.text,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: s(15, sc),
            fontWeight: 400,
            cursor: 'pointer',
          }}
        >Sign in</button>
        <p style={{
          fontSize: s(10, sc),
          letterSpacing: 0.5,
          color: 'rgba(138,117,96,0.6)',
          fontFamily: 'DM Sans, sans-serif',
          textTransform: 'uppercase',
        }}>A NEW SENSE FOR YOUR MIND</p>
      </div>
    </div>
  );
}

// ─── Screen 02 - Sign In ──────────────────────────────────────────────────────
function SignInScreen({ onNav, sc }: ScreenProps) {
  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: `${s(54, sc)}px ${s(24, sc)}px ${s(36, sc)}px`,
      overflowY: 'auto',
    }}>
      <button
        onClick={() => onNav('welcome')}
        style={{
          background: 'none',
          border: 'none',
          color: C.sec,
          fontSize: s(13, sc),
          cursor: 'pointer',
          textAlign: 'left',
          padding: 0,
          marginBottom: s(28, sc),
          fontFamily: 'DM Sans, sans-serif',
        }}
      >← Back</button>

      <div style={{ marginBottom: s(32, sc) }}>
        <h1 style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: s(30, sc),
          fontWeight: 300,
          color: C.text,
          marginBottom: s(8, sc),
        }}>Welcome back.</h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(13, sc),
          fontWeight: 300,
          color: C.sec,
        }}>Sign in to continue your rhythm.</p>
      </div>

      {/* Email field */}
      <div style={{ marginBottom: s(16, sc) }}>
        <div style={{
          fontSize: s(11, sc),
          color: C.sec,
          letterSpacing: 0.6,
          fontWeight: 500,
          textTransform: 'uppercase',
          marginBottom: s(7, sc),
          fontFamily: 'DM Sans, sans-serif',
        }}>Email</div>
        <div style={{
          height: s(52, sc),
          background: C.card,
          borderRadius: s(14, sc),
          border: `1px solid rgba(138,117,96,0.2)`,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${s(16, sc)}px`,
        }}>
          <div style={{
            width: '55%',
            height: s(1.5, sc),
            background: 'rgba(138,117,96,0.35)',
            borderRadius: 1,
          }} />
        </div>
      </div>

      {/* Password field */}
      <div style={{ marginBottom: s(10, sc) }}>
        <div style={{
          fontSize: s(11, sc),
          color: C.sec,
          letterSpacing: 0.6,
          fontWeight: 500,
          textTransform: 'uppercase',
          marginBottom: s(7, sc),
          fontFamily: 'DM Sans, sans-serif',
        }}>Password</div>
        <div style={{
          height: s(52, sc),
          background: C.card,
          borderRadius: s(14, sc),
          border: `1px solid rgba(138,117,96,0.2)`,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${s(16, sc)}px`,
        }}>
          <div style={{
            width: '40%',
            height: s(1.5, sc),
            background: 'rgba(138,117,96,0.35)',
            borderRadius: 1,
          }} />
        </div>
      </div>

      <div style={{ textAlign: 'right', marginBottom: s(24, sc) }}>
        <span style={{
          fontSize: s(12, sc),
          color: C.indian,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
        }}>Forgot password?</span>
      </div>

      <button
        onClick={() => onNav('home')}
        style={{
          width: '100%',
          height: s(54, sc),
          background: C.btn,
          borderRadius: s(16, sc),
          border: 'none',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(15, sc),
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(192,57,43,0.35)`,
          marginBottom: s(22, sc),
        }}
      >Sign in</button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: s(10, sc), marginBottom: s(18, sc) }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(138,117,96,0.18)' }} />
        <span style={{ fontSize: s(11, sc), color: 'rgba(138,117,96,0.7)', fontFamily: 'DM Sans, sans-serif' }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(138,117,96,0.18)' }} />
      </div>

      {/* Social login */}
      {[
        { icon: '🍎', label: 'Continue with Apple' },
        { icon: '🔵', label: 'Continue with Google' },
      ].map(item => (
        <div
          key={item.label}
          style={{
            height: s(50, sc),
            background: C.card,
            borderRadius: s(14, sc),
            border: `1px solid rgba(138,117,96,0.18)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: s(8, sc),
            cursor: 'pointer',
            marginBottom: s(10, sc),
            fontFamily: 'DM Sans, sans-serif',
            fontSize: s(13, sc),
            color: C.text,
          }}
        >
          <span style={{ fontSize: s(16, sc) }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

// ─── Screen 03 - Onboarding ───────────────────────────────────────────────────
function OnboardingScreen({ onNav, sc }: ScreenProps) {
  const [step, setStep] = useState(0);
  const [granted, setGranted] = useState([false, false, false]);

  // Step 0: infographic intro pages
  const infographics = [
    {
      id: 'decisions',
      label: 'The Problem',
      stat: '35,000',
      unit: 'decisions / day',
      caption: 'Most are invisible — and collectively drain your cognitive reserves by afternoon.',
      visual: (
        <svg width={s(280, sc)} height={s(140, sc)} viewBox="0 0 280 140">
          <defs>
            <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C4722A" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#D4A847" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9A4E18" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#C4722A" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          {/* Brain capacity curve */}
          <path d="M20,25 Q50,20 80,30 Q110,42 130,55 Q155,70 175,90 Q200,108 250,115" fill="none" stroke="#C4722A" strokeWidth={s(2.5, sc)} strokeOpacity="0.35" strokeDasharray="4 3"/>
          {/* Energy bars declining through day */}
          {[
            { x: 22, h: 90, label: '8am', color: 'url(#barGrad1)', opacity: 1 },
            { x: 57, h: 78, label: '10am', color: 'url(#barGrad1)', opacity: 0.9 },
            { x: 92, h: 60, label: '12pm', color: 'url(#barGrad1)', opacity: 0.75 },
            { x: 127, h: 44, label: '2pm', color: 'url(#barGrad2)', opacity: 0.65 },
            { x: 162, h: 28, label: '4pm', color: 'url(#barGrad2)', opacity: 0.5 },
            { x: 197, h: 15, label: '6pm', color: 'url(#barGrad2)', opacity: 0.35 },
            { x: 232, h: 8,  label: '8pm', color: 'url(#barGrad2)', opacity: 0.22 },
          ].map(({ x, h, label, color, opacity }) => (
            <g key={x} opacity={opacity}>
              <rect x={x} y={108 - h} width={s(24, sc)} height={h} rx={s(5, sc)} fill={color}/>
              <text x={x + 12} y={125} textAnchor="middle" fontFamily="Josefin Sans, sans-serif"
                fontSize={s(7, sc)} fill="#A08050" letterSpacing="0.3">{label}</text>
            </g>
          ))}
          {/* Cognitive capacity label */}
          <text x="14" y="18" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#C4722A" letterSpacing="0.5" opacity="0.7">COGNITIVE CAPACITY</text>
          {/* Depleted zone */}
          <rect x="170" y="95" width="95" height="20" rx="4" fill="#9A4E18" fillOpacity="0.08"/>
          <text x="217" y="107" textAnchor="middle" fontFamily="Josefin Sans, sans-serif" fontSize={s(6.5, sc)} fill="#9A4E18" opacity="0.7">DEPLETED ZONE</text>
        </svg>
      ),
    },
    {
      id: 'channels',
      label: 'Your Energy',
      stat: '3',
      unit: 'nadi channels',
      caption: 'Drive · Balance · Rest — NADI reads all three simultaneously through your skin.',
      visual: (
        <svg width={s(280, sc)} height={s(140, sc)} viewBox="0 0 280 140">
          <defs>
            <linearGradient id="driveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C4722A" stopOpacity="0"/>
              <stop offset="30%" stopColor="#C4722A" stopOpacity="0.9"/>
              <stop offset="70%" stopColor="#C4722A" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#C4722A" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="balGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D4A847" stopOpacity="0"/>
              <stop offset="30%" stopColor="#D4A847" stopOpacity="0.9"/>
              <stop offset="70%" stopColor="#D4A847" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#D4A847" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="restGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9B8A0" stopOpacity="0"/>
              <stop offset="30%" stopColor="#C9B8A0" stopOpacity="0.9"/>
              <stop offset="70%" stopColor="#C9B8A0" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#C9B8A0" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Channel label left */}
          <text x="8" y="38" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#C4722A" letterSpacing="0.5">DRIVE</text>
          <text x="8" y="70" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#D4A847" letterSpacing="0.5">BALANCE</text>
          <text x="8" y="102" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#C9B8A0" letterSpacing="0.5">REST</text>
          {/* Drive wave — active / high amplitude */}
          <path d="M56,34 Q70,18 84,34 Q98,50 112,34 Q126,18 140,34 Q154,50 168,34 Q182,18 196,34 Q210,50 224,34 Q238,18 252,34" fill="none" stroke="url(#driveGrad)" strokeWidth={s(8, sc)}/>
          {/* Balance wave — steady middle */}
          <path d="M56,66 Q84,54 112,66 Q140,78 168,66 Q196,54 224,66 Q252,78 280,66" fill="none" stroke="url(#balGrad)" strokeWidth={s(6, sc)}/>
          {/* Rest wave — gentle undulation */}
          <path d="M56,98 Q84,88 112,98 Q140,108 168,98 Q196,88 224,98 Q252,108 280,98" fill="none" stroke="url(#restGrad)" strokeWidth={s(7, sc)}/>
          {/* Sensor pulse dot */}
          <circle cx="140" cy="66" r={s(6, sc)} fill="#D4A847" fillOpacity="0.22" stroke="#D4A847" strokeWidth="1.2"/>
          <circle cx="140" cy="66" r={s(3, sc)} fill="#D4A847" fillOpacity="0.9"/>
          <text x="148" y="64" fontFamily="Josefin Sans, sans-serif" fontSize={s(6.5, sc)} fill="#D4A847" opacity="0.8">sensing now</text>
          {/* Bottom caption */}
          <text x="140" y="132" textAnchor="middle" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#A08050" letterSpacing="1">REAL-TIME · THROUGH YOUR SKIN</text>
        </svg>
      ),
    },
    {
      id: 'language',
      label: 'Thermal Language',
      stat: '°C',
      unit: 'speaks in temperature',
      caption: 'No numbers on screen. No vibrations. The band becomes part of your body's own language.',
      visual: (
        <svg width={s(280, sc)} height={s(140, sc)} viewBox="0 0 280 140">
          <defs>
            <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C4722A" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#C4722A" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="neutGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4A847" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="#D4A847" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="coolGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9B8A0" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#C9B8A0" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Three band states side by side */}
          {[
            { cx: 54,  color: '#C4722A', glow: 'url(#warmGlow)',  label: 'Warm', temp: '37–38°C', sub: 'Ready', glowR: 36 },
            { cx: 140, color: '#D4A847', glow: 'url(#neutGlow)',  label: 'Neutral', temp: '34–35°C', sub: 'Steady', glowR: 30 },
            { cx: 226, color: '#C9B8A0', glow: 'url(#coolGlow)',  label: 'Cooling', temp: '30–32°C', sub: 'Rest', glowR: 26 },
          ].map(({ cx, color, glow, label, temp, sub, glowR }) => (
            <g key={label}>
              {/* Glow halo */}
              <ellipse cx={cx} cy={62} rx={glowR} ry={glowR * 0.7} fill={glow}/>
              {/* Band shape */}
              <rect x={cx - 30} y={50} width={60} height={24} rx={12} fill="#DDD0BC" stroke="#C9B8A0" strokeWidth="0.8"/>
              {/* Braid hint lines */}
              <path d={`M${cx-26},62 Q${cx-13},56 ${cx},62 Q${cx+13},68 ${cx+26},62`} fill="none" stroke={color} strokeWidth={s(3.5, sc)} strokeOpacity="0.8"/>
              <path d={`M${cx-26},62 Q${cx-13},68 ${cx},62 Q${cx+13},56 ${cx+26},62`} fill="none" stroke="#D4A847" strokeWidth={s(2.5, sc)} strokeOpacity="0.6"/>
              {/* Pod */}
              <circle cx={cx} cy={62} r={9} fill="#2E2010" stroke="#6A5030" strokeWidth="1"/>
              <circle cx={cx} cy={62} r={6} fill={color} fillOpacity="0.85"/>
              {/* Labels */}
              <text x={cx} y={91} textAnchor="middle" fontFamily="Josefin Sans, sans-serif" fontSize={s(8, sc)} fill={color} letterSpacing="0.5">{label}</text>
              <text x={cx} y={102} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize={s(7, sc)} fill="#A08050">{temp}</text>
              <text x={cx} y={114} textAnchor="middle" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill={color} letterSpacing="1" fillOpacity="0.7">{sub}</text>
            </g>
          ))}
          {/* Arrow flow */}
          <text x="90" y="65" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize={s(9, sc)} fill="#A08050" opacity="0.5">→</text>
          <text x="178" y="65" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize={s(9, sc)} fill="#A08050" opacity="0.5">→</text>
          <text x="140" y="133" textAnchor="middle" fontFamily="Josefin Sans, sans-serif" fontSize={s(7, sc)} fill="#A08050" letterSpacing="1.5">NO SCREEN · NO ALERTS · JUST FEEL</text>
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

  const currentInfo = infographics[step];

  return (
    <div style={{
      height: '100%', background: C.bg, display: 'flex', flexDirection: 'column',
      padding: `${s(52, sc)}px ${s(20, sc)}px ${s(36, sc)}px`, overflowY: 'auto',
    }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc), marginBottom: s(20, sc) }}>
        {[...infographics.map((_, i) => i), infographics.length].map(i => (
          <div key={i} style={{
            height: s(3, sc), flex: i === step ? 3 : 1,
            background: i <= step ? C.indian : C.cardDeep,
            borderRadius: s(2, sc), transition: 'all 0.3s ease',
          }}/>
        ))}
      </div>

      {step < infographics.length ? (
        /* ── Infographic slides ── */
        <>
          <div style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase', marginBottom: s(8, sc) }}>{currentInfo.label}</div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: s(6, sc), marginBottom: s(6, sc) }}>
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(52, sc), fontWeight: 100, color: C.indian, lineHeight: 1 }}>{currentInfo.stat}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), color: C.sec, fontWeight: 300 }}>{currentInfo.unit}</span>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), fontWeight: 300, color: C.sec, lineHeight: 1.6, marginBottom: s(24, sc) }}>{currentInfo.caption}</p>

          {/* Infographic visual */}
          <div style={{
            background: C.card, borderRadius: s(18, sc), border: `1px solid ${C.cardDeep}`,
            padding: `${s(18, sc)}px ${s(10, sc)}px`, display: 'flex',
            justifyContent: 'center', alignItems: 'center', marginBottom: s(24, sc),
          }}>
            {currentInfo.visual}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: s(6, sc), marginBottom: s(24, sc) }}>
            {infographics.map((_, i) => (
              <div key={i} onClick={() => setStep(i)} style={{
                width: step === i ? s(18, sc) : s(6, sc), height: s(6, sc),
                borderRadius: s(3, sc), background: step === i ? C.indian : C.cardDeep,
                cursor: 'pointer', transition: 'all 0.2s',
              }}/>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: s(10, sc) }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{
                flex: 1, height: s(50, sc), background: 'transparent', borderRadius: s(14, sc),
                border: `1.5px solid ${C.cardDeep}`, color: C.sec, fontFamily: 'DM Sans, sans-serif',
                fontSize: s(14, sc), cursor: 'pointer',
              }}>← Back</button>
            )}
            <button onClick={() => setStep(step + 1)} style={{
              flex: 2, height: s(50, sc), background: C.btn, borderRadius: s(14, sc),
              border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif',
              fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer',
              boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.35)`,
            }}>Next →</button>
          </div>
        </>
      ) : (
        /* ── Permissions step ── */
        <>
          <div style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase', marginBottom: s(8, sc) }}>Getting started</div>
          <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(24, sc), fontWeight: 300, color: C.text, marginBottom: s(6, sc), lineHeight: 1.25 }}>Establish your rhythm.</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), fontWeight: 300, color: C.sec, marginBottom: s(20, sc), lineHeight: 1.5 }}>These signals help NADI learn your personal energy baseline over the first 7 days.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: s(10, sc), marginBottom: s(14, sc) }}>
            {permissions.map((card, i) => (
              <div key={card.title} onClick={() => toggle(i)} style={{
                background: C.card, borderRadius: s(16, sc), padding: s(14, sc),
                border: granted[i] ? `1px solid ${card.accent}` : `1px solid ${C.cardDeep}`,
                boxShadow: granted[i] ? `0 0 0 ${s(2, sc)}px ${card.accent}28` : 'none',
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(12, sc), cursor: 'pointer',
              }}>
                <div style={{
                  width: s(44, sc), height: s(44, sc), borderRadius: s(12, sc),
                  background: `${card.accent}33`, border: `1.5px solid ${card.accent}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s(18, sc), flexShrink: 0,
                }}>{card.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: s(13, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', marginBottom: s(2, sc) }}>{card.title}</div>
                  <div style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif' }}>{card.desc}</div>
                </div>
                <div style={{
                  width: s(24, sc), height: s(24, sc), borderRadius: s(7, sc),
                  background: granted[i] ? card.accent : 'transparent',
                  border: `1.5px solid ${granted[i] ? card.accent : C.cardDeep}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: s(12, sc), color: '#fff',
                }}>{granted[i] ? '✓' : ''}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(212,168,71,0.08)', borderRadius: s(12, sc),
            border: `1px solid rgba(212,168,71,0.22)`, padding: `${s(10, sc)}px ${s(12, sc)}px`,
            marginBottom: s(20, sc), fontSize: s(10.5, sc), color: C.sec,
            fontWeight: 300, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif',
          }}>🔒 All processing happens on device. NADI never sells or shares your data.</div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: s(10, sc) }}>
            <button onClick={() => setStep(step - 1)} style={{
              flex: 1, height: s(50, sc), background: 'transparent', borderRadius: s(14, sc),
              border: `1.5px solid ${C.cardDeep}`, color: C.sec, fontFamily: 'DM Sans, sans-serif',
              fontSize: s(14, sc), cursor: 'pointer',
            }}>← Back</button>
            <button onClick={() => onNav('wristband')} style={{
              flex: 2, height: s(50, sc), background: C.btn, borderRadius: s(14, sc),
              border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif',
              fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer',
              boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.35)`,
            }}>Allow &amp; Continue →</button>
          </div>
        </>
      )}
    </div>
  );
}
// ─── Braided Band SVG ─────────────────────────────────────────────────────────
function BraidedBand({ sc, strapColor = '#C9B8A0', state = 'neutral' }: { sc: number; strapColor?: string; state?: 'warm' | 'cool' | 'neutral' }) {
  const coreGrad = state === 'warm'
    ? [['0%','#ECC870'],['60%','#C4722A'],['100%','#8A4E1A']]
    : state === 'cool'
    ? [['0%','#E4D8C4'],['60%','#A89880'],['100%','#6A5030']]
    : [['0%','#C8A870'],['60%','#A08050'],['100%','#6A5030']];
  const ringColor = state === 'warm' ? '#C4722A' : state === 'cool' ? '#A89880' : '#A08050';
  const strandOpacity = state === 'cool' ? 0.6 : state === 'neutral' ? 0.8 : 1;
  const breatheDur = state === 'warm' ? '1.8s' : state === 'cool' ? '4s' : '2.8s';
  const breatheDelay = state === 'warm' ? '-0.9s' : state === 'cool' ? '-2s' : '-1.4s';
  const id = `bb-${state}-${strapColor.replace('#','')}`;
  const w = s(280, sc), h = s(66, sc);
  return (
    <svg width={w} height={h} viewBox="0 0 280 66" style={{ overflow: 'visible' }}>
      <defs>
        <style>{`
          @keyframes bandBreathe {
            0%,100% { transform: scale(1); opacity: 0.72; }
            50% { transform: scale(1.13); opacity: 1; }
          }
          .bb-ring-${state} { animation: bandBreathe ${breatheDur} ease-in-out infinite; transform-origin: 140px 33px; animation-delay: ${breatheDelay}; }
          .bb-core-${state} { animation: bandBreathe ${breatheDur} ease-in-out infinite; transform-origin: 140px 33px; }
        `}</style>
        <clipPath id={`clip-${id}`}><rect x="11" y="5" width="258" height="56" rx="28"/></clipPath>
        <linearGradient id={`strap-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={strapColor} stopOpacity="0"/>
          <stop offset="22%" stopColor={strapColor}/>
          <stop offset="78%" stopColor={strapColor}/>
          <stop offset="100%" stopColor={strapColor} stopOpacity="0"/>
        </linearGradient>
        <radialGradient id={`core-${id}`} cx="50%" cy="50%" r="50%">
          {coreGrad.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color}/>)}
        </radialGradient>
      </defs>

      {/* Strap base — exact brand shape */}
      <rect x="11" y="5" width="258" height="56" rx="28" fill={`url(#strap-${id})`} stroke="#A89880" strokeWidth="0.5"/>

      {/* Woven braid — three interlocking strands matching brand HTML exactly */}
      <g clipPath={`url(#clip-${id})`}>
        {/* Shadow depth strand 1 */}
        <path d="M11,33 Q55,17 99,33 Q143,49 187,33 Q220,19 269,33" fill="none" stroke="#8A4E1A" strokeWidth="13" strokeOpacity={0.5 * strandOpacity}/>
        {/* Terracotta strand 1 */}
        <path d="M11,33 Q55,17 99,33 Q143,49 187,33 Q220,19 269,33" fill="none" stroke="#C4722A" strokeWidth="8" strokeOpacity={strandOpacity}/>
        {/* Shadow depth strand 2 */}
        <path d="M11,33 Q55,49 99,33 Q143,17 187,33 Q220,47 269,33" fill="none" stroke="#9A7828" strokeWidth="14" strokeOpacity={0.5 * strandOpacity}/>
        {/* Gold strand 2 */}
        <path d="M11,33 Q55,49 99,33 Q143,17 187,33 Q220,47 269,33" fill="none" stroke="#D4A847" strokeWidth="9" strokeOpacity={strandOpacity}/>
        {/* Stone centre strand */}
        <path d="M11,27 Q55,33 99,27 Q143,21 187,27 Q220,31 269,27" fill="none" stroke="#A89880" strokeWidth="7" strokeOpacity={0.8 * strandOpacity}/>
      </g>

      {/* Left clasp */}
      <rect x="8" y="14" width="13" height="34" rx="2.5" fill="#3E3018" stroke="#6A5030" strokeWidth="0.8"/>
      <circle cx="14.5" cy="23" r="1.6" fill="#6A5030"/>
      <circle cx="14.5" cy="31" r="1.6" fill="#6A5030"/>
      <circle cx="14.5" cy="39" r="1.6" fill="#6A5030"/>

      {/* Right clasp */}
      <rect x="259" y="14" width="13" height="34" rx="2.5" fill="#3E3018" stroke="#6A5030" strokeWidth="0.8"/>
      <circle cx="265.5" cy="23" r="1.6" fill="#6A5030"/>
      <circle cx="265.5" cy="31" r="1.6" fill="#6A5030"/>
      <circle cx="265.5" cy="39" r="1.6" fill="#6A5030"/>

      {/* The Seat — outer bezel */}
      <ellipse cx="140" cy="33" rx="22" ry="17" fill="#2E2010" stroke="#6A5030" strokeWidth="1.5"/>
      {/* Inner recess */}
      <ellipse cx="140" cy="33" rx="15" ry="12" fill="#1E1508" stroke="#8A4E1A" strokeWidth="0.8"/>
      {/* Breathing ring */}
      <circle cx="140" cy="33" r="15" fill={ringColor} fillOpacity="0.18" className={`bb-ring-${state}`}/>
      {/* Glowing core */}
      <circle cx="140" cy="33" r="10" fill={`url(#core-${id})`} className={`bb-core-${state}`}/>
      {/* Specular highlight */}
      <ellipse cx="136" cy="28.5" rx="3.5" ry="2" fill="white" fillOpacity={state === 'cool' ? 0.14 : state === 'warm' ? 0.32 : 0.22}/>

      {/* Capture button */}
      <rect x="162" y="27" width="10" height="12" rx="2.5" fill="#3E3018" stroke="#A08050" strokeWidth="0.7"/>
      <circle cx="167" cy="33" r="3" fill="#8A4E1A" fillOpacity="0.75"/>
    </svg>
  );
}

// ─── Screen 04 - Wristband ────────────────────────────────────────────────────
function WristbandScreen({ onNav, sc }: ScreenProps) {
  const [selectedColour, setSelectedColour] = useState(0);
  const [selectedState, setSelectedState] = useState<'warm'|'cool'|'neutral'>('neutral');

  const colours = [
    { name: 'Warm Stone', personality: 'The quiet one.', hex: '#C9B8A0', desc: "Blends into any outfit. Wear it and forget it's there." },
    { name: 'Warm Charcoal', personality: 'The composed one.', hex: '#2A2018', desc: 'Makes the amber channels glow by contrast.' },
    { name: 'Natural Sand', personality: 'The open one.', hex: '#E0CBA8', desc: 'Sits closest to skin — grows from the wrist.' },
  ];

  const states = [
    { key: 'warm' as const, color: '#C4722A', label: 'Warm', temp: '37–38°C' },
    { key: 'neutral' as const, color: '#A08050', label: 'Neutral', temp: '34–35°C' },
    { key: 'cool' as const, color: '#A89880', label: 'Cooling', temp: '30–32°C' },
  ];

  return (
    <div style={{
      height: '100%', background: C.bg, display: 'flex', flexDirection: 'column',
      padding: `${s(52, sc)}px 0 ${s(84, sc)}px`, overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
        <div style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase', marginBottom: s(5, sc) }}>Configure Your Band</div>
        <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(22, sc), fontWeight: 300, color: C.text, lineHeight: 1.25, marginBottom: s(5, sc) }}>Your band. Your colour.</h1>
        <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.55 }}>
          The channels are the same in every band. Confirm the colour matching your order.
        </p>
      </div>

      {/* Band live preview — full-width card */}
      <div style={{
        background: C.card, borderTop: `1px solid ${C.cardDeep}`, borderBottom: `1px solid ${C.cardDeep}`,
        padding: `${s(20, sc)}px ${s(12, sc)}px ${s(14, sc)}px`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(9, sc),
        marginBottom: s(14, sc),
      }}>
        <BraidedBand sc={sc} strapColor={colours[selectedColour].hex} state={selectedState} />
        {/* State toggles under band */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: s(5, sc) }}>
          {states.map(st => (
            <div key={st.key} onClick={() => setSelectedState(st.key)} style={{
              display: 'flex', alignItems: 'center', gap: s(4, sc),
              background: selectedState === st.key ? C.bg : 'transparent',
              border: `1px solid ${selectedState === st.key ? st.color : C.cardDeep}`,
              borderRadius: s(16, sc), padding: `${s(4, sc)}px ${s(8, sc)}px`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: st.color }} />
              <span style={{ fontSize: s(8, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, color: selectedState === st.key ? C.text : C.sec, letterSpacing: 0.5 }}>{st.label}</span>
              <span style={{ fontSize: s(7, sc), color: st.color, fontFamily: 'DM Sans, sans-serif' }}>{st.temp}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: s(8.5, sc), fontFamily: 'Josefin Sans, sans-serif', letterSpacing: s(1.5, sc), color: C.sec, fontWeight: 200 }}>
          {colours[selectedColour].name.toUpperCase()} · PREVIEW MODE
        </div>
      </div>

      {/* Colour swatches — purchase confirm style */}
      <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: s(10, sc) }}>
          <span style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase' }}>Band Colour</span>
          <span style={{ fontSize: s(8.5, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>matches your order</span>
        </div>

        {/* Swatch grid */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: s(8, sc), marginBottom: s(12, sc) }}>
          {colours.map((col, i) => (
            <div key={col.name} onClick={() => setSelectedColour(i)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(5, sc), cursor: 'pointer',
            }}>
              <div style={{
                width: '100%', height: s(52, sc), borderRadius: s(12, sc),
                background: col.hex,
                border: `${selectedColour === i ? 2 : 1}px solid ${selectedColour === i ? C.indian : 'rgba(0,0,0,0.1)'}`,
                boxShadow: selectedColour === i ? `0 0 0 ${s(3, sc)}px rgba(196,114,42,0.15)` : 'none',
                transition: 'all 0.2s',
              }} />
              <span style={{ fontSize: s(8, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: selectedColour === i ? 300 : 200, color: selectedColour === i ? C.text : C.sec, letterSpacing: 0.3, textAlign: 'center' as const, lineHeight: 1.3 }}>
                {col.name}
              </span>
              {selectedColour === i && (
                <span style={{ fontSize: s(7, sc), color: C.indian, fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1 }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Selected detail */}
        <div style={{
          background: C.card, borderRadius: s(14, sc), border: `1px solid ${C.cardDeep}`,
          padding: `${s(11, sc)}px ${s(13, sc)}px`,
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: s(11, sc),
        }}>
          <div style={{ width: s(42, sc), height: s(42, sc), borderRadius: s(10, sc), background: colours[selectedColour].hex, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: s(12, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 300, color: C.text, marginBottom: s(2, sc) }}>{colours[selectedColour].name}</div>
            <div style={{ fontSize: s(10.5, sc), fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: C.indian, marginBottom: s(3, sc) }}>{colours[selectedColour].personality}</div>
            <div style={{ fontSize: s(9.5, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{colours[selectedColour].desc}</div>
          </div>
        </div>
      </div>

      {/* Three channels strip */}
      <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
        <div style={{
          background: C.text, borderRadius: s(13, sc),
          padding: `${s(12, sc)}px ${s(14, sc)}px`,
          display: 'flex', flexDirection: 'row', gap: s(14, sc),
        }}>
          {[
            { color: '#C4722A', label: 'Drive', sub: 'Solar' },
            { color: '#D4A847', label: 'Balance', sub: 'Central' },
            { color: '#C9B8A0', label: 'Rest', sub: 'Lunar' },
          ].map(ch => (
            <div key={ch.label} style={{ flex: 1, borderTop: `2px solid ${ch.color}`, paddingTop: s(7, sc) }}>
              <div style={{ fontSize: s(10, sc), color: '#F5F0EB', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 300, marginBottom: s(1, sc) }}>{ch.label}</div>
              <div style={{ fontSize: s(8, sc), color: '#A08050', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontStyle: 'italic' }}>{ch.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: `0 ${s(20, sc)}px`, marginTop: 'auto' }}>
        <button
          onClick={() => onNav('tutorial')}
          style={{
            width: '100%', height: s(52, sc), background: C.btn, borderRadius: s(16, sc), border: 'none',
            color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(15, sc), fontWeight: 500,
            cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(196,114,42,0.35)`,
          }}
        >Confirm {colours[selectedColour].name} →</button>
        <p style={{ textAlign: 'center' as const, marginTop: s(7, sc), fontSize: s(9, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif' }}>
          You can update this in Settings at any time.
        </p>
      </div>
    </div>
  );
}

// ─── Screen 05 - Tutorial ─────────────────────────────────────────────────────
function TutorialScreen({ onNav, sc }: ScreenProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: 'Energy Channels',
      sanskrit: 'Nadi',
      desc: 'Your cognitive energy flows through three natural channels. NADI monitors all three to give you a whole picture.',
      items: [
        { color: C.idaAccent, name: 'Rest Channel', sk: 'Ida', desc: 'Recovery, calm, and inward flow' },
        { color: C.btn, name: 'Drive Channel', sk: 'Pingala', desc: 'Outward focus, action, and heat' },
        { color: C.gold, name: 'Balance Channel', sk: 'Sushumna', desc: 'Integration of both channels' },
      ],
    },
    {
      title: 'Mental Energy System',
      sanskrit: 'Prana · Tejas · Ojas',
      desc: 'Three forms of energy power your cognition. When they\'re in balance, thinking feels effortless.',
      items: [
        { color: C.prana, name: 'Input Flow', sk: 'Prana', desc: 'Vitality — how much you take in' },
        { color: C.tejas, name: 'Thinking Fuel', sk: 'Tejas', desc: 'Clarity, discernment, focus' },
        { color: C.ojas, name: 'Reserve Energy', sk: 'Ojas', desc: 'Deep resilience and stamina' },
      ],
    },
    {
      title: 'Cognitive States',
      sanskrit: 'The Five States of Mind',
      desc: 'Your mind naturally moves through five states. Knowing where you are helps you work with your energy, not against it.',
      items: [
        { color: C.btn, name: 'Scattered', sk: 'Ksipta', desc: 'Restless and distracted' },
        { color: C.sec, name: 'Dull', sk: 'Mudha', desc: 'Heavy, foggy, slow' },
        { color: C.indian, name: 'Wavering', sk: 'Viksipta', desc: 'Partially focused' },
        { color: C.gold, name: 'Absorbed', sk: 'Ekagra', desc: 'Deep, flowing attention' },
        { color: C.green, name: 'Mastered', sk: 'Niruddha', desc: 'Complete calm clarity' },
      ],
    },
  ];

  const current = pages[page];

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: `${s(52, sc)}px ${s(20, sc)}px ${s(36, sc)}px`,
      overflowY: 'auto',
    }}>
      {/* Progress bars */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: s(6, sc), marginBottom: s(28, sc) }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            onClick={() => setPage(i)}
            style={{
              flex: i === page ? 2.5 : 1,
              height: s(3, sc),
              borderRadius: s(2, sc),
              background: i === page ? C.indian : 'rgba(138,117,96,0.28)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <div style={{
        fontSize: s(11, sc),
        fontStyle: 'italic',
        color: C.indian,
        fontWeight: 400,
        letterSpacing: 0.3,
        marginBottom: s(6, sc),
        fontFamily: 'Josefin Sans, sans-serif',
      }}>{current.sanskrit}</div>

      <h1 style={{
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: s(26, sc),
        fontWeight: 300,
        color: C.text,
        marginBottom: s(10, sc),
        lineHeight: 1.25,
      }}>{current.title}</h1>

      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: s(13, sc),
        fontWeight: 300,
        color: C.sec,
        lineHeight: 1.6,
        marginBottom: s(20, sc),
      }}>{current.desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: s(8, sc), flex: 1 }}>
        {current.items.map(item => (
          <div key={item.sk} style={{
            background: C.card,
            borderRadius: s(15, sc),
            padding: s(12, sc),
            border: '1px solid rgba(138,117,96,0.11)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: s(12, sc),
          }}>
            <div style={{
              width: s(34, sc),
              height: s(34, sc),
              borderRadius: s(10, sc),
              background: `${item.color}33`,
              border: `${s(1.5, sc)}px solid ${item.color}8C`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ width: s(9, sc), height: s(9, sc), borderRadius: '50%', background: item.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: s(13, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>{item.name}</div>
              <div style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif' }}>{item.desc}</div>
            </div>
            <div style={{
              fontSize: s(10, sc),
              color: C.indian,
              fontStyle: 'italic',
              opacity: 0.75,
              fontFamily: 'Josefin Sans, sans-serif',
            }}>{item.sk}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => page < 2 ? setPage(page + 1) : onNav('home')}
        style={{
          width: '100%',
          height: s(52, sc),
          background: C.btn,
          borderRadius: s(16, sc),
          border: 'none',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(15, sc),
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(192,57,43,0.35)`,
          marginTop: s(20, sc),
        }}
      >{page < 2 ? 'Next →' : 'Begin NADI'}</button>
    </div>
  );
}

// ─── Screen 06 - Home Dashboard ───────────────────────────────────────────────
function HomeScreen({ onNav, sc }: ScreenProps) {
  const barVals = [0.68, 0.82, 0.55, 0.88, 0.48, 0.72, 0.79];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIdx = 4;

  const stateCards = [
    { label: 'Input Flow', dot: C.prana, val: 72 },
    { label: 'Thinking Fuel', dot: C.tejas, val: 61 },
    { label: 'Reserve Energy', dot: C.ojas, val: 44 },
  ];

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${s(58, sc)}px ${s(20, sc)}px ${s(10, sc)}px`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(8, sc) }}>
          <svg width={s(22, sc)} height={s(22, sc)} viewBox="0 0 120 120" fill="none">
            <rect width="120" height="120" rx="26" fill="url(#homeTile)"/>
            <path d="M60 25 C60 25 38 55 38 72 C38 85 48 95 60 95 C72 95 82 85 82 72 C82 55 60 25 60 25Z" fill="url(#homeFlame1)"/>
            <path d="M60 52 C60 52 50 66 50 74 C50 80 54 86 60 86 C66 86 70 80 70 74 C70 66 60 52 60 52Z" fill="url(#homeFlame2)"/>
            <defs>
              <linearGradient id="homeTile" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C4722A"/><stop offset="100%" stopColor="#8A4E1A"/></linearGradient>
              <radialGradient id="homeFlame1" cx="50%" cy="60%" r="50%"><stop offset="0%" stopColor="#F0C84A" stopOpacity="0.9"/><stop offset="100%" stopColor="#8A4E1A" stopOpacity="0.5"/></radialGradient>
              <radialGradient id="homeFlame2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFFBE8"/><stop offset="100%" stopColor="#D4A847" stopOpacity="0.7"/></radialGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: s(22, sc),
            fontWeight: 200,
            color: C.indian,
            letterSpacing: s(5, sc),
          }}>NADI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(10, sc) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: s(4, sc) }}>
            <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: C.green, boxShadow: `0 0 ${s(5, sc)}px ${C.green}` }} />
            <span style={{ fontSize: s(10, sc), color: C.green, fontFamily: 'DM Sans, sans-serif' }}>Band</span>
          </div>
          <div style={{
            width: s(32, sc),
            height: s(32, sc),
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.indian}, ${C.btn})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: s(13, sc),
          }}>E</div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: s(88, sc) }}>
        {/* Energy blob */}
        <div style={{ padding: `${s(12, sc)}px 0 ${s(16, sc)}px` }}>
          <EnergyBlob value={84} sc={sc} />
        </div>

        {/* State cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: s(8, sc),
          padding: `0 ${s(18, sc)}px`,
          marginBottom: s(16, sc),
        }}>
          {stateCards.map(card => (
            <div key={card.label} style={{
              flex: 1,
              background: C.card,
              borderRadius: s(14, sc),
              padding: `${s(12, sc)}px ${s(6, sc)}px`,
              textAlign: 'center',
              border: '1px solid rgba(138,117,96,0.11)',
            }}>
              <div style={{
                width: s(8, sc),
                height: s(8, sc),
                borderRadius: '50%',
                background: card.dot,
                boxShadow: `0 0 ${s(6, sc)}px ${card.dot}`,
                margin: `0 auto ${s(5, sc)}px`,
              }} />
              <div style={{
                fontSize: s(17, sc),
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: 300,
                color: C.text,
              }}>{card.val}</div>
              <div style={{
                fontSize: s(9, sc),
                color: C.sec,
                fontWeight: 300,
                lineHeight: 1.35,
                fontFamily: 'DM Sans, sans-serif',
              }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Insight card */}
        <div style={{
          margin: `0 ${s(18, sc)}px ${s(16, sc)}px`,
          background: C.card,
          borderRadius: s(18, sc),
          padding: s(15, sc),
          border: '1px solid rgba(212,168,71,0.28)',
          boxShadow: `0 ${s(2, sc)}px ${s(12, sc)}px rgba(212,168,71,0.12)`,
        }}>
          <div style={{
            fontSize: s(10, sc),
            color: C.gold,
            fontWeight: 500,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            marginBottom: s(6, sc),
            fontFamily: 'DM Sans, sans-serif',
          }}>Insight</div>
          <p style={{
            fontSize: s(13, sc),
            color: C.text,
            lineHeight: 1.55,
            fontWeight: 400,
            fontFamily: 'DM Sans, sans-serif',
            marginBottom: s(10, sc),
          }}>Your thinking fuel has been dropping since 2pm. You have a 45 minute window at 4pm for focused work.</p>
          <button
            onClick={() => onNav('restore')}
            style={{
              background: C.green,
              borderRadius: s(10, sc),
              border: 'none',
              color: '#fff',
              fontSize: s(12, sc),
              fontWeight: 500,
              padding: `${s(7, sc)}px ${s(14, sc)}px`,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >Restore now</button>
        </div>

        {/* Weekly energy chart */}
        <div style={{
          margin: `0 ${s(18, sc)}px ${s(20, sc)}px`,
          background: C.card,
          borderRadius: s(18, sc),
          padding: s(15, sc),
          border: '1px solid rgba(138,117,96,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s(12, sc) }}>
            <span style={{ fontSize: s(12, sc), color: C.text, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>Weekly Energy</span>
            <span style={{ fontSize: s(10, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif' }}>This week</span>
          </div>
          <div style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent calc(100%/5 - 1px), rgba(138,117,96,0.055) calc(100%/5 - 1px), rgba(138,117,96,0.055) calc(100%/5))',
            borderRadius: s(8, sc),
            height: s(80, sc),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: s(6, sc),
            padding: `${s(8, sc)}px ${s(2, sc)}px`,
          }}>
            {barVals.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', width: '72%', height: '100%' }}>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'rgba(138,117,96,0.09)',
                    borderRadius: `${s(3, sc)}px ${s(3, sc)}px 0 0`,
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${val * 100}%`,
                    background: i === todayIdx
                      ? `linear-gradient(to top, ${C.btn}, ${C.gold})`
                      : `linear-gradient(to top, rgba(192,57,43,0.45), rgba(196,114,42,0.65))`,
                    borderRadius: `${s(3, sc)}px ${s(3, sc)}px 0 0`,
                    boxShadow: i === todayIdx ? `0 0 ${s(8, sc)}px rgba(192,57,43,0.4)` : 'none',
                    zIndex: 1,
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: s(6, sc), gap: s(6, sc), padding: `0 ${s(2, sc)}px` }}>
            {days.map((d, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: 'center',
                fontSize: s(9, sc),
                fontWeight: i === todayIdx ? 600 : 400,
                color: i === todayIdx ? C.indian : 'rgba(138,117,96,0.7)',
                fontFamily: 'DM Sans, sans-serif',
              }}>{d}</div>
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
  const [recording, setRecording] = useState(false);
  const waveHeights = [6, 10, 16, 12, 18, 14, 8, 12, 16, 10];

  const handlePress = () => {
    if (recording) {
      setRecording(false);
      onNav('captured');
    } else {
      setRecording(true);
    }
  };

  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(ellipse at 50% 50%, rgba(192,57,43,0.07) 0%, ${C.bg} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${s(58, sc)}px ${s(20, sc)}px ${s(10, sc)}px`,
        flexShrink: 0,
      }}>
        <button
          onClick={() => onNav('home')}
          style={{
            background: 'none',
            border: 'none',
            color: C.sec,
            fontSize: s(13, sc),
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >Cancel</button>
        <span style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: s(15, sc),
          fontWeight: 500,
          color: C.text,
        }}>Speak</span>
        <div style={{ width: s(50, sc) }} />
      </div>

      {/* Center */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s(44, sc),
        paddingBottom: s(84, sc),
      }}>
        {/* Recording button */}
        <div style={{ width: s(220, sc), height: s(220, sc), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ripple rings (only when recording) */}
          {recording && [0, 0.5, 1].map((delay, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: s(104, sc),
              height: s(104, sc),
              borderRadius: '50%',
              border: `${s(1.5, sc)}px solid rgba(192,57,43,${0.45 - i * 0.12})`,
              animation: `rippleOut 2.2s ease-out ${delay}s infinite`,
            }} />
          ))}
          {/* Main button */}
          <div
            onClick={handlePress}
            style={{
              width: s(104, sc),
              height: s(104, sc),
              borderRadius: '50%',
              background: recording
                ? `radial-gradient(circle at 40% 40%, ${C.pingalaGlow}, ${C.btn})`
                : `radial-gradient(circle at 40% 40%, rgba(192,57,43,0.18), rgba(192,57,43,0.06))`,
              border: `2px solid ${recording ? C.btn : 'rgba(192,57,43,0.5)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              animation: recording ? 'glowPulse 4s ease-in-out infinite' : 'none',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {recording
              ? <div style={{ width: s(28, sc), height: s(28, sc), borderRadius: s(6, sc), background: '#fff' }} />
              : <div style={{ width: s(36, sc), height: s(36, sc), borderRadius: '50%', background: C.btn }} />
            }
          </div>
        </div>

        {/* Instruction text */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(8, sc) }}>
          <p style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: s(17, sc),
            fontStyle: 'italic',
            fontWeight: 500,
            color: C.text,
          }}>{recording ? 'Listening...' : 'Say anything on your mind.'}</p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: s(13, sc),
            fontWeight: 300,
            color: C.sec,
          }}>{recording ? 'Tap to stop recording.' : 'Tasks, ideas, worries, or questions.'}</p>

          {/* Waveform */}
          {recording && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: s(6, sc), alignItems: 'center', marginTop: s(8, sc) }}>
              {waveHeights.map((h, i) => (
                <div key={i} style={{
                  width: s(3, sc),
                  height: s(h, sc),
                  background: C.btn,
                  borderRadius: s(2, sc),
                  opacity: 0.5 + (i % 3) * 0.18,
                }} />
              ))}
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
  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(ellipse at 50% 45%, rgba(74,124,89,0.1) 0%, ${C.bg} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${s(36, sc)}px`,
      gap: s(20, sc),
    }}>
      {/* Checkmark */}
      <div style={{
        width: s(84, sc),
        height: s(84, sc),
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 40%, rgba(74,124,89,0.22), rgba(74,124,89,0.06))',
        border: `2px solid rgba(74,124,89,0.45)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: s(32, sc),
        boxShadow: `0 0 ${s(30, sc)}px rgba(74,124,89,0.25)`,
      }}>✓</div>

      <h1 style={{
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: s(32, sc),
        fontWeight: 300,
        color: C.text,
        textAlign: 'center',
      }}>Captured.</h1>

      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: s(14, sc),
        fontWeight: 300,
        color: C.sec,
        textAlign: 'center',
        lineHeight: 1.65,
        maxWidth: s(270, sc),
      }}>Your voice note is saved. Head to the <span style={{ color: C.indian, fontWeight: 500 }}>Revisit tab</span> to find all your captured thoughts when your energy is ready.</p>

      {/* Auto-categorized card */}
      <div style={{
        background: C.card,
        borderRadius: s(18, sc),
        padding: s(16, sc),
        width: '100%',
        border: '1px solid rgba(74,124,89,0.22)',
      }}>
        <div style={{
          fontSize: s(10, sc),
          color: C.green,
          fontWeight: 500,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          marginBottom: s(10, sc),
          fontFamily: 'DM Sans, sans-serif',
        }}>Auto-categorized</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: s(7, sc) }}>
          {['Task', 'Est. 20 min', 'Best at: 4pm window'].map(tag => (
            <div key={tag} style={{
              padding: `${s(5, sc)}px ${s(11, sc)}px`,
              background: 'rgba(74,124,89,0.1)',
              border: '1px solid rgba(74,124,89,0.3)',
              borderRadius: s(20, sc),
              fontSize: s(11, sc),
              color: C.green,
              fontWeight: 400,
              fontFamily: 'DM Sans, sans-serif',
            }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* Suggested window card */}
      <div style={{
        background: C.card,
        borderRadius: s(16, sc),
        padding: s(14, sc),
        width: '100%',
        border: '1px solid rgba(212,168,71,0.2)',
      }}>
        <div style={{
          fontSize: s(10, sc),
          color: C.gold,
          fontWeight: 500,
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: s(6, sc),
          fontFamily: 'DM Sans, sans-serif',
        }}>Suggested window</div>
        <div style={{ fontSize: s(13, sc), color: C.text, fontWeight: 400, fontFamily: 'DM Sans, sans-serif' }}>
          4:00 PM today — 45 min free, high focus predicted
        </div>
      </div>

      <button
        onClick={() => onNav('home')}
        style={{
          width: '100%',
          height: s(52, sc),
          background: C.btn,
          borderRadius: s(16, sc),
          border: 'none',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(15, sc),
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(192,57,43,0.35)`,
        }}
      >Done</button>
    </div>
  );
}

// ─── Screen 09 - Revisit ──────────────────────────────────────────────────────
function RevisitScreen({ onNav, sc }: ScreenProps) {
  const thoughts = [
    {
      type: 'Business Idea',
      text: 'Launch a micro-SaaS for habit tracking tailored to wellness brands — lightweight, beautiful UI',
      color: C.gold,
      time: '2h ago',
      hint: 'High energy match — explore now?',
    },
    {
      type: 'Future Thought',
      text: 'Consider relocating to a smaller city in 3 years — better pace, lower overhead, closer to nature',
      color: C.idaAccent,
      time: 'Yesterday',
      hint: 'Park for reflection this weekend?',
    },
    {
      type: 'Skill to Improve',
      text: 'Go deep on Figma auto-layout and component properties this month — block 2h sessions',
      color: C.pingalaOrange,
      time: '2 days ago',
      hint: 'Schedule a learning block?',
    },
    {
      type: 'Article to Read',
      text: 'The Prana–Dopamine connection: ancient energy models meeting modern neuroscience — saved for weekend',
      color: C.green,
      time: '3 days ago',
      hint: 'Low energy? Perfect for reading.',
    },
  ];

  const timeSlots = [
    { time: '2:00 PM', label: 'Team meeting', color: C.btn },
    { time: '3:15 PM', label: 'Free window', color: C.green },
    { time: '4:00 PM', label: '⚡ High focus window', color: C.gold },
  ];

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        padding: `${s(54, sc)}px ${s(20, sc)}px ${s(12, sc)}px`,
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: s(26, sc),
          fontWeight: 300,
          color: C.text,
          marginBottom: s(4, sc),
        }}>Revisit</h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(13, sc),
          fontWeight: 300,
          color: C.sec,
        }}>Your captured thoughts, ready when you are.</p>
      </div>

      {/* Scrollable area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: `0 ${s(16, sc)}px`, paddingBottom: s(88, sc) }}>
        {/* Calendar strip */}
        <div style={{
          background: C.card,
          borderRadius: s(16, sc),
          padding: s(13, sc),
          border: '1px solid rgba(138,117,96,0.11)',
          marginBottom: s(16, sc),
        }}>
          <div style={{
            fontSize: s(10, sc),
            color: C.sec,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            marginBottom: s(10, sc),
            fontFamily: 'DM Sans, sans-serif',
          }}>Today's windows</div>
          {timeSlots.map((slot, i) => (
            <div key={slot.time} style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: s(10, sc),
              marginBottom: i < timeSlots.length - 1 ? s(8, sc) : 0,
            }}>
              <div style={{
                width: s(3, sc),
                height: s(22, sc),
                borderRadius: s(2, sc),
                background: slot.color,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: s(10, sc),
                color: C.sec,
                fontWeight: 300,
                fontFamily: 'DM Sans, sans-serif',
                width: s(40, sc),
                flexShrink: 0,
              }}>{slot.time}</span>
              <span style={{
                fontSize: s(12, sc),
                color: C.text,
                fontWeight: 400,
                fontFamily: 'DM Sans, sans-serif',
              }}>{slot.label}</span>
            </div>
          ))}
        </div>

        {/* Thought cards */}
        {thoughts.map((thought) => (
          <div key={thought.type} style={{
            background: C.card,
            borderRadius: s(16, sc),
            padding: `${s(13, sc)}px ${s(14, sc)}px`,
            marginBottom: s(10, sc),
            border: '1px solid rgba(138,117,96,0.1)',
            boxShadow: `0 ${s(1, sc)}px ${s(6, sc)}px rgba(61,26,14,0.04)`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s(6, sc) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                <div style={{
                  width: s(7, sc),
                  height: s(7, sc),
                  borderRadius: '50%',
                  background: thought.color,
                  boxShadow: `0 0 ${s(5, sc)}px ${thought.color}`,
                }} />
                <span style={{
                  fontSize: s(9, sc),
                  color: thought.color,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontFamily: 'DM Sans, sans-serif',
                }}>{thought.type}</span>
              </div>
              <span style={{
                fontSize: s(9, sc),
                color: 'rgba(138,117,96,0.7)',
                fontWeight: 300,
                fontFamily: 'DM Sans, sans-serif',
              }}>{thought.time}</span>
            </div>
            <p style={{
              fontSize: s(12, sc),
              color: C.text,
              lineHeight: 1.5,
              marginBottom: s(6, sc),
              fontFamily: 'DM Sans, sans-serif',
            }}>{thought.text}</p>
            <p style={{
              fontSize: s(11, sc),
              color: C.sec,
              fontStyle: 'italic',
              fontWeight: 300,
              marginBottom: s(10, sc),
              fontFamily: 'DM Sans, sans-serif',
            }}>{thought.hint}</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: s(6, sc) }}>
              {[
                { label: 'Work now', bg: `rgba(192,57,43,0.07)`, border: C.btn, color: C.btn },
                { label: 'Park later', bg: 'transparent', border: C.sec, color: C.sec },
                { label: 'Delete', bg: 'transparent', border: 'rgba(192,57,43,0.18)', color: 'rgba(192,57,43,0.65)' },
              ].map(btn => (
                <button key={btn.label} style={{
                  flex: 1,
                  height: s(28, sc),
                  background: btn.bg,
                  border: `1px solid ${btn.border}`,
                  borderRadius: s(8, sc),
                  color: btn.color,
                  fontSize: s(10, sc),
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                }}>{btn.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="revisit" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 10 - Restore ──────────────────────────────────────────────────────
function RestoreScreen({ onNav, sc }: ScreenProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [started, setStarted] = useState<string | null>(null);

  // Evelyn's current channel state — Drive overloaded, Rest nearly empty
  const channels = [
    { key: 'drive',   label: 'Drive',   color: '#C4722A', pct: 84, sub: 'Overactive',  icon: '↑' },
    { key: 'balance', label: 'Balance', color: '#D4A847', pct: 41, sub: 'Slipping',    icon: '~' },
    { key: 'rest',    label: 'Rest',    color: '#C9B8A0', pct: 18, sub: 'Depleted',    icon: '↓' },
  ];

  // Personalized suggestions — each tied to Evelyn's specific channel imbalance
  const suggestions = [
    {
      id: 'hands',
      label: 'Make something with your hands',
      why: 'Your Drive channel is locked in output mode. Manual work — folding, drawing, cooking — shifts processing to the motor cortex and lets the prefrontal cortex go quiet.',
      duration: '15 – 30 min',
      channel: 'drive',
      channelLabel: 'Quiets Drive',
      icon: '✦',
      color: '#C4722A',
    },
    {
      id: 'walk',
      label: 'No-agenda walk. No destination.',
      why: "Walking without purpose is one of the few activities that restores Ojas without demanding Tejas. Don't listen to anything. Let your eyes go soft.",
      duration: '10 – 20 min',
      channel: 'rest',
      channelLabel: 'Rebuilds Rest',
      icon: '⟶',
      color: '#C9B8A0',
    },
    {
      id: 'eyes',
      label: 'Lie down. Eyes open or closed.',
      why: 'Not sleep — deliberate non-doing. Your nervous system needs permission to stop processing. Even 8 minutes of horizontal stillness measurably lowers cortical load.',
      duration: '8 – 15 min',
      channel: 'balance',
      channelLabel: 'Restores Balance',
      icon: '◦',
      color: '#D4A847',
    },
    {
      id: 'sound',
      label: 'Put on one album. Do nothing else.',
      why: 'Passive listening — no multitasking — activates the default mode network, which processes and consolidates. Your captured thoughts need this quiet to settle.',
      duration: '1 album',
      channel: 'rest',
      channelLabel: 'Rebuilds Rest',
      icon: '♩',
      color: '#C9B8A0',
    },
    {
      id: 'water',
      label: 'Slow shower or bath. No timer.',
      why: 'Warm water lowers peripheral vascular resistance — the same physiological pathway NADI uses to warm your band when you are balanced. You can do it for yourself.',
      duration: '20 min',
      channel: 'balance',
      channelLabel: 'Restores Balance',
      icon: '〰',
      color: '#D4A847',
    },
    {
      id: 'fiction',
      label: 'Read fiction. A story, not news.',
      why: "Fiction requires imaginative absorption — not analytical processing. It rebuilds your capacity for sustained attention without charging the Drive channel further.",
      duration: '20 – 40 min',
      channel: 'drive',
      channelLabel: 'Quiets Drive',
      icon: '□',
      color: '#C4722A',
    },
  ];

  const activeS = suggestions.find(s => s.id === activeCard);

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Detail drawer */}
      {activeCard && activeS && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(30,21,8,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }} onClick={() => { setActiveCard(null); }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.bg, borderRadius: `${s(22, sc)}px ${s(22, sc)}px 0 0`,
            padding: `${s(18, sc)}px ${s(20, sc)}px ${s(40, sc)}px`,
            display: 'flex', flexDirection: 'column', gap: s(14, sc),
          }}>
            {/* Handle */}
            <div style={{ width: s(36, sc), height: s(4, sc), borderRadius: s(2, sc), background: C.cardDeep, margin: '0 auto' }} />

            {/* Header */}
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

            {/* Why NADI recommends this */}
            <div style={{ background: C.card, borderRadius: s(14, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(8.5, sc), letterSpacing: 2, color: activeS.color, marginBottom: s(7, sc), textTransform: 'uppercase' as const }}>Why NADI is suggesting this for you</div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.7, fontWeight: 300 }}>{activeS.why}</p>
            </div>

            {/* Start / Done */}
            {started === activeS.id ? (
              <div style={{ textAlign: 'center' as const, padding: `${s(6, sc)}px 0` }}>
                <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(14, sc), color: C.text, lineHeight: 1.6, marginBottom: s(12, sc) }}>
                  Good. NADI will keep sensing.<br/>Your band will tell you when you've shifted.
                </div>
                <button onClick={() => { setStarted(null); setActiveCard(null); }} style={{ background: 'transparent', border: `1px solid ${C.cardDeep}`, borderRadius: s(12, sc), padding: `${s(10, sc)}px ${s(20, sc)}px`, color: C.sec, fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <button onClick={() => setStarted(activeS.id)} style={{
                width: '100%', height: s(50, sc), background: C.btn, borderRadius: s(14, sc), border: 'none',
                color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500,
                cursor: 'pointer', boxShadow: `0 ${s(4, sc)}px ${s(14, sc)}px rgba(196,114,42,0.3)`,
              }}>Begin — {activeS.duration}</button>
            )}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: s(90, sc) }}>

        {/* Header */}
        <div style={{ padding: `${s(54, sc)}px ${s(20, sc)}px ${s(10, sc)}px` }}>
          <div style={{ fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200, textTransform: 'uppercase' as const, marginBottom: s(5, sc) }}>Recovery Mode</div>
          <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(26, sc), fontWeight: 300, color: C.text, marginBottom: s(5, sc) }}>Restore</h1>
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(13, sc), color: C.sec, lineHeight: 1.6 }}>
            Evelyn, your Drive has been running hard since 10am.<br/>Rest is not recovery — it is the rebuild.
          </p>
        </div>

        {/* ── Channel Infographic ── */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(16, sc) }}>
          <div style={{ background: C.text, borderRadius: s(18, sc), padding: `${s(16, sc)}px ${s(16, sc)}px ${s(14, sc)}px` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: s(12, sc) }}>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(9, sc), letterSpacing: 2, color: '#A08050', textTransform: 'uppercase' as const }}>Your Channels Right Now</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(9, sc), color: '#6A5030' }}>3:42 PM</span>
            </div>

            {/* Channel bars */}
            {channels.map(ch => (
              <div key={ch.key} style={{ marginBottom: s(10, sc) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: s(4, sc) }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                    <span style={{ fontSize: s(9, sc), color: ch.color, fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1 }}>{ch.icon}</span>
                    <span style={{ fontSize: s(11, sc), color: '#DDD0BC', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 300 }}>{ch.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
                    <span style={{ fontSize: s(9, sc), color: ch.color, fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>{ch.sub}</span>
                    <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color: ch.color }}>{ch.pct}%</span>
                  </div>
                </div>
                {/* Bar track */}
                <div style={{ height: s(6, sc), background: '#2E2010', borderRadius: s(3, sc), overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${ch.pct}%`,
                    background: `linear-gradient(to right, ${ch.color}88, ${ch.color})`,
                    borderRadius: s(3, sc),
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            ))}

            {/* Mini SVG — today's energy curve */}
            <div style={{ marginTop: s(10, sc), borderTop: '1px solid #2E2010', paddingTop: s(10, sc) }}>
              <div style={{ fontSize: s(8, sc), color: '#6A5030', fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1, marginBottom: s(6, sc) }}>TODAY'S DRIVE CHANNEL</div>
              <svg width="100%" height={s(44, sc)} viewBox="0 0 280 44" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="driveArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4722A" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#C4722A" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path d="M0,40 L0,32 Q20,28 40,24 Q60,18 80,14 Q100,10 120,9 Q140,8 160,10 Q180,12 200,16 Q220,20 240,22 Q260,24 280,22 L280,40 Z" fill="url(#driveArea)"/>
                {/* Line */}
                <path d="M0,32 Q20,28 40,24 Q60,18 80,14 Q100,10 120,9 Q140,8 160,10 Q180,12 200,16 Q220,20 240,22 Q260,24 280,22" fill="none" stroke="#C4722A" strokeWidth="1.8" strokeOpacity="0.9"/>
                {/* Now marker */}
                <line x1="200" y1="4" x2="200" y2="40" stroke="#D4A847" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6"/>
                <circle cx="200" cy="16" r="3" fill="#D4A847" fillOpacity="0.9"/>
                {/* Time labels */}
                <text x="4" y="43" fontFamily="Josefin Sans, sans-serif" fontSize="7" fill="#6A5030">8am</text>
                <text x="94" y="43" fontFamily="Josefin Sans, sans-serif" fontSize="7" fill="#6A5030">12pm</text>
                <text x="193" y="43" fontFamily="Josefin Sans, sans-serif" fontSize="7" fill="#D4A847">now</text>
                <text x="262" y="43" fontFamily="Josefin Sans, sans-serif" fontSize="7" fill="#6A5030">8pm</text>
              </svg>
            </div>

            {/* Recovery estimate */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: s(8, sc), background: '#2E2010', borderRadius: s(9, sc), padding: `${s(7, sc)}px ${s(10, sc)}px` }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10, sc), color: '#A08050', fontWeight: 300 }}>Estimated recovery window</span>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), color: '#D4A847', fontWeight: 300 }}>45 – 90 min of true rest</span>
            </div>
          </div>
        </div>

        {/* ── Personalized suggestions ── */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: s(10, sc) }}>
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(9, sc), letterSpacing: s(3, sc), color: C.sec, textTransform: 'uppercase' as const, fontWeight: 200 }}>Suggested for Evelyn now</span>
            <span style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(10, sc), color: C.sec }}>tap to see why</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: s(10, sc) }}>
            {suggestions.map(sug => (
              <div key={sug.id} onClick={() => setActiveCard(sug.id)} style={{
                background: started === sug.id ? `${sug.color}10` : C.card,
                borderRadius: s(17, sc),
                padding: `${s(14, sc)}px ${s(12, sc)}px`,
                border: `1px solid ${started === sug.id ? sug.color + '40' : C.cardDeep}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative' as const,
              }}>
                {started === sug.id && (
                  <div style={{ position: 'absolute' as const, top: s(8, sc), right: s(10, sc), fontSize: s(9, sc), color: sug.color, fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 1 }}>IN PROGRESS</div>
                )}
                {/* Icon in brand style */}
                <div style={{ width: s(32, sc), height: s(32, sc), borderRadius: s(9, sc), background: `${sug.color}14`, border: `1px solid ${sug.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: s(8, sc) }}>
                  <span style={{ fontSize: s(14, sc), color: sug.color }}>{sug.icon}</span>
                </div>
                <div style={{ fontSize: s(12, sc), color: C.text, fontFamily: 'DM Sans, sans-serif', fontWeight: 500, lineHeight: 1.3, marginBottom: s(4, sc) }}>{sug.label}</div>
                <div style={{ fontSize: s(9, sc), color: sug.color, fontFamily: 'Josefin Sans, sans-serif', letterSpacing: 0.5, marginBottom: s(2, sc) }}>{sug.channelLabel}</div>
                <div style={{ fontSize: s(9, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{sug.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What your body is telling you ── */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(14, sc) }}>
          <div style={{ background: C.card, borderRadius: s(16, sc), border: `1px solid ${C.cardDeep}`, padding: `${s(14, sc)}px ${s(15, sc)}px` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(9, sc), letterSpacing: 2, color: C.indian, marginBottom: s(10, sc), textTransform: 'uppercase' as const }}>What NADI is reading</div>
            {[
              { label: 'Skin temp', val: '30.4°C', note: 'Cooling — Rest channel fading', color: '#C9B8A0' },
              { label: 'Conductance', val: 'Elevated', note: 'Sustained cognitive arousal', color: '#C4722A' },
              { label: 'HRV trend', val: '↓ 18%', note: 'Below your personal baseline', color: '#D4A847' },
            ].map(({ label, val, note, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: s(8, sc), paddingBottom: s(8, sc), borderBottom: `1px solid ${C.cardDeep}` }}>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), color: C.sec, fontWeight: 300, marginBottom: s(2, sc) }}>{label}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(10, sc), color: C.sec, fontWeight: 300, fontStyle: 'italic', opacity: 0.7 }}>{note}</div>
                </div>
                <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(13, sc), color, fontWeight: 300 }}>{val}</span>
              </div>
            ))}
            <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.65, marginTop: s(4, sc) }}>
              Your body has been in output mode for 5 hours and 14 minutes. This is not a warning — it is information. What you do with it is yours.
            </p>
          </div>
        </div>

        {/* ── 72-Hour Protocol ── */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(16, sc) }}>
          <div style={{ background: 'rgba(154,78,24,0.06)', borderRadius: s(14, sc), padding: `${s(13, sc)}px ${s(15, sc)}px`, border: '1px solid rgba(154,78,24,0.18)' }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 1.5, color: C.pingalaRed, marginBottom: s(5, sc), textTransform: 'uppercase' as const }}>72-Hour Protocol</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300 }}>
              If your Rest channel stays below 20% for 72 hours, NADI will gently suggest reaching out to someone you trust. You won't be prompted more than once.
            </p>
          </div>
        </div>

        {/* ── Personalisation note ── */}
        <div style={{ padding: `0 ${s(20, sc)}px`, marginBottom: s(20, sc) }}>
          <div style={{ borderTop: `1px solid ${C.cardDeep}`, paddingTop: s(14, sc), display: 'flex', alignItems: 'flex-start', gap: s(8, sc) }}>
            <svg width={s(18, sc)} height={s(10, sc)} viewBox="0 0 36 12" style={{ flexShrink: 0, marginTop: s(3, sc) }}>
              <path d="M0,6 Q7,2 14,6 Q21,10 28,6 Q32,4 36,6" fill="none" stroke="#C4722A" strokeWidth="2" strokeOpacity="0.6"/>
              <path d="M0,6 Q7,10 14,6 Q21,2 28,6 Q32,8 36,6" fill="none" stroke="#D4A847" strokeWidth="1.8" strokeOpacity="0.5"/>
              <path d="M0,4 Q7,6 14,4 Q21,2 28,4 Q32,5 36,4" fill="none" stroke="#C9B8A0" strokeWidth="1.5" strokeOpacity="0.45"/>
            </svg>
            <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.7 }}>
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
  const [modal, setModal] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const stats = [
    { label: 'Avg Energy', val: '78', sub: 'out of 100' },
    { label: 'Captures', val: '24', sub: 'this week' },
    { label: 'Restored', val: '11', sub: 'moments' },
  ];

  const modalContent: Record<string, { title: string; body: React.ReactNode }> = {
    'How it works': {
      title: 'How NADI Works',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          {[
            { icon: '〰', label: 'The Braid Reads You', text: 'Three woven strands — Drive, Balance, Rest — each carry a different sensor signal. NADI reads skin temperature, conductance, and heart rate simultaneously through The Seat.' },
            { icon: '🌡', label: 'Temperature is the Language', text: 'When your cognitive load rises, your peripheral skin temperature shifts. NADI detects this and responds — warming or cooling the band to mirror your internal state.' },
            { icon: '✦', label: 'No Screen. No Alerts.', text: 'NADI never interrupts you. It becomes part of your body\'s own feedback loop — a feeling, not a notification.' },
          ].map(({ icon, label, text }) => (
            <div key={label} style={{ display: 'flex', gap: s(12, sc), alignItems: 'flex-start' }}>
              <div style={{ fontSize: s(18, sc), width: s(28, sc), flexShrink: 0, textAlign: 'center' as const }}>{icon}</div>
              <div>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color: C.indian, letterSpacing: 1, marginBottom: s(3, sc) }}>{label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.6, fontWeight: 300 }}>{text}</div>
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
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.6, fontWeight: 300 }}>{a}</div>
            </div>
          ))}

          {/* How suggestions work — three-stage timeline */}
          <div style={{ paddingBottom: s(4, sc) }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), fontWeight: 500, color: C.text, marginBottom: s(10, sc) }}>How do suggestions get more personalised over time?</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300, marginBottom: s(14, sc) }}>
              NADI builds its picture of you gradually — not from a questionnaire, but from repeated days of real sensing. The suggestions on the Restore screen start with what works for most people, and quietly shift toward what works for you specifically.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: s(10, sc) }}>
              {[
                { days: 'Days 1–7', label: 'Baseline', color: '#C9B8A0', desc: 'NADI listens without assuming. It maps your personal floor — the resting state your body returns to when nothing is pulling at it.', last: false },
                { days: 'Days 8–21', label: 'Pattern', color: '#D4A847', desc: 'Your depletion signature begins to emerge — when Drive peaks in your day, how long your Rest channel takes to rebuild, what your body does before you notice anything is wrong.', last: false },
                { days: 'Day 22+', label: 'Memory', color: '#C4722A', desc: 'Suggestions become specific to you. Not what generally restores people — what restores you. The band starts to feel less like a device and more like something that already knows.', last: true },
              ].map(({ days, label, color, desc, last }) => (
                <div key={days} style={{ display: 'flex', gap: s(12, sc), alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: s(3, sc) }}>
                    <div style={{ width: s(9, sc), height: s(9, sc), borderRadius: '50%', background: color, boxShadow: `0 0 ${s(5, sc)}px ${color}55` }} />
                    {!last && <div style={{ width: 1, height: s(32, sc), background: C.cardDeep, marginTop: s(2, sc) }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: last ? 0 : s(4, sc) }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: s(7, sc), marginBottom: s(3, sc) }}>
                      <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), fontWeight: 300, color, letterSpacing: 0.5 }}>{label}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(9.5, sc), color: C.sec, fontWeight: 300 }}>{days}</span>
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300 }}>{desc}</p>
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
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, borderRadius: s(12, sc), padding: `${s(12, sc)}px ${s(14, sc)}px`, border: `1px solid ${C.cardDeep}` }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(10, sc), letterSpacing: 2, color: C.indian, marginBottom: s(6, sc) }}>WHAT WE NEVER DO</div>
            {['Sell your data to third parties', 'Use data for advertising', 'Share with employers or insurers', 'Store voice audio beyond capture window'].map(item => (
              <div key={item} style={{ display: 'flex', gap: s(8, sc), alignItems: 'center', marginBottom: s(5, sc) }}>
                <span style={{ color: C.sec, fontSize: s(10, sc), flexShrink: 0 }}>✕</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11.5, sc), color: C.sec, fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(11, sc), color: C.sec, lineHeight: 1.6, fontWeight: 300 }}>All physiological data is processed on-device. Only anonymised, aggregated patterns are used for model improvement — and only if you have opted in.</p>
        </div>
      ),
    },
    '72-hour protocol': {
      title: '72-Hour Protocol',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(14, sc) }}>
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(13, sc), color: C.text, lineHeight: 1.7 }}>The 72-hour protocol is a voluntary full digital rest.</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300 }}>When activated, NADI disconnects from all sync, stops sending captures, and enters pure sensing mode. The band continues reading your energy — but nothing leaves the device. No cloud, no app, no prompts.</p>
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
          <button style={{ background: C.btn, border: 'none', borderRadius: s(13, sc), padding: `${s(13, sc)}px`, color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(14, sc), fontWeight: 500, cursor: 'pointer' }}>
            Begin 72-Hour Protocol
          </button>
        </div>
      ),
    },
    'Data on device': {
      title: 'Data on Device',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s(12, sc) }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300 }}>Your physiological data is processed and stored locally on your device. NADI's core sensing never requires a cloud connection.</p>
          {[
            { label: 'Captures stored', val: '24', unit: 'voice notes' },
            { label: 'Energy logs', val: '14', unit: 'days' },
            { label: 'Storage used', val: '2.4', unit: 'MB' },
            { label: 'Last sync', val: 'Today', unit: '11:32 AM' },
          ].map(({ label, val, unit }) => (
            <div key={label} style={{
              background: C.card, borderRadius: s(11, sc), padding: `${s(10, sc)}px ${s(13, sc)}px`,
              border: `1px solid ${C.cardDeep}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, fontWeight: 300 }}>{label}</span>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(13, sc), color: C.text, fontWeight: 300 }}>
                {val} <span style={{ fontSize: s(9, sc), color: C.sec }}>{unit}</span>
              </span>
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
        { name: 'How it works', action: () => setModal('How it works'), icon: '→' },
        { name: 'Wristband guide', action: () => onNav('wristband'), icon: '→' },
        { name: 'Tutorial recap', action: () => onNav('tutorial'), icon: '→' },
        { name: 'FAQ', action: () => setModal('FAQ'), icon: '→' },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          name: 'Notifications',
          action: () => setNotifications(n => !n),
          icon: null,
          toggle: true,
          toggled: notifications,
        },
        { name: 'Restore preferences', action: () => onNav('restore'), icon: '→' },
        {
          name: 'Calendar sync',
          action: () => setCalendarSync(n => !n),
          icon: null,
          toggle: true,
          toggled: calendarSync,
        },
        { name: 'Data & privacy', action: () => setModal('Data & privacy'), icon: '→' },
      ],
    },
    {
      label: 'Sovereignty',
      items: [
        { name: '72-hour protocol', action: () => setModal('72-hour protocol'), icon: '→' },
        { name: 'Data on device', action: () => setModal('Data on device'), icon: '→' },
        { name: 'Delete all data', action: () => setDeleteConfirm(true), icon: '→', danger: true },
      ],
    },
  ];

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Modal overlay */}
      {modal && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(30,21,8,0.55)', backdropFilter: 'blur(4px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }} onClick={() => setModal(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.bg, borderRadius: `${s(22, sc)}px ${s(22, sc)}px 0 0`,
            padding: `${s(20, sc)}px ${s(20, sc)}px ${s(36, sc)}px`,
            maxHeight: '78%', display: 'flex', flexDirection: 'column', gap: s(14, sc),
          }}>
            {/* Handle */}
            <div style={{ width: s(36, sc), height: s(4, sc), borderRadius: s(2, sc), background: C.cardDeep, margin: '0 auto', marginBottom: s(4, sc) }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(18, sc), fontWeight: 300, color: C.text }}>{modal}</h2>
              <button onClick={() => setModal(null)} style={{ background: C.card, border: `1px solid ${C.cardDeep}`, borderRadius: '50%', width: s(28, sc), height: s(28, sc), cursor: 'pointer', color: C.sec, fontSize: s(14, sc), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {modalContent[modal]?.body}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation overlay */}
      {deleteConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(30,21,8,0.65)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: `0 ${s(24, sc)}px`,
        }}>
          <div style={{
            background: C.bg, borderRadius: s(20, sc), padding: `${s(24, sc)}px`,
            border: `1px solid ${C.cardDeep}`, width: '100%',
          }}>
            {deleted ? (
              <div style={{ textAlign: 'center' as const, padding: `${s(16, sc)}px 0` }}>
                <div style={{ fontSize: s(28, sc), marginBottom: s(10, sc) }}>✦</div>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(16, sc), fontWeight: 300, color: C.text, marginBottom: s(8, sc) }}>All data cleared.</div>
                <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: s(12, sc), color: C.sec, lineHeight: 1.6, marginBottom: s(20, sc) }}>Your band is ready to begin again. The body doesn't forget — but NADI will.</div>
                <button onClick={() => { setDeleteConfirm(false); setDeleted(false); onNav('welcome'); }} style={{ background: C.btn, border: 'none', borderRadius: s(13, sc), padding: `${s(12, sc)}px ${s(24, sc)}px`, color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: s(13, sc), cursor: 'pointer' }}>Return to start →</button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(16, sc), fontWeight: 300, color: C.text, marginBottom: s(8, sc) }}>Delete all data?</div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: s(12, sc), color: C.sec, lineHeight: 1.65, fontWeight: 300, marginBottom: s(20, sc) }}>This will permanently erase all captures, energy logs, baselines, and personal preferences. Your band will return to factory state. This cannot be undone.</p>
                <div style={{ display: 'flex', gap: s(10, sc) }}>
                  <button onClick={() => setDeleteConfirm(false)} style={{
                    flex: 1, height: s(46, sc), background: 'transparent', borderRadius: s(13, sc),
                    border: `1.5px solid ${C.cardDeep}`, color: C.sec, fontFamily: 'DM Sans, sans-serif',
                    fontSize: s(13, sc), cursor: 'pointer',
                  }}>Cancel</button>
                  <button onClick={() => setDeleted(true)} style={{
                    flex: 1, height: s(46, sc), background: 'rgba(154,78,24,0.12)', borderRadius: s(13, sc),
                    border: `1.5px solid rgba(154,78,24,0.4)`, color: '#9A4E18', fontFamily: 'DM Sans, sans-serif',
                    fontSize: s(13, sc), fontWeight: 500, cursor: 'pointer',
                  }}>Delete everything</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Avatar section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s(7, sc), paddingTop: s(58, sc), paddingBottom: s(14, sc), flexShrink: 0 }}>
        <div style={{
          width: s(64, sc), height: s(64, sc), borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.indian}, ${C.btn})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'Josefin Sans, sans-serif', fontSize: s(24, sc), fontWeight: 300,
          boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(196,114,42,0.3)`,
        }}>E</div>
        <div style={{ fontSize: s(15, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Evelyn</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(5, sc) }}>
          <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif' }}>Band connected · 9 days streak</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: s(10, sc), padding: `0 ${s(18, sc)}px`, marginBottom: s(16, sc), flexShrink: 0 }}>
        {stats.map(stat => (
          <div key={stat.label} style={{
            flex: 1, background: C.card, borderRadius: s(14, sc),
            padding: `${s(10, sc)}px ${s(8, sc)}px`, textAlign: 'center',
            border: `1px solid ${C.cardDeep}`,
          }}>
            <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(20, sc), color: C.text, fontWeight: 300 }}>{stat.val}</div>
            <div style={{ fontSize: s(9, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif', marginTop: s(1, sc) }}>{stat.label}</div>
            <div style={{ fontSize: s(8, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif', opacity: 0.6 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: `0 ${s(18, sc)}px`, paddingBottom: s(90, sc) }}>
        {groups.map(group => (
          <div key={group.label} style={{ marginBottom: s(18, sc) }}>
            <div style={{ fontSize: s(9, sc), color: C.indian, letterSpacing: s(2, sc), textTransform: 'uppercase', marginBottom: s(7, sc), fontFamily: 'Josefin Sans, sans-serif', fontWeight: 200 }}>{group.label}</div>
            <div style={{ background: C.card, borderRadius: s(16, sc), overflow: 'hidden', border: `1px solid ${C.cardDeep}` }}>
              {group.items.map((item: any, i: number) => (
                <div key={item.name} onClick={item.action} style={{
                  padding: `${s(13, sc)}px ${s(15, sc)}px`,
                  borderBottom: i < group.items.length - 1 ? `1px solid ${C.cardDeep}` : 'none',
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'background 0.15s',
                }}>
                  <span style={{
                    fontSize: s(13, sc),
                    color: item.danger ? 'rgba(154,78,24,0.85)' : C.text,
                    fontWeight: 400,
                    fontFamily: 'DM Sans, sans-serif',
                  }}>{item.name}</span>
                  {item.toggle ? (
                    <div style={{
                      width: s(38, sc), height: s(22, sc), borderRadius: s(11, sc),
                      background: item.toggled ? C.indian : C.cardDeep,
                      position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                    }}>
                      <div style={{
                        position: 'absolute', top: s(3, sc), left: item.toggled ? s(19, sc) : s(3, sc),
                        width: s(16, sc), height: s(16, sc), borderRadius: '50%', background: '#fff',
                        transition: 'left 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }} />
                    </div>
                  ) : (
                    <span style={{ fontSize: s(16, sc), color: 'rgba(160,128,80,0.45)', lineHeight: 1 }}>›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center' as const, padding: `${s(10, sc)}px 0 ${s(4, sc)}px` }}>
          <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: s(11, sc), color: C.indian, letterSpacing: 4, fontWeight: 200 }}>NADI</div>
          <div style={{ fontSize: s(10, sc), fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: 'rgba(160,128,80,0.6)', marginTop: s(3, sc) }}>feel your energy</div>
          <div style={{ fontSize: s(9, sc), color: C.sec, fontFamily: 'DM Sans, sans-serif', marginTop: s(6, sc), opacity: 0.5 }}>v1.0.0 · Band FW 2.4.1</div>
        </div>
      </div>

      <BottomNav active="profile" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screens Registry ─────────────────────────────────────────────────────────
const SCREENS: { id: ScreenId; label: string; short: string; Component: React.ComponentType<ScreenProps> }[] = [
  { id: 'welcome', label: '01 - Welcome', short: 'Welcome', Component: WelcomeScreen },
  { id: 'signin', label: '02 - Sign In', short: 'Sign In', Component: SignInScreen },
  { id: 'onboarding', label: '03 - Onboarding', short: 'Onboarding', Component: OnboardingScreen },
  { id: 'wristband', label: '04 - Wristband', short: 'Wristband', Component: WristbandScreen },
  { id: 'tutorial', label: '05 - Tutorial', short: 'Tutorial', Component: TutorialScreen },
  { id: 'home', label: '06 - Home', short: 'Home', Component: HomeScreen },
  { id: 'speak', label: '07 - Speak', short: 'Speak', Component: SpeakScreen },
  { id: 'captured', label: '08 - Captured', short: 'Captured', Component: CapturedScreen },
  { id: 'revisit', label: '09 - Revisit', short: 'Revisit', Component: RevisitScreen },
  { id: 'restore', label: '10 - Restore', short: 'Restore', Component: RestoreScreen },
  { id: 'profile', label: '11 - Profile', short: 'Profile', Component: ProfileScreen },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<'canvas' | 'prototype'>('canvas');
  const [active, setActive] = useState<ScreenId>('welcome');
  const [hovered, setHovered] = useState<ScreenId | null>(null);

  const { protoSc: PROTO_SC, canvasSc: CANVAS_SC } = useResponsiveSc();

  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=IM+Fell+English:ital@0;1&family=Josefin+Sans:wght@100;200;300;400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap';
    document.head.appendChild(link);

    // Inject keyframes + reset
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
      @keyframes rippleOut {
        0%   { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(2.8); opacity: 0; }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 15px 4px rgba(196,114,42,0.3), 0 0 40px 8px rgba(154,78,24,0.15); }
        50%       { box-shadow: 0 0 30px 8px rgba(196,114,42,0.55), 0 0 70px 16px rgba(154,78,24,0.3); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes floatLogo {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const navigate = (id: ScreenId) => setActive(id);

  const activeIdx = SCREENS.findIndex(s => s.id === active);
  const goLeft = () => setActive(SCREENS[Math.max(0, activeIdx - 1)].id);
  const goRight = () => setActive(SCREENS[Math.min(SCREENS.length - 1, activeIdx + 1)].id);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1508',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div style={{
        height: 48,
        background: '#1E1508',
        borderBottom: '1px solid #3E3018',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        flexShrink: 0,
        zIndex: 100,
      }}>
        {/* Logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 120 120" fill="none">
            <rect width="120" height="120" rx="26" fill="url(#tbTile)"/>
            <ellipse cx="60" cy="76" rx="22" ry="12" fill="rgba(180,60,20,0.45)"/>
            <path d="M60 25 C60 25 38 55 38 72 C38 85 48 95 60 95 C72 95 82 85 82 72 C82 55 60 25 60 25Z" fill="url(#tbFlame1)"/>
            <path d="M60 38 C60 38 44 60 44 73 C44 83 51 90 60 90 C69 90 76 83 76 73 C76 60 60 38 60 38Z" fill="url(#tbFlame2)"/>
            <path d="M60 52 C60 52 50 66 50 74 C50 80 54 86 60 86 C66 86 70 80 70 74 C70 66 60 52 60 52Z" fill="url(#tbFlame3)"/>
            <defs>
              <linearGradient id="tbTile" x1="0" y1="0" x2="120" y2="120">
                <stop offset="0%" stopColor="#C4722A"/>
                <stop offset="100%" stopColor="#8A4E1A"/>
              </linearGradient>
              <radialGradient id="tbFlame1" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#F0C84A" stopOpacity="0.9"/>
                <stop offset="60%" stopColor="#E09050" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#8A4E1A" stopOpacity="0.6"/>
              </radialGradient>
              <radialGradient id="tbFlame2" cx="50%" cy="55%" r="50%">
                <stop offset="0%" stopColor="#ECC870" stopOpacity="0.95"/>
                <stop offset="70%" stopColor="#D4A847" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#C4722A" stopOpacity="0.5"/>
              </radialGradient>
              <radialGradient id="tbFlame3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBE8" stopOpacity="1"/>
                <stop offset="50%" stopColor="#F0C84A" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#D4A847" stopOpacity="0.7"/>
              </radialGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: 'Josefin Sans, sans-serif',
            color: '#E09050',
            fontSize: 13,
            letterSpacing: 6,
            fontWeight: 200,
          }}>NADI</span>
          <span style={{ color: '#555', fontSize: 12 }}>/ Design System / App Screens v1.0</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Mode switcher */}
        <div style={{
          background: '#2E2010',
          borderRadius: 8,
          padding: 3,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}>
          {(['canvas', 'prototype'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                background: mode === m ? '#3E3018' : 'transparent',
                border: 'none',
                color: mode === m ? '#E09050' : '#6A5030',
                padding: '4px 12px',
                borderRadius: 6,
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: mode === m ? 500 : 400,
              }}
            >
              {m === 'canvas' ? '⊞ Canvas' : '▶ Prototype'}
            </button>
          ))}
        </div>

        <span style={{ color: '#6A5030', fontSize: 11 }}>iPhone 14 Pro · 393×852</span>
        <span style={{ color: '#3E3018', fontSize: 11 }}>|</span>
        <span style={{ color: '#6A5030', fontSize: 11 }}>11 screens</span>
      </div>

      {/* ── Canvas Mode ──────────────────────────────────────────────────────── */}
      {mode === 'canvas' && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: 'radial-gradient(circle, #3E3018 1px, transparent 1px) 0 0 / 24px 24px',
          padding: 52,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '56px 40px',
          alignItems: 'flex-start',
        }}>
          {SCREENS.map(screen => {
            const Comp = screen.Component;
            return (
              <div
                key={screen.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                }}
                onClick={() => { setMode('prototype'); setActive(screen.id); }}
              >
                <span style={{ fontSize: 10, color: '#A08050', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {screen.label}
                </span>
                <div
                  onMouseEnter={() => setHovered(screen.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    transform: hovered === screen.id ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <PhoneFrame sc={CANVAS_SC}>
                    <Comp onNav={() => {}} sc={CANVAS_SC} />
                  </PhoneFrame>
                </div>
                <span style={{
                  fontSize: 10,
                  color: '#A08050',
                  background: '#2E2010',
                  borderRadius: 4,
                  padding: '2px 8px',
                  border: '1px solid #3E3018',
                }}>click to preview</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Prototype Mode ───────────────────────────────────────────────────── */}
      {mode === 'prototype' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '28px 20px',
          gap: 20,
          overflow: 'auto',
          background: 'radial-gradient(circle, #3E3018 1px, transparent 1px) 0 0 / 24px 24px',
        }}>
          {/* Screen selector pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            justifyContent: 'center',
            maxWidth: 820,
          }}>
            {SCREENS.map(screen => (
              <button
                key={screen.id}
                onClick={() => setActive(screen.id)}
                style={{
                  background: active === screen.id ? 'rgba(196,114,42,0.85)' : '#2E2010',
                  border: `1px solid ${active === screen.id ? C.indian : '#3E3018'}`,
                  color: active === screen.id ? '#fff' : '#6A5030',
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: 10,
                  cursor: 'pointer',
                  fontWeight: active === screen.id ? 600 : 400,
                  whiteSpace: 'nowrap',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.15s',
                }}
              >{screen.short}</button>
            ))}
          </div>

          {/* Phone + side panel */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 36 }}>
            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {(() => {
                const screen = SCREENS.find(s => s.id === active)!;
                const Comp = screen.Component;
                return (
                  <PhoneFrame sc={PROTO_SC}>
                    <Comp onNav={navigate} sc={PROTO_SC} />
                  </PhoneFrame>
                );
              })()}

              {/* Progress dots */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                {SCREENS.map(screen => (
                  <div
                    key={screen.id}
                    onClick={() => setActive(screen.id)}
                    style={{
                      width: active === screen.id ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: active === screen.id ? C.indian : '#3E3018',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div style={{ maxWidth: 180, paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: 13,
                color: '#E09050',
                fontWeight: 200,
                letterSpacing: 2,
                marginBottom: 10,
              }}>{SCREENS.find(s => s.id === active)?.label}</div>
              <p style={{ fontSize: 11, color: '#A08050', lineHeight: 1.7, marginBottom: 20 }}>
                Tap any button inside the phone to navigate between screens.
              </p>

              <div style={{ borderTop: '1px solid #3E3018', paddingTop: 14, marginBottom: 14 }}>
                {[
                  ['Frame', 'iPhone 14 Pro'],
                  ['Screen', '393 × 852 pt'],
                  ['Scale', `${Math.round(PROTO_SC * 100)}%`],
                  ['Fonts', 'Josefin Sans, DM Sans'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: '#6A5030' }}>{k}</span>
                    <span style={{ fontSize: 10, color: '#A08050' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #3E3018', paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: '#6A5030', letterSpacing: 0.5, marginBottom: 8 }}>NAVIGATE</div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                  <button
                    onClick={goLeft}
                    disabled={activeIdx === 0}
                    style={{
                      flex: 1,
                      height: 28,
                      background: '#2E2010',
                      border: '1px solid #3E3018',
                      borderRadius: 6,
                      color: activeIdx === 0 ? '#3E3018' : '#A08050',
                      fontSize: 14,
                      cursor: activeIdx === 0 ? 'default' : 'pointer',
                    }}
                  >←</button>
                  <button
                    onClick={goRight}
                    disabled={activeIdx === SCREENS.length - 1}
                    style={{
                      flex: 1,
                      height: 28,
                      background: '#2E2010',
                      border: '1px solid #3E3018',
                      borderRadius: 6,
                      color: activeIdx === SCREENS.length - 1 ? '#3E3018' : '#A08050',
                      fontSize: 14,
                      cursor: activeIdx === SCREENS.length - 1 ? 'default' : 'pointer',
                    }}
                  >→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
