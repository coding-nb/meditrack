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

export type CpcbCategory = 'YELLOW' | 'RED' | 'WHITE' | 'BLUE';

export interface WasteItem {
  id: string;
  name: string;
  cpcbCategory: CpcbCategory;
  categoryLabel: string;
  type: string;
  simulatedConfidence: number;
  location: string;
  roomName: string;
  position: { x: number; y: number };
  color: string;
  bgTint: string;
  containerType: string;
  description: string;
  collected: boolean;
  beingCollected?: boolean;
  isUnknown?: boolean;
}

export interface CompartmentTally {
  yellow: number;
  red: number;
  white: number;
  blue: number;
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  eventType: RobotState | 'ERROR';
  message: string;
  location: string;
  wasteCategory?: CpcbCategory;
  wasteName?: string;
}

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
