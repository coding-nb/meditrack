import React, { useState } from 'react';
import { CPCB_CATEGORIES } from '../data/cpcbData';
import type { CpcbCategory } from '../types';
import { ShieldCheck, Info, Package, AlertOctagon } from 'lucide-react';

export const WasteClassificationPage: React.FC = () => {
  const [selectedCatCode, setSelectedCatCode] = useState<CpcbCategory>('YELLOW');

  const selectedCat = CPCB_CATEGORIES.find((c) => c.code === selectedCatCode) || CPCB_CATEGORIES[0];

  return (
    <div className="page-view classification-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">REGULATORY TAXONOMY • INDIA CPCB</span>
        <h1 className="page-main-title">BIOMEDICAL WASTE CLASSIFICATION</h1>
        <p className="page-intro-paragraph">
          India's Biomedical Waste Management Rules (Schedule I) establish a mandatory four-colour
          segregation regime. Click each category below to review prescribed waste streams, approved
          containers, and official treatment guidelines.
        </p>
      </div>

      {/* 4 Category Selector Cards */}
      <div className="category-selection-grid">
        {CPCB_CATEGORIES.map((cat) => {
          const isSelected = cat.code === selectedCatCode;
          return (
            <div
              key={cat.code}
              className={`cpcb-selector-card ${isSelected ? 'selected' : ''}`}
              style={{
                borderColor: isSelected ? cat.badgeBorder : '#e2e8f0',
                backgroundColor: isSelected ? cat.badgeBg : '#ffffff',
              }}
              onClick={() => setSelectedCatCode(cat.code)}
            >
              <div className="card-top-indicator">
                <span className="color-swatch-dot" style={{ backgroundColor: cat.colorHex }} />
                <span className="cat-code-name" style={{ color: cat.badgeText }}>
                  {cat.code}
                </span>
              </div>
              <h4 className="card-cat-title" style={{ color: cat.badgeText }}>
                {cat.name.split('—')[1] || cat.name}
              </h4>
              <p className="card-brief-container">{cat.container.split('(')[0]}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Category Inspector */}
      <section className="category-detail-panel">
        <div
          className="detail-panel-banner"
          style={{
            backgroundColor: selectedCat.badgeBg,
            borderColor: selectedCat.badgeBorder,
          }}
        >
          <div className="banner-left">
            <span
              className="cpcb-tag-pill"
              style={{
                backgroundColor: selectedCat.colorHex,
                color: '#ffffff',
              }}
            >
              {selectedCat.code} CATEGORY
            </span>
            <h2 className="banner-title" style={{ color: selectedCat.badgeText }}>
              {selectedCat.name}
            </h2>
          </div>
          <span className="statutory-ref">{selectedCat.cpcbRuleReference}</span>
        </div>

        <div className="detail-panel-body-grid">
          {/* Box 1: Container Specification */}
          <div className="detail-info-box">
            <div className="box-title-row">
              <Package size={18} className="text-cyan" />
              <h4 className="box-title">Prescribed Container &amp; Bagging</h4>
            </div>
            <p className="box-content-highlight">{selectedCat.container}</p>
            <p className="box-sub-note">
              Non-chlorinated plastic bags or rigid puncture-proof bins must display statutory biohazard symbols.
            </p>
          </div>

          {/* Box 2: Treatment & Disposal Guidelines */}
          <div className="detail-info-box">
            <div className="box-title-row">
              <ShieldCheck size={18} className="text-emerald" />
              <h4 className="box-title">Prescribed Treatment / Handling Note</h4>
            </div>
            <p className="box-content-highlight">{selectedCat.treatmentNote}</p>
            <p className="box-sub-note">
              Handled strictly through authorized Common Bio-medical Waste Treatment Facilities (CBWTF).
            </p>
          </div>
        </div>

        {/* Permitted Waste Streams List */}
        <div className="waste-streams-card">
          <h4 className="streams-card-title">Permitted Waste Streams in {selectedCat.code}:</h4>
          <div className="streams-list-grid">
            {selectedCat.wasteTypes.map((item, idx) => (
              <div key={idx} className="stream-item-row">
                <span className="stream-bullet" style={{ backgroundColor: selectedCat.colorHex }} />
                <span className="stream-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Integrity Note */}
        <div className="classification-disclaimer">
          <Info size={16} />
          <span>
            <strong>Statutory Adherence Note:</strong> Categorization strictly reflects CPCB Guidelines
            (Schedule I - Part 1). MediTrack's classification layer is programmed to validate only against
            these official streams without inventing unsupported ad-hoc categories.
          </span>
        </div>
      </section>
    </div>
  );
};
