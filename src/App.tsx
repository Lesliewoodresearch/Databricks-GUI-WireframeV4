import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResearchPage } from './components/ResearchPage';

export default function App() {
  const [showResearchPage, setShowResearchPage] = useState(false);

  const handleEnterResearchHub = () => {
    setShowResearchPage(true);
  };

  const handleBackToLanding = () => {
    setShowResearchPage(false);
  };

  if (!showResearchPage) {
    return <LandingPage onLoginClick={handleEnterResearchHub} />;
  }

  return <ResearchPage userId="User" onLogout={handleBackToLanding} />;
}