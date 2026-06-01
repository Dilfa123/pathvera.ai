import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

/* ================================================================
   AUTHPAGE — Interactive Penguin Login / Sign-Up
   ================================================================
   Three SVG penguins react to user interactions:
   • Username/Name: pupils turn toward form, heads tilt, question marks float
   • Password: penguins look away politely
   • Idle: continuous bobbing, snow particles, star rotation, random waves
   • Tab switch: center penguin waves welcomingly
   ================================================================ */

// ─── SVG Penguin Component ─────────────────────────────────────
function Penguin({ id, hatColor, scarfColor, pupilRef, headRef, bodyRef, flipperLeftRef, flipperRightRef, questionRef, style }) {
  return (
    <svg viewBox="0 0 160 220" width="160" height="220" style={style} id={id}>
      {/* Body */}
      <g ref={bodyRef}>
        {/* Shadow */}
        <ellipse cx="80" cy="210" rx="40" ry="8" fill="rgba(0,0,0,0.2)" />

        {/* Main body */}
        <ellipse cx="80" cy="140" rx="52" ry="65" fill="#1a1a2e" />
        {/* Belly */}
        <ellipse cx="80" cy="148" rx="36" ry="50" fill="#e8e8f0" />

        {/* Feet */}
        <ellipse cx="60" cy="200" rx="16" ry="8" fill="#FF8C42" transform="rotate(-10 60 200)" />
        <ellipse cx="100" cy="200" rx="16" ry="8" fill="#FF8C42" transform="rotate(10 100 200)" />

        {/* Left flipper */}
        <g ref={flipperLeftRef} style={{ transformOrigin: '30px 130px' }}>
          <path d="M28 120 Q10 140 22 170 Q28 172 34 160 Q38 140 32 120Z" fill="#1a1a2e" />
        </g>

        {/* Right flipper */}
        <g ref={flipperRightRef} style={{ transformOrigin: '130px 130px' }}>
          <path d="M132 120 Q150 140 138 170 Q132 172 126 160 Q122 140 128 120Z" fill="#1a1a2e" />
        </g>

        {/* Head group */}
        <g ref={headRef} style={{ transformOrigin: '80px 85px' }}>
          {/* Head base */}
          <ellipse cx="80" cy="80" rx="42" ry="38" fill="#1a1a2e" />

          {/* Face patch */}
          <ellipse cx="80" cy="84" rx="30" ry="26" fill="#e8e8f0" />

          {/* Left eye white */}
          <ellipse cx="66" cy="76" rx="12" ry="13" fill="white" />
          {/* Right eye white */}
          <ellipse cx="94" cy="76" rx="12" ry="13" fill="white" />

          {/* Left pupil */}
          <g ref={pupilRef}>
            <circle cx="66" cy="78" r="6" fill="#1a1a2e" />
            <circle cx="64" cy="76" r="2" fill="white" />
            <circle cx="94" cy="78" r="6" fill="#1a1a2e" />
            <circle cx="92" cy="76" r="2" fill="white" />
          </g>

          {/* Beak */}
          <path d="M72 88 L80 98 L88 88 Q80 92 72 88Z" fill="#FF8C42" />

          {/* Blush spots */}
          <ellipse cx="54" cy="88" rx="7" ry="4" fill="rgba(255,140,100,0.25)" />
          <ellipse cx="106" cy="88" rx="7" ry="4" fill="rgba(255,140,100,0.25)" />

          {/* Hat */}
          <path d={`M42 68 Q42 30 80 25 Q118 30 118 68`} fill={hatColor} />
          <rect x="38" y="62" width="84" height="10" rx="5" fill={hatColor} opacity="0.9" />
          {/* Hat band */}
          <rect x="38" y="66" width="84" height="4" rx="2" fill={scarfColor} opacity="0.6" />
          {/* Pompom */}
          <circle cx="80" cy="22" r="10" fill={scarfColor} />
          <circle cx="76" cy="19" r="3" fill="rgba(255,255,255,0.3)" />

          {/* Scarf */}
          <path d="M46 100 Q80 115 114 100 Q114 108 80 118 Q46 108 46 100Z" fill={scarfColor} />
          <path d="M85 112 Q90 130 82 140 Q78 142 76 135 Q74 125 78 112Z" fill={scarfColor} opacity="0.8" />
          {/* Scarf plaid lines */}
          <line x1="55" y1="104" x2="55" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="70" y1="107" x2="70" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="90" y1="107" x2="90" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="105" y1="104" x2="105" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        </g>

        {/* Question mark (hidden by default) */}
        <g ref={questionRef} opacity="0" style={{ transformOrigin: '120px 30px' }}>
          <text x="120" y="35" fontSize="24" fill="#FFD166" fontWeight="bold" fontFamily="'Cormorant Garamond', serif">?</text>
        </g>
      </g>
    </svg>
  );
}


// ─── Snow Particle Component ───────────────────────────────────
function SnowParticles({ count = 30 }) {
  const particles = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    particles.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 30,
    }));

    if (containerRef.current) {
      const dots = containerRef.current.querySelectorAll('.snow-dot');
      dots.forEach((dot, i) => {
        const p = particles.current[i];
        gsap.set(dot, { x: `${p.x}%`, y: `${p.y}%`, opacity: p.opacity });
        gsap.to(dot, {
          y: '110%',
          x: `+=${p.drift}`,
          opacity: 0,
          duration: p.speed,
          delay: p.delay,
          repeat: -1,
          ease: 'none',
          onRepeat: () => {
            gsap.set(dot, { y: '-5%', x: `${Math.random() * 100}%`, opacity: p.opacity });
          }
        });
      });
    }
  }, [count]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="snow-dot" style={{
          position: 'absolute',
          width: `${(particles.current[i]?.size || 2)}px`,
          height: `${(particles.current[i]?.size || 2)}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(200, 220, 255, 0.6)',
          filter: 'blur(0.5px)',
        }} />
      ))}
    </div>
  );
}


// ─── Rotating Stars Background ─────────────────────────────────
function StarsBackground() {
  const starsRef = useRef(null);

  useEffect(() => {
    if (starsRef.current) {
      gsap.to(starsRef.current, { rotation: 360, duration: 120, repeat: -1, ease: 'none' });
    }
  }, []);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    cx: Math.random() * 800,
    cy: Math.random() * 500,
    r: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <svg ref={starsRef} viewBox="0 0 800 500" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0,
    }}>
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
      ))}
    </svg>
  );
}


// ─── Main Auth Page ────────────────────────────────────────────
export default function AuthPage({ onAuthComplete, onBack }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const prevTabRef = useRef(activeTab);

  // Penguin refs — left
  const leftPupilRef = useRef(null);
  const leftHeadRef = useRef(null);
  const leftBodyRef = useRef(null);
  const leftFlipperLeftRef = useRef(null);
  const leftFlipperRightRef = useRef(null);
  const leftQuestionRef = useRef(null);

  // Penguin refs — center
  const centerPupilRef = useRef(null);
  const centerHeadRef = useRef(null);
  const centerBodyRef = useRef(null);
  const centerFlipperLeftRef = useRef(null);
  const centerFlipperRightRef = useRef(null);
  const centerQuestionRef = useRef(null);

  // Penguin refs — right
  const rightPupilRef = useRef(null);
  const rightHeadRef = useRef(null);
  const rightBodyRef = useRef(null);
  const rightFlipperLeftRef = useRef(null);
  const rightFlipperRightRef = useRef(null);
  const rightQuestionRef = useRef(null);

  const formCardRef = useRef(null);
  const penguinContainerRef = useRef(null);
  const tabIndicatorRef = useRef(null);

  // Track last wave animation to avoid overlap
  const lastWaveRef = useRef(0);

  // All penguin refs in arrays for easy iteration
  const allPupils = [leftPupilRef, centerPupilRef, rightPupilRef];
  const allHeads = [leftHeadRef, centerHeadRef, rightHeadRef];
  const allFlipperLefts = [leftFlipperLeftRef, centerFlipperLeftRef, rightFlipperLeftRef];
  const allFlipperRights = [leftFlipperRightRef, centerFlipperRightRef, rightFlipperRightRef];
  const allQuestions = [leftQuestionRef, centerQuestionRef, rightQuestionRef];

  // ─── IDLE BOBBING ──────────────────────────────────────
  useEffect(() => {
    const bodies = [leftBodyRef, centerBodyRef, rightBodyRef];
    bodies.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: -8,
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4, // Center penguin (i=1) delayed
        });
      }
    });
  }, []);

  // ─── IDLE RANDOM WAVES & GLANCES ───────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      if (focusedField) return; // Don't do random stuff while user is typing

      const now = Date.now();
      if (now - lastWaveRef.current < 3000) return;
      lastWaveRef.current = now;

      const action = Math.random();
      const penguinIdx = Math.floor(Math.random() * 3);
      const flipper = Math.random() > 0.5 ? allFlipperRights[penguinIdx] : allFlipperLefts[penguinIdx];
      const isRight = flipper === allFlipperRights[penguinIdx];

      if (action < 0.5 && flipper.current) {
        // Wave a flipper
        const tl = gsap.timeline();
        tl.to(flipper.current, { rotation: isRight ? -30 : 30, duration: 0.3, ease: 'power2.out' })
          .to(flipper.current, { rotation: isRight ? -15 : 15, duration: 0.2, ease: 'sine.inOut' })
          .to(flipper.current, { rotation: isRight ? -30 : 30, duration: 0.2, ease: 'sine.inOut' })
          .to(flipper.current, { rotation: 0, duration: 0.4, ease: 'power2.inOut' });
      } else if (allHeads[penguinIdx].current) {
        // Random glance
        const glanceX = (Math.random() - 0.5) * 8;
        const tl = gsap.timeline();
        tl.to(allHeads[penguinIdx].current, { rotation: glanceX, duration: 0.5, ease: 'power2.out' })
          .to(allHeads[penguinIdx].current, { rotation: 0, duration: 0.8, ease: 'power2.inOut', delay: 0.5 });
        if (allPupils[penguinIdx].current) {
          tl.to(allPupils[penguinIdx].current, { x: glanceX > 0 ? 3 : -3, duration: 0.4, ease: 'power2.out' }, 0)
            .to(allPupils[penguinIdx].current, { x: 0, duration: 0.5, ease: 'power2.inOut' }, '>0.5');
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [focusedField]);

  // ─── PUPILS LOOK AT FORM (username/name/email) ─────────
  const lookAtForm = useCallback(() => {
    allPupils.forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, { x: 4, y: 2, duration: 0.4, ease: 'power2.out' });
      }
    });
    // Tilt heads curiously
    allHeads.forEach((ref, i) => {
      if (ref.current) {
        const tilt = i === 0 ? 8 : i === 1 ? -5 : 10;
        gsap.to(ref.current, { rotation: tilt, duration: 0.5, ease: 'back.out(1.5)' });
      }
    });
    // Show question marks floating up
    allQuestions.forEach((ref, i) => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        gsap.set(ref.current, { opacity: 0, y: 0 });
        gsap.to(ref.current, {
          opacity: 0.8,
          y: -15,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.15,
        });
        // Float and fade
        gsap.to(ref.current, {
          y: -30,
          opacity: 0,
          duration: 2,
          ease: 'power1.out',
          delay: 1.2 + i * 0.15,
          repeat: -1,
          repeatDelay: 2.5,
          onRepeat: () => {
            gsap.set(ref.current, { y: 0, opacity: 0 });
          }
        });
      }
    });
  }, []);

  // ─── PUPILS LOOK AWAY (password) ───────────────────────
  const lookAway = useCallback(() => {
    // Each penguin looks in a different direction
    const directions = [
      { x: -6, y: -5, rot: -15 },  // Left penguin looks left+up
      { x: 0, y: -7, rot: 0 },     // Center penguin looks straight up
      { x: 6, y: -5, rot: 15 },    // Right penguin looks right+up
    ];

    directions.forEach((dir, i) => {
      if (allPupils[i].current) {
        gsap.to(allPupils[i].current, { x: dir.x, y: dir.y, duration: 0.3, ease: 'power2.out' });
      }
      if (allHeads[i].current) {
        gsap.to(allHeads[i].current, { rotation: dir.rot, duration: 0.4, ease: 'back.out(1.5)' });
      }
    });

    // Hide question marks
    allQuestions.forEach((ref) => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        gsap.to(ref.current, { opacity: 0, duration: 0.3 });
      }
    });
  }, []);

  // ─── RESET TO IDLE ─────────────────────────────────────
  const resetToIdle = useCallback(() => {
    allPupils.forEach((ref) => {
      if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    });
    allHeads.forEach((ref) => {
      if (ref.current) gsap.to(ref.current, { rotation: 0, duration: 0.5, ease: 'power2.out' });
    });
    allQuestions.forEach((ref) => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        gsap.to(ref.current, { opacity: 0, duration: 0.3 });
      }
    });
  }, []);

  // ─── FLIPPER WAVE ON EVERY 5 CHARS ─────────────────────
  useEffect(() => {
    if (charCount > 0 && charCount % 5 === 0 && focusedField && focusedField !== 'password' && focusedField !== 'confirmPassword') {
      allFlipperRights.forEach((ref, i) => {
        if (ref.current) {
          const tl = gsap.timeline();
          tl.to(ref.current, { rotation: -35, duration: 0.2, ease: 'power2.out', delay: i * 0.08 })
            .to(ref.current, { rotation: -15, duration: 0.15, ease: 'sine.inOut' })
            .to(ref.current, { rotation: -35, duration: 0.15, ease: 'sine.inOut' })
            .to(ref.current, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        }
      });
    }
  }, [charCount, focusedField]);

  // ─── REACT TO FOCUS CHANGES ────────────────────────────
  useEffect(() => {
    if (!focusedField) {
      resetToIdle();
      return;
    }
    if (focusedField === 'password' || focusedField === 'confirmPassword') {
      lookAway();
    } else {
      lookAtForm();
    }
  }, [focusedField, lookAtForm, lookAway, resetToIdle]);

  // ─── TAB SWITCH — CENTER PENGUIN WAVES ─────────────────
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      // Center penguin welcome wave
      if (centerFlipperRightRef.current) {
        const tl = gsap.timeline();
        tl.to(centerFlipperRightRef.current, { rotation: -40, duration: 0.25, ease: 'power2.out' })
          .to(centerFlipperRightRef.current, { rotation: -15, duration: 0.15, ease: 'sine.inOut' })
          .to(centerFlipperRightRef.current, { rotation: -40, duration: 0.15, ease: 'sine.inOut' })
          .to(centerFlipperRightRef.current, { rotation: -15, duration: 0.15, ease: 'sine.inOut' })
          .to(centerFlipperRightRef.current, { rotation: 0, duration: 0.35, ease: 'power2.inOut' });
      }
      // Smooth tab indicator slide
      if (tabIndicatorRef.current) {
        gsap.to(tabIndicatorRef.current, {
          x: activeTab === 'signin' ? 0 : '100%',
          duration: 0.4,
          ease: 'power3.inOut',
        });
      }
      // Card entrance anim
      if (formCardRef.current) {
        gsap.fromTo(formCardRef.current,
          { opacity: 0.6, y: 15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    }
  }, [activeTab]);

  // ─── FORM HANDLERS ─────────────────────────────────────
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field !== 'password' && field !== 'confirmPassword') {
      setCharCount(prev => {
        const newCount = value.length;
        return newCount;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Celebration animation
    allFlipperLefts.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, { rotation: 30, duration: 0.3, delay: i * 0.1, yoyo: true, repeat: 3, ease: 'sine.inOut' });
      }
    });
    allFlipperRights.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, { rotation: -30, duration: 0.3, delay: i * 0.1, yoyo: true, repeat: 3, ease: 'sine.inOut' });
      }
    });

    setTimeout(() => {
      if (onAuthComplete) onAuthComplete();
    }, 1500);
  };

  const isSignIn = activeTab === 'signin';

  return (
    <div className="auth-page-container">
      <style dangerouslySetInnerHTML={{ __html: authStyles }} />

      {/* Background */}
      <div className="auth-bg-gradient" />
      <StarsBackground />
      <SnowParticles count={35} />

      {/* Ambient glow orbs */}
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

      {/* Main content — horizontal layout */}
      <div className="auth-content-wrapper">
        {/* LEFT SIDE — Penguins */}
        <div className="auth-left-panel">
          <div className="auth-logo-section">
            <h1 className="auth-logo-title">Pathvera<span className="auth-logo-dot" />ai</h1>
            <p className="auth-logo-subtitle">FUTURE-PROOF YOUR LEGACY</p>
          </div>

          <div className="penguin-stage" ref={penguinContainerRef}>
            {/* Top penguin */}
            <Penguin
              id="penguin-left"
              hatColor="#3B82D9"
              scarfColor="#E74C6F"
              pupilRef={leftPupilRef}
              headRef={leftHeadRef}
              bodyRef={leftBodyRef}
              flipperLeftRef={leftFlipperLeftRef}
              flipperRightRef={leftFlipperRightRef}
              questionRef={leftQuestionRef}
              style={{ transform: 'scale(0.7)' }}
            />
            {/* Center penguin (larger) */}
            <Penguin
              id="penguin-center"
              hatColor="#E74C6F"
              scarfColor="#3B82D9"
              pupilRef={centerPupilRef}
              headRef={centerHeadRef}
              bodyRef={centerBodyRef}
              flipperLeftRef={centerFlipperLeftRef}
              flipperRightRef={centerFlipperRightRef}
              questionRef={centerQuestionRef}
              style={{ transform: 'scale(0.85)', zIndex: 2 }}
            />
            {/* Bottom penguin */}
            <Penguin
              id="penguin-right"
              hatColor="#2DD4A8"
              scarfColor="#FFD166"
              pupilRef={rightPupilRef}
              headRef={rightHeadRef}
              bodyRef={rightBodyRef}
              flipperLeftRef={rightFlipperLeftRef}
              flipperRightRef={rightFlipperRightRef}
              questionRef={rightQuestionRef}
              style={{ transform: 'scale(0.7)' }}
            />
          </div>

          <p className="auth-tagline">Your friendly guardians are watching over your journey ✨</p>
        </div>

        {/* RIGHT SIDE — Form */}
        <div className="auth-right-panel">
          <div className="auth-card" ref={formCardRef}>
            {/* Tab switcher */}
            <div className="auth-tabs">
              <div className="auth-tab-indicator" ref={tabIndicatorRef} />
              <button
                className={`auth-tab ${isSignIn ? 'active' : ''}`}
                onClick={() => setActiveTab('signin')}
                id="tab-signin"
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${!isSignIn ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
                id="tab-signup"
              >
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
                    <input
                      id="auth-name"
                      type="text"
                      className="auth-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-email">
                  {isSignIn ? 'Email or Username' : 'Email Address'}
                </label>
                <div className={`auth-input-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="auth-email"
                    type="text"
                    className="auth-input"
                    placeholder={isSignIn ? 'email@example.com' : 'your@email.com'}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {!isSignIn && (
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-username">Username</label>
                  <div className={`auth-input-wrap ${focusedField === 'username' ? 'focused' : ''}`}>
                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                    <input
                      id="auth-username"
                      type="text"
                      className="auth-input"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="username"
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-password">Password</label>
                <div className={`auth-input-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete={isSignIn ? 'current-password' : 'new-password'}
                  />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
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
                    <input
                      id="auth-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="new-password"
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                      {showConfirmPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
                        </svg>
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
                <div className="auth-divider">
                  <span className="auth-divider-line" />
                  <span className="auth-divider-text">or continue with</span>
                  <span className="auth-divider-line" />
                </div>
              )}

              {isSignIn && (
                <div className="auth-social-row">
                  <button type="button" className="auth-social-btn" id="social-google">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <p className="auth-footer-text">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="auth-footer-link"
              onClick={() => setActiveTab(isSignIn ? 'signup' : 'signin')}
              id="auth-toggle-mode"
            >
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
  .auth-page-container {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: #060c18;
    color: #F0F4FF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .auth-back-btn {
    position: fixed;
    top: 24px;
    left: 24px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(12, 24, 42, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(100, 160, 255, 0.12);
    border-radius: 10px;
    color: #6B84A3;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 18px 10px 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .auth-back-btn:hover {
    color: #FFD166;
    border-color: rgba(255, 209, 102, 0.3);
    background: rgba(12, 24, 42, 0.8);
  }

  .auth-bg-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 20%, rgba(59, 130, 217, 0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 80%, rgba(231, 76, 111, 0.05) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 70%, rgba(45, 212, 168, 0.04) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .auth-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
    animation: orb-float 12s ease-in-out infinite alternate;
  }
  .auth-orb-1 {
    width: 300px; height: 300px;
    top: 5%; left: 10%;
    background: rgba(59, 130, 217, 0.12);
    animation-delay: 0s;
  }
  .auth-orb-2 {
    width: 250px; height: 250px;
    bottom: 10%; right: 15%;
    background: rgba(255, 209, 102, 0.08);
    animation-delay: -4s;
  }
  .auth-orb-3 {
    width: 200px; height: 200px;
    top: 50%; left: 60%;
    background: rgba(45, 212, 168, 0.06);
    animation-delay: -8s;
  }

  @keyframes orb-float {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -20px) scale(1.1); }
    100% { transform: translate(-20px, 15px) scale(0.95); }
  }

  /* ─── HORIZONTAL LAYOUT ──────────────────────── */
  .auth-content-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 960px;
    padding: 30px 40px;
    gap: 50px;
  }

  /* LEFT PANEL — Penguins */
  .auth-left-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 320px;
    gap: 8px;
  }

  /* RIGHT PANEL — Form */
  .auth-right-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 440px;
    min-width: 0;
  }

  /* Logo */
  .auth-logo-section {
    text-align: center;
    margin-bottom: 16px;
  }
  .auth-logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #F0F4FF;
    letter-spacing: 0.12em;
    margin: 0;
  }
  .auth-logo-dot {
    display: inline-block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background-color: #FFD166;
    box-shadow: 0 0 12px rgba(255,209,102,0.6);
    vertical-align: middle;
    margin: 0 2px;
  }
  .auth-logo-subtitle {
    font-family: monospace;
    font-size: 9px;
    font-weight: 700;
    color: #FFD166;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    margin-top: 6px;
    margin-bottom: 0;
  }

  /* Penguin stage — vertical stack on left */
  .penguin-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 3;
    gap: 0;
    margin: 0;
  }
  .penguin-stage svg {
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4));
    transition: filter 0.3s ease;
  }

  /* Tagline below penguins */
  .auth-tagline {
    font-size: 12px;
    color: #6B84A3;
    text-align: center;
    margin: 12px 0 0 0;
    line-height: 1.6;
    font-style: italic;
    opacity: 0.7;
  }

  /* Auth Card */
  .auth-card {
    width: 100%;
    background: rgba(12, 24, 42, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(100, 160, 255, 0.12);
    border-radius: 20px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,217,0.05);
    position: relative;
  }
  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3B82D9, #E74C6F, #2DD4A8, #FFD166);
    background-size: 300% 100%;
    animation: gradient-slide 4s linear infinite;
  }

  @keyframes gradient-slide {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }

  /* Tabs */
  .auth-tabs {
    display: flex;
    position: relative;
    border-bottom: 1px solid rgba(100, 160, 255, 0.08);
  }
  .auth-tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, #FFD166, #E74C6F);
    border-radius: 2px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .auth-tab {
    flex: 1;
    padding: 16px;
    background: none;
    border: none;
    color: #6B84A3;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
  }
  .auth-tab.active {
    color: #F0F4FF;
  }
  .auth-tab:hover:not(.active) {
    color: #a0b4cc;
  }

  /* Form */
  .auth-form {
    padding: 24px 28px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .auth-label {
    font-family: monospace;
    font-size: 10px;
    font-weight: 700;
    color: #6B84A3;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .auth-input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(100, 160, 255, 0.04);
    border: 1px solid rgba(100, 160, 255, 0.1);
    border-radius: 12px;
    padding: 0 14px;
    transition: all 0.3s ease;
    position: relative;
  }
  .auth-input-wrap::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 12px;
    border: 1.5px solid transparent;
    pointer-events: none;
    transition: border-color 0.3s ease;
  }
  .auth-input-wrap.focused {
    background: rgba(100, 160, 255, 0.06);
    border-color: rgba(74, 158, 255, 0.3);
    box-shadow: 0 0 20px rgba(74, 158, 255, 0.08);
  }
  .auth-input-wrap.focused::after {
    border-color: rgba(74, 158, 255, 0.15);
  }

  .auth-input-icon {
    color: #6B84A3;
    flex-shrink: 0;
    transition: color 0.3s ease;
  }
  .auth-input-wrap.focused .auth-input-icon {
    color: #4A9EFF;
  }

  .auth-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: #F0F4FF;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 400;
    padding: 13px 0;
    letter-spacing: 0.01em;
  }
  .auth-input::placeholder {
    color: rgba(107, 132, 163, 0.5);
  }

  .auth-eye-btn {
    background: none;
    border: none;
    padding: 0;
    color: #6B84A3;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
    margin-left: 4px;
  }
  .auth-eye-btn:hover {
    color: #4A9EFF;
  }

  /* Options row */
  .auth-options-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -4px;
  }
  .auth-remember {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #6B84A3;
    cursor: pointer;
    user-select: none;
  }
  .auth-checkbox {
    display: none;
  }
  .auth-checkbox-custom {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1.5px solid rgba(100, 160, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    position: relative;
  }
  .auth-checkbox:checked + .auth-checkbox-custom {
    border-color: #FFD166;
    background: #FFD166;
  }
  .auth-checkbox:checked + .auth-checkbox-custom::after {
    content: '✓';
    color: #070D1A;
    font-size: 10px;
    font-weight: 800;
  }
  .auth-forgot-link {
    background: none;
    border: none;
    color: #4A9EFF;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 0;
  }
  .auth-forgot-link:hover {
    color: #FFD166;
  }

  /* Submit button */
  .auth-submit-btn {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, #FFD166, #E7A233);
    color: #070D1A;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
    margin-top: 4px;
    position: relative;
    overflow: hidden;
  }
  .auth-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .auth-submit-btn:hover {
    box-shadow: 0 8px 30px rgba(255, 209, 102, 0.3), 0 0 60px rgba(255, 209, 102, 0.1);
    transform: translateY(-1px);
  }
  .auth-submit-btn:hover::before {
    opacity: 1;
  }
  .auth-submit-btn:active {
    transform: translateY(0) scale(0.98);
  }

  /* Divider */
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .auth-divider-line {
    flex: 1;
    height: 1px;
    background: rgba(100, 160, 255, 0.1);
  }
  .auth-divider-text {
    font-size: 11px;
    color: #6B84A3;
    white-space: nowrap;
  }

  /* Social buttons */
  .auth-social-row {
    display: flex;
    gap: 12px;
  }
  .auth-social-btn {
    flex: 1;
    padding: 11px 16px;
    background: rgba(100, 160, 255, 0.04);
    border: 1px solid rgba(100, 160, 255, 0.1);
    border-radius: 10px;
    color: #F0F4FF;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
  }
  .auth-social-btn:hover {
    border-color: rgba(100, 160, 255, 0.25);
    background: rgba(100, 160, 255, 0.08);
    transform: translateY(-1px);
  }

  /* Footer */
  .auth-footer-text {
    font-size: 13px;
    color: #6B84A3;
    margin-top: 20px;
    text-align: center;
  }
  .auth-footer-link {
    background: none;
    border: none;
    color: #FFD166;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s ease;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(255,209,102,0.3);
  }
  .auth-footer-link:hover {
    color: #ffe08a;
    text-decoration-color: rgba(255,209,102,0.8);
  }

  /* ─── RESPONSIVE — stack vertically on narrow screens ─── */
  @media (max-width: 820px) {
    .auth-content-wrapper {
      flex-direction: column;
      padding: 30px 20px;
      gap: 10px;
      max-width: 440px;
    }
    .auth-left-panel {
      width: 100%;
    }
    .penguin-stage {
      flex-direction: row;
      margin-bottom: -10px;
    }
    .auth-tagline {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .auth-content-wrapper {
      padding: 20px 16px;
    }
    .auth-right-panel {
      max-width: 100%;
    }
    .auth-form {
      padding: 20px 20px 24px;
    }
    .penguin-stage svg {
      width: 110px;
      height: auto;
    }
  }

  /* Animation for field entry */
  .auth-field {
    animation: field-enter 0.5s ease-out both;
  }
  .auth-field:nth-child(1) { animation-delay: 0.05s; }
  .auth-field:nth-child(2) { animation-delay: 0.1s; }
  .auth-field:nth-child(3) { animation-delay: 0.15s; }
  .auth-field:nth-child(4) { animation-delay: 0.2s; }
  .auth-field:nth-child(5) { animation-delay: 0.25s; }

  @keyframes field-enter {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
