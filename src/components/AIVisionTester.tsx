import React, { useState } from 'react';
import {
  Eye,
  Crosshair,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  PackagePlus,
  HelpCircle,
  CheckCircle2,
  Scan,
} from 'lucide-react';
import type { CpcbCategory } from '../types';

interface TestItem {
  id: string;
  name: string;
  category: CpcbCategory | 'UNKNOWN';
  categoryLabel: string;
  confidence: number;
  recommendedBin: string;
  action: 'COLLECT' | 'HOLD_FOR_MANUAL_VERIFICATION';
  actionColor: string;
  description: string;
  visualType: 'syringe' | 'bandage' | 'bottle' | 'ampoule' | 'unknown';
  spectralData: string;
}

const TEST_ITEMS: TestItem[] = [
  {
    id: 'syringe',
    name: 'Disposable 5ml Hypodermic Syringe with Needle',
    category: 'WHITE',
    categoryLabel: 'WHITE — SHARPS (Needles & Fixed Metal)',
    confidence: 96,
    recommendedBin: 'WHITE COMPARTMENT (Puncture-Proof Sharps Vault)',
    action: 'COLLECT',
    actionColor: '#475569',
    description: 'High-contrast metallic needle reflection and translucent cylindrical barrel detected.',
    visualType: 'syringe',
    spectralData: 'Contour: 0.98 • Sharp Angle: 0.97 • Metal Reflectance: Positive',
  },
  {
    id: 'dressing',
    name: 'Post-Operative Blood-Soiled Gauze Dressing',
    category: 'YELLOW',
    categoryLabel: 'YELLOW — SOILED WASTE (Infectious)',
    confidence: 94,
    recommendedBin: 'YELLOW COMPARTMENT (Biohazard Sealed Bag)',
    action: 'COLLECT',
    actionColor: '#ca8a04',
    description: 'Biological absorption pattern identified on porous cotton matrix. Pathogen risk protocol assigned.',
    visualType: 'bandage',
    spectralData: 'Texture: Fibrous • Organic Hue Shift: 0.94 • Liquid Content: Detected',
  },
  {
    id: 'plastic',
    name: 'Contaminated Saline IV Infusion Bottle',
    category: 'RED',
    categoryLabel: 'RED — CONTAMINATED RECYCLABLE PLASTIC',
    confidence: 91,
    recommendedBin: 'RED COMPARTMENT (Recyclable Plastic Bin)',
    action: 'COLLECT',
    actionColor: '#dc2626',
    description: 'Blow-molded HDPE polymer container with infusion port geometry.',
    visualType: 'bottle',
    spectralData: 'Polymer Index: HDPE/PP • Form: Cylindrical • Needle Present: Negative',
  },
  {
    id: 'glass',
    name: 'Broken Antibiotic Glass Ampoule',
    category: 'BLUE',
    categoryLabel: 'BLUE — GLASSWARE & IMPLANTS',
    confidence: 95,
    recommendedBin: 'BLUE COMPARTMENT (Rigid Cardboard / Glass Vault)',
    action: 'COLLECT',
    actionColor: '#2563eb',
    description: 'Specular glass refraction lines and fracture facets recognized. Non-cytotoxic glass classification.',
    visualType: 'ampoule',
    spectralData: 'Refractive Index: 1.52 • Specular Flare: High • Material: Borosilicate',
  },
  {
    id: 'unknown-edge',
    name: 'Unidentified Composite Waste Object (EDGE CASE)',
    category: 'UNKNOWN',
    categoryLabel: 'UNCERTAIN / UNCLASSIFIED DISPOSABLE',
    confidence: 42,
    recommendedBin: 'QUARANTINE / MANUAL INSPECTION TRAY',
    action: 'HOLD_FOR_MANUAL_VERIFICATION',
    actionColor: '#f97316',
    description: 'Obscured geometry with mixed absorption indices. Confidence is below 60% safety threshold.',
    visualType: 'unknown',
    spectralData: 'Confidence < 60% • Occlusion: 70% • Risk: Potential Chemical/Sharps Matrix',
  },
];

export const AIVisionTester: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>('syringe');
  const [isScanning, setIsScanning] = useState(false);

  const activeItem = TEST_ITEMS.find((it) => it.id === selectedItemId) || TEST_ITEMS[0];

  const handleSelect = (id: string) => {
    setIsScanning(true);
    setSelectedItemId(id);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  return (
    <div className="ai-vision-tester-card">
      {/* Top Header */}
      <div className="tester-header">
        <div className="tester-title-group">
          <Eye size={20} className="text-cyan" />
          <div>
            <h3 className="tester-title">Interactive AI Classification Simulation</h3>
            <p className="tester-subtitle">Select medical waste objects to test simulated inference &amp; CPCB routing</p>
          </div>
        </div>
        <div className="simulation-notice-badge">
          <Sparkles size={13} className="text-purple" />
          <span>Simulated classification output — not from a trained model</span>
        </div>
      </div>

      {/* Item Selector Tabs */}
      <div className="tester-item-selector">
        {TEST_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`item-select-btn ${selectedItemId === item.id ? 'active' : ''} ${
              item.id === 'unknown-edge' ? 'edge-case-btn' : ''
            }`}
            onClick={() => handleSelect(item.id)}
          >
            {item.id === 'unknown-edge' && <AlertTriangle size={13} className="edge-icon" />}
            <span>{item.name.split(' ')[0]} {item.id === 'unknown-edge' ? '(Edge Case)' : ''}</span>
          </button>
        ))}
      </div>

      {/* Main Viewport & Classification Readout */}
      <div className="tester-display-grid">
        {/* Left Side: Simulated Viewfinder with Optical Reticle */}
        <div className="simulated-viewfinder-box">
          <div className="vf-header-bar">
            <span className="vf-sensor-tag">
              <span className={`vf-dot ${isScanning ? 'blink' : ''}`} />
              OPTICAL SENSOR 01 • {isScanning ? 'ANALYZING...' : 'TARGET ACQUIRED'}
            </span>
            <span className="vf-res-tag">1920×1080 • 60 FPS • RAW RGB-D</span>
          </div>

          <div className="vf-lens-area">
            {/* Corner brackets */}
            <div className="vf-bracket tl" />
            <div className="vf-bracket tr" />
            <div className="vf-bracket bl" />
            <div className="vf-bracket br" />

            {/* Target Object Graphic Representation */}
            <div className={`vf-target-display ${isScanning ? 'scanning' : ''}`}>
              <Crosshair size={32} className="vf-crosshair" style={{ color: activeItem.actionColor }} />
              
              {/* Graphic container */}
              <div
                className="target-icon-hull"
                style={{
                  borderColor: activeItem.actionColor,
                  backgroundColor: `${activeItem.actionColor}15`,
                }}
              >
                {activeItem.visualType === 'syringe' && (
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke={activeItem.actionColor} strokeWidth="2">
                    <path d="m18 2 4 4" strokeLinecap="round" />
                    <path d="m17 7 3-3" strokeLinecap="round" />
                    <path d="M19 9 8.7 19.3c-.4.4-1 .6-1.6.6H3v-4.1c0-.6.2-1.2.6-1.6L15 4" />
                    <path d="m9 11 4 4" />
                    <path d="m5 19-3 3" strokeLinecap="round" />
                  </svg>
                )}

                {activeItem.visualType === 'bandage' && (
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke={activeItem.actionColor} strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="3" transform="rotate(45 12 12)" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="1.5" fill={activeItem.actionColor} />
                    <circle cx="9" cy="9" r="1" fill={activeItem.actionColor} />
                    <circle cx="15" cy="15" r="1" fill={activeItem.actionColor} />
                  </svg>
                )}

                {activeItem.visualType === 'bottle' && (
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke={activeItem.actionColor} strokeWidth="2">
                    <rect x="7" y="7" width="10" height="14" rx="2" strokeLinecap="round" />
                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                    <line x1="12" y1="11" x2="12" y2="17" strokeLinecap="round" />
                  </svg>
                )}

                {activeItem.visualType === 'ampoule' && (
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke={activeItem.actionColor} strokeWidth="2">
                    <path d="M10 2h4v4l-2 3-2-3V2z" strokeLinecap="round" />
                    <path d="M8 9h8v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9z" strokeLinecap="round" />
                    <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
                  </svg>
                )}

                {activeItem.visualType === 'unknown' && (
                  <HelpCircle size={48} style={{ color: activeItem.actionColor }} />
                )}
              </div>

              {/* Bounding box tag */}
              <div className="vf-label-tag" style={{ backgroundColor: activeItem.actionColor }}>
                {activeItem.name.split(' ')[0].toUpperCase()} • {activeItem.confidence}% CONF
              </div>
            </div>

            {/* Sweep Scanline */}
            <div className="vf-animated-scanline" />
          </div>

          <div className="vf-footer-bar">
            <span>SYNTHETIC TELEMETRY: {activeItem.spectralData}</span>
          </div>
        </div>

        {/* Right Side: Detailed Decision & Routing Output */}
        <div className="classification-readout-panel">
          <div className="panel-row">
            <span className="panel-label">OBJECT DETECTED:</span>
            <h4 className="panel-item-name">{activeItem.name}</h4>
            <p className="panel-item-desc">{activeItem.description}</p>
          </div>

          <div className="panel-metric-row">
            <div className="metric-box">
              <span className="metric-k">CPCB BIO-CATEGORY:</span>
              <span className="metric-v" style={{ color: activeItem.actionColor }}>
                {activeItem.categoryLabel}
              </span>
            </div>
            <div className="metric-box">
              <span className="metric-k">SIMULATED CONFIDENCE:</span>
              <span className="metric-v confidence" style={{ color: activeItem.actionColor }}>
                {activeItem.confidence}%
              </span>
            </div>
          </div>

          {/* Confidence Meter Bar */}
          <div className="confidence-track-wrap">
            <div className="track-bar">
              <div
                className="track-fill"
                style={{
                  width: `${activeItem.confidence}%`,
                  backgroundColor: activeItem.actionColor,
                }}
              />
            </div>
            <span className="track-hint">
              {activeItem.confidence >= 90
                ? 'High Confidence (>90%): Meets autonomous collection threshold.'
                : 'Below Confidence Threshold (<60%): Safety interlock engaged.'}
            </span>
          </div>

          {/* Target Compartment Recommendation */}
          <div className="routing-decision-card">
            <span className="decision-title">TARGET SEGREGATION COMPARTMENT:</span>
            <div className="decision-bin-row">
              <PackagePlus size={18} style={{ color: activeItem.actionColor }} />
              <span className="decision-bin-name">{activeItem.recommendedBin}</span>
            </div>
          </div>

          {/* Action Trigger Banner */}
          {activeItem.action === 'COLLECT' ? (
            <div className="action-banner-approved">
              <CheckCircle2 size={18} className="text-emerald" />
              <div>
                <span className="action-status">ACTION: COLLECT &amp; SEGREGATE</span>
                <p className="action-sub">Item confirmed. Robot actuators routed to internal compartment.</p>
              </div>
            </div>
          ) : (
            <div className="action-banner-quarantine">
              <AlertTriangle size={20} className="text-orange" />
              <div>
                <span className="action-status warning">ACTION: MANUAL VERIFICATION REQUIRED</span>
                <p className="action-sub">
                  Autonomous disposal withheld. Hazardous waste cannot be blindly misclassified.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
