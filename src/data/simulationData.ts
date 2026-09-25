import type { WasteItem } from '../types';

export const INITIAL_BATTERY_LEVEL = 98;

export const SIMULATION_WASTE_ITEMS: WasteItem[] = [
  {
    id: 'waste-syringe',
    name: 'Disposable Syringe with Needle',
    cpcbCategory: 'WHITE',
    categoryLabel: 'WHITE — SHARPS',
    type: 'Sharps (Needles & fixed metal)',
    simulatedConfidence: 96,
    location: 'Room 1 (Trauma & Triage)',
    roomName: 'Room 1',
    position: { x: 300, y: 135 },
    color: '#475569',
    bgTint: 'rgba(71, 85, 105, 0.12)',
    containerType: 'Puncture-proof Translucent White Container',
    description: 'Sterile 5ml disposable hypodermic syringe with exposed bevel needle tip.',
    collected: false,
  },
  {
    id: 'waste-dressing',
    name: 'Used Soiled Gauze Dressing',
    cpcbCategory: 'YELLOW',
    categoryLabel: 'YELLOW — SOILED WASTE',
    type: 'Soiled Waste (Blood & fluid contaminated)',
    simulatedConfidence: 94,
    location: 'Room 2 (Wound Dressing Ward)',
    roomName: 'Room 2',
    position: { x: 550, y: 135 },
    color: '#ca8a04',
    bgTint: 'rgba(202, 138, 4, 0.12)',
    containerType: 'Yellow Non-Chlorinated Biohazard Bag',
    description: 'Post-operative surgical gauze swab impregnated with biological exudate.',
    collected: false,
  },
  {
    id: 'waste-plastic',
    name: 'Contaminated Saline IV Bottle',
    cpcbCategory: 'RED',
    categoryLabel: 'RED — CONTAMINATED RECYCLABLE',
    type: 'Contaminated Recyclable Plastic',
    simulatedConfidence: 91,
    location: 'Room 3 (Pharmacy & Dispensary)',
    roomName: 'Room 3',
    position: { x: 780, y: 135 },
    color: '#dc2626',
    bgTint: 'rgba(220, 38, 38, 0.12)',
    containerType: 'Red Non-Chlorinated Recyclable Bag',
    description: 'Polypropylene 500ml IV infusion container with connector port tubing.',
    collected: false,
  },
];

export const OPTIONAL_BLUE_WASTE: WasteItem = {
  id: 'waste-glass',
  name: 'Broken Medicine Glass Ampoule',
  cpcbCategory: 'BLUE',
  categoryLabel: 'BLUE — GLASSWARE',
  type: 'Contaminated Glassware',
  simulatedConfidence: 95,
  location: 'Room 3 Secondary Bay',
  roomName: 'Room 3 Bay B',
  position: { x: 720, y: 190 },
  color: '#2563eb',
  bgTint: 'rgba(37, 99, 235, 0.12)',
  containerType: 'Blue Cardboard Box / Rigid Glass Bin',
  description: 'Borosilicate 2ml antibiotic liquid vial with fractured neck.',
  collected: false,
};

export const UNKNOWN_EDGE_CASE_ITEM: WasteItem = {
  id: 'waste-unknown',
  name: 'Unidentified Composite Waste Object',
  cpcbCategory: 'YELLOW', // default fallback
  categoryLabel: 'UNCERTAIN / UNCLASSIFIED',
  type: 'Unrecognized Material Matrix',
  simulatedConfidence: 41,
  location: 'Corridor Inspection Bay',
  roomName: 'Corridor Sector 2',
  position: { x: 440, y: 305 },
  color: '#71717a',
  bgTint: 'rgba(113, 113, 122, 0.15)',
  containerType: 'Manual Inspection Quarantine Chamber',
  description: 'Obscured item with conflicting spectral signature. Optical confidence below 60% threshold.',
  collected: false,
  isUnknown: true,
};

export const DOCK_COORDINATES = { x: 110, y: 460, rotation: 0 };
