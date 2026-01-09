# MASTER PLAN - Tour Management System

**Project**: Tour Management Pro (tmp_frontend_design)
**Last Updated**: 2026-01-08
**Status**: Active Development - UI Sandbox Phase
**Version**: 0.9.0 (Pre-Production)

---

## Executive Status

### Current State Summary

This is a **modern Nuxt 3 tour management application** in active UI/UX prototyping phase. The project has achieved significant milestones in frontend architecture and design system implementation, with 40+ working pages and a comprehensive mock data layer. **The codebase is production-ready from a UI perspective** but requires backend integration (Supabase + API routes) before launch.

### Key Metrics

| Metric | Count | Status |
|--------|-------|--------|
| **Total Pages** | 41 | 27 Working, 14 Missing |
| **Vue Components** | 574 | Includes 100+ shadcn-vue UI components |
| **TypeScript Files** | 5,637 | Strict mode enabled |
| **Mock Data Lines** | 4,118 | Comprehensive test dataset |
| **Reusable Components** | 15+ | Common, Editable, Person, Guest List |
| **Git Commits** | 50+ | Active development since Dec 2025 |

### Health Scorecard

| Area | Score | Status |
|------|-------|--------|
| **UI/UX Implementation** | 9/10 | Excellent - Production-grade interfaces |
| **Component Architecture** | 9/10 | Excellent - Clean, reusable patterns |
| **Design System** | 9/10 | Excellent - CSS tokens + BEM workflow |
| **TypeScript Quality** | 8/10 | Strong - Strict mode, few `any` types |
| **State Management** | 0/10 | Intended (Sandbox Mode) - Local state only |
| **Backend Integration** | 0/10 | Intended (Sandbox Mode) - UI prototyping focus |
| **Documentation** | 8/10 | Strong - Comprehensive roadmaps and audits |
| **Testing** | 0/10 | Future Work - Not required for UI sandbox |

### Development Velocity

**Recent 10 Commits (Last 2 Weeks)**:
- ✅ Event advance pages refactored with editable components
- ✅ Guest list management UI completed
- ✅ Calendar integration with Schedule-X library
- ✅ Privacy settings with granular controls
- ✅ Onboarding flow (3-page wizard)
- ✅ Auth pages (login, signup, forgot password)
- ✅ CSS refactor (Phases 1-4 complete)
- ✅ Organization/user management pages
- ✅ Personnel detail pages with 7 info sections

**Current Momentum**: High - ~3 commits/day in active development periods

---

## The Done List

### Major Milestones Completed

#### 1. Foundation & Architecture (Dec 2025)
- [x] **Project Initialization** - Nuxt 3 + Tailwind 4 + shadcn-vue setup
- [x] **Layout System** - Default layout with AppSidebar + navigation
- [x] **Design Tokens** - CSS-first configuration in `main.css` with OKLCH colors
- [x] **TypeScript Strict Mode** - All files use `<script setup lang="ts">`
- [x] **Mock Data Layer** - 4,118 lines of realistic tour data (12 files)
- [x] **Component Auto-Imports** - Nuxt auto-import for components/composables/utils

#### 2. Core Pages Implemented (Dec 2025 - Jan 2026)

**Navigation & Dashboard** (3 pages)
- [x] `/dashboard` - Tour overview with stats cards and schedule preview
- [x] `/calendar` - Monthly calendar view (migrating to Schedule-X)
- [x] Root redirect (`/` → `/dashboard`)

**Events Management** (4 pages)
- [x] `/events` - List view with search, filters, advance status badges
- [x] `/events/add` - Event creation form (vee-validate + zod)
- [x] `/events/advance/[slug]` - Detailed event advance sheet with inline editing
- [x] Editable components: EditableInfoCard, FacilitiesAccordion, LaborCallTable

**Personnel & Organization** (9 pages)
- [x] `/personnel` - Tour crew directory with search/filter
- [x] `/personnel/[id]` - Person detail with 7 collapsible sections
- [x] `/organization/settings` - Organization settings page
- [x] `/organization/users` - User management (same as personnel)
- [x] `/organization/users/[id]` - User detail page
- [x] `/organization/users/add` - Add user form
- [x] `/organization/groups` - User groups list
- [x] `/organization/groups/[id]` - Group detail page
- [x] `/organization/groups/add` - Add group form

**Venues & Contacts** (8 pages)
- [x] `/venues` - Venue database with grid view
- [x] `/venues/[id]` - Venue detail with technical specs
- [x] `/venues/add` - Add venue form
- [x] `/contacts` - Contact directory with grouped/flat views
- [x] `/contacts/[id]` - Contact detail page
- [x] `/contacts/add` - Add contact form
- [x] `/companies` - Company directory
- [x] `/companies/[id]` - Company detail page

**Guest List** (3 pages)
- [x] `/guest-list` - Overview/redirect
- [x] `/guest-list/[id]` - Event guest list with ticket allocations
- [x] `/guest-list/[id]/[guestId]` - Guest detail (stub)

**User Flows** (6 pages)
- [x] `/onboarding` - Welcome wizard after signup
- [x] `/onboarding/create-tour` - Tour creation form
- [x] `/onboarding/success` - Success + next steps
- [x] `/auth/login` - Login page with form validation
- [x] `/auth/signup` - Signup page with form validation
- [x] `/auth/forgot-password` - Password reset page

**User Settings** (2 pages)
- [x] `/settings/account/profile` - User profile editor
- [x] `/settings/account/privacy` - Privacy controls with PrivacyControl component

**Days/Schedule** (1 page)
- [x] `/days/day` - Day sheet view (unusual route pattern - needs refactor)

#### 3. Design System & CSS Refactor (Dec 29, 2025)

**Phase 1: Token System** ✅
- [x] Design tokens in `assets/css/main.css` (spacing, typography, shadows, colors)
- [x] OKLCH color space for better dark mode
- [x] Badge color system (Promoter, Venue, Production, Default)
- [x] Dark mode via @nuxtjs/color-mode + custom variant

**Phase 2: Component Creation** ✅
- [x] `<StatusBadge>` - Replaces 37 instances of inline badge logic
- [x] `<SearchInput>` - Replaces 15 instances of search bar markup
- [x] `<EmptyState>` - Replaces 20 instances of empty state cards
- [x] Result: ~850 lines of code removed, 3 reusable components created

**Phase 3: Page Refactoring** ✅
- [x] Refactored `/companies`, `/contacts`, `/venues`, `/personnel`, `/events`
- [x] Removed duplicate badge color functions
- [x] Standardized search inputs across pages
- [x] Consistent empty states with dashed borders

**Phase 4: Testing & Documentation** ✅
- [x] Dark mode toggle in `NavUser.vue` dropdown
- [x] Visual regression testing (manual)
- [x] Comprehensive `DESIGN_SYSTEM.md` documentation
- [x] Badge colors meet WCAG AA contrast (8:1 light, 6:1 dark)

#### 4. Advanced Component Patterns (Dec-Jan 2026)

**Editable Components** ✅
- [x] `<EditableInfoCard>` - Toggle view/edit modes with inline save/cancel
- [x] `<FacilitiesAccordion>` - Nested event facilities editor
- [x] `<LaborCallTable>` - Labor call schedule builder
- [x] Edit mode pattern documented in roadmap

**Person Detail Sections** ✅
- [x] `<BasicIdentitySection>` - Name, email, phone
- [x] `<ContactInfoSection>` - Address, contact details
- [x] `<EmergencyContactSection>` - Emergency contact info
- [x] `<ProfessionalSection>` - Role, department, bio
- [x] `<SizingSection>` - Clothing sizes for merch/tour jackets
- [x] `<TourPreferencesSection>` - Hotel, bus, flight preferences
- [x] `<TravelDocumentsSection>` - Passport, licenses, TSA PreCheck

**Guest List Components** ✅
- [x] `<GuestTable>` - Sortable guest list with inline actions
- [x] `<TicketAllocations>` - Ticket allocation tracker with used/remaining counts

**Common Components** ✅
- [x] `<PageHeader>` - Reusable page header with breadcrumbs
- [x] `<FormSection>` - Consistent form section wrapper
- [x] `<StatsCard>` - Dashboard stats display
- [x] `<PrivacyControl>` - Privacy setting toggle (Private/Org/Tour Team)

#### 5. Data Architecture & Types (Ongoing)

**Type System** ✅
- [x] Comprehensive `types.ts` (778 lines) - Single source of truth
- [x] 15+ interface definitions (Organization, Tour, Day, Event, Venue, Person, etc.)
- [x] Enums for status types (DayType, TourStatus, AdvanceStatus, etc.)
- [x] Helper types (DayWithDetails, EventWithDetails, TourStats)
- [x] Utility functions (getFullName, getLocation, formatDisplayDate)

**Mock Data Files** ✅ (4,118 total lines)
- [x] `organizations.ts` (24 lines) - Organization data
- [x] `tours.ts` (101 lines) - 4 tours including HomeComing 2025
- [x] `days.ts` (128 lines) - 98-day tour schedule
- [x] `events.ts` (727 lines) - 34 events with full advance details
- [x] `venues.ts` (471 lines) - 15+ venue records
- [x] `people.ts` (609 lines) - Tour personnel with full profiles
- [x] `guests.ts` (318 lines) - Guest list entries
- [x] `hotels.ts` (316 lines) - Hotel accommodations
- [x] `users.ts` (209 lines) - User accounts
- [x] `userGroups.ts` (121 lines) - Permission groups

#### 6. Navigation & UX (Dec 2025)

**Navigation System** ✅
- [x] Single source of truth in `utils/navigation.ts`
- [x] Hierarchical navigation (Navigation, Tour Logistics, Organization)
- [x] Active state detection via `useNavigation()` composable
- [x] `<OrganizationSwitcher>` - Tour/org switcher component
- [x] `<NavMain>` - Collapsible navigation menu renderer
- [x] `<NavUser>` - User profile dropdown with dark mode toggle

**UX Patterns** ✅
- [x] Empty states for all list pages
- [x] Search + filter on major lists (events, personnel, contacts, companies)
- [x] Status badges with consistent colors
- [x] Breadcrumb navigation
- [x] Responsive sidebar (mobile collapse)

#### 7. Documentation (Dec 2025 - Jan 2026)

**Project Documentation** ✅
- [x] `CLAUDE.md` - Project overview and coding standards
- [x] `folder-structure.md` - Complete directory tree
- [x] `tour-manager-sandbox-roadmap.md` - Master page inventory (45 routes)
- [x] `TMP-Frontend-Schema-Audit.md` - UI vs Backend schema comparison
- [x] `DESIGN_SYSTEM.md` - Design tokens and component reference
- [x] `CSS_REFACTOR_ROADMAP.md` - 4-phase CSS cleanup plan (complete)
- [x] `CSS_AUDIT_SUMMARY.md` - Phase 1 cleanup details
- [x] `AUDIT_REPORT.md` - Comprehensive codebase audit
- [x] `MIGRATION-CHECKLIST.md` - WordPress to Nuxt migration notes

---

## The Active Backlog

**The Rule of 10** - Exactly 10 critical UI-focused tasks, sized with (S)mall, (M)edium, or (L)arge complexity tags.

**UI Sandbox Philosophy**: This backlog focuses exclusively on completing the UI/UX prototype layer. Backend integration (Pinia, API routes, Supabase, Auth) is intentionally out of scope.

### UI-First Priority Tasks

#### 1. (M) Refactor Days Route Pattern
**Why**: `/days/day` route is unusual. Need proper dynamic routing `/days/[id]`.

**Scope**:
- Rename `pages/days/day.vue` to `pages/days/[id].vue`
- Update route to accept dynamic day ID param
- Update navigation links to use correct day IDs
- Add day-to-day navigation (prev/next buttons)
- Add empty state for days with no events

**Files**: 1 rename, 1 route update, 2 component updates
**Estimate**: 3-4 hours

---

#### 2. (M) Build Accommodations Pages
**Why**: Sidebar shows Accommodations but pages don't exist.

**Scope**:
- Create `/accommodations` - Hotels list page with search/filter
- Create `/accommodations/[id]` - Hotel detail page with room blocks, rates, contacts
- Add mock data connections to existing `hotels.ts`
- Use existing design patterns from venues pages
- Add empty state handling

**Files**: 2 new pages, 1 mock data update
**Estimate**: 4-6 hours

---

#### 3. (M) Build Transportation Page
**Why**: Sidebar shows Transportation but page doesn't exist.

**Scope**:
- Create `/transportation` - Travel itineraries page
- Show flights, buses, ground transport by day
- Use calendar-style view or list view
- Connect to mock data for transportation records
- Add filters by transport type

**Files**: 1 new page, potential mock data additions
**Estimate**: 4-6 hours

---

#### 4. (M) Build Documents Library
**Why**: Sidebar shows Documents but page doesn't exist.

**Scope**:
- Create `/documents` - Document management UI
- Categories: Contracts, Advances, Invoices, Misc
- Upload placeholder UI (no actual file upload)
- Document list with search/filter
- Document detail view with metadata

**Files**: 1-2 new pages, mock data for documents
**Estimate**: 4-6 hours

---

#### 5. (S) Implement Empty State Logic
**Why**: Major pages need "No Data" states for better UX.

**Scope**:
- Add `<EmptyState>` to `/dashboard` (no tours)
- Add `<EmptyState>` to `/events` (no events)
- Add `<EmptyState>` to `/venues` (no venues)
- Add `<EmptyState>` to `/guest-list/[id]` (no guests)
- Use existing `<EmptyState>` component with conditional v-if

**Files**: 4-5 page updates
**Estimate**: 2-3 hours

---

#### 6. (S) Complete Guest Detail Stub
**Why**: `/guest-list/[id]/[guestId]` is marked as stub. Need full view.

**Scope**:
- Build guest detail page with full profile
- Show guest info, tickets, notes, contact details
- Add edit mode toggle (inline editing pattern)
- Connect to mock guest data
- Add navigation back to guest list

**Files**: 1 page build-out
**Estimate**: 3-4 hours

---

#### 7. (M) Standardize Route Links
**Why**: 20+ `<a>` tags cause full page reloads, losing SPA benefits.

**Scope**:
- Replace all `<a href="/...">` with `<NuxtLink to="...">`
- Fix `pages/index.vue` redirect pattern (use `definePageMeta({ redirect })`)
- Update navigation route mismatches (e.g., `/personnel` → `/people`)
- Remove hardcoded IDs in navigation (e.g., `/guest-list/1`)

**Files**: 10+ pages with `<a>` tags, 1 index.vue, 1 navigation.ts
**Estimate**: 4-6 hours

---

#### 8. (S) SEO & Page Titles
**Why**: No `useHead()` calls. Missing page titles for professional browser tabs.

**Scope**:
- Add `useHead()` to all 41 pages with proper titles
- Format: "Page Name | Tour Management Pro"
- Add favicon and app metadata to `nuxt.config.ts`
- Optional: Create `composables/useSeo.ts` helper for consistency

**Files**: 41 pages, 1 config update, optional 1 composable
**Estimate**: 2-3 hours

---

#### 9. (S) Fix Navigation Route Mismatches
**Why**: Navigation links don't match actual page directories.

**Issues**:
- Navigation has `/personnel` but pages are in `/people` directory
- Guest list navigation hardcoded to `/guest-list/1`
- Some navigation items have incorrect paths

**Scope**:
- Align navigation paths in `utils/navigation.ts` with actual page routes
- Update OrganizationSwitcher or other components with hardcoded paths
- Test all navigation links work correctly

**Files**: 1 navigation.ts, potential component updates
**Estimate**: 2-3 hours

---

#### 10. (M) Mock Data Schema Audit
**Why**: Ensure 4,118 lines of mock data match `@schemas/tour.ts` exactly for future migration compatibility.

**Scope**:
- Compare all mock data files against `schemas/tour.ts` types
- Fix any mismatches or missing fields
- Add schema validation comments to mock data files
- Document any intentional deviations
- Ensure all entities have consistent property names

**Files**: 12 mock data files, 1 schema file review
**Estimate**: 4-6 hours

---

## Technical Debt & Inconsistencies

### 1. BEM vs. Tailwind Workflow Conflicts

**Issue**: Project is transitioning from pure Tailwind utilities to BEM atomic design.

**Evidence**:
- `main.css` has grown from basic config to BEM workflow manager
- Some components use Tailwind utilities (`<StatusBadge>`)
- Other components use scoped styles (`<SearchInput>`, `<EmptyState>`)
- Mixed patterns from different Claude Code prototyping sessions

**Impact**: Style inconsistencies, harder to maintain long-term

**Resolution Plan**:
- Document when to use Tailwind vs. BEM (in `DESIGN_SYSTEM.md` ✅)
- Eventually migrate to full BEM atomic design (future decision)
- For now: Keep Tailwind for layout, BEM for component tokens

---

### 2. No Server Directory (Intended - Sandbox Mode)

**Status**: This is INTENTIONAL for UI sandbox prototyping.

**Current Approach**: Mock data in `utils/mockData/` (4,118 lines)

**Sandbox Benefits**:
- Fast iteration without backend dependencies
- No need for database setup
- Easy to demo and test UI patterns
- Mock data is production-quality for migration

**Future Migration Path** (Out of Scope):
1. Create API routes in `server/api/`
2. Connect Supabase database
3. Replace imports with `useFetch()` calls
4. Keep mock data for testing

---

### 3. No State Management (Intended - Sandbox Mode)

**Status**: This is INTENTIONAL for UI sandbox prototyping.

**Current Approach**: Local component state with refs

**Examples**:
- `OrganizationSwitcher` uses `const activeTeam = ref(props.teams[0])`
- Tour context passed via props and composition
- No global persistence needed for UI prototypes

**Sandbox Benefits**:
- Simple component architecture
- No Pinia boilerplate needed
- Easy to understand component boundaries
- Faster development iteration

**Future Migration Path** (Out of Scope):
- Add Pinia stores for auth, tour context, UI state
- Migrate to global state management when backend exists

---

### 4. Route Naming Inconsistencies

**Issues**:
- Navigation has `/personnel` but pages are `/people`
- Guest list navigation hardcoded to `/guest-list/1`
- Days route is `/days/day` instead of `/days/[id]`

**Impact**: Broken navigation, confusing folder structure

**Resolution**: Tasks #1 (days route), #7 (standardize links), #9 (navigation mismatches)

---

### 5. Hardcoded Navigation Links

**Issue**: 20+ `<a href="...">` tags instead of `<NuxtLink>`

**Evidence**:
```vue
<!-- Found in pages/dashboard.vue, events/index.vue, etc. -->
<a href="/events/add">Add Event</a>
<a :href="`/events/advance/${event.id}`">Advance</a>
```

**Impact**: Full page reloads, loses SPA benefits, no client-side navigation

**Resolution**: Task #7 (standardize route links)

---

### 6. Large Mock Data Files Imported Eagerly (Acceptable - Sandbox Mode)

**Status**: Acceptable trade-off for UI sandbox prototyping

**Current Approach**: `utils/mockData/events.ts` is 727 lines, imported in multiple pages

**Impact**: All event data loads on every page import (not tree-shakeable)

**Sandbox Justification**:
- Fast prototyping without API complexity
- Realistic data for UI testing
- Easy to modify and iterate

**Future Migration Path** (Out of Scope):
- API routes with pagination
- Lazy loading and data fetching
- Client-side caching strategies

---

### 7. No Testing Infrastructure (Intended - Sandbox Mode)

**Status**: Testing is intentionally omitted for UI sandbox prototyping

**Justification**:
- UI sandbox focuses on visual fidelity and UX patterns
- No business logic to test (all mock data)
- Manual QA sufficient for prototypes
- Faster iteration without test overhead

**Future Work** (Out of Scope):
- Add Vitest + Vue Test Utils when backend exists
- Component testing for complex interactions
- E2E testing for critical user flows

---

### 8. Calendar Migration Incomplete

**Issue**: `/calendar` page uses custom implementation. Schedule-X library added but not fully integrated.

**Evidence**:
- `@schedule-x/calendar` installed in package.json
- `utils/scheduleXAdapter.ts` exists for event transformation
- But calendar page still uses old implementation

**Decision**: Documented as P3 (nice-to-have) in roadmap

**Resolution**: Low priority until backend is stable

---

### 9. Ghost Features (Documented but Not Implemented)

**From Schema Audit**: Backend schema has fields UI doesn't use:
- `venues.audioSystem`, `venues.lightingSystem`
- `venues.soundLimiter`, `venues.alcoholLicense`
- `people.title`, `people.website` (for external contacts)

**Inverse Issue**: UI has fields schema doesn't support:
- `events.hotels` (hotel assignments)
- `events.tixSold`, `events.percentSold`
- `venues.merchContact`, `venues.laundryInfo`, `venues.runnerInfo`

**Impact**: UI/schema mismatch will cause issues during future backend integration

**Resolution**: Task #10 (mock data schema audit) - ensure alignment with `@schemas/tour.ts`

---

### 10. Form Submissions Not Wired Up (Intended - Sandbox Mode)

**Status**: This is intentional for UI sandbox prototyping

**Current Behavior**: Add/edit forms log to console but don't persist

**Evidence**:
```ts
// pages/events/add.vue
const onSubmit = handleSubmit(values => {
  console.log('Form submitted:', values)  // ← Just logs
})
```

**Sandbox Justification**:
- Demonstrates form validation and UX flow
- No backend to persist to
- Console logging useful for debugging form state

**Future Migration Path** (Out of Scope):
- Wire forms to API endpoints
- Add optimistic UI updates
- Implement proper error handling

---

## Living Document Sync Protocol

### When to Update This Document

**Trigger Events** (update immediately):
1. **Major milestone completed** - Add to "Done List" with date
2. **New critical blocker discovered** - Add to "Active Backlog" (keep exactly 10)
3. **Architecture decision made** - Update "Technical Debt" section
4. **Scope change** - Update "Executive Status" metrics
5. **Priority shift** - Reorder backlog

**Regular Cadence**:
- **Daily**: Update if working on MASTER_PLAN tasks
- **Weekly**: Review backlog, reprioritize if needed
- **Sprint boundary**: Full audit against git history + docs

---

### How to Update

**Step 1**: Update git commit summary
```bash
git log --oneline -10 --no-decorate > recent_commits.txt
```

**Step 2**: Check documentation drift
```bash
# Compare roadmap to actual pages
ls pages/**/*.vue | wc -l  # Should match roadmap count
```

**Step 3**: Update metrics in "Executive Status"
- Count working pages vs. missing
- Update health scorecard scores
- Check recent commit velocity

**Step 4**: Move completed tasks
- Done tasks: Move from "Active Backlog" → "Done List"
- Add completion date
- Backfill backlog to maintain exactly 10 tasks

**Step 5**: Update "Technical Debt" section
- Remove resolved debt items
- Add newly discovered issues
- Update impact assessments

**Step 6**: Commit the update
```bash
git add docs/MASTER_PLAN.md
git commit -m "docs: update MASTER_PLAN with recent progress"
```

---

### Cross-Document References

This MASTER_PLAN synthesizes:
- `/docs/tour-manager-sandbox-roadmap.md` - Page inventory (45 routes)
- `/docs/TMP-Frontend-Schema-Audit.md` - Schema mismatch analysis
- `/docs/DESIGN_SYSTEM.md` - Component and token reference
- `/docs/CSS_REFACTOR_ROADMAP.md` - CSS cleanup phases
- `/docs/AUDIT_REPORT.md` - Best practices audit
- `/docs/folder-structure.md` - Directory tree

**Sync Rule**: When updating specialized docs, reflect changes here in summary form.

---

### Version History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-08 | 0.9.0 | Initial MASTER_PLAN creation from audit | Claude (PROJECT_AUDIT_MASTER) |

---

## Next Session Quick Start

**For Claude Code resuming this project:**

1. **Read this file first** - MASTER_PLAN is the source of truth
2. **Check git status** - See what's uncommitted
3. **Review Active Backlog** - Pick next task from P1/P2
4. **Check Technical Debt** - Be aware of known issues
5. **Update this doc** - After completing tasks

**Common Commands**:
```bash
# Start dev server (usually already running)
npm run dev

# Check TypeScript
npm run typecheck

# View recent commits
git log --oneline -10

# See modified files
git status

# Count pages
ls pages/**/*.vue | wc -l
```

---

## Appendices

### A. Page Inventory Quick Reference

**Status Key**: ✅ Working | 🟡 Partial | 🔴 Stub | ❌ Not Built

**Core Navigation** (6)
- ✅ `/dashboard`
- ✅ `/calendar`
- ✅ `/events` + `/events/add` + `/events/advance/[slug]`
- ✅ `/days/day` (needs refactor to `/days/[id]`)
- ✅ `/venues` + `/venues/[id]` + `/venues/add`
- ✅ `/contacts` + `/contacts/[id]` + `/contacts/add`

**Tour Logistics** (3)
- ❌ `/accommodations` + `/accommodations/[id]` (task #9)
- ❌ `/transportation` (task #9)
- ❌ `/documents` (task #9)

**Guest List** (3)
- ✅ `/guest-list`
- ✅ `/guest-list/[id]`
- 🔴 `/guest-list/[id]/[guestId]` (stub)

**Organization** (7)
- ✅ `/organization/settings`
- ✅ `/organization/users` + `/organization/users/[id]` + `/organization/users/add`
- ✅ `/organization/groups` + `/organization/groups/[id]` + `/organization/groups/add`

**User Settings** (2)
- ✅ `/settings/account/profile`
- ✅ `/settings/account/privacy`

**Onboarding** (3)
- ✅ `/onboarding` + `/onboarding/create-tour` + `/onboarding/success`

**Auth** (3)
- ✅ `/auth/login` + `/auth/signup` + `/auth/forgot-password`

**Personnel** (2)
- ✅ `/personnel` + `/personnel/[id]`

**Companies** (3)
- ✅ `/companies` + `/companies/[id]` + `/companies/add`

**Total**: 41 routes (27 working, 14 missing/partial/stub)

---

### B. Component Inventory

**Common Components** (7)
- StatusBadge, SearchInput, EmptyState
- PageHeader, FormSection, StatsCard
- PrivacyControl

**Editable Components** (4)
- EditableAccordion, EditableInfoCard
- FacilitiesAccordion, LaborCallTable

**Person Sections** (7)
- BasicIdentitySection, ContactInfoSection, EmergencyContactSection
- ProfessionalSection, SizingSection, TourPreferencesSection, TravelDocumentsSection

**Guest List Components** (2)
- GuestTable, TicketAllocations

**Navigation Components** (4)
- AppSidebar, NavMain, NavUser, OrganizationSwitcher

**shadcn-vue UI Components** (100+)
- Button, Input, Badge, Card, Table, Tabs, Sheet, Form, Select, Calendar, Dropdown, etc.

---

### C. Mock Data Structure

**Files** (12):
1. `types.ts` (778 lines) - Type definitions
2. `organizations.ts` (24 lines) - Org data
3. `tours.ts` (101 lines) - Tour records
4. `days.ts` (128 lines) - Day schedule
5. `events.ts` (727 lines) - Event details
6. `venues.ts` (471 lines) - Venue database
7. `people.ts` (609 lines) - Personnel profiles
8. `guests.ts` (318 lines) - Guest lists
9. `hotels.ts` (316 lines) - Hotel data
10. `users.ts` (209 lines) - User accounts
11. `userGroups.ts` (121 lines) - Permission groups
12. `index.ts` (316 lines) - Exports and helpers

**Total**: 4,118 lines of mock data

---

### D. Documentation Map

| File | Purpose | Last Updated |
|------|---------|--------------|
| `MASTER_PLAN.md` | This file - Project status & roadmap | 2026-01-08 |
| `CLAUDE.md` | Project overview & coding standards | 2025-12-29 |
| `tour-manager-sandbox-roadmap.md` | Page inventory (45 routes) | 2025-12-29 |
| `TMP-Frontend-Schema-Audit.md` | UI vs Backend schema audit | 2025-12-25 |
| `DESIGN_SYSTEM.md` | Component & token reference | 2025-12-29 |
| `CSS_REFACTOR_ROADMAP.md` | CSS cleanup phases | 2025-12-29 |
| `CSS_AUDIT_SUMMARY.md` | Phase 1 cleanup details | 2025-12-29 |
| `AUDIT_REPORT.md` | Best practices audit | 2025-12-24 |
| `folder-structure.md` | Directory tree | 2026-01-03 |
| `MIGRATION-CHECKLIST.md` | WordPress to Nuxt notes | Date unknown |

---

**END OF MASTER_PLAN**
**Version 0.9.0** | **Last Updated**: 2026-01-08
**Status**: Active Development - Ready for Backend Integration
