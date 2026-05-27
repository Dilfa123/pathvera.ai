import React, { useState } from 'react';

export default function Sidebar({ currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      id: 'onboarding',
      label: 'Onboarding',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'explore',
      label: 'Explore Pathways',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
    },
    {
      id: 'saved',
      label: 'Saved Programs',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-container {
          --surface: #0C1829;
          --gold: #FFD166;
          --text: #F0F4FF;
          --muted: #6B84A3;
          --border: rgba(100, 160, 255, 0.10);
          --bg: #070D1A;
          --blue-accent: #4A9EFF;
          
          width: 250px;
          height: 100vh;
          background-color: var(--surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 32px 24px;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          left: 0;
          flex-shrink: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          margin-bottom: 40px;
        }

        .sidebar-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 300;
          color: var(--text);
          letter-spacing: 0.12em;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sidebar-logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--gold);
          box-shadow: 0 0 12px rgba(255,209,102,0.6), 0 0 24px rgba(255,209,102,0.3);
          display: inline-block;
          animation: dot-glow 2.5s infinite ease-in-out;
        }

        @keyframes dot-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(255,209,102,0.5); }
          50% { box-shadow: 0 0 18px rgba(255,209,102,0.8), 0 0 30px rgba(255,209,102,0.4); }
        }

        .sidebar-tagline {
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-top: 6px;
          margin-bottom: 0;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          color: var(--muted);
          font-family: 'Lato', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          border-left: 3px solid transparent;
        }

        .sidebar-item:hover {
          color: var(--text);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .sidebar-item.active {
          color: var(--gold);
          background-color: rgba(255, 209, 102, 0.04);
          border-left-color: var(--gold);
          font-weight: 600;
        }

        .sidebar-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .sidebar-item.active .sidebar-item-icon {
          opacity: 1;
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }

        .engine-status-title {
          font-family: monospace;
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        .engine-status-value {
          font-family: monospace;
          font-size: 9px;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: bold;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #52C41A;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px #52C41A;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        /* Mobile layout styling */
        .mobile-header-bar {
          display: none;
          width: 100vw;
          height: 60px;
          background-color: var(--surface);
          border-bottom: 1px solid var(--border);
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          z-index: 101;
        }

        .hamburger-btn {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: var(--text);
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .sidebar-container {
            position: fixed;
            top: 60px;
            left: 0;
            height: calc(100vh - 60px);
            transform: translateX(-100%);
            width: 240px;
          }

          .sidebar-container.open {
            transform: translateX(0);
          }

          .mobile-header-bar {
            display: flex;
          }
        }
      `}} />

      {/* Mobile Top Bar */}
      <div className="mobile-header-bar">
        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
        <span className="mobile-logo">Pathvera<span style={{ color: 'var(--gold)' }}>.</span>ai</span>
        <div style={{ width: 24 }}></div>
      </div>

      {/* Main Sidebar */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">
            <span className="sidebar-logo-dot" />
            Pathvera<span style={{ color: 'var(--gold)' }}>.</span>ai
          </h2>
          <p className="sidebar-tagline">FUTURE-PROOF YOUR LEGACY</p>
        </div>

        <div className="sidebar-menu">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${currentView === item.id || (currentView === 'detail' && item.id === 'explore') ? 'active' : ''}`}
              onClick={() => {
                onViewChange(item.id);
                setIsOpen(false);
              }}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <span className="engine-status-title">VERA ENGINE V.4.02</span>
          <span className="engine-status-value">
            <span className="status-dot" /> ACTIVE MATRIX
          </span>
        </div>
      </div>
    </>
  );
}
