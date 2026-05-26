import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ExplorePage({ 
  currentView, 
  onViewChange, 
  savedCourses = [], 
  onToggleSaveCourse,
  onSelectCourse 
}) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'consultancies'
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const coursesMock = [
    {
      id: 'course-1',
      title: 'Master of Science in Artificial Intelligence',
      institution: 'Stanford University',
      category: 'Technology',
      duration: '24 Months',
      level: 'Advanced',
      desc: 'Deep exploration of foundational neural architectures, machine learning models, and executive AI deployment frameworks.',
      gradient: 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)',
    },
    {
      id: 'course-2',
      title: 'Quantum Computing & Corporate Strategy',
      institution: 'MIT Professional Education',
      category: 'Quantum AI',
      duration: '6 Months',
      level: 'Intermediate',
      desc: 'A complete framework for leveraging quantum algorithmics in enterprise architecture and portfolio planning.',
      gradient: 'linear-gradient(135deg, #1a0f30 0%, #070D1A 100%)',
    },
    {
      id: 'course-3',
      title: 'Executive Leadership in Technology Pivots',
      institution: 'Harvard Business School',
      category: 'Leadership',
      duration: '9 Months',
      level: 'Executive',
      desc: 'Architecting business strategy and organizational agility through disruptive shifts in tech, Web3, and robotics.',
      gradient: 'linear-gradient(135deg, #300f12 0%, #070D1A 100%)',
    },
    {
      id: 'course-4',
      title: 'Sustainable Energy Systems & Machine Learning',
      institution: 'UC Berkeley Extension',
      category: 'Sustainability',
      duration: '12 Months',
      level: 'Advanced',
      desc: 'Leveraging forecasting neural networks to optimize solar grids, storage dynamics, and net-zero policies.',
      gradient: 'linear-gradient(135deg, #0f301b 0%, #070D1A 100%)',
    }
  ];

  const consultanciesMock = [
    {
      id: 'consult-1',
      title: 'Bespoke AI Engineering Integration',
      institution: 'Vera AI Solutions',
      category: 'Technology',
      duration: '3-6 Months',
      level: 'Enterprise',
      desc: 'Custom deployment of large language models, agent systems, and vector databases optimized for enterprise data.',
      gradient: 'linear-gradient(135deg, #0f2730 0%, #070D1A 100%)',
    },
    {
      id: 'consult-2',
      title: 'Quantum Security Vulnerability Audit',
      institution: 'Apex Frontier Group',
      category: 'Quantum AI',
      duration: '1 Month',
      level: 'Military Grade',
      desc: 'Hardening cryptography pipelines against next-generation Shor\'s and Grover\'s algorithm exploits.',
      gradient: 'linear-gradient(135deg, #230f30 0%, #070D1A 100%)',
    },
    {
      id: 'consult-3',
      title: 'Global Market Entry & Policy Strategy',
      institution: 'Vance Advisory Partners',
      category: 'Business Strategy',
      duration: '6 Months',
      level: 'Corporate',
      desc: 'Navigating international tariffs, structural pivots, and regional compliance matrices for scale-ups.',
      gradient: 'linear-gradient(135deg, #30200f 0%, #070D1A 100%)',
    },
    {
      id: 'consult-4',
      title: 'De-Carbonization Supply Chain Optimization',
      institution: 'Bio-Carbon Advisory',
      category: 'Sustainability',
      duration: '2-4 Months',
      level: 'Industrial',
      desc: 'Applying graph neural networks to audit scope-3 emissions and re-route maritime freight vectors.',
      gradient: 'linear-gradient(135deg, #1b300f 0%, #070D1A 100%)',
    }
  ];

  const filters = [
    'All',
    'Technology',
    'Business Strategy',
    'Quantum AI',
    'Leadership',
    'Sustainability'
  ];

  const currentList = activeTab === 'courses' ? coursesMock : consultanciesMock;

  const filteredItems = currentList.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="explore-page-wrapper">
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
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .explore-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 32px;
          box-sizing: border-box;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .explore-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          gap: 24px;
        }

        .explore-title-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .explore-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .explore-subtext {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        /* Search input styling */
        .search-container {
          position: relative;
          width: 320px;
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px 12px 42px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 16px rgba(255, 209, 102, 0.05);
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }

        /* Sliding tab bar */
        .tab-nav-container {
          position: relative;
          margin-top: 24px;
          border-bottom: 1px solid var(--border);
          width: 100%;
        }

        .tabs-row {
          display: flex;
          gap: 32px;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 8px 0 12px 0;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--muted);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .tab-btn.active {
          color: var(--text);
          font-weight: 600;
        }

        .tab-sliding-underline {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 2px;
          background-color: var(--gold);
          width: 60px;
          transform: translateX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(255, 209, 102, 0.4);
        }

        .tab-sliding-underline.shift-right {
          transform: translateX(92px);
          width: 102px;
        }

        /* Filter Pills list with horizontal scrolling */
        .filter-pills-row {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none; /* Firefox */
        }

        .filter-pills-row::-webkit-scrollbar {
          display: none; /* Safari / Chrome */
        }

        .filter-pill {
          white-space: nowrap;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }

        .filter-pill.active {
          background-color: var(--gold);
          color: #070D1A;
          font-weight: 600;
          border-radius: 20px;
          padding: 6px 16px;
          border: 1px solid var(--gold);
        }

        .filter-pill.inactive {
          background-color: var(--card);
          border: 1px solid var(--border);
          color: var(--muted);
          border-radius: 20px;
          padding: 6px 16px;
        }

        .filter-pill.inactive:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 24px;
          width: 100%;
        }

        /* Card styles */
        .explore-card {
          border-radius: 16px;
          overflow: hidden;
          background-color: var(--card);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }

        .explore-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
          box-shadow: var(--glow-gold);
        }

        .card-image-area {
          height: 180px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .card-image-decorative-circle {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,209,102,0.1), transparent);
          top: -20px;
          right: -20px;
        }

        .card-image-logo-badge {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
          z-index: 1;
          font-weight: 500;
          text-align: center;
        }

        .bookmark-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(7, 13, 26, 0.6);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--muted);
          transition: all 0.2s ease;
          z-index: 2;
        }

        .bookmark-btn:hover {
          transform: scale(1.1);
          border-color: var(--gold);
        }

        .bookmark-btn.saved {
          color: var(--gold);
          border-color: var(--gold);
          background: rgba(255, 209, 102, 0.1);
        }

        .card-info-area {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-univ-label {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: var(--text);
          margin: 0 0 10px 0;
          line-height: 1.3;
          font-weight: 600;
        }

        .card-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0 0 20px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          width: 100%;
        }

        .card-tags {
          display: flex;
          gap: 8px;
        }

        .card-tag-pill {
          background-color: var(--blue-dim);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 4px 10px;
          font-size: 11px;
          color: var(--blue-accent);
          font-weight: 500;
        }

        .view-details-link {
          font-size: 12px;
          color: var(--gold);
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: transform 0.2s ease;
          background: none;
          border: none;
          padding: 4px 0;
        }

        .view-details-link:hover {
          transform: translateX(4px);
          text-decoration: underline;
        }

        /* Empty state styling */
        .empty-grid-state {
          grid-column: span 2;
          text-align: center;
          padding: 60px 40px;
          color: var(--muted);
          border: 1px dashed var(--border);
          border-radius: 16px;
          background-color: rgba(255, 255, 255, 0.01);
          margin-top: 24px;
        }

        @media (max-width: 992px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .empty-grid-state {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .explore-page-wrapper {
            flex-direction: column;
          }

          .explore-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-container {
            width: 100%;
          }

          .explore-content {
            padding: 20px;
          }
        }
      `}} />

      {/* Reusable Sidebar navigation */}
      <Sidebar currentView="explore" onViewChange={onViewChange} />

      {/* Main Explore Content Area */}
      <div className="explore-content">
        <div className="explore-header-row">
          <div className="explore-title-box">
            <h1 className="explore-title">Explore</h1>
            <p className="explore-subtext">
              Discover curated executive programs and world-class consultancies tailored by AI.
            </p>
          </div>
          <div className="search-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search elite pathways..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tab switcher navigation bar */}
        <div className="tab-nav-container">
          <div className="tabs-row">
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('courses');
                setActiveFilter('All');
              }}
            >
              Courses
            </button>
            <button 
              className={`tab-btn ${activeTab === 'consultancies' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('consultancies');
                setActiveFilter('All');
              }}
            >
              Consultancies
            </button>
          </div>
          <div className={`tab-sliding-underline ${activeTab === 'consultancies' ? 'shift-right' : ''}`} />
        </div>

        {/* Categories filters scroll list */}
        <div className="filter-pills-row">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-pill ${activeFilter === filter ? 'active' : 'inactive'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid display cards */}
        <div className="cards-grid">
          {filteredItems.map((item) => {
            const isSaved = savedCourses.includes(item.id);
            return (
              <div key={item.id} className="explore-card">
                {/* Visual Image Banner */}
                <div 
                  className="card-image-area" 
                  style={{ background: `linear-gradient(to bottom, rgba(7, 13, 26, 0.4), rgba(7, 13, 26, 0.9)), ${item.gradient}` }}
                >
                  <div className="card-image-decorative-circle" />
                  <div className="card-image-logo-badge">
                    {item.institution}
                  </div>

                  {/* Bookmark Button */}
                  <button 
                    className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      onToggleSaveCourse(item.id);
                    }}
                    title={isSaved ? 'Remove from saved' : 'Save program'}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                    </svg>
                  </button>
                </div>

                {/* Information Area */}
                <div className="card-info-area">
                  <span className="card-univ-label">{item.institution}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>

                  <div className="card-footer-row">
                    <div className="card-tags">
                      <span className="card-tag-pill">{item.duration}</span>
                      <span className="card-tag-pill">{item.level}</span>
                    </div>

                    <button 
                      className="view-details-link"
                      onClick={() => onSelectCourse(item)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="empty-grid-state">
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text)' }}>No pathways found</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>
                We couldn't find any listings matching "{searchQuery}" under {activeFilter} in {activeTab}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
