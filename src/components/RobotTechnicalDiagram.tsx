import React, { useState } from 'react';
import {
  Eye,
  Layers,
  Battery,
  Cpu,
  RotateCw,
  Box,
  Compass,
  FileCode,
  ShieldAlert,
} from 'lucide-react';

interface ComponentSpec {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  cpcbRelevance?: string;
}

const COMPONENTS: Record<string, ComponentSpec> = {
  camera: {
    id: 'camera',
    name: 'Front AI Optical & LiDAR Module',
    subtitle: 'Perception, Object Acquisition & Classification',
    category: 'Perception Subsystem',
    description:
      'Houses forward-facing wide-angle RGB optical camera paired with a solid-state micro-LiDAR rangefinder. Captures disposable waste geometry for simulated edge classification and obstacle clearance.',
    specs: [
      { label: 'Field of View', value: '110° Diagonal' },
      { label: 'Resolution (Proposed)', value: '1080p @ 60 FPS' },
      { label: 'Proximity Sensor', value: '2D Time-of-Flight / LiDAR' },
      { label: 'Effective Focal Range', value: '0.2m – 2.5m' },
    ],
  },
  compartments: {
    id: 'compartments',
    name: 'Tri-Chamber CPCB Segregation Vault (4 Bins)',
    subtitle: 'Yellow, Red, White, Blue Isolated Containers',
    category: 'Biohazard Containment Subsystem',
    description:
      'Four physically isolated internal waste containers conforming directly to India CPCB 2016 rules. Servo-actuated top chutes route incoming waste into the target compartment without cross-contamination.',
    specs: [
      { label: 'YELLOW Bin', value: '8 Litres (Soiled & Anatomical)' },
      { label: 'RED Bin', value: '8 Litres (Contaminated Recyclable)' },
      { label: 'WHITE Bin', value: '5 Litres (Puncture-Proof Sharps)' },
      { label: 'BLUE Bin', value: '5 Litres (Rigid Glass & Implants)' },
      { label: 'Material', value: 'Antimicrobial Polypropylene + Stainless Steel' },
    ],
    cpcbRelevance:
      'Strict 4-colour compliance eliminates post-collection re-sorting, drastically curbing needlestick injuries and segregation non-compliance.',
  },
  battery: {
    id: 'battery',
    name: 'Smart LiFePO4 Power Pack & Induction Receiver',
    subtitle: 'Safe, High-Cycle Clean Energy Storage',
    category: 'Energy & Power Management',
    description:
      'Lithium Iron Phosphate (LiFePO4) chemistry chosen for clinical safety (non-flammable thermal stability in oxygenated hospital environments). Equipped with base induction coil for wireless dock recharging.',
    specs: [
      { label: 'Chemistry', value: 'LiFePO4 (Thermal Runaway Resistant)' },
      { label: 'Voltage & Capacity', value: '24V DC • 20Ah (480Wh)' },
      { label: 'Operational Runtime', value: 'Up to 6 Hours continuous run' },
      { label: 'Recharge Mechanism', value: 'Contactless Qi-style Induction Dock' },
    ],
  },
  drive: {
    id: 'drive',
    name: 'Differential Drive Motors & Casters',
    subtitle: 'Zero-Turn Agility for Tight Hospital Corridors',
    category: 'Locomotion & Mobility Subsystem',
    description:
      'Dual high-torque brushless DC (BLDC) planetary geared hub motors providing zero-radius turning. Supported by low-noise medical-grade polyurethane dual caster wheels for smooth, silent transit.',
    specs: [
      { label: 'Motor Type', value: 'Twin 24V BLDC Geared Hub Motors' },
      { label: 'Rated Speed', value: '0.3 – 0.5 m/s (Human walking pace)' },
      { label: 'Turn Radius', value: '0 mm (Zero-Radius Differential Turn)' },
      { label: 'Caster Wheels', value: 'Twin Non-Marking Polyurethane Casters' },
    ],
  },
  control: {
    id: 'control',
    name: 'Central Embedded Controller & Telemetry Hub',
    subtitle: 'Real-Time State Machine & Wi-Fi/BLE Gateway',
    category: 'Compute & Control Subsystem',
    description:
      'Manages the finite state machine (NAVIGATING → DETECTING → CLASSIFYING → COLLECTING → SEGREGATING → TRACKING). Broadcasts encrypted telemetry over local clinical Wi-Fi to the central dashboard.',
    specs: [
      { label: 'Processing Architecture', value: 'Dual Core Cortex-M7 + Edge TPU' },
      { label: 'Bus Architecture', value: 'Isolated CAN-Bus 2.0B + UART' },
      { label: 'Wireless Protocol', value: 'WPA3 Enterprise Wi-Fi + BLE 5.2' },
      { label: 'Safety Interlocks', value: 'Hardware E-Stop + Obstacle Watchdog' },
    ],
  },
};

export const RobotTechnicalDiagram: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('compartments');
  const [activeCadView, setActiveCadView] = useState<'schematic' | 'cad-wireframe'>('schematic');

  const selectedComp = COMPONENTS[selectedCompId];

  return (
    <div className="robot-tech-section">
      <div className="tech-controls-bar">
        <div className="tech-pill-group">
          <button
            className={`tech-toggle-btn ${activeCadView === 'schematic' ? 'active' : ''}`}
            onClick={() => setActiveCadView('schematic')}
          >
            <Compass size={15} />
            <span>2D Engineering Schematic</span>
          </button>
          <button
            className={`tech-toggle-btn ${activeCadView === 'cad-wireframe' ? 'active' : ''}`}
            onClick={() => setActiveCadView('cad-wireframe')}
          >
            <Box size={15} />
            <span>Autodesk Fusion CAD Concept</span>
          </button>
        </div>
        <span className="tech-hint-text">
          Click any component on the schematic to inspect technical specifications
        </span>
      </div>

      <div className="robot-inspection-grid">
        {/* Left Side: Interactive 2D Engineering Diagram or CAD Concept */}
        <div className="diagram-canvas-card">
          {activeCadView === 'schematic' ? (
            <div className="schematic-view-wrapper">
              <svg
                viewBox="0 0 540 640"
                className="robot-schematic-svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Grid background */}
                  <pattern id="techGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Blueprint Background */}
                <rect width="540" height="640" fill="#f8fafc" />
                <rect width="540" height="640" fill="url(#techGrid)" />

                {/* Outer Dimension Callouts */}
                <line x1="40" y1="80" x2="40" y2="560" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="30" y1="80" x2="50" y2="80" stroke="#94a3b8" strokeWidth="1" />
                <line x1="30" y1="560" x2="50" y2="560" stroke="#94a3b8" strokeWidth="1" />
                <text x="32" y="325" fill="#64748b" fontSize="11" fontFamily="monospace" transform="rotate(-90 32 325)">
                  780 mm HEIGHT
                </text>

                <line x1="80" y1="590" x2="460" y2="590" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="80" y1="580" x2="80" y2="600" stroke="#94a3b8" strokeWidth="1" />
                <line x1="460" y1="580" x2="460" y2="600" stroke="#94a3b8" strokeWidth="1" />
                <text x="270" y="612" fill="#64748b" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  520 mm WIDTH
                </text>

                {/* Left and Right Drive Wheels */}
                <g
                  className={`svg-interactive-part ${selectedCompId === 'drive' ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId('drive')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x="52" y="250" width="28" height="150" rx="8" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                  <line x1="52" y1="290" x2="80" y2="290" stroke="#64748b" strokeWidth="2" />
                  <line x1="52" y1="325" x2="80" y2="325" stroke="#64748b" strokeWidth="2" />
                  <line x1="52" y1="360" x2="80" y2="360" stroke="#64748b" strokeWidth="2" />
                  <text x="66" y="240" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">LEFT WHEEL</text>

                  <rect x="460" y="250" width="28" height="150" rx="8" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                  <line x1="460" y1="290" x2="488" y2="290" stroke="#64748b" strokeWidth="2" />
                  <line x1="460" y1="325" x2="488" y2="325" stroke="#64748b" strokeWidth="2" />
                  <line x1="460" y1="360" x2="488" y2="360" stroke="#64748b" strokeWidth="2" />
                  <text x="474" y="240" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">RIGHT WHEEL</text>
                </g>

                {/* Front & Rear Caster Wheels */}
                <circle cx="270" cy="90" r="16" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <circle cx="270" cy="90" r="6" fill="#cbd5e1" />
                <text x="270" y="65" fill="#64748b" fontSize="10" textAnchor="middle">FRONT CASTER</text>

                <circle cx="270" cy="545" r="16" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <circle cx="270" cy="545" r="6" fill="#cbd5e1" />
                <text x="270" y="575" fill="#64748b" fontSize="10" textAnchor="middle">REAR CASTER</text>

                {/* Main Chassis Body */}
                <rect
                  x="80"
                  y="105"
                  width="380"
                  height="425"
                  rx="24"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 6px 12px rgba(15, 23, 42, 0.08))"
                />

                {/* Top Camera / AI Vision Module */}
                <g
                  className={`svg-interactive-part ${selectedCompId === 'camera' ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId('camera')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x="190"
                    y="118"
                    width="160"
                    height="48"
                    rx="10"
                    fill={selectedCompId === 'camera' ? '#e0f2fe' : '#f1f5f9'}
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  <circle cx="240" cy="142" r="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                  <circle cx="240" cy="142" r="6" fill="#38bdf8" />
                  <circle cx="242" cy="140" r="2.5" fill="#ffffff" />
                  <rect x="270" y="132" width="60" height="20" rx="4" fill="#1e293b" />
                  <text x="300" y="146" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    LiDAR 3D
                  </text>
                  <text x="270" y="110" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ▲ CAMERA &amp; AI VISION MODULE
                  </text>
                </g>

                {/* Central Electronics & Control Unit */}
                <g
                  className={`svg-interactive-part ${selectedCompId === 'control' ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId('control')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x="105"
                    y="180"
                    width="330"
                    height="56"
                    rx="8"
                    fill={selectedCompId === 'control' ? '#ede9fe' : '#f8fafc'}
                    stroke="#7c3aed"
                    strokeWidth="1.8"
                  />
                  <text x="270" y="204" fill="#6d28d9" fontSize="12" fontWeight="bold" textAnchor="middle">
                    CONTROL &amp; EMBEDDED PROCESSING UNIT
                  </text>
                  <text x="270" y="222" fill="#64748b" fontSize="10" textAnchor="middle">
                    State Machine • CAN-Bus Controller • IoT Telemetry Gateway
                  </text>
                </g>

                {/* FOUR CPCB INTERNAL WASTE COMPARTMENTS */}
                <g
                  className={`svg-interactive-part ${selectedCompId === 'compartments' ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId('compartments')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x="105"
                    y="250"
                    width="330"
                    height="170"
                    rx="10"
                    fill="#f1f5f9"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                  <text x="270" y="270" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                    FOUR CPCB SEGREGATION COMPARTMENTS (SCHEDULE I)
                  </text>

                  {/* Bin 1: YELLOW */}
                  <rect
                    x="115"
                    y="285"
                    width="72"
                    height="120"
                    rx="6"
                    fill="#fefce8"
                    stroke="#eab308"
                    strokeWidth="2"
                  />
                  <rect x="123" y="293" width="56" height="22" rx="4" fill="#ca8a04" />
                  <text x="151" y="308" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    YELLOW
                  </text>
                  <text x="151" y="332" fill="#854d0e" fontSize="9" fontWeight="bold" textAnchor="middle">
                    SOILED
                  </text>
                  <text x="151" y="348" fill="#713f12" fontSize="8" textAnchor="middle">
                    Bandages
                  </text>
                  <text x="151" y="360" fill="#713f12" fontSize="8" textAnchor="middle">
                    Swabs, Gauze
                  </text>
                  <text x="151" y="390" fill="#a16207" fontSize="10" fontWeight="bold" textAnchor="middle">
                    8 Litres
                  </text>

                  {/* Bin 2: RED */}
                  <rect
                    x="195"
                    y="285"
                    width="72"
                    height="120"
                    rx="6"
                    fill="#fef2f2"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <rect x="203" y="293" width="56" height="22" rx="4" fill="#dc2626" />
                  <text x="231" y="308" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    RED
                  </text>
                  <text x="231" y="332" fill="#991b1b" fontSize="9" fontWeight="bold" textAnchor="middle">
                    RECYCLABLE
                  </text>
                  <text x="231" y="348" fill="#7f1d1d" fontSize="8" textAnchor="middle">
                    IV Bottles
                  </text>
                  <text x="231" y="360" fill="#7f1d1d" fontSize="8" textAnchor="middle">
                    Tubes, Gloves
                  </text>
                  <text x="231" y="390" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">
                    8 Litres
                  </text>

                  {/* Bin 3: WHITE */}
                  <rect
                    x="275"
                    y="285"
                    width="72"
                    height="120"
                    rx="6"
                    fill="#f8fafc"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                  <rect x="283" y="293" width="56" height="22" rx="4" fill="#475569" />
                  <text x="311" y="308" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    WHITE
                  </text>
                  <text x="311" y="332" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">
                    SHARPS
                  </text>
                  <text x="311" y="348" fill="#334155" fontSize="8" textAnchor="middle">
                    Needles
                  </text>
                  <text x="311" y="360" fill="#334155" fontSize="8" textAnchor="middle">
                    Fixed Scalpels
                  </text>
                  <text x="311" y="390" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">
                    5 Litres
                  </text>

                  {/* Bin 4: BLUE */}
                  <rect
                    x="355"
                    y="285"
                    width="72"
                    height="120"
                    rx="6"
                    fill="#eff6ff"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <rect x="363" y="293" width="56" height="22" rx="4" fill="#2563eb" />
                  <text x="391" y="308" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    BLUE
                  </text>
                  <text x="391" y="332" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">
                    GLASSWARE
                  </text>
                  <text x="391" y="348" fill="#1e3a8a" fontSize="8" textAnchor="middle">
                    Vials, Ampoules
                  </text>
                  <text x="391" y="360" fill="#1e3a8a" fontSize="8" textAnchor="middle">
                    Implants
                  </text>
                  <text x="391" y="390" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">
                    5 Litres
                  </text>
                </g>

                {/* Battery & Power Compartment */}
                <g
                  className={`svg-interactive-part ${selectedCompId === 'battery' ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId('battery')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x="105"
                    y="435"
                    width="330"
                    height="75"
                    rx="8"
                    fill={selectedCompId === 'battery' ? '#ecfdf5' : '#f0fdf4'}
                    stroke="#059669"
                    strokeWidth="1.8"
                  />
                  <text x="270" y="462" fill="#047857" fontSize="12" fontWeight="bold" textAnchor="middle">
                    BATTERY COMPARTMENT &amp; INDUCTION CHARGE COIL
                  </text>
                  <text x="270" y="482" fill="#065f46" fontSize="10" textAnchor="middle">
                    24V 20Ah LiFePO4 Chemistry • Contactless Base Recharging Pad
                  </text>
                  <circle cx="270" cy="495" r="5" fill="#10b981" />
                </g>
              </svg>
            </div>
          ) : (
            /* AUTODESK FUSION PRODUCT CONCEPT PLACEHOLDER & WIREFRAME */
            <div className="cad-concept-preview">
              <div className="cad-masthead">
                <div className="cad-badge">
                  <FileCode size={14} />
                  <span>Autodesk Fusion Product Concept</span>
                </div>
                <span className="cad-stage-tag">STAGE 2 CAD ENVELOPE</span>
              </div>

              <div className="cad-wireframe-viewport">
                {/* Simulated 3D Isometric Technical Wireframe Box */}
                <svg viewBox="0 0 400 320" className="cad-svg-model">
                  {/* Isometric Grid Lines */}
                  <line x1="50" y1="260" x2="350" y2="260" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50" y1="260" x2="200" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="350" y1="260" x2="200" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Robot CAD Outer Extrusion Isometric Lines */}
                  {/* Base Plate */}
                  <polygon points="120,240 280,240 330,190 170,190" fill="rgba(2, 132, 199, 0.06)" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* Vertical Uprights */}
                  <line x1="120" y1="240" x2="120" y2="90" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="280" y1="240" x2="280" y2="90" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="330" y1="190" x2="330" y2="40" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="170" y1="190" x2="170" y2="40" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Top Deck Surface */}
                  <polygon points="120,90 280,90 330,40 170,40" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="2" />

                  {/* 4 Internal Vault Chambers Extrusion Lines */}
                  <line x1="160" y1="105" x2="160" y2="225" stroke="#eab308" strokeWidth="2" />
                  <line x1="200" y1="105" x2="200" y2="225" stroke="#ef4444" strokeWidth="2" />
                  <line x1="240" y1="105" x2="240" y2="225" stroke="#64748b" strokeWidth="2" />
                  <line x1="270" y1="95" x2="270" y2="215" stroke="#3b82f6" strokeWidth="2" />

                  {/* Camera Turret Pod on Top */}
                  <polygon points="175,40 225,40 240,20 190,20" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
                  <circle cx="207" cy="30" r="6" fill="#38bdf8" />

                  {/* Wheels */}
                  <ellipse cx="105" cy="245" rx="8" ry="24" fill="#334155" stroke="#0f172a" />
                  <ellipse cx="295" cy="245" rx="8" ry="24" fill="#334155" stroke="#0f172a" />

                  {/* Dimensions Annotations */}
                  <text x="200" y="280" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    FOOTPRINT: 680mm (L) × 520mm (W)
                  </text>
                  <text x="200" y="300" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    HEIGHT: 780mm | TOTAL PAYLOAD: 25 KG
                  </text>
                </svg>

                <div className="cad-callout-note">
                  <span className="note-bold">Autodesk Fusion Model Container Notice:</span>
                  <p className="note-text">
                    This viewport is configured as the placeholder integration envelope for the team's official
                    Autodesk Fusion .F3D CAD exports, engineering STEP files, and rendered orthographic projections.
                    No physical fabrication is claimed; digital parametric modeling precedes hardware tooling.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Component Inspector Specification Card */}
        <div className="component-spec-card">
          <div className="spec-card-header">
            <span className="spec-cat-tag">{selectedComp.category}</span>
            <h3 className="spec-name">{selectedComp.name}</h3>
            <p className="spec-subtitle">{selectedComp.subtitle}</p>
          </div>

          <div className="spec-card-body">
            <div className="spec-section">
              <span className="spec-label">FUNCTIONAL RATIONALE</span>
              <p className="spec-desc">{selectedComp.description}</p>
            </div>

            {selectedComp.cpcbRelevance && (
              <div className="cpcb-pill-box">
                <ShieldAlert size={16} className="text-amber" />
                <div>
                  <span className="cpcb-tag">REGULATORY COMPLIANCE</span>
                  <p className="cpcb-p">{selectedComp.cpcbRelevance}</p>
                </div>
              </div>
            )}

            <div className="spec-section">
              <span className="spec-label">PROPOSED TECHNICAL SPECIFICATIONS</span>
              <div className="spec-table">
                {selectedComp.specs.map((item, idx) => (
                  <div key={idx} className="spec-table-row">
                    <span className="spec-k">{item.label}</span>
                    <span className="spec-v">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="spec-selector-pills">
            <span className="selector-title">Select Part:</span>
            {Object.keys(COMPONENTS).map((key) => (
              <button
                key={key}
                className={`pill-btn ${selectedCompId === key ? 'active' : ''}`}
                onClick={() => setSelectedCompId(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
