import type { ResearchSource } from '../types';

export const RESEARCH_SOURCES: ResearchSource[] = [
  {
    id: 'res-who',
    code: 'RESEARCH 01 — WHO',
    title: 'Healthcare Waste & Safety Guidance',
    organization: 'World Health Organization (WHO)',
    year: '2024',
    keyPoints: [
      'Healthcare waste comprises sharps, infectious, pathological, chemical, pharmaceutical, cytotoxic, and non-hazardous streams.',
      'WHO reports approximately 85% of total healthcare waste is general, non-hazardous waste (comparable to domestic waste).',
      'The remaining approximately 15% is considered hazardous material that may be infectious, toxic, or radioactive.',
      'Poor management exposes healthcare workers, waste handlers, patients, and communities to infectious pathogens and toxic hazards.',
      'Sharps (hypodermic needles, blades, scalpels) present the highest risk of occupational puncture injury and bloodborne pathogen transmission.',
    ],
    relevance:
      'Provides the global baseline establishing that human exposure to the hazardous 15% fraction—particularly sharps and infectious soiled items—necessitates reduced direct contact and rigorous segregation at the point of generation.',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/health-care-waste',
  },
  {
    id: 'res-cpcb',
    code: 'RESEARCH 02 — INDIA / CPCB',
    title: 'Indian Biomedical Waste Management Framework',
    organization: 'Central Pollution Control Board (CPCB), MoEFCC India',
    year: '2016 / 2024 Guidelines',
    keyPoints: [
      'India enforces a statutory 4-colour segregation framework under the Biomedical Waste Management (BMWM) Rules.',
      'YELLOW: Human/animal anatomical waste, soiled dressings, expired pharmaceuticals, chemical waste.',
      'RED: Contaminated recyclable plastics (tubing, bottles, IV sets, catheters, disposable gloves).',
      'WHITE (Translucent): Contaminated waste sharps including metals (needles, scalpels, blades).',
      'BLUE: Broken or intact contaminated glassware and metallic orthopedic body implants.',
      'Mandates barcode and digital tracking mechanisms to ensure zero unauthorized diversion or illegal recycling.',
    ],
    relevance:
      'Establishes the exact 4-category compartment architecture (Yellow, Red, White, Blue) implemented in the MediTrack robot chassis to comply strictly with Indian regulatory statutes.',
    sourceUrl: 'https://cpcb.nic.in/bio-medical-waste/',
    warningNote:
      'Official CPCB Implementation Guidelines: https://www.cpcb.nic.in/uploads/hwmd/Draft_Guidelines_for_Management_of_Health_Care_Wast%28as_on_21.09.2017%29.pdf',
  },
  {
    id: 'res-ai',
    code: 'RESEARCH 03 — AI CLASSIFICATION',
    title: 'AI-Assisted Automated Waste Classification',
    organization: 'Procedia CIRP / ScienceDirect Research',
    year: '2026',
    keyPoints: [
      'Investigation of cyber-physical hospital waste segregation systems combining computer vision with edge classification.',
      'Deep learning architectures (e.g., lightweight convolutional models) investigated for identifying medical disposable shapes.',
      'Demonstrates that automated visual classification can assist human operators by predicting hazardous waste categories.',
      'Highlights key challenges: visual occlusion, deformation of soiled bandages, and non-uniform lighting in clinical corridors.',
    ],
    relevance:
      'Provides academic precedent that machine-learning classification can serve as an automated verification layer. MediTrack adopts this conceptual workflow for its simulated inference engine.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/pii/S2212827126005275',
    warningNote:
      'Important: MediTrack does not claim that real deep-learning models (e.g., YOLOv8, ResNet) are executing in this prototype. These technologies represent possible future implementation approaches.',
  },
  {
    id: 'res-robotics',
    code: 'RESEARCH 04 — AUTONOMOUS ROBOTICS',
    title: 'Autonomous Mobile Robotics in Healthcare Environments',
    organization: 'Robotics & Automation in Healthcare Studies',
    year: '2025 / Proposed Concept',
    keyPoints: [
      'Indoor automated guided vehicles (AGVs) utilizing predefined waypoint networks and topological corridor graphs.',
      'Controlled indoor speeds (<0.5 m/s) designed to safely share space with hospital foot traffic, gurneys, and clinical carts.',
      'LiDAR proximity detection and acoustic / ultrasonic sensors for static obstacle avoidance and corridor door clearance.',
      'Automated return-to-dock wireless induction charging to support continuous scheduled duty cycles without manual tethering.',
    ],
    relevance:
      'Informs the spatial routing, waypoint state transitions, and docking parameters demonstrated in the MediTrack simulation dashboard.',
    sourceUrl: 'https://www.who.int/india/health-topics/medical-waste',
    warningNote:
      'Proposed engineering approach: Navigation in this demonstration is implemented via predetermined mathematical waypoints and state transitions, not physical SLAM or hardware sensors.',
  },
];
