# Tour Manager Pro - UX Flow Planning & Roadmap Alignment

You are an expert product architect and UX designer helping plan the complete user experience for **Tour Manager Pro**, a modern tour management SaaS platform built by an experienced tour manager (15 years in A-level country music tours) to compete with expensive solutions like Master Tour Pro.

## Project Architecture

**Two Repositories:**
1. **tour-manager-pro** (main app) - Backend/full-stack with Supabase auth, Drizzle ORM, some broken pieces (FormKit forms need replacement)
2. **tmp-frontend-design** (sandbox) - UI/UX playground for rapid prototyping and validation with mock data

**Tech Stack:** Nuxt.js 3, Vue 3, TypeScript, Supabase, Drizzle ORM, shadcn/ui components

**Multi-tenant Hierarchy:** Organization → Tours → Days → Events → Schedules/GuestLists

**Real Test Data:** HomeComing 2025 tour (50 days, 35 shows, 30 venues, 24 hotels)

---

## Your Mission: Strategic UX Flow Planning

### Part 1: Main Project Roadmap Vision (High-Level Only)

**Goal:** Understand the architectural vision for tour-manager-pro to ensure sandbox decisions align with the production roadmap. **DO NOT audit technical details** - we'll sync schemas when migrating pages from sandbox to main app.

#### Questions to Answer:

**A. Multi-tenant User Model**
- Users belong to Organizations (can be in multiple orgs - e.g., guitar tech working for 3 bands)
- Role-based access: Tour Manager (admin), Crew, Guest (read-only)
- How should user profile settings handle multi-org membership?
- Auth is broken (FormKit issue) - what's the path forward for auth forms?

**B. Shared Data vs. Organization Data**
- **Venues**: Should there be a global venue database that all orgs share? (Tour Manager notes: "promoters work with many organizations, so shared venue data makes sense")
- **Contacts/Companies**: Mini-CRM - should contacts be org-specific or shared? (TM wants shared to avoid duplicate contacts across orgs)
- **Hotels**: Similar question - shared or org-specific?
- How do we handle org-specific notes on shared entities? (e.g., "last time we played this venue...")

**C. Database Schema Philosophy**
- Should schemas be optimized now, or wait until UX is validated in sandbox?
- Tour Manager's preference: "UI/UX with mock data first, schema alignment when migrating"
- Are there any schema decisions that MUST be made before sandbox work continues?

**Output Format:**
```markdown
## Production Roadmap Vision

### Multi-Tenant Architecture
[High-level approach to users, orgs, roles]

### Shared vs. Scoped Data
[Strategy for venues, contacts, hotels - what's shared, what's org-specific]

### Schema Strategy
[When to optimize schemas vs. when to follow UI decisions]

### Critical Decisions Needed Now
[Any blockers that prevent sandbox work from moving forward]

### What Can Wait
[What doesn't need to be decided until migration phase]
```

---

### Part 2: Sandbox UX Flow - The Critical Work

**Goal:** Build a complete, strategic UX flow plan for tmp-frontend-design that addresses the Tour Manager's specific questions and concerns about navigation, permissions, and user experience.

---

## Design Foundation: Existing Mockups

The Tour Manager has provided these mockups as design references (NOTE: sidebar nav in mockups is outdated; current sandbox nav is more evolved):

1. **Dashboard.png** - Current tour dashboard with stats, upcoming schedule
2. **Events_List_TM.png** - Tour Manager view: show list with advance status tracking
3. **Event_Details_Advance_TM.png** - Tour Manager edit view with tabs (Schedule, Facilities, Production, Equipment, Logistics, Labor Call, Local Crew) and detailed technical specs
4. **Event_details.png** - Standard user view: "Day Sheet" (read-only, printable/PDF, shows schedule, venue, hotel, travel)
5. **Event_Guest_List.png** - Guest list management with ticket allocations
6. **Calendar_Month.png** - Month view calendar with color-coded day types
7. **Login_Form.jpg** & **Sign_Up_Form.jpg** - Auth screens
8. **Add_Event.jpg** - Event creation form

**Key Design Elements:**
- Tour switcher in sidebar header (can switch between tours)
- Left sidebar with tour days list (context nav showing surrounding days)
- Main content area for detailed views
- Clean, modern, mobile-responsive design
- Inline editing pattern (view → edit mode transition without page change)

---

## Critical UX Questions from Tour Manager

These are the **REAL questions** that need strategic answers:

### Question 1: What Does Dashboard Show?

**Current State:** Dashboard mockup shows "current tour" data (dates, show count, personnel, next show, upcoming schedule)

**Questions:**
- When an admin/Tour Manager signs in, should dashboard default to current tour (as designed)?
- Or should it show organization-level info first, then require them to select a tour?
- What if there are multiple active tours? How does tour switcher work?
- What if it's a new org with no tours yet? Empty state with "Create Your First Tour" CTA?

**Master Tour Reference:** "It's been 2 years since I used it - what does Master Tour show on dashboard?"

### Question 2: Navigation Structure - Tours vs. Days

**Current Sandbox Issue:** 
- `/days/[day-id]` exists but there's **NO /tours view**
- Tour Manager is concerned about flow: "When I designed the dashboard, it was from the perspective of the current tour, but maybe we need to think about the admin user and their organization"

**Questions:**
- Should there be a `/tours` index page listing all tours?
- Or does tour switcher in sidebar header replace the need for a tours list page?
- When user clicks "Dashboard" from sidebar, what loads?
- Is the hierarchy: Dashboard → (select tour via switcher) → Days → Day Detail?
- Or: Dashboard → Tours List → Tour Detail → Days → Day Detail?

### Question 3: Day View Behavior Based on User Role

**Current Sandbox:** `/days/[day-id]` exists

**Two Different Experiences Needed:**

**For Tour Manager (edit access):**
- Clicking a day from calendar/schedule should go to `/events/advance/[event-id]` (the detailed advance view with tabs)
- But they also need a way to see the "day sheet" (Event_details.png) - how do they access both views?
- Should there be a toggle: "Day Sheet View" vs. "Advance View"?

**For Regular Users (read-only):**
- Clicking a day shows Event_details.png (the day sheet - venue info, schedule, hotel, travel)
- No "Add Event" button visible
- Print/PDF/Share options
- If day has no event (travel day, off day), show appropriate empty state

**The Flow Problem:**
- TM clicks day → sees Advance view (Event_Details_Advance_TM.png)
- How does TM get to day sheet from there? Tab? Button?
- User clicks day → sees Day Sheet (Event_details.png)
- Blank day: User sees empty state, TM sees "Add Event" button

### Question 4: Events List View - Purpose & Access

**Current Sandbox:** `/events` shows Events_List_TM.png mockup

**Tour Manager's Intent:**
- "This should only be shown to Tour Manager level access"
- "A way to track which shows are advanced, advance status, quick dashboard to work off"
- Shows: All events with Status, Capacity, Show Time, Advance Status
- "Advance" button for each show → goes to Advance view
- "View Details" button → goes to... where? Day sheet? Or same as Advance?

**Questions:**
- Is this essentially a "Show Advancement Tracker" for Tour Managers?
- Should it be renamed? (e.g., "Show Status" or "Advance Dashboard")
- How does this differ from Calendar view or Days list?
- Do regular users see a different Events view, or no Events nav item at all?

### Question 5: Calendar View - Click Behavior

**Current Sandbox:** `/calendar` shows Calendar_Month.png mockup

**Questions:**
- When Tour Manager clicks a calendar day → should go to Advance view?
- When regular user clicks a calendar day → should go to Day Sheet view?
- Same role-based routing as Days view?
- Calendar shows day types (show/travel/off/special) - are these user-definable labels or fixed?

### Question 6: Schedule Module - The Big Unknown

**Tour Manager's Concern:**
- "Yesterday I was giving a lot of thought to the schedule module and it made so much more sense to use FullCalendar or Schedule-X"
- Current mockups show embedded schedules in Event views
- But schedules need to be:
  - **Day-specific** (travel itinerary, meals, load-in times)
  - **Event-specific** (sound check, doors, showtime)
  - **Tour-level** (entire tour schedule view)
  - **Drag-and-drop for reordering**
  - **User-defined labels** (not fixed enums)

**Questions:**
- Should there be a dedicated `/schedules` or `/schedule` page?
- Or is schedule always contextual (viewed within day/event pages)?
- How do we integrate a calendar library (FullCalendar, Schedule-X) with the existing design?
- What's the editing experience for schedules?

### Question 7: Hotels - The Forgotten Module

**Tour Manager:** "We didn't even focus on hotels yet - we'll get to that later"

**Questions:**
- Should there be a `/hotels` or `/accommodations` page?
- Or are hotels only viewed in context of days/events?
- How do users book/manage hotel rooms?
- Is there a "hotel list" view similar to "venue list"?

### Question 8: Inline Editing Philosophy

**Tour Manager's Vision:**
- "One of my main motivating factors is bringing a modern, user-friendly experience on par [with best-in-class]"
- "How does the editing experience work? Obviously gonna be inline"
- "You click edit/advance and the view transitions to form view right there, then you edit and save"
- "That's how it should be for EVERYTHING: user profile, org settings, venues, hotels"

**Questions:**
- What's the pattern? Click "Edit" button → fields become editable → "Save/Cancel" buttons appear?
- Or: Hover fields to show edit icon → click to edit individual fields?
- Should there be a universal component/composable for inline editing?
- How does this work on mobile (where hover doesn't exist)?

### Question 9: Empty States & New Tour Setup

**The Critical First-Time User Experience:**

**Scenario:** New user signs up, creates organization

**Questions:**
- After signup → redirect to what? Dashboard? Tour creation?
- Empty dashboard (no tours yet) → what does it show? Just "Create Tour" CTA?
- User creates tour (name, start date, end date) → system generates all days
- Success message: "50 days created for HomeComing 2025" → then what? Redirect to `/days` for that tour?
- First day has no events → TM sees "Add Event" button, regular user sees empty state

**The New Tour Flow:**
1. Create Tour (dates)
2. System generates days
3. TM clicks first day
4. Adds event (show)
5. Links venue
6. Builds schedule
7. Adds guest list
8. Repeat for next days

**How do we guide users through this without it feeling overwhelming?**

---

## The Comprehensive UX Flow Plan You Need to Deliver

### Primary Deliverable: User Flow Map

Create a **visual/textual flow diagram** that maps out:

**A. First-Time User Journey**
```
Sign Up → Email Verification → Create Organization → 
Create First Tour → Days Generated → Add First Event → 
Build Schedule → View as Crew Member
```

**B. Daily Tour Manager Workflow**
```
Login → Dashboard (current tour snapshot) → 
Check upcoming shows → Advance a show → 
Review guest list → Update schedule → 
Switch to another tour → Repeat
```

**C. Daily Crew Member Workflow**
```
Login → Dashboard → Check today's schedule → 
View day sheet → Check travel info → 
View guest list (if relevant to role)
```

**D. Navigation Hierarchy**

Clearly define:
- What each sidebar nav item does
- What clicking it loads
- Role-based visibility (TM vs. Crew vs. Guest)

Example:
```
SIDEBAR NAV (Tour Manager View):

[Tour Switcher: HomeComing 2.0 ▼]

Navigation:
  → Dashboard (/dashboard)
     - Current tour snapshot
     - Stats: dates, show count, personnel
     - Upcoming schedule (next 7-14 days)
     - Quick links: "Add Event", "View Full Calendar"
  
  → Events (/events) [TM only]
     - Show advancement tracker
     - All shows with advance status
     - Filter: All/Upcoming/Completed/Cancelled
     - Click "Advance" → /events/advance/[id]
     - Click "View Details" → /days/[day-id]
  
  → Days (/days or /tours/[tour-id]/days)
     - Calendar view OR list view
     - Click day → role-based routing:
       - TM → /events/advance/[event-id] (if show day)
       - User → /days/[day-id] (day sheet)
  
  → Calendar (/calendar)
     - Month/week view
     - Color-coded day types
     - Click day → same role-based routing as Days
  
  → Venues (/venues)
     - All venues (shared across orgs?)
     - Org-specific notes on each
     - Inline editing
  
  → Contacts (/contacts)
     - Mini-CRM
     - Shared across orgs or org-specific?

Tour Logistics:
  → Transportation
  → Accommodations (hotels)
  → Documents
```

### Secondary Deliverable: Role-Based Access Matrix

Create a table showing what each role sees/can do:

| Feature/Page | Tour Manager | Crew Member | Guest |
|--------------|--------------|-------------|-------|
| Dashboard | Full view, edit access | View only | View only |
| Events List | ✅ (advancement tracker) | ❌ Not visible | ❌ Not visible |
| Days/Calendar | ✅ Edit events, schedules | ✅ View schedules | ✅ View day sheets |
| Guest Lists | ✅ Manage | ✅ View | ❌ Not visible |
| Venues | ✅ Edit | ✅ View | ❌ Not visible |
| Settings | ✅ Full access | ⚠️ Profile only | ⚠️ Profile only |

### Tertiary Deliverable: Inline Editing Component Strategy

Define the pattern for inline editing across the app:

**Pattern Options:**

**Option A: Toggle Mode**
- View mode: Data displayed with "Edit" button
- Click "Edit" → entire section becomes editable form
- "Save" / "Cancel" buttons appear
- On save: Success toast, return to view mode

**Option B: Field-Level Editing**
- Hover/focus field → edit icon appears
- Click icon → that field becomes editable
- Auto-save on blur or explicit "Save" button
- More granular, less disruptive

**Recommendation:** Which pattern for which contexts?

### Quaternary Deliverable: Missing Pages Identification

List all pages that need to be built in sandbox, prioritized:

**Priority 1 (Critical for MVP Flow):**
- [ ] `/tours` or `/tours/[tour-id]` (if needed)
- [ ] `/events/advance/[event-id]` (Tour Manager advance view)
- [ ] Role-based routing logic for day clicks
- [ ] Empty states (new tour, no events, etc.)

**Priority 2 (Important for Daily Use):**
- [ ] Schedule module integration
- [ ] Hotels/Accommodations pages
- [ ] Guest list enhancement

**Priority 3 (Nice to Have):**
- [ ] User profile settings
- [ ] Organization settings
- [ ] Multi-org switcher

### Quintary Deliverable: Mock Data Structure Validation

Review the existing mock data in sandbox:
- What helpers exist? (getDaysWithEvents, getTourById, etc.)
- What's missing for the complete flow?
- How should mock data handle multi-org scenarios?
- Should we add "current user role" to mock context?

---

## Key Principles from Tour Manager

1. **UI/UX First, Schema Later** - "UI development with mock data should take priority... schema alignment when migrating"
2. **Eat Elephant One Spoonful at a Time** - Break work into bite-sized tasks
3. **Component Reusability** - "When similar UI elements exist, consolidate into single configurable components"
4. **Flexibility over Rigidity** - "Users should define their own labels and structures, not be constrained by enums"
5. **Modern, User-Friendly Experience** - "Inline editing everywhere, mobile-responsive, competing with Master Tour Pro"
6. **Real Tour Manager Perspective** - Trust the TM's 15 years of experience on UX decisions

---

## Output Format

```markdown
# Tour Manager Pro - Complete UX Flow Plan

## Part 1: Production Roadmap Alignment
[High-level answers to architecture questions]

## Part 2: Sandbox User Flow Strategy

### 2A: User Journey Maps
[Visual/textual flows for different user types]

### 2B: Navigation Structure
[Complete sidebar nav definition with role-based access]

### 2C: Answers to Tour Manager's 9 Critical Questions
[Specific, strategic answers to each question]

### 2D: Role-Based Access Matrix
[What each role sees and can do]

### 2E: Inline Editing Pattern
[Recommended approach with examples]

### 2F: Missing Pages Inventory
[Prioritized list of what needs to be built]

### 2G: Mock Data Requirements
[What mock data/helpers are needed]

## Part 3: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
[Core pages and navigation]

### Phase 2: Role-Based Logic (Week 3-4)
[Permission system and role-based routing]

### Phase 3: Advanced Features (Week 5-6)
[Schedules, inline editing, guest lists]

### Phase 4: Polish & Migration Prep (Week 7-8)
[Empty states, error handling, ready to migrate to main app]

## Part 4: Open Questions & Decisions Needed
[Anything that requires Tour Manager's input before proceeding]
```

---

## Additional Context

- **Current Date:** December 29, 2025
- **Tour Manager has 15 years of experience** - their UX decisions are authoritative
- **Master Tour Pro is the competitor benchmark** - expensive, somewhat rigid, but professional
- **Target users:** A-level to club-level acts, affordable pricing
- **Mobile is critical** - Tour Managers use this on the road
- **This is a PLANNING exercise** - No code yet, just strategy

---

## Final Note

The Tour Manager is looking for help getting "project focus to get a working UX from signup through full tour setup." They want a **comprehensive roadmap** that answers their specific questions about flow, navigation, and permissions.

This is about **strategic UX planning**, not technical implementation. Think like a product manager and UX architect, not a developer.

**Deliver clarity on: WHAT to build, WHY it's structured that way, and HOW users will experience it.**
