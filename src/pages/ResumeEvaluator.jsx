
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

// ─── Mock AI Results ───────────────────────────────────────────
const MOCK_RESULTS = {
  fresher: {
    score: 71,
    grade: 'B+',
    categories: [
      { label: 'Skills Relevance', score: 78, icon: '🧠', color: '#4A9EFF' },
      { label: 'Project Portfolio', score: 82, icon: '🛠️', color: '#2DD4A8' },
      { label: 'Education', score: 88, icon: '🎓', color: '#FFD166' },
      { label: 'Presentation', score: 65, icon: '✨', color: '#E74C6F' },
      { label: 'Experience', score: 44, icon: '📋', color: '#9B59B6' },
    ],
    detectedSkills: ['JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'Git', 'REST APIs', 'HTML/CSS'],
    missingSkills: ['TypeScript', 'Docker', 'AWS / Cloud', 'System Design'],
    missing: ['LinkedIn profile URL', 'GitHub portfolio link', 'Quantified project metrics', 'Certifications section'],
    strengths: ['Strong academic foundation', 'Relevant side projects', 'Clean resume structure'],
    gaps: [{ start: 'Jun 2022', end: 'Jan 2023', months: 7 }],
  },
  professional: {
    score: 79,
    grade: 'A−',
    categories: [
      { label: 'Experience Depth', score: 85, icon: '📋', color: '#4A9EFF' },
      { label: 'Skills Relevance', score: 80, icon: '🧠', color: '#2DD4A8' },
      { label: 'Leadership Impact', score: 72, icon: '👥', color: '#FFD166' },
      { label: 'Presentation', score: 76, icon: '✨', color: '#E74C6F' },
      { label: 'Portfolio / ROI', score: 82, icon: '📈', color: '#9B59B6' },
    ],
    detectedSkills: ['Product Strategy', 'Agile / Scrum', 'SQL', 'Stakeholder Mgmt', 'Data Analysis', 'Python', 'Jira', 'Roadmapping'],
    missingSkills: ['AI/ML fundamentals', 'Cloud architecture', 'P&L ownership narrative'],
    missing: ['Quantified revenue / cost impact', 'LinkedIn recommendations', 'Published articles or talks', 'Board / advisory history'],
    strengths: ['Clear career progression', 'Cross-functional expertise', 'Strong technical narrative'],
    gaps: [{ start: 'Mar 2021', end: 'Sep 2021', months: 6 }],
  },
};

const ANALYSIS_MESSAGES = [
  'Parsing document structure…',
  'Extracting skills inventory…',
  'Analyzing experience timeline…',
  'Evaluating presentation quality…',
  'Cross-referencing 2025 market demands…',
  'Computing Vera Intelligence Score…',
];

// ─── Animated Score Ring ───────────────────────────────────────
function ScoreRing({ score, grade }) {
  const circleRef = useRef(null);
  const scoreNumRef = useRef(null);
  const R = 70;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    const offset = CIRC - (score / 100) * CIRC;
    if (circleRef.current) {
      gsap.fromTo(circleRef.current,
        { strokeDashoffset: CIRC },
        { strokeDashoffset: offset, duration: 1.6, ease: 'power3.out', delay: 0.3 }
      );
    }
    if (scoreNumRef.current) {
      gsap.fromTo({ val: 0 }, { val: score },
        {
          duration: 1.6, ease: 'power3.out', delay: 0.3,
          onUpdate: function () { if (scoreNumRef.current) scoreNumRef.current.textContent = Math.round(this.targets()[0].val); }
        }
      );
    }
  }, [score]);

  const getColor = (s) => s >= 80 ? '#2DD4A8' : s >= 65 ? '#FFD166' : '#E74C6F';
  const color = getColor(score);

  return (
    <div style={{ position: 'relative', width: 180, height: 180, flexShrink: 0 }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <defs>
          <filter id="glow-ring">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(100,160,255,0.08)" strokeWidth="10" />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx="90" cy="90" r={R}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
          transform="rotate(-90 90 90)"
          filter="url(#glow-ring)"
          style={{ transition: 'stroke 0.3s' }}
        />
      </svg>
      {/* Center text */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span ref={scoreNumRef} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color, lineHeight: 1, letterSpacing: '-0.02em' }}>0</span>
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(240,244,255,0.4)', letterSpacing: '0.2em', marginTop: 2 }}>/ 100</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color, marginTop: 4, fontWeight: 600 }}>{grade}</span>
      </div>
    </div>
  );
}

// ─── Category Bar ──────────────────────────────────────────────
function CategoryBar({ label, score, icon, color, delay }) {
  const barRef = useRef(null);
  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current, { width: '0%' }, { width: `${score}%`, duration: 1.2, ease: 'power3.out', delay });
    }
  }, [score, delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{ fontSize: 16, width: 22, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 11.5, color: 'rgba(240,244,255,0.7)', fontFamily: "'Lato', sans-serif" }}>{label}</span>
          <span style={{ fontSize: 11.5, color, fontFamily: 'monospace', fontWeight: 700 }}>{score}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(100,160,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
          <div ref={barRef} style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 4, width: 0 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function ResumeEvaluator({ userType = 'fresher', onComplete, onSkip }) {
  const [phase, setPhase] = useState('upload'); // 'upload' | 'analyzing' | 'results'
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const uploadZoneRef = useRef(null);
  const resultsRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const progressBarRef = useRef(null);
  const msgIntervalRef = useRef(null);

  const results = MOCK_RESULTS[userType] || MOCK_RESULTS.fresher;

  // ── Background blobs ──
  useEffect(() => {
    gsap.to(blob1Ref.current, { x: 40, y: -30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2Ref.current, { x: -35, y: 25, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  // ── Entrance ──
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const startAnalysis = useCallback((name) => {
    setFileName(name);
    setPhase('analyzing');
    setMsgIdx(0);
    setProgress(0);

    let step = 0;
    const totalSteps = ANALYSIS_MESSAGES.length;
    const stepDuration = 600;

    msgIntervalRef.current = setInterval(() => {
      step++;
      setMsgIdx(step);
      setProgress(Math.round((step / totalSteps) * 100));
      if (step >= totalSteps) {
        clearInterval(msgIntervalRef.current);
        setTimeout(() => {
          setPhase('results');
          setTimeout(() => {
            if (resultsRef.current) {
              gsap.fromTo(resultsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
            }
          }, 50);
        }, 500);
      }
    }, stepDuration);
  }, []);

  useEffect(() => () => { if (msgIntervalRef.current) clearInterval(msgIntervalRef.current); }, []);

  const handleFile = (file) => {
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      startAnalysis(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const userLabel = userType === 'fresher' ? 'Fresher' : 'Professional';

  return (
    <div className="re-container">
      <style>{styles}</style>

      {/* Blobs */}
      <div className="re-blob re-blob-1" ref={blob1Ref} />
      <div className="re-blob re-blob-2" ref={blob2Ref} />

      {/* Top Bar */}
      <div className="re-topbar">
        <div className="re-logo">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, letterSpacing: '0.12em', color: '#F0F4FF' }}>
            Pathvera<span className="re-dot" />ai
          </span>
          <span className="re-badge">{userLabel} Track</span>
        </div>
        <div className="re-flow-steps">
          <span className="re-flow-step active">01 Resume</span>
          <span className="re-flow-arrow">→</span>
          <span className="re-flow-step">02 Jobs</span>
          <span className="re-flow-arrow">→</span>
          <span className="re-flow-step">03 Gap Fill</span>
        </div>
        {onSkip && (
          <button className="re-skip-btn" onClick={onSkip}>Skip to Explore →</button>
        )}
      </div>

      <div ref={containerRef} className="re-main" style={{ opacity: 0 }}>

        {/* ── UPLOAD PHASE ── */}
        {phase === 'upload' && (
          <div className="re-upload-section">
            <div className="re-upload-header">
              <h1 className="re-title">Upload Your Resume</h1>
              <p className="re-subtitle">
                Let Vera AI analyze your profile and surface the opportunities that match your exact trajectory.
              </p>
            </div>

            <div
              ref={uploadZoneRef}
              className={`re-drop-zone ${dragOver ? 're-drop-zone-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('re-file-input').click()}
            >
              <input id="re-file-input" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileInput} />
              <div className="re-drop-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="12" />
                  <line x1="15" y1="15" x2="12" y2="12" />
                </svg>
              </div>
              <p className="re-drop-primary">Drag & drop your resume here</p>
              <p className="re-drop-secondary">or <span className="re-drop-link">click to browse</span></p>
              <p className="re-drop-formats">PDF · DOC · DOCX &nbsp;·&nbsp; Max 10 MB</p>
            </div>

            <div className="re-info-cards">
              {[
                { icon: '🔍', title: 'AI-Powered Parsing', desc: 'Vera extracts skills, experience, and gaps from your resume instantly.' },
                { icon: '📊', title: 'Vera Intelligence Score', desc: 'Get scored on 5 key hiring dimensions against top performers.' },
                { icon: '🔒', title: 'Private & Secure', desc: 'Your resume is processed locally and never stored or shared.' },
              ].map((c, i) => (
                <div key={i} className="re-info-card">
                  <span className="re-info-icon">{c.icon}</span>
                  <div>
                    <p className="re-info-title">{c.title}</p>
                    <p className="re-info-desc">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYZING PHASE ── */}
        {phase === 'analyzing' && (
          <div className="re-analyzing-section">
            <div className="re-analyzing-orb">
              <div className="re-orb-pulse" />
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h2 className="re-analyzing-title">Vera Engine Analyzing</h2>
            <p className="re-analyzing-file">{fileName}</p>

            <div className="re-progress-track">
              <div className="re-progress-fill" style={{ width: `${progress}%`, transition: 'width 0.5s ease' }} />
            </div>
            <p className="re-progress-pct">{progress}%</p>

            <div className="re-msg-box">
              {ANALYSIS_MESSAGES.map((msg, i) => (
                <div key={i} className={`re-msg-row ${i < msgIdx ? 're-msg-done' : i === msgIdx ? 're-msg-active' : 're-msg-pending'}`}>
                  <span className="re-msg-check">{i < msgIdx ? '✓' : i === msgIdx ? '◆' : '○'}</span>
                  <span className="re-msg-text">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === 'results' && (
          <div ref={resultsRef} className="re-results-section" style={{ opacity: 0 }}>
            <div className="re-results-header">
              <div>
                <h1 className="re-title">Analysis Complete</h1>
                <p className="re-subtitle">Here's what Vera found in your profile.</p>
              </div>
              <div className="re-file-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>{fileName || 'resume.pdf'}</span>
              </div>
            </div>

            <div className="re-results-grid">
              {/* Score Card */}
              <div className="re-card re-score-card">
                <p className="re-card-label">VERA INTELLIGENCE SCORE</p>
                <ScoreRing score={results.score} grade={results.grade} />
                <div className="re-grade-desc">
                  {results.score >= 80 ? 'Excellent Profile' : results.score >= 65 ? 'Good Foundation' : 'Needs Improvement'}
                </div>
                <div className="re-strengths">
                  {results.strengths.map((s, i) => (
                    <div key={i} className="re-strength-chip">✓ {s}</div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="re-card re-breakdown-card">
                <p className="re-card-label">CATEGORY BREAKDOWN</p>
                {results.categories.map((cat, i) => (
                  <CategoryBar key={i} {...cat} delay={0.1 + i * 0.12} />
                ))}
              </div>

              {/* Detected Skills */}
              <div className="re-card re-skills-card">
                <p className="re-card-label">DETECTED SKILLS</p>
                <div className="re-chips-row">
                  {results.detectedSkills.map((s, i) => (
                    <span key={i} className="re-chip re-chip-green">{s}</span>
                  ))}
                </div>
                <p className="re-card-label" style={{ marginTop: 20 }}>SKILL GAPS TO FILL</p>
                <div className="re-chips-row">
                  {results.missingSkills.map((s, i) => (
                    <span key={i} className="re-chip re-chip-orange">{s}</span>
                  ))}
                </div>
              </div>

              {/* Missing Elements */}
              <div className="re-card re-missing-card">
                <p className="re-card-label">MISSING ELEMENTS</p>
                <div className="re-missing-list">
                  {results.missing.map((m, i) => (
                    <div key={i} className="re-missing-item">
                      <span className="re-missing-icon">⚠</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
                {results.gaps.length > 0 && (
                  <>
                    <p className="re-card-label" style={{ marginTop: 20 }}>DETECTED GAPS</p>
                    {results.gaps.map((g, i) => (
                      <div key={i} className="re-gap-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {g.start} → {g.end} &nbsp;<strong>({g.months} months)</strong>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="re-cta-row">
              <button className="re-cta-primary" onClick={() => onComplete && onComplete(results)}>
                View Matching Jobs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button className="re-cta-secondary" onClick={() => setPhase('upload')}>Re-upload Resume</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Lato:wght@300;400;700&family=Bebas+Neue&display=swap');

  .re-container {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: #070D1A;
    color: #F0F4FF;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  .re-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
  }
  .re-blob-1 { top: 10%; left: 5%; width: 400px; height: 400px; background: rgba(74,158,255,0.4); }
  .re-blob-2 { bottom: 15%; right: 5%; width: 350px; height: 350px; background: rgba(255,209,102,0.3); }

  .re-dot {
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #FFD166;
    box-shadow: 0 0 10px rgba(255,209,102,0.6);
    vertical-align: middle;
    margin: 0 2px;
  }

  /* ── Top Bar ── */
  .re-topbar {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 48px;
    border-bottom: 1px solid rgba(100,160,255,0.08);
    background: rgba(7,13,26,0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    gap: 16px;
    flex-wrap: wrap;
  }
  .re-logo { display: flex; align-items: center; gap: 12px; }
  .re-badge {
    font-family: monospace; font-size: 9px; font-weight: 700;
    letter-spacing: 0.3em; text-transform: uppercase;
    background: rgba(255,209,102,0.12); border: 1px solid rgba(255,209,102,0.25);
    color: #FFD166; padding: 3px 10px; border-radius: 20px;
  }
  .re-flow-steps { display: flex; align-items: center; gap: 8px; }
  .re-flow-step {
    font-family: monospace; font-size: 10px; font-weight: 700;
    letter-spacing: 0.15em; color: rgba(240,244,255,0.25);
    text-transform: uppercase;
  }
  .re-flow-step.active { color: #FFD166; }
  .re-flow-arrow { color: rgba(240,244,255,0.15); font-size: 12px; }
  .re-skip-btn {
    background: none; border: 1px solid rgba(100,160,255,0.15);
    border-radius: 20px; padding: 6px 14px; color: rgba(240,244,255,0.4);
    font-size: 11px; font-family: 'Lato', sans-serif; cursor: pointer;
    transition: all 0.2s;
  }
  .re-skip-btn:hover { color: #FFD166; border-color: rgba(255,209,102,0.3); }

  /* ── Main Content ── */
  .re-main {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  /* ── Upload ── */
  .re-upload-section { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 40px; }
  .re-upload-header { text-align: center; }
  .re-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300;
    color: #F0F4FF; margin: 0 0 12px;
    letter-spacing: 0.02em; line-height: 1.1;
  }
  .re-subtitle { font-size: 15px; color: #6B84A3; line-height: 1.8; margin: 0; max-width: 520px; text-align: center; }

  .re-drop-zone {
    width: 100%; max-width: 580px;
    background: rgba(100,160,255,0.03);
    border: 2px dashed rgba(100,160,255,0.2);
    border-radius: 20px; padding: 64px 40px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    cursor: pointer; transition: all 0.3s ease; box-sizing: border-box;
  }
  .re-drop-zone:hover, .re-drop-zone-over {
    border-color: rgba(255,209,102,0.5);
    background: rgba(255,209,102,0.04);
    box-shadow: 0 0 40px rgba(255,209,102,0.08);
  }
  .re-drop-icon { color: rgba(240,244,255,0.25); transition: color 0.3s; }
  .re-drop-zone:hover .re-drop-icon, .re-drop-zone-over .re-drop-icon { color: #FFD166; }
  .re-drop-primary { font-size: 18px; color: #F0F4FF; font-family: "'Cormorant Garamond', serif"; margin: 0; }
  .re-drop-secondary { font-size: 13px; color: #6B84A3; margin: 0; }
  .re-drop-link { color: #FFD166; text-decoration: underline; }
  .re-drop-formats { font-family: monospace; font-size: 10px; color: rgba(107,132,163,0.6); letter-spacing: 0.1em; margin: 0; margin-top: 8px; }

  .re-info-cards { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 720px; }
  .re-info-card {
    flex: 1; min-width: 200px; max-width: 220px;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.09);
    border-radius: 12px; padding: 20px; display: flex; gap: 14px; align-items: flex-start;
  }
  .re-info-icon { font-size: 22px; flex-shrink: 0; }
  .re-info-title { font-size: 13px; color: #F0F4FF; margin: 0 0 4px; font-weight: 600; }
  .re-info-desc { font-size: 11.5px; color: #6B84A3; margin: 0; line-height: 1.6; }

  /* ── Analyzing ── */
  .re-analyzing-section { display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center; width: 100%; max-width: 520px; }
  .re-analyzing-orb {
    position: relative; width: 120px; height: 120px;
    display: flex; align-items: center; justify-content: center;
  }
  .re-orb-pulse {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(255,209,102,0.1); border: 1px solid rgba(255,209,102,0.2);
    animation: orb-pulse 2s infinite ease-in-out;
  }
  @keyframes orb-pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.12); opacity: 1; }
  }
  .re-analyzing-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; margin: 0; color: #F0F4FF; }
  .re-analyzing-file { font-family: monospace; font-size: 11px; color: #6B84A3; letter-spacing: 0.1em; margin: 0; }

  .re-progress-track { width: 100%; height: 4px; background: rgba(100,160,255,0.1); border-radius: 2px; overflow: hidden; }
  .re-progress-fill { height: 100%; background: linear-gradient(90deg, #FFD166, #4A9EFF); border-radius: 2px; }
  .re-progress-pct { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #FFD166; margin: 0; letter-spacing: 0.05em; }

  .re-msg-box { width: 100%; display: flex; flex-direction: column; gap: 10px; text-align: left; }
  .re-msg-row { display: flex; align-items: center; gap: 12px; transition: all 0.3s; }
  .re-msg-check { font-family: monospace; font-size: 13px; width: 18px; flex-shrink: 0; }
  .re-msg-text { font-size: 13px; font-family: 'Lato', sans-serif; }
  .re-msg-done .re-msg-check { color: #2DD4A8; }
  .re-msg-done .re-msg-text { color: rgba(240,244,255,0.4); }
  .re-msg-active .re-msg-check { color: #FFD166; animation: blink 0.8s infinite; }
  .re-msg-active .re-msg-text { color: #F0F4FF; font-weight: 600; }
  .re-msg-pending .re-msg-check { color: rgba(240,244,255,0.15); }
  .re-msg-pending .re-msg-text { color: rgba(240,244,255,0.2); }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  /* ── Results ── */
  .re-results-section { width: 100%; display: flex; flex-direction: column; gap: 28px; }
  .re-results-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px; }
  .re-file-tag {
    display: flex; align-items: center; gap: 8px;
    font-family: monospace; font-size: 11px; color: #6B84A3; letter-spacing: 0.08em;
    background: rgba(100,160,255,0.06); border: 1px solid rgba(100,160,255,0.1);
    padding: 6px 14px; border-radius: 20px;
  }

  .re-results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .re-card {
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.09);
    border-radius: 16px; padding: 28px;
  }
  .re-card-label { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.35em; color: rgba(107,132,163,0.7); text-transform: uppercase; margin: 0 0 20px; }

  .re-score-card { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .re-grade-desc { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: rgba(240,244,255,0.5); letter-spacing: 0.1em; }
  .re-strengths { display: flex; flex-direction: column; gap: 8px; width: 100%; }
  .re-strength-chip { font-size: 12px; color: #2DD4A8; background: rgba(45,212,168,0.08); border: 1px solid rgba(45,212,168,0.15); border-radius: 6px; padding: 6px 12px; }

  .re-chips-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .re-chip { font-size: 11.5px; padding: 4px 12px; border-radius: 6px; font-weight: 600; }
  .re-chip-green { background: rgba(45,212,168,0.1); border: 1px solid rgba(45,212,168,0.2); color: #2DD4A8; }
  .re-chip-orange { background: rgba(255,209,102,0.1); border: 1px solid rgba(255,209,102,0.2); color: #FFD166; }

  .re-missing-list { display: flex; flex-direction: column; gap: 10px; }
  .re-missing-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(240,244,255,0.65); }
  .re-missing-icon { color: #E74C6F; flex-shrink: 0; font-size: 14px; margin-top: 1px; }
  .re-gap-badge {
    display: flex; align-items: center; gap: 8px;
    background: rgba(231,76,111,0.08); border: 1px solid rgba(231,76,111,0.15);
    border-radius: 8px; padding: 10px 14px; font-size: 12.5px; color: rgba(240,244,255,0.7);
    margin-top: 8px;
  }
  .re-gap-badge svg { color: #E74C6F; flex-shrink: 0; }
  .re-gap-badge strong { color: #E74C6F; }

  /* ── CTA ── */
  .re-cta-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
  .re-cta-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #FFD166; color: #070D1A;
    border: none; border-radius: 10px; padding: 16px 36px;
    font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
    transition: all 0.25s ease;
  }
  .re-cta-primary:hover { box-shadow: 0 0 32px rgba(255,209,102,0.35); filter: brightness(1.05); transform: translateY(-1px); }
  .re-cta-secondary {
    background: transparent; border: 1px solid rgba(100,160,255,0.2);
    border-radius: 10px; padding: 16px 28px; color: rgba(240,244,255,0.6);
    font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
    transition: all 0.25s;
  }
  .re-cta-secondary:hover { border-color: rgba(240,244,255,0.35); color: #F0F4FF; }

  @media (max-width: 768px) {
    .re-topbar { padding: 16px 24px; }
    .re-main { padding: 32px 16px; }
    .re-results-grid { grid-template-columns: 1fr; }
    .re-title { font-size: 30px; }
    .re-flow-steps { display: none; }
  }
`;
