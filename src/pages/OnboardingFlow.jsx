import React, { useState } from 'react';

export default function OnboardingFlow({ onCompleteOnboarding }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null); // 'student' | 'professional'
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [curations, setCurations] = useState({
    legacy: true,
    skills: true,
    network: false,
    compensation: false,
  });
  const [isFinalized, setIsFinalized] = useState(false);

  const steps = [
    { id: 1, name: 'IDENTITY' },
    { id: 2, name: 'OBJECTIVES' },
    { id: 3, name: 'CURATIONS' },
    { id: 4, name: 'FINALIZE' }
  ];

  const objectivesList = {
    student: [
      { id: 'grad', title: 'Elite Graduate Launchpad', desc: 'Secure admission to Tier-1 Ivy League or specialized graduate tracks.' },
      { id: 'intern', title: 'Top-Tier Tech/Finance Internships', desc: 'Accelerate entry into high-barrier corporate systems (Big Tech, Quant, VC).' },
      { id: 'research', title: 'Academic Research & Ventures', desc: 'Position yourself for publishing, labs, or initial biotech/deep-tech founding.' },
      { id: 'mentorship', title: 'Fast-Track Professional Growth', desc: 'Match with domain leaders for high-impact advisory and project sponsorships.' }
    ],
    professional: [
      { id: 'leadership', title: 'Strategic Leadership Transition', desc: 'Shift from purely technical positions to director, VP, or C-suite roles.' },
      { id: 'deeptech', title: 'AI & Deep Tech Pivot', desc: 'Re-align capabilities to dominate machine learning, robotics, or frontier systems.' },
      { id: 'startup', title: 'High-Growth Startup Founding', desc: 'Venture initialization, cap table structuring, and seed preparation.' },
      { id: 'board', title: 'Board Placement & Compensation', desc: 'Maximize market equity capture, board representation, and strategic leverage.' }
    ]
  };

  const curationsList = [
    { key: 'legacy', label: '🎯 Legacy Vision Blueprint', desc: 'Tailored industry vectors matching your 10-year target horizon.' },
    { key: 'skills', label: '🧠 AI Skill-Mapping Engine', desc: 'Daily gap analysis against top 0.1% performers in your field.' },
    { key: 'network', label: '🤝 Industry Elite Network Access', desc: 'Vetted introduction channels to advisors, founders, and investors.' },
    { key: 'compensation', label: '📈 Compensation Arbitrage System', desc: 'Real-time equity and base structure intelligence.' }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedObjective(null); // Reset objective if role changes
  };

  const handleObjectiveSelect = (objId) => {
    setSelectedObjective(objId);
  };

  const toggleCuration = (key) => {
    setCurations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getObjectiveTitle = () => {
    if (!selectedRole || !selectedObjective) return 'None';
    const obj = objectivesList[selectedRole].find(o => o.id === selectedObjective);
    return obj ? obj.title : 'None';
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinalized(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      if (isFinalized) setIsFinalized(false);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setSelectedRole(null);
    setSelectedObjective(null);
    setCurations({
      legacy: true,
      skills: true,
      network: false,
      compensation: false,
    });
    setIsFinalized(false);
  };

  return (
    <div className="onboarding-flow-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

        .onboarding-flow-container {
          --bg: #070D1A;
          --surface: #0C1829;
          --card: rgba(100, 160, 255, 0.04);
          --gold: #FFD166;
          --gold-dim: rgba(255, 209, 102, 0.12);
          --blue-accent: #4A9EFF;
          --blue-dim: rgba(74, 158, 255, 0.10);
          --text: #F0F4FF;
          --muted: #6B84A3;
          --border: rgba(100, 160, 255, 0.10);
          --glow-gold: 0 0 32px rgba(255,209,102,0.20);
          --glow-blue: 0 0 32px rgba(74,158,255,0.15);

          position: relative;
          width: 100vw;
          min-height: 100vh;
          background-color: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 48px 24px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        /* Ambient blurred radial background blobs */
        .ambient-blob-gold {
          position: absolute;
          top: 0;
          right: 0;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 209, 102, 0.06) 0%, rgba(255, 209, 102, 0) 70%);
          pointer-events: none;
          z-index: 0;
          animation: pulse-slow-gold 16s infinite alternate ease-in-out;
        }

        .ambient-blob-blue {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(74, 158, 255, 0.05) 0%, rgba(74, 158, 255, 0) 70%);
          pointer-events: none;
          z-index: 0;
          animation: pulse-slow-blue 20s infinite alternate ease-in-out;
        }

        @keyframes pulse-slow-gold {
          0% { transform: translate(10%, -10%) scale(1); }
          100% { transform: translate(-5%, 5%) scale(1.1); }
        }

        @keyframes pulse-slow-blue {
          0% { transform: translate(-10%, 10%) scale(1); }
          100% { transform: translate(5%, -5%) scale(1.15); }
        }

        .content-main {
          z-index: 1;
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
          justify-content: center;
          margin: 32px 0;
        }

        /* Header design */
        .header-section {
          text-align: center;
          margin-bottom: 40px;
          z-index: 1;
        }

        .logo-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--gold);
          text-shadow: 0 0 16px rgba(255, 209, 102, 0.15);
          letter-spacing: 0.02em;
          margin: 0;
        }

        .logo-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-top: 6px;
          margin-bottom: 0;
        }

        /* 4-step horizontal stepper */
        .stepper-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 600px;
          margin-bottom: 48px;
          position: relative;
        }

        .stepper-line {
          position: absolute;
          top: 15px;
          left: 6%;
          right: 6%;
          height: 1px;
          background-color: var(--border);
          z-index: -1;
        }

        .stepper-line-active {
          position: absolute;
          top: 15px;
          left: 6%;
          height: 1px;
          background-color: var(--gold);
          z-index: 0;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(255, 209, 102, 0.3);
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          cursor: pointer;
          user-select: none;
        }

        .step-bubble {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--bg);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--muted);
          margin-bottom: 12px;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .step-item.active .step-bubble {
          border-color: var(--gold);
          color: var(--gold);
          box-shadow: var(--glow-gold);
          transform: scale(1.05);
        }

        .step-item.completed .step-bubble {
          border-color: var(--gold);
          background-color: var(--gold);
          color: var(--bg);
          box-shadow: 0 0 12px rgba(255, 209, 102, 0.3);
        }

        .step-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.12em;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 4px;
        }

        .step-item.active .step-label {
          color: var(--gold);
        }

        .step-item.active .step-label::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--gold);
          border-radius: 2px;
          animation: underline-in 0.3s forwards ease-out;
        }

        @keyframes underline-in {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Step Content Area */
        .step-content-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: slide-up-fade 0.5s ease-out;
        }

        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .step-subtitle {
          font-size: 15px;
          color: var(--muted);
          margin: 0 0 36px 0;
          text-align: center;
          font-weight: 400;
        }

        /* Cards Row (Step 1) */
        .cards-row {
          display: flex;
          gap: 24px;
          justify-content: center;
          width: 100%;
          margin-bottom: 40px;
        }

        .identity-card {
          flex: 1;
          max-width: 300px;
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease;
          text-align: center;
        }

        .identity-card:hover {
          border-color: var(--gold);
          box-shadow: var(--glow-gold);
          transform: translateY(-4px);
        }

        .identity-card.selected {
          border: 1px solid var(--gold);
          background: linear-gradient(135deg, rgba(255, 209, 102, 0.08), rgba(255, 209, 102, 0.02));
          box-shadow: var(--glow-gold);
        }

        .icon-circle {
          width: 56px;
          height: 56px;
          background-color: var(--gold-dim);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          margin-bottom: 24px;
          transition: transform 300ms ease;
        }

        .identity-card:hover .icon-circle {
          transform: scale(1.08);
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .card-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Step 2 (Objectives) Elements */
        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 680px;
          margin-bottom: 40px;
        }

        .objective-card {
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-sizing: border-box;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }

        .objective-card:hover {
          border-color: var(--blue-accent);
          box-shadow: var(--glow-blue);
          transform: translateY(-2px);
        }

        .objective-card.selected {
          border-color: var(--blue-accent);
          background: linear-gradient(135deg, rgba(74, 158, 255, 0.08), rgba(74, 158, 255, 0.02));
          box-shadow: var(--glow-blue);
        }

        .obj-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .obj-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.45;
          margin: 0;
        }

        /* Step 3 (Curations) Elements */
        .curations-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 580px;
          margin-bottom: 40px;
        }

        .curation-item {
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .curation-item:hover {
          border-color: var(--gold);
          background-color: rgba(255, 209, 102, 0.02);
        }

        .curation-item.active {
          border-color: var(--gold);
          background: linear-gradient(135deg, rgba(255, 209, 102, 0.04), rgba(255, 209, 102, 0.01));
        }

        .curation-label-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .curation-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }

        .curation-desc {
          font-size: 11.5px;
          color: var(--muted);
          line-height: 1.4;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          background-color: transparent;
        }

        .curation-item.active .checkbox-custom {
          border-color: var(--gold);
          background-color: var(--gold);
        }

        .checkbox-checkmark {
          color: var(--bg);
          font-weight: 800;
          font-size: 12px;
        }

        /* Step 4 (Finalize) Elements */
        .summary-card {
          width: 100%;
          max-width: 500px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          box-sizing: border-box;
          margin-bottom: 40px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--blue-accent));
        }

        .summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--gold);
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin: 0;
          text-align: left;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.02);
        }

        .summary-key {
          color: var(--muted);
        }

        .summary-value {
          font-weight: 500;
          color: var(--text);
          text-transform: capitalize;
        }

        .summary-curation-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-end;
        }

        .curation-badge {
          font-size: 10px;
          background-color: var(--blue-dim);
          border: 1px solid rgba(74, 158, 255, 0.15);
          color: var(--blue-accent);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .success-panel {
          background-color: rgba(255,209,102,0.05);
          border: 1px solid rgba(255,209,102,0.15);
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }

        .success-accent {
          color: var(--gold);
          font-weight: 600;
        }

        /* Navigation Controls */
        .controls-row {
          display: flex;
          gap: 16px;
          width: 100%;
          justify-content: center;
          z-index: 1;
        }

        .control-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 12px 28px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn-back {
          background-color: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .control-btn-back:hover:not(:disabled) {
          border-color: var(--text);
          background-color: rgba(255,255,255,0.02);
          transform: translateY(-1px);
        }

        .control-btn-next {
          background-color: var(--gold);
          color: var(--bg);
          border: 1px solid var(--gold);
        }

        .control-btn-next:hover:not(:disabled) {
          box-shadow: var(--glow-gold);
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .control-btn-next:disabled {
          background-color: var(--border);
          border-color: var(--border);
          color: var(--muted);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Footer */
        .footer-section {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 24px;
          margin-top: 40px;
          z-index: 1;
        }

        .footer-left-version {
          font-family: monospace;
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        .footer-right-icons {
          display: flex;
          gap: 16px;
        }

        .footer-icon-btn {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .footer-icon-btn:hover {
          color: var(--gold);
        }

        @media (max-width: 768px) {
          .cards-row {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .objectives-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .stepper-container {
            margin-bottom: 32px;
          }

          .step-label {
            font-size: 8.5px;
          }

          .onboarding-flow-container {
            padding: 32px 16px;
          }

          .identity-card {
            width: 100%;
            padding: 32px 24px;
          }
        }
      `}} />

      {/* Decorative blurred radial blobs */}
      <div className="ambient-blob-gold" />
      <div className="ambient-blob-blue" />

      {/* Header section */}
      <div className="header-section" style={{ position: 'relative', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="logo-title">Pathvera.ai</h1>
        <p className="logo-subtitle">FUTURE-PROOF YOUR LEGACY</p>
        {onCompleteOnboarding && (
          <button 
            onClick={onCompleteOnboarding}
            style={{
              position: 'absolute',
              right: '12px',
              top: '10px',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '6px 14px',
              color: 'var(--muted)',
              fontSize: '11px',
              fontFamily: 'DM Sans',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            className="skip-btn"
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--gold)';
              e.target.style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--muted)';
              e.target.style.borderColor = 'var(--border)';
            }}
          >
            Skip to Explore →
          </button>
        )}
      </div>

      <div className="content-main">
        {/* Progress horizontal stepper */}
        <div className="stepper-container">
          <div className="stepper-line" />
          <div 
            className="stepper-line-active" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 88}%` }} 
          />
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              onClick={() => {
                // Only allow jumping back to completed steps, or forward to accessible steps
                if (step.id < currentStep || (selectedRole && step.id === 2) || (selectedRole && selectedObjective && step.id === 3)) {
                  setCurrentStep(step.id);
                  if (isFinalized) setIsFinalized(false);
                }
              }}
            >
              <div className="step-bubble">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="step-label">{step.name}</span>
            </div>
          ))}
        </div>

        {/* Dynamic content rendering based on currentStep */}
        {!isFinalized ? (
          <>
            {currentStep === 1 && (
              <div className="step-content-box">
                <p className="step-subtitle">Begin your evolution. Who are you today?</p>
                
                <div className="cards-row">
                  {/* Card 1: Student */}
                  <div 
                    className={`identity-card ${selectedRole === 'student' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('student')}
                  >
                    <div className="icon-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                        <path d="M6 12.5v5a6 6 0 0 0 12 0v-5" />
                        <path d="M21.5 12v6" />
                      </svg>
                    </div>
                    <h3 className="card-title">🎓 I'm a Student</h3>
                    <p className="card-desc">Navigating academia towards an elite professional launchpad.</p>
                  </div>

                  {/* Card 2: Professional */}
                  <div 
                    className={`identity-card ${selectedRole === 'professional' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('professional')}
                  >
                    <div className="icon-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        <rect width="20" height="14" x="2" y="6" rx="2" />
                      </svg>
                    </div>
                    <h3 className="card-title">💼 I'm a Professional</h3>
                    <p className="card-desc">Architecting a transition to industry dominance or pivot.</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content-box">
                <p className="step-subtitle">Define your trajectory. What is your primary objective?</p>
                
                <div className="objectives-grid">
                  {selectedRole && objectivesList[selectedRole].map((obj) => (
                    <div
                      key={obj.id}
                      className={`objective-card ${selectedObjective === obj.id ? 'selected' : ''}`}
                      onClick={() => handleObjectiveSelect(obj.id)}
                    >
                      <h4 className="obj-title">{obj.title}</h4>
                      <p className="obj-desc">{obj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content-box">
                <p className="step-subtitle">Curate your algorithmic environment. Enable core pillars.</p>
                
                <div className="curations-box">
                  {curationsList.map((item) => (
                    <div
                      key={item.key}
                      className={`curation-item ${curations[item.key] ? 'active' : ''}`}
                      onClick={() => toggleCuration(item.key)}
                    >
                      <div className="curation-label-group">
                        <span className="curation-label">{item.label}</span>
                        <span className="curation-desc">{item.desc}</span>
                      </div>
                      <div className="checkbox-custom">
                        {curations[item.key] && (
                          <span className="checkbox-checkmark">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content-box">
                <p className="step-subtitle">Verify blueprint parameters before initializing engine.</p>
                
                <div className="summary-card">
                  <h3 className="summary-title">Onboarding Parameters</h3>
                  
                  <div className="summary-row">
                    <span className="summary-key">Evolution Track</span>
                    <span className="summary-value">{selectedRole}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-key">Target Objective</span>
                    <span className="summary-value" style={{ maxWidth: '240px', textAlign: 'right' }}>
                      {getObjectiveTitle()}
                    </span>
                  </div>

                  <div className="summary-row" style={{ alignItems: 'flex-start' }}>
                    <span className="summary-key">Active Engines</span>
                    <div className="summary-curation-list">
                      {Object.keys(curations).filter(k => curations[k]).map(key => {
                        const cur = curationsList.find(c => c.key === key);
                        return (
                          <span key={key} className="curation-badge">
                            {cur ? cur.label.split(' ').slice(1).join(' ') : key}
                          </span>
                        );
                      })}
                      {Object.keys(curations).filter(k => curations[k]).length === 0 && (
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>None selected</span>
                      )}
                    </div>
                  </div>

                  <div className="success-panel">
                    Your customized profile will feed directly into the <span className="success-accent">Vera Optimization Matrix</span>. Confirm and launch when ready.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="controls-row">
              {currentStep > 1 && (
                <button 
                  className="control-btn control-btn-back"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              
              <button 
                className="control-btn control-btn-next"
                disabled={
                  (currentStep === 1 && !selectedRole) ||
                  (currentStep === 2 && !selectedObjective)
                }
                onClick={handleNext}
              >
                {currentStep === 4 ? 'Launch Engine' : 'Continue'}
              </button>
            </div>
          </>
        ) : (
          <div className="step-content-box">
            <div className="summary-card" style={{ textAlign: 'center', alignItems: 'center', gap: '24px' }}>
              <div className="icon-circle" style={{ backgroundColor: 'rgba(255, 209, 102, 0.15)', width: '64px', height: '64px', margin: '0' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.886L4.2 9.08l4.757 3.82L7.045 18.78 12 15l4.955 3.78-1.912-5.877 4.757-3.82-5.888-.194L12 3Z" />
                </svg>
              </div>
              <h2 className="summary-title" style={{ border: 'none', padding: '0', textAlign: 'center', fontSize: '24px' }}>
                Evolution Initiated
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '14px', margin: '0', lineHeight: '1.6' }}>
                Welcome to the frontier, <span style={{ color: 'var(--gold)', fontWeight: '600', textTransform: 'capitalize' }}>{selectedRole}</span>.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '12.5px', margin: '0', lineHeight: '1.6' }}>
                The Vera Engine has successfully generated your trajectory blueprints. We are compiling your optimization data.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '12px' }}>
                <button className="control-btn control-btn-next" onClick={onCompleteOnboarding} style={{ width: '100%', boxSizing: 'border-box' }}>
                  Access Explore Directory →
                </button>
                <button className="control-btn control-btn-back" onClick={resetFlow} style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px' }}>
                  Restart Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer design */}
      <div className="footer-section">
        <span className="footer-left-version">VERA ENGINE V.4.02</span>
        <div className="footer-right-icons">
          {/* Globe Button */}
          <button className="footer-icon-btn" title="System Status: Connected">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </button>
          {/* Second Icon Button: Gear Settings */}
          <button className="footer-icon-btn" title="Encryption Active">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
