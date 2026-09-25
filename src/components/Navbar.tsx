import React, { useState } from 'react';
import type { PageTab } from '../types';
import {
  Bot,
  Play,
  Presentation,
  Menu,
  X,
  Shield,
  Activity,
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onLaunchDemoMode: () => void;
  onLaunchSimulation: () => void;
  isSimulating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onLaunchDemoMode,
  onLaunchSimulation,
  isSimulating,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'research', label: 'Research' },
    { id: 'solution', label: 'Solution' },
    { id: 'robot', label: 'Robot' },
    { id: 'classification', label: 'CPCB Waste' },
    { id: 'ai-vision', label: 'AI Vision' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'feasibility', label: 'Feasibility & Roadmap' },
  ];

  const handleTabClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="global-navbar">
      <div className="nav-container">
        {/* Brand Group */}
        <div className="nav-brand" onClick={() => handleTabClick('home')}>
          <div className="brand-icon-box">
            <Bot size={22} className="brand-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title-line">
              <span className="brand-main">MEDITRACK</span>
            </div>
            <span className="brand-sub">Autonomous Medical Waste &amp; Digital Segregation</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
              {activeTab === item.id && <span className="active-pill" />}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* DEMO MODE for Judges */}
          <button
            className="btn-demo-mode"
            onClick={onLaunchDemoMode}
            title="Launch Guided 60-90 Second Presentation Mode for Judges"
          >
            <Presentation size={15} />
            <span>DEMO MODE</span>
          </button>

          {/* Launch Simulation */}
          <button
            className={`btn-launch-sim ${isSimulating ? 'simulating' : ''}`}
            onClick={onLaunchSimulation}
          >
            {isSimulating ? (
              <>
                <Activity size={15} className="spin-slow" />
                <span>Sim Active</span>
              </>
            ) : (
              <>
                <Play size={15} fill="currentColor" />
                <span>Launch Simulation</span>
              </>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-links-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-link-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleTabClick(item.id)}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="mobile-active-check">●</span>}
              </button>
            ))}
          </div>

          <div className="mobile-action-buttons">
            <button className="btn-demo-mode w-full" onClick={() => { onLaunchDemoMode(); setMobileMenuOpen(false); }}>
              <Presentation size={16} />
              <span>Launch Demo Mode (for Judges)</span>
            </button>
            <button className="btn-launch-sim w-full" onClick={() => { onLaunchSimulation(); setMobileMenuOpen(false); }}>
              <Play size={16} fill="currentColor" />
              <span>Launch Simulation Dashboard</span>
            </button>
          </div>

          <div className="mobile-drawer-footer">
            <Shield size={14} />
            <span>Smart India Hackathon 2026 • Concept Prototype</span>
          </div>
        </div>
      )}
    </nav>
  );
};
