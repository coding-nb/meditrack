import type { CpcbCategoryInfo } from '../types';

export const CPCB_CATEGORIES: CpcbCategoryInfo[] = [
  {
    code: 'YELLOW',
    name: 'Yellow — Infectious & Anatomical / Soiled Waste',
    colorHex: '#ca8a04',
    badgeBg: '#fefce8',
    badgeBorder: '#eab308',
    badgeText: '#854d0e',
    container: 'Yellow-coloured non-chlorinated plastic bags or containers',
    wasteTypes: [
      'Human anatomical waste (tissues, organs, body parts)',
      'Soiled waste (items contaminated with blood, body fluids, dressings, cotton swabs, casts)',
      'Expired or discarded pharmaceutical medicines and cytotoxic drugs',
      'Chemical liquid / solid waste from lab diagnostics',
      'Discarded linen, mattresses, bedding contaminated with blood / fluids',
    ],
    treatmentNote:
      'CPCB prescribed: Incineration or Plasma Pyrolysis or Encapsulation / Deep burial in designated authorized facilities.',
    cpcbRuleReference: 'CPCB Biomedical Waste Management Rules, Schedule I — Part 1 (Yellow Category)',
  },
  {
    code: 'RED',
    name: 'Red — Contaminated Recyclable Waste',
    colorHex: '#dc2626',
    badgeBg: '#fef2f2',
    badgeBorder: '#ef4444',
    badgeText: '#991b1b',
    container: 'Red-coloured non-chlorinated plastic bags or containers',
    wasteTypes: [
      'Contaminated recyclable plastics (IV bottles and tubing sets)',
      'Intravenous sets, catheters, urine bags, dialyzers',
      'Disposable syringes without fixed needles',
      'Vacutainers, blood bags, specimen containers',
      'Surgical examination gloves and PPE gowns',
    ],
    treatmentNote:
      'CPCB prescribed: Autoclaving or microwaving / hydroclaving followed by shredding or mutilation. Material is routed strictly to registered authorized plastic recyclers.',
    cpcbRuleReference: 'CPCB Biomedical Waste Management Rules, Schedule I — Part 1 (Red Category)',
  },
  {
    code: 'WHITE',
    name: 'White (Translucent) — Waste Sharps Including Metals',
    colorHex: '#475569',
    badgeBg: '#f8fafc',
    badgeBorder: '#94a3b8',
    badgeText: '#1e293b',
    container: 'Puncture-proof, leak-proof, tamper-proof translucent rigid containers',
    wasteTypes: [
      'Hypodermic needles and syringes with fixed needles',
      'Needles from needle tip burners / cutters',
      'Scalpels, surgical blades, lancets, trocars',
      'Contaminated sharp metal objects capable of puncture or laceration',
      'Suture needles and orthopedic guide pins',
    ],
    treatmentNote:
      'CPCB prescribed: Autoclaving or Dry Heat Sterilization followed by shredding, mutilation, or encapsulation. Residue sent to sanitary landfill or iron foundries.',
    cpcbRuleReference: 'CPCB Biomedical Waste Management Rules, Schedule I — Part 1 (White Category)',
  },
  {
    code: 'BLUE',
    name: 'Blue — Glassware & Metallic Body Implants',
    colorHex: '#2563eb',
    badgeBg: '#eff6ff',
    badgeBorder: '#3b82f6',
    badgeText: '#1e40af',
    container: 'Puncture-proof, leak-proof cardboard boxes or containers with blue colored marking',
    wasteTypes: [
      'Broken or intact pharmaceutical glassware',
      'Medicine vials and glass ampoules (except cytotoxic-contaminated)',
      'Glass specimen slides and Petri dishes',
      'Metallic body implants, orthopedic screws, surgical pins',
    ],
    treatmentNote:
      'CPCB prescribed: Disinfection by soaking in 1-2% sodium hypochlorite solution or autoclaving / microwaving / hydroclaving prior to specialized recycling.',
    cpcbRuleReference: 'CPCB Biomedical Waste Management Rules, Schedule I — Part 1 (Blue Category)',
  },
];
