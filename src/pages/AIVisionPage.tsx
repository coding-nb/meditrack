import React from 'react';
import { AIVisionTester } from '../components/AIVisionTester';
import {
  ArrowDown,
  Eye,
  Camera,
  Image,
  Cpu,
  BookmarkCheck,
  Layers,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const AIVisionPage: React.FC = () => {
  return (
    <div className="page-view ai-vision-page">
      {/* Page Header */}
      <div className="page-header-block">
        <span className="page-badge">PERCEPTION &amp; INFERENCE PIPELINE</span>
        <h1 className="page-main-title">AI-ASSISTED VISION</h1>
        <p className="page-intro-paragraph">
          The proposed perception subsystem utilizes an optical camera and simulated machine-learning
          inference to classify biomedical waste disposables into statutory CPCB streams before mechanical intake.
        </p>
      </div>

      {/* Main Vision Workflow Diagram */}
      <section className="vision-flow-strip-section">
        <h3 className="sub-section-title">Optical Classification Inference Flow</h3>

        <div className="vision-pipeline-cards-row">
          <div className="v-step-card">
            <span className="v-step-num">01</span>
            <span className="v-step-title">WASTE OBJECT</span>
            <span className="v-step-sub">Disposable on tray/floor</span>
          </div>
          <span className="v-arrow">→</span>

          <div className="v-step-card">
            <span className="v-step-num">02</span>
            <span className="v-step-title">CAMERA</span>
            <span className="v-step-sub">Wide-angle RGB-D sensor</span>
          </div>
          <span className="v-arrow">→</span>

          <div className="v-step-card">
            <span className="v-step-num">03</span>
            <span className="v-step-title">IMAGE INPUT</span>
            <span className="v-step-sub">1080p frame buffer</span>
          </div>
          <span className="v-arrow">→</span>

          <div className="v-step-card highlight">
            <span className="v-step-num">04</span>
            <span className="v-step-title">AI CLASSIFICATION SIMULATION</span>
            <span className="v-step-sub">Synthetic inference model</span>
          </div>
          <span className="v-arrow">→</span>

          <div className="v-step-card">
            <span className="v-step-num">05</span>
            <span className="v-step-title">WASTE CATEGORY</span>
            <span className="v-step-sub">CPCB Y, R, W, B assignment</span>
          </div>
          <span className="v-arrow">→</span>

          <div className="v-step-card verified">
            <span className="v-step-num">06</span>
            <span className="v-step-title">COMPARTMENT SELECTION</span>
            <span className="v-step-sub">Servo gate routing</span>
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Module */}
      <section className="interactive-tester-section">
        <AIVisionTester />
      </section>

      {/* Technical Reality Disclaimer & Future Roadmap */}
      <section className="ai-technical-context-section">
        <div className="context-card">
          <div className="context-header">
            <Info size={18} className="text-cyan" />
            <h4 className="context-title">Academic Precedent &amp; Future ML Implementation Strategy</h4>
          </div>
          <p className="context-text">
            While this prototype simulates classification results for rapid concept validation, recent literature
            (such as the 2026 <em>Procedia CIRP</em> study on industrial hospital waste cyber-physical systems)
            demonstrates that lightweight convolutional models (e.g., MobileNetV3 or edge-optimized YOLO architectures)
            can achieve high classification accuracy on standardized medical disposables.
          </p>
          <div className="future-tech-tags">
            <span className="tech-tag">Proposed Approach: Lightweight Edge TPU</span>
            <span className="tech-tag">Target: Synthetic &amp; Real Disposables Dataset</span>
            <span className="tech-tag">Confidence Safety Threshold: &gt;90%</span>
            <span className="tech-tag">Manual Quarantine Interlock: Active</span>
          </div>
        </div>
      </section>
    </div>
  );
};
