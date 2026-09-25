import React from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  Bot,
  Zap,
  Check,
  AlertCircle,
  FileCheck,
  Boxes,
} from 'lucide-react';
import { RESEARCH_SOURCES } from '../data/researchData';

export const FeasibilityPage: React.FC = () => {
  const lifecycleStages = [
    { title: 'IDEATION', status: 'completed' },
    { title: 'RESEARCH', status: 'completed' },
    { title: 'REQUIREMENTS', status: 'completed' },
    { title: 'CONCEPT SKETCH', status: 'completed' },
    { title: 'AUTODESK FUSION CAD', status: 'current' },
    { title: 'DIGITAL SIMULATION', status: 'current' },
    { title: 'PROTOTYPE', status: 'future' },
    { title: 'TESTING', status: 'future' },
    { title: 'MANUFACTURING', status: 'future' },
    { title: 'DEPLOYMENT', status: 'future' },
  ];

  const roadmapPhases = [
    {
      phase: 'PHASE 1',
      title: 'Digital Simulation & Software State Machine',
      status: 'Current Benchmark',
      isCurrent: true,
      points: [
        'Browser-based full-workflow demonstration.',
        'Deterministic state machine logic (NAVIGATING → DETECTING → CLASSIFYING → COLLECTING → SEGREGATING → TRACKING).',
        'Verification of CPCB 4-colour category segregation architecture.',
      ],
    },
    {
      phase: 'PHASE 2',
      title: 'Autodesk Fusion CAD & Parametric Packaging',
      status: 'In Progress',
      isCurrent: false,
      points: [
        'Detailed 3D parametric CAD modeling in Autodesk Fusion.',
        'Chassis structural FEA stress simulation for 25kg internal biohazard vault payload.',
        'Packaging envelope for BLDC planetary hub motors and 24V LiFePO4 battery pack.',
      ],
    },
    {
      phase: 'PHASE 3',
      title: 'Vision Model Integration & Edge Training',
      status: 'Future Implementation Option',
      isCurrent: false,
      points: [
        'Collection of standardized clinical disposables image dataset (syringes, tubing, dressings, vials).',
        'Quantization and benchmarking of lightweight edge models (e.g., MobileNetV3 / edge YOLO).',
        'Validation of safety thresholding: uncertain items (<60% confidence) held for human inspection.',
      ],
    },
    {
      phase: 'PHASE 4',
      title: 'Navigation & Sensor Hardware Stack',
      status: 'Future Implementation Option',
      isCurrent: false,
      points: [
        'Integration of 2D planar LiDAR for topological SLAM and corridor edge following.',
        'Ultrasonic / Time-of-Flight (ToF) sensors for low-profile obstacle detection and door threshold clearance.',
        'Passive RFID floor landmarks for precise ward bed position calibration.',
      ],
    },
    {
      phase: 'PHASE 5',
      title: 'Physical Prototype Mechatronics Fabrication',
      status: 'Future Implementation Option',
      isCurrent: false,
      points: [
        'Machining and additive manufacturing of antimicrobial IP54 polycarbonate chassis.',
        'Fabrication of servo-actuated 4-compartment distribution chutes.',
        'Bench testing of wireless induction charging efficiency and battery duty cycle.',
      ],
    },
    {
      phase: 'PHASE 6',
      title: 'Controlled Hospital Pilot & Clinical Validation',
      status: 'Future Implementation Option',
      isCurrent: false,
      points: [
        'Deployment in a non-critical hospital ward during scheduled low-traffic hours.',
        'Human-in-the-loop validation of segregation accuracy alongside sanitation orderlies.',
        'Electronic manifest integration with regional CBWTF treatment portals.',
      ],
    },
  ];

  return (
    <div className="page-view feasibility-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">TRANSLATIONAL ROADMAP &amp; LIFECYCLE</span>
        <h1 className="page-main-title">FEASIBILITY, ROADMAP &amp; IMPACT</h1>
        <p className="page-intro-paragraph">
          Evaluating technical viability, operational integration, and the complete product development
          lifecycle from concept simulation to physical hospital deployment.
        </p>
      </div>

      {/* PRODUCT DEVELOPMENT LIFECYCLE */}
      <section className="lifecycle-section">
        <div className="section-header-compact">
          <span className="section-super-title">PRODUCT DEVELOPMENT LIFECYCLE</span>
          <h2 className="section-main-title">From Concept to Hospital Deployment</h2>
          <p className="section-desc">
            Mapping our project across the standard engineering product commercialization stages:
          </p>
        </div>

        <div className="lifecycle-stepper-wrap">
          <div className="lifecycle-nodes-row">
            {lifecycleStages.map((stage, idx) => (
              <React.Fragment key={stage.title}>
                <div className={`lifecycle-node-box ${stage.status}`}>
                  <span className="node-idx">{idx + 1}</span>
                  <span className="node-title">{stage.title}</span>
                  {stage.status === 'completed' && <span className="node-status-tag done">Done</span>}
                  {stage.status === 'current' && <span className="node-status-tag active">Current Stage</span>}
                  {stage.status === 'future' && <span className="node-status-tag future">Future</span>}
                </div>
                {idx < lifecycleStages.length - 1 && <span className="life-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="lifecycle-highlight-banner">
            <CheckCircle2 size={18} className="text-cyan" />
            <span>
              <strong>CURRENT FOCUS:</strong> Autodesk Fusion CAD Modeling + Interactive Digital Simulation.
              Physical prototyping and manufacturing constitute scheduled future phases.
            </span>
          </div>
        </div>
      </section>

      {/* THREE FEASIBILITY PILLARS */}
      <section className="feasibility-pillars-section">
        <h3 className="sub-section-title">Feasibility Assessment</h3>

        <div className="feasibility-cards-grid">
          {/* Card 1: Technical */}
          <div className="feasibility-card">
            <div className="feas-header">
              <Cpu size={22} className="text-cyan" />
              <h4 className="feas-title">Technical Feasibility</h4>
            </div>
            <p className="feas-desc">
              Differential drive mobile robotics and edge AI computer vision are commercially mature technologies
              widely deployed in industrial logistics. Adapting these to an antimicrobial, compact clinical form factor
              with CPCB-compliant compartmentalization utilizes proven mechatronic components (BLDC motors, LiDAR,
              micro-controllers).
            </p>
            <div className="feas-pill">High Technical Maturity</div>
          </div>

          {/* Card 2: Operational */}
          <div className="feasibility-card">
            <div className="feas-header">
              <Bot size={22} className="text-emerald" />
              <h4 className="feas-title">Operational Feasibility</h4>
            </div>
            <p className="feas-desc">
              Healthcare corridors are strictly mapped indoor environments with predictable layouts. MediTrack
              navigates during pre-scheduled ward servicing windows at walking speeds (&lt;0.5 m/s), sharing corridors
              safely without disrupting medical emergencies or patient gurney transit.
            </p>
            <div className="feas-pill">Non-Disruptive Clinical Workflow</div>
          </div>

          {/* Card 3: Scalability */}
          <div className="feasibility-card">
            <div className="feas-header">
              <Boxes size={22} className="text-purple" />
              <h4 className="feas-title">Scalability</h4>
            </div>
            <p className="feas-desc">
              A single central telemetry server can coordinate multiple MediTrack units assigned to different hospital
              floors or wings. Modular internal compartments allow rapid detachment for centralized autoclave sterilization
              and immediate re-deployment.
            </p>
            <div className="feas-pill">Multi-Floor Fleet Extensibility</div>
          </div>
        </div>
      </section>

      {/* DESIGN REQUIREMENTS */}
      <section className="design-requirements-section">
        <h3 className="sub-section-title">Engineering Requirements Matrix</h3>

        <div className="requirements-split-grid">
          {/* Functional Requirements */}
          <div className="req-card">
            <h4 className="req-card-title">Functional Requirements</h4>
            <ul className="req-list">
              <li>
                <strong>Autonomous Indoor Movement Concept:</strong> Controlled transit along mapped topological corridor waypoints.
              </li>
              <li>
                <strong>Waste Detection:</strong> Proximity and visual registration of waste items at designated collection zones.
              </li>
              <li>
                <strong>Waste Classification:</strong> Identification of medical disposables into CPCB Yellow, Red, White, Blue categories.
              </li>
              <li>
                <strong>Category-Based Segregation:</strong> Automated routing into 4 isolated internal compartments.
              </li>
              <li>
                <strong>Battery-Powered Operation:</strong> Continuous scheduled mission runtime with wireless induction docking.
              </li>
              <li>
                <strong>Digital Event Tracking:</strong> Automated electronic serialization of timestamps, locations, and category tallies.
              </li>
            </ul>
          </div>

          {/* Non-Functional Requirements */}
          <div className="req-card">
            <h4 className="req-card-title">Non-Functional Requirements</h4>
            <ul className="req-list">
              <li>
                <strong>Safety:</strong> Obstacle avoidance, speed caps (&lt;0.5 m/s), and manual quarantine interlocks for uncertain items.
              </li>
              <li>
                <strong>Modularity:</strong> Detachable and autoclavable internal compartment bins for rapid turnover.
              </li>
              <li>
                <strong>Maintainability:</strong> Accessible electronics bay and standard non-proprietary LiFePO4 battery cells.
              </li>
              <li>
                <strong>Scalability:</strong> Centralized Wi-Fi/mesh telemetry supporting multi-unit fleet dispatch.
              </li>
              <li>
                <strong>Easy Cleaning:</strong> Smooth, seamless IP54 antimicrobial outer casing resistant to clinical disinfectants.
              </li>
              <li>
                <strong>Compact Hospital Navigation:</strong> Footprint tailored for tight ward doorways, elevators, and bedside clearances.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FUTURE DEVELOPMENT ROADMAP (6 PHASES) */}
      <section className="roadmap-section">
        <div className="section-header-compact">
          <span className="section-super-title">STRATEGIC PHASING</span>
          <h2 className="section-main-title">Future Development Roadmap</h2>
        </div>

        <div className="roadmap-grid">
          {roadmapPhases.map((phase) => (
            <div key={phase.phase} className={`roadmap-phase-card ${phase.isCurrent ? 'current-benchmark' : ''}`}>
              <div className="phase-card-top">
                <span className="phase-code">{phase.phase}</span>
                <span className={`phase-badge ${phase.isCurrent ? 'active' : ''}`}>{phase.status}</span>
              </div>
              <h4 className="phase-title">{phase.title}</h4>
              <ul className="phase-points-list">
                {phase.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT: CURRENT PROCESS VS MEDITRACK */}
      <section className="impact-section">
        <div className="section-header-compact">
          <span className="section-super-title">OBJECTIVE COMPARISON</span>
          <h2 className="section-main-title">Impact: Current Process vs. Proposed Concept</h2>
        </div>

        <div className="impact-comparison-table-wrapper">
          <table className="impact-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Dimension</th>
                <th style={{ width: '37.5%' }}>Conventional Manual Process</th>
                <th style={{ width: '37.5%' }}>MediTrack Proposed Concept</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Collection Method</strong></td>
                <td>Manual rounds by housekeeping personnel pushing open hand-carts.</td>
                <td>Autonomous scheduled mobile collection along pre-mapped hospital waypoints.</td>
              </tr>
              <tr>
                <td><strong>Direct Handling</strong></td>
                <td>Physical manual contact with bags and sharps disposal containers.</td>
                <td>Hands-free mechanical intake directly into internal sealed vaults.</td>
              </tr>
              <tr>
                <td><strong>Segregation Accuracy</strong></td>
                <td>Vulnerable to human error, cognitive fatigue, and rush during emergency care.</td>
                <td>Standardized visual verification against statutory CPCB categories.</td>
              </tr>
              <tr>
                <td><strong>Chain of Custody</strong></td>
                <td>Paper logbooks or retrospective batch barcode scans at basement depot.</td>
                <td>Instantaneous electronic time-stamped record at the exact point of pickup.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Factual Potential Benefits */}
        <div className="potential-benefits-card">
          <h4 className="benefits-title">Projected Potential Benefits (Factual Wording):</h4>
          <div className="benefits-tags-grid">
            <div className="benefit-item">
              <Check size={16} className="text-emerald" />
              <span>Reduced direct physical handling of hazardous disposables</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="text-emerald" />
              <span>Improved segregation consistency against CPCB Schedule I standards</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="text-emerald" />
              <span>Enhanced digital traceability and immutable audit timestamps</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="text-emerald" />
              <span>Increased operational visibility for hospital infection control committees</span>
            </div>
            <div className="benefit-item">
              <Check size={16} className="text-emerald" />
              <span>Scalable automation concept adaptable to multi-floor clinical complexes</span>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH REFERENCES CARDS */}
      <section className="research-references-section">
        <div className="section-header-compact">
          <span className="section-super-title">ACADEMIC &amp; STATUTORY CITATIONS</span>
          <h2 className="section-main-title">Primary Research References</h2>
        </div>

        <div className="references-grid">
          {RESEARCH_SOURCES.map((source) => (
            <div key={source.id} className="reference-citation-card">
              <div className="ref-top">
                <span className="ref-code">{source.code}</span>
                <span className="ref-year">{source.year}</span>
              </div>
              <h4 className="ref-title">{source.title}</h4>
              <span className="ref-author">{source.organization}</span>
              <p className="ref-relevance">
                <strong>Why it is relevant:</strong> {source.relevance}
              </p>
              <div className="ref-btn-wrap">
                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ref-source"
                >
                  <span>View Source</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
