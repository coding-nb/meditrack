import React from 'react';
import {
  ArrowDown,
  Eye,
  Bot,
  Layers,
  Database,
  CheckCircle2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import type { PageTab } from '../types';

interface SolutionPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view solution-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">SYSTEM CONCEPT &amp; SPECIFICATION</span>
        <h1 className="page-main-title">THE MEDiTRACK APPROACH</h1>
        <p className="page-intro-paragraph">
          An integrated cyber-physical solution combining autonomous indoor mobility, synthetic visual inference,
          isolated multi-chamber segregation, and real-time digital logging.
        </p>
      </div>

      {/* Main Solution Architecture Flow */}
      <section className="solution-architecture-strip">
        <h3 className="sub-section-title">End-to-End Operational Architecture</h3>

        <div className="architecture-chain-card">
          <div className="arch-chain-node">
            <span className="arch-step">01</span>
            <span className="arch-name">Hospital Environment</span>
            <span className="arch-sub">Corridors &amp; Wards</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node highlight">
            <span className="arch-step">02</span>
            <span className="arch-name">MediTrack Robot</span>
            <span className="arch-sub">Autonomous Mobile Platform</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node">
            <span className="arch-step">03</span>
            <span className="arch-name">AI-Assisted Vision</span>
            <span className="arch-sub">Optical Object Acquisition</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node">
            <span className="arch-step">04</span>
            <span className="arch-name">Waste Classification</span>
            <span className="arch-sub">CPCB Category Assignment</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node">
            <span className="arch-step">05</span>
            <span className="arch-name">Collection</span>
            <span className="arch-sub">Hands-Free Mechanical Intake</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node">
            <span className="arch-step">06</span>
            <span className="arch-name">Segregation</span>
            <span className="arch-sub">Routing into 4 Isolated Bins</span>
          </div>
          <ArrowDown className="arch-arrow" size={20} />

          <div className="arch-chain-node verified">
            <span className="arch-step">07</span>
            <span className="arch-name">Digital Tracking</span>
            <span className="arch-sub">Cloud Synchronized Record</span>
          </div>
        </div>
      </section>

      {/* Four Solution Blocks */}
      <section className="solution-blocks-section">
        <h3 className="sub-section-title">The Four Core Functional Blocks</h3>

        <div className="four-blocks-grid">
          {/* Block 01: Detect */}
          <div className="solution-block-card">
            <div className="block-num-header">
              <span className="block-num">01</span>
              <Eye size={20} className="text-cyan" />
            </div>
            <h4 className="block-title">Detect</h4>
            <p className="block-body">
              Camera/vision concept identifies the waste object. As MediTrack reaches a designated collection
              waypoint, optical sensors capture visual stream to register item presence and bounding geometry.
            </p>
            <div className="block-tag-pill">LiDAR Proximity + Optical Camera</div>
          </div>

          {/* Block 02: Classify */}
          <div className="solution-block-card">
            <div className="block-num-header">
              <span className="block-num">02</span>
              <Sparkles size={20} className="text-purple" />
            </div>
            <h4 className="block-title">Classify</h4>
            <p className="block-body">
              AI classification simulation assigns a waste category. The system evaluates item characteristics
              against CPCB guidelines (Yellow, Red, White, Blue) with an associated confidence metric.
            </p>
            <div className="block-tag-pill">CPCB Schedule I Taxonomy</div>
          </div>

          {/* Block 03: Segregate */}
          <div className="solution-block-card">
            <div className="block-num-header">
              <span className="block-num">03</span>
              <Layers size={20} className="text-amber" />
            </div>
            <h4 className="block-title">Segregate</h4>
            <p className="block-body">
              The system selects the corresponding internal compartment. Actuators route the waste directly
              into its prescribed sealed chamber (White for Sharps, Yellow for Soiled, Red for Plastics).
            </p>
            <div className="block-tag-pill">4-Chamber Physical Isolation</div>
          </div>

          {/* Block 04: Track */}
          <div className="solution-block-card">
            <div className="block-num-header">
              <span className="block-num">04</span>
              <Database size={20} className="text-emerald" />
            </div>
            <h4 className="block-title">Track</h4>
            <p className="block-body">
              The event is recorded digitally with time, location, and category. Generates an unalterable electronic
              chain-of-custody entry, instantly visible to ward administrators and environmental compliance officers.
            </p>
            <div className="block-tag-pill">Immutable Electronic Telemetry</div>
          </div>
        </div>
      </section>

      {/* Large Engineering Flow Diagram */}
      <section className="large-engineering-flow-section">
        <div className="section-header-compact">
          <span className="section-super-title">LIFECYCLE PIPELINE</span>
          <h2 className="section-main-title">Sequential Engineering Flow</h2>
        </div>

        <div className="flow-diagram-wrapper">
          <div className="flow-badge-item">
            <span className="flow-seq-num">1</span>
            <span className="flow-seq-name">Waste Generated</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item">
            <span className="flow-seq-num">2</span>
            <span className="flow-seq-name">Waste Detected</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item">
            <span className="flow-seq-num">3</span>
            <span className="flow-seq-name">Classification</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item">
            <span className="flow-seq-num">4</span>
            <span className="flow-seq-name">Category Selected</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item">
            <span className="flow-seq-num">5</span>
            <span className="flow-seq-name">Collection</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item">
            <span className="flow-seq-num">6</span>
            <span className="flow-seq-name">Segregation</span>
          </div>
          <span className="seq-arrow">→</span>

          <div className="flow-badge-item highlight">
            <span className="flow-seq-num">7</span>
            <span className="flow-seq-name">Digital Record</span>
          </div>
        </div>
      </section>
    </div>
  );
};
