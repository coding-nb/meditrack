import React from 'react';
import {
  Layers,
  Cpu,
  Bot,
  Database,
  ArrowDown,
  Activity,
  GitBranch,
  CheckCircle,
} from 'lucide-react';
import type { RobotState } from '../types';

interface ArchitecturePageProps {
  currentState?: RobotState;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({
  currentState = 'IDLE',
}) => {
  return (
    <div className="page-view architecture-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">SYSTEMS ENGINEERING DESIGN</span>
        <h1 className="page-main-title">SYSTEM ARCHITECTURE</h1>
        <p className="page-intro-paragraph">
          MediTrack is structured as a multi-tier cyber-physical architecture integrating physical mechatronics,
          onboard perception intelligence, and digital hospital telemetry.
        </p>
      </div>

      {/* Main High-Level Architecture Flow */}
      <section className="high-level-arch-section">
        <h3 className="sub-section-title">System Data &amp; Control Flow</h3>

        <div className="system-flow-card">
          <div className="arch-flow-node">
            <span className="node-tier">TOPOLOGY</span>
            <span className="node-head">Hospital Environment</span>
            <span className="node-body">Corridors, Patient Wards &amp; Docking Station</span>
          </div>

          <ArrowDown className="flow-arrow-down" size={24} />

          <div className="arch-flow-node highlight">
            <span className="node-tier">MOBILE PLATFORM</span>
            <span className="node-head">MediTrack Robot</span>
            <span className="node-body">Differential Drive AGV with 4 CPCB Bins</span>
          </div>

          <ArrowDown className="flow-arrow-down" size={24} />

          <div className="arch-embedded-subsystems-box">
            <span className="subsystems-heading">ONBOARD ROBOTIC SUBSYSTEMS</span>
            <div className="subsystems-grid">
              <div className="subsystem-pill">Navigation Engine</div>
              <div className="subsystem-pill">AI Vision Module</div>
              <div className="subsystem-pill">Intake Manipulator</div>
              <div className="subsystem-pill">4-Chamber Vault</div>
              <div className="subsystem-pill">Battery &amp; Power BMS</div>
            </div>
          </div>

          <ArrowDown className="flow-arrow-down" size={24} />

          <div className="arch-flow-node">
            <span className="node-tier">TELEMETRY LAYER</span>
            <span className="node-head">Digital Tracking</span>
            <span className="node-body">Immutable Event Ledger &amp; Chain-of-Custody</span>
          </div>

          <ArrowDown className="flow-arrow-down" size={24} />

          <div className="arch-flow-node verified">
            <span className="node-tier">ADMINISTRATION</span>
            <span className="node-head">Central Operations Dashboard</span>
            <span className="node-body">Real-Time Hospital Audit &amp; CBWTF Compliance</span>
          </div>
        </div>
      </section>

      {/* THREE-LAYER ARCHITECTURE */}
      <section className="three-layer-section">
        <h3 className="sub-section-title">Three-Layer Cyber-Physical Architecture</h3>
        <p className="sub-section-desc">
          Separation of physical actuation, algorithmic intelligence, and digital records:
        </p>

        <div className="three-layers-grid">
          {/* Layer 1: Physical */}
          <div className="layer-card layer-1">
            <div className="layer-badge-header">
              <span className="layer-num">LAYER 1</span>
              <span className="layer-name">PHYSICAL LAYER</span>
            </div>
            <p className="layer-lead">Mechatronic hardware, sensors, chassis, and biohazard isolation.</p>
            <div className="layer-elements-list">
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Chassis &amp; Mechanical Frame (IP54)</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Optical Camera &amp; 2D LiDAR Rangefinder</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Differential Dual BLDC Motors + Casters</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">24V 20Ah LiFePO4 Battery + Induction Coil</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Four CPCB Internal Compartments (Y, R, W, B)</span>
              </div>
            </div>
          </div>

          {/* Layer 2: Intelligence */}
          <div className="layer-card layer-2">
            <div className="layer-badge-header">
              <span className="layer-num">LAYER 2</span>
              <span className="layer-name">INTELLIGENCE LAYER</span>
            </div>
            <p className="layer-lead">Perception, categorization logic, navigation graph, and state sequencing.</p>
            <div className="layer-elements-list">
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Optical Object Acquisition &amp; Reticle Centering</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">AI Classification Simulation (CPCB Schedule I)</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Topological Waypoint Path Navigation</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Finite State Machine (FSM) Supervisor</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Safety Watchdog &amp; Quarantine Interlocks</span>
              </div>
            </div>
          </div>

          {/* Layer 3: Digital */}
          <div className="layer-card layer-3">
            <div className="layer-badge-header">
              <span className="layer-num">LAYER 3</span>
              <span className="layer-name">DIGITAL LAYER</span>
            </div>
            <p className="layer-lead">Audit trail, telemetry serialization, cloud syncing, and compliance analytics.</p>
            <div className="layer-elements-list">
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Real-Time Event Logging &amp; Time Stamping</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Chain-of-Custody Digital Tracking Records</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Live Operations Telemetry Dashboard</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Statutory CPCB Compliance Analytics</span>
              </div>
              <div className="layer-elem">
                <span className="elem-bullet" />
                <span className="elem-name">Automated CBWTF Manifest Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROBOT STATE MACHINE VISUAL DIAGRAM */}
      <section className="state-machine-section">
        <div className="section-header-compact">
          <span className="section-super-title">DETERMINISTIC CONTROL LOGIC</span>
          <h2 className="section-main-title">Finite State Machine (FSM) Diagram</h2>
          <p className="section-desc">
            Visualizing the exact deterministic transitions executed by MediTrack's embedded controller:
          </p>
        </div>

        <div className="state-machine-flow-card">
          <div className="fsm-nodes-flow">
            {/* IDLE */}
            <div className={`fsm-node ${currentState === 'IDLE' ? 'current-active' : ''}`}>
              <span className="fsm-title">IDLE</span>
              <span className="fsm-sub">Docked on Induction Pad</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* NAVIGATING */}
            <div className={`fsm-node ${currentState === 'NAVIGATING' ? 'current-active' : ''}`}>
              <span className="fsm-title">NAVIGATING</span>
              <span className="fsm-sub">Waypoint Graph Motion</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* DETECTING */}
            <div className={`fsm-node ${currentState === 'DETECTING' ? 'current-active' : ''}`}>
              <span className="fsm-title">DETECTING</span>
              <span className="fsm-sub">Optical Proximity Acquisition</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* CLASSIFYING */}
            <div className={`fsm-node ${currentState === 'CLASSIFYING' ? 'current-active' : ''}`}>
              <span className="fsm-title">CLASSIFYING</span>
              <span className="fsm-sub">AI Simulation &amp; CPCB Match</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* COLLECTING */}
            <div className={`fsm-node ${currentState === 'COLLECTING' ? 'current-active' : ''}`}>
              <span className="fsm-title">COLLECTING</span>
              <span className="fsm-sub">Contactless Suction Intake</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* SEGREGATING */}
            <div className={`fsm-node ${currentState === 'SEGREGATING' ? 'current-active' : ''}`}>
              <span className="fsm-title">SEGREGATING</span>
              <span className="fsm-sub">Servo Gate to Y/R/W/B Bin</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* TRACKING */}
            <div className={`fsm-node ${currentState === 'TRACKING' ? 'current-active' : ''}`}>
              <span className="fsm-title">TRACKING</span>
              <span className="fsm-sub">Digital Record Serialized</span>
            </div>
            <ArrowDown className="fsm-arrow" size={20} />

            {/* Decision Branch */}
            <div className="fsm-decision-branch">
              <span className="decision-label">NEXT WASTE IN SCHEDULE?</span>
              <div className="branch-routes-row">
                <div className="branch-col">
                  <span className="branch-tag yes">YES</span>
                  <ArrowDown size={16} />
                  <div className="branch-pill">Loop: Next Room Waypoint</div>
                </div>
                <div className="branch-col">
                  <span className="branch-tag no">NO</span>
                  <ArrowDown size={16} />
                  <div className={`fsm-node ${currentState === 'RETURNING' ? 'current-active' : ''}`}>
                    <span className="fsm-title">RETURNING</span>
                    <span className="fsm-sub">Return to Charging Station</span>
                  </div>
                  <ArrowDown size={16} />
                  <div className={`fsm-node ${currentState === 'COMPLETED' ? 'current-active' : ''}`}>
                    <span className="fsm-title">COMPLETED</span>
                    <span className="fsm-sub">Mission Audited &amp; Recharging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
