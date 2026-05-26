import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';

export default function SavedPrograms({ 
  currentView, 
  onViewChange, 
  savedCourses = [], 
  onToggleSaveCourse,
  onSelectCourse,
  portfolioDocs = [],
  onAddPortfolioDoc
}) {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Courses' | 'Consultancies'
  const fileInputRef = useRef(null);

  // Initial mock documents if not loaded
  const defaultDocs = [
    { id: 'doc-1', name: 'Executive_Trajectory_2026.pdf', updated: '2 hours ago' },
    { id: 'doc-2', name: 'Vera_Alignment_Matrix_v4.pdf', updated: '3 days ago' }
  ];

  const displayDocs = portfolioDocs.length > 0 ? portfolioDocs : defaultDocs;

  // Initial mock saved items
  const mockSavedPrograms = [
    {
      id: 'saved-1',
      title: 'AI Strategic Architecture',
      institution: 'Stanford University',
      type: 'courses',
      categoryLabel: 'MASTERCLASS',
      desc: 'Developing cognitive architectural layers, core vector matrices, and deep networks for enterprise transformation.',
      rating: 5,
      dateDetail: 'Duration: 8 Weeks',
      gradient: 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)'
    },
    {
      id: 'saved-2',
      title: 'Global Tech Leadership Residency',
      institution: 'Elite Career Partners',
      type: 'consultancies',
      categoryLabel: 'CONSULTANCY',
      desc: 'One-on-one advisory matrix matching senior leaders to board placement strategies and compensation arbitrage models.',
      rating: 5,
      dateDetail: 'Schedule: Ongoing',
      gradient: 'linear-gradient(135deg, #30200f 0%, #070D1A 100%)'
    },
    {
      id: 'saved-3',
      title: 'Executive Blockchain Strategy',
      institution: 'MIT Professional Education',
      type: 'courses',
      categoryLabel: 'CERTIFICATION',
      desc: 'Advanced cryptography pipelines, algorithmic audit logs, and decentralization vectors for multinational systems.',
      rating: 4,
      dateDetail: 'Duration: 6 Weeks',
      gradient: 'linear-gradient(135deg, #230f30 0%, #070D1A 100%)'
    }
  ];

  // We combine the pre-populated mock saved programs with any courses/consultancies the user bookmarked from the Explore page
  // First, map savedCourse IDs to actual details
  const exploreCoursesMock = [
    {
      id: 'course-1',
      title: 'Master of Science in Artificial Intelligence',
      institution: 'Stanford University',
      type: 'courses',
      categoryLabel: 'MASTERCLASS',
      desc: 'Deep exploration of foundational neural architectures, machine learning models, and executive AI deployment frameworks.',
      rating: 5,
      dateDetail: '24 Months',
      gradient: 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)',
    },
    {
      id: 'course-2',
      title: 'Quantum Computing & Corporate Strategy',
      institution: 'MIT Professional Education',
      type: 'courses',
      categoryLabel: 'MASTERCLASS',
      desc: 'A complete framework for leveraging quantum algorithmics in enterprise architecture and portfolio planning.',
      rating: 4,
      dateDetail: '6 Months',
      gradient: 'linear-gradient(135deg, #1a0f30 0%, #070D1A 100%)',
    },
    {
      id: 'course-3',
      title: 'Executive Leadership in Technology Pivots',
      institution: 'Harvard Business School',
      type: 'courses',
      categoryLabel: 'MASTERCLASS',
      desc: 'Architecting business strategy and organizational agility through disruptive shifts in tech, Web3, and robotics.',
      rating: 5,
      dateDetail: '9 Months',
      gradient: 'linear-gradient(135deg, #300f12 0%, #070D1A 100%)',
    },
    {
      id: 'course-4',
      title: 'Sustainable Energy Systems & Machine Learning',
      institution: 'UC Berkeley Extension',
      type: 'courses',
      categoryLabel: 'MASTERCLASS',
      desc: 'Leveraging forecasting neural networks to optimize solar grids, storage dynamics, and net-zero policies.',
      rating: 5,
      dateDetail: '12 Months',
      gradient: 'linear-gradient(135deg, #0f301b 0%, #070D1A 100%)',
    },
    {
      id: 'consult-1',
      title: 'Bespoke AI Engineering Integration',
      institution: 'Vera AI Solutions',
      type: 'consultancies',
      categoryLabel: 'CONSULTANCY',
      desc: 'Custom deployment of large language models, agent systems, and vector databases optimized for enterprise data.',
      rating: 5,
      dateDetail: '3-6 Months',
      gradient: 'linear-gradient(135deg, #0f2730 0%, #070D1A 100%)',
    },
    {
      id: 'consult-2',
      title: 'Quantum Security Vulnerability Audit',
      institution: 'Apex Frontier Group',
      type: 'consultancies',
      categoryLabel: 'CONSULTANCY',
      desc: 'Hardening cryptography pipelines against next-generation Shor\'s and Grover\'s algorithm exploits.',
      rating: 4,
      dateDetail: '1 Month',
      gradient: 'linear-gradient(135deg, #230f30 0%, #070D1A 100%)',
    },
    {
      id: 'consult-3',
      title: 'Global Market Entry & Policy Strategy',
      institution: 'Vance Advisory Partners',
      type: 'consultancies',
      categoryLabel: 'CONSULTANCY',
      desc: 'Navigating international tariffs, structural pivots, and regional compliance matrices for scale-ups.',
      rating: 5,
      dateDetail: '6 Months',
      gradient: 'linear-gradient(135deg, #30200f 0%, #070D1A 100%)',
    },
    {
      id: 'consult-4',
      title: 'De-Carbonization Supply Chain Optimization',
      institution: 'Bio-Carbon Advisory',
      type: 'consultancies',
      categoryLabel: 'CONSULTANCY',
      desc: 'Applying graph neural networks to audit scope-3 emissions and re-route maritime freight vectors.',
      rating: 5,
      dateDetail: '2-4 Months',
      gradient: 'linear-gradient(135deg, #1b300f 0%, #070D1A 100%)',
    }
  ];

  // Merge lists to build total programs display
  const userBookmarkedPrograms = exploreCoursesMock.filter(c => savedCourses.includes(c.id));
  
  // Deduplicate items just in case
  const allSavedList = [...mockSavedPrograms];
  userBookmarkedPrograms.forEach(item => {
    if (!allSavedList.some(p => p.id === item.id)) {
      allSavedList.push(item);
    }
  });

  // Filters calculation
  const filteredPrograms = allSavedList.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Courses') return p.type === 'courses';
    if (activeFilter === 'Consultancies') return p.type === 'consultancies';
    return true;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span 
          key={i} 
          style={{ 
            color: i < rating ? 'var(--gold)' : 'rgba(255, 255, 255, 0.1)', 
            marginRight: '2px',
            fontSize: '12px'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: files[0].name,
        updated: 'Just now'
      };
      onAddPortfolioDoc(newDoc);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: files[0].name,
        updated: 'Just now'
      };
      onAddPortfolioDoc(newDoc);
    }
  };

  return (
    <div className="saved-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .saved-page-wrapper {
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

        .saved-content {
          flex: 1;
          display: flex;
          gap: 24px;
          padding: 32px;
          box-sizing: border-box;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .left-list-col {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .saved-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px 0;
        }

        .saved-subtitle-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .count-badge {
          background-color: var(--gold);
          color: #070D1A;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
        }

        .count-subtext {
          font-size: 13.5px;
          color: var(--muted);
        }

        /* Filter Tabs */
        .filter-tabs-row {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tab-pill {
          background-color: var(--card);
          border: 1px solid var(--border);
          color: var(--muted);
          border-radius: 20px;
          padding: 6px 18px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .tab-pill:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .tab-pill.active {
          background-color: var(--gold);
          color: #070D1A;
          border-color: var(--gold);
          font-weight: 600;
        }

        /* Card List Stack */
        .cards-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .saved-card {
          display: flex;
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 250ms ease, box-shadow 250ms ease;
        }

        .saved-card:hover {
          border-color: var(--gold);
          box-shadow: var(--glow-gold);
        }

        .card-img-placeholder {
          width: 120px;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .card-img-decorative {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,209,102,0.06), transparent);
        }

        .card-img-abbr {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: rgba(255,255,255,0.15);
          z-index: 1;
        }

        .card-right-info {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
        }

        .card-badge-category {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.12em;
          margin-bottom: 6px;
        }

        .saved-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .saved-card-inst {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 12px;
        }

        .saved-card-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.45;
          margin: 0 0 16px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .saved-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .saved-card-rating {
          display: flex;
          align-items: center;
        }

        .saved-card-pills {
          display: flex;
          gap: 8px;
        }

        .saved-card-pill {
          background-color: var(--blue-dim);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 3px 8px;
          font-size: 10px;
          color: var(--blue-accent);
        }

        .btn-card-unsave {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .btn-card-unsave:hover {
          color: var(--gold);
        }

        /* Right Sidebar Column */
        .right-sidebar-col {
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex-shrink: 0;
        }

        /* Profile Card */
        .profile-card {
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .profile-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--blue-accent));
          border: 2px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--bg);
          margin: 0 auto 16px auto;
          box-shadow: 0 0 16px rgba(255, 209, 102, 0.2);
        }

        .profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 4px 0;
        }

        .profile-title {
          font-family: monospace;
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 0.15em;
          margin-bottom: 20px;
        }

        .profile-stats-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          font-family: monospace;
          font-size: 11px;
          color: var(--muted);
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .profile-stat-number {
          color: var(--gold);
          font-weight: bold;
        }

        /* Portfolio Section */
        .portfolio-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .portfolio-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .portfolio-heading {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .manage-all-link {
          font-size: 11px;
          color: var(--blue-accent);
          text-decoration: none;
          cursor: pointer;
        }

        .manage-all-link:hover {
          text-decoration: underline;
        }

        .doc-item {
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .doc-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .doc-icon-color {
          color: var(--gold);
          flex-shrink: 0;
        }

        .doc-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .doc-filename {
          font-size: 13px;
          color: var(--text);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .doc-updated {
          font-size: 11px;
          color: var(--muted);
        }

        .doc-menu-btn {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .doc-menu-btn:hover {
          color: var(--text);
        }

        /* Upload zone */
        .upload-dropzone {
          border: 2px dashed rgba(255, 209, 102, 0.3);
          border-radius: 14px;
          padding: 28px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .upload-dropzone:hover {
          border-color: var(--gold);
          background-color: var(--gold-dim);
        }

        .upload-icon {
          color: var(--gold);
          margin-bottom: 4px;
        }

        .upload-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .upload-subtitle {
          font-size: 11.5px;
          color: var(--muted);
          margin: 0;
        }

        @media (max-width: 992px) {
          .saved-content {
            flex-direction: column;
          }
          .right-sidebar-col {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .saved-page-wrapper {
            flex-direction: column;
          }
          .saved-content {
            padding: 20px;
          }
          .saved-card {
            flex-direction: column;
          }
          .card-img-placeholder {
            width: 100%;
            height: 100px;
          }
        }
      `}} />

      {/* Shared Sidebar layout */}
      <Sidebar currentView="saved" onViewChange={onViewChange} />

      {/* Main Saved Content */}
      <div className="saved-content">
        
        {/* Left Saved Cards column */}
        <div className="left-list-col">
          <h1 className="saved-title">Saved Programs</h1>
          
          <div className="saved-subtitle-row">
            <div className="count-badge">{filteredPrograms.length}</div>
            <span className="count-subtext">Elite paths ready for your trajectory</span>
          </div>

          {/* Filter pills */}
          <div className="filter-tabs-row">
            {['All', 'Courses', 'Consultancies'].map((tab) => (
              <button
                key={tab}
                className={`tab-pill ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards vertical list stack */}
          <div className="cards-stack">
            {filteredPrograms.map((program) => (
              <div 
                key={program.id} 
                className="saved-card"
                onClick={() => onSelectCourse(program)}
              >
                {/* Image area */}
                <div 
                  className="card-img-placeholder"
                  style={{ background: `linear-gradient(to bottom, rgba(7, 13, 26, 0.4), rgba(7, 13, 26, 0.9)), ${program.gradient}` }}
                >
                  <div className="card-img-decorative" />
                  <span className="card-img-abbr">
                    {program.institution ? program.institution.charAt(0) : 'P'}
                  </span>
                </div>

                {/* Info area */}
                <div className="card-right-info">
                  
                  {/* Category Label */}
                  <span className="card-badge-category">
                    {program.categoryLabel || 'PROGRAM'}
                  </span>

                  <h3 className="saved-card-title">{program.title}</h3>
                  <div className="saved-card-inst">{program.institution}</div>
                  <p className="saved-card-desc">{program.desc}</p>

                  <div className="saved-card-footer">
                    <div className="saved-card-rating">
                      {renderStars(program.rating || 5)}
                    </div>
                    <div className="saved-card-pills">
                      <span className="saved-card-pill">
                        {program.dateDetail || 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Remove Button */}
                  <button 
                    className="btn-card-unsave"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click details
                      onToggleSaveCourse(program.id);
                    }}
                    title="Remove program"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {filteredPrograms.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)', border: '1px dashed var(--border)', borderRadius: '14px' }}>
                No saved {activeFilter === 'All' ? 'programs' : activeFilter.toLowerCase()} found. 
                Go to <span style={{ color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => onViewChange('explore')}>Explore</span> to add some!
              </div>
            )}
          </div>
        </div>

        {/* Right User Sidebar column */}
        <div className="right-sidebar-col">
          
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-circle">JV</div>
            <h3 className="profile-name">Julian Vance</h3>
            <div className="profile-title">SENIOR ARCHITECT</div>
            
            <div className="profile-stats-row">
              <span>
                <span className="profile-stat-number">{allSavedList.length}</span> PROGRAMS
              </span>
              <span>·</span>
              <span>
                <span className="profile-stat-number">04</span> APPS
              </span>
              <span>·</span>
              <span>
                <span className="profile-stat-number">{displayDocs.length}</span> DOCS
              </span>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="portfolio-section">
            <div className="portfolio-header">
              <h4 className="portfolio-heading">Portfolio</h4>
              <span className="manage-all-link">Manage All →</span>
            </div>

            {displayDocs.map((doc) => (
              <div key={doc.id} className="doc-item">
                <div className="doc-left">
                  <span className="doc-icon-color">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  <div className="doc-info">
                    <span className="doc-filename" title={doc.name}>{doc.name}</span>
                    <span className="doc-updated">Updated {doc.updated}</span>
                  </div>
                </div>
                <button className="doc-menu-btn">⋮</button>
              </div>
            ))}
          </div>

          {/* Drag & Drop Upload Zone */}
          <div 
            className="upload-dropzone"
            onClick={triggerFileSelect}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <span className="upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <h4 className="upload-title">Upload Document</h4>
            <p className="upload-subtitle">PDF, DOCX up to 10MB</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileUpload}
              accept=".pdf,.docx,.doc"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
