import React from 'react';
import {
  Play,
  ArrowRight,
  Eye,
  Bot,
  Layers,
  Database,
  ShieldCheck,
  ChevronRight,
  Hospital,
  AlertCircle,
} from 'lucide-react';
import type { PageTab } from '../types';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onLaunchSimulation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onLaunchSimulation,
}) => {
  return (
    <div className="page-view home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="hero-pill-badge">SMART INDIA HACKATHON 2026</span>
            <span className="hero-category-tag">BIOMEDICAL WASTE MANAGEMENT</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-brand">MEDiTRACK</span>
            <span className="headline-title">
              Smart Autonomous Biomedical Waste Collection, Segregation &amp; Digital Tracking
            </span>
          </h1>

          <p className="hero-subtitle">
            "An AI-assisted autonomous mobile concept designed to reduce manual handling,
            improve segregation and provide digital traceability of biomedical waste."
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-hero" onClick={onLaunchSimulation}>
              <Play size={18} fill="currentColor" />
              <span>Launch Simulation</span>
            </button>
            <button className="btn-secondary-hero" onClick={() => onNavigate('solution')}>
              <span>Explore Solution</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mandatory Concept Disclaimer */}
          <div className="hero-disclaimer-note">
            <AlertCircle size={15} className="disclaimer-icon" />
            <span>
              <strong>Concept Prototype:</strong> Digital simulation demonstrating the software, state machine,
              and segregation architecture. Physical robotic hardware integration is planned as a future development stage.
            </span>
          </div>
        </div>
      </section>

      {/* Main Workflow Strip: WASTE -> DETECT -> CLASSIFY -> COLLECT -> SEGREGATE -> TRACK */}
      <section className="workflow-overview-section">
        <div className="section-header-compact">
          <span className="section-super-title">END-TO-END CONCEPTUAL WORKFLOW</span>
          <h2 className="section-main-title">Continuous Autonomous Segregation Cycle</h2>
        </div>

        <div className="workflow-strip-container">
          <div className="flow-step-block">
            <span className="flow-index">01</span>
            <span className="flow-title">WASTE</span>
            <span className="flow-sub">Hospital Generation Point</span>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step-block">
            <span className="flow-index">02</span>
            <span className="flow-title">DETECT</span>
            <span className="flow-sub">Sensor &amp; Visual Acquisition</span>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step-block">
            <span className="flow-index">03</span>
            <span className="flow-title">CLASSIFY</span>
            <span className="flow-sub">AI Classification Simulation</span>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step-block">
            <span className="flow-index">04</span>
            <span className="flow-title">COLLECT</span>
            <span className="flow-sub">Contactless Suction Intake</span>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step-block">
            <span className="flow-index">05</span>
            <span className="flow-title">SEGREGATE</span>
            <span className="flow-sub">4-Chamber CPCB Vault</span>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step-block highlight">
            <span className="flow-index">06</span>
            <span className="flow-title">TRACK</span>
            <span className="flow-sub">Digital Cloud Audit Record</span>
          </div>
        </div>
      </section>

      {/* Four Core Feature Cards */}
      <section className="features-grid-section">
        <div className="section-header-compact">
          <span className="section-super-title">CORE ENGINEERING PILLARS</span>
          <h2 className="section-main-title">Designed for Clinical Environments</h2>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card" onClick={() => onNavigate('ai-vision')}>
            <div className="feature-icon-wrapper cyan">
              <Eye size={24} />
            </div>
            <h3 className="feature-card-title">AI-Assisted Vision</h3>
            <p className="feature-card-desc">
              Simulated optical pattern recognition maps discarded items to statutory CPCB categories
              with real-time confidence scores and uncertainty fallback holds.
            </p>
            <div className="feature-card-link">
              <span>Inspect AI Vision model</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card" onClick={() => onNavigate('robot')}>
            <div className="feature-icon-wrapper blue">
              <Bot size={24} />
            </div>
            <h3 className="feature-card-title">Autonomous Collection</h3>
            <p className="feature-card-desc">
              Indoor mobile platform designed for compact hospital corridors, utilizing predetermined
              waypoint topological navigation and quiet brushless drive locomotion.
            </p>
            <div className="feature-card-link">
              <span>View Robot Technical Blueprint</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card" onClick={() => onNavigate('classification')}>
            <div className="feature-icon-wrapper amber">
              <Layers size={24} />
            </div>
            <h3 className="feature-card-title">Multi-Category Segregation</h3>
            <p className="feature-card-desc">
              Internal sealed four-chamber segregation vault aligned directly with India's CPCB rules:
              Yellow (Soiled), Red (Recyclable), White (Sharps), and Blue (Glass).
            </p>
            <div className="feature-card-link">
              <span>Explore CPCB Categories</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card" onClick={() => onNavigate('tracking')}>
            <div className="feature-icon-wrapper emerald">
              <Database size={24} />
            </div>
            <h3 className="feature-card-title">Digital Traceability</h3>
            <p className="feature-card-desc">
              Immutable time-stamped digital records capturing collection event coordinates, item categories,
              and cumulative department tallies for regulatory compliance.
            </p>
            <div className="feature-card-link">
              <span>Open Tracking Telemetry</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Research & Compliance Strip */}
      <section className="research-anchor-strip">
        <div className="anchor-content-box">
          <div className="anchor-icon-side">
            <Hospital size={32} className="text-cyan" />
          </div>
          <div className="anchor-text-side">
            <h4 className="anchor-title">Grounded in WHO Safety &amp; CPCB 2016 Regulatory Framework</h4>
            <p className="anchor-desc">
              MediTrack's design choices are directly informed by the World Health Organization's hazardous waste
              statistics and Central Pollution Control Board (CPCB) colour-coded biomedical waste management rules.
            </p>
          </div>
          <button className="btn-anchor-view" onClick={() => onNavigate('research')}>
            <span>View Research Foundation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
