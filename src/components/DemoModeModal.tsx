import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  AlertTriangle,
  Bot,
  Scan,
  Cpu,
  PackagePlus,
  Layers,
  Database,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSimulation: () => void;
}

interface DemoStep {
  stepNumber: string;
  tag: string;
  title: string;
  icon: React.ElementType;
  heading: string;
  summary: string;
  keyDetails: string[];
  engineeringInsight: string;
  cpcbNote?: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: '01',
    tag: 'Problem & Baseline',
    title: 'The Problem: Manual Exposure & Segregation Failure',
    icon: AlertTriangle,
    heading: 'Why Automation is Required in Biomedical Waste Logistics',
    summary:
      'WHO reports 15% of healthcare waste is hazardous. In conventional setups, healthcare personnel and sanitation workers manually collect, segregate, and carry biohazard bags, exposing staff to sharps injuries (needlesticks) and cross-contamination.',
    keyDetails: [
      'Manual segregation at bedside is prone to human error and fatigue.',
      'Sharps (needles, scalpels) account for the highest occupational infection risk.',
      'Manual logbooks lead to paper-based discrepancies and delayed audits.',
    ],
    engineeringInsight:
      'Engineering Objective: Replace high-risk manual trolley rounds with an autonomous mobile indoor platform with closed compartments.',
  },
  {
    stepNumber: '02',
    tag: 'Navigation & Detection',
    title: 'Detect: Proximity & Visual Acquisition',
    icon: Scan,
    heading: 'Waypoint Navigation & Sensor Detection Protocol',
    summary:
      'The MediTrack AGV navigates scheduled routes along predefined corridor topological waypoints. When it approaches a designated collection zone (e.g., Room 1 Trauma bed), proximity sensors and optical sensors trigger the detection loop.',
    keyDetails: [
      'Predefined indoor waypoints eliminate unpredictable trajectories.',
      'Optical field-of-view acquisition centers the waste item in the target reticle.',
      'Status switches from NAVIGATING to DETECTING.',
    ],
    engineeringInsight:
      'Simulation Label: Waypoint Navigation Simulation. In future physical phases, 2D LiDAR + depth cameras will provide SLAM and dynamic obstacle avoidance.',
  },
  {
    stepNumber: '03',
    tag: 'Classification',
    title: 'Classify: AI-Assisted Waste Identification',
    icon: Cpu,
    heading: 'Synthetic Neural Vision Inference & CPCB Mapping',
    summary:
      'The optical input is analyzed to recognize geometry (e.g., syringe barrel, gauze weave, infusion bottle). The system matches the item against the statutory CPCB 4-colour schedule and computes a confidence score.',
    keyDetails: [
      'Syringe → Classified as WHITE (Waste Sharps) with 96% confidence.',
      'Soiled Dressing → Classified as YELLOW (Soiled Waste) with 94% confidence.',
      'Uncertain items (<60% confidence) trigger an edge-case hold requiring manual verification.',
    ],
    engineeringInsight:
      'Label: AI Classification Simulation. Physical production would deploy lightweight edge vision models (e.g., MobileNet/YOLO) trained on biohazard disposable datasets.',
    cpcbNote: 'Strict adherence to CPCB Schedule I color taxonomy ensures zero regulatory divergence.',
  },
  {
    stepNumber: '04',
    tag: 'Collection',
    title: 'Collect: Mechanical Intake & Isolation',
    icon: PackagePlus,
    heading: 'Hands-Free Collection Mechanism',
    summary:
      'Once verified, the robot activates its collection mechanism (simulated suction/manipulator arm). The item is drawn cleanly into the internal transfer manifold without human hands contacting the contaminated material.',
    keyDetails: [
      'Contactless pickup mitigates needlestick punctures and splatter.',
      'Intake beam seals automatically once the item passes optical transit gates.',
      'State transitions to COLLECTING.',
    ],
    engineeringInsight:
      'Engineering Principle: Isolation at point of pickup minimizes aerosol generation and fluid leakage during transit.',
  },
  {
    stepNumber: '05',
    tag: 'Segregation',
    title: 'Segregate: 4-Compartment Internal Routing',
    icon: Layers,
    heading: 'Multi-Chamber CPCB Segregation Vault',
    summary:
      'The MediTrack chassis houses four isolated internal compartments: Yellow (Soiled), Red (Contaminated Recyclable), White (Sharps), and Blue (Glassware). An internal servo gate routes the waste strictly into its prescribed bin.',
    keyDetails: [
      'Syringe enters the Puncture-Proof WHITE Sharps compartment.',
      'Soiled dressings route directly to the sealed YELLOW bin.',
      'Contaminated plastic bottles deposit into the RED compartment.',
      'Prevents inter-stream mixing that invalidates downstream recycling or incineration.',
    ],
    engineeringInsight:
      'Mechanical Modularity: Compartments are individually removable, autoclavable, and fitted with level-detection sensors.',
  },
  {
    stepNumber: '06',
    tag: 'Digital Tracking',
    title: 'Track: Immutable Telemetry & Audit Trail',
    icon: Database,
    heading: 'Real-Time Digital Traceability Chain',
    summary:
      'Simultaneously with segregation, a digital record is generated containing the timestamp, exact room coordinate, item type, CPCB category, and robot ID. This data synchronizes to the central hospital dashboard.',
    keyDetails: [
      'Automatic tally increments for Yellow, Red, White, and Blue categories.',
      'Chain-of-custody established from ward room to central bio-hazard depot.',
      'Eliminates manual clipboard discrepancies and enables statutory compliance reports.',
    ],
    engineeringInsight:
      'Traceability Flow: Detection → Classification → Collection → Segregation → Timestamp → Location → Category → Digital Record.',
  },
  {
    stepNumber: '07',
    tag: 'Mission Complete',
    title: 'Complete: Return to Base & Auto-Docking',
    icon: CheckCircle2,
    heading: 'Mission Verification & Automated Recharge',
    summary:
      'After clearing all scheduled ward waypoints, MediTrack returns to the charging station dock. Compartments lock until authorized depot unloading, and batteries recharge via inductive base pads.',
    keyDetails: [
      'All collected waste accounted for on the live dashboard.',
      'Status transitions from RETURNING to COMPLETED.',
      'Continuous readiness for next scheduled sanitization round.',
    ],
    engineeringInsight:
      'Lifecycle Stage: Current digital simulation verifies the end-to-end logic. Next phases integrate Autodesk Fusion CAD into hardware testing.',
  },
];

export const DemoModeModal: React.FC<DemoModeModalProps> = ({
  isOpen,
  onClose,
  onJumpToSimulation,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (autoPlay && isOpen) {
      timer = window.setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= DEMO_STEPS.length - 1) {
            setAutoPlay(false);
            return prev;
          }
          return prev + 1;
        });
      }, 10000); // 10 seconds per slide for 70 sec presentation
    }
    return () => clearInterval(timer);
  }, [autoPlay, isOpen]);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIdx];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIdx < DEMO_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div className="demo-modal-overlay">
      <div className="demo-modal-container">
        {/* Modal Top Header */}
        <div className="demo-modal-header">
          <div className="demo-header-info">
            <span className="demo-pill-badge">HACKATHON JUDGES PRESENTATION</span>
            <h2 className="demo-modal-title">MEDiTRACK Guided Concept Flow (60–90s Pitch)</h2>
          </div>
          <div className="demo-header-controls">
            <button
              className={`btn-autoplay ${autoPlay ? 'active' : ''}`}
              onClick={() => setAutoPlay(!autoPlay)}
              title="Auto-advance slides every 10 seconds"
            >
              {autoPlay ? <Pause size={14} /> : <Play size={14} />}
              <span>{autoPlay ? 'Auto-Advancing (10s)' : 'Auto-Play'}</span>
            </button>
            <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 7-Step Progress Stepper */}
        <div className="demo-stepper-bar">
          {DEMO_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              className={`stepper-node ${idx === currentStepIdx ? 'active' : ''} ${
                idx < currentStepIdx ? 'completed' : ''
              }`}
              onClick={() => setCurrentStepIdx(idx)}
            >
              <span className="node-num">{step.stepNumber}</span>
              <span className="node-tag">{step.tag}</span>
            </button>
          ))}
        </div>

        {/* Main Step Content Card */}
        <div className="demo-card-body">
          <div className="demo-step-masthead">
            <div className="step-icon-orb">
              <StepIcon size={26} />
            </div>
            <div>
              <div className="step-stage-row">
                <span className="step-label">STAGE {currentStep.stepNumber} OF 07</span>
                <span className="step-dot">•</span>
                <span className="step-tag-text">{currentStep.tag}</span>
              </div>
              <h3 className="step-title-text">{currentStep.title}</h3>
            </div>
          </div>

          <div className="demo-content-grid">
            {/* Left Column: Summary and Core Points */}
            <div className="demo-left-column">
              <h4 className="section-subheading">{currentStep.heading}</h4>
              <p className="step-summary-paragraph">{currentStep.summary}</p>

              <div className="key-details-list">
                <span className="list-title">Key Demonstrable Points:</span>
                <ul>
                  {currentStep.keyDetails.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>

              {currentStep.cpcbNote && (
                <div className="cpcb-compliance-pill">
                  <span className="pill-title">CPCB COMPLIANCE:</span>
                  <span>{currentStep.cpcbNote}</span>
                </div>
              )}
            </div>

            {/* Right Column: Engineering Insight Box */}
            <div className="demo-right-column">
              <div className="engineering-box">
                <span className="eng-badge">ENGINEERING &amp; SIMULATION RIGOR</span>
                <p className="eng-text">{currentStep.engineeringInsight}</p>
              </div>

              <div className="pitch-tip-card">
                <span className="tip-title">Presentation Tip for Judges:</span>
                <p className="tip-text">
                  Emphasize that this is an engineering proof-of-concept demonstrating the complete digital workflow
                  ahead of capital-intensive physical robotics fabrication.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Stepper Controls & Jump */}
        <div className="demo-modal-footer">
          <div className="footer-left">
            <button
              className="btn-step-nav"
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              className="btn-step-nav primary"
              onClick={handleNext}
              disabled={currentStepIdx === DEMO_STEPS.length - 1}
            >
              <span>Next Stage</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="footer-center">
            <span className="step-indicator-text">
              Step {currentStepIdx + 1} of {DEMO_STEPS.length}
            </span>
          </div>

          <div className="footer-right">
            <button
              className="btn-jump-live"
              onClick={() => {
                onClose();
                onJumpToSimulation();
              }}
            >
              <ExternalLink size={15} />
              <span>Launch Live End-to-End Simulation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
