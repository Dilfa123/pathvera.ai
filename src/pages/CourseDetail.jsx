import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/Sidebar';

gsap.registerPlugin(ScrollTrigger);

export default function CourseDetail({ 
  currentView, 
  onViewChange, 
  selectedCourse, 
  savedCourses = [], 
  onToggleSaveCourse 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'curriculum' | 'requirements' | 'outcomes'
  const mainRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroParallaxRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const statsStripRef = useRef(null);
  const ctaBarRef = useRef(null);
  const contentAreaRef = useRef(null);
  const bookmarkIconRef = useRef(null);

  const statTuitionRef = useRef(null);
  const statSuccessRef = useRef(null);

  // Fallback default course data if none is selected
  const course = selectedCourse || {
    id: 'course-1',
    title: 'Master of Science in Artificial Intelligence',
    institution: 'Stanford University',
    category: 'Technology',
    duration: '24 Months',
    level: 'Advanced',
    desc: 'Deep exploration of foundational neural architectures, machine learning models, and executive AI deployment frameworks.',
    gradient: 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)',
  };

  const isSaved = savedCourses.includes(course.id);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'requirements', name: 'Requirements' },
    { id: 'outcomes', name: 'Outcomes' }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Page Entrance Waterfall
      const tl = gsap.timeline();
      tl.fromTo(heroParallaxRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .fromTo(breadcrumbRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.5');

      // 2. Parallax Hero
      gsap.to(heroParallaxRef.current, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          scroller: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Scrub hero overlay
      gsap.fromTo(heroOverlayRef.current, { opacity: 0.4 }, {
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          scroller: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3. Stats Strip Entrance & Numbers
      gsap.fromTo(statsStripRef.current.children, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: statsStripRef.current,
          scroller: scrollContainerRef.current,
          start: 'top 90%'
        }
      });

      const tuitionObj = { val: 0 };
      gsap.to(tuitionObj, {
        val: 54200,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsStripRef.current,
          scroller: scrollContainerRef.current,
          start: 'top 90%'
        },
        onUpdate: () => {
          if (statTuitionRef.current) {
            statTuitionRef.current.innerText = '$' + Math.floor(tuitionObj.val).toLocaleString();
          }
        }
      });

      const successObj = { val: 0 };
      gsap.to(successObj, {
        val: 98.4,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsStripRef.current,
          scroller: scrollContainerRef.current,
          start: 'top 90%'
        },
        onUpdate: () => {
          if (statSuccessRef.current) {
            statSuccessRef.current.innerText = successObj.val.toFixed(1) + '%';
          }
        }
      });

      // 4. Sticky CTA Bar
      gsap.set(ctaBarRef.current, { y: 80, opacity: 0 });
      gsap.to(ctaBarRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: {
          trigger: statsStripRef.current,
          scroller: scrollContainerRef.current,
          start: 'bottom top',
          toggleActions: 'play none none reverse'
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (contentAreaRef.current) {
        const blocks = Array.from(contentAreaRef.current.children);
        gsap.fromTo(blocks, { y: 45, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: contentAreaRef.current,
            scroller: scrollContainerRef.current,
            start: 'top 85%'
          }
        });
      }
    }, mainRef);
    return () => ctx.revert();
  }, [activeTab]);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    if (bookmarkIconRef.current) {
      const tl = gsap.timeline();
      tl.to(bookmarkIconRef.current, { scale: 0.7, duration: 0.15, ease: 'power2.in' })
        .call(() => onToggleSaveCourse(course.id))
        .to(bookmarkIconRef.current, { scale: 1.2, duration: 0.2, ease: 'back.out(2)' })
        .to(bookmarkIconRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' });
    } else {
      onToggleSaveCourse(course.id);
    }
  };

  return (
    <div className="detail-page-wrapper" ref={mainRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        .detail-page-wrapper {
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

          display: flex;
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
          width: 100vw;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .detail-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          overflow-y: auto;
          position: relative;
          height: 100vh;
        }

        /* Hero Section Parallax */
        .hero-section {
          height: 340px;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          box-sizing: border-box;
          overflow: hidden; /* For parallax bounds */
        }

        .hero-bg-parallax {
          position: absolute;
          top: -20%;
          left: 0;
          right: 0;
          bottom: -20%;
          background: linear-gradient(135deg, #0e1e38 0%, #070D1A 100%);
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(7, 13, 26, 0.1) 0%, rgba(7, 13, 26, 1) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .breadcrumb-row {
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 16px;
          z-index: 2;
          position: relative;
        }

        .breadcrumb-link {
          color: var(--blue-accent);
          text-decoration: none;
          cursor: pointer;
          font-weight: 500;
        }

        .breadcrumb-link:hover {
          text-decoration: underline;
        }

        .univ-badge {
          display: inline-flex;
          background-color: var(--gold-dim);
          border: 1px solid var(--gold);
          color: var(--gold);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 12px;
          width: fit-content;
          letter-spacing: 0.03em;
          z-index: 2;
          position: relative;
        }

        .program-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          max-width: 600px;
          line-height: 1.1;
          z-index: 2;
          position: relative;
        }

        .alumni-row {
          position: absolute;
          bottom: 32px;
          right: 32px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }

        .avatar-group {
          display: flex;
          align-items: center;
        }

        .avatar-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid var(--bg);
          background-color: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 700;
          color: var(--muted);
          margin-left: -6px;
          overflow: hidden;
        }

        .avatar-circle:first-child {
          margin-left: 0;
        }

        .alumni-text {
          font-size: 11px;
          color: var(--muted);
        }

        /* Stats Strip */
        .stats-strip {
          background-color: rgba(100, 160, 255, 0.03);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          backdrop-filter: blur(8px);
          z-index: 2;
          position: relative;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .stat-item-divider {
          width: 1px;
          height: 36px;
          background-color: var(--border);
          margin: 0 24px;
        }

        .stat-label {
          font-family: monospace;
          font-size: 9px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-value-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }

        .stat-icon {
          color: var(--muted);
          opacity: 0.8;
          display: flex;
          align-items: center;
        }

        /* Tab Navigation */
        .tab-nav-row {
          padding: 0 32px;
          margin-top: 24px;
          border-bottom: 1px solid var(--border);
          position: relative;
          display: flex;
          gap: 32px;
        }

        .detail-tab-btn {
          background: none;
          border: none;
          padding: 12px 0;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--muted);
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .detail-tab-btn.active {
          color: var(--text);
          font-weight: 600;
        }

        .detail-tab-underline {
          position: absolute;
          bottom: -1px;
          height: 2px;
          background-color: var(--gold);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(255, 209, 102, 0.4);
        }

        /* Tab Contents Layout */
        .tab-content-area {
          padding: 32px;
          flex-grow: 1;
          display: flex;
          gap: 32px;
          box-sizing: border-box;
          padding-bottom: 100px;
        }

        .left-content-column {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .tab-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 20px 0;
        }

        .tab-paragraph {
          font-size: 14.5px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 18px 0;
        }

        .right-content-column {
          width: 290px;
          flex-shrink: 0;
        }

        /* Score Card */
        .compatibility-card {
          background-color: var(--card);
          border: 1px solid var(--gold);
          border-radius: 16px;
          padding: 24px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(255, 209, 102, 0.03);
        }

        .compatibility-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .svg-wheel-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compatibility-subtext {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* High-fidelity tab panels */
        .curriculum-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .curriculum-module {
          background-color: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
        }

        .module-num {
          font-family: monospace;
          font-size: 10px;
          color: var(--gold);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .module-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
          margin: 4px 0 8px 0;
        }

        .module-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        .req-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .req-box {
          background-color: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
        }

        .req-box-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .req-bullet {
          font-size: 12.5px;
          color: var(--muted);
          margin: 0 0 6px 0;
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .outcome-card-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .outcome-stat-card {
          background-color: rgba(100, 160, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          text-align: left;
        }

        .outcome-label {
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .outcome-val {
          font-size: 22px;
          font-weight: 700;
          color: var(--gold);
          margin: 6px 0;
        }

        .outcome-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.4;
        }

        /* Sticky Bottom Action Bar */
        .sticky-footer {
          position: fixed;
          bottom: 0;
          left: 250px;
          right: 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          z-index: 99;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          transition: left 0.3s ease;
        }

        .footer-left-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .price-label {
          font-size: 11px;
          color: var(--muted);
        }

        .price-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--gold);
        }

        .footer-deadline-row {
          font-size: 11.5px;
          color: var(--muted);
        }

        .footer-right-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-footer-save {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-footer-save:hover {
          border-color: var(--gold);
          background-color: rgba(255, 209, 102, 0.02);
        }

        .btn-footer-save.saved {
          color: var(--gold);
          border-color: var(--gold);
          background-color: rgba(255, 209, 102, 0.05);
        }

        .btn-footer-apply {
          background-color: var(--gold);
          color: #070D1A;
          border: 1px solid var(--gold);
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-footer-apply:hover {
          box-shadow: var(--glow-gold);
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .improve-score-link {
          font-size: 12px;
          color: var(--muted);
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .improve-score-link:hover {
          color: var(--gold);
        }

        @media (max-width: 992px) {
          .tab-content-area {
            flex-direction: column;
          }
          .right-content-column {
            width: 100%;
          }
          .stats-strip {
            flex-wrap: wrap;
            gap: 16px;
          }
          .stat-item-divider {
            display: none;
          }
          .stat-item {
            min-width: 40%;
          }
        }

        @media (max-width: 768px) {
          .detail-page-wrapper {
            flex-direction: column;
          }

          .sticky-footer {
            left: 0;
            padding: 12px 20px;
          }

          .hero-section {
            padding: 20px;
            height: auto;
            min-height: 200px;
          }

          .program-title {
            font-size: 28px;
          }

          .alumni-row {
            position: static;
            margin-top: 16px;
          }

          .stats-strip {
            padding: 16px 20px;
          }

          .tab-nav-row {
            padding: 0 20px;
            gap: 16px;
          }

          .tab-content-area {
            padding: 20px;
          }

          .req-grid {
            grid-template-columns: 1fr;
          }

          .outcome-card-row {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      {/* Reusable navigation Sidebar */}
      <Sidebar currentView="explore" onViewChange={onViewChange} />

      {/* Main Detail Area */}
      <div className="detail-content" ref={scrollContainerRef}>
        <div className="hero-section">
          <div className="hero-bg-parallax" style={{ backgroundImage: course.gradient }} ref={heroParallaxRef} />
          <div className="hero-bg-overlay" ref={heroOverlayRef} />
          
          {/* Breadcrumbs */}
          <div className="breadcrumb-row" ref={breadcrumbRef}>
            <span className="breadcrumb-link" onClick={() => onViewChange('explore')}>Explore</span>
            {' › '}
            <span className="breadcrumb-link" onClick={() => onViewChange('explore')}>
              {course.category}
            </span>
            {' › '}
            <span>{course.title}</span>
          </div>

          {/* Badge & Title */}
          <span className="univ-badge">{course.institution}</span>
          <h1 className="program-title" ref={titleRef}>{course.title}</h1>

          {/* Alumni circles */}
          <div className="alumni-row">
            <div className="avatar-group">
              <div className="avatar-circle" style={{ background: '#4A9EFF', color: '#fff' }}>G</div>
              <div className="avatar-circle" style={{ background: '#EA4335', color: '#fff' }}>A</div>
              <div className="avatar-circle" style={{ background: '#0066FF', color: '#fff' }}>M</div>
              <div className="avatar-circle" style={{ background: 'var(--gold)', color: '#070D1A' }}>+9</div>
            </div>
            <span className="alumni-text">Alumni at FAANG</span>
          </div>
        </div>

        {/* 4 Stats Band strip */}
        <div className="stats-strip" ref={statsStripRef}>
          <div className="stat-item">
            <span className="stat-label">Duration</span>
            <div className="stat-value-row">
              <span className="stat-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span>{course.duration}</span>
            </div>
          </div>
          
          <div className="stat-item-divider" />

          <div className="stat-item">
            <span className="stat-label">Next Intake</span>
            <div className="stat-value-row">
              <span className="stat-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>Sept 2026</span>
            </div>
          </div>

          <div className="stat-item-divider" />

          <div className="stat-item">
            <span className="stat-label">Annual Tuition</span>
            <div className="stat-value-row">
              <span className="stat-icon" style={{ color: 'var(--gold)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              <span style={{ color: 'var(--gold)' }} ref={statTuitionRef}>$54,200</span>
            </div>
          </div>

          <div className="stat-item-divider" />

          <div className="stat-item">
            <span className="stat-label">Success Rate</span>
            <div className="stat-value-row">
              <span className="stat-icon" style={{ color: 'var(--gold)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <span style={{ color: 'var(--gold)' }} ref={statSuccessRef}>98.4%</span>
            </div>
          </div>
        </div>

        {/* Tab Row navigation */}
        <div className="tab-nav-row">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`detail-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
          <div 
            className="detail-tab-underline"
            style={{
              left: activeTab === 'overview' ? '32px' : 
                    activeTab === 'curriculum' ? '133px' :
                    activeTab === 'requirements' ? '241px' : '368px',
              width: activeTab === 'overview' ? '65px' : 
                     activeTab === 'curriculum' ? '76px' :
                     activeTab === 'requirements' ? '95px' : '72px'
            }}
          />
        </div>

        {/* Tab Content Panels */}
        <div className="tab-content-area" ref={contentAreaRef}>
          <div className="left-content-column">
            {activeTab === 'overview' && (
              <div>
                <h2 className="tab-section-title">Program Overview</h2>
                <p className="tab-paragraph">
                  The {course.title} is designed for visionary professionals looking to lead the next paradigm of computational evolution. Delivered by top-tier academic faculty and key industry advisors, this program bridges theoretical computer science with heavy-scale application execution.
                </p>
                <p className="tab-paragraph">
                  Over a rigorous modular pathway, candidates will dive deep into statistical machine learning models, neural network layers, attention mechanisms, and deep reinforcement models. You will architect and deploy systems targeting enterprise problems under supervised clinical mentorship.
                </p>
                <p className="tab-paragraph">
                  Graduates emerge with a robust portfolio, backed by the Vera Optimization Blueprint, validating their ready-for-deployment engineering capabilities to premium global consultancies, research firms, and industry conglomerates.
                </p>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h2 className="tab-section-title">Program Curriculum</h2>
                <div className="curriculum-list">
                  <div className="curriculum-module">
                    <span className="module-num">Term 1 · Foundation</span>
                    <h4 className="module-title">Mathematical Methods & Deep Learning Architectures</h4>
                    <p className="module-desc">Linear algebra, calculus vectors, backpropagation mechanics, convolutional layers, and Recurrent Neural Network (RNN) foundations.</p>
                  </div>
                  <div className="curriculum-module">
                    <span className="module-num">Term 2 · Core Systems</span>
                    <h4 className="module-title">Generative AI, Attention & Transformer Models</h4>
                    <p className="module-desc">Self-attention mechanics, transformer block pipelines, large language model configurations, and tuning frameworks (PEFT, LoRA).</p>
                  </div>
                  <div className="curriculum-module">
                    <span className="module-num">Term 3 · Advanced Trajectory</span>
                    <h4 className="module-title">AI Agents, Reinforcement & Vector Storage</h4>
                    <p className="module-desc">Planning frameworks (ReAct, AutoGPT), reinforcement learning with human feedback (RLHF), and vector indexing (Pinecone, Milvus).</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div>
                <h2 className="tab-section-title">Admission Requirements</h2>
                <div className="req-grid">
                  <div className="req-box">
                    <h4 className="req-box-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                      </svg>
                      Academic Profile
                    </h4>
                    <p className="req-bullet">✓ Bachelor's degree in CS, Engineering, Mathematics, or Physics.</p>
                    <p className="req-bullet">✓ Recommended GPA of 3.8/4.0 or top decile equivalent ranking.</p>
                  </div>

                  <div className="req-box">
                    <h4 className="req-box-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      Vera Score
                    </h4>
                    <p className="req-bullet">✓ Min compatibility threshold: 85% recommended.</p>
                    <p className="req-bullet">✓ Completed Onboarding Matrix evaluation score required.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'outcomes' && (
              <div>
                <h2 className="tab-section-title">Career Outcomes</h2>
                <div className="outcome-card-row">
                  <div className="outcome-stat-card">
                    <span className="outcome-label">Average Base Salary</span>
                    <h3 className="outcome-val">$240,000</h3>
                    <p className="outcome-desc">Standard compensation package for graduates securing roles as Lead AI Research Engineers.</p>
                  </div>
                  
                  <div className="outcome-stat-card">
                    <span className="outcome-label">Placement Velocity</span>
                    <h3 className="outcome-val">45 Days</h3>
                    <p className="outcome-desc">Average timeline to contract signing post-completion, verified via Vera employment index.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right score column */}
          <div className="right-content-column">
            <div className="compatibility-card">
              <h4 className="compatibility-title">AI Compatibility Score</h4>
              <div className="svg-wheel-container">
                <svg width="110" height="110" viewBox="0 0 100 100">
                  {/* Track */}
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(255, 209, 102, 0.08)" strokeWidth="5" />
                  {/* Filled */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="38" 
                    fill="transparent" 
                    stroke="var(--gold)" 
                    strokeWidth="5"
                    strokeDasharray="238.7"
                    strokeDashoffset="23.87"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                  <text x="50" y="56" textAnchor="middle" fill="var(--text)" fontSize="18" fontWeight="700" fontFamily="DM Sans">
                    90%
                  </text>
                </svg>
              </div>
              <p className="compatibility-subtext">
                Your profile shows strong alignment with this program's prerequisites and trajectory vector guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="sticky-footer" ref={ctaBarRef}>
          <div className="footer-left-info">
            <div className="footer-price-row">
              <span className="price-label">Annual Tuition:</span>
              <span className="price-value">$54,200</span>
            </div>
            <div className="footer-deadline-row">
              Deadline: <span style={{ color: 'var(--text)', fontWeight: '500' }}>May 15, 2026</span>
            </div>
          </div>

          <div className="footer-right-actions">
            <span className="improve-score-link">Improve Score</span>
            
            <button 
              className={`btn-footer-save ${isSaved ? 'saved' : ''}`}
              onClick={handleSaveToggle}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" ref={bookmarkIconRef}>
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              {isSaved ? 'Program Saved' : 'Save Program'}
            </button>

            <button className="btn-footer-apply">
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
