# Quick Start Guide - Mairaj's Command

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd /data/.openclaw/workspace/mission-control
npm run dev
```
Then open: **http://localhost:3000**

### 2. Navigate the Dashboard

**Sidebar Navigation (Fixed Left):**
- 🏠 **Dashboard** — Overview stats & quick task form
- 📋 **Tasks** — Kanban board (drag tasks between columns)
- 👥 **Team** — All 15 agents with org chart
- 🏢 **Office (3D)** — Virtual office with walking agents
- 💼 **Brand Deals** — Client deals & payment tracking
- 📝 **Content** — (Coming soon)
- ⚙️ **Settings** — (Coming soon)

---

## 📋 Dashboard Home (`/`)

**Quick Overview:**
- **Total Tasks:** 97
- **In Progress:** 6
- **Completed:** 42
- **Team Members:** 8

**Actions:**
1. Quick task assignment form at bottom
2. Select agent from dropdown
3. Enter task description
4. Click "Assign" — task added to Kanban

---

## 🎯 Task Management (`/tasks`)

**Kanban Columns:**
1. **Backlog** — Not started
2. **In Progress** — Currently working
3. **Review** — Waiting for approval
4. **Completed** — Done ✓

**How to Use:**
1. Click **"+ Add Task"** button (top right)
2. Fill in: Title, description, agent, priority
3. Click **"Create Task"**
4. **Drag** tasks between columns to update status
5. Click **"×"** to delete a task

**Agent Colors:**
- 🤖 Purple = MegaManager
- 🎨 Blue = Designer
- 🎬 Pink = SMM
- 🎯 Green = MetaADS
- 🔍 Red = GoogleADS
- 📺 Yellow = Youtube
- 🧲 Indigo = LeadGen
- 📞 Orange = CRM

---

## 👥 Team Page (`/team`)

**What You See:**
1. **MegaManager Card (top center)** — Team lead with stats
   - Active tasks count
   - Team members (15)
   - Agents working now
   - Total completed tasks

2. **14 Agent Cards (grid below)** — Each shows:
   - Emoji + name
   - Role title
   - Status: 🟢 Working / 🟡 Idle / 🔵 On Break
   - Current in-progress task
   - Completed task count

3. **Org Chart Lines** — Purple dashed SVG lines connecting MegaManager to each agent

**Design:** Glassmorphism cards with colored borders matching agent team colors

---

## 🏢 3D Virtual Office (`/office`)

**What's There:**
- **7 Minecraft-style agents** walking around
- **Desks** with glowing monitor screens (each agent has their color)
- **Meeting room** (center, glass walls)
- **Server rack** ("AI BRAIN" on left wall)
- **Coffee station** (back right, "FUEL STATION ☕")
- **TV lounge** (front right, "CHILL ZONE")
- **Table tennis** (back left, "GAME ZONE 🏓")
- **Whiteboard** (back wall, "TASKS")
- **Plants** (4 corners)
- **Ceiling lights** (with point lights)

**How to Control:**
- **Rotate:** Click + drag mouse
- **Zoom:** Scroll wheel (min: 8 units, max: 35 units)
- **Pan:** Right-click + drag (or Ctrl + click + drag)
- **View:** Elevated angle showing full office

**Agent Movement:**
- Agents walk autonomously between destinations
- Arms & legs animate while walking
- Every 4-10 seconds, pick new destination:
  - 40% → Random floor spot
  - 40% → POI (coffee, TV, meeting room, etc.)
  - 20% → Back to their desk
- **Collision avoidance:** Agents push away if too close

---

## 💼 Brand Deals Tracker (`/deals`)

**Overview Stats:**
- **Active Deals** — Currently running
- **Total Earned** — Sum of paid deals
- **Pending Payment** — Deals waiting for payment

**Filters:**
- All / Active / Pending / Completed

**Deals Table Columns:**
1. Client name
2. Deal type
3. Deal value ($)
4. Progress (%)
5. Status badge (color-coded)
6. Payment status
7. Assigned agent
8. Delete button

**Status Badges:**
- 🟡 Pending (yellow) — Not started
- 🔵 Active (blue) — Currently working
- 🟢 Completed (green) — Done
- 🔴 Cancelled (red) — Stopped

**Payment Badges:**
- 🔴 Pending (red) — No payment yet
- 🟡 Partially Paid (yellow) — Partial payment
- 🟢 Paid (green) — Fully paid

**How to Add a Deal:**
1. Click **"+ Add Deal"** button
2. Fill in:
   - Client name
   - Deal type (e.g., "Social Media Campaign")
   - Deal value ($)
   - End date
   - Assign to agent (dropdown)
   - Payment status
   - Deal status
3. Click **"Add Deal"**
4. Deal appears in table (filter to view)

**Sample Deals:**
1. TechStart Co — $15k Social Media Campaign (Active, Paid, 65%)
2. E-Commerce Plus — $25k Google Ads (Active, Pending, 40%)
3. Local Services Hub — $8k Landing Page (Completed, Paid, 100%)
4. SaaS Startup — $35k Full Marketing Stack (Active, Partially Paid, 35%)
5. Fitness Brand — $12k Instagram Reels (Pending, Pending, 0%)

---

## 📊 Data Management

### Storage
- **Tasks:** `/data/tasks.json`
- **Deals:** `/data/deals.json`

### API Endpoints
```
GET  /api/tasks           — Fetch all tasks
POST /api/tasks           — Create new task
PATCH /api/tasks/[id]     — Update task (status, etc.)
DELETE /api/tasks/[id]    — Delete task

GET  /api/deals           — Fetch all deals
POST /api/deals           — Create new deal
PATCH /api/deals/[id]     — Update deal
DELETE /api/deals/[id]    — Delete deal
```

### Example Task Object
```json
{
  "id": "1",
  "title": "Build landing page",
  "description": "Design and develop a modern animated landing page.",
  "agent": "Designer",
  "agentColor": "#3b82f6",
  "priority": "high",
  "status": "in-progress",
  "createdAt": "2026-04-26T12:00:00Z"
}
```

### Example Deal Object
```json
{
  "id": "1",
  "clientName": "TechStart Co",
  "dealValue": 15000,
  "status": "active",
  "dealType": "Social Media Campaign",
  "startDate": "2026-04-20",
  "endDate": "2026-06-20",
  "paymentStatus": "paid",
  "assignedAgent": "SMM",
  "progress": 65
}
```

---

## 🎨 Customization

### Change Color Scheme
Edit `/data/.openclaw/workspace/mission-control/app/globals.css`

### Modify Agent List
Update agent definitions in:
- `/app/team/page.tsx`
- `/app/api/tasks/route.ts`
- `/components/Office3D.tsx`

### Add New Pages
1. Create folder: `/app/newpage/`
2. Create file: `/app/newpage/page.tsx`
3. Add to sidebar links in `/app/layout.tsx`

### Customize 3D Office
Edit `/components/Office3D.tsx`:
- Change furniture positions/sizes
- Add/remove furniture pieces
- Modify agent movement logic
- Adjust lighting & colors

---

## 🐛 Troubleshooting

**3D Office not loading?**
- Check browser console for errors
- Ensure Three.js libraries installed: `npm install`
- Try refreshing the page

**Data not persisting?**
- Check `/data/tasks.json` and `/data/deals.json` exist
- Ensure write permissions on `/data/` folder
- Refresh browser after API calls

**Drag & drop not working?**
- Ensure `@hello-pangea/dnd` is installed
- Check browser compatibility (modern Chrome/Firefox required)

**Sidebar links not working?**
- Verify `layout.tsx` is marked as `'use client'`
- Check Next.js version is 14+

---

## 📱 Responsive Design

**Desktop (1440px+):**
- Full sidebar navigation
- 3-column agent grid
- Full table view

**Tablet (768px - 1439px):**
- Sidebar collapsible (optional)
- 2-column agent grid
- Simplified tables

**Mobile (< 768px):**
- Sidebar as hamburger menu
- 1-column agent grid
- Stack view instead of tables

---

## 🔐 Security Notes

⚠️ **This dashboard stores data in JSON files locally.**
- No encryption
- No database
- Suitable for **local/internal use only**

For production:
1. Add authentication (NextAuth.js)
2. Move to real database (PostgreSQL, MongoDB)
3. Add role-based access control
4. Implement audit logging

---

## 📞 Quick Reference

**15 Agents in Your Team:**
1. MegaManager 🤖 (Team Lead)
2. Designer 🎨 (Website Designer)
3. SMM 🎬 (Social Media)
4. MetaADS 🎯 (Meta Ads)
5. GoogleADS 🔍 (Google Ads)
6. Youtube 📺 (YouTube Manager)
7. LeadGen 🧲 (Lead Generator)
8. CRM 📞 (Sales & CRM)
9. PhoneCaller ☎️ (Phone Sales)
10. Copywriter ✍️ (Copy Writer)
11. Email Marketing Manager 📧 (Email)
12. AI Analyst 📊 (Analytics)
13. Automation Engineer 🤖 (Automation)
14. SEO Specialist 🔎 (SEO)
15. Customer Support Rep 🗣️ (Support)

---

**Mairaj's Command is your AI team management hub. Use it to coordinate, track, and visualize your entire autonomous marketing team in action!**

✅ **Ready to get started?**
```bash
npm run dev
```
