import React from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ShieldAlert,
  Flame,
  FileSpreadsheet,
  Clock,
  Layers,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { PageTab } from '../types';

interface ProblemPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const ProblemPage: React.FC<ProblemPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view problem-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">OPERATIONAL &amp; SAFETY ANALYSIS</span>
        <h1 className="page-main-title">THE PROBLEM</h1>
        <p className="page-intro-paragraph">
          Biomedical waste management in active clinical facilities relies heavily on manual touchpoints.
          This manual continuum introduces severe biological exposure risks, segregation non-compliance,
          and fragmented paper-based tracking.
        </p>
      </div>

      {/* Visual Current-Process Flow */}
      <section className="current-process-section">
        <h3 className="sub-section-title">Conventional Hospital Waste Logistics Flow</h3>
        <p className="sub-section-desc">
          Current operational pipeline observed in typical multi-specialty healthcare facilities:
        </p>

        <div className="vertical-process-flow">
          <div className="process-node">
            <span className="node-step">01</span>
            <div className="node-info">
              <span className="node-name">Healthcare Facility</span>
              <span className="node-sub">Inpatient wards, ICUs, trauma bays, and outpatient clinics</span>
            </div>
          </div>
          <ArrowDown className="process-arrow" size={20} />

          <div className="process-node">
            <span className="node-step">02</span>
            <div className="node-info">
              <span className="node-name">Waste Generation</span>
              <span className="node-sub">Syringes, dressings, IV sets, surgical blades, and vials generated</span>
            </div>
          </div>
          <ArrowDown className="process-arrow" size={20} />

          <div className="process-node alert-node">
            <span className="node-step">03</span>
            <div className="node-info">
              <span className="node-name">Manual Segregation</span>
              <span className="node-sub">Staff must manually decide colour bins during high-pressure clinical care</span>
            </div>
          </div>
          <ArrowDown className="process-arrow" size={20} />

          <div className="process-node alert-node">
            <span className="node-step">04</span>
            <div className="node-info">
              <span className="node-name">Manual Collection</span>
              <span className="node-sub">Sanitation personnel manually handle biohazard bags from bedside bins</span>
            </div>
          </div>
          <ArrowDown className="process-arrow" size={20} />

          <div className="process-node">
            <span className="node-step">05</span>
            <div className="node-info">
              <span className="node-name">Internal Transportation</span>
              <span className="node-sub">Manual carts wheeled through public corridors and passenger elevators</span>
            </div>
          </div>
          <ArrowDown className="process-arrow" size={20} />

          <div className="process-node">
            <span className="node-step">06</span>
            <div className="node-info">
              <span className="node-name">Treatment / Disposal</span>
              <span className="node-sub">Handover to Common Bio-medical Waste Treatment Facility (CBWTF)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Six Primary Challenges */}
      <section className="challenges-grid-section">
        <h3 className="sub-section-title">Critical Operational Challenges</h3>
        <p className="sub-section-desc">
          Documented systemic issues inherent to manual biomedical waste handling:
        </p>

        <div className="challenges-grid">
          {/* 1. Human Exposure */}
          <div className="challenge-card">
            <div className="challenge-icon-box red">
              <ShieldAlert size={22} />
            </div>
            <h4 className="challenge-title">Human Exposure</h4>
            <p className="challenge-text">
              Direct physical proximity to pathogens, infectious blood, and hazardous chemical residues
              increases occupational exposure risk for hospital cleaning staff and ward orderlies.
            </p>
          </div>

          {/* 2. Sharps Injury Risk */}
          <div className="challenge-card">
            <div className="challenge-icon-box amber">
              <Flame size={22} />
            </div>
            <h4 className="challenge-title">Sharps Injury Risk</h4>
            <p className="challenge-text">
              Needlestick and scalpel cuts remain among the most prevalent occupational accidents in hospitals,
              carrying severe transmission risks for bloodborne viral pathogens (HBV, HCV, HIV).
            </p>
          </div>

          {/* 3. Incorrect Segregation */}
          <div className="challenge-card">
            <div className="challenge-icon-box purple">
              <Layers size={22} />
            </div>
            <h4 className="challenge-title">Incorrect Segregation</h4>
            <p className="challenge-text">
              Under time pressure, hazardous sharps or soiled items inadvertently enter general or recyclable
              bins, contaminating recyclable plastic streams and violating statutory CPCB norms.
            </p>
          </div>

          {/* 4. Manual Handling */}
          <div className="challenge-card">
            <div className="challenge-icon-box orange">
              <AlertTriangle size={22} />
            </div>
            <h4 className="challenge-title">Manual Handling</h4>
            <p className="challenge-text">
              Carrying and lifting heavy, unsealed biohazard bags increases the danger of accidental bag tears,
              chemical spillage, and aerosol generation in patient recovery areas.
            </p>
          </div>

          {/* 5. Limited Traceability */}
          <div className="challenge-card">
            <div className="challenge-icon-box blue">
              <FileSpreadsheet size={22} />
            </div>
            <h4 className="challenge-title">Limited Traceability</h4>
            <p className="challenge-text">
              Conventional pen-and-paper or manual barcode logging leaves significant temporal gaps between
              bedside waste generation and centralized storage entry, impairing chain-of-custody audits.
            </p>
          </div>

          {/* 6. Operational Inefficiency */}
          <div className="challenge-card">
            <div className="challenge-icon-box slate">
              <Clock size={22} />
            </div>
            <h4 className="challenge-title">Operational Inefficiency</h4>
            <p className="challenge-text">
              Scheduled manual trolley collection rounds tie up healthcare housekeeping staff in routine logistics,
              diverting valuable personnel hours away from environmental terminal cleaning.
            </p>
          </div>
        </div>
      </section>

      {/* Why Automation Section: Factual Comparative Flow */}
      <section className="why-automation-section">
        <h3 className="sub-section-title">Why Automation? (Factual Engineering Comparison)</h3>
        <p className="sub-section-desc">
          Comparing the conventional manual chain against the proposed MediTrack autonomous mobile architecture:
        </p>

        <div className="comparison-columns-grid">
          {/* Left Column: Manual Pathway */}
          <div className="comparison-column manual-column">
            <div className="column-header">
              <span className="col-tag error">CONVENTIONAL MANUAL PROCESS</span>
              <h4 className="col-title">Manual Logistics Chain</h4>
            </div>

            <div className="flow-chain-vertical">
              <div className="chain-node">
                <span className="chain-text">Manual Handling</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node">
                <span className="chain-text">Increased Human Interaction</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node alert">
                <span className="chain-text">Safety &amp; Operational Challenges</span>
              </div>
            </div>

            <div className="column-summary-box">
              <p>
                <strong>Outcome:</strong> Ongoing occupational exposure, high reliance on manual human vigilance,
                and latent risk of regulatory non-compliance during peak patient turnover.
              </p>
            </div>
          </div>

          {/* Right Column: MediTrack Automated Pathway */}
          <div className="comparison-column meditrack-column">
            <div className="column-header">
              <span className="col-tag success">PROPOSED MEDiTRACK ARCHITECTURE</span>
              <h4 className="col-title">Autonomous Closed-Loop Model</h4>
            </div>

            <div className="flow-chain-vertical">
              <div className="chain-node highlight">
                <span className="chain-text">MediTrack Platform</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node">
                <span className="chain-text">Autonomous Collection</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node">
                <span className="chain-text">AI-Assisted Classification</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node">
                <span className="chain-text">Controlled Segregation</span>
              </div>
              <ArrowDown size={16} className="chain-arrow" />

              <div className="chain-node verified">
                <span className="chain-text">Digital Tracking</span>
              </div>
            </div>

            <div className="column-summary-box verified">
              <p>
                <strong>Potential Benefits:</strong> Reduced direct physical handling, systematic multi-compartment
                containment, and immutable electronic logging at the point of waste pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Factual Integrity Banner */}
        <div className="factual-disclaimer-box">
          <p>
            <strong>Engineering Rigor Note:</strong> MediTrack is presented as an engineering concept to mitigate
            identifiable manual bottlenecks. It does not claim to "eliminate all human risk", but rather to
            significantly reduce routine direct contact through structured automation and digital oversight.
          </p>
        </div>
      </section>
    </div>
  );
};
