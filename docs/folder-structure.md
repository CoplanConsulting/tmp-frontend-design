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
│   ├── folder-structure.md (this file)
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
│   └── Events_LIst_TM.png
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── calendar
│   │   └── index.vue
│   ├── companies
│   │   ├── [id].vue
│   │   └── index.vue
│   ├── contacts
│   │   ├── [id].vue
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
