// ─── Navigation / Page Tabs ───────────────────────────────────
export type PageTab =
  | 'home'
  | 'problem'
  | 'research'
  | 'solution'
  | 'robot'
  | 'classification'
  | 'ai-vision'
  | 'simulation'
  | 'tracking'
  | 'architecture'
  | 'feasibility';

// ─── Robot State Machine ──────────────────────────────────────
export type RobotState =
  | 'IDLE'
  | 'NAVIGATING'
  | 'DETECTING'
  | 'CLASSIFYING'
  | 'COLLECTING'
  | 'SEGREGATING'
  | 'TRACKING'
  | 'RETURNING'
  | 'COMPLETED';

// ─── CPCB 4-Colour Category ──────────────────────────────────
export type CpcbCategory = 'YELLOW' | 'RED' | 'WHITE' | 'BLUE';

// ─── Legacy 3-Category (kept for backward-compat in some components) ──
export type WasteCategory = 'SHARPS' | 'INFECTIOUS' | 'RECYCLABLE';

// ─── Waste Pipeline Steps ─────────────────────────────────────
export type PipelineStep =
  | 'OBJECT_DETECTED'
  | 'AI_CLASSIFICATION'
  | 'WASTE_CATEGORY'
  | 'COLLECT'
  | 'SEGREGATE'
  | 'DIGITAL_RECORD_UPDATED';

// ─── Waste Item (union of all fields used across the codebase) ─
export interface WasteItem {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  color: string;
  collected: boolean;
  beingCollected?: boolean;
  roomName: string;

  // NEW CPCB-based fields (used by SimulationPage, simulationData, etc.)
  cpcbCategory: CpcbCategory;
  categoryLabel: string;
  type: string;
  simulatedConfidence: number;
  location: string;
  bgTint: string;
  containerType: string;
  isUnknown?: boolean;

  // LEGACY fields (used by AIVisionPanel, WasteItemVisual, LiveDashboard, etc.)
  /** @deprecated — prefer `cpcbCategory` */
  category?: WasteCategory | CpcbCategory | string;
  /** @deprecated — prefer `simulatedConfidence` */
  confidence?: number;
  badgeBg?: string;
  badgeBorder?: string;
  iconName?: 'syringe' | 'bandage' | 'bottle';
  binTarget?: string;
}

// ─── Waypoint (navigation graph node) ─────────────────────────
export interface Waypoint {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number; // degrees
  targetWasteId?: string;
  type: 'dock' | 'corridor' | 'room';
}

// ─── CPCB 4-Colour Compartment Tally ─────────────────────────
export interface CompartmentTally {
  yellow: number;
  red: number;
  white: number;
  blue: number;
}

// ─── Legacy 3-Compartment Counts (backward-compat) ───────────
export interface CompartmentCounts {
  sharps: number;
  infectious: number;
  recyclable: number;
}

// ─── Simulation Event Log Entry (new) ─────────────────────────
export interface SimulationEvent {
  id: string;
  timestamp: string;
  eventType: RobotState | 'ERROR';
  message: string;
  location: string;
  wasteCategory?: CpcbCategory;
  wasteName?: string;
}

// ─── Legacy Log Entry (old dashboard) ─────────────────────────
export interface LogEntry {
  id: string;
  time: string;
  message: string;
  state: RobotState;
  category?: WasteCategory;
}

// ─── CPCB Category Information Card ───────────────────────────
export interface CpcbCategoryInfo {
  code: CpcbCategory;
  name: string;
  colorHex: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  container: string;
  wasteTypes: string[];
  treatmentNote: string;
  cpcbRuleReference: string;
}

// ─── Research Source Card ─────────────────────────────────────
export interface ResearchSource {
  id: string;
  code: string;
  title: string;
  organization: string;
  year: string;
  keyPoints: string[];
  relevance: string;
  sourceUrl: string;
  warningNote?: string;
}
