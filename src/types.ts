export type RobotState =
  | 'IDLE'
  | 'NAVIGATING'
  | 'DETECTING'
  | 'CLASSIFYING'
  | 'COLLECTING'
  | 'SEGREGATING'
  | 'COMPLETED';

export type WasteCategory = 'SHARPS' | 'INFECTIOUS' | 'RECYCLABLE';

export type PipelineStep =
  | 'OBJECT_DETECTED'
  | 'AI_CLASSIFICATION'
  | 'WASTE_CATEGORY'
  | 'COLLECT'
  | 'SEGREGATE'
  | 'DIGITAL_RECORD_UPDATED';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  confidence: number;
  roomName: string;
  position: { x: number; y: number };
  color: string;
  badgeBg: string;
  badgeBorder: string;
  iconName: 'syringe' | 'bandage' | 'bottle';
  collected: boolean;
  beingCollected: boolean;
  description: string;
  binTarget: string;
}

export interface Waypoint {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number; // degrees
  targetWasteId?: string;
  type: 'dock' | 'corridor' | 'room';
}

export interface LogEntry {
  id: string;
  time: string;
  message: string;
  state: RobotState;
  category?: WasteCategory;
}

export interface CompartmentCounts {
  sharps: number;
  infectious: number;
  recyclable: number;
}
