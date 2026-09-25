import React from 'react';
import { RobotTechnicalDiagram } from '../components/RobotTechnicalDiagram';
import { Bot, Shield, Wrench, Layers } from 'lucide-react';

export const RobotPage: React.FC = () => {
  return (
    <div className="page-view robot-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">MECHANICAL &amp; ELECTRONICS SCHEMATIC</span>
        <h1 className="page-main-title">MEDiTRACK ROBOT CONCEPT</h1>
        <p className="page-intro-paragraph">
          Exploded 2D technical layout and CAD envelope designed for clinical indoor agility,
          puncture-proof containment, and zero-turn differential mobility.
        </p>
      </div>

      {/* Main Interactive Diagram & CAD Section */}
      <RobotTechnicalDiagram />

      {/* Engineering Design Requirements Summary */}
      <section className="robot-specs-summary-section">
        <h3 className="sub-section-title">Physical Engineering Constraints</h3>

        <div className="specs-summary-grid">
          <div className="summary-spec-card">
            <span className="spec-k-title">ENVELOPE DIMENSIONS</span>
            <span className="spec-v-value">680 × 520 × 780 mm</span>
            <p className="spec-subtext">Sized to pass standard hospital room doors and navigate between patient beds.</p>
          </div>

          <div className="summary-spec-card">
            <span className="spec-k-title">TOTAL COMPARTMENT VOLUME</span>
            <span className="spec-v-value">26 Litres Total</span>
            <p className="spec-subtext">8L Yellow + 8L Red + 5L White Sharps + 5L Blue Glassware chambers.</p>
          </div>

          <div className="summary-spec-card">
            <span className="spec-k-title">LOCOMOTION SYSTEM</span>
            <span className="spec-v-value">Differential 2-Wheel + 2 Casters</span>
            <p className="spec-subtext">Zero-radius pivot capability allows instantaneous 180° rotation in tight corridors.</p>
          </div>

          <div className="summary-spec-card">
            <span className="spec-k-title">CLEANABILITY &amp; STERILIZATION</span>
            <span className="spec-v-value">IP54 Clinical Enclosure</span>
            <p className="spec-subtext">Smooth antimicrobial exterior surfaces compatible with hospital isopropyl/bleach wipes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
