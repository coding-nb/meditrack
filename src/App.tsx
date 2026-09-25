import React, { useState } from 'react';
import type { PageTab, CompartmentTally } from './types';
import { DemoModeModal } from './components/DemoModeModal';
import { HomePage } from './pages/HomePage';
import { ProblemPage } from './pages/ProblemPage';
import { ResearchPage } from './pages/ResearchPage';
import { SolutionPage } from './pages/SolutionPage';
import { RobotPage } from './pages/RobotPage';
import { WasteClassificationPage } from './pages/WasteClassificationPage';
import { AIVisionPage } from './pages/AIVisionPage';
import { SimulationPage } from './pages/SimulationPage';
import { TrackingPage } from './pages/TrackingPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { FeasibilityPage } from './pages/FeasibilityPage';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Shared tallies for tracking view
  const [compartments] = useState<CompartmentTally>({
    yellow: 2,
    red: 2,
    white: 2,
    blue: 1,
  });

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchSimulation = () => {
    setActiveTab('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="meditrack-root-layout">
      {/* Global Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        onLaunchDemoMode={() => setDemoModalOpen(true)}
        onLaunchSimulation={handleLaunchSimulation}
        isSimulating={activeTab === 'simulation'}
      />

      {/* Main Content Area */}
      <main className="main-content-viewport">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onLaunchSimulation={handleLaunchSimulation}
          />
        )}
        {activeTab === 'problem' && <ProblemPage onNavigate={handleNavigate} />}
        {activeTab === 'research' && <ResearchPage />}
        {activeTab === 'solution' && <SolutionPage onNavigate={handleNavigate} />}
        {activeTab === 'robot' && <RobotPage />}
        {activeTab === 'classification' && <WasteClassificationPage />}
        {activeTab === 'ai-vision' && <AIVisionPage />}
        {activeTab === 'simulation' && <SimulationPage />}
        {activeTab === 'tracking' && (
          <TrackingPage
            compartments={compartments}
            totalCollected={7}
          />
        )}
        {activeTab === 'architecture' && <ArchitecturePage />}
        {activeTab === 'feasibility' && <FeasibilityPage />}
      </main>

      {/* Guided Presentation Modal for Judges */}
      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onJumpToSimulation={handleLaunchSimulation}
      />

      {/* Global Engineering Footer */}
      <footer className="global-site-footer">
        <div className="footer-content-wrap">
          <div className="footer-top-row">
            <div className="footer-brand-info">
              <span className="footer-brand-title">MEDiTRACK</span>
              <p className="footer-brand-desc">
                Smart Autonomous Biomedical Waste Collection, Segregation &amp; Digital Tracking System
              </p>
              <span className="footer-sih-tag">
                Smart India Hackathon 2026 • Concept &amp; Simulation Prototype
              </span>
            </div>

            <div className="footer-links-grid">
              <div className="footer-link-col">
                <span className="col-heading">System Concept</span>
                <button onClick={() => handleNavigate('problem')}>The Problem</button>
                <button onClick={() => handleNavigate('solution')}>The Approach</button>
                <button onClick={() => handleNavigate('robot')}>Robot Design</button>
                <button onClick={() => handleNavigate('architecture')}>Architecture</button>
              </div>

              <div className="footer-link-col">
                <span className="col-heading">Standards &amp; Research</span>
                <button onClick={() => handleNavigate('research')}>WHO &amp; CPCB Research</button>
                <button onClick={() => handleNavigate('classification')}>CPCB 4-Colour Codes</button>
                <button onClick={() => handleNavigate('ai-vision')}>AI Vision Model</button>
                <button onClick={() => handleNavigate('feasibility')}>Roadmap &amp; Impact</button>
              </div>

              <div className="footer-link-col">
                <span className="col-heading">Demonstration</span>
                <button onClick={handleLaunchSimulation} className="text-highlight">Live Simulation</button>
                <button onClick={() => handleNavigate('tracking')}>Digital Tracking</button>
                <button onClick={() => setDemoModalOpen(true)} className="text-highlight">Judge Demo Mode</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <div className="footer-bottom-disclaimer">
              <ShieldCheck size={14} className="text-emerald" />
              <span>
                <strong>Engineering Prototype Disclaimer:</strong> This application is a visual simulation prototype for concept
                demonstration. It does not execute live physical robotics, ROS, SLAM, or trained neural weights. All simulated
                capabilities are clearly designated as prototypes.
              </span>
            </div>
            <div className="footer-copyright">
              <span>© 2026 MEDiTRACK Concept • Healthcare Robotics &amp; Safety Division</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
