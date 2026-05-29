import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import OnboardingFlow from './pages/OnboardingFlow';
import ExplorePage from './pages/ExplorePage';
import CourseDetail from './pages/CourseDetail';
import SavedPrograms from './pages/SavedPrograms';

function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [previousView, setPreviousView] = useState('onboarding');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [savedCourses, setSavedCourses] = useState([]);
  const [portfolioDocs, setPortfolioDocs] = useState([
    { id: 'doc-1', name: 'Executive_Trajectory_2026.pdf', updated: '2 hours ago' },
    { id: 'doc-2', name: 'Vera_Alignment_Matrix_v4.pdf', updated: '3 days ago' }
  ]);

  // Guarded view change — redirect to auth if trying to access saved while unauthenticated
  const handleViewChange = (view) => {
    if (view === 'saved' && !isAuthenticated) {
      setPreviousView(currentView);
      setCurrentView('auth');
      return;
    }
    setCurrentView(view);
  };

  const handleNavigateToAuth = () => {
    setPreviousView(currentView);
    setCurrentView('auth');
  };

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    // Go back to where the user came from, or to explore if coming from onboarding
    const returnTo = previousView === 'auth' ? 'explore' : (previousView || 'explore');
    setCurrentView(returnTo);
  };

  const handleAuthBack = () => {
    setCurrentView(previousView || 'onboarding');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (currentView === 'saved') {
      setCurrentView('explore');
    }
  };

  const handleToggleSaveCourse = (id) => {
    setSavedCourses(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse({
      id: course.id,
      title: course.title,
      institution: course.institution,
      category: course.category || course.categoryLabel || 'Technology',
      duration: course.duration || course.dateDetail || '24 Months',
      level: course.level || 'Advanced',
      desc: course.desc,
      gradient: course.gradient || 'linear-gradient(135deg, #0e1e38 0%, #070D1A 100%)'
    });
    setCurrentView('detail');
  };

  const handleAddPortfolioDoc = (newDoc) => {
    setPortfolioDocs(prev => [newDoc, ...prev]);
  };

  return (
    <>
      {currentView === 'auth' && (
        <AuthPage 
          onAuthComplete={handleAuthComplete}
          onBack={handleAuthBack}
        />
      )}

      {currentView === 'onboarding' && (
        <OnboardingFlow 
          onCompleteOnboarding={() => setCurrentView('explore')}
          isAuthenticated={isAuthenticated}
          onNavigateToAuth={handleNavigateToAuth}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'explore' && (
        <ExplorePage 
          currentView={currentView}
          onViewChange={handleViewChange}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
          onSelectCourse={handleSelectCourse}
          isAuthenticated={isAuthenticated}
          onNavigateToAuth={handleNavigateToAuth}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'detail' && (
        <CourseDetail 
          currentView={currentView}
          onViewChange={handleViewChange}
          selectedCourse={selectedCourse}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
          isAuthenticated={isAuthenticated}
          onNavigateToAuth={handleNavigateToAuth}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'saved' && isAuthenticated && (
        <SavedPrograms 
          currentView={currentView}
          onViewChange={handleViewChange}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
          onSelectCourse={handleSelectCourse}
          portfolioDocs={portfolioDocs}
          onAddPortfolioDoc={handleAddPortfolioDoc}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
