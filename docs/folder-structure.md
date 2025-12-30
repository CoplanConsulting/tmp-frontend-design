# Project Folder Structure

Last updated: 2025-12-29

```
.
├── app.vue
├── assets
│   ├── css
│   │   └── main.css
│   └── img
│       ├── me.jpg
│       └── shadcn.jpg
├── AUDIT_REPORT.md
├── CLAUDE.md
├── components
│   ├── AppSidebar.vue
│   ├── common
│   │   ├── FormSection.vue
│   │   ├── PageHeader.vue
│   │   ├── StatsCard.vue
│   │   └── StatusBadge.vue
│   ├── editable
│   │   ├── EditableAccordion.vue
│   │   ├── EditableInfoCard.vue
│   │   ├── FacilitiesAccordion.vue
│   │   └── LaborCallTable.vue
│   ├── guest-list
│   │   ├── GuestTable.vue
│   │   └── TicketAllocations.vue
│   ├── NavMain.vue
│   ├── NavProjects.vue
│   ├── NavUser.vue
│   ├── OrganizationSwitcher.vue
│   └── ui
│       ├── accordion
│       ├── avatar
│       ├── badge
│       ├── breadcrumb
│       ├── button
│       ├── calendar
│       ├── card
│       ├── collapsible
│       ├── dropdown-menu
│       ├── form
│       ├── input
│       ├── label
│       ├── popover
│       ├── select
│       ├── separator
│       ├── sheet
│       ├── sidebar
│       ├── skeleton
│       ├── table
│       ├── tabs
│       ├── textarea
│       └── tooltip
├── components.json
├── composables
│   ├── useNavigation.ts
│   └── useSelectedEvent.ts
├── docs
│   ├── folder-structure.md
│   ├── CSS_AUDIT_SUMMARY.md
│   ├── CSS_REFACTOR_ROADMAP.md
│   ├── MIGRATION-CHECKLIST.md
│   └── TMP-Frontend-Schema-Audit.md
├── layouts
│   └── default.vue
├── lib
│   └── utils.ts
├── mocks
│   ├── Add_Event.jpg
│   ├── Calendar_Month.png
│   ├── Dashboard.png
│   ├── Event_Details_Advance_TM.png
│   ├── Event_details.png
│   ├── Event_Guest_Add.png
│   ├── Event_Guest_List.png
│   ├── Events_LIst_TM.png
│   ├── Login_Form.jpg
│   └── Sign_Up_Form.jpg
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── auth
│   │   ├── forgot-password.vue
│   │   ├── login.vue
│   │   └── signup.vue
│   ├── calendar
│   │   └── index.vue
│   ├── companies
│   │   ├── [id].vue
│   │   ├── add.vue
│   │   ├── empty.vue
│   │   └── index.vue
│   ├── contacts
│   │   ├── [id].vue
│   │   ├── add.vue
│   │   ├── empty.vue
│   │   └── index.vue
│   ├── dashboard.vue
│   ├── days
│   │   └── day.vue
│   ├── events
│   │   ├── add.vue
│   │   ├── advance
│   │   │   └── [slug].vue
│   │   └── index.vue
│   ├── guest-list
│   │   ├── [id]
│   │   │   ├── [guestId].vue
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── index.vue
│   ├── onboarding
│   │   ├── create-tour.vue
│   │   ├── index.vue
│   │   └── success.vue
│   ├── organization
│   │   ├── groups
│   │   │   ├── [id].vue
│   │   │   ├── add.vue
│   │   │   └── index.vue
│   │   ├── settings.vue
│   │   └── users
│   │       ├── [id].vue
│   │       ├── add.vue
│   │       └── index.vue
│   ├── personnel
│   │   ├── [id].vue
│   │   └── index.vue
│   ├── settings
│   │   └── account
│   │       ├── privacy.vue
│   │       └── profile.vue
│   └── venues
│       ├── [id].vue
│       ├── add.vue
│       ├── empty.vue
│       └── index.vue
├── public
│   └── img
│       ├── me.jpg
│       └── shadcn.jpg
├── sandbox.html
├── schemas
│   └── tour.ts
├── tsconfig.json
└── utils
    ├── mockData
    │   ├── days.ts
    │   ├── events.ts
    │   ├── guests.ts
    │   ├── hotels.ts
    │   ├── index.ts
    │   ├── organizations.ts
    │   ├── people.ts
    │   ├── tours.ts
    │   ├── types.ts
    │   ├── userGroups.ts
    │   ├── users.ts
    │   └── venues.ts
    └── navigation.ts
```

## Recent Additions

### CSS Architecture Audit & Phase 1 Token System (2025-12-29)
- **Complete CSS Cleanup**: Rewrote `assets/css/main.css` with proper TW4 structure
  - Removed 20+ redundant variable mappings (`--color-x: var(--x)`)
  - Added typography scale tokens (`--font-size-xs` through `--font-size-3xl`)
  - Added spacing scale tokens (8px grid: `--spacing-0` through `--spacing-16`)
  - Added shadow system (6 levels: xs, sm, base, md, lg, xl)
  - Added transition tokens (fast, base, slow with timing function)
- **Badge Color System**: Global utility classes with dark mode support
  - `.badge-promoter`, `.badge-venue`, `.badge-production`, `.badge-default`
  - OKLCH-based colors with automatic dark mode switching
  - Replaces 37 inline badge color implementations
- **Layout Utilities**: Semantic spacing classes
  - `.gap-section`, `.p-card`, `.mb-section` (uses spacing tokens)
  - `.shadow-card`, `.shadow-card-hover` (consistent elevation)
- **Documentation**:
  - Added `docs/CSS_AUDIT_SUMMARY.md` with full Phase 1 change log
  - Added `docs/CSS_REFACTOR_ROADMAP.md` with Phase 2-4 implementation plan
    - Breaks remaining work into digestible Claude prompts
    - Progress tracking with checkboxes
    - Context preservation for multi-session work
- **Dark Mode**: Complete light/dark token system ready for production

### Empty States & Add Forms for Venues (2025-12-29)
- **Complete User Flow** - Empty state → Add form → Success:

  **Venues Flow:**
  1. `/venues/empty` - Empty state showcase page with "Add Your First Venue" CTA
  2. `/venues/add` - Comprehensive venue creation form (basic info, contacts, technical specs, logistics, amenities, hospitality, parking, notes)
  3. On save → navigates to `/venues` index
  4. `/venues` index now shows:
     - Grid view of all venues (name, location, capacity, contact info)
     - Empty state when no venues exist
     - Click venue card → navigates to `/venues/[id]` detail page

- **Form Sections** in `/venues/add`:
  - Basic Information (name, address, phone, website, capacity)
  - Contacts (venue contact, production contact)
  - Technical Specs (stage dimensions, load-in info, power info)
  - Logistics & Amenities (dressing rooms, laundry, runner)
  - Hospitality (WiFi, merch split, merch contact)
  - Parking (bus parking, parking instructions)
  - Additional Notes

- Design approach: Comprehensive venue database management matching companies/contacts pattern

### Empty States & Add Forms for Companies & Contacts (2025-12-29)
- **Complete User Flow** - Empty state → Add form → Success:

  **Companies Flow:**
  1. `/companies/empty` - Empty state showcase page with "Add Your First Company" CTA
  2. `/companies/add` - Full company creation form (name, type, address, contact info, notes)
  3. On save → navigates to `/companies` index

  **Contacts Flow:**
  1. `/contacts/empty` - Empty state showcase page with "Add Your First Contact" CTA
  2. `/contacts/add` - Full contact creation form (name, title, role, company, email, phone, notes)
  3. On save → navigates to `/contacts` index

- **Empty State Pages** (`empty.vue`):
  - Clean showcase pages with just header + empty state card
  - Dashed border "invitation zone" design
  - CTA buttons navigate to respective `/add` pages

- **Add Form Pages** (`add.vue`):
  - Professional layout matching `/events/advance/[slug]` aesthetic
  - Back navigation breadcrumb
  - Form in white card with logical field grouping
  - Section dividers and helper text
  - Black "Save" button + outline "Cancel" button
  - Blue helper card explaining "What happens next?"

- **Index Pages** (`index.vue`) - Dual empty states:
  - **True empty** (no data): Dashed border card with "Add Your First X" CTA
  - **Filtered empty** (filtered out): "No matches" message with "Clear Filters" button
  - Helper functions: `hasActiveFilters`, `clearFilters()`, `handleAddX()`

- Design approach: Professional, action-oriented UX that guides new users through complete workflows

### Authentication Pages (2025-12-29)
- `pages/auth/` - Pre-authentication pages (no default layout)
  - `login.vue` - Login form with email/password fields
  - `signup.vue` - Sign-up form with two-column grid layout
  - `forgot-password.vue` - Password reset request form
- `mocks/Login_Form.jpg` - Login page mockup
- `mocks/Sign_Up_Form.jpg` - Sign-up page mockup
- Simple sandbox prototypes: no validation, no state management, console.log only
- Post-login navigation to `/dashboard`, post-signup to `/onboarding`

### Onboarding Flow (2025-12-29)
- `pages/onboarding/` - 3-step onboarding flow for new users
  - `index.vue` - Welcome page with tour creation options
  - `create-tour.vue` - Tour creation form with validation
  - `success.vue` - Success confirmation page
- `schemas/tour.ts` - Zod validation schema for tour forms

### Editable Components (previous)
- `components/editable/` - Reusable editable UI components
  - `EditableAccordion.vue` - Accordion with edit mode
  - `EditableInfoCard.vue` - Card with inline editing
  - `FacilitiesAccordion.vue` - Facilities editing accordion
  - `LaborCallTable.vue` - Labor call schedule table
