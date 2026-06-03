
import React, { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Step Flows ────────────────────────────────────────────────
const STEP_FLOWS = {
  student:      ['IDENTITY', 'DEPARTMENT', 'OBJECTIVES', 'CURATIONS', 'FINALIZE'],
  fresher:      ['IDENTITY', 'OBJECTIVES', 'CURATIONS', 'FINALIZE'],
  professional: ['IDENTITY', 'OBJECTIVES', 'CURATIONS', 'FINALIZE'],
  default:      ['IDENTITY', 'OBJECTIVES', 'CURATIONS', 'FINALIZE'],
};

const STEP_DISPLAY = {
  IDENTITY: 'IDENTITY',
  DEPARTMENT: 'DEPT',
  OBJECTIVES: 'OBJECTIVES',
  CURATIONS: 'CURATIONS',
  FINALIZE: 'FINALIZE',
};

// ─── Departments ────────────────────────────────────────────────
const DEPARTMENTS = [
  { id: 'cs',           icon: '🖥️',  label: 'Computer Science & IT',     desc: 'Software, AI, Cybersecurity, Data Science' },
  { id: 'engineering',  icon: '⚙️',  label: 'Engineering',               desc: 'Mechanical, Civil, Electrical, Chemical' },
  { id: 'medicine',     icon: '🏥',  label: 'Medicine & Healthcare',      desc: 'MBBS, Nursing, Pharmacy, Biotech' },
  { id: 'law',          icon: '⚖️',  label: 'Law & Legal Studies',        desc: 'Corporate, Criminal, IP, International' },
  { id: 'business',     icon: '📊',  label: 'Business & Commerce',        desc: 'MBA, Finance, Marketing, Entrepreneurship' },
  { id: 'arts',         icon: '🎨',  label: 'Arts & Design',              desc: 'Fine Arts, Graphic Design, UX/UI, Film' },
  { id: 'architecture', icon: '📐',  label: 'Architecture',               desc: 'Urban Planning, Interior, Landscape' },
  { id: 'sciences',     icon: '🔬',  label: 'Pure Sciences',              desc: 'Physics, Chemistry, Mathematics, Biology' },
];

// ─── Objectives ─────────────────────────────────────────────────
const OBJECTIVES = {
  student: [
    { id: 'grad',       title: 'Elite Graduate Launchpad',       desc: 'Secure admission to Tier-1 / Ivy League or specialized graduate tracks.' },
    { id: 'intern',     title: 'Top-Tier Internships',           desc: 'Accelerate entry into high-barrier programs (Big Tech, Quant, VC).' },
    { id: 'research',   title: 'Academic Research & Ventures',   desc: 'Position yourself for publishing, labs, or deep-tech founding.' },
    { id: 'mentorship', title: 'Fast-Track Professional Growth', desc: 'Match with domain leaders for high-impact advisory and project sponsorships.' },
  ],
  fresher: [
    { id: 'firstjob',  title: 'Land First Tech / Business Role', desc: 'Break into Software, Data, Finance, or Product with AI-crafted application strategies.' },
    { id: 'upskill',   title: 'Accelerated Skill Stack',         desc: 'Build the exact certifications and projects top hiring managers look for in 2025.' },
    { id: 'network',   title: 'Industry Network Entry',          desc: 'Get warm introductions through alumni networks and referral acceleration programs.' },
    { id: 'salary',    title: 'Maximize Starting Package',       desc: 'Negotiate your first offer with real-time market data and proven frameworks.' },
  ],
  professional: [
    { id: 'leadership', title: 'Strategic Leadership Transition', desc: 'Shift from technical positions to director, VP, or C-suite roles.' },
    { id: 'deeptech',   title: 'AI & Deep Tech Pivot',            desc: 'Re-align capabilities to dominate machine learning, robotics, or frontier systems.' },
    { id: 'startup',    title: 'High-Growth Startup Founding',    desc: 'Venture initialization, cap table structuring, and seed preparation.' },
    { id: 'board',      title: 'Board Placement & Compensation',  desc: 'Maximize market equity capture, board representation, and strategic leverage.' },
  ],
};

// ─── Curations ──────────────────────────────────────────────────
const CURATIONS = [
  { key: 'legacy', label: '🎯 Legacy Vision Blueprint',      desc: 'Tailored industry vectors matching your 10-year target horizon.' },
  { key: 'skills', label: '🧠 AI Skill-Mapping Engine',      desc: 'Daily gap analysis against top 0.1% performers in your field.' },
  { key: 'network',label: '🤝 Industry Elite Network Access', desc: 'Vetted introduction channels to advisors, founders, and investors.' },
  { key: 'comp',   label: '📈 Compensation Arbitrage System', desc: 'Real-time equity and base structure intelligence.' },
];

// ─── Identity Cards Data ─────────────────────────────────────────
const IDENTITIES = [
  {
    role: 'student',
    emoji: '🎓',
    title: "I'm a Student",
    desc: "Navigating academia towards an elite professional launchpad and top graduate programs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M6 12.5v5a6 6 0 0 0 12 0v-5" />
        <path d="M21.5 12v6" />
      </svg>
    ),
  },
  {
    role: 'fresher',
    emoji: '🌱',
    title: "I'm a Fresher",
    desc: "Recently graduated (0–2 yrs). Ready to break into my first professional role with AI-matched jobs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 3c0 5 3 9 9 9" /><path d="M12 12c0-5 4-8 9-9c0 5-3 9-9 9" />
      </svg>
    ),
  },
  {
    role: 'professional',
    emoji: '💼',
    title: "I'm a Professional",
    desc: "2+ years of experience. Architecting a transition to industry dominance, leadership, or pivot.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
      </svg>
    ),
  },
];

export default function OnboardingFlow({ onCompleteOnboarding, isAuthenticated, onNavigateToAuth, onLogout }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [curations, setCurations] = useState({ legacy: true, skills: true, network: false, comp: false });
  const [isFinalized, setIsFinalized] = useState(false);
  const [currentStep, setCurrentStep] = useState('IDENTITY');
  const [renderedStep, setRenderedStep] = useState('IDENTITY');
  const [renderedFinalized, setRenderedFinalized] = useState(false);

  const stepContentRef = useRef(null);
  const stepperActiveRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const isTransitioningRef = useRef(false);

  // ── Helpers ──
  const getFlow = (role) => STEP_FLOWS[role] || STEP_FLOWS.default;
  const currentFlow = getFlow(selectedRole);
  const currentIdx = currentFlow.indexOf(currentStep);
  const totalSteps = currentFlow.length;

  // ── Background blobs ──
  useEffect(() => {
    gsap.to(blob1Ref.current, { x: 30, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2Ref.current, { x: -30, y: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob3Ref.current, { x: 20, y: 30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  // ── Entrance ──
  useEffect(() => {
    gsap.fromTo(stepContentRef.current,
      { opacity: 0, y: 80, rotateX: 12 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power4.out' }
    );
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // ── Progress bar ──
  useEffect(() => {
    if (stepperActiveRef.current) {
      const pct = totalSteps <= 1 ? 0 : (currentIdx / (totalSteps - 1)) * 88;
      gsap.to(stepperActiveRef.current, { width: `${pct}%`, duration: 0.6, ease: 'power2.out' });
    }
  }, [currentStep, selectedRole]);

  // ── Card interactions ──
  const cardEnter = (e) => gsap.to(e.currentTarget, { scale: 1.03, borderColor: '#FFD166', duration: 0.2, overwrite: 'auto' });
  const cardLeave = (e) => gsap.to(e.currentTarget, { scale: 1, borderColor: '', duration: 0.2, overwrite: 'auto' });
  const cardClick = (e, cb) => {
    const tl = gsap.timeline({ onComplete: cb });
    tl.to(e.currentTarget, { backgroundColor: 'rgba(255,209,102,0.15)', duration: 0.15 })
      .to(e.currentTarget, { backgroundColor: '', duration: 0.25 });
  };
  const btnEnter = (e) => { if (!e.currentTarget.disabled) gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, overwrite: 'auto' }); };
  const btnLeave = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2, overwrite: 'auto' });
  const btnClick = (e, cb) => {
    if (e.currentTarget.disabled) return;
    const tl = gsap.timeline({ onComplete: cb });
    tl.to(e.currentTarget, { scale: 0.97, duration: 0.1 }).to(e.currentTarget, { scale: 1.04, duration: 0.35, ease: 'back.out(1.7)' });
  };

  // ── Step transition ──
  const changeStep = (nextStep, nextFinalized = false) => {
    if (isTransitioningRef.current) return;
    const flow = getFlow(selectedRole);
    const nextIdx = flow.indexOf(nextStep);
    const direction = nextFinalized || nextIdx > currentIdx ? 'next' : 'back';
    isTransitioningRef.current = true;
    setCurrentStep(nextStep);
    setIsFinalized(nextFinalized);

    const tl = gsap.timeline({ onComplete: () => { isTransitioningRef.current = false; } });
    tl.to(stepContentRef.current, { opacity: 0, x: direction === 'next' ? -60 : 60, scale: 0.96, duration: 0.5, ease: 'power3.inOut' })
      .call(() => { flushSync(() => { setRenderedStep(nextStep); setRenderedFinalized(nextFinalized); }); })
      .set(stepContentRef.current, { x: direction === 'next' ? 60 : -60, scale: 0.96 })
      .to(stepContentRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power3.inOut' });
  };

  const isNextDisabled = () => {
    if (currentStep === 'IDENTITY') return !selectedRole;
    if (currentStep === 'DEPARTMENT') return !selectedDepartment;
    if (currentStep === 'OBJECTIVES') return !selectedObjective;
    return false;
  };

  const handleNext = () => {
    const flow = getFlow(selectedRole);
    const idx = flow.indexOf(currentStep);
    if (idx < flow.length - 1) { changeStep(flow[idx + 1], false); }
    else { changeStep(currentStep, true); }
  };

  const handleBack = () => {
    const flow = getFlow(selectedRole);
    const idx = flow.indexOf(currentStep);
    if (isFinalized) { changeStep('FINALIZE', false); }
    else if (idx > 0) { changeStep(flow[idx - 1], false); }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedObjective(null);
    setSelectedDepartment(null);
  };

  const resetFlow = () => {
    setSelectedRole(null); setSelectedDepartment(null); setSelectedObjective(null);
    setCurations({ legacy: true, skills: true, network: false, comp: false });
    changeStep('IDENTITY', false);
  };

  const getObjectiveTitle = () => {
    if (!selectedRole || !selectedObjective) return 'None';
    const obj = (OBJECTIVES[selectedRole] || []).find(o => o.id === selectedObjective);
    return obj ? obj.title : 'None';
  };

  const getDeptLabel = () => {
    if (!selectedDepartment) return 'None';
    const d = DEPARTMENTS.find(d => d.id === selectedDepartment);
    return d ? `${d.icon} ${d.label}` : 'None';
  };

  // What label goes on the final launch button
  const launchLabel = selectedRole === 'student'
    ? 'Activate Learning Engine'
    : selectedRole === 'fresher'
      ? 'Launch & Analyze My Resume →'
      : 'Launch & Analyze My Resume →';

  // ── Steps to render in stepper ──
  const stepsToRender = (selectedRole ? getFlow(selectedRole) : STEP_FLOWS.default).map((name, i) => ({
    id: i + 1, name, display: STEP_DISPLAY[name] || name,
  }));

  return (
    <div className="onboarding-flow-container">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="ambient-blob-1" ref={blob1Ref} />
      <div className="ambient-blob-2" ref={blob2Ref} />
      <div className="ambient-blob-3" ref={blob3Ref} />

      {/* Header */}
      <div className="header-section" style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="logo-title">Pathvera<span className="logo-dot" />ai</h1>
        <p className="logo-subtitle">FUTURE-PROOF YOUR LEGACY</p>
        <div style={{ position: 'absolute', right: '12px', top: '10px', display: 'flex', gap: '10px', zIndex: 10 }}>
          {!isAuthenticated ? (
            <button onClick={onNavigateToAuth} className="auth-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
              Sign In
            </button>
          ) : (
            <button onClick={onLogout} className="auth-pill logout-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
            </button>
          )}
          {onCompleteOnboarding && (
            <button onClick={() => onCompleteOnboarding('student')} className="skip-pill">Skip to Explore →</button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="content-main">

        {/* Stepper */}
        <div className="stepper-container" style={{ maxWidth: totalSteps > 4 ? 720 : 600 }}>
          <div className="stepper-line" />
          <div className="stepper-line-active" ref={stepperActiveRef} />
          {stepsToRender.map((step) => {
            const stepIdx = step.id - 1;
            const isActive = step.name === currentStep;
            const isCompleted = currentIdx > stepIdx;
            return (
              <div key={step.name} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  const flow = getFlow(selectedRole);
                  const clickIdx = flow.indexOf(step.name);
                  if (clickIdx < currentIdx || (selectedRole && clickIdx <= 1)) changeStep(step.name, false);
                }}>
                <div className="step-bubble">{isCompleted ? '✓' : step.id}</div>
                <span className="step-label">{step.display}</span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {!renderedFinalized ? (
          <>
            {/* ── IDENTITY ── */}
            {renderedStep === 'IDENTITY' && (
              <div className="step-content-box" ref={stepContentRef}>
                <p className="step-subtitle">Begin your evolution. Who are you today?</p>
                <div className="cards-row cards-row-3">
                  {IDENTITIES.map(({ role, emoji, title, desc, icon }) => (
                    <div key={role}
                      className={`identity-card ${selectedRole === role ? 'selected' : ''}`}
                      onClick={(e) => cardClick(e, () => handleRoleSelect(role))}
                      onMouseEnter={cardEnter} onMouseLeave={cardLeave}
                    >
                      <div className="icon-circle">{icon}</div>
                      <h3 className="card-title">{emoji} {title}</h3>
                      <p className="card-desc">{desc}</p>
                      {role !== 'student' && (
                        <div className="card-badge">
                          {role === 'fresher' ? '📄 Resume + AI Job Match' : '📄 Resume + Senior Roles'}
                        </div>
                      )}
                      {role === 'student' && (
                        <div className="card-badge">🏫 Department Selector</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── DEPARTMENT (students only) ── */}
            {renderedStep === 'DEPARTMENT' && (
              <div className="step-content-box" ref={stepContentRef}>
                <p className="step-subtitle">Which academic field are you pursuing? We'll tailor your path accordingly.</p>
                <div className="dept-grid">
                  {DEPARTMENTS.map((dept) => (
                    <div key={dept.id}
                      className={`dept-card ${selectedDepartment === dept.id ? 'selected' : ''}`}
                      onClick={(e) => cardClick(e, () => setSelectedDepartment(dept.id))}
                      onMouseEnter={cardEnter} onMouseLeave={cardLeave}
                    >
                      <span className="dept-icon">{dept.icon}</span>
                      <div>
                        <p className="dept-label">{dept.label}</p>
                        <p className="dept-desc">{dept.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── OBJECTIVES ── */}
            {renderedStep === 'OBJECTIVES' && (
              <div className="step-content-box" ref={stepContentRef}>
                <p className="step-subtitle">Define your trajectory. What is your primary objective?</p>
                <div className="objectives-grid">
                  {(OBJECTIVES[selectedRole] || []).map((obj) => (
                    <div key={obj.id}
                      className={`objective-card ${selectedObjective === obj.id ? 'selected' : ''}`}
                      onClick={(e) => cardClick(e, () => setSelectedObjective(obj.id))}
                      onMouseEnter={cardEnter} onMouseLeave={cardLeave}
                    >
                      <h4 className="obj-title">{obj.title}</h4>
                      <p className="obj-desc">{obj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CURATIONS ── */}
            {renderedStep === 'CURATIONS' && (
              <div className="step-content-box" ref={stepContentRef}>
                <p className="step-subtitle">Curate your algorithmic environment. Enable core pillars.</p>
                <div className="curations-box">
                  {CURATIONS.map((item) => (
                    <div key={item.key}
                      className={`curation-item ${curations[item.key] ? 'active' : ''}`}
                      onClick={(e) => cardClick(e, () => setCurations(prev => ({ ...prev, [item.key]: !prev[item.key] })))}
                      onMouseEnter={cardEnter} onMouseLeave={cardLeave}
                    >
                      <div className="curation-label-group">
                        <span className="curation-label">{item.label}</span>
                        <span className="curation-desc">{item.desc}</span>
                      </div>
                      <div className="checkbox-custom">
                        {curations[item.key] && <span className="checkbox-checkmark">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FINALIZE ── */}
            {renderedStep === 'FINALIZE' && (
              <div className="step-content-box" ref={stepContentRef}>
                <p className="step-subtitle">Verify blueprint parameters before initializing engine.</p>
                <div className="summary-card">
                  <h3 className="summary-title">Onboarding Parameters</h3>
                  <div className="summary-row">
                    <span className="summary-key">Evolution Track</span>
                    <span className="summary-value" style={{ textTransform: 'capitalize' }}>
                      {selectedRole === 'fresher' ? '🌱 Fresher' : selectedRole === 'student' ? '🎓 Student' : '💼 Professional'}
                    </span>
                  </div>
                  {selectedRole === 'student' && selectedDepartment && (
                    <div className="summary-row">
                      <span className="summary-key">Department</span>
                      <span className="summary-value">{getDeptLabel()}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span className="summary-key">Target Objective</span>
                    <span className="summary-value" style={{ maxWidth: '260px', textAlign: 'right' }}>{getObjectiveTitle()}</span>
                  </div>
                  <div className="summary-row" style={{ alignItems: 'flex-start' }}>
                    <span className="summary-key">Active Engines</span>
                    <div className="summary-curation-list">
                      {Object.keys(curations).filter(k => curations[k]).map(key => {
                        const cur = CURATIONS.find(c => c.key === key);
                        return <span key={key} className="curation-badge">{cur ? cur.label.split(' ').slice(1).join(' ') : key}</span>;
                      })}
                      {Object.keys(curations).filter(k => curations[k]).length === 0 && (
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>None selected</span>
                      )}
                    </div>
                  </div>
                  {(selectedRole === 'fresher' || selectedRole === 'professional') && (
                    <div className="success-panel" style={{ background: 'rgba(74,158,255,0.06)', borderColor: 'rgba(74,158,255,0.15)' }}>
                      <span style={{ color: '#4A9EFF', fontWeight: 600 }}>Next: </span>
                      Your resume will be analyzed by the <span className="success-accent">Vera Engine</span> and we'll surface your best-match job opportunities.
                    </div>
                  )}
                  {selectedRole === 'student' && (
                    <div className="success-panel">
                      Your profile feeds directly into the <span className="success-accent">Vera Optimization Matrix</span>. We'll curate academic tracks, internships, and graduate pathways for you.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="controls-row">
              {currentIdx > 0 && (
                <button className="control-btn control-btn-back" onClick={handleBack}>Back</button>
              )}
              <button
                className="control-btn control-btn-next"
                disabled={isNextDisabled()}
                onClick={(e) => btnClick(e, handleNext)}
                onMouseEnter={btnEnter} onMouseLeave={btnLeave}
              >
                {currentStep === 'FINALIZE' ? launchLabel : 'Continue'}
              </button>
            </div>
          </>
        ) : (
          /* ── SUCCESS SCREEN ── */
          <div className="step-content-box" ref={stepContentRef}>
            <div className="summary-card" style={{ textAlign: 'center', alignItems: 'center', gap: '24px' }}>
              <div className="icon-circle" style={{ backgroundColor: 'rgba(255,209,102,0.15)', width: '64px', height: '64px', margin: '0' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.886L4.2 9.08l4.757 3.82L7.045 18.78 12 15l4.955 3.78-1.912-5.877 4.757-3.82-5.888-.194L12 3Z" />
                </svg>
              </div>
              <h2 className="summary-title" style={{ border: 'none', padding: '0', textAlign: 'center', fontSize: '24px' }}>
                Evolution Initiated
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '14px', margin: '0', lineHeight: '1.85' }}>
                Welcome to the frontier, <span style={{ color: 'var(--gold)', fontWeight: '600', textTransform: 'capitalize' }}>{selectedRole}</span>.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '12.5px', margin: '0', lineHeight: '1.65' }}>
                {selectedRole === 'student'
                  ? 'Your academic trajectory is calibrated. We are compiling personalized program recommendations.'
                  : 'Your profile is ready. Next, upload your resume so Vera can match you to the best opportunities.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '12px' }}>
                <button className="control-btn control-btn-next" style={{ width: '100%', boxSizing: 'border-box' }}
                  onClick={(e) => btnClick(e, () => onCompleteOnboarding && onCompleteOnboarding(selectedRole))}
                  onMouseEnter={btnEnter} onMouseLeave={btnLeave}>
                  {selectedRole === 'student' ? 'Access Explore Directory →' : 'Upload Resume & Get Matched →'}
                </button>
                <button className="control-btn control-btn-back" onClick={resetFlow} style={{ width: '100%', boxSizing: 'border-box' }}>
                  Restart Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer-section">
        <span className="footer-left-version">VERA ENGINE V.4.02</span>
        <div className="footer-right-icons">
          <button className="footer-icon-btn" title="System Status: Connected">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
          </button>
          <button className="footer-icon-btn" title="Encryption Active">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const STYLES = `
  .onboarding-flow-container {
    --bg: #070D1A; --surface: #0C1829;
    --card: rgba(100, 160, 255, 0.04); --gold: #FFD166;
    --gold-dim: rgba(255, 209, 102, 0.12); --blue-accent: #4A9EFF;
    --blue-dim: rgba(74, 158, 255, 0.10); --text: #F0F4FF;
    --muted: #6B84A3; --border: rgba(100, 160, 255, 0.10);
    --glow-gold: 0 0 32px rgba(255,209,102,0.20);
    --glow-blue: 0 0 32px rgba(74,158,255,0.15);
    position: relative; width: 100vw; min-height: 100vh;
    background-color: var(--bg); color: var(--text);
    font-family: 'Lato', sans-serif; font-weight: 300;
    display: flex; flex-direction: column; align-items: center;
    justify-content: space-between; padding: 48px 24px;
    box-sizing: border-box; overflow-x: hidden;
  }
  .onboarding-flow-container::before {
    content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-repeat: repeat;
  }
  .ambient-blob-1 { position: absolute; top: 15%; left: 10%; width: 320px; height: 320px; border-radius: 50%; filter: blur(80px); opacity: 0.08; background-color: rgba(74,158,255,0.3); pointer-events: none; z-index: 0; }
  .ambient-blob-2 { position: absolute; top: 45%; right: 8%; width: 380px; height: 380px; border-radius: 50%; filter: blur(80px); opacity: 0.08; background-color: rgba(255,209,102,0.25); pointer-events: none; z-index: 0; }
  .ambient-blob-3 { position: absolute; bottom: 12%; left: 25%; width: 290px; height: 290px; border-radius: 50%; filter: blur(80px); opacity: 0.08; background-color: rgba(74,158,255,0.25); pointer-events: none; z-index: 0; }

  .content-main { z-index: 1; width: 100%; max-width: 900px; display: flex; flex-direction: column; align-items: center; flex-grow: 1; justify-content: center; margin: 32px 0; perspective: 900px; }

  .header-section { text-align: center; margin-bottom: 40px; z-index: 1; }
  .logo-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; color: var(--text); letter-spacing: 0.12em; margin: 0; }
  .logo-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: var(--gold); box-shadow: 0 0 12px rgba(255,209,102,0.6); vertical-align: middle; margin: 0 2px; }
  .logo-subtitle { font-family: monospace; font-size: 9px; font-weight: 700; color: var(--gold); letter-spacing: 0.4em; text-transform: uppercase; margin-top: 6px; margin-bottom: 0; }

  .auth-pill {
    background: linear-gradient(135deg, rgba(255,209,102,0.12), rgba(255,209,102,0.04));
    border: 1px solid var(--gold); border-radius: 20px; padding: 6px 16px; color: var(--gold);
    font-size: 11px; font-family: 'Lato', sans-serif; cursor: pointer; transition: all 0.2s; font-weight: 600;
    display: flex; align-items: center; gap: 6px;
  }
  .auth-pill:hover { box-shadow: 0 0 16px rgba(255,209,102,0.2); }
  .logout-pill { background: linear-gradient(135deg, rgba(231,76,111,0.12), rgba(231,76,111,0.04)); border-color: #E74C6F; color: #E74C6F; }
  .logout-pill:hover { box-shadow: 0 0 16px rgba(231,76,111,0.2); }
  .skip-pill { background: none; border: 1px solid var(--border); border-radius: 20px; padding: 6px 14px; color: var(--muted); font-size: 11px; font-family: 'Lato', sans-serif; cursor: pointer; transition: all 0.2s; }
  .skip-pill:hover { color: var(--gold); border-color: var(--gold); }

  /* Stepper */
  .stepper-container { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 48px; position: relative; }
  .stepper-line { position: absolute; top: 15px; left: 6%; right: 6%; height: 1px; background-color: var(--border); z-index: -1; }
  .stepper-line-active { position: absolute; top: 15px; left: 6%; height: 2px; background-color: var(--gold); z-index: 0; box-shadow: 0 0 10px rgba(255,209,102,0.3); }
  .stepper-line-active::after { content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; background-color: var(--gold); border-radius: 50%; animation: leading-edge-pulse 1.5s infinite ease-in-out; }
  @keyframes leading-edge-pulse { 0% { box-shadow: 0 0 4px rgba(255,209,102,0.6); transform: translateY(-50%) scale(1); } 50% { box-shadow: 0 0 12px rgba(255,209,102,1); transform: translateY(-50%) scale(1.3); } 100% { box-shadow: 0 0 4px rgba(255,209,102,0.6); transform: translateY(-50%) scale(1); } }
  .step-item { display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer; user-select: none; }
  .step-bubble { width: 30px; height: 30px; border-radius: 50%; background-color: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 12px; z-index: 1; transition: all 0.3s ease; }
  .step-item.active .step-bubble { border-color: var(--gold); color: var(--gold); box-shadow: var(--glow-gold); transform: scale(1.05); }
  .step-item.completed .step-bubble { border-color: var(--gold); background-color: var(--gold); color: var(--bg); }
  .step-label { font-family: monospace; font-size: 9px; font-weight: 700; color: var(--muted); letter-spacing: 0.4em; transition: color 0.3s ease; position: relative; padding-bottom: 4px; }
  .step-item.active .step-label { color: var(--gold); }
  .step-item.active .step-label::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background-color: var(--gold); border-radius: 2px; animation: underline-in 0.3s forwards ease-out; }
  @keyframes underline-in { from { transform: scaleX(0); } to { transform: scaleX(1); } }

  /* Content */
  .step-content-box { width: 100%; display: flex; flex-direction: column; align-items: center; }
  .step-subtitle { font-family: 'Lato', sans-serif; font-size: 15px; font-weight: 300; color: var(--muted); margin: 0 0 36px 0; text-align: center; line-height: 1.85; }

  /* ── 3-Card Identity Row ── */
  .cards-row { display: flex; gap: 20px; justify-content: center; width: 100%; margin-bottom: 40px; }
  .cards-row-3 .identity-card { max-width: 260px; padding: 32px 24px; }
  .identity-card { flex: 1; background-color: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px 32px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; cursor: pointer; text-align: center; position: relative; }
  .identity-card::after { content: ''; position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; border-top: 2px solid var(--gold); border-right: 2px solid var(--gold); opacity: 0.5; transition: opacity 0.3s; }
  .identity-card:hover::after { opacity: 1; }
  .identity-card.selected { border: 1px solid var(--gold); background: linear-gradient(135deg, rgba(255,209,102,0.08), rgba(255,209,102,0.02)); box-shadow: var(--glow-gold); }
  .icon-circle { width: 56px; height: 56px; background-color: var(--gold-dim); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); margin-bottom: 20px; transition: transform 300ms ease; }
  .identity-card:hover .icon-circle { transform: scale(1.08); }
  .card-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; color: var(--text); margin: 0 0 10px; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .card-desc { font-size: 12.5px; color: var(--muted); line-height: 1.65; margin: 0 0 14px; }
  .card-badge { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: var(--blue-accent); background: var(--blue-dim); border: 1px solid rgba(74,158,255,0.15); padding: 4px 10px; border-radius: 20px; margin-top: auto; }

  /* ── Department Grid ── */
  .dept-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; width: 100%; max-width: 860px; margin-bottom: 40px; }
  .dept-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; display: flex; align-items: flex-start; gap: 12px; cursor: pointer; transition: all 0.2s; }
  .dept-card:hover { border-color: rgba(255,209,102,0.3); }
  .dept-card.selected { border-color: var(--gold); background: linear-gradient(135deg, rgba(255,209,102,0.08), rgba(255,209,102,0.02)); box-shadow: var(--glow-gold); }
  .dept-icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
  .dept-label { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 500; color: var(--text); margin: 0 0 4px; }
  .dept-desc { font-size: 11px; color: var(--muted); margin: 0; line-height: 1.5; }

  /* ── Objectives ── */
  .objectives-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; width: 100%; max-width: 680px; margin-bottom: 40px; }
  .objective-card { background-color: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; box-sizing: border-box; cursor: pointer; display: flex; flex-direction: column; gap: 8px; text-align: left; position: relative; }
  .objective-card::after { content: ''; position: absolute; top: 8px; right: 8px; width: 16px; height: 16px; border-top: 2px solid var(--gold); border-right: 2px solid var(--gold); opacity: 0.3; transition: opacity 0.3s; }
  .objective-card:hover::after { opacity: 0.8; }
  .objective-card.selected { border-color: var(--blue-accent); background: linear-gradient(135deg, rgba(74,158,255,0.08), rgba(74,158,255,0.02)); box-shadow: var(--glow-blue); }
  .obj-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 500; color: var(--text); margin: 0; }
  .obj-desc { font-size: 12px; color: var(--muted); line-height: 1.6; margin: 0; }

  /* ── Curations ── */
  .curations-box { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 580px; margin-bottom: 40px; }
  .curation-item { background-color: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .curation-item.active { border-color: var(--gold); background: linear-gradient(135deg, rgba(255,209,102,0.04), rgba(255,209,102,0.01)); }
  .curation-label-group { display: flex; flex-direction: column; gap: 4px; text-align: left; }
  .curation-label { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 500; color: var(--text); }
  .curation-desc { font-size: 11.5px; color: var(--muted); line-height: 1.5; }
  .checkbox-custom { width: 20px; height: 20px; border-radius: 5px; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all 0.2s; background-color: transparent; }
  .curation-item.active .checkbox-custom { border-color: var(--gold); background-color: var(--gold); }
  .checkbox-checkmark { color: var(--bg); font-weight: 800; font-size: 12px; }

  /* ── Summary ── */
  .summary-card { width: 100%; max-width: 500px; background-color: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; box-sizing: border-box; margin-bottom: 40px; box-shadow: 0 12px 40px rgba(0,0,0,0.5); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 20px; }
  .summary-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--blue-accent)); }
  .summary-card::after { content: ''; position: absolute; top: 10px; right: 10px; width: 22px; height: 22px; border-top: 2px solid var(--gold); border-right: 2px solid var(--gold); opacity: 0.4; }
  .summary-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--gold); border-bottom: 1px solid var(--border); padding-bottom: 12px; margin: 0; text-align: left; }
  .summary-row { display: flex; justify-content: space-between; font-size: 13px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.02); }
  .summary-key { color: var(--muted); font-family: monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
  .summary-value { font-weight: 400; color: var(--text); }
  .summary-curation-list { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
  .curation-badge { font-size: 10px; background-color: var(--blue-dim); border: 1px solid rgba(74,158,255,0.15); color: var(--blue-accent); padding: 2px 8px; border-radius: 4px; }
  .success-panel { background: rgba(255,209,102,0.05); border: 1px solid rgba(255,209,102,0.15); border-radius: 8px; padding: 16px; text-align: center; font-size: 13px; color: var(--muted); line-height: 1.65; }
  .success-accent { color: var(--gold); font-weight: 600; }

  /* ── Controls ── */
  .controls-row { display: flex; gap: 16px; width: 100%; justify-content: center; z-index: 1; }
  .control-btn { font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; padding: 14px 32px; cursor: pointer; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
  .control-btn-back { background-color: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 8px; }
  .control-btn-back:hover:not(:disabled) { border-color: var(--text); background-color: rgba(255,255,255,0.02); }
  .control-btn-next { background-color: var(--gold); color: var(--bg); border: 1px solid var(--gold); border-radius: 8px; }
  .control-btn-next:hover:not(:disabled) { box-shadow: var(--glow-gold); filter: brightness(1.05); }
  .control-btn-next:disabled { background-color: var(--border); border-color: var(--border); color: var(--muted); cursor: not-allowed; }

  /* ── Footer ── */
  .footer-section { width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 24px; margin-top: 40px; z-index: 1; }
  .footer-left-version { font-family: monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.05em; }
  .footer-right-icons { display: flex; gap: 16px; }
  .footer-icon-btn { background: none; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color 0.2s; }
  .footer-icon-btn:hover { color: var(--gold); }

  @media (max-width: 900px) {
    .dept-grid { grid-template-columns: repeat(2, 1fr); }
    .cards-row-3 { flex-direction: column; align-items: center; }
    .cards-row-3 .identity-card { max-width: 400px; width: 100%; }
    .objectives-grid { grid-template-columns: 1fr; }
    .stepper-container { margin-bottom: 32px; }
    .step-label { font-size: 8px; letter-spacing: 0.25em; }
    .onboarding-flow-container { padding: 32px 16px; }
  }
  @media (max-width: 480px) {
    .dept-grid { grid-template-columns: 1fr; }
  }
`;
