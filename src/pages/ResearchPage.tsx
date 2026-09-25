import React from 'react';
import {
  ExternalLink,
  BookOpen,
  ArrowDown,
  Layers,
  CheckCircle,
  AlertCircle,
  FileText,
  Shield,
} from 'lucide-react';
import { RESEARCH_SOURCES } from '../data/researchData';
import { CPCB_CATEGORIES } from '../data/cpcbData';

export const ResearchPage: React.FC = () => {
  return (
    <div className="page-view research-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">ACADEMIC &amp; REGULATORY GROUNDING</span>
        <h1 className="page-main-title">RESEARCH FOUNDATION</h1>
        <p className="page-intro-paragraph">
          MediTrack's engineering architecture is not arbitrary. It is rigorously derived from official
          World Health Organization safety data, statutory Central Pollution Control Board (CPCB) mandates,
          and peer-reviewed research on automated biomedical waste cyber-physical systems.
        </p>
      </div>

      {/* Four Research Cards */}
      <section className="research-cards-grid">
        {RESEARCH_SOURCES.map((source) => (
          <div key={source.id} className="research-source-card">
            <div className="res-card-top">
              <span className="res-code-badge">{source.code}</span>
              <span className="res-year-badge">{source.year}</span>
            </div>

            <h3 className="res-title">{source.title}</h3>
            <span className="res-org">{source.organization}</span>

            <div className="res-points-list">
              <span className="points-label">Core Evidence &amp; Findings:</span>
              <ul>
                {source.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="res-relevance-box">
              <span className="rel-label">Direct Relevance to MediTrack:</span>
              <p className="rel-text">{source.relevance}</p>
            </div>

            {source.warningNote && (
              <div className="res-warning-callout">
                <AlertCircle size={14} className="warning-icon" />
                <span>{source.warningNote}</span>
              </div>
            )}

            <div className="res-footer-bar">
              <a
                href={source.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-source"
              >
                <span>View Official Source</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* CPCB Visual Table */}
      <section className="cpcb-table-section">
        <div className="section-header-compact">
          <span className="section-super-title">STATUTORY STANDARD TABLE</span>
          <h2 className="section-main-title">CPCB 4-Colour Category Framework (Schedule I)</h2>
          <p className="section-desc">
            Directly mapped to the four internal compartments of the MediTrack robot chassis:
          </p>
        </div>

        <div className="cpcb-table-container">
          <table className="cpcb-formal-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Category Code</th>
                <th style={{ width: '25%' }}>Designated Container Type</th>
                <th style={{ width: '35%' }}>Permitted Waste Streams</th>
                <th style={{ width: '25%' }}>Prescribed Treatment / Disposal</th>
              </tr>
            </thead>
            <tbody>
              {CPCB_CATEGORIES.map((cat) => (
                <tr key={cat.code}>
                  <td className="cat-cell">
                    <div className="cat-code-badge" style={{ backgroundColor: cat.badgeBg, borderColor: cat.badgeBorder, color: cat.badgeText }}>
                      <span className="code-dot" style={{ backgroundColor: cat.colorHex }} />
                      <strong>{cat.code}</strong>
                    </div>
                  </td>
                  <td className="container-cell">
                    <strong>{cat.container}</strong>
                  </td>
                  <td className="types-cell">
                    <ul className="waste-type-list">
                      {cat.wasteTypes.slice(0, 3).map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="treatment-cell">
                    <span>{cat.treatmentNote}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RESEARCH -> DESIGN CONNECTION SECTION */}
      <section className="research-design-connection-section">
        <div className="section-header-compact">
          <span className="section-super-title">METHODOLOGICAL LINEAGE</span>
          <h2 className="section-main-title">Research → Engineering Design Connection</h2>
          <p className="section-desc">
            Demonstrating how statutory and academic inputs translate directly into engineering specifications
            and simulation validation:
          </p>
        </div>

        <div className="lineage-flow-card">
          {/* Stage 1: Research Foundations */}
          <div className="lineage-tier tier-research">
            <div className="tier-header">
              <span className="tier-tag">STEP 1: PRIMARY RESEARCH FOUNDATIONS</span>
            </div>
            <div className="tier-nodes-row">
              <div className="lineage-node">
                <span className="node-head">WHO GUIDELINES</span>
                <span className="node-body">15% Hazardous Fraction &amp; Needlestick Infection Risks</span>
              </div>
              <div className="tier-plus">+</div>
              <div className="lineage-node">
                <span className="node-head">CPCB BMWM RULES</span>
                <span className="node-body">Statutory 4-Colour Compartment Taxonomy (Y, R, W, B)</span>
              </div>
              <div className="tier-plus">+</div>
              <div className="lineage-node">
                <span className="node-head">CIRP 2026 AI RESEARCH</span>
                <span className="node-body">Cyber-Physical Vision &amp; Classification Layers</span>
              </div>
            </div>
          </div>

          <div className="lineage-connector">
            <ArrowDown size={28} className="connector-icon" />
            <span className="connector-label">Informs Engineering Design Specifications</span>
          </div>

          {/* Stage 2: Engineering Design */}
          <div className="lineage-tier tier-engineering">
            <div className="tier-header">
              <span className="tier-tag">STEP 2: MEDiTRACK ENGINEERING DESIGN</span>
            </div>
            <div className="tier-nodes-row">
              <div className="lineage-node eng">
                <span className="node-head">FOUR INTERNAL COMPARTMENTS</span>
                <span className="node-body">Isolated 8L/5L chambers eliminating manual re-sorting</span>
              </div>
              <div className="lineage-node eng">
                <span className="node-head">AI VISION PERCEPTION</span>
                <span className="node-body">Synthetic classification pipeline with confidence scoring</span>
              </div>
              <div className="lineage-node eng">
                <span className="node-head">AUTONOMOUS INDOOR MOBILITY</span>
                <span className="node-body">Compact zero-turn differential drive with docking station</span>
              </div>
              <div className="lineage-node eng">
                <span className="node-head">DIGITAL TRACKING</span>
                <span className="node-body">Immutable electronic logging at point of generation</span>
              </div>
            </div>
          </div>

          <div className="lineage-connector">
            <ArrowDown size={28} className="connector-icon" />
            <span className="connector-label">Validated through Digital Prototype</span>
          </div>

          {/* Stage 3: Digital Simulation */}
          <div className="lineage-tier tier-simulation">
            <div className="tier-header">
              <span className="tier-tag">STEP 3: END-TO-END SIMULATION PROTOTYPE</span>
            </div>
            <div className="tier-nodes-row">
              <div className="lineage-pill">DETECT</div>
              <div className="tier-arrow">→</div>
              <div className="lineage-pill">CLASSIFY</div>
              <div className="tier-arrow">→</div>
              <div className="lineage-pill">COLLECT</div>
              <div className="tier-arrow">→</div>
              <div className="lineage-pill">SEGREGATE</div>
              <div className="tier-arrow">→</div>
              <div className="lineage-pill">TRACK</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
