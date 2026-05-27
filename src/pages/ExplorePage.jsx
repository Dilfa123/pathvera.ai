import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/Sidebar';

gsap.registerPlugin(ScrollTrigger);

export default function ExplorePage({ 
  currentView, 
  onViewChange, 
  savedCourses = [], 
  onToggleSaveCourse,
  onSelectCourse 
}) {
  const [activeTab, setActiveTab] = useState('courses');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const filterNavRef = useRef(null);
  const tabIndicatorRef = useRef(null);
  const cardsGridRef = useRef(null);
  const searchInputRef = useRef(null);

  const coursesMock = [
    { id: 'course-1', title: 'Master of Science in Artificial Intelligence', institution: 'Stanford University', category: 'Technology', duration: '24 Months', level: 'Advanced', desc: 'Deep exploration of foundational neural architectures, machine learning models, and executive AI deployment frameworks.', gradient: 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)' },
    { id: 'course-2', title: 'Quantum Computing & Corporate Strategy', institution: 'MIT Professional Education', category: 'Quantum AI', duration: '6 Months', level: 'Intermediate', desc: 'A complete framework for leveraging quantum algorithmics in enterprise architecture and portfolio planning.', gradient: 'linear-gradient(135deg, #1a0f30 0%, #070D1A 100%)' },
    { id: 'course-3', title: 'Executive Leadership in Technology Pivots', institution: 'Harvard Business School', category: 'Leadership', duration: '9 Months', level: 'Executive', desc: 'Architecting business strategy and organizational agility through disruptive shifts in tech, Web3, and robotics.', gradient: 'linear-gradient(135deg, #300f12 0%, #070D1A 100%)' },
    { id: 'course-4', title: 'Sustainable Energy Systems & Machine Learning', institution: 'UC Berkeley Extension', category: 'Sustainability', duration: '12 Months', level: 'Advanced', desc: 'Leveraging forecasting neural networks to optimize solar grids, storage dynamics, and net-zero policies.', gradient: 'linear-gradient(135deg, #0f301b 0%, #070D1A 100%)' }
  ];

  const consultanciesMock = [
    { id: 'consult-1', title: 'Bespoke AI Engineering Integration', institution: 'Vera AI Solutions', category: 'Technology', duration: '3-6 Months', level: 'Enterprise', desc: 'Custom deployment of large language models, agent systems, and vector databases optimized for enterprise data.', gradient: 'linear-gradient(135deg, #0f2730 0%, #070D1A 100%)' },
    { id: 'consult-2', title: 'Quantum Security Vulnerability Audit', institution: 'Apex Frontier Group', category: 'Quantum AI', duration: '1 Month', level: 'Military Grade', desc: "Hardening cryptography pipelines against next-generation Shor's and Grover's algorithm exploits.", gradient: 'linear-gradient(135deg, #230f30 0%, #070D1A 100%)' },
    { id: 'consult-3', title: 'Global Market Entry & Policy Strategy', institution: 'Vance Advisory Partners', category: 'Business Strategy', duration: '6 Months', level: 'Corporate', desc: 'Navigating international tariffs, structural pivots, and regional compliance matrices for scale-ups.', gradient: 'linear-gradient(135deg, #30200f 0%, #070D1A 100%)' },
    { id: 'consult-4', title: 'De-Carbonization Supply Chain Optimization', institution: 'Bio-Carbon Advisory', category: 'Sustainability', duration: '2-4 Months', level: 'Industrial', desc: 'Applying graph neural networks to audit scope-3 emissions and re-route maritime freight vectors.', gradient: 'linear-gradient(135deg, #1b300f 0%, #070D1A 100%)' }
  ];

  const filters = ['All', 'Technology', 'Business Strategy', 'Quantum AI', 'Leadership', 'Sustainability'];
  const currentList = activeTab === 'courses' ? coursesMock : consultanciesMock;

  const filteredItems = currentList.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // INITIAL MOUNT ANIMATIONS
  useEffect(() => {
    let ctx = gsap.context(() => {
      setTimeout(() => {
        gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } 
        });
        ScrollTrigger.refresh();
      }, 500);
      gsap.fromTo(filterNavRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // TAB SLIDER
  useEffect(() => {
    let ctx = gsap.context(() => {
      const isConsultancies = activeTab === 'consultancies';
      gsap.to(tabIndicatorRef.current, { x: isConsultancies ? 92 : 0, width: isConsultancies ? 102 : 60, duration: 0.35, ease: 'power2.inOut' });
    }, mainRef);
    return () => ctx.revert();
  }, [activeTab]);

  // CARD ENTRANCE & SCROLL TRIGGERS
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!cardsGridRef.current) return;
      const cards = Array.from(cardsGridRef.current.querySelectorAll('.explore-card'));
      cards.forEach((card, i) => {
        gsap.fromTo(card, { x: -160, opacity: 0, rotate: -3 }, { 
          x: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'power4.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
        });
        const cardImg = card.querySelector('.card-image-inner');
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, duration: 0.4, ease: 'power2.out' });
          if(cardImg) gsap.to(cardImg, { scale: 1.06, filter: 'saturate(1.1) brightness(1.0)', duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
          if(cardImg) gsap.to(cardImg, { scale: 1, filter: 'saturate(1) brightness(0.9)', duration: 0.4, ease: 'power2.out' });
        });
      });
    }, cardsGridRef);
    return () => ctx.revert();
  }, [activeFilter, activeTab, searchQuery]);

  const handleFilterClick = (e, filter) => {
    setActiveFilter(filter);
    const tl = gsap.timeline();
    tl.to(e.currentTarget, { scale: 0.92, duration: 0.1 })
      .to(e.currentTarget, { scale: 1.04, duration: 0.15, ease: 'power1.out' })
      .to(e.currentTarget, { scale: 1, duration: 0.1, ease: 'power1.in' });
  };

  const handleSearchFocus = () => { gsap.to(searchInputRef.current, { scaleX: 1.02, duration: 0.3, transformOrigin: 'left center', ease: 'power2.out' }); };
  const handleSearchBlur = () => { gsap.to(searchInputRef.current, { scaleX: 1, duration: 0.3, transformOrigin: 'left center', ease: 'power2.out' }); };

  return (
    <div className="explore-page-wrapper" ref={mainRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        .explore-page-wrapper {
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
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          box-sizing: border-box;
        }

        .explore-content {
          flex: 1; display: flex; flex-direction: column;
          padding: 32px; box-sizing: border-box;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }

        .explore-header-row { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; gap: 24px; }
        .explore-title-box { display: flex; flex-direction: column; gap: 8px; }

        .explore-eyebrow {
          font-family: monospace; font-size: 9px; font-weight: 700;
          color: var(--gold); letter-spacing: 0.45em; text-transform: uppercase;
          display: flex; align-items: center; gap: 12px;
        }
        .explore-eyebrow::after { content: ''; width: 40px; height: 1px; background: linear-gradient(90deg, var(--gold), transparent); }

        .explore-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 300; color: var(--text); margin: 0; line-height: 1.1;
        }
        .explore-title em { color: var(--gold); font-style: italic; text-shadow: 0 0 40px rgba(255,209,102,0.3); }
        .explore-subtext { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.85; }

        .search-container { position: relative; width: 320px; }
        .search-input {
          width: 100%; background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 16px 12px 42px; color: var(--text);
          font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 300;
          box-sizing: border-box; transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
        .search-input:focus { outline: none; border-color: var(--gold); background: rgba(255, 255, 255, 0.04); box-shadow: 0 0 16px rgba(255,209,102,0.05); }
        .search-input::placeholder { color: var(--muted); }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; z-index: 2; }

        .tab-nav-container { position: relative; margin-top: 28px; border-bottom: 1px solid var(--border); width: 100%; }
        .tabs-row { display: flex; gap: 32px; }
        .tab-btn {
          background: none; border: none; padding: 8px 0 12px 0; cursor: pointer;
          font-family: 'Lato', sans-serif; font-size: 14px; color: var(--muted);
          font-weight: 400; transition: color 0.3s ease; letter-spacing: 0.02em;
        }
        .tab-btn.active { color: var(--text); font-weight: 700; }
        .tab-sliding-underline {
          position: absolute; bottom: -1px; left: 0; height: 2px;
          background-color: var(--gold); width: 60px;
          box-shadow: 0 0 10px rgba(255,209,102,0.4);
        }

        .filter-pills-row { display: flex; gap: 10px; margin-top: 20px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
        .filter-pills-row::-webkit-scrollbar { display: none; }
        .filter-pill {
          white-space: nowrap; cursor: pointer; font-family: monospace;
          font-size: 10px; box-sizing: border-box; transform-origin: center;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .filter-pill.active {
          background-color: var(--gold); color: #070D1A; font-weight: 700;
          border-radius: 20px; padding: 6px 16px; border: 1px solid var(--gold);
        }
        .filter-pill.inactive {
          background-color: var(--card); border: 1px solid var(--border);
          color: var(--muted); border-radius: 20px; padding: 6px 16px;
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .filter-pill.inactive:hover { border-color: var(--gold); color: var(--gold); }

        .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px; width: 100%; }

        .explore-card {
          border-radius: 16px; overflow: hidden; background-color: var(--card);
          border: 1px solid var(--border); display: flex; flex-direction: column;
          position: relative; transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .explore-card:hover { border-color: var(--gold); box-shadow: var(--glow-gold); }

        /* Corner bracket */
        .explore-card::after {
          content: ''; position: absolute; top: 8px; right: 8px;
          width: 22px; height: 22px;
          border-top: 2px solid var(--gold); border-right: 2px solid var(--gold);
          opacity: 0.4; z-index: 3; transition: opacity 0.3s ease; pointer-events: none;
        }
        .explore-card:hover::after { opacity: 0.8; }

        .card-image-area {
          height: 180px; position: relative; display: flex;
          align-items: center; justify-content: center;
          padding: 24px; box-sizing: border-box; overflow: hidden;
        }
        .card-image-inner {
          position: absolute; inset: 0;
          transition: transform 0.4s ease, filter 0.4s ease;
          filter: saturate(1) brightness(0.9);
        }
        .card-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(7,13,26,0.85) 100%);
          z-index: 1; pointer-events: none;
        }
        .card-ghost-number {
          position: absolute; bottom: 8px; right: 12px;
          font-family: 'Bebas Neue', sans-serif; font-size: 5rem;
          color: rgba(255,255,255,0.06); z-index: 1; line-height: 1; pointer-events: none;
        }
        .card-image-logo-badge {
          font-family: 'Cormorant Garamond', serif; font-size: 22px;
          color: rgba(255, 255, 255, 0.25); font-style: italic;
          z-index: 2; font-weight: 300; text-align: center; position: relative;
        }
        .bookmark-btn {
          position: absolute; top: 14px; right: 40px;
          background: rgba(7, 13, 26, 0.6); border: 1px solid var(--border);
          border-radius: 50%; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--muted); transition: all 0.2s ease; z-index: 4;
        }
        .bookmark-btn:hover { transform: scale(1.1); border-color: var(--gold); }
        .bookmark-btn.saved { color: var(--gold); border-color: var(--gold); background: rgba(255,209,102,0.1); }

        .card-info-area { padding: 20px 24px; display: flex; flex-direction: column; flex-grow: 1; }
        .card-univ-label {
          font-family: monospace; font-size: 9px; font-weight: 700;
          color: var(--gold); letter-spacing: 0.4em;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif; font-size: 20px;
          color: var(--text); margin: 0 0 10px 0; line-height: 1.25; font-weight: 400;
        }
        .card-desc {
          font-size: 12.5px; color: var(--muted); line-height: 1.65;
          margin: 0 0 20px 0; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; text-overflow: ellipsis;
        }
        .card-footer-row { display: flex; justify-content: space-between; align-items: center; margin-top: auto; width: 100%; }
        .card-tags { display: flex; gap: 8px; }
        .card-tag-pill {
          background-color: var(--blue-dim); border: 1px solid var(--border);
          border-radius: 12px; padding: 4px 10px; font-size: 10px;
          color: var(--blue-accent); font-weight: 400;
          font-family: monospace; letter-spacing: 0.05em;
        }

        .view-details-link {
          font-size: 12px; color: var(--gold); font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
          background: none; border: none; padding: 4px 0;
          position: relative; font-family: 'Lato', sans-serif;
        }
        .view-details-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          height: 1px; width: 0%; background-color: var(--gold);
          transition: width 0.35s ease;
        }
        .view-details-link:hover::after { width: 100%; }
        .view-details-link .arrow-svg { transition: transform 0.25s ease; }
        .view-details-link:hover .arrow-svg { transform: translateX(4px); }

        .empty-grid-state {
          grid-column: span 2; text-align: center; padding: 60px 40px;
          color: var(--muted); border: 1px dashed var(--border);
          border-radius: 16px; background-color: rgba(255,255,255,0.01); margin-top: 24px;
        }

        .explore-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
          margin: 28px 0 0 0;
        }

        @media (max-width: 992px) { .cards-grid { grid-template-columns: 1fr; } .empty-grid-state { grid-column: span 1; } }
        @media (max-width: 768px) {
          .explore-page-wrapper { flex-direction: column; }
          .explore-header-row { flex-direction: column; align-items: flex-start; }
          .search-container { width: 100%; }
          .explore-content { padding: 20px; }
        }
      `}} />

      <Sidebar currentView="explore" onViewChange={onViewChange} />

      <div className="explore-content">
        <div className="explore-header-row" ref={headingRef}>
          <div className="explore-title-box">
            <span className="explore-eyebrow">PATHWAYS</span>
            <h1 className="explore-title">Explore <em>Pathways</em></h1>
            <p className="explore-subtext">Discover curated executive programs and world-class consultancies tailored by AI.</p>
          </div>
          <div className="search-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" className="search-input" placeholder="Search elite pathways..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus} onBlur={handleSearchBlur} ref={searchInputRef} />
          </div>
        </div>

        <hr className="explore-divider" />

        <div className="tab-nav-container" ref={filterNavRef}>
          <div className="tabs-row">
            <button className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => { setActiveTab('courses'); setActiveFilter('All'); }}>Courses</button>
            <button className={`tab-btn ${activeTab === 'consultancies' ? 'active' : ''}`}
              onClick={() => { setActiveTab('consultancies'); setActiveFilter('All'); }}>Consultancies</button>
          </div>
          <div className="tab-sliding-underline" ref={tabIndicatorRef} />
        </div>

        <div className="filter-pills-row">
          {filters.map((filter) => (
            <button key={filter} className={`filter-pill ${activeFilter === filter ? 'active' : 'inactive'}`}
              onClick={(e) => handleFilterClick(e, filter)}>{filter}</button>
          ))}
        </div>

        <div className="cards-grid" ref={cardsGridRef}>
          {filteredItems.map((item, idx) => {
            const isSaved = savedCourses.includes(item.id);
            return (
              <div key={item.id} className="explore-card">
                <div className="card-image-area">
                  <div className="card-image-inner" style={{ background: item.gradient }} />
                  <div className="card-image-overlay" />
                  <span className="card-ghost-number">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="card-image-logo-badge">{item.institution}</div>
                  <button className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleSaveCourse(item.id); }}
                    title={isSaved ? 'Remove from saved' : 'Save program'}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                    </svg>
                  </button>
                </div>
                <div className="card-info-area">
                  <span className="card-univ-label">{item.institution}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-footer-row">
                    <div className="card-tags">
                      <span className="card-tag-pill">{item.duration}</span>
                      <span className="card-tag-pill">{item.level}</span>
                    </div>
                    <button className="view-details-link" onClick={() => onSelectCourse(item)}>
                      View Details <span className="arrow-svg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="empty-grid-state">
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>No pathways found</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>We couldn't find any listings matching "{searchQuery}" under {activeFilter} in {activeTab}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
