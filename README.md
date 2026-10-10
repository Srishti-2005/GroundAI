# On-Ground.ai — Call Centre Agent App Rebuild

A high-fidelity rebuild of the **On-Ground.ai Call Centre App** designed for offline retail agents (The Sleep Company · Koramangala Store). Built using modern React 19, TypeScript, Vite, Chart.js, and custom responsive CSS.

---

## 🚀 Quick Start & How to Run

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm (v9+)

### Installation & Development
```bash
# 1. Clone or open repository
git clone <repo-url>
cd Grondai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in Google Chrome to explore the live app.

### Production Build
```bash
# Build production bundle with TypeScript type-checking
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Architectural Choices

| Technology | Selection Rationale |
|---|---|
| **React 19** | Component-driven architecture with fast reactivity and clean hooks for managing tab state, modals, and timer counters. |
| **TypeScript** | Strict typing across leads, calls, calendar invites, pulse threads, and SOP scoring to prevent runtime errors. |
| **Vite** | Instant Hot Module Replacement (HMR) and optimized Rolldown/ESBuild production bundling. |
| **Vanilla CSS Design System** | Custom CSS design tokens (`var(--primary-teal)`, `var(--primary-green)`, etc.) matching the mock design with precision, typography, glassmorphism, and micro-animations without heavy external utility bloat. |
| **Chart.js & React-Chartjs-2** | Interactive canvas charts for 7-day calls handled and OG Score™ trend progression. |
| **Lucide React** | Consistent, crisp icons matching modern call centre UI guidelines. |
| **Canvas-Confetti** | Rewarding visual feedback upon successful call wrapup and goal completion. |

---

## ✨ Features Implemented

### 1. App Shell
- **Top Bar**:
  - Store identity: `On-Ground.ai · Call Centre · Koramangala`.
  - Shift status badge with pulsing green live dot (`On Queue`).
  - Notification bell with pulsing ring, unread counter, and interactive dropdown feed.
  - Agent profile badge (`Arvind Rajan`).
  - **Phone View / Desktop View Switcher**: Instant toggle between desktop layout and a framed mobile view.
- **Sidebar**:
  - Tab navigation (`Dashboard`, `Plan`, `Calendar`, `Pulse`) with unread counters and active indicators.
  - Shift status footer.

### 2. Dashboard
- **Agent Greeting & Brand Header**: "Good afternoon 👋 Arvind Rajan — The Sleep Company".
- **KPI Metrics Row**:
  - `OG Score™`: 76 (▲13 pts trend).
  - `Avg Handle Time`: 4m 12s.
  - `Connect Rate`: 64% (▲8pp vs avg).
  - `In Queue`: 2 live waiting callers.
- **Who Is Waiting Priority Queue**: Real-time waiting cards (*Priya Iyer*, *Suresh Nair*) with wait levels and immediate `Take call` buttons.
- **Incentive Progress & Targets**: ₹5,200 / ₹8,000 target with progress bar, 5/8 target conversations, and tier unlock status.
- **My Shift Tasks**:
  - Task 1: "Review allocated leads with SLA" ➔ Opens **Leads Modal**.
  - Task 2: "Warranty objection roleplay" ➔ Opens **AI Practice Coach**.
  - Task 3: "Answer QA greeting card" ➔ Navigates to **Pulse channel**.
- **Interactive 7-Day Performance Charts**:
  - Bar chart of daily completed calls.
  - Line chart of OG Score™ quality progression.

### 3. Plan (Calling Planner)
- **Three Dedicated Subtabs**:
  1. **Calls to Make (Outgoing)**:
     - Ranked by lead attractiveness score (color-coded badges).
     - Paging controls (Previous / Next).
     - Expandable lead rows with product, cross-sell, EMI options, ICP match, intent scores, and strategy notes.
     - Direct action buttons: `Call now`, `Practise a call`, and `View lead card`.
  2. **Incoming (Missed Calls)**:
     - Summary strip: Total missed calls count + Total expected value at stake (₹XX,XXX).
     - Ranked by revenue at stake.
     - `Call back` trigger on every row.
  3. **Recent (Call History)**:
     - Calls logged by direction (inbound, outbound, missed), time, duration, and SOP score.
     - **Interactive SOP Review Drawer**: Tap any call to inspect its 5-step SOP compliance breakdown (Greeting, Need Discovery, SmartGRID pitch, EMI quote, Next Steps).

### 4. Calendar
- Mirrored mailbox calendar with October 2026 month grid.
- Event indicator dots for scheduled training, team huddles, and store visits.
- Month navigation and `Today` shortcut.
- Day-specific invites list on the side.
- Interactive `Add Event` modal to schedule new callback invites.

### 5. Pulse (Team Channels & Voice AI)
- **Pulse Home**:
  - **AvaniBot AI Copilot**: Interactive query input that provides simulated AI guidance on EMI and warranty objection handling.
  - **On-Ground Role Coaches**: Skill Improvement Coach, Pitch Coach, ASM Agent, and Tele-caller Assistant.
  - Team channels listing (`#callcentre-team`, `#emi-push-nudges`, `#product-updates`, `#deals-and-discounts`).
  - Shift Kudos feed.
- **Channel Chat (`#callcentre-team`)**:
  - Pinned **"Needs your input"** card with Sunita Rao's QA greeting issue.
  - Interactive response buttons (`Accept plan`, `Request tweak`) + custom reply input.
  - Chat bubble stream with timestamps and agent responses.
  - Interactive message input bar supporting instant message posting.

### 6. Leads Modal with Pagination
- Opens from the dashboard task list or planner rows.
- Full pagination (`Lead X of 5`, Previous/Next buttons, and dot indicators).
- Profile details, SLA badge, attractiveness, ICP match, and intent scores.
- Subscore breakdown: Budget Fit, Need Match, and Decision Stage progress bars.
- Collapsible **Buying Signals & Problem Buckets** (Financing, Quotation, Warranty).
- Collapsible **Customer Touchpoint Journey** timeline.
- Pre-call strategy notes.
- Action triggers for `Call now` and `Practise pitch`.

### 7. Bonus Features Implemented
- ✅ **Send a message in a channel**: Real-time chat messaging in `#callcentre-team`.
- ✅ **Answer "Needs your input" card**: Direct one-click acceptance or custom response logging.
- ✅ **Practise a call**:
  - 4-step AI roleplay coach: Topic Picker ➔ Guidance/Tips ➔ Simulated Voice Recording with live waveform ➔ Instant AI Scorecard (94%).
- ✅ **Call back & Live Dialer**:
  - Active call timer, dynamic sentiment meter, live simulated customer transcript feed, live SOP coaching checklist, and Call Wrapup disposition with note logging.
- ✅ **Works on a phone-width screen**: Mobile-first responsive layout + toggleable phone frame mode.
- ✅ **Charts with a library you like**: Integrated Chart.js for 7-day analytics.

---

## 🤖 AI Tools Disclosure
In compliance with assignment guidelines:
- **AI Coding Assistant**: Google Antigravity IDE (Gemini 3.8 Flash model) was used for scaffold setup, TypeScript interfaces, and accelerating mock data extraction.
- **Verification**: Browser subagent with automated DOM inspection and video recording (`callcentre_app_demo.webp`).

---

## 📋 What Was Completed vs Skipped
- **Completed**: 100% of the *Must Build* requirements and 100% of the *Bonus* requirements.
- **Skipped**: The optional bottom DEMO strip and floating dialer widget toggle from the original prototype were simplified into the top navigation phone/desktop switch and floating dialer button as recommended in the assignment PDF.

---

## 📬 Submission Information
- **Candidate Submission**: On-Ground.ai Engineering Intern Assignment
- **Deadline**: Sunday, 11 October 2026, 6:00 PM IST
- **Recipient**: mukunda@on-ground.ai
