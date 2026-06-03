
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// ─── Mock Job Data ─────────────────────────────────────────────
const JOBS = {
  fresher: [
    {
      id: 'f1', title: 'Junior Frontend Developer', company: 'Razorpay', location: 'Bangalore · Hybrid',
      salary: '₹6 – 10 LPA', match: 94, type: 'Full-time',
      tags: ['React', 'JavaScript', 'CSS'],
      why: 'Your React + JavaScript project experience aligns directly with their stack. Your portfolio demonstrates UI craftsmanship they explicitly request.',
      color: '#4A9EFF',
    },
    {
      id: 'f2', title: 'Associate Data Analyst', company: 'Flipkart', location: 'Bangalore · On-site',
      salary: '₹7 – 11 LPA', match: 87, type: 'Full-time',
      tags: ['Python', 'SQL', 'Excel'],
      why: 'Your Python + SQL skills and data-heavy academic projects match their analyst trainee intake perfectly.',
      color: '#FFD166',
    },
    {
      id: 'f3', title: 'Graduate Trainee Engineer', company: 'Infosys', location: 'Multiple Cities · On-site',
      salary: '₹4.5 – 6 LPA', match: 91, type: 'Full-time',
      tags: ['Java', 'Python', 'Problem Solving'],
      why: 'High GPA + engineering degree is exactly their trainee profile. Vera rates your aptitude signals very high.',
      color: '#2DD4A8',
    },
    {
      id: 'f4', title: 'Business Analyst Intern → FTE', company: 'McKinsey & Company', location: 'Mumbai · On-site',
      salary: '₹12 – 18 LPA', match: 78, type: 'Full-time',
      tags: ['Analytics', 'Excel', 'Communication'],
      why: 'Your project management experience and analytical coursework is in range, though leadership examples would strengthen the application.',
      color: '#E74C6F',
    },
    {
      id: 'f5', title: 'SDE Intern → Full-time', company: 'Swiggy', location: 'Bangalore · Hybrid',
      salary: '₹8 – 14 LPA', match: 83, type: 'Full-time',
      tags: ['Node.js', 'REST APIs', 'Git'],
      why: 'Your backend side projects using Node.js + REST APIs match their preferred stack for fresh hires.',
      color: '#9B59B6',
    },
    {
      id: 'f6', title: 'Product Analyst', company: 'CRED', location: 'Bangalore · Remote-first',
      salary: '₹9 – 13 LPA', match: 76, type: 'Full-time',
      tags: ['SQL', 'Mixpanel', 'User Research'],
      why: 'Your SQL proficiency and user-centric academic projects indicate strong product thinking alignment.',
      color: '#2DD4A8',
    },
  ],
  professional: [
    {
      id: 'p1', title: 'Senior Software Engineer', company: 'Google', location: 'Hyderabad · Hybrid',
      salary: '₹40 – 65 LPA', match: 92, type: 'Full-time',
      tags: ['System Design', 'Python', 'Distributed Systems'],
      why: 'Your 4+ years of backend experience with high-scale systems aligns with Google SWE L5 competency benchmarks.',
      color: '#4A9EFF',
    },
    {
      id: 'p2', title: 'Product Manager – Payments', company: 'Stripe', location: 'Bangalore · Hybrid',
      salary: '₹45 – 75 LPA', match: 89, type: 'Full-time',
      tags: ['Roadmapping', 'SQL', 'Agile'],
      why: 'Your cross-functional leadership + fintech exposure matches Stripe\'s PM profile almost exactly. Add P&L ownership narrative to boost score.',
      color: '#FFD166',
    },
    {
      id: 'p3', title: 'Engineering Lead – Platform', company: 'Zepto', location: 'Mumbai · On-site',
      salary: '₹35 – 55 LPA', match: 85, type: 'Full-time',
      tags: ['Team Management', 'Architecture', 'Microservices'],
      why: 'Your leadership trajectory and platform engineering signals fit Zepto\'s rapid scaling needs perfectly.',
      color: '#2DD4A8',
    },
    {
      id: 'p4', title: 'Director of Data Science', company: 'Meesho', location: 'Bangalore · Remote',
      salary: '₹55 – 90 LPA', match: 81, type: 'Full-time',
      tags: ['ML', 'Python', 'Business Strategy'],
      why: 'Strong data analysis background with emerging AI/ML skills positions you well. Cloud architecture gaps are a minor flag.',
      color: '#E74C6F',
    },
    {
      id: 'p5', title: 'Principal Engineer', company: 'Razorpay', location: 'Bangalore · Hybrid',
      salary: '₹50 – 80 LPA', match: 88, type: 'Full-time',
      tags: ['Distributed Systems', 'API Design', 'Mentorship'],
      why: 'Your architectural experience and cross-team delivery record is exactly what their Principal track values.',
      color: '#9B59B6',
    },
    {
      id: 'p6', title: 'VP Engineering', company: 'PhonePe', location: 'Bangalore · On-site',
      salary: '₹80 – 140 LPA', match: 74, type: 'Full-time',
      tags: ['Leadership', 'Org Building', 'Strategy'],
      why: 'Strong senior IC background. Adding board/advisory experience narrative and P&L ownership will significantly improve match to this level.',
      color: '#FFD166',
    },
  ],
};

const FILTERS = ['All', 'Remote', 'Hybrid', 'On-site'];

// ─── Match Badge ───────────────────────────────────────────────
function MatchBadge({ score }) {
  const color = score >= 90 ? '#2DD4A8' : score >= 80 ? '#4A9EFF' : score >= 70 ? '#FFD166' : '#E74C6F';
  const label = score >= 90 ? 'Excellent Match' : score >= 80 ? 'Strong Match' : score >= 70 ? 'Good Match' : 'Fair Match';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        background: `${color}15`, border: `1px solid ${color}30`,
        color, borderRadius: 6, padding: '3px 10px',
        fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ fontSize: 9 }}>⚡</span> {score}% {label}
      </div>
    </div>
  );
}

// ─── Job Card ──────────────────────────────────────────────────
function JobCard({ job, isSaved, onSave }) {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleEnter = () => gsap.to(cardRef.current, { y: -3, boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${job.color}10`, duration: 0.25, overwrite: 'auto' });
  const handleLeave = () => gsap.to(cardRef.current, { y: 0, boxShadow: 'none', duration: 0.25, overwrite: 'auto' });

  return (
    <div ref={cardRef} className="jm-card" onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{ '--card-color': job.color }}>
      <div className="jm-card-top">
        {/* Company initial */}
        <div className="jm-company-avatar" style={{ background: `${job.color}20`, border: `1px solid ${job.color}35`, color: job.color }}>
          {job.company[0]}
        </div>
        <div className="jm-card-meta">
          <h3 className="jm-job-title">{job.title}</h3>
          <p className="jm-company-name">{job.company}</p>
          <div className="jm-location-row">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {job.location}
          </div>
        </div>
        <button className="jm-save-btn" onClick={() => onSave(job.id)} title={isSaved ? 'Unsave' : 'Save'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? '#FFD166' : 'none'} stroke={isSaved ? '#FFD166' : 'currentColor'} strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>

      <MatchBadge score={job.match} />

      <div className="jm-tags-row">
        {job.tags.map((t, i) => <span key={i} className="jm-tag">{t}</span>)}
        <span className="jm-tag jm-tag-type">{job.type}</span>
      </div>

      <div className="jm-salary">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        {job.salary}
      </div>

      <button className="jm-why-toggle" onClick={() => setExpanded(!expanded)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Why Vera matched this
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="m6 9 6 6 6-6"/></svg>
      </button>

      {expanded && (
        <div className="jm-why-text">
          <span style={{ color: '#FFD166', marginRight: 6 }}>◆</span>
          {job.why}
        </div>
      )}

      <div className="jm-actions">
        <button className="jm-apply-btn">Apply Now →</button>
        <button className="jm-detail-btn">View Details</button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function JobMatches({ userType = 'fresher', resumeData, onComplete, onBack, onSkip }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'salary'

  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  const allJobs = JOBS[userType] || JOBS.fresher;

  const filteredJobs = allJobs.filter(j => {
    if (activeFilter === 'All') return true;
    return j.location.toLowerCase().includes(activeFilter.toLowerCase());
  }).sort((a, b) => sortBy === 'match' ? b.match - a.match : 0);

  useEffect(() => {
    gsap.to(blob1Ref.current, { x: 40, y: -25, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2Ref.current, { x: -30, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  }, []);

  const toggleSave = (id) => setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const score = resumeData?.score || (userType === 'fresher' ? 71 : 79);
  const grade = resumeData?.grade || (userType === 'fresher' ? 'B+' : 'A−');
  const userLabel = userType === 'fresher' ? 'Fresher' : 'Professional';

  return (
    <div className="jm-container">
      <style>{jmStyles}</style>

      <div className="jm-blob jm-blob-1" ref={blob1Ref} />
      <div className="jm-blob jm-blob-2" ref={blob2Ref} />

      {/* Top Bar */}
      <div className="jm-topbar">
        <div className="jm-logo">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, letterSpacing: '0.12em', color: '#F0F4FF' }}>
            Pathvera<span className="jm-dot" />ai
          </span>
          <span className="jm-badge">{userLabel} Track</span>
        </div>
        <div className="jm-flow-steps">
          <span className="jm-flow-step jm-flow-done">01 Resume ✓</span>
          <span className="jm-flow-arrow">→</span>
          <span className="jm-flow-step active">02 Jobs</span>
          <span className="jm-flow-arrow">→</span>
          <span className="jm-flow-step">03 Gap Fill</span>
        </div>
        {onSkip && <button className="jm-skip-btn" onClick={onSkip}>Skip to Explore →</button>}
      </div>

      <div ref={containerRef} className="jm-main" style={{ opacity: 0 }}>
        {/* Header */}
        <div className="jm-header">
          <div>
            <h1 className="jm-title">Your Job Matches</h1>
            <p className="jm-subtitle">
              Vera found <strong style={{ color: '#FFD166' }}>{filteredJobs.length} roles</strong> aligned to your profile.
              Ranked by AI compatibility score.
            </p>
          </div>
          {/* Resume score mini */}
          <div className="jm-score-pill">
            <div className="jm-score-ring-mini" style={{ '--score-color': score >= 75 ? '#2DD4A8' : '#FFD166' }}>
              <span>{score}</span>
            </div>
            <div>
              <p className="jm-score-label">Resume Score</p>
              <p className="jm-score-grade">{grade} — {score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : 'Fair'}</p>
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div className="jm-filter-row">
          <div className="jm-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`jm-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
          <div className="jm-sort-row">
            <span style={{ fontSize: 11, color: '#6B84A3', fontFamily: 'monospace', letterSpacing: '0.1em' }}>SORT BY</span>
            <button className={`jm-sort-btn ${sortBy === 'match' ? 'active' : ''}`} onClick={() => setSortBy('match')}>Match %</button>
            <span style={{ color: '#6B84A3', fontSize: 10 }}>·</span>
            {savedJobs.length > 0 && (
              <span style={{ fontSize: 11, color: '#FFD166', fontFamily: 'monospace' }}>
                {savedJobs.length} saved
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="jm-grid">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} isSaved={savedJobs.includes(job.id)} onSave={toggleSave} />
          ))}
        </div>

        {/* CTA */}
        <div className="jm-cta-section">
          <div className="jm-cta-card">
            <div className="jm-cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="1"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: '#F0F4FF', margin: '0 0 6px' }}>
                Address Career Gaps
              </h3>
              <p style={{ fontSize: 13, color: '#6B84A3', margin: 0, lineHeight: 1.7, maxWidth: 420 }}>
                Vera detected timeline gaps in your resume. Let AI suggest courses, certifications, and interview narratives to fill them strategically.
              </p>
            </div>
            <button className="jm-cta-primary" onClick={() => onComplete && onComplete()}>
              Analyze Gaps & Fill CV →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const jmStyles = `
  .jm-container {
    position: relative; width: 100vw; min-height: 100vh;
    background: #070D1A; color: #F0F4FF;
    font-family: 'Lato', sans-serif; font-weight: 300;
    overflow-x: hidden;
  }
  .jm-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.06; pointer-events: none; z-index: 0; }
  .jm-blob-1 { top: 8%; left: 3%; width: 380px; height: 380px; background: rgba(74,158,255,0.4); }
  .jm-blob-2 { bottom: 10%; right: 3%; width: 320px; height: 320px; background: rgba(255,209,102,0.3); }

  .jm-dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #FFD166; box-shadow: 0 0 10px rgba(255,209,102,0.6); vertical-align: middle; margin: 0 2px; }

  .jm-topbar {
    position: relative; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px; border-bottom: 1px solid rgba(100,160,255,0.08);
    background: rgba(7,13,26,0.85); backdrop-filter: blur(12px);
    gap: 16px; flex-wrap: wrap;
  }
  .jm-logo { display: flex; align-items: center; gap: 12px; }
  .jm-badge { font-family: monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; background: rgba(255,209,102,0.12); border: 1px solid rgba(255,209,102,0.25); color: #FFD166; padding: 3px 10px; border-radius: 20px; }
  .jm-flow-steps { display: flex; align-items: center; gap: 8px; }
  .jm-flow-step { font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; color: rgba(240,244,255,0.2); text-transform: uppercase; }
  .jm-flow-step.active { color: #FFD166; }
  .jm-flow-done { color: #2DD4A8 !important; }
  .jm-flow-arrow { color: rgba(240,244,255,0.15); font-size: 12px; }
  .jm-skip-btn { background: none; border: 1px solid rgba(100,160,255,0.15); border-radius: 20px; padding: 6px 14px; color: rgba(240,244,255,0.4); font-size: 11px; cursor: pointer; transition: all 0.2s; }
  .jm-skip-btn:hover { color: #FFD166; border-color: rgba(255,209,102,0.3); }

  .jm-main { position: relative; z-index: 1; max-width: 1140px; margin: 0 auto; padding: 48px 24px 64px; }

  .jm-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 36px; flex-wrap: wrap; }
  .jm-title { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; margin: 0 0 10px; letter-spacing: 0.02em; }
  .jm-subtitle { font-size: 15px; color: #6B84A3; margin: 0; line-height: 1.7; }
  .jm-score-pill {
    display: flex; align-items: center; gap: 14px;
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1);
    border-radius: 14px; padding: 14px 20px; flex-shrink: 0;
  }
  .jm-score-ring-mini {
    width: 52px; height: 52px; border-radius: 50%;
    border: 2.5px solid var(--score-color, #2DD4A8);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 14px color-mix(in srgb, var(--score-color, #2DD4A8) 30%, transparent);
  }
  .jm-score-ring-mini span { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--score-color, #2DD4A8); }
  .jm-score-label { font-family: monospace; font-size: 9px; color: #6B84A3; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 3px; }
  .jm-score-grade { font-size: 12px; color: #F0F4FF; margin: 0; }

  .jm-filter-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
  .jm-filters { display: flex; gap: 8px; flex-wrap: wrap; }
  .jm-filter-btn {
    background: rgba(100,160,255,0.04); border: 1px solid rgba(100,160,255,0.1);
    border-radius: 20px; padding: 7px 18px;
    font-size: 12px; color: rgba(240,244,255,0.5);
    font-family: 'Lato', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .jm-filter-btn:hover, .jm-filter-btn.active {
    border-color: rgba(255,209,102,0.4); color: #FFD166;
    background: rgba(255,209,102,0.06);
  }
  .jm-sort-row { display: flex; align-items: center; gap: 10px; }
  .jm-sort-btn { background: none; border: none; font-size: 12px; color: rgba(240,244,255,0.35); cursor: pointer; font-family: 'Lato', sans-serif; padding: 0; }
  .jm-sort-btn.active { color: #4A9EFF; }

  .jm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }

  .jm-card {
    background: rgba(100,160,255,0.03); border: 1px solid rgba(100,160,255,0.08);
    border-radius: 16px; padding: 24px;
    display: flex; flex-direction: column; gap: 14px;
    transition: border-color 0.25s;
    position: relative; overflow: hidden;
  }
  .jm-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--card-color), transparent); opacity: 0.5; }
  .jm-card:hover { border-color: rgba(100,160,255,0.2); }

  .jm-card-top { display: flex; align-items: flex-start; gap: 14px; }
  .jm-company-avatar {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; flex-shrink: 0;
  }
  .jm-card-meta { flex: 1; }
  .jm-job-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; color: #F0F4FF; margin: 0 0 3px; }
  .jm-company-name { font-size: 12.5px; color: #6B84A3; margin: 0 0 5px; }
  .jm-location-row { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: rgba(107,132,163,0.7); }
  .jm-save-btn { background: none; border: none; color: rgba(240,244,255,0.3); cursor: pointer; padding: 2px; transition: color 0.2s; flex-shrink: 0; }
  .jm-save-btn:hover { color: #FFD166; }

  .jm-tags-row { display: flex; flex-wrap: wrap; gap: 6px; }
  .jm-tag { font-size: 10.5px; padding: 3px 9px; border-radius: 5px; background: rgba(74,158,255,0.08); border: 1px solid rgba(74,158,255,0.15); color: #4A9EFF; }
  .jm-tag-type { background: rgba(45,212,168,0.08); border-color: rgba(45,212,168,0.15); color: #2DD4A8; }

  .jm-salary { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(240,244,255,0.8); font-weight: 600; }
  .jm-salary svg { color: #2DD4A8; flex-shrink: 0; }

  .jm-why-toggle {
    display: flex; align-items: center; gap: 6px; background: none; border: none;
    color: rgba(255,209,102,0.6); font-size: 11.5px; cursor: pointer;
    font-family: 'Lato', sans-serif; padding: 0; transition: color 0.2s;
  }
  .jm-why-toggle:hover { color: #FFD166; }
  .jm-why-text {
    font-size: 12px; color: rgba(240,244,255,0.6); line-height: 1.7;
    background: rgba(255,209,102,0.04); border: 1px solid rgba(255,209,102,0.1);
    border-radius: 8px; padding: 12px 14px;
  }

  .jm-actions { display: flex; gap: 10px; margin-top: auto; }
  .jm-apply-btn {
    flex: 1; background: #FFD166; color: #070D1A;
    border: none; border-radius: 8px; padding: 10px;
    font-family: 'Lato', sans-serif; font-size: 11.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
    transition: all 0.2s;
  }
  .jm-apply-btn:hover { box-shadow: 0 0 20px rgba(255,209,102,0.3); filter: brightness(1.05); }
  .jm-detail-btn {
    background: transparent; border: 1px solid rgba(100,160,255,0.2);
    border-radius: 8px; padding: 10px 14px;
    color: rgba(240,244,255,0.5); font-size: 11.5px;
    font-family: 'Lato', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .jm-detail-btn:hover { border-color: rgba(240,244,255,0.3); color: #F0F4FF; }

  /* CTA Section */
  .jm-cta-section { margin-top: 12px; }
  .jm-cta-card {
    background: rgba(255,209,102,0.04); border: 1px solid rgba(255,209,102,0.12);
    border-radius: 20px; padding: 32px 40px;
    display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
    position: relative; overflow: hidden;
  }
  .jm-cta-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #FFD166, #4A9EFF); }
  .jm-cta-icon { width: 64px; height: 64px; background: rgba(255,209,102,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .jm-cta-primary {
    margin-left: auto; background: #FFD166; color: #070D1A;
    border: none; border-radius: 10px; padding: 14px 28px;
    font-family: 'Lato', sans-serif; font-size: 12.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
    white-space: nowrap; transition: all 0.25s;
  }
  .jm-cta-primary:hover { box-shadow: 0 0 28px rgba(255,209,102,0.3); transform: translateY(-1px); }

  @media (max-width: 1024px) { .jm-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) {
    .jm-grid { grid-template-columns: 1fr; }
    .jm-topbar { padding: 16px 20px; }
    .jm-main { padding: 28px 16px; }
    .jm-title { font-size: 28px; }
    .jm-flow-steps { display: none; }
    .jm-cta-card { padding: 24px 20px; }
    .jm-cta-primary { margin-left: 0; width: 100%; }
  }
`;
