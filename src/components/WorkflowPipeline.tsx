import React from 'react';
import type { PipelineStep } from '../types';
import {
  Scan,
  Cpu,
  BookmarkCheck,
  PackagePlus,
  Layers,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface WorkflowPipelineProps {
  currentStep: PipelineStep | null;
  activeWasteName?: string;
  activeCategory?: string;
}

const STEPS: {
  id: PipelineStep;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'OBJECT_DETECTED',
    title: 'OBJECT DETECTED',
    subtitle: 'Proximity sensor & LiDAR confirmation',
    icon: Scan,
  },
  {
    id: 'AI_CLASSIFICATION',
    title: 'AI CLASSIFICATION',
    subtitle: 'Neural vision inference analysis',
    icon: Cpu,
  },
  {
    id: 'WASTE_CATEGORY',
    title: 'WASTE CATEGORY',
    subtitle: 'Bio-segregation protocol assignment',
    icon: BookmarkCheck,
  },
  {
    id: 'COLLECT',
    title: 'COLLECT',
    subtitle: 'Robotic manipulator & suction intake',
    icon: PackagePlus,
  },
  {
    id: 'SEGREGATE',
    title: 'SEGREGATE',
    subtitle: 'Routing into sealed internal bin',
    icon: Layers,
  },
  {
    id: 'DIGITAL_RECORD_UPDATED',
    title: 'DIGITAL RECORD UPDATED',
    subtitle: 'Telemetry synchronized to hospital cloud',
    icon: CheckCircle2,
  },
];

export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  currentStep,
  activeWasteName,
  activeCategory,
}) => {
  const getStepIndex = (step: PipelineStep | null) => {
    if (!step) return -1;
    return STEPS.findIndex((s) => s.id === step);
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="workflow-pipeline-card">
      <div className="pipeline-header">
        <div className="pipeline-title-group">
          <span className="pipeline-badge">DEMONSTRATION PROTOCOL</span>
          <h3 className="pipeline-title">Autonomous Segregation Flow</h3>
        </div>
        {currentStep && (
          <div className="pipeline-active-indicator">
            <span className="pipeline-pulse-dot" />
            <span className="pipeline-step-counter">
              STAGE {currentIndex + 1} OF 6
            </span>
          </div>
        )}
      </div>

      <div className="pipeline-steps-flow">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isDone = currentIndex > idx;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`pipeline-step-item ${
                  isActive ? 'step-active' : isDone ? 'step-done' : 'step-pending'
                }`}
              >
                <div className="step-icon-wrapper">
                  <Icon className="step-icon" size={18} />
                </div>
                <div className="step-content">
                  <div className="step-name-row">
                    <span className="step-title">{step.title}</span>
                    {isActive && <span className="step-status-tag">ACTIVE</span>}
                    {isDone && <span className="step-status-tag done">DONE</span>}
                  </div>
                  <span className="step-subtitle">
                    {isActive && step.id === 'OBJECT_DETECTED' && activeWasteName
                      ? `Target: ${activeWasteName}`
                      : isActive && step.id === 'WASTE_CATEGORY' && activeCategory
                      ? `Category: ${activeCategory}`
                      : step.subtitle}
                  </span>
                </div>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="pipeline-arrow-connector">
                  <ChevronDown
                    size={16}
                    className={`connector-arrow ${
                      isDone || isActive ? 'arrow-highlight' : 'arrow-dim'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
