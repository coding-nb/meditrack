import React, { useRef, useEffect } from 'react';
import type {
  RobotState,
  WasteItem,
  CompartmentCounts,
  LogEntry,
  PipelineStep,
} from '../types';
import { AIVisionPanel } from './AIVisionPanel';
import { WorkflowPipeline } from './WorkflowPipeline';
import {
  Play,
  Pause,
  RotateCcw,
  Battery,
  MapPin,
  Activity,
  Layers,
  AlertTriangle,
  Flame,
  Recycle,
  Clock,
  Gauge,
} from 'lucide-react';

interface LiveDashboardProps {
  robotState: RobotState;
  currentLocationName: string;
  battery: number;
  compartments: CompartmentCounts;
  totalCollected: number;
  totalWasteCount: number;
  detectedItem: WasteItem | null;
  logs: LogEntry[];
  pipelineStep: PipelineStep | null;
  isRunning: boolean;
  isPaused: boolean;
  speedMultiplier: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSetSpeed: (speed: number) => void;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({
  robotState,
  currentLocationName,
  battery,
  compartments,
  totalCollected,
  totalWasteCount,
  detectedItem,
  logs,
  pipelineStep,
  isRunning,
  isPaused,
  speedMultiplier,
  onStart,
  onPause,
  onResume,
  onReset,
  onSetSpeed,
}) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Color mapping for states
  const getStateColor = (state: RobotState) => {
    switch (state) {
      case 'IDLE':
        return '#64748b';
      case 'NAVIGATING':
        return '#0284c7';
      case 'DETECTING':
        return '#8b5cf6';
      case 'CLASSIFYING':
        return '#a855f7';
      case 'COLLECTING':
        return '#f59e0b';
      case 'SEGREGATING':
        return '#d97706';
      case 'COMPLETED':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="live-dashboard-container">
      {/* Dashboard Top Title Bar */}
      <div className="dashboard-header-bar">
        <div className="dash-title-left">
          <div className="dash-icon-orb">
            <Activity size={20} className="dash-live-icon" />
          </div>
          <div>
            <h2 className="dash-main-title">MediTrack Live Dashboard</h2>
            <p className="dash-sub-title">Real-time Autonomous Telemetry & Segregation Telematics</p>
          </div>
        </div>

        {/* Global State Pill */}
        <div
          className="robot-status-banner"
          style={{
            borderColor: getStateColor(robotState),
            backgroundColor: `${getStateColor(robotState)}15`,
          }}
        >
          <span
            className="status-pulse-beacon"
            style={{ backgroundColor: getStateColor(robotState) }}
          />
          <div className="status-text-wrap">
            <span className="status-label">ROBOT STATUS</span>
            <span className="status-value" style={{ color: getStateColor(robotState) }}>
              {robotState}
            </span>
          </div>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className="simulation-controls-row">
        <div className="primary-actions">
          {!isRunning ? (
            <button
              id="start-simulation-btn"
              className="ctrl-btn btn-start"
              onClick={onStart}
            >
              <Play size={18} />
              <span>START SIMULATION</span>
            </button>
          ) : isPaused ? (
            <button
              id="resume-simulation-btn"
              className="ctrl-btn btn-resume"
              onClick={onResume}
            >
              <Play size={18} />
              <span>RESUME</span>
            </button>
          ) : (
            <button
              id="pause-simulation-btn"
              className="ctrl-btn btn-pause"
              onClick={onPause}
            >
              <Pause size={18} />
              <span>PAUSE</span>
            </button>
          )}

          <button
            id="reset-simulation-btn"
            className="ctrl-btn btn-reset"
            onClick={onReset}
          >
            <RotateCcw size={16} />
            <span>RESET</span>
          </button>
        </div>

        {/* Simulation Playback Speed Toggle for convenient viewing */}
        <div className="speed-toggle-group">
          <Gauge size={14} className="speed-icon" />
          <span className="speed-label">SPEED:</span>
          <button
            className={`speed-pill ${speedMultiplier === 1 ? 'speed-active' : ''}`}
            onClick={() => onSetSpeed(1)}
          >
            1x
          </button>
          <button
            className={`speed-pill ${speedMultiplier === 1.5 ? 'speed-active' : ''}`}
            onClick={() => onSetSpeed(1.5)}
          >
            1.5x
          </button>
          <button
            className={`speed-pill ${speedMultiplier === 2 ? 'speed-active' : ''}`}
            onClick={() => onSetSpeed(2)}
          >
            2x
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="telemetry-kpi-grid">
        {/* KPI 1: Current Location */}
        <div className="kpi-card">
          <div className="kpi-icon-wrap bg-cyan">
            <MapPin size={18} className="text-cyan" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">CURRENT LOCATION</span>
            <span className="kpi-main-val location-val">{currentLocationName}</span>
          </div>
        </div>

        {/* KPI 2: Battery Percentage */}
        <div className="kpi-card">
          <div className="kpi-icon-wrap bg-emerald">
            <Battery size={18} className="text-emerald" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">BATTERY HEALTH</span>
            <div className="kpi-val-row">
              <span className="kpi-main-val">{battery}%</span>
              <span className="kpi-sub-tag">
                {battery > 95 ? 'OPTIMAL' : 'GOOD'}
              </span>
            </div>
            <div className="battery-mini-bar">
              <div
                className="battery-mini-fill"
                style={{
                  width: `${battery}%`,
                  backgroundColor:
                    battery > 50 ? '#10b981' : battery > 20 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Total Waste Collected */}
        <div className="kpi-card">
          <div className="kpi-icon-wrap bg-blue">
            <Layers size={18} className="text-blue" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">TOTAL WASTE COLLECTED</span>
            <div className="kpi-val-row">
              <span className="kpi-main-val">
                {totalCollected} / {totalWasteCount}
              </span>
              <span className="kpi-sub-tag">
                {totalCollected === totalWasteCount ? '100% COMPLETE' : 'IN PROGRESS'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Compartment Segregation Breakdown */}
      <div className="compartment-section-card">
        <div className="section-title-row">
          <span className="section-badge">INTERNAL COMPARTMENTS</span>
          <span className="section-subtext">Tri-Chamber Sealed Segregation Vault</span>
        </div>

        <div className="compartments-row">
          {/* Compartment 1: Sharps */}
          <div
            className={`compartment-item-card ${
              compartments.sharps > 0 ? 'compartment-filled' : ''
            }`}
            style={{ borderColor: '#ef4444' }}
          >
            <div className="comp-header">
              <div className="comp-tag-wrap" style={{ color: '#ef4444' }}>
                <Flame size={16} />
                <span className="comp-name">SHARPS</span>
              </div>
              <span className="comp-count-bubble" style={{ backgroundColor: '#ef4444' }}>
                {compartments.sharps}
              </span>
            </div>
            <div className="comp-body">
              <span className="comp-desc">Syringes, needles, scalpels</span>
              <span className="comp-status-text">
                {compartments.sharps > 0 ? '1 Item Stored' : 'Empty'}
              </span>
            </div>
          </div>

          {/* Compartment 2: Infectious */}
          <div
            className={`compartment-item-card ${
              compartments.infectious > 0 ? 'compartment-filled' : ''
            }`}
            style={{ borderColor: '#f59e0b' }}
          >
            <div className="comp-header">
              <div className="comp-tag-wrap" style={{ color: '#f59e0b' }}>
                <AlertTriangle size={16} />
                <span className="comp-name">INFECTIOUS</span>
              </div>
              <span className="comp-count-bubble" style={{ backgroundColor: '#f59e0b' }}>
                {compartments.infectious}
              </span>
            </div>
            <div className="comp-body">
              <span className="comp-desc">Bandages, soiled dressings</span>
              <span className="comp-status-text">
                {compartments.infectious > 0 ? '1 Item Stored' : 'Empty'}
              </span>
            </div>
          </div>

          {/* Compartment 3: Recyclable */}
          <div
            className={`compartment-item-card ${
              compartments.recyclable > 0 ? 'compartment-filled' : ''
            }`}
            style={{ borderColor: '#06b6d4' }}
          >
            <div className="comp-header">
              <div className="comp-tag-wrap" style={{ color: '#06b6d4' }}>
                <Recycle size={16} />
                <span className="comp-name">RECYCLABLE</span>
              </div>
              <span className="comp-count-bubble" style={{ backgroundColor: '#06b6d4' }}>
                {compartments.recyclable}
              </span>
            </div>
            <div className="comp-body">
              <span className="comp-desc">Medicine bottles, plastics</span>
              <span className="comp-status-text">
                {compartments.recyclable > 0 ? '1 Item Stored' : 'Empty'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Vision Panel (with explicit simulation label) */}
      <AIVisionPanel detectedItem={detectedItem} robotState={robotState} />

      {/* Sequential Demonstration Workflow Pipeline */}
      <WorkflowPipeline
        currentStep={pipelineStep}
        activeWasteName={detectedItem?.name}
        activeCategory={detectedItem?.category}
      />

      {/* Real-time Telemetry Event Log */}
      <div className="event-log-card">
        <div className="event-log-header">
          <div className="log-title-group">
            <Clock size={16} className="log-header-icon" />
            <span className="log-title">Telemetry & Event Log</span>
          </div>
          <span className="log-count-tag">{logs.length} EVENTS</span>
        </div>

        <div className="event-log-feed" ref={logContainerRef}>
          {logs.map((entry) => (
            <div key={entry.id} className="log-row">
              <span className="log-timestamp">[{entry.time}]</span>
              <span
                className="log-state-badge"
                style={{
                  color: getStateColor(entry.state),
                  backgroundColor: `${getStateColor(entry.state)}20`,
                }}
              >
                {entry.state}
              </span>
              <span className="log-message-text">{entry.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="log-empty-state">No events recorded. Click "START SIMULATION" to begin.</div>
          )}
        </div>
      </div>
    </div>
  );
};
