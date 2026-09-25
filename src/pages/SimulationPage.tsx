import React, { useState, useRef, useCallback } from 'react';
import type {
  RobotState,
  WasteItem,
  CompartmentTally,
  SimulationEvent,
} from '../types';
import {
  SIMULATION_WASTE_ITEMS,
  OPTIONAL_BLUE_WASTE,
  UNKNOWN_EDGE_CASE_ITEM,
  DOCK_COORDINATES,
  INITIAL_BATTERY_LEVEL,
} from '../data/simulationData';
import { HospitalMap } from '../components/HospitalMap';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Crosshair,
  AlertTriangle,
  Battery,
  MapPin,
  Activity,
  Layers,
  CheckCircle2,
  PackagePlus,
  Clock,
  Gauge,
  HelpCircle,
} from 'lucide-react';

export const SimulationPage: React.FC = () => {
  // State machine
  const [robotState, setRobotState] = useState<RobotState>('IDLE');
  const [robotPos, setRobotPos] = useState({ ...DOCK_COORDINATES });
  const [battery, setBattery] = useState(INITIAL_BATTERY_LEVEL);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    ...SIMULATION_WASTE_ITEMS,
    OPTIONAL_BLUE_WASTE,
  ]);
  const [compartments, setCompartments] = useState<CompartmentTally>({
    yellow: 0,
    red: 0,
    white: 0,
    blue: 0,
  });
  const [currentTargetWasteId, setCurrentTargetWasteId] = useState<string | undefined>();
  const [detectedItem, setDetectedItem] = useState<WasteItem | null>(null);
  const [currentLocationName, setCurrentLocationName] = useState('Charging Dock A-01');
  const [pipelineStage, setPipelineStage] = useState<string | null>(null);

  // Edge case mode toggle
  const [includeEdgeCase, setIncludeEdgeCase] = useState(false);

  // Simulation controls
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Event Log
  const [events, setEvents] = useState<SimulationEvent[]>([
    {
      id: 'ev-init',
      timestamp: '10:00:00',
      eventType: 'IDLE',
      message: 'MediTrack autonomous system initialized on Docking Bay A-01 induction pad',
      location: 'Charging Dock A-01',
    },
  ]);

  const eventLogEndRef = useRef<HTMLDivElement>(null);
  const simStepRef = useRef(0);
  const timeoutIdRef = useRef<number | null>(null);
  const isPausedRef = useRef(isPaused);
  const speedRef = useRef(speedMultiplier);

  isPausedRef.current = isPaused;
  speedRef.current = speedMultiplier;

  // Add event helper
  const addEvent = useCallback(
    (message: string, state: RobotState | 'ERROR', loc: string, cat?: any, name?: string) => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setEvents((prev) => [
        ...prev,
        {
          id: `ev-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          eventType: state,
          message,
          location: loc,
          wasteCategory: cat,
          wasteName: name,
        },
      ]);
    },
    []
  );

  // Reset
  const handleReset = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    simStepRef.current = 0;
    setIsRunning(false);
    setIsPaused(false);
    setRobotState('IDLE');
    setRobotPos({ ...DOCK_COORDINATES });
    setBattery(INITIAL_BATTERY_LEVEL);
    setWasteItems([...SIMULATION_WASTE_ITEMS, OPTIONAL_BLUE_WASTE]);
    setCompartments({ yellow: 0, red: 0, white: 0, blue: 0 });
    setCurrentTargetWasteId(undefined);
    setDetectedItem(null);
    setPipelineStage(null);
    setCurrentLocationName('Charging Dock A-01');
    addEvent('System reset. Robot stationed at Charging Dock A-01.', 'IDLE', 'Docking Bay A-01');
  }, [addEvent]);

  // Simulation Sequence Definition
  interface SimStep {
    duration: number;
    action: () => void;
  }

  const getSequence = useCallback((): SimStep[] => {
    const steps: SimStep[] = [
      // 0. Depart dock
      {
        duration: 1200,
        action: () => {
          setRobotState('NAVIGATING');
          setCurrentLocationName('Dock Exit / West Corridor');
          addEvent('Robot started mission — leaving charging dock', 'NAVIGATING', 'Dock Exit');
        },
      },
      // 1. Enter main corridor junction
      {
        duration: 1500,
        action: () => {
          setRobotPos({ x: 110, y: 305, rotation: -90 });
          setCurrentLocationName('Main Logistics Corridor (West)');
          setBattery(97);
        },
      },
      // 2. Approach Room 1
      {
        duration: 1600,
        action: () => {
          setRobotPos({ x: 300, y: 305, rotation: 0 });
          setCurrentLocationName('Corridor - Room 1 Entrance');
          addEvent('Reached Room 1 (Trauma & Triage)', 'NAVIGATING', 'Room 1 Entrance');
        },
      },
      // 3. Enter Room 1 to Syringe
      {
        duration: 1500,
        action: () => {
          setRobotPos({ x: 300, y: 185, rotation: -90 });
          setCurrentLocationName('Room 1 (Trauma & Triage)');
          setCurrentTargetWasteId('waste-syringe');
        },
      },
      // 4. DETECT Syringe
      {
        duration: 1600,
        action: () => {
          setRobotState('DETECTING');
          setPipelineStage('OBJECT DETECTED');
          const item = SIMULATION_WASTE_ITEMS[0];
          setDetectedItem(item);
          addEvent(`Waste detected: ${item.name}`, 'DETECTING', 'Room 1', item.cpcbCategory, item.name);
        },
      },
      // 5. CLASSIFY Syringe -> WHITE (Sharps)
      {
        duration: 1800,
        action: () => {
          setRobotState('CLASSIFYING');
          setPipelineStage('AI CLASSIFICATION & CPCB SELECTION');
          const item = SIMULATION_WASTE_ITEMS[0];
          addEvent(`Classified as: ${item.categoryLabel} (Confidence: ${item.simulatedConfidence}%)`, 'CLASSIFYING', 'Room 1', item.cpcbCategory);
        },
      },
      // 6. COLLECT Syringe
      {
        duration: 1600,
        action: () => {
          setRobotState('COLLECTING');
          setPipelineStage('COLLECT');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-syringe' ? { ...w, beingCollected: true } : w))
          );
          addEvent('Waste collected: Syringe routed to internal intake', 'COLLECTING', 'Room 1');
        },
      },
      // 7. SEGREGATE into White Compartment
      {
        duration: 1600,
        action: () => {
          setRobotState('SEGREGATING');
          setPipelineStage('SEGREGATE');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-syringe' ? { ...w, collected: true, beingCollected: false } : w))
          );
          setCompartments((prev) => ({ ...prev, white: prev.white + 1 }));
          setBattery(96);
          addEvent('Waste segregated: Deposited into WHITE (Sharps) compartment', 'SEGREGATING', 'Room 1', 'WHITE');
        },
      },
      // 8. TRACKING Syringe
      {
        duration: 1200,
        action: () => {
          setRobotState('TRACKING');
          setPipelineStage('DIGITAL RECORD UPDATED');
          addEvent('Digital record updated: Item #01 [WHITE - Sharps] logged to telemetry database', 'TRACKING', 'Room 1');
        },
      },
      // 9. Exit Room 1
      {
        duration: 1600,
        action: () => {
          setRobotState('NAVIGATING');
          setPipelineStage(null);
          setCurrentTargetWasteId(undefined);
          setDetectedItem(null);
          setRobotPos({ x: 300, y: 305, rotation: 90 });
          setCurrentLocationName('Corridor - Central Sector');
        },
      },
      // 10. Approach Room 2
      {
        duration: 1600,
        action: () => {
          setRobotPos({ x: 550, y: 305, rotation: 0 });
          setCurrentLocationName('Corridor - Room 2 Entrance');
          addEvent('Reached Room 2 (Wound Dressing Ward)', 'NAVIGATING', 'Room 2 Entrance');
        },
      },
      // 11. Enter Room 2 to Used Dressing
      {
        duration: 1500,
        action: () => {
          setRobotPos({ x: 550, y: 185, rotation: -90 });
          setCurrentLocationName('Room 2 (Wound Dressing Ward)');
          setCurrentTargetWasteId('waste-dressing');
        },
      },
      // 12. DETECT Dressing
      {
        duration: 1600,
        action: () => {
          setRobotState('DETECTING');
          setPipelineStage('OBJECT DETECTED');
          const item = SIMULATION_WASTE_ITEMS[1];
          setDetectedItem(item);
          addEvent(`Waste detected: ${item.name}`, 'DETECTING', 'Room 2', item.cpcbCategory, item.name);
        },
      },
      // 13. CLASSIFY Dressing -> YELLOW (Soiled)
      {
        duration: 1800,
        action: () => {
          setRobotState('CLASSIFYING');
          setPipelineStage('AI CLASSIFICATION & CPCB SELECTION');
          const item = SIMULATION_WASTE_ITEMS[1];
          addEvent(`Classified as: ${item.categoryLabel} (Confidence: ${item.simulatedConfidence}%)`, 'CLASSIFYING', 'Room 2', item.cpcbCategory);
        },
      },
      // 14. COLLECT Dressing
      {
        duration: 1600,
        action: () => {
          setRobotState('COLLECTING');
          setPipelineStage('COLLECT');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-dressing' ? { ...w, beingCollected: true } : w))
          );
          addEvent('Waste collected: Soiled Dressing drawn into manifold', 'COLLECTING', 'Room 2');
        },
      },
      // 15. SEGREGATE Dressing into Yellow
      {
        duration: 1600,
        action: () => {
          setRobotState('SEGREGATING');
          setPipelineStage('SEGREGATE');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-dressing' ? { ...w, collected: true, beingCollected: false } : w))
          );
          setCompartments((prev) => ({ ...prev, yellow: prev.yellow + 1 }));
          setBattery(94);
          addEvent('Waste segregated: Sealed into YELLOW (Soiled Waste) compartment', 'SEGREGATING', 'Room 2', 'YELLOW');
        },
      },
      // 16. TRACKING Dressing
      {
        duration: 1200,
        action: () => {
          setRobotState('TRACKING');
          setPipelineStage('DIGITAL RECORD UPDATED');
          addEvent('Digital record updated: Item #02 [YELLOW - Soiled] logged to telemetry database', 'TRACKING', 'Room 2');
        },
      },
      // 17. Exit Room 2
      {
        duration: 1600,
        action: () => {
          setRobotState('NAVIGATING');
          setPipelineStage(null);
          setCurrentTargetWasteId(undefined);
          setDetectedItem(null);
          setRobotPos({ x: 550, y: 305, rotation: 90 });
          setCurrentLocationName('Corridor - East Sector');
        },
      },
      // 18. Approach Room 3
      {
        duration: 1600,
        action: () => {
          setRobotPos({ x: 780, y: 305, rotation: 0 });
          setCurrentLocationName('Corridor - Room 3 Entrance');
          addEvent('Reached Room 3 (Pharmacy & Dispensary)', 'NAVIGATING', 'Room 3 Entrance');
        },
      },
      // 19. Enter Room 3 to Contaminated Plastic
      {
        duration: 1500,
        action: () => {
          setRobotPos({ x: 780, y: 185, rotation: -90 });
          setCurrentLocationName('Room 3 (Pharmacy & Dispensary)');
          setCurrentTargetWasteId('waste-plastic');
        },
      },
      // 20. DETECT Plastic
      {
        duration: 1600,
        action: () => {
          setRobotState('DETECTING');
          setPipelineStage('OBJECT DETECTED');
          const item = SIMULATION_WASTE_ITEMS[2];
          setDetectedItem(item);
          addEvent(`Waste detected: ${item.name}`, 'DETECTING', 'Room 3', item.cpcbCategory, item.name);
        },
      },
      // 21. CLASSIFY Plastic -> RED (Recyclable)
      {
        duration: 1800,
        action: () => {
          setRobotState('CLASSIFYING');
          setPipelineStage('AI CLASSIFICATION & CPCB SELECTION');
          const item = SIMULATION_WASTE_ITEMS[2];
          addEvent(`Classified as: ${item.categoryLabel} (Confidence: ${item.simulatedConfidence}%)`, 'CLASSIFYING', 'Room 3', item.cpcbCategory);
        },
      },
      // 22. COLLECT Plastic
      {
        duration: 1600,
        action: () => {
          setRobotState('COLLECTING');
          setPipelineStage('COLLECT');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-plastic' ? { ...w, beingCollected: true } : w))
          );
          addEvent('Waste collected: Saline bottle drawn into intake', 'COLLECTING', 'Room 3');
        },
      },
      // 23. SEGREGATE Plastic into Red
      {
        duration: 1600,
        action: () => {
          setRobotState('SEGREGATING');
          setPipelineStage('SEGREGATE');
          setWasteItems((prev) =>
            prev.map((w) => (w.id === 'waste-plastic' ? { ...w, collected: true, beingCollected: false } : w))
          );
          setCompartments((prev) => ({ ...prev, red: prev.red + 1 }));
          setBattery(93);
          addEvent('Waste segregated: Deposited into RED (Recyclable Plastic) compartment', 'SEGREGATING', 'Room 3', 'RED');
        },
      },
      // 24. TRACKING Plastic
      {
        duration: 1200,
        action: () => {
          setRobotState('TRACKING');
          setPipelineStage('DIGITAL RECORD UPDATED');
          addEvent('Digital record updated: Item #03 [RED - Recyclable] logged to telemetry database', 'TRACKING', 'Room 3');
        },
      },
      // 25. Exit Room 3
      {
        duration: 1600,
        action: () => {
          setRobotState('NAVIGATING');
          setPipelineStage(null);
          setCurrentTargetWasteId(undefined);
          setDetectedItem(null);
          setRobotPos({ x: 780, y: 305, rotation: 90 });
          setCurrentLocationName('Corridor - Room 3 Exit');
        },
      },
      // 26. RETURNING back westbound
      {
        duration: 2200,
        action: () => {
          setRobotState('RETURNING');
          setRobotPos({ x: 110, y: 305, rotation: 180 });
          setCurrentLocationName('Main Logistics Corridor (Westbound Return)');
          addEvent('Commencing return transit to Charging Dock A-01', 'RETURNING', 'Main Corridor');
        },
      },
      // 27. Dock entrance
      {
        duration: 1800,
        action: () => {
          setRobotPos({ x: 110, y: 460, rotation: 90 });
          setCurrentLocationName('Charging Dock A-01 (Docked)');
          addEvent('Reached Charging Dock A-01. Engaging wireless induction pads.', 'RETURNING', 'Dock A-01');
        },
      },
      // 28. Mission Completed
      {
        duration: 900,
        action: () => {
          setRobotPos({ x: 110, y: 460, rotation: 0 });
          setRobotState('COMPLETED');
          setIsRunning(false);
          setIsPaused(false);
          setBattery(95);
          addEvent('Collection Completed: 3 of 3 scheduled waste items segregated and digitally audited.', 'COMPLETED', 'Dock A-01');
        },
      },
    ]);

  return steps;
}, [addEvent]);

// Step sequencer
const executeSequenceStep = useCallback((stepIdx: number) => {
  const sequence = getSequence();
  if (stepIdx >= sequence.length) {
    setIsRunning(false);
    return;
  }

  simStepRef.current = stepIdx;
  const currentStep = sequence[stepIdx];
  currentStep.action();

  const scaledDuration = Math.max(180, currentStep.duration / speedRef.current);

  timeoutIdRef.current = window.setTimeout(() => {
    if (!isPausedRef.current) {
      executeSequenceStep(stepIdx + 1);
    }
  }, scaledDuration);
}, [getSequence]);

// Controls
const handleStart = () => {
  if (robotState === 'COMPLETED') {
    handleReset();
    setTimeout(() => {
      setIsRunning(true);
      setIsPaused(false);
      executeSequenceStep(0);
    }, 100);
    return;
  }
  setIsRunning(true);
  setIsPaused(false);
  executeSequenceStep(simStepRef.current);
};

const handlePause = () => {
  if (timeoutIdRef.current) {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
  }
  setIsPaused(true);
  addEvent('Simulation paused by operator for inspection', robotState, currentLocationName);
};

const handleResume = () => {
  setIsPaused(false);
  addEvent('Simulation resumed', robotState, currentLocationName);
  executeSequenceStep(simStepRef.current + 1);
};

const totalCollected = compartments.yellow + compartments.red + compartments.white + compartments.blue;

return (
  <div className="simulation-room">
    {/* Simulation Header Bar */}
    <div className="sim-masthead-bar">
      <div className="sim-title-group">
        <div className="sim-orb">
          <Activity size={22} className="text-cyan" />
        </div>
        <div>
          <div className="sim-h1-row">
            <h1 className="sim-title">MEDiTRACK LIVE SIMULATION</h1>
            <span className="sim-badge-mode">SIMULATION MODE • WAYPOINT NAVIGATION</span>
          </div>
          <p className="sim-subtitle">
            Interactive end-to-end demonstration: Waypoint Navigation → AI Classification Simulation → CPCB Segregation → Digital Traceability
          </p>
        </div>
      </div>

      {/* Current State Status Banner */}
      <div className={`sim-state-banner state-${robotState.toLowerCase()}`}>
        <span className="state-pulse-dot" />
        <div className="state-label-wrap">
          <span className="state-sub">ROBOT STATE MACHINE</span>
          <span className="state-name">{robotState}</span>
        </div>
      </div>
    </div>

    {/* Main 2-Column Split: Hospital Map (Left) + Telemetry & AI Vision (Right) */}
    <div className="sim-stage-grid">
      {/* LEFT COLUMN: Top-down Hospital Corridor SVG */}
      <div className="sim-left-column">
        <HospitalMap
          robotPos={robotPos}
          robotState={robotState}
          battery={battery}
          compartments={compartments}
          wasteItems={wasteItems}
          currentTargetWasteId={currentTargetWasteId}
          currentLocationName={currentLocationName}
        />
      </div>

      {/* RIGHT COLUMN: Robot Status + AI Classification Panel */}
      <div className="sim-right-column">
        {/* Quick Metrics Bar */}
        <div className="sim-kpi-bar">
          <div className="kpi-mini-pill">
            <MapPin size={15} className="text-cyan" />
            <div>
              <span className="kpi-k">ZONE</span>
              <span className="kpi-v">{currentLocationName}</span>
            </div>
          </div>
          <div className="kpi-mini-pill">
            <Battery size={15} className="text-emerald" />
            <div>
              <span className="kpi-k">BATTERY</span>
              <span className="kpi-v">{battery}%</span>
            </div>
          </div>
          <div className="kpi-mini-pill">
            <Layers size={15} className="text-blue" />
            <div>
              <span className="kpi-k">TOTAL COLLECTED</span>
              <span className="kpi-v">{totalCollected} / 3</span>
            </div>
          </div>
        </div>

        {/* 4 CPCB Internal Compartment Tallies */}
        <div className="cpcb-compartments-summary-card">
          <span className="comp-summary-title">INTERNAL CPCB COMPARTMENTS</span>
          <div className="comp-pill-row">
            {/* YELLOW */}
            <div className="cpcb-comp-tag yellow">
              <span className="comp-chip">Y</span>
              <div className="comp-txt">
                <span className="comp-lbl">YELLOW (Soiled)</span>
                <span className="comp-num">{compartments.yellow} stored</span>
              </div>
            </div>

            {/* RED */}
            <div className="cpcb-comp-tag red">
              <span className="comp-chip">R</span>
              <div className="comp-txt">
                <span className="comp-lbl">RED (Recyclable)</span>
                <span className="comp-num">{compartments.red} stored</span>
              </div>
            </div>

            {/* WHITE */}
            <div className="cpcb-comp-tag white">
              <span className="comp-chip">W</span>
              <div className="comp-txt">
                <span className="comp-lbl">WHITE (Sharps)</span>
                <span className="comp-num">{compartments.white} stored</span>
              </div>
            </div>

            {/* BLUE */}
            <div className="cpcb-comp-tag blue">
              <span className="comp-chip">B</span>
              <div className="comp-txt">
                <span className="comp-lbl">BLUE (Glassware)</span>
                <span className="comp-num">{compartments.blue} stored</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI CLASSIFICATION SIMULATION PANEL */}
        <div className="sim-ai-panel-card">
          <div className="ai-panel-header">
            <div className="ai-header-left">
              <Crosshair size={18} className="text-cyan" />
              <span className="ai-header-title">AI VISION SIMULATION</span>
            </div>
            <div className="ai-simulation-tag">
              <Sparkles size={12} />
              <span>AI Classification Simulation</span>
            </div>
          </div>

          {detectedItem ? (
            <div className="ai-detection-readout">
              <div className="ai-readout-row">
                <span className="ai-k">DETECTED OBJECT:</span>
                <span className="ai-v-title">{detectedItem.name}</span>
              </div>

              <div className="ai-grid-metrics">
                <div className="ai-metric-item">
                  <span className="ai-k">CPCB CATEGORY:</span>
                  <span className="ai-v" style={{ color: detectedItem.color }}>
                    {detectedItem.cpcbCategory}
                  </span>
                </div>
                <div className="ai-metric-item">
                  <span className="ai-k">WASTE TYPE:</span>
                  <span className="ai-v">{detectedItem.type}</span>
                </div>
                <div className="ai-metric-item">
                  <span className="ai-k">SIMULATED CONFIDENCE:</span>
                  <span className="ai-v conf" style={{ color: detectedItem.color }}>
                    {detectedItem.simulatedConfidence}%
                  </span>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="ai-conf-track">
                <div
                  className="ai-conf-bar"
                  style={{
                    width: `${detectedItem.simulatedConfidence}%`,
                    backgroundColor: detectedItem.color,
                  }}
                />
              </div>

              {/* Action Banner */}
              <div className="ai-action-box" style={{ borderColor: detectedItem.color }}>
                <PackagePlus size={16} style={{ color: detectedItem.color }} />
                <div className="ai-action-txt">
                  <span className="action-main-lbl">ACTION:</span>
                  <span className="action-sub-lbl">
                    Collect → {detectedItem.cpcbCategory} Compartment ({detectedItem.containerType})
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="ai-idle-standby-box">
              <Crosshair size={28} className="standby-crosshair" />
              <span className="standby-text">
                {robotState === 'NAVIGATING'
                  ? 'Scanning corridor waypoints for biomedical waste...'
                  : 'Sensor in Standby. Click START SIMULATION to begin mission.'}
              </span>
            </div>
          )}
        </div>

        {/* Demonstration Protocol Pipeline Strip */}
        <div className="sim-pipeline-tracker">
          <span className="tracker-heading">WORKFLOW STAGE:</span>
          <div className="tracker-stages-list">
            <span className={`tracker-step ${pipelineStage === 'OBJECT DETECTED' ? 'active' : ''}`}>
              1. Detect
            </span>
            <span className="t-sep">→</span>
            <span className={`tracker-step ${pipelineStage === 'AI CLASSIFICATION & CPCB SELECTION' ? 'active' : ''}`}>
              2. Classify
            </span>
            <span className="t-sep">→</span>
            <span className={`tracker-step ${pipelineStage === 'COLLECT' ? 'active' : ''}`}>
              3. Collect
            </span>
            <span className="t-sep">→</span>
            <span className={`tracker-step ${pipelineStage === 'SEGREGATE' ? 'active' : ''}`}>
              4. Segregate
            </span>
            <span className="t-sep">→</span>
            <span className={`tracker-step ${pipelineStage === 'DIGITAL RECORD UPDATED' ? 'active' : ''}`}>
              5. Track
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM SECTION: Controls + Real-Time Telemetry Event Log */}
    <div className="sim-bottom-bar-grid">
      {/* Controls Card */}
      <div className="sim-controls-card">
        <div className="ctrl-header-row">
          <span className="ctrl-card-title">SIMULATION CONTROLS</span>
          <div className="speed-pills-wrap">
            <Gauge size={14} />
            <span className="speed-lbl">SPEED:</span>
            <button
              className={`speed-btn ${speedMultiplier === 1 ? 'active' : ''}`}
              onClick={() => setSpeedMultiplier(1)}
            >
              1x
            </button>
            <button
              className={`speed-btn ${speedMultiplier === 1.5 ? 'active' : ''}`}
              onClick={() => setSpeedMultiplier(1.5)}
            >
              1.5x
            </button>
            <button
              className={`speed-btn ${speedMultiplier === 2 ? 'active' : ''}`}
              onClick={() => setSpeedMultiplier(2)}
            >
              2x
            </button>
          </div>
        </div>

        <div className="ctrl-buttons-row">
          {!isRunning ? (
            <button id="start-simulation-btn" className="btn-sim-action start" onClick={handleStart}>
              <Play size={16} fill="currentColor" />
              <span>START SIMULATION</span>
            </button>
          ) : isPaused ? (
            <button id="resume-simulation-btn" className="btn-sim-action resume" onClick={handleResume}>
              <Play size={16} fill="currentColor" />
              <span>RESUME</span>
            </button>
          ) : (
            <button id="pause-simulation-btn" className="btn-sim-action pause" onClick={handlePause}>
              <Pause size={16} />
              <span>PAUSE</span>
            </button>
          )}

          <button id="reset-simulation-btn" className="btn-sim-action reset" onClick={handleReset}>
            <RotateCcw size={15} />
            <span>RESET</span>
          </button>
        </div>

        <div className="ctrl-hint-box">
          <span>
            {robotState === 'COMPLETED'
              ? 'Mission Complete: All 3 waste objects collected into CPCB bins and logged.'
              : 'Watches the robot automatically navigate rooms, detect items, classify, and segregate.'}
          </span>
        </div>
      </div>

      {/* Event Log Card */}
      <div className="sim-event-log-card">
        <div className="log-top-row">
          <div className="log-title-wrap">
            <Clock size={16} className="text-cyan" />
            <span className="log-title">REAL-TIME DIGITAL TELEMETRY LOG</span>
          </div>
          <span className="log-total-badge">{events.length} EVENTS RECORDED</span>
        </div>

        <div className="log-items-container">
          {events.map((ev) => (
            <div key={ev.id} className="log-entry-row">
              <span className="log-time">[{ev.timestamp}]</span>
              <span className={`log-event-tag tag-${ev.eventType.toLowerCase()}`}>{ev.eventType}</span>
              <span className="log-msg">{ev.message}</span>
            </div>
          ))}
          <div ref={eventLogEndRef} />
        </div>
      </div>
    </div>
  </div>
);
};
