import React from 'react';
import type { RobotState, CompartmentTally } from '../types';

interface RobotVisualProps {
  state: RobotState;
  battery: number;
  compartments: CompartmentTally;
  rotation: number;
}

export const RobotVisual: React.FC<RobotVisualProps> = ({
  state,
  battery,
  compartments,
  rotation,
}) => {
  const isDetecting = state === 'DETECTING' || state === 'CLASSIFYING';
  const isCollecting = state === 'COLLECTING' || state === 'SEGREGATING';

  // Battery color
  const batteryColor =
    battery > 50 ? '#10b981' : battery > 20 ? '#f59e0b' : '#ef4444';

  return (
    <div
      className="meditrack-robot-container"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.4s ease-out',
        width: '68px',
        height: '80px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Front LiDAR/Sensor Scanning Cone when detecting or classifying */}
      {isDetecting && (
        <div className="robot-sensor-cone">
          <svg
            viewBox="0 0 120 100"
            className="sensor-cone-svg"
            style={{
              position: 'absolute',
              top: '-90px',
              left: '-26px',
              width: '120px',
              height: '100px',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="scanGradient" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon
              points="60,95 10,10 110,10"
              fill="url(#scanGradient)"
              className="radar-cone-pulse"
            />
            {/* Radar arc wave rings */}
            <path
              d="M 25,35 A 45,45 0 0,1 95,35"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="radar-wave-1"
            />
            <path
              d="M 38,60 A 25,25 0 0,1 82,60"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              className="radar-wave-2"
            />
            <circle cx="60" cy="12" r="3" fill="#0284c7" className="laser-dot" />
          </svg>
        </div>
      )}

      {/* Arm extension/intake beam during collection */}
      {isCollecting && (
        <div className="robot-intake-effect">
          <div className="intake-beam" />
        </div>
      )}

      {/* SVG Robot Chassis */}
      <svg
        viewBox="0 0 68 80"
        width="68"
        height="80"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.45))' }}
      >
        <defs>
          <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Drive Wheel */}
        <rect x="0" y="18" width="6" height="46" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1" />
        <line x1="1" y1="26" x2="5" y2="26" stroke="#64748b" strokeWidth="1.5" />
        <line x1="1" y1="41" x2="5" y2="41" stroke="#64748b" strokeWidth="1.5" />
        <line x1="1" y1="56" x2="5" y2="56" stroke="#64748b" strokeWidth="1.5" />

        {/* Right Drive Wheel */}
        <rect x="62" y="18" width="6" height="46" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1" />
        <line x1="63" y1="26" x2="67" y2="26" stroke="#64748b" strokeWidth="1.5" />
        <line x1="63" y1="41" x2="67" y2="41" stroke="#64748b" strokeWidth="1.5" />
        <line x1="63" y1="56" x2="67" y2="56" stroke="#64748b" strokeWidth="1.5" />

        {/* Main Body Chassis */}
        <rect
          x="5"
          y="6"
          width="58"
          height="68"
          rx="10"
          fill="url(#chassisGrad)"
          stroke="#0284c7"
          strokeWidth="1.5"
        />

        {/* Front Bumper & Sensor Pod */}
        <path
          d="M 18,6 Q 34,-1 50,6"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Front Camera & LiDAR Sensor Eye */}
        <rect x="27" y="4" width="14" height="6" rx="3" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
        <circle
          cx="34"
          cy="7"
          r="2.5"
          fill={isDetecting ? '#38bdf8' : '#0284c7'}
          filter={isDetecting ? 'url(#glow)' : undefined}
        />
        <circle cx="34" cy="7" r="1" fill="#ffffff" />

        {/* Top Trim Header / Brand */}
        <rect x="10" y="14" width="48" height="8" rx="2" fill="url(#panelGrad)" />
        <text
          x="34"
          y="20"
          fontSize="5.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
          fill="#38bdf8"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          MEDiTRACK
        </text>

        {/* Battery Indicator Bar */}
        <rect x="12" y="24" width="44" height="4" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
        <rect
          x="13"
          y="25"
          width={Math.max(2, (42 * battery) / 100)}
          height="2"
          rx="1"
          fill={batteryColor}
        />

        {/* FOUR INTERNAL CPCB COMPARTMENTS PANEL */}
        <rect x="8" y="31" width="52" height="35" rx="3" fill="#090d16" stroke="#1e293b" strokeWidth="1" />

        {/* Bin 1: YELLOW (Soiled) */}
        <rect
          x="10"
          y="33"
          width="11.5"
          height="31"
          rx="2"
          fill={compartments.yellow > 0 ? '#ca8a04' : '#1e1c10'}
          stroke="#eab308"
          strokeWidth={compartments.yellow > 0 ? '1.2' : '0.6'}
        />
        <text x="15.7" y="40" fontSize="4.5" fill="#eab308" textAnchor="middle" fontWeight="bold">
          Y
        </text>
        <rect
          x="12"
          y="43"
          width="7.5"
          height="19"
          rx="1"
          fill={compartments.yellow > 0 ? '#ca8a04' : '#27272a'}
          opacity={compartments.yellow > 0 ? 0.95 : 0.3}
        />
        {compartments.yellow > 0 && (
          <text x="15.7" y="55" fontSize="6.5" fill="#ffffff" textAnchor="middle" fontWeight="bold">
            {compartments.yellow}
          </text>
        )}

        {/* Bin 2: RED (Contaminated Recyclable) */}
        <rect
          x="23"
          y="33"
          width="11.5"
          height="31"
          rx="2"
          fill={compartments.red > 0 ? '#dc2626' : '#1e1111'}
          stroke="#ef4444"
          strokeWidth={compartments.red > 0 ? '1.2' : '0.6'}
        />
        <text x="28.7" y="40" fontSize="4.5" fill="#ef4444" textAnchor="middle" fontWeight="bold">
          R
        </text>
        <rect
          x="25"
          y="43"
          width="7.5"
          height="19"
          rx="1"
          fill={compartments.red > 0 ? '#dc2626' : '#27272a'}
          opacity={compartments.red > 0 ? 0.95 : 0.3}
        />
        {compartments.red > 0 && (
          <text x="28.7" y="55" fontSize="6.5" fill="#ffffff" textAnchor="middle" fontWeight="bold">
            {compartments.red}
          </text>
        )}

        {/* Bin 3: WHITE (Sharps) */}
        <rect
          x="36"
          y="33"
          width="11.5"
          height="31"
          rx="2"
          fill={compartments.white > 0 ? '#475569' : '#181b20'}
          stroke="#cbd5e1"
          strokeWidth={compartments.white > 0 ? '1.2' : '0.6'}
        />
        <text x="41.7" y="40" fontSize="4.5" fill="#cbd5e1" textAnchor="middle" fontWeight="bold">
          W
        </text>
        <rect
          x="38"
          y="43"
          width="7.5"
          height="19"
          rx="1"
          fill={compartments.white > 0 ? '#cbd5e1' : '#27272a'}
          opacity={compartments.white > 0 ? 0.95 : 0.3}
        />
        {compartments.white > 0 && (
          <text x="41.7" y="55" fontSize="6.5" fill="#0f172a" textAnchor="middle" fontWeight="bold">
            {compartments.white}
          </text>
        )}

        {/* Bin 4: BLUE (Glassware) */}
        <rect
          x="49"
          y="33"
          width="11.5"
          height="31"
          rx="2"
          fill={compartments.blue > 0 ? '#2563eb' : '#0e1828'}
          stroke="#3b82f6"
          strokeWidth={compartments.blue > 0 ? '1.2' : '0.6'}
        />
        <text x="54.7" y="40" fontSize="4.5" fill="#3b82f6" textAnchor="middle" fontWeight="bold">
          B
        </text>
        <rect
          x="51"
          y="43"
          width="7.5"
          height="19"
          rx="1"
          fill={compartments.blue > 0 ? '#2563eb' : '#27272a'}
          opacity={compartments.blue > 0 ? 0.95 : 0.3}
        />
        {compartments.blue > 0 && (
          <text x="54.7" y="55" fontSize="6.5" fill="#ffffff" textAnchor="middle" fontWeight="bold">
            {compartments.blue}
          </text>
        )}

        {/* Rear Status LED */}
        <circle
          cx="34"
          cy="72"
          r="2"
          fill={
            state === 'COMPLETED'
              ? '#10b981'
              : state === 'NAVIGATING' || state === 'RETURNING'
              ? '#38bdf8'
              : state === 'DETECTING' || state === 'CLASSIFYING'
              ? '#a855f7'
              : state === 'COLLECTING' || state === 'SEGREGATING'
              ? '#f59e0b'
              : '#64748b'
          }
        />
      </svg>
    </div>
  );
};
