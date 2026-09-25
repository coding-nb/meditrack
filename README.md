# MediTrack – Smart Mobile Medical Waste Collection and Segregation System

> **Visual Simulation Prototype for Concept Demonstration**  
> *Autonomous Medical Waste Collection & Segregation*

---

## 🏥 Overview

**MediTrack** is a conceptual browser-based simulation prototype demonstrating an autonomous mobile robot (AGV) navigating a hospital facility to collect, classify, and segregate medical waste into designated internal compartments according to bio-safety standards.

> **Note on AI Classification:**  
> This prototype is a visual simulation designed for architectural and conceptual validation. It is labeled as **"AI Classification Simulation"** and does not execute real-world machine learning weights or physical robotics ROS/LiDAR stacks.

---

## 🚀 Key Features

### 1. Top-Down Hospital Corridor Simulation (Left Side)
- **Facility Layout**:
  - **Room 1**: Trauma & Triage (contains **Syringe** target)
  - **Room 2**: Wound Dressing Ward (contains **Used Bandage** target)
  - **Room 3**: Pharmacy & Dispensary (contains **Plastic Medicine Container** target)
  - **Central Logistics Corridor**: Designated AGV track navigation guide
  - **Charging Station (Docking Bay A-01)**: Induction charging pads with auto-docking
  - **Central Waste Processing Depot**: Receiving bay with live count tallies
  - **Central Telemetry Dispatch**: Live coordinates and fleet health monitor
- **MediTrack 2D Robot**:
  - Front Optical Camera & LiDAR sensor pod with active dynamic scanning cone
  - Tri-chamber internal waste compartments with LED fill monitors
  - Dual drive wheels & caster mechanism
  - Real-time battery indicator
  - Directional rotation and smooth waypoint travel

### 2. Live Telemetry & Control Dashboard (Right Side)
- **Real-Time State Machine**:
  - `IDLE` → `NAVIGATING` → `DETECTING` → `CLASSIFYING` → `COLLECTING` → `SEGREGATING` → `COMPLETED`
- **Telemetry Indicators**:
  - Current zone/room location
  - Battery health percentage with color-coded safety threshold
  - Total waste items collected
  - Compartment counts (Sharps, Infectious, Recyclable)
- **Simulation Control Hub**:
  - `START SIMULATION`: Initiates the automated route
  - `PAUSE` / `RESUME`: Temporarily halts execution for inspection
  - `RESET`: Returns robot and items to initial docking state
  - `SPEED MULTIPLIER`: 1x, 1.5x, 2x playback options
- **AI Vision Panel** (*"AI Classification Simulation"*):
  - Viewfinder with reticle crosshairs, scanlines, and telemetry
  - Real-time confidence gauge:
    - **Syringe**: `SHARPS` (96% Confidence)
    - **Used Bandage**: `INFECTIOUS` (94% Confidence)
    - **Plastic Medicine Container**: `RECYCLABLE` (91% Confidence)
- **Workflow Pipeline Breadcrumbs**:
  ```
  OBJECT DETECTED → AI CLASSIFICATION → WASTE CATEGORY → COLLECT → SEGREGATE → DIGITAL RECORD UPDATED
  ```
- **Real-Time Event Log**:
  - Chronological time-stamped events tracking movements, detections, classifications, collections, and segregation.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Grid, Flexbox, Custom SVG & Micro-animations)
- **Icons**: [lucide-react](https://lucide.dev/)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your web browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📋 Demonstration Workflow

1. Click **START SIMULATION**.
2. Robot un-docks from **Charging Dock A-01** and navigates along the corridor.
3. Enters **Room 1**:
   - Detects **Syringe**
   - AI Classification Simulation predicts **SHARPS** (96% confidence)
   - Robot collects Syringe (animated intake)
   - Segregates into **Compartment 1 (Sharps)**
   - Updates dashboard counters & event log
4. Moves to **Room 2**:
   - Detects **Used Bandage**
   - Classifies as **INFECTIOUS** (94% confidence)
   - Segregates into **Compartment 2 (Infectious)**
5. Moves to **Room 3**:
   - Detects **Plastic Medicine Container**
   - Classifies as **RECYCLABLE** (91% confidence)
   - Segregates into **Compartment 3 (Recyclable)**
6. Returns along the corridor to **Docking Bay A-01**.
7. Displays **"COMPLETED"** status and commences charging.
