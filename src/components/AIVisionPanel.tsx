import React from 'react';
import type { WasteItem, RobotState } from '../types';
import { Eye, ShieldAlert, CheckCircle, Crosshair, Sparkles } from 'lucide-react';

interface AIVisionPanelProps {
  detectedItem: WasteItem | null;
  robotState: RobotState;
}

export const AIVisionPanel: React.FC<AIVisionPanelProps> = ({
  detectedItem,
  robotState,
}) => {
  const isAnalyzing =
    robotState === 'DETECTING' ||
    robotState === 'CLASSIFYING' ||
    robotState === 'COLLECTING' ||
    robotState === 'SEGREGATING';

  return (
    <div className="ai-vision-panel-card">
      {/* Panel Top Label */}
      <div className="vision-header">
        <div className="vision-title-group">
          <Eye size={18} className="vision-header-icon" />
          <span className="vision-title">AI Vision Telemetry</span>
        </div>
        {/* MANDATORY EXPLICIT LABEL */}
        <div className="simulation-disclaimer-badge">
          <Sparkles size={12} className="sparkle-icon" />
          <span>AI Classification Simulation</span>
        </div>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div className="viewfinder-window">
        {/* Viewfinder corner brackets */}
        <div className="vf-corner top-left" />
        <div className="vf-corner top-right" />
        <div className="vf-corner bottom-left" />
        <div className="vf-corner bottom-right" />

        {/* Viewfinder Overlay telemetry */}
        <div className="vf-hud-top">
          <div className="vf-rec-badge">
            <span className={`rec-dot ${isAnalyzing ? 'pulsing-rec' : ''}`} />
            <span>OPTICAL SENSOR 01 • ACTIVE</span>
          </div>
          <span className="vf-fps">60 FPS • 1080p</span>
        </div>

        {/* Center Target View or Idle graphic */}
        <div className="vf-center-content">
          {detectedItem && isAnalyzing ? (
            <div className="vf-detected-wrapper">
              <div
                className="vf-bounding-box"
                style={{ borderColor: detectedItem.color }}
              >
                <div className="vf-box-tag" style={{ backgroundColor: detectedItem.color }}>
                  {detectedItem.name.toUpperCase()} [{detectedItem.confidence}%]
                </div>
                {/* Crosshair inside box */}
                <Crosshair size={28} className="box-crosshair" style={{ color: detectedItem.color }} />
              </div>
            </div>
          ) : (
            <div className="vf-idle-state">
              <Crosshair size={36} className="idle-crosshair" />
              <span className="vf-idle-text">
                {robotState === 'NAVIGATING'
                  ? 'SCANNING ENVIRONMENT FOR BIO-HAZARDS...'
                  : 'OPTICAL SENSOR STANDBY'}
              </span>
            </div>
          )}

          {/* Animated scan line when analyzing */}
          {isAnalyzing && <div className="vf-scan-line" />}
        </div>

        <div className="vf-hud-bottom">
          <span>FOV: 94° • DEPTH: LIDAR ACTIVE</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      {/* Classification Details Readout */}
      {detectedItem ? (
        <div className="vision-readout-container">
          <div className="readout-row main-item-row">
            <div>
              <span className="readout-label">CURRENT DETECTED OBJECT</span>
              <h4 className="readout-item-name">{detectedItem.name}</h4>
              <p className="readout-item-desc">{detectedItem.description}</p>
            </div>
            <div className="category-pill-box" style={{ borderColor: detectedItem.color }}>
              <span className="category-pill-label">CLASSIFICATION</span>
              <span className="category-pill-val" style={{ color: detectedItem.color }}>
                {detectedItem.category}
              </span>
            </div>
          </div>

          {/* Confidence Meter Bar */}
          <div className="confidence-meter-container">
            <div className="confidence-header">
              <span className="confidence-label">AI Classification Confidence</span>
              <span className="confidence-val" style={{ color: detectedItem.color }}>
                {detectedItem.confidence}%
              </span>
            </div>
            <div className="confidence-track">
              <div
                className="confidence-fill"
                style={{
                  width: `${detectedItem.confidence}%`,
                  backgroundColor: detectedItem.color,
                }}
              />
            </div>
          </div>

          {/* Destination Compartment Assignment */}
          <div className="bin-target-box">
            <ShieldAlert size={16} className="target-shield-icon" style={{ color: detectedItem.color }} />
            <div className="bin-target-text">
              <span className="bin-tag-small">SEGREGATION ASSIGNMENT</span>
              <span className="bin-tag-name">{detectedItem.binTarget}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="vision-standby-readout">
          <CheckCircle size={20} className="standby-icon" />
          <span>No waste object currently in sensor focal range.</span>
        </div>
      )}
    </div>
  );
};
