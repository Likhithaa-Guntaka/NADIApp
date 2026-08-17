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
          <ellipse cx="100" cy="118" rx="12" ry="18" fill="url(#wCoreGlow)"/>
          <circle cx="100" cy="36" r="7" fill="url(#wDot)"/>
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
            <radialGradient id="wCoreGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#F0C84A" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="wDot" cx="50%" cy="30%" r="70%">
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
  const [granted, setGranted] = useState([false, false, false]);
  const cards = [
    { icon: '📡', title: 'Connection', desc: 'Sync your wristband and device for real-time cognitive sensing.', accent: C.idaAccent },
    { icon: '🎙️', title: 'Reflection', desc: 'Allow microphone access for voice thought capture.', accent: C.gold },
    { icon: '🫀', title: 'Baseline', desc: 'Establish your personal energy patterns over 7 days.', accent: C.pingalaOrange },
  ];
  const toggle = (i: number) => setGranted(prev => prev.map((v, idx) => idx === i ? !v : v));

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: `${s(54, sc)}px ${s(20, sc)}px ${s(36, sc)}px`,
      overflowY: 'auto',
    }}>
      <div style={{
        fontSize: s(11, sc),
        color: C.indian,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: 500,
        fontFamily: 'DM Sans, sans-serif',
        marginBottom: s(10, sc),
      }}>Getting started</div>
      <h1 style={{
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: s(27, sc),
        fontWeight: 300,
        color: C.text,
        marginBottom: s(8, sc),
      }}>Establishing Your Rhythm</h1>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: s(13, sc),
        fontWeight: 300,
        color: C.sec,
        marginBottom: s(24, sc),
        lineHeight: 1.5,
      }}>These signals help NADI estimate your cognitive resilience over time.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: s(10, sc), marginBottom: s(14, sc) }}>
        {cards.map((card, i) => (
          <div
            key={card.title}
            onClick={() => toggle(i)}
            style={{
              background: C.card,
              borderRadius: s(18, sc),
              padding: s(16, sc),
              border: granted[i]
                ? `1px solid ${card.accent}`
                : '1px solid rgba(138,117,96,0.15)',
              boxShadow: granted[i] ? `0 0 0 ${s(2, sc)}px ${card.accent}28` : 'none',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: s(12, sc),
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{
              width: s(46, sc),
              height: s(46, sc),
              borderRadius: s(13, sc),
              background: `${card.accent}33`,
              border: `${s(1.5, sc)}px solid ${card.accent}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: s(20, sc),
              flexShrink: 0,
            }}>{card.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: s(14, sc),
                color: C.text,
                fontWeight: 500,
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: s(3, sc),
              }}>{card.title}</div>
              <div style={{
                fontSize: s(11, sc),
                color: C.sec,
                fontWeight: 300,
                lineHeight: 1.4,
                fontFamily: 'DM Sans, sans-serif',
              }}>{card.desc}</div>
            </div>
            <div style={{
              width: s(26, sc),
              height: s(26, sc),
              borderRadius: s(8, sc),
              background: granted[i] ? card.accent : 'transparent',
              border: `${s(1.5, sc)}px solid ${granted[i] ? card.accent : 'rgba(138,117,96,0.5)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: s(13, sc),
              color: '#fff',
            }}>{granted[i] ? '✓' : ''}</div>
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <div style={{
        background: 'rgba(212,168,71,0.1)',
        borderRadius: s(14, sc),
        border: '1px solid rgba(212,168,71,0.25)',
        padding: `${s(12, sc)}px ${s(14, sc)}px`,
        marginBottom: s(24, sc),
        fontSize: s(11, sc),
        color: C.sec,
        fontWeight: 300,
        lineHeight: 1.5,
        fontFamily: 'DM Sans, sans-serif',
      }}>🔒 NADI never shares your data. All processing happens on device. You own your rhythm.</div>

      <button
        onClick={() => onNav('wristband')}
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
          boxShadow: `0 ${s(4, sc)}px ${s(16, sc)}px rgba(192,57,43,0.35)`,
          marginTop: 'auto',
        }}
      >Allow &amp; Continue</button>
    </div>
  );
}

// ─── Screen 04 - Wristband ────────────────────────────────────────────────────
function WristbandScreen({ onNav, sc }: ScreenProps) {
  const states = [
    { color: C.pingalaGlow, label: 'Warm band', desc: 'Balanced or entering high capacity.' },
    { color: C.idaAccent, label: 'Cooling band', desc: 'Cognitive depletion beginning.' },
    { color: C.honey, label: 'Neutral band', desc: 'No strong shift detected.' },
  ];
  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: `${s(54, sc)}px ${s(20, sc)}px ${s(36, sc)}px`,
      overflowY: 'auto',
    }}>
      <h1 style={{
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: s(26, sc),
        fontWeight: 300,
        color: C.text,
        marginBottom: s(10, sc),
        lineHeight: 1.25,
      }}>A new sense for cognitive energy.</h1>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: s(13, sc),
        fontWeight: 300,
        color: C.sec,
        lineHeight: 1.55,
        marginBottom: s(24, sc),
      }}>The wristband communicates energy states through subtle temperature changes — below your conscious threshold.</p>

      {/* SVG wristband illustration */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: s(24, sc) }}>
        <svg width={s(200, sc)} height={s(80, sc)} viewBox="0 0 200 80">
          <defs>
            <linearGradient id="strap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A1A0E" />
              <stop offset="50%" stopColor="#3D2010" />
              <stop offset="100%" stopColor="#2A1A0E" />
            </linearGradient>
            <radialGradient id="face" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F0C84A" />
              <stop offset="50%" stopColor="#C4722A" />
              <stop offset="100%" stopColor="#C0392B" />
            </radialGradient>
          </defs>
          {/* Strap */}
          <rect x="10" y="28" width="180" height="24" rx="12" fill="url(#strap)" />
          {/* Buckle left */}
          <rect x="12" y="34" width="16" height="12" rx="4" fill="#1A0E08" opacity="0.7" />
          {/* Buckle right */}
          <rect x="172" y="34" width="16" height="12" rx="4" fill="#1A0E08" opacity="0.7" />
          {/* Watch case */}
          <ellipse cx="100" cy="40" rx="28" ry="32" fill="#1A1A1A" />
          {/* Watch face */}
          <ellipse cx="100" cy="40" rx="22" ry="26" fill="url(#face)" opacity="0.92" />
          {/* Reflection */}
          <circle cx="92" cy="30" r="5" fill="rgba(255,255,255,0.25)" />
          {/* Side button */}
          <rect x="125" y="36" width="6" height="8" rx="2" fill="#333" />
        </svg>
      </div>

      {/* Temperature states */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: s(8, sc), marginBottom: s(16, sc) }}>
        {states.map(st => (
          <div key={st.label} style={{
            background: C.card,
            borderRadius: s(14, sc),
            padding: s(11, sc),
            border: '1px solid rgba(138,117,96,0.13)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: s(12, sc),
          }}>
            <div style={{
              width: s(10, sc),
              height: s(10, sc),
              borderRadius: '50%',
              background: st.color,
              boxShadow: `0 0 ${s(6, sc)}px ${st.color}`,
              flexShrink: 0,
            }} />
            <div>
              <div style={{ fontSize: s(13, sc), fontWeight: 500, color: C.text, fontFamily: 'DM Sans, sans-serif' }}>{st.label}</div>
              <div style={{ fontSize: s(11, sc), fontWeight: 300, color: C.sec, fontFamily: 'DM Sans, sans-serif' }}>{st.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Press & Speak card */}
      <div style={{
        background: 'rgba(192,57,43,0.07)',
        borderRadius: s(16, sc),
        border: '1px solid rgba(192,57,43,0.18)',
        padding: s(14, sc),
        marginBottom: s(14, sc),
      }}>
        <div style={{ fontSize: s(12, sc), fontWeight: 600, color: C.btn, fontFamily: 'DM Sans, sans-serif', marginBottom: s(6, sc) }}>Press &amp; Speak</div>
        <div style={{ fontSize: s(12, sc), fontWeight: 300, color: C.sec, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>
          Press the wristband button and speak your thought aloud. NADI captures it, categorizes it, and resurfaces it when your energy is ready.
        </div>
      </div>

      {/* Connection status */}
      <div style={{
        background: C.card,
        borderRadius: s(14, sc),
        border: '1px solid rgba(74,124,89,0.3)',
        padding: `${s(11, sc)}px ${s(14, sc)}px`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: s(24, sc),
      }}>
        <span style={{ fontSize: s(13, sc), color: C.text, fontFamily: 'DM Sans, sans-serif' }}>Wristband</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(6, sc) }}>
          <div style={{ width: s(7, sc), height: s(7, sc), borderRadius: '50%', background: C.green, boxShadow: `0 0 ${s(6, sc)}px ${C.green}` }} />
          <span style={{ fontSize: s(12, sc), fontWeight: 500, color: C.green, fontFamily: 'DM Sans, sans-serif' }}>Connected</span>
        </div>
      </div>

      <button
        onClick={() => onNav('tutorial')}
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
          marginTop: 'auto',
        }}
      >Continue</button>
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
            <circle cx="60" cy="32" r="4" fill="#ECC870"/>
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
          }}>S</div>
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
  const activities = [
    { icon: '✏️', label: 'Sketching', desc: 'Create without demands' },
    { icon: '🎬', label: 'Watch a film', desc: 'Absorb without producing' },
    { icon: '🚶', label: 'Walk outside', desc: 'Move. Let the mind still.' },
    { icon: '🎵', label: 'Listen to music', desc: 'Let sound carry you' },
    { icon: '🛁', label: 'Slow bath', desc: 'Full sensory rest' },
    { icon: '📖', label: 'Read fiction', desc: 'Borrow another world' },
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
        }}>Restore</h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: s(13, sc),
          fontWeight: 300,
          color: C.sec,
        }}>Your reserve energy is low. True rest is part of the work.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: `0 ${s(16, sc)}px`, paddingBottom: s(88, sc) }}>
        {/* Warning banner */}
        <div style={{
          background: 'rgba(184,134,11,0.08)',
          borderRadius: s(15, sc),
          border: '1px solid rgba(184,134,11,0.3)',
          display: 'flex',
          flexDirection: 'row',
          gap: s(10, sc),
          padding: s(12, sc),
          marginBottom: s(16, sc),
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: s(18, sc) }}>🌡️</span>
          <div>
            <div style={{ fontSize: s(12, sc), color: C.honey, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', marginBottom: s(4, sc) }}>
              Reserve Energy at 44%
            </div>
            <div style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>
              Ojas is depleting. Rest is not optional — it is the rebuild.
            </div>
          </div>
        </div>

        {/* Activity grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: s(10, sc),
          marginBottom: s(16, sc),
        }}>
          {activities.map(a => (
            <div key={a.label} style={{
              background: C.card,
              borderRadius: s(18, sc),
              padding: `${s(15, sc)}px ${s(13, sc)}px`,
              border: '1px solid rgba(138,117,96,0.1)',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: s(24, sc), marginBottom: s(8, sc) }}>{a.icon}</div>
              <div style={{ fontSize: s(13, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', marginBottom: s(3, sc) }}>{a.label}</div>
              <div style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif' }}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* 72-hour protocol */}
        <div style={{
          background: 'rgba(192,57,43,0.05)',
          borderRadius: s(16, sc),
          padding: s(14, sc),
          border: '1px solid rgba(192,57,43,0.14)',
        }}>
          <div style={{ fontSize: s(12, sc), color: C.btn, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', marginBottom: s(6, sc) }}>
            72-Hour Protocol
          </div>
          <div style={{ fontSize: s(12, sc), color: C.sec, fontWeight: 300, lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>
            If deep depletion persists for 72 hours, NADI will gently suggest reaching out to someone you trust.
          </div>
        </div>
      </div>

      <BottomNav active="restore" onNav={onNav} sc={sc} />
    </div>
  );
}

// ─── Screen 11 - Profile ──────────────────────────────────────────────────────
function ProfileScreen({ onNav, sc }: ScreenProps) {
  const groups = [
    {
      label: 'NADI',
      items: ['How it works', 'Wristband guide', 'Tutorial recap', 'FAQ'],
    },
    {
      label: 'Settings',
      items: ['Notifications', 'Restore preferences', 'Calendar sync', 'Data & privacy'],
    },
    {
      label: 'Sovereignty',
      items: ['72-hour protocol', 'Data on device', 'Delete all data'],
    },
  ];

  const stats = [
    { label: 'Avg Energy', val: '78' },
    { label: 'Captures', val: '24' },
    { label: 'Restored', val: '11' },
  ];

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Avatar section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: s(8, sc),
        paddingTop: s(60, sc),
        paddingBottom: s(16, sc),
        flexShrink: 0,
      }}>
        <div style={{
          width: s(64, sc),
          height: s(64, sc),
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.indian}, ${C.btn})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'Josefin Sans, sans-serif',
          fontSize: s(24, sc),
          fontWeight: 300,
          boxShadow: `0 ${s(4, sc)}px ${s(18, sc)}px rgba(192,57,43,0.3)`,
        }}>S</div>
        <div style={{ fontSize: s(15, sc), color: C.text, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Swetha</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: s(5, sc) }}>
          <div style={{ width: s(6, sc), height: s(6, sc), borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: s(11, sc), color: C.sec, fontWeight: 300, fontFamily: 'DM Sans, sans-serif' }}>Band connected · 14 days streak</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: s(10, sc),
        padding: `0 ${s(18, sc)}px`,
        marginBottom: s(18, sc),
        flexShrink: 0,
      }}>
        {stats.map(stat => (
          <div key={stat.label} style={{
            flex: 1,
            background: C.card,
            borderRadius: s(14, sc),
            padding: `${s(10, sc)}px ${s(8, sc)}px`,
            textAlign: 'center',
            border: '1px solid rgba(138,117,96,0.1)',
          }}>
            <div style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: s(18, sc),
              color: C.text,
              fontWeight: 300,
            }}>{stat.val}</div>
            <div style={{
              fontSize: s(9, sc),
              color: C.sec,
              fontWeight: 300,
              marginTop: s(2, sc),
              fontFamily: 'DM Sans, sans-serif',
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Settings groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: `0 ${s(18, sc)}px`, paddingBottom: s(90, sc) }}>
        {groups.map(group => (
          <div key={group.label} style={{ marginBottom: s(20, sc) }}>
            <div style={{
              fontSize: s(10, sc),
              color: C.indian,
              fontWeight: 500,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              marginBottom: s(7, sc),
              fontFamily: 'DM Sans, sans-serif',
            }}>{group.label}</div>
            <div style={{
              background: C.card,
              borderRadius: s(16, sc),
              overflow: 'hidden',
              border: '1px solid rgba(138,117,96,0.1)',
            }}>
              {group.items.map((item, i) => (
                <div key={item} style={{
                  padding: `${s(13, sc)}px ${s(15, sc)}px`,
                  borderBottom: i < group.items.length - 1 ? '1px solid rgba(138,117,96,0.09)' : 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}>
                  <span style={{
                    fontSize: s(13, sc),
                    color: item === 'Delete all data' ? 'rgba(192,57,43,0.75)' : C.text,
                    fontWeight: 400,
                    fontFamily: 'DM Sans, sans-serif',
                  }}>{item}</span>
                  <span style={{ fontSize: s(15, sc), color: 'rgba(138,117,96,0.5)' }}>›</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: `${s(12, sc)}px 0` }}>
          <div style={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: s(11, sc),
            color: C.indian,
            letterSpacing: 4,
            fontWeight: 200,
          }}>NADI</div>
          <div style={{
            fontSize: s(10, sc),
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            color: 'rgba(160,128,80,0.7)',
            fontWeight: 300,
            marginTop: s(3, sc),
          }}>feel your energy</div>
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

  const CANVAS_SC = 0.395;
  const PROTO_SC = 0.88;

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
            <circle cx="60" cy="32" r="4" fill="url(#tbDot)"/>
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
              <radialGradient id="tbDot" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFBE8"/>
                <stop offset="100%" stopColor="#ECC870"/>
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
