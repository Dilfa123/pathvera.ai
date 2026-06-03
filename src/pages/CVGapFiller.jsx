
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// ─── Mock Resume Timeline ──────────────────────────────────────
const TIMELINES = {
  fresher: {
    entries: [
      { id: 'e1', label: 'B.Tech — Computer Science', org: 'VIT University', start: 'Aug 2018', end: 'May 2022', type: 'education' },
      { id: 'g1', label: '⚠ Career Gap', start: 'Jun 2022', end: 'Jan 2023', type: 'gap', months: 7 },
      { id: 'e2', label: 'Freelance Projects', org: 'Self-employed', start: 'Feb 2023', end: 'Aug 2023', type: 'work' },
      { id: 'e3', label: 'Currently Job Seeking', org: '', start: 'Sep 2023', end: 'Present', type: 'current' },
    ],
  },
  professional: {
    entries: [
      { id: 'e1', label: 'B.E — Electronics', org: 'BITS Pilani', start: 'Jul 2016', end: 'Jun 2020', type: 'education' },
      { id: 'e2', label: 'Software Engineer', org: 'Wipro Technologies', start: 'Jul 2020', end: 'Feb 2021', type: 'work' },
      { id: 'g1', label: '⚠ Career Gap', start: 'Mar 2021', end: 'Sep 2021', type: 'gap', months: 6 },
      { id: 'e3', label: 'Senior Engineer', org: 'Paytm', start: 'Oct 2021', end: 'Feb 2023', type: 'work' },
      { id: 'g2', label: '⚠ Career Gap', start: 'Mar 2023', end: 'Jul 2023', type: 'gap', months: 4 },
      { id: 'e4', label: 'Lead Engineer', org: 'Current Company', start: 'Aug 2023', end: 'Present', type: 'current' },
    ],
  },
};

// ─── Gap Suggestions ───────────────────────────────────────────
const GAP_SUGGESTIONS = {
  g1_fresher: {
    title: 'Jun 2022 – Jan 2023 (7 months)',
    courses: [
      { name: 'Full Stack Web Development', platform: 'Coursera (Meta)', duration: '6 months', level: 'Intermediate' },
      { name: 'Data Structures & Algorithms', platform: 'Udemy', duration: '2 months', level: 'Advanced' },
      { name: 'AWS Cloud Practitioner', platform: 'AWS Training', duration: '1 month', level: 'Beginner' },
    ],
    certs: ['AWS Cloud Practitioner', 'Google IT Support', 'Meta Front-End Developer'],
    projects: [
      'Build a full-stack e-commerce app with React + Node.js',
      'Create a real-time chat application using WebSockets',
      'Develop a data dashboard with Python + Streamlit',
    ],
    narrative: "During this period, I focused on deepening my technical foundations through self-directed learning, completing industry-recognized certifications in cloud computing while building three production-grade projects that are now part of my GitHub portfolio. This deliberate upskilling phase prepared me to contribute effectively from day one in a professional environment.",
  },
  g1_professional: {
    title: 'Mar 2021 – Sep 2021 (6 months)',
    courses: [
      { name: 'Machine Learning Specialization', platform: 'Coursera (Stanford)', duration: '3 months', level: 'Advanced' },
      { name: 'System Design Masterclass', platform: 'Educative.io', duration: '1.5 months', level: 'Advanced' },
      { name: 'Product Management Fundamentals', platform: 'Product School', duration: '2 months', level: 'Intermediate' },
    ],
    certs: ['AWS Solutions Architect', 'Google Cloud Professional', 'PMP Certification'],
    projects: [
      'Design and document a high-availability microservices architecture',
      'Build an ML pipeline for real-time recommendations',
      'Open-source contribution to a major framework',
    ],
    narrative: "I took this career break intentionally to upskill in AI/ML and cloud architecture — areas I identified as critical for the next phase of my career. I completed an advanced ML specialization from Stanford and earned AWS Solutions Architect certification. This investment has directly enabled me to architect AI-powered features in my current role with measurable business impact.",
  },
  g2_professional: {
    title: 'Mar 2023 – Jul 2023 (4 months)',
    courses: [
      { name: 'Executive Leadership Program', platform: 'Harvard Online', duration: '3 months', level: 'Executive' },
      { name: 'Strategic Product Management', platform: 'SVPG', duration: '6 weeks', level: 'Advanced' },
    ],
    certs: ['Certified Scrum Master (CSM)', 'Leadership Excellence Certificate'],
    projects: [
      'Draft a startup pitch deck and validate with 5 potential investors',
      'Write 3 technical articles on your domain for LinkedIn/Medium',
      'Mentor 2-3 junior engineers through structured sessions',
    ],
    narrative: "I used this transition period to pursue executive leadership education and clarify my strategic vision before committing to the right opportunity. I completed a leadership program while consulting for two early-stage startups, which gave me hands-on exposure to product strategy and org building that directly informs my leadership approach today.",
  },
};

// ─── Timeline Entry ────────────────────────────────────────────
function TimelineEntry({ entry, isSelected, onClick, totalWidth, position }) {
  const typeColor = { education: '#4A9EFF', work: '#2DD4A8', current: '#FFD166', gap: '#E74C6F' };
  const color = typeColor[entry.type] || '#6B84A3';
  const isGap = entry.type === 'gap';

  return (
    <div
      className={`gf-tl-entry ${isGap ? 'gf-tl-gap' : ''} ${isSelected ? 'gf-tl-selected' : ''}`}
      onClick={() => isGap && onClick(entry.id)}
      style={{ '--entry-color': color, cursor: isGap ? 'pointer' : 'default' }}
    >
      <div className="gf-tl-bar" style={{ background: isGap ? `repeating-linear-gradient(45deg, ${color}15, ${color}15 4px, transparent 4px, transparent 10px)` : `${color}15`, border: `1px solid ${color}25`, borderColor: isSelected ? color : `${color}30` }}>
        {isGap && (
          <div className="gf-tl-gap-badge" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
            {entry.months}mo gap
          </div>
        )}
        {!isGap && <div className="gf-tl-dot" style={{ background: color }} />}
      </div>
      <div className="gf-tl-label" style={{ color: isGap ? color : 'rgba(240,244,255,0.7)' }}>
        <span className="gf-tl-title">{isGap ? '⚠ Gap' : entry.label}</span>
        {entry.org && <span className="gf-tl-org">{entry.org}</span>}
        <span className="gf-tl-dates">{entry.start} – {entry.end}</span>
      </div>
    </div>
  );
}

// ─── Narrative Box ─────────────────────────────────────────────
function NarrativeBox({ text, isGenerating }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!isGenerating || !text) return;
    setDisplayed('');
    setDone(false);
    idxRef.current = 0;
    const interval = setInterval(() => {
      idxRef.current++;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) { clearInterval(interval); setDone(true); }
    }, 18);
    return () => clearInterval(interval);
  }, [isGenerating, text]);

  if (!isGenerating && !displayed) return null;

  return (
    <div className="gf-narrative-box">
      <div className="gf-narrative-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>Vera-Generated Interview Narrative</span>
      </div>
      <p className="gf-narrative-text">
        "{displayed}{!done && isGenerating && <span className="gf-cursor">|</span>}"
      </p>
      {done && (
        <button className="gf-copy-btn" onClick={() => navigator.clipboard?.writeText(text)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy Narrative
        </button>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function CVGapFiller({ userType = 'fresher', resumeData, onComplete, onSkip }) {
  const [selectedGapId, setSelectedGapId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrativeKey, setNarrativeKey] = useState(null);

  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const detailRef = useRef(null);

  const timeline = TIMELINES[userType] || TIMELINES.fresher;
  const gaps = timeline.entries.filter(e => e.type === 'gap');
  const userLabel = userType === 'fresher' ? 'Fresher' : 'Professional';

  useEffect(() => {
    gsap.to(blob1Ref.current, { x: 35, y: -28, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2Ref.current, { x: -30, y: 22, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  }, []);

  const getSuggestions = (gapId) => {
    const key = `${gapId}_${userType}`;
    return GAP_SUGGESTIONS[key] || Object.values(GAP_SUGGESTIONS)[0];
  };

  const handleGapSelect = (gapId) => {
    const wasSelected = selectedGapId === gapId;
    setSelectedGapId(wasSelected ? null : gapId);
    setIsGenerating(false);
    setNarrativeKey(null);
    if (!wasSelected && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleGenerateNarrative = () => {
    setIsGenerating(true);
    setNarrativeKey(selectedGapId);
  };

  const selectedSuggestions = selectedGapId ? getSuggestions(selectedGapId) : null;

  return (
    <div className="gf-container">
      <style>{gfStyles}</style>

      <div className="gf-blob gf-blob-1" ref={blob1Ref} />
      <div className="gf-blob gf-blob-2" ref={blob2Ref} />

      {/* Top Bar */}
      <div className="gf-topbar">
        <div className="gf-logo">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, letterSpacing: '0.12em', color: '#F0F4FF' }}>
            Pathvera<span className="gf-dot" />ai
          </span>
          <span className="gf-badge">{userLabel} Track</span>
        </div>
        <div className="gf-flow-steps">
          <span className="gf-flow-step gf-flow-done">01 Resume ✓</span>
          <span className="gf-flow-arrow">→</span>
          <span className="gf-flow-step gf-flow-done">02 Jobs ✓</span>
          <span className="gf-flow-arrow">→</span>
          <span className="gf-flow-step active">03 Gap Fill</span>
        </div>
        {onSkip && <button className="gf-skip-btn" onClick={onSkip}>Skip to Explore →</button>}
      </div>

      <div ref={containerRef} className="gf-main" style={{ opacity: 0 }}>
        {/* Header */}
        <div className="gf-header">
          <div>
            <h1 className="gf-title">CV Gap Analyzer</h1>
            <p className="gf-subtitle">
              Vera detected <strong style={{ color: '#E74C6F' }}>{gaps.length} career gap{gaps.length !== 1 ? 's' : ''}</strong> in your timeline.
              Click a gap to get AI-powered strategies to address it.
            </p>
          </div>
          <div className="gf-gap-count-pill">
            <span style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: '#E74C6F', lineHeight: 1 }}>{gaps.length}</span>
            <span style={{ fontSize: 11, color: '#6B84A3', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Gap{gaps.length !== 1 ? 's' : ''} Found</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="gf-section">
          <p className="gf-section-label">CAREER TIMELINE — CLICK A GAP TO ANALYZE</p>
          <div className="gf-timeline-container">
            <div className="gf-timeline-track">
              {timeline.entries.map((entry, i) => (
                <TimelineEntry key={entry.id} entry={entry} isSelected={selectedGapId === entry.id} onClick={handleGapSelect} />
              ))}
            </div>
          </div>
        </div>

        {/* Gap Detail */}
        {selectedGapId && selectedSuggestions && (
          <div ref={detailRef} className="gf-detail-section">
            <div className="gf-detail-header">
              <div className="gf-detail-icon">⚠</div>
              <div>
                <h2 className="gf-detail-title">Gap Analysis: {selectedSuggestions.title}</h2>
                <p className="gf-detail-sub">Here's how to strategically address and frame this gap in your resume and interviews.</p>
              </div>
            </div>

            <div className="gf-detail-grid">
              {/* Courses */}
              <div className="gf-detail-card">
                <p className="gf-detail-card-label">📚 RECOMMENDED COURSES</p>
                <div className="gf-course-list">
                  {selectedSuggestions.courses.map((c, i) => (
                    <div key={i} className="gf-course-item">
                      <div className="gf-course-icon">{i + 1}</div>
                      <div>
                        <p className="gf-course-name">{c.name}</p>
                        <div className="gf-course-meta">
                          <span>{c.platform}</span>
                          <span className="gf-meta-dot" />
                          <span>{c.duration}</span>
                          <span className="gf-meta-dot" />
                          <span className={`gf-level-badge gf-level-${c.level.toLowerCase().split(' ')[0]}`}>{c.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="gf-detail-card">
                <p className="gf-detail-card-label">🏆 CERTIFICATIONS TO EARN</p>
                <div className="gf-cert-list">
                  {selectedSuggestions.certs.map((c, i) => (
                    <div key={i} className="gf-cert-item">
                      <div className="gf-cert-badge">✓</div>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                <p className="gf-detail-card-label" style={{ marginTop: 24 }}>🛠️ PORTFOLIO PROJECTS</p>
                <div className="gf-project-list">
                  {selectedSuggestions.projects.map((p, i) => (
                    <div key={i} className="gf-project-item">
                      <div className="gf-project-num">{i + 1}</div>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Narrative Generator */}
            <div className="gf-narrative-section">
              <div className="gf-narrative-intro">
                <div>
                  <h3 className="gf-narrative-title">Interview Narrative Generator</h3>
                  <p className="gf-narrative-desc">
                    Let Vera craft a compelling, honest narrative you can use when interviewers ask about this gap.
                  </p>
                </div>
                <button
                  className={`gf-generate-btn ${isGenerating || narrativeKey === selectedGapId ? 'gf-generate-btn-done' : ''}`}
                  onClick={handleGenerateNarrative}
                  disabled={isGenerating && narrativeKey !== selectedGapId}
                >
                  {narrativeKey === selectedGapId ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Generated
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Generate with Vera AI
                    </>
                  )}
                </button>
              </div>

              <NarrativeBox
                text={selectedSuggestions.narrative}
                isGenerating={narrativeKey === selectedGapId}
              />
            </div>
          </div>
        )}

        {/* Prompt to click */}
        {!selectedGapId && gaps.length > 0 && (
          <div className="gf-prompt-card">
            <div style={{ fontSize: 40, marginBottom: 12 }}>👆</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#F0F4FF', margin: '0 0 8px' }}>
              Select a gap from the timeline above
            </p>
            <p style={{ fontSize: 13, color: '#6B84A3', margin: 0 }}>
              Click any ⚠ gap marker to see AI strategies, course recommendations, and interview narratives.
            </p>
          </div>
        )}

        {/* Final CTA */}
        <div className="gf-final-cta">
          <div className="gf-cta-content">
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: '#F0F4FF', margin: '0 0 8px' }}>
                Your Vera Profile is Ready
              </h3>
              <p style={{ fontSize: 13, color: '#6B84A3', margin: 0, lineHeight: 1.7 }}>
                Resume analyzed, jobs matched, gaps addressed. Time to explore programs that accelerate your trajectory further.
              </p>
            </div>
            <button className="gf-enter-btn" onClick={() => onComplete && onComplete()}>
              Enter Explore Directory
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const gfStyles = `
  .gf-container { position: relative; width: 100vw; min-height: 100vh; background: #070D1A; color: #F0F4FF; font-family: 'Lato', sans-serif; font-weight: 300; overflow-x: hidden; }
  .gf-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.06; pointer-events: none; z-index: 0; }
  .gf-blob-1 { top: 5%; left: 0; width: 400px; height: 400px; background: rgba(231,76,111,0.4); }
  .gf-blob-2 { bottom: 10%; right: 0; width: 350px; height: 350px; background: rgba(74,158,255,0.3); }
  .gf-dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #FFD166; box-shadow: 0 0 10px rgba(255,209,102,0.6); vertical-align: middle; margin: 0 2px; }

  .gf-topbar {
    position: relative; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px; border-bottom: 1px solid rgba(100,160,255,0.08);
    background: rgba(7,13,26,0.85); backdrop-filter: blur(12px);
    gap: 16px; flex-wrap: wrap;
  }
  .gf-logo { display: flex; align-items: center; gap: 12px; }
  .gf-badge { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; background: rgba(255,209,102,0.12); border: 1px solid rgba(255,209,102,0.25); color: #FFD166; padding: 3px 10px; border-radius: 20px; }
  .gf-flow-steps { display: flex; align-items: center; gap: 8px; }
  .gf-flow-step { font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; color: rgba(240,244,255,0.2); text-transform: uppercase; }
  .gf-flow-step.active { color: #FFD166; }
  .gf-flow-done { color: #2DD4A8 !important; }
  .gf-flow-arrow { color: rgba(240,244,255,0.15); font-size: 12px; }
  .gf-skip-btn { background: none; border: 1px solid rgba(100,160,255,0.15); border-radius: 20px; padding: 6px 14px; color: rgba(240,244,255,0.4); font-size: 11px; cursor: pointer; transition: all 0.2s; }
  .gf-skip-btn:hover { color: #FFD166; border-color: rgba(255,209,102,0.3); }

  .gf-main { position: relative; z-index: 1; max-width: 1000px; margin: 0 auto; padding: 48px 24px 80px; }

  .gf-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
  .gf-title { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; margin: 0 0 10px; }
  .gf-subtitle { font-size: 15px; color: #6B84A3; margin: 0; line-height: 1.7; }
  .gf-gap-count-pill { background: rgba(231,76,111,0.06); border: 1px solid rgba(231,76,111,0.15); border-radius: 14px; padding: 16px 24px; display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }

  .gf-section { margin-bottom: 40px; }
  .gf-section-label { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.35em; color: rgba(107,132,163,0.6); text-transform: uppercase; margin: 0 0 20px; }

  /* ── Timeline ── */
  .gf-timeline-container { overflow-x: auto; padding-bottom: 12px; }
  .gf-timeline-track { display: flex; gap: 0; min-width: max-content; align-items: stretch; }

  .gf-tl-entry { display: flex; flex-direction: column; align-items: center; cursor: default; flex: 1; min-width: 130px; max-width: 180px; }
  .gf-tl-bar {
    width: 100%; height: 56px; border-radius: 8px; margin-bottom: 10px;
    display: flex; align-items: center; justify-content: center;
    position: relative; transition: all 0.25s; border: 1px solid rgba(100,160,255,0.1);
  }
  .gf-tl-gap .gf-tl-bar { border-style: dashed; }
  .gf-tl-gap { cursor: pointer !important; }
  .gf-tl-gap:hover .gf-tl-bar { border-color: var(--entry-color) !important; box-shadow: 0 0 20px rgba(231,76,111,0.15); }
  .gf-tl-selected .gf-tl-bar { border-color: var(--entry-color) !important; box-shadow: 0 0 24px rgba(231,76,111,0.2); }
  .gf-tl-gap-badge { font-family: monospace; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
  .gf-tl-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--entry-color); }
  .gf-tl-label { display: flex; flex-direction: column; gap: 3px; text-align: center; padding: 0 8px; }
  .gf-tl-title { font-size: 11px; color: rgba(240,244,255,0.7); font-weight: 600; }
  .gf-tl-org { font-size: 10px; color: rgba(107,132,163,0.7); }
  .gf-tl-dates { font-family: monospace; font-size: 9px; color: rgba(107,132,163,0.5); letter-spacing: 0.05em; }

  /* ── Detail ── */
  .gf-detail-section { margin-bottom: 40px; }
  .gf-detail-header {
    display: flex; align-items: flex-start; gap: 20px;
    background: rgba(231,76,111,0.06); border: 1px solid rgba(231,76,111,0.15);
    border-radius: 16px; padding: 24px 28px; margin-bottom: 24px;
  }
  .gf-detail-icon { font-size: 28px; flex-shrink: 0; color: #E74C6F; }
  .gf-detail-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #F0F4FF; margin: 0 0 6px; }
  .gf-detail-sub { font-size: 13px; color: #6B84A3; margin: 0; line-height: 1.6; }

  .gf-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
  .gf-detail-card { background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.09); border-radius: 16px; padding: 24px; }
  .gf-detail-card-label { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.3em; color: rgba(107,132,163,0.7); text-transform: uppercase; margin: 0 0 16px; }

  .gf-course-list { display: flex; flex-direction: column; gap: 14px; }
  .gf-course-item { display: flex; gap: 14px; align-items: flex-start; }
  .gf-course-icon { width: 28px; height: 28px; border-radius: 6px; background: rgba(74,158,255,0.15); border: 1px solid rgba(74,158,255,0.25); color: #4A9EFF; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 14px; flex-shrink: 0; }
  .gf-course-name { font-size: 13px; color: #F0F4FF; margin: 0 0 5px; font-weight: 600; }
  .gf-course-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .gf-course-meta span { font-size: 11px; color: #6B84A3; }
  .gf-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #6B84A3; }
  .gf-level-badge { font-size: 10px !important; padding: 1px 7px; border-radius: 4px; font-weight: 700 !important; }
  .gf-level-beginner { background: rgba(45,212,168,0.1); color: #2DD4A8 !important; }
  .gf-level-intermediate { background: rgba(255,209,102,0.1); color: #FFD166 !important; }
  .gf-level-advanced { background: rgba(231,76,111,0.1); color: #E74C6F !important; }
  .gf-level-executive { background: rgba(155,89,182,0.1); color: #9B59B6 !important; }

  .gf-cert-list { display: flex; flex-direction: column; gap: 10px; }
  .gf-cert-item { display: flex; align-items: center; gap: 12px; font-size: 13px; color: rgba(240,244,255,0.8); }
  .gf-cert-badge { width: 22px; height: 22px; border-radius: 50%; background: rgba(45,212,168,0.15); border: 1px solid rgba(45,212,168,0.3); color: #2DD4A8; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .gf-project-list { display: flex; flex-direction: column; gap: 10px; }
  .gf-project-item { display: flex; gap: 12px; align-items: flex-start; font-size: 12.5px; color: rgba(240,244,255,0.7); line-height: 1.5; }
  .gf-project-num { width: 22px; height: 22px; border-radius: 5px; background: rgba(155,89,182,0.15); border: 1px solid rgba(155,89,182,0.25); color: #9B59B6; font-size: 11px; font-weight: 700; font-family: monospace; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* ── Narrative ── */
  .gf-narrative-section { background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1); border-radius: 16px; padding: 28px; }
  .gf-narrative-intro { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
  .gf-narrative-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: #F0F4FF; margin: 0 0 6px; }
  .gf-narrative-desc { font-size: 13px; color: #6B84A3; margin: 0; line-height: 1.6; }
  .gf-generate-btn {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, rgba(255,209,102,0.15), rgba(255,209,102,0.05));
    border: 1px solid rgba(255,209,102,0.4); color: #FFD166;
    border-radius: 10px; padding: 12px 22px;
    font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
    transition: all 0.25s; white-space: nowrap; flex-shrink: 0;
  }
  .gf-generate-btn:hover:not(:disabled) { box-shadow: 0 0 24px rgba(255,209,102,0.2); }
  .gf-generate-btn-done { background: rgba(45,212,168,0.1); border-color: rgba(45,212,168,0.3); color: #2DD4A8; }

  .gf-narrative-box { background: rgba(255,209,102,0.04); border: 1px solid rgba(255,209,102,0.12); border-radius: 12px; padding: 20px 24px; }
  .gf-narrative-header { display: flex; align-items: center; gap: 8px; font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.3em; color: #FFD166; text-transform: uppercase; margin-bottom: 14px; }
  .gf-narrative-text { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: rgba(240,244,255,0.85); line-height: 1.9; margin: 0 0 14px; font-style: italic; }
  .gf-cursor { display: inline-block; width: 2px; height: 18px; background: #FFD166; margin-left: 2px; vertical-align: text-bottom; animation: blink 0.7s infinite; }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  .gf-copy-btn { display: flex; align-items: center; gap: 6px; background: none; border: 1px solid rgba(255,209,102,0.2); border-radius: 6px; padding: 6px 12px; color: rgba(255,209,102,0.7); font-size: 11px; cursor: pointer; transition: all 0.2s; font-family: 'Lato', sans-serif; }
  .gf-copy-btn:hover { color: #FFD166; border-color: rgba(255,209,102,0.4); }

  /* ── Prompt ── */
  .gf-prompt-card { text-align: center; background: rgba(100,160,255,0.03); border: 1px dashed rgba(100,160,255,0.1); border-radius: 20px; padding: 48px; margin-bottom: 40px; }

  /* ── Final CTA ── */
  .gf-final-cta { background: linear-gradient(135deg, rgba(255,209,102,0.06), rgba(74,158,255,0.04)); border: 1px solid rgba(255,209,102,0.15); border-radius: 20px; padding: 36px 40px; position: relative; overflow: hidden; }
  .gf-final-cta::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #FFD166, #4A9EFF); }
  .gf-cta-content { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
  .gf-enter-btn {
    display: flex; align-items: center; gap: 10px;
    background: #FFD166; color: #070D1A;
    border: none; border-radius: 10px; padding: 16px 32px;
    font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
    transition: all 0.25s; white-space: nowrap;
  }
  .gf-enter-btn:hover { box-shadow: 0 0 32px rgba(255,209,102,0.35); transform: translateY(-1px); }

  @media (max-width: 768px) {
    .gf-topbar { padding: 16px 20px; }
    .gf-main { padding: 28px 16px; }
    .gf-title { font-size: 28px; }
    .gf-detail-grid { grid-template-columns: 1fr; }
    .gf-flow-steps { display: none; }
    .gf-final-cta { padding: 24px 20px; }
    .gf-enter-btn { width: 100%; justify-content: center; }
  }
`;
