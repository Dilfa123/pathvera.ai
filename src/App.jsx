import React, { useState } from 'react';
import OnboardingFlow from './pages/OnboardingFlow';
import ExplorePage from './pages/ExplorePage';
import CourseDetail from './pages/CourseDetail';
import SavedPrograms from './pages/SavedPrograms';

function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [savedCourses, setSavedCourses] = useState([]);
  const [portfolioDocs, setPortfolioDocs] = useState([
    { id: 'doc-1', name: 'Executive_Trajectory_2026.pdf', updated: '2 hours ago' },
    { id: 'doc-2', name: 'Vera_Alignment_Matrix_v4.pdf', updated: '3 days ago' }
  ]);

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
    // Standardize selected item for detail rendering (mappings between courses and saved lists)
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
      {currentView === 'onboarding' && (
        <OnboardingFlow 
          onCompleteOnboarding={() => setCurrentView('explore')} 
        />
      )}
      
      {currentView === 'explore' && (
        <ExplorePage 
          currentView={currentView}
          onViewChange={setCurrentView}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
          onSelectCourse={handleSelectCourse}
        />
      )}

      {currentView === 'detail' && (
        <CourseDetail 
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedCourse={selectedCourse}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
        />
      )}

      {currentView === 'saved' && (
        <SavedPrograms 
          currentView={currentView}
          onViewChange={setCurrentView}
          savedCourses={savedCourses}
          onToggleSaveCourse={handleToggleSaveCourse}
          onSelectCourse={handleSelectCourse}
          portfolioDocs={portfolioDocs}
          onAddPortfolioDoc={handleAddPortfolioDoc}
        />
      )}
    </>
  );
}

export default App;
