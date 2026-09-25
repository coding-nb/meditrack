import React from 'react';
import {
  Database,
  ArrowRight,
  Battery,
  MapPin,
  Activity,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import type { CompartmentTally } from '../types';

interface TrackingPageProps {
  compartments: CompartmentTally;
  totalCollected: number;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
  compartments,
  totalCollected,
}) => {
  // Sample realistic audit events conforming to the user specification
  const auditTimeline = [
    { time: '10:02:11', event: 'Robot started mission', state: 'NAVIGATING', loc: 'Docking Bay A-01', cat: '-' },
    { time: '10:02:18', event: 'Reached Room 1 (Trauma & Triage)', state: 'NAVIGATING', loc: 'Room 1 Entrance', cat: '-' },
    { time: '10:02:20', event: 'Waste detected: 5ml Syringe with needle', state: 'DETECTING', loc: 'Room 1 Bay 1', cat: '-' },
    { time: '10:02:21', event: 'Classified → WHITE (Waste Sharps 96% conf)', state: 'CLASSIFYING', loc: 'Room 1 Bay 1', cat: 'WHITE' },
    { time: '10:02:24', event: 'Waste collected via contactless intake', state: 'COLLECTING', loc: 'Room 1 Bay 1', cat: 'WHITE' },
    { time: '10:02:27', event: 'Waste segregated into internal WHITE chamber', state: 'SEGREGATING', loc: 'Room 1 Bay 1', cat: 'WHITE' },
    { time: '10:02:28', event: 'Digital record updated & telemetry synced', state: 'TRACKING', loc: 'Room 1 Bay 1', cat: 'WHITE' },
    { time: '10:03:05', event: 'Reached Room 2 (Wound Dressing Ward)', state: 'NAVIGATING', loc: 'Room 2 Entrance', cat: '-' },
    { time: '10:03:12', event: 'Waste detected: Blood-soiled gauze swab', state: 'DETECTING', loc: 'Room 2 Bed 4', cat: '-' },
    { time: '10:03:14', event: 'Classified → YELLOW (Soiled Waste 94% conf)', state: 'CLASSIFYING', loc: 'Room 2 Bed 4', cat: 'YELLOW' },
    { time: '10:03:18', event: 'Waste segregated into internal YELLOW chamber', state: 'SEGREGATING', loc: 'Room 2 Bed 4', cat: 'YELLOW' },
    { time: '10:03:20', event: 'Digital record updated & telemetry synced', state: 'TRACKING', loc: 'Room 2 Bed 4', cat: 'YELLOW' },
  ];

  return (
    <div className="page-view tracking-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">CHAIN-OF-CUSTODY AUDIT DASHBOARD</span>
        <h1 className="page-main-title">MEDiTRACK LIVE TRACKING</h1>
        <p className="page-intro-paragraph">
          Demonstrating digital traceability from the bedside point of waste generation to central
          depot transfer, ensuring verifiable compliance with CPCB biomedical waste accounting.
        </p>
      </div>

      {/* Main KPI Dashboard Grid */}
      <section className="tracking-kpi-grid">
        <div className="track-kpi-card">
          <div className="track-icon-box bg-emerald">
            <Activity size={20} className="text-emerald" />
          </div>
          <div className="track-info">
            <span className="track-k">ROBOT STATUS</span>
            <span className="track-v text-emerald">ACTIVE</span>
            <span className="track-sub">Encrypted 2.4GHz Mesh</span>
          </div>
        </div>

        <div className="track-kpi-card">
          <div className="track-icon-box bg-blue">
            <Battery size={20} className="text-blue" />
          </div>
          <div className="track-info">
            <span className="track-k">BATTERY LEVEL</span>
            <span className="track-v">82%</span>
            <span className="track-sub">Est. 4.8h Remaining</span>
          </div>
        </div>

        <div className="track-kpi-card">
          <div className="track-icon-box bg-cyan">
            <MapPin size={20} className="text-cyan" />
          </div>
          <div className="track-info">
            <span className="track-k">CURRENT LOCATION</span>
            <span className="track-v text-cyan">ROOM 2</span>
            <span className="track-sub">Wound Dressing Ward</span>
          </div>
        </div>

        <div className="track-kpi-card">
          <div className="track-icon-box bg-purple">
            <Layers size={20} className="text-purple" />
          </div>
          <div className="track-info">
            <span className="track-k">TOTAL WASTE COLLECTED</span>
            <span className="track-v">07 Items</span>
            <span className="track-sub">Duty Cycle A-102</span>
          </div>
        </div>
      </section>

      {/* CPCB Category Counters */}
      <section className="cpcb-counters-section">
        <h3 className="sub-section-title">CPCB Category Segregation Tally</h3>
        <div className="cpcb-tallies-grid">
          <div className="tally-box yellow">
            <div className="tally-top">
              <span className="tally-code">YELLOW</span>
              <span className="tally-count">02</span>
            </div>
            <span className="tally-name">Soiled &amp; Anatomical Waste</span>
            <span className="tally-bin">Yellow Biohazard Bag</span>
          </div>

          <div className="tally-box red">
            <div className="tally-top">
              <span className="tally-code">RED</span>
              <span className="tally-count">02</span>
            </div>
            <span className="tally-name">Contaminated Recyclable Plastics</span>
            <span className="tally-bin">Red Recyclable Bin</span>
          </div>

          <div className="tally-box white">
            <div className="tally-top">
              <span className="tally-code">WHITE</span>
              <span className="tally-count">02</span>
            </div>
            <span className="tally-name">Waste Sharps (Needles &amp; Scalpels)</span>
            <span className="tally-bin">Puncture-Proof Container</span>
          </div>

          <div className="tally-box blue">
            <div className="tally-top">
              <span className="tally-code">BLUE</span>
              <span className="tally-count">01</span>
            </div>
            <span className="tally-name">Glassware &amp; Metal Implants</span>
            <span className="tally-bin">Rigid Blue Glass Box</span>
          </div>
        </div>
      </section>

      {/* DIGITAL TRACEABILITY FLOW DIAGRAM */}
      <section className="traceability-flow-section">
        <div className="section-header-compact">
          <span className="section-super-title">CHAIN-OF-CUSTODY MODEL</span>
          <h2 className="section-main-title">Digital Traceability Flow</h2>
          <p className="section-desc">
            How each disposable item transitions from optical registration to an indelible compliance record:
          </p>
        </div>

        <div className="trace-flow-strip">
          <div className="trace-pill">Detection</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill">Classification</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill">Collection</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill">Segregation</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill highlight">Timestamp</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill highlight">Location</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill highlight">Category</div>
          <span className="trace-arrow">→</span>
          <div className="trace-pill verified">Digital Record</div>
        </div>

        <div className="trace-notice-box">
          <AlertCircle size={16} />
          <span>
            <strong>Simulation Note:</strong> "The simulation demonstrates the proposed traceability model."
            Real hospital electronic health records (EHR) and centralized CBWTF barcode systems are simulated
            through local telemetry state.
          </span>
        </div>
      </section>

      {/* Chronological Event Timeline Table */}
      <section className="timeline-table-section">
        <h3 className="sub-section-title">Telemetry Event Audit Log</h3>

        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Timestamp</th>
                <th style={{ width: '15%' }}>State Machine</th>
                <th style={{ width: '40%' }}>Event Description</th>
                <th style={{ width: '18%' }}>Location</th>
                <th style={{ width: '12%' }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {auditTimeline.map((item, idx) => (
                <tr key={idx}>
                  <td className="time-cell">{item.time}</td>
                  <td>
                    <span className={`state-badge-small ${item.state.toLowerCase()}`}>{item.state}</span>
                  </td>
                  <td className="desc-cell">{item.event}</td>
                  <td className="loc-cell">{item.loc}</td>
                  <td>
                    {item.cat !== '-' ? (
                      <span className={`cat-pill-small ${item.cat.toLowerCase()}`}>{item.cat}</span>
                    ) : (
                      <span className="na-text">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
