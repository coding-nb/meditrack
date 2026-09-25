import React from 'react';
import type { RobotState, WasteItem, CompartmentTally } from '../types';
import { RobotVisual } from './RobotVisual';
import { WasteItemVisual } from './WasteItemVisual';

interface HospitalMapProps {
  robotPos: { x: number; y: number; rotation: number };
  robotState: RobotState;
  battery: number;
  compartments: CompartmentTally;
  wasteItems: WasteItem[];
  currentTargetWasteId?: string;
  currentLocationName: string;
}

export const HospitalMap: React.FC<HospitalMapProps> = ({
  robotPos,
  robotState,
  battery,
  compartments,
  wasteItems,
  currentTargetWasteId,
  currentLocationName,
}) => {
  return (
    <div className="hospital-map-wrapper">
      {/* Map Header with Current Sector Tag */}
      <div className="map-overlay-header">
        <div className="map-badge">
          <span className="live-dot" />
          <span>HOSPITAL TOP-DOWN SECTOR MAP • LEVEL 2</span>
        </div>
        <div className="current-waypoint-pill">
          <span className="pill-label">ZONE:</span>
          <span className="pill-value">{currentLocationName}</span>
        </div>
      </div>

      {/* Main Floor Plan Area */}
      <div className="floorplan-container">
        {/* SVG Floor Architecture */}
        <svg
          viewBox="0 0 900 540"
          className="hospital-svg-floor"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Floor tile grid pattern */}
            <pattern id="floorTiles" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
            {/* Corridor track pattern */}
            <pattern id="hazardStripes" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="10" height="20" fill="rgba(245, 158, 11, 0.08)" />
              <rect x="10" width="10" height="20" fill="transparent" />
            </pattern>
            {/* Dock glow */}
            <radialGradient id="dockGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Floor */}
          <rect width="900" height="540" fill="#0b1120" />
          <rect width="900" height="540" fill="url(#floorTiles)" />

          {/* ================= CORRIDOR ================= */}
          {/* Main Corridor Pathway */}
          <rect x="30" y="240" width="840" height="130" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

          {/* AGV Navigation Guidance Track Line */}
          <line
            x1="110"
            y1="305"
            x2="850"
            y2="305"
            stroke="#0ea5e9"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeOpacity="0.4"
          />
          {/* Vertical Track lines to rooms */}
          <line x1="110" y1="460" x2="110" y2="305" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 6" strokeOpacity="0.4" />
          <line x1="300" y1="305" x2="300" y2="185" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 6" strokeOpacity="0.4" />
          <line x1="550" y1="305" x2="550" y2="185" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 6" strokeOpacity="0.4" />
          <line x1="780" y1="305" x2="780" y2="185" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 6" strokeOpacity="0.4" />

          {/* Corridor Waypoint Track Markers */}
          <circle cx="110" cy="305" r="5" fill="#0284c7" opacity="0.6" />
          <circle cx="300" cy="305" r="5" fill="#0284c7" opacity="0.6" />
          <circle cx="550" cy="305" r="5" fill="#0284c7" opacity="0.6" />
          <circle cx="780" cy="305" r="5" fill="#0284c7" opacity="0.6" />

          {/* Corridor Safety Signage Text */}
          <text x="450" y="310" fill="#334155" fontSize="12" fontWeight="bold" letterSpacing="4" textAnchor="middle">
            ◄ AUTOMATED GUIDED ROBOT (AGV) LOGISTICS CORRIDOR ►
          </text>

          {/* ================= ROOM 1: Examination & Triage ================= */}
          <g className="room-group">
            {/* Room Background */}
            <rect x="190" y="30" width="220" height="210" rx="8" fill="#111827" stroke="#374151" strokeWidth="2" />
            {/* Room Doorway Opening */}
            <rect x="270" y="238" width="60" height="5" fill="#0f172a" />
            <line x1="270" y1="240" x2="270" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="300" y="235" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">DOOR 101</text>

            {/* Room Label */}
            <rect x="200" y="40" width="110" height="24" rx="4" fill="#1e293b" />
            <text x="210" y="56" fill="#38bdf8" fontSize="11" fontWeight="700">ROOM 1</text>
            <text x="210" y="76" fill="#94a3b8" fontSize="9">Trauma & Triage</text>

            {/* Room Furniture silhouettes (Hospital Bed & Tray) */}
            <rect x="330" y="50" width="65" height="110" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <rect x="340" y="55" width="45" height="22" rx="4" fill="#374151" />
            {/* Medical Cross */}
            <path d="M 230 110 h 14 v -6 h 6 v 6 h 14 v 6 h -14 v 14 h -6 v -14 h -14 z" fill="rgba(239, 68, 68, 0.25)" />
            {/* Waste Collection Target Zone Decal */}
            <circle cx="300" cy="135" r="26" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="300" y="172" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="600">COLLECTION POINT 1</text>
          </g>

          {/* ================= ROOM 2: Inpatient Care ================= */}
          <g className="room-group">
            {/* Room Background */}
            <rect x="440" y="30" width="220" height="210" rx="8" fill="#111827" stroke="#374151" strokeWidth="2" />
            {/* Doorway */}
            <rect x="520" y="238" width="60" height="5" fill="#0f172a" />
            <line x1="520" y1="240" x2="520" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="550" y="235" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">DOOR 102</text>

            {/* Room Label */}
            <rect x="450" y="40" width="110" height="24" rx="4" fill="#1e293b" />
            <text x="460" y="56" fill="#38bdf8" fontSize="11" fontWeight="700">ROOM 2</text>
            <text x="460" y="76" fill="#94a3b8" fontSize="9">Wound Dressing Ward</text>

            {/* Room Furniture silhouettes */}
            <rect x="580" y="50" width="65" height="110" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <rect x="590" y="55" width="45" height="22" rx="4" fill="#374151" />
            {/* Dressing table */}
            <rect x="455" y="100" width="40" height="60" rx="3" fill="#1e293b" stroke="#334155" />
            {/* Waste Collection Target Zone Decal */}
            <circle cx="550" cy="135" r="26" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="550" y="172" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="600">COLLECTION POINT 2</text>
          </g>

          {/* ================= ROOM 3: Pharmacy & Dispensary ================= */}
          <g className="room-group">
            {/* Room Background */}
            <rect x="690" y="30" width="180" height="210" rx="8" fill="#111827" stroke="#374151" strokeWidth="2" />
            {/* Doorway */}
            <rect x="750" y="238" width="60" height="5" fill="#0f172a" />
            <line x1="750" y1="240" x2="750" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="780" y="235" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">DOOR 103</text>

            {/* Room Label */}
            <rect x="700" y="40" width="110" height="24" rx="4" fill="#1e293b" />
            <text x="710" y="56" fill="#38bdf8" fontSize="11" fontWeight="700">ROOM 3</text>
            <text x="710" y="76" fill="#94a3b8" fontSize="9">Pharmacy & Dispensing</text>

            {/* Pharmacy Dispensing Shelves */}
            <rect x="705" y="95" width="55" height="15" fill="#1e293b" stroke="#334155" />
            <rect x="705" y="125" width="55" height="15" fill="#1e293b" stroke="#334155" />
            <rect x="825" y="50" width="35" height="120" rx="4" fill="#1f2937" stroke="#374151" />
            {/* Waste Collection Target Zone Decal */}
            <circle cx="780" cy="135" r="26" fill="rgba(6, 182, 212, 0.08)" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="780" y="172" fill="#06b6d4" fontSize="8" textAnchor="middle" fontWeight="600">COLLECTION POINT 3</text>
          </g>

          {/* ================= CHARGING STATION / DOCKING BAY ================= */}
          <g className="dock-group">
            {/* Dock Area outline */}
            <rect x="40" y="390" width="140" height="135" rx="8" fill="#0a1820" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="110" cy="460" r="45" fill="url(#dockGlow)" />

            {/* Wireless Induction Charging Pads */}
            <rect x="75" y="425" width="70" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="110" cy="460" r="22" fill="none" stroke="#34d399" strokeWidth="2" />
            <circle cx="110" cy="460" r="12" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Dock Label */}
            <rect x="50" y="400" width="120" height="18" rx="3" fill="#065f46" />
            <text x="110" y="413" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              CHARGING STATION
            </text>
            <text x="110" y="515" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="600">
              DOCKING BAY A-01
            </text>
          </g>

          {/* ================= BIOHAZARD DEPOT / RECYCLING FACILITY ================= */}
          <g className="facility-group">
            <rect x="210" y="395" width="220" height="125" rx="8" fill="#131924" stroke="#334155" strokeWidth="1.5" />
            <text x="225" y="418" fill="#94a3b8" fontSize="10" fontWeight="bold" letterSpacing="1">
              CENTRAL WASTE PROCESSING DEPOT
            </text>
            {/* 4 CPCB Compartment Reception Slots */}
            <g transform="translate(216, 435)">
              {/* YELLOW */}
              <rect x="0" y="0" width="46" height="50" rx="4" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
              <text x="23" y="18" fill="#854d0e" fontSize="7" fontWeight="bold" textAnchor="middle">YELLOW</text>
              <text x="23" y="27" fill="#a16207" fontSize="6.5" textAnchor="middle">Soiled</text>
              <text x="23" y="43" fill="#ca8a04" fontSize="12" fontWeight="bold" textAnchor="middle">
                {compartments.yellow}
              </text>

              {/* RED */}
              <rect x="52" y="0" width="46" height="50" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="75" y="18" fill="#991b1b" fontSize="7" fontWeight="bold" textAnchor="middle">RED</text>
              <text x="75" y="27" fill="#b91c1c" fontSize="6.5" textAnchor="middle">Recycle</text>
              <text x="75" y="43" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">
                {compartments.red}
              </text>

              {/* WHITE */}
              <rect x="104" y="0" width="46" height="50" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="127" y="18" fill="#1e293b" fontSize="7" fontWeight="bold" textAnchor="middle">WHITE</text>
              <text x="127" y="27" fill="#475569" fontSize="6.5" textAnchor="middle">Sharps</text>
              <text x="127" y="43" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">
                {compartments.white}
              </text>

              {/* BLUE */}
              <rect x="156" y="0" width="46" height="50" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="179" y="18" fill="#1e40af" fontSize="7" fontWeight="bold" textAnchor="middle">BLUE</text>
              <text x="179" y="27" fill="#2563eb" fontSize="6.5" textAnchor="middle">Glass</text>
              <text x="179" y="43" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">
                {compartments.blue}
              </text>
            </g>
            <text x="320" y="505" fill="#64748b" fontSize="8" textAnchor="middle">
              CPCB Schedule I Reception &amp; Transfer Vault
            </text>
          </g>

          {/* ================= NURSE / TELEMETRY OPERATIONS ================= */}
          <g className="operations-group">
            <rect x="460" y="395" width="410" height="125" rx="8" fill="#131924" stroke="#334155" strokeWidth="1.5" />
            <text x="475" y="418" fill="#38bdf8" fontSize="10" fontWeight="bold" letterSpacing="1">
              CENTRAL TELEMETRY & ROBOTIC FLEET DISPATCH
            </text>

            {/* Monitor console representations */}
            <rect x="475" y="435" width="115" height="50" rx="4" fill="#0f172a" stroke="#1e293b" />
            <text x="485" y="452" fill="#64748b" fontSize="8">FLEET STATUS</text>
            <text x="485" y="470" fill={robotState === 'COMPLETED' ? '#10b981' : '#38bdf8'} fontSize="11" fontWeight="bold">
              {robotState}
            </text>

            <rect x="605" y="435" width="125" height="50" rx="4" fill="#0f172a" stroke="#1e293b" />
            <text x="615" y="452" fill="#64748b" fontSize="8">ROBOT COORDINATES</text>
            <text x="615" y="470" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
              X:{Math.round(robotPos.x)} Y:{Math.round(robotPos.y)}
            </text>

            <rect x="745" y="435" width="110" height="50" rx="4" fill="#0f172a" stroke="#1e293b" />
            <text x="755" y="452" fill="#64748b" fontSize="8">POWER LEVEL</text>
            <text x="755" y="470" fill="#10b981" fontSize="11" fontWeight="bold">
              {battery}% {robotPos.x === 110 && robotPos.y === 460 ? '(Charging)' : '(Active)'}
            </text>

            <text x="665" y="505" fill="#475569" fontSize="8" textAnchor="middle">
              MediTrack IoT Beacon Network • 2.4GHz Encrypted Mesh Link
            </text>
          </g>
        </svg>

        {/* 3 Waste Items (HTML/CSS overlays for rich animation) */}
        {wasteItems.map((item) => (
          <WasteItemVisual
            key={item.id}
            item={item}
            isCurrentTarget={item.id === currentTargetWasteId && !item.collected}
            robotPos={robotPos}
          />
        ))}

        {/* The MediTrack Robot Dynamic Position Container */}
        <div
          className="robot-world-position"
          style={{
            position: 'absolute',
            left: `${(robotPos.x / 900) * 100}%`,
            top: `${(robotPos.y / 540) * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.75s linear, top 0.75s linear',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <RobotVisual
            state={robotState}
            battery={battery}
            compartments={compartments}
            rotation={robotPos.rotation}
          />
        </div>
      </div>

      {/* Legend below the floor map */}
      <div className="map-legend-bar">
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#ef4444' }} />
          <span>Sharps Target (Room 1)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#f59e0b' }} />
          <span>Infectious Waste (Room 2)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#06b6d4' }} />
          <span>Recyclable Plastic (Room 3)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color-dot" style={{ backgroundColor: '#10b981' }} />
          <span>Auto-Charging Base</span>
        </div>
        <div className="legend-item">
          <span className="legend-track-line" />
          <span>Navigational AGV Track</span>
        </div>
      </div>
    </div>
  );
};
