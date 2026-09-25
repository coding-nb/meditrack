import React from 'react';
import type { WasteItem } from '../types';

interface WasteItemVisualProps {
  item: WasteItem;
  isCurrentTarget: boolean;
  robotPos: { x: number; y: number };
}

export const WasteItemVisual: React.FC<WasteItemVisualProps> = ({
  item,
  isCurrentTarget,
}) => {
  if (item.collected) return null;

  return (
    <div
      className={`waste-item-anchor ${item.beingCollected ? 'collecting-anim' : ''} ${
        isCurrentTarget ? 'target-active' : ''
      }`}
      style={{
        left: `${(item.position.x / 900) * 100}%`,
        top: `${(item.position.y / 540) * 100}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 15,
        pointerEvents: 'none',
      }}
    >
      {/* Target Reticle Radar Rings when targeted */}
      {isCurrentTarget && (
        <div className="target-reticle">
          <div className="reticle-ring pulse-ring" style={{ borderColor: item.color }} />
          <div className="reticle-crosshair-h" />
          <div className="reticle-crosshair-v" />
          <div className="reticle-tag" style={{ backgroundColor: item.color }}>
            TARGET LOCK
          </div>
        </div>
      )}

      {/* Waste Graphic Container */}
      <div
        className="waste-graphic-box"
        style={{
          border: `1.5px solid ${item.color}`,
          background: item.badgeBg,
          boxShadow: isCurrentTarget
            ? `0 0 16px ${item.color}88, inset 0 0 8px ${item.color}44`
            : `0 2px 8px rgba(0, 0, 0, 0.4)`,
        }}
      >
        {item.iconName === 'syringe' && (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={item.color} strokeWidth="2">
            {/* Syringe SVG */}
            <path d="m18 2 4 4" strokeLinecap="round" />
            <path d="m17 7 3-3" strokeLinecap="round" />
            <path d="M19 9 8.7 19.3c-.4.4-1 .6-1.6.6H3v-4.1c0-.6.2-1.2.6-1.6L15 4" />
            <path d="m9 11 4 4" />
            <path d="m5 19-3 3" strokeLinecap="round" />
            <line x1="14" y1="6" x2="18" y2="10" strokeLinecap="round" />
          </svg>
        )}

        {item.iconName === 'bandage' && (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={item.color} strokeWidth="2">
            {/* Bandage SVG */}
            <rect x="4" y="4" width="16" height="16" rx="3" transform="rotate(45 12 12)" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.5" fill={item.color} />
            <circle cx="9" cy="9" r="1" fill={item.color} />
            <circle cx="15" cy="15" r="1" fill={item.color} />
            <circle cx="15" cy="9" r="1" fill={item.color} />
            <circle cx="9" cy="15" r="1" fill={item.color} />
          </svg>
        )}

        {item.iconName === 'bottle' && (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={item.color} strokeWidth="2">
            {/* Plastic Medicine Bottle */}
            <rect x="7" y="7" width="10" height="14" rx="2" strokeLinecap="round" />
            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            <line x1="12" y1="11" x2="12" y2="17" strokeLinecap="round" />
            <line x1="9" y1="14" x2="15" y2="14" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Floating Label */}
      <div className="waste-floating-label">
        <span className="waste-name">{item.name}</span>
        <span className="waste-category-pill" style={{ color: item.color }}>
          {item.category}
        </span>
      </div>
    </div>
  );
};
