import type { WasteItem } from './types';

export const INITIAL_BATTERY = 99;

export const INITIAL_WASTE_ITEMS: WasteItem[] = [
  {
    id: 'waste-1',
    name: 'Syringe',
    category: 'SHARPS',
    confidence: 96,
    roomName: 'Room 1 (Trauma & Triage)',
    position: { x: 300, y: 135 },
    color: '#ef4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    badgeBorder: '#ef4444',
    iconName: 'syringe',
    collected: false,
    beingCollected: false,
    description: 'Disposable 5ml medical syringe with needle cap',
    binTarget: 'Compartment 1: Sharps (Yellow/Red Biohazard)',
  },
  {
    id: 'waste-2',
    name: 'Used Bandage',
    category: 'INFECTIOUS',
    confidence: 94,
    roomName: 'Room 2 (Wound Dressing Ward)',
    position: { x: 550, y: 135 },
    color: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: '#f59e0b',
    iconName: 'bandage',
    collected: false,
    beingCollected: false,
    description: 'Sterile cotton gauze with biological exudate',
    binTarget: 'Compartment 2: Infectious (Biohazard Bin)',
  },
  {
    id: 'waste-3',
    name: 'Plastic Medicine Container',
    category: 'RECYCLABLE',
    confidence: 91,
    roomName: 'Room 3 (Pharmacy & Dispensary)',
    position: { x: 780, y: 135 },
    color: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    badgeBorder: '#06b6d4',
    iconName: 'bottle',
    collected: false,
    beingCollected: false,
    description: 'Rigid HDPE pharmaceutical syrup container',
    binTarget: 'Compartment 3: Recyclable (Clean Plastic)',
  },
];

export const DOCK_POSITION = { x: 110, y: 460, rotation: 0 };

export const SIMULATION_PATH: {
  id: string;
  name: string;
  locationLabel: string;
  targetPos: { x: number; y: number; rotation: number };
  wasteId?: string;
  isWasteTarget?: boolean;
  isDock?: boolean;
}[] = [
  // Start from Dock
  {
    id: 'step-0',
    name: 'Docking Station',
    locationLabel: 'Charging Dock A-01',
    targetPos: { x: 110, y: 460, rotation: 0 },
    isDock: true,
  },
  // Move out of dock to corridor junction
  {
    id: 'step-1',
    name: 'Corridor Junction',
    locationLabel: 'Main Corridor (West Wing)',
    targetPos: { x: 110, y: 310, rotation: -90 },
  },
  // Move along corridor to Room 1 entrance
  {
    id: 'step-2',
    name: 'Room 1 Entrance',
    locationLabel: 'Corridor - Room 1 Entrance',
    targetPos: { x: 300, y: 310, rotation: 0 },
  },
  // Enter Room 1 and reach Syringe
  {
    id: 'step-3',
    name: 'Room 1 Waste Target',
    locationLabel: 'Room 1: Trauma & Triage',
    targetPos: { x: 300, y: 185, rotation: -90 },
    wasteId: 'waste-1',
    isWasteTarget: true,
  },
  // Exit Room 1 back to corridor
  {
    id: 'step-4',
    name: 'Exit Room 1',
    locationLabel: 'Main Corridor (Central)',
    targetPos: { x: 300, y: 310, rotation: 90 },
  },
  // Move along corridor to Room 2 entrance
  {
    id: 'step-5',
    name: 'Room 2 Entrance',
    locationLabel: 'Corridor - Room 2 Entrance',
    targetPos: { x: 550, y: 310, rotation: 0 },
  },
  // Enter Room 2 and reach Used Bandage
  {
    id: 'step-6',
    name: 'Room 2 Waste Target',
    locationLabel: 'Room 2: Wound Dressing Ward',
    targetPos: { x: 550, y: 185, rotation: -90 },
    wasteId: 'waste-2',
    isWasteTarget: true,
  },
  // Exit Room 2 back to corridor
  {
    id: 'step-7',
    name: 'Exit Room 2',
    locationLabel: 'Main Corridor (East Wing)',
    targetPos: { x: 550, y: 310, rotation: 90 },
  },
  // Move along corridor to Room 3 entrance
  {
    id: 'step-8',
    name: 'Room 3 Entrance',
    locationLabel: 'Corridor - Room 3 Entrance',
    targetPos: { x: 780, y: 310, rotation: 0 },
  },
  // Enter Room 3 and reach Plastic Medicine Container
  {
    id: 'step-9',
    name: 'Room 3 Waste Target',
    locationLabel: 'Room 3: Pharmacy & Dispensary',
    targetPos: { x: 780, y: 185, rotation: -90 },
    wasteId: 'waste-3',
    isWasteTarget: true,
  },
  // Exit Room 3 back to corridor
  {
    id: 'step-10',
    name: 'Exit Room 3',
    locationLabel: 'Main Corridor (Returning)',
    targetPos: { x: 780, y: 310, rotation: 90 },
  },
  // Travel back along corridor
  {
    id: 'step-11',
    name: 'Corridor Return',
    locationLabel: 'Main Corridor (Westbound)',
    targetPos: { x: 110, y: 310, rotation: 180 },
  },
  // Return to dock
  {
    id: 'step-12',
    name: 'Return to Dock',
    locationLabel: 'Charging Dock A-01 (Docked)',
    targetPos: { x: 110, y: 460, rotation: 90 },
    isDock: true,
  },
];
