import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// ─── Rotating Stars Background ─────────────────────────────────
function StarsBackground() {
  const starsRef = useRef(null);
  useEffect(() => {
    if (starsRef.current) {
      gsap.to(starsRef.current, { rotation: 360, duration: 120, repeat: -1, ease: 'none' });
    }
  }, []);
  const stars = Array.from({ length: 60 }, (_, i) => ({
    cx: Math.random() * 800, cy: Math.random() * 600,
    r: Math.random() * 1.5 + 0.3, opacity: Math.random() * 0.5 + 0.1,
  }));
  return (
    <svg ref={starsRef} viewBox="0 0 800 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />)}
    </svg>
  );
}

// ─── Animated stat counter ──────────────────────────────────────
function StatCounter({ value, label, delay = 0 }) {
  const numRef = useRef(null);
  useEffect(() => {
    if (!numRef.current) return;
    const end = parseFloat(value);
    gsap.fromTo({ val: 0 }, { val: end }, {
      duration: 1.8, ease: 'power3.out', delay,
      onUpdate: function () {
        if (numRef.current) {
          const v = this.targets()[0].val;
          numRef.current.textContent = Number.isInteger(end) ? Math.round(v).toLocaleString() : v.toFixed(1);
        }
      }
    });
  }, [value, delay]);
  return (
    <div className="ap-stat">
      <span ref={numRef} className="ap-stat-num">0</span>
      <span className="ap-stat-label">{label}</span>
    </div>
  );
}

// ─── Feature pill ───────────────────────────────────────────────
const FEATURES = [
  { icon: '🧠', text: 'AI Resume Evaluation' },
  { icon: '⚡', text: 'Real-time Job Matching' },
  { icon: '📈', text: 'Career Gap Intelligence' },
  { icon: '🎯', text: 'Legacy Vision Mapping' },
  { icon: '🤝', text: 'Elite Network Access' },
  { icon: '💰', text: 'Compensation Arbitrage' },
];

// ─── Main Auth Page ────────────────────────────────────────────
export default function AuthPage({ onAuthComplete, onBack }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const formCardRef = useRef(null);
  const tabIndicatorRef = useRef(null);
  const leftPanelRef = useRef(null);
  const prevTabRef = useRef(activeTab);

  const isSignIn = activeTab === 'signin';

  // ── Left panel entrance ──
  useEffect(() => {
    if (leftPanelRef.current) {
      gsap.fromTo(leftPanelRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    }
    if (formCardRef.current) {
      gsap.fromTo(formCardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }
  }, []);

  // ── Tab switch ──
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      if (tabIndicatorRef.current) {
        gsap.to(tabIndicatorRef.current, { x: activeTab === 'signin' ? 0 : '100%', duration: 0.4, ease: 'power3.inOut' });
      }
      if (formCardRef.current) {
        gsap.fromTo(formCardRef.current, { opacity: 0.7, y: 10, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
      }
    }
  }, [activeTab]);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formCardRef.current) {
      gsap.to(formCardRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => { if (onAuthComplete) onAuthComplete(); } });
    } else {
      if (onAuthComplete) onAuthComplete();
    }
  };

  return (
    <div className="auth-page-container">
      <style dangerouslySetInnerHTML={{ __html: authStyles }} />

      {/* Background */}
      <div className="auth-bg-gradient" />
      <StarsBackground />
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      {/* Back button */}
      {onBack && (
        <button className="auth-back-btn" onClick={onBack} id="auth-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
      )}

      <div className="auth-content-wrapper">

        {/* ── LEFT PANEL — Branding ── */}
        <div className="auth-left-panel" ref={leftPanelRef}>
          {/* Logo */}
          <div className="auth-logo-section">
            <h1 className="auth-logo-title">Pathvera<span className="auth-logo-dot" />ai</h1>
            <p className="auth-logo-subtitle">FUTURE-PROOF YOUR LEGACY</p>
          </div>

          {/* Hero tagline */}
          <div className="ap-tagline-block">
            <p className="ap-tagline-main">Your Career,<br />Engineered by AI.</p>
            <p className="ap-tagline-sub">
              Join thousands of professionals who use Vera Intelligence to land their dream roles, close gaps, and dominate their industries.
            </p>
          </div>

          {/* Stats */}
          <div className="ap-stats-row">
            <StatCounter value="50000" label="Active Users" delay={0.5} />
            <div className="ap-stat-divider" />
            <StatCounter value="4.9" label="Avg. Rating" delay={0.65} />
            <div className="ap-stat-divider" />
            <StatCounter value="92" label="% Match Rate" delay={0.8} />
          </div>

          {/* Feature pills */}
          <div className="ap-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="ap-feature-pill" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Decorative glow line */}
          <div className="ap-deco-line" />
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div className="auth-right-panel">
          <div className="auth-card" ref={formCardRef} style={{ opacity: 0 }}>
            {/* Tab switcher */}
            <div className="auth-tabs">
              <div className="auth-tab-indicator" ref={tabIndicatorRef} />
              <button className={`auth-tab ${isSignIn ? 'active' : ''}`} onClick={() => setActiveTab('signin')} id="tab-signin">
                Sign In
              </button>
              <button className={`auth-tab ${!isSignIn ? 'active' : ''}`} onClick={() => setActiveTab('signup')} id="tab-signup">
                Create Account
              </button>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {!isSignIn && (
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-name">Full Name</label>
                  <div className={`auth-input-wrap ${focusedField === 'name' ? 'focused' : ''}`}>
                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                    <input id="auth-name" type="text" className="auth-input" placeholder="Enter your name"
                      value={formData.name} onChange={e => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} autoComplete="name" />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-email">{isSignIn ? 'Email or Username' : 'Email Address'}</label>
                <div className={`auth-input-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input id="auth-email" type="text" className="auth-input" placeholder={isSignIn ? 'email@example.com' : 'your@email.com'}
                    value={formData.email} onChange={e => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} autoComplete="email" />
                </div>
              </div>

              {!isSignIn && (
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-username">Username</label>
                  <div className={`auth-input-wrap ${focusedField === 'username' ? 'focused' : ''}`}>
                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                    <input id="auth-username" type="text" className="auth-input" placeholder="Choose a username"
                      value={formData.username} onChange={e => handleInputChange('username', e.target.value)}
                      onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)} autoComplete="username" />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-password">Password</label>
                <div className={`auth-input-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input id="auth-password" type={showPassword ? 'text' : 'password'} className="auth-input" placeholder="••••••••"
                    value={formData.password} onChange={e => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                    autoComplete={isSignIn ? 'current-password' : 'new-password'} />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {!isSignIn && (
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-confirm-password">Confirm Password</label>
                  <div className={`auth-input-wrap ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    <input id="auth-confirm-password" type={showConfirmPassword ? 'text' : 'password'} className="auth-input" placeholder="••••••••"
                      value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)}
                      onFocus={() => setFocusedField('confirmPassword')} onBlur={() => setFocusedField(null)} autoComplete="new-password" />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                      {showConfirmPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isSignIn && (
                <div className="auth-options-row">
                  <label className="auth-remember">
                    <input type="checkbox" className="auth-checkbox" id="remember-me" />
                    <span className="auth-checkbox-custom" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="auth-forgot-link" id="forgot-password">Forgot password?</button>
                </div>
              )}

              <button type="submit" className="auth-submit-btn" id="auth-submit">
                {isSignIn ? 'Sign In' : 'Create Account'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {isSignIn && (
                <>
                  <div className="auth-divider">
                    <span className="auth-divider-line" />
                    <span className="auth-divider-text">or continue with</span>
                    <span className="auth-divider-line" />
                  </div>
                  <div className="auth-social-row">
                    <button type="button" className="auth-social-btn" id="social-google">
                      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <p className="auth-footer-text">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="auth-footer-link" onClick={() => setActiveTab(isSignIn ? 'signup' : 'signin')} id="auth-toggle-mode">
              {isSignIn ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const authStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Lato:wght@300;400;700&family=Bebas+Neue&display=swap');

  .auth-page-container {
    position: relative; width: 100vw; min-height: 100vh;
    background-color: #060c18; color: #F0F4FF;
    font-family: 'Lato', sans-serif;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }

  .auth-back-btn {
    position: fixed; top: 24px; left: 24px; z-index: 10;
    display: flex; align-items: center; gap: 6px;
    background: rgba(12,24,42,0.6); backdrop-filter: blur(12px);
    border: 1px solid rgba(100,160,255,0.12); border-radius: 10px;
    color: #6B84A3; font-family: 'Lato', sans-serif; font-size: 13px;
    font-weight: 500; padding: 10px 18px 10px 14px; cursor: pointer; transition: all 0.3s;
  }
  .auth-back-btn:hover { color: #FFD166; border-color: rgba(255,209,102,0.3); background: rgba(12,24,42,0.8); }

  .auth-bg-gradient {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(59,130,217,0.10) 0%, transparent 55%),
                radial-gradient(ellipse at 70% 80%, rgba(255,209,102,0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(45,212,168,0.05) 0%, transparent 45%);
  }

  .auth-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
  .auth-orb-1 { width: 350px; height: 350px; top: 0; left: 5%; background: rgba(59,130,217,0.10); animation: orb-float 14s ease-in-out infinite alternate; }
  .auth-orb-2 { width: 280px; height: 280px; bottom: 5%; right: 10%; background: rgba(255,209,102,0.07); animation: orb-float 10s ease-in-out infinite alternate-reverse; }
  .auth-orb-3 { width: 220px; height: 220px; top: 40%; left: 55%; background: rgba(45,212,168,0.06); animation: orb-float 12s ease-in-out infinite alternate; animation-delay: -5s; }
  @keyframes orb-float { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(25px,-20px) scale(1.08); } }

  /* ── Layout ── */
  .auth-content-wrapper {
    position: relative; z-index: 2;
    display: flex; flex-direction: row; align-items: center;
    justify-content: center; width: 100%; max-width: 1020px;
    padding: 40px; gap: 60px; box-sizing: border-box;
  }

  /* ── LEFT PANEL ── */
  .auth-left-panel {
    display: flex; flex-direction: column; gap: 28px;
    flex-shrink: 0; width: 380px;
  }

  .auth-logo-section { }
  .auth-logo-title {
    font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300;
    color: #F0F4FF; letter-spacing: 0.12em; margin: 0;
  }
  .auth-logo-dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: #FFD166; box-shadow: 0 0 12px rgba(255,209,102,0.7);
    vertical-align: middle; margin: 0 2px;
  }
  .auth-logo-subtitle {
    font-family: monospace; font-size: 9px; font-weight: 700;
    color: #FFD166; letter-spacing: 0.4em; text-transform: uppercase;
    margin: 6px 0 0;
  }

  .ap-tagline-block { }
  .ap-tagline-main {
    font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300;
    color: #F0F4FF; line-height: 1.2; margin: 0 0 14px;
    background: linear-gradient(135deg, #F0F4FF 30%, #FFD166 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ap-tagline-sub {
    font-size: 14px; color: #6B84A3; line-height: 1.75; margin: 0;
    font-weight: 300;
  }

  /* Stats */
  .ap-stats-row {
    display: flex; align-items: center; gap: 0;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1);
    border-radius: 14px; padding: 16px 20px;
  }
  .ap-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .ap-stat-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #FFD166;
    letter-spacing: 0.05em; line-height: 1;
  }
  .ap-stat-label { font-family: monospace; font-size: 9px; color: #6B84A3; letter-spacing: 0.2em; text-transform: uppercase; }
  .ap-stat-divider { width: 1px; height: 36px; background: rgba(100,160,255,0.12); flex-shrink: 0; }

  /* Feature pills */
  .ap-features-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .ap-feature-pill {
    display: flex; align-items: center; gap: 10px;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.09);
    border-radius: 10px; padding: 10px 14px;
    font-size: 12.5px; color: rgba(240,244,255,0.65);
    animation: pill-in 0.5s ease-out both;
  }
  @keyframes pill-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .ap-feature-pill:hover {
    border-color: rgba(255,209,102,0.25); color: #F0F4FF;
    background: rgba(255,209,102,0.04); transition: all 0.2s;
  }

  .ap-deco-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,209,102,0.3), transparent);
  }

  /* ── RIGHT PANEL ── */
  .auth-right-panel {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; max-width: 440px; min-width: 0;
  }

  /* Auth Card */
  .auth-card {
    width: 100%;
    background: rgba(12,24,42,0.85); backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(100,160,255,0.12); border-radius: 20px;
    padding: 0; overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,217,0.05);
    position: relative;
  }
  .auth-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #3B82D9, #E74C6F, #2DD4A8, #FFD166);
    background-size: 300% 100%; animation: gradient-slide 4s linear infinite;
  }
  @keyframes gradient-slide { 0% { background-position: 0%; } 100% { background-position: 300%; } }

  /* Tabs */
  .auth-tabs { display: flex; position: relative; border-bottom: 1px solid rgba(100,160,255,0.08); }
  .auth-tab-indicator {
    position: absolute; bottom: 0; left: 0; width: 50%; height: 2px;
    background: linear-gradient(90deg, #FFD166, #E7A233); border-radius: 2px;
  }
  .auth-tab {
    flex: 1; padding: 16px; background: none; border: none; color: #6B84A3;
    font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
    transition: color 0.3s; position: relative; z-index: 1;
  }
  .auth-tab.active { color: #F0F4FF; }
  .auth-tab:hover:not(.active) { color: #a0b4cc; }

  /* Form */
  .auth-form { padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 16px; }
  .auth-field { display: flex; flex-direction: column; gap: 6px; animation: field-enter 0.5s ease-out both; }
  .auth-field:nth-child(1) { animation-delay: 0.05s; }
  .auth-field:nth-child(2) { animation-delay: 0.1s; }
  .auth-field:nth-child(3) { animation-delay: 0.15s; }
  .auth-field:nth-child(4) { animation-delay: 0.2s; }
  .auth-field:nth-child(5) { animation-delay: 0.25s; }
  @keyframes field-enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .auth-label { font-family: monospace; font-size: 10px; font-weight: 700; color: #6B84A3; letter-spacing: 0.15em; text-transform: uppercase; }

  .auth-input-wrap {
    display: flex; align-items: center; gap: 10px;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1);
    border-radius: 12px; padding: 0 14px; transition: all 0.3s;
  }
  .auth-input-wrap.focused {
    background: rgba(100,160,255,0.06); border-color: rgba(74,158,255,0.3);
    box-shadow: 0 0 20px rgba(74,158,255,0.08);
  }
  .auth-input-icon { color: #6B84A3; flex-shrink: 0; transition: color 0.3s; }
  .auth-input-wrap.focused .auth-input-icon { color: #4A9EFF; }
  .auth-input {
    flex: 1; background: none; border: none; outline: none;
    color: #F0F4FF; font-family: 'Lato', sans-serif; font-size: 14px;
    font-weight: 400; padding: 13px 0;
  }
  .auth-input::placeholder { color: rgba(107,132,163,0.5); }
  .auth-eye-btn {
    background: none; border: none; padding: 0; color: #6B84A3;
    cursor: pointer; display: flex; align-items: center; transition: color 0.3s; margin-left: 4px;
  }
  .auth-eye-btn:hover { color: #4A9EFF; }

  .auth-options-row { display: flex; justify-content: space-between; align-items: center; margin-top: -4px; }
  .auth-remember { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #6B84A3; cursor: pointer; user-select: none; }
  .auth-checkbox { display: none; }
  .auth-checkbox-custom { width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid rgba(100,160,255,0.2); display: flex; align-items: center; justify-content: center; transition: all 0.2s; position: relative; }
  .auth-checkbox:checked + .auth-checkbox-custom { border-color: #FFD166; background: #FFD166; }
  .auth-checkbox:checked + .auth-checkbox-custom::after { content: '✓'; color: #070D1A; font-size: 10px; font-weight: 800; }
  .auth-forgot-link { background: none; border: none; color: #4A9EFF; font-family: 'Lato', sans-serif; font-size: 12px; cursor: pointer; transition: color 0.2s; padding: 0; }
  .auth-forgot-link:hover { color: #FFD166; }

  .auth-submit-btn {
    width: 100%; padding: 14px 24px;
    background: linear-gradient(135deg, #FFD166, #E7A233);
    color: #070D1A; font-family: 'Lato', sans-serif; font-size: 13px;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    border: none; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.3s; margin-top: 4px; position: relative; overflow: hidden;
  }
  .auth-submit-btn:hover { box-shadow: 0 8px 30px rgba(255,209,102,0.3), 0 0 60px rgba(255,209,102,0.1); transform: translateY(-1px); }
  .auth-submit-btn:active { transform: translateY(0) scale(0.98); }

  .auth-divider { display: flex; align-items: center; gap: 14px; }
  .auth-divider-line { flex: 1; height: 1px; background: rgba(100,160,255,0.1); }
  .auth-divider-text { font-size: 11px; color: #6B84A3; white-space: nowrap; }

  .auth-social-row { display: flex; gap: 12px; }
  .auth-social-btn {
    flex: 1; padding: 11px 16px;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1);
    border-radius: 10px; color: #F0F4FF; font-family: 'Lato', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s;
  }
  .auth-social-btn:hover { border-color: rgba(100,160,255,0.25); background: rgba(100,160,255,0.08); transform: translateY(-1px); }

  .auth-footer-text { font-size: 13px; color: #6B84A3; margin-top: 20px; text-align: center; }
  .auth-footer-link {
    background: none; border: none; color: #FFD166; font-family: 'Lato', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; padding: 0; transition: color 0.2s;
    text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,209,102,0.3);
  }
  .auth-footer-link:hover { color: #ffe08a; text-decoration-color: rgba(255,209,102,0.8); }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .auth-content-wrapper { flex-direction: column; padding: 32px 20px; gap: 28px; max-width: 480px; }
    .auth-left-panel { width: 100%; }
    .ap-tagline-main { font-size: 28px; }
    .ap-features-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 500px) {
    .auth-content-wrapper { padding: 24px 16px; }
    .auth-right-panel { max-width: 100%; }
    .auth-form { padding: 20px 20px 24px; }
    .ap-features-grid { grid-template-columns: 1fr; }
    .ap-tagline-main { font-size: 24px; }
  }
`;
