import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/Sidebar';

gsap.registerPlugin(ScrollTrigger);

export default function SavedPrograms({ 
  currentView, 
  onViewChange, 
  savedCourses = [], 
  onToggleSaveCourse,
  onSelectCourse,
  portfolioDocs = [],
  onAddPortfolioDoc,
  isAuthenticated,
  onLogout
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const fileInputRef = useRef(null);

  // GSAP Refs
  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const cardsStackRef = useRef(null);
  const emptyStateRef = useRef(null);

  // Profile Refs
  const avatarRef = useRef(null);
  const nameTitleRef = useRef(null);
  const statsRowRef = useRef(null);
  const sectionCardsRef = useRef([]);

  // Progress Bar Ref
  const progressBarFillRef = useRef(null);

  // Upload Refs
  const uploadDropzoneRef = useRef(null);
  const uploadIconRef = useRef(null);
  const uploadFlashRef = useRef(null);

  // Settings Modal Refs
  const settingsModalBackdropRef = useRef(null);
  const settingsModalPanelRef = useRef(null);
  const settingsItemsRef = useRef([]);
  const settingsTl = useRef(null);

  // Initial mock documents if not loaded
  const defaultDocs = [
    { id: 'doc-1', name: 'Executive_Trajectory_2026.pdf', updated: '2 hours ago' },
    { id: 'doc-2', name: 'Vera_Alignment_Matrix_v4.pdf', updated: '3 days ago' }
  ];

  const displayDocs = portfolioDocs.length > 0 ? portfolioDocs : defaultDocs;

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

  const userBookmarkedPrograms = exploreCoursesMock.filter(c => savedCourses.includes(c.id));
  
  const allSavedList = [...mockSavedPrograms];
  userBookmarkedPrograms.forEach(item => {
    if (!allSavedList.some(p => p.id === item.id)) {
      allSavedList.push(item);
    }
  });

  const filteredPrograms = allSavedList.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Courses') return p.type === 'courses';
    if (activeFilter === 'Consultancies') return p.type === 'consultancies';
    return true;
  });

  // GSAP INITIAL ENTRANCE ANIMATIONS
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Page Entrance
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      
      if (cardsStackRef.current && cardsStackRef.current.children.length > 0) {
        gsap.fromTo(cardsStackRef.current.children, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
        );
      }

      // 2. Profile Section Waterfall
      const tl = gsap.timeline();
      tl.fromTo(avatarRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, 0.1)
        .fromTo(nameTitleRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.35)
        .fromTo(statsRowRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5);

      // Section Cards
      sectionCardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.7 + (i * 0.08), ease: 'power3.out' });
        }
      });

      // 3. Progress Bar Fill
      if (progressBarFillRef.current) {
        gsap.to(progressBarFillRef.current, {
          width: '78%',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: progressBarFillRef.current,
            start: 'top 88%',
            once: true,
            onComplete: () => {
              progressBarFillRef.current.classList.add('shimmer');
            }
          }
        });
      }

      // 4. Settings Modal Timeline
      settingsTl.current = gsap.timeline({ paused: true })
        .to(settingsModalBackdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' })
        .to(settingsModalPanelRef.current, { y: '0%', duration: 0.4, ease: 'power4.out' }, '-=0.2')
        .fromTo(settingsItemsRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' }, '-=0.2');

    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Empty State Animation
  useEffect(() => {
    if (filteredPrograms.length === 0 && emptyStateRef.current) {
      let ctx = gsap.context(() => {
        gsap.fromTo(emptyStateRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        gsap.to(emptyStateRef.current, { y: -10, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }, mainRef);
      return () => ctx.revert();
    }
  }, [filteredPrograms.length]);

  // Upload Card Hover
  useEffect(() => {
    const el = uploadDropzoneRef.current;
    if (!el) return;
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(el, { y: -4, scale: 1.01, duration: 0.25, ease: 'power2.out' });
    
    const onEnter = () => hoverTl.play();
    const onLeave = () => hoverTl.reverse();
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleRemoveCard = (e, programId) => {
    e.stopPropagation();
    const cardEl = e.currentTarget.closest('.saved-card');
    const tl = gsap.timeline({
      onComplete: () => {
        onToggleSaveCourse(programId);
      }
    });
    tl.to(cardEl, { x: 80, opacity: 0, duration: 0.35, ease: 'power2.in' })
      .to(cardEl, { height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0, duration: 0.3, ease: 'power3.out' });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    gsap.to(uploadDropzoneRef.current, { scale: 1.03, boxShadow: '0 0 0 2px #F0AD00', duration: 0.2 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    gsap.to(uploadDropzoneRef.current, { scale: 1, boxShadow: 'none', duration: 0.2 });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    gsap.to(uploadDropzoneRef.current, { scale: 1, boxShadow: 'none', duration: 0.2 });
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      executeUploadAnimation(files[0].name);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      executeUploadAnimation(files[0].name);
    }
  };

  const executeUploadAnimation = (filename) => {
    const tl = gsap.timeline({
      onComplete: () => {
        const newDoc = { id: `doc-${Date.now()}`, name: filename, updated: 'Just now' };
        onAddPortfolioDoc(newDoc);
        // reset icon
        setTimeout(() => {
          if (uploadIconRef.current) {
            uploadIconRef.current.innerHTML = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />';
          }
        }, 1500);
      }
    });

    tl.to(uploadIconRef.current, { scale: 0, duration: 0.2 })
      .set(uploadIconRef.current, { innerHTML: '<polyline points="20 6 9 17 4 12" />' })
      .to(uploadIconRef.current, { scale: 1.4, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
      .to(uploadIconRef.current, { scale: 1, duration: 0.2 })
      .to(uploadFlashRef.current, { opacity: 0.1, duration: 0.1 }, "-=0.6")
      .to(uploadFlashRef.current, { opacity: 0, duration: 0.4 }, "-=0.5");
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const openSettings = () => {
    settingsTl.current.play();
  };

  const closeSettings = () => {
    settingsTl.current.reverse();
  };

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

  return (
    <div className="saved-page-wrapper" ref={mainRef}>
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

        /* Achievement Section */
        .achievement-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
        }
        
        .achievement-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
          display: flex;
          justify-content: space-between;
        }

        .progress-bar-container {
          height: 6px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          margin-top: 4px;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: var(--gold);
          width: 0%;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: translateX(-100%);
        }
        
        .progress-bar-fill.shimmer::after {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
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

        /* Upload zone */
        .upload-dropzone {
          border: 2px dashed rgba(255, 209, 102, 0.3);
          border-radius: 14px;
          padding: 28px 16px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
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

        .upload-success-flash {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--gold);
          opacity: 0;
          pointer-events: none;
          border-radius: 14px;
        }

        /* Settings Actions */
        .settings-btn {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text);
          padding: 12px;
          width: 100%;
          text-align: center;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .settings-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* Settings Modal */
        .settings-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(7, 13, 26, 0.8);
          backdrop-filter: blur(8px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
        }

        .settings-modal-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          width: 400px;
          max-width: 90vw;
          padding: 32px;
          transform: translateY(100%);
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .settings-header h3 {
          margin: 0;
          font-size: 20px;
          color: var(--text);
          font-family: 'Cormorant Garamond', serif;
        }

        .close-settings-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .close-settings-btn:hover {
          color: var(--text);
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: var(--card);
          border-radius: 12px;
          border: 1px solid transparent;
          transition: border-color 0.2s;
          cursor: pointer;
          color: var(--text);
          font-size: 14px;
        }

        .settings-item:hover {
          border-color: var(--gold);
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
      <Sidebar currentView="saved" onViewChange={onViewChange} isAuthenticated={isAuthenticated} onLogout={onLogout} />

      {/* Main Saved Content */}
      <div className="saved-content">
        
        {/* Left Saved Cards column */}
        <div className="left-list-col">
          <h1 className="saved-title" ref={headingRef}>Saved Programs</h1>
          
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
          <div className="cards-stack" ref={cardsStackRef}>
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
                    onClick={(e) => handleRemoveCard(e, program.id)}
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
              <div ref={emptyStateRef} style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)', border: '1px dashed var(--border)', borderRadius: '14px' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚀</div>
                No saved {activeFilter === 'All' ? 'programs' : activeFilter.toLowerCase()} found.<br/>
                Go to <span style={{ color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => onViewChange('explore')}>Explore</span> to add some!
              </div>
            )}
          </div>
        </div>

        {/* Right User Sidebar column */}
        <div className="right-sidebar-col">
          
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-circle" ref={avatarRef}>JV</div>
            <div ref={nameTitleRef}>
              <h3 className="profile-name">Julian Vance</h3>
              <div className="profile-title">SENIOR ARCHITECT</div>
            </div>
            
            <div className="profile-stats-row" ref={statsRowRef}>
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

          {/* Achievement Section */}
          <div className="achievement-section" ref={el => sectionCardsRef.current[0] = el}>
            <div className="achievement-title">
              Vera Matrix Alignment
              <span style={{ color: 'var(--gold)' }}>78%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" ref={progressBarFillRef} />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '4px 0 0 0' }}>
              Profile optimization reaching advanced maturity
            </p>
          </div>

          {/* Portfolio Section */}
          <div className="portfolio-section" ref={el => sectionCardsRef.current[1] = el}>
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
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            ref={uploadDropzoneRef}
          >
            <div className="upload-success-flash" ref={uploadFlashRef} />
            <span className="upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" ref={uploadIconRef}>
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

          <button 
            className="settings-btn" 
            ref={el => sectionCardsRef.current[2] = el}
            onClick={openSettings}
          >
            Account Settings
          </button>

        </div>

      </div>

      {/* Settings Modal (Always rendered, animated via GSAP) */}
      <div className="settings-modal-backdrop" ref={settingsModalBackdropRef} onClick={closeSettings}>
        <div className="settings-modal-panel" ref={settingsModalPanelRef} onClick={(e) => e.stopPropagation()}>
          <div className="settings-header">
            <h3>Settings</h3>
            <button className="close-settings-btn" onClick={closeSettings}>×</button>
          </div>
          <div className="settings-list">
            <div className="settings-item" ref={el => settingsItemsRef.current[0] = el}>
              <span>Profile Information</span>
              <span style={{ color: 'var(--muted)' }}>→</span>
            </div>
            <div className="settings-item" ref={el => settingsItemsRef.current[1] = el}>
              <span>Notification Preferences</span>
              <span style={{ color: 'var(--muted)' }}>→</span>
            </div>
            <div className="settings-item" ref={el => settingsItemsRef.current[2] = el}>
              <span>Security & Privacy</span>
              <span style={{ color: 'var(--muted)' }}>→</span>
            </div>
            <div className="settings-item" ref={el => settingsItemsRef.current[3] = el}>
              <span style={{ color: '#EA4335' }}>Sign Out</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
