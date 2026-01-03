# Project Folder Structure

Last updated: 2026-01-03
.
├── app.vue
├── assets├── app.vue
├── assets
│   ├── css
│   │   └── main.css
│   └── img
│       ├── me.jpg
│       └── shadcn.jpg
├── CLAUDE.md
├── components
│   ├── AppSidebar.vue
│   ├── common
│   │   ├── EmptyState.vue
│   │   ├── FormSection.vue
│   │   ├── PageHeader.vue
│   │   ├── SearchInput.vue
│   │   ├── StatsCard.vue
│   │   └── StatusBadge.vue
│   ├── editable
│   │   ├── EditableAccordion.vue
│   │   ├── EditableInfoCard.vue
│   │   ├── FacilitiesAccordion.vue
│   │   └── LaborCallTable.vue
│   ├── guest-list
│   │   ├── GuestTable.vue
│   │   └── TicketAllocations.vue
│   ├── NavMain.vue
│   ├── NavProjects.vue
│   ├── NavUser.vue
│   ├── OrganizationSwitcher.vue
│   ├── person
│   │   ├── PersonDetailLayout.vue
│   │   └── sections
│   │       ├── BasicIdentitySection.vue
│   │       ├── ContactInfoSection.vue
│   │       ├── EmergencyContactSection.vue
│   │       ├── ProfessionalSection.vue
│   │       ├── SizingSection.vue
│   │       ├── TourPreferencesSection.vue
│   │       └── TravelDocumentsSection.vue
│   ├── PrivacyControl.vue
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
│   ├── useNavigation.ts
│   └── useSelectedEvent.ts
├── docs
│   ├── AUDIT_REPORT.md
│   ├── CSS_AUDIT_SUMMARY.md
│   ├── CSS_REFACTOR_ROADMAP.md
│   ├── DESIGN_SYSTEM.md
│   ├── folder-structure.md
│   ├── MIGRATION-CHECKLIST.md
│   ├── Page_By_Page_Review_Notes.rtf
│   ├── prompts
│   │   └── OPUS-PROMPT-UX-FLOW-PLANNING.md
│   ├── TMP-Frontend-Schema-Audit.md
│   └── tour-manager-sandbox-roadmap.md
├── folder-structure.md
├── layouts
│   └── default.vue
├── lib
│   └── utils.ts
├── mocks
│   ├── Add_Event.jpg
│   ├── Calendar_Month.png
│   ├── Dashboard.png
│   ├── Event_Details_Advance_TM.png
│   ├── Event_details.png
│   ├── Event_Guest_Add.png
│   ├── Event_Guest_List.png
│   ├── Events_LIst_TM.png
│   ├── Login_Form.jpg
│   └── Sign_Up_Form.jpg
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── auth
│   │   ├── forgot-password.vue
│   │   ├── login.vue
│   │   └── signup.vue
│   ├── calendar
│   │   └── index.vue
│   ├── companies
│   │   ├── [id].vue
│   │   ├── add.vue
│   │   ├── empty.vue
│   │   └── index.vue
│   ├── contacts
│   │   ├── [id].vue
│   │   ├── add.vue
│   │   ├── empty.vue
│   │   └── index.vue
│   ├── dashboard.vue
│   ├── days
│   │   └── day.vue
│   ├── events
│   │   ├── add.vue
│   │   ├── advance
│   │   │   └── [slug].vue
│   │   └── index.vue
│   ├── guest-list
│   │   ├── [id]
│   │   │   ├── [guestId].vue
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── index.vue
│   ├── onboarding
│   │   ├── create-tour.vue
│   │   ├── index.vue
│   │   └── success.vue
│   ├── organization
│   │   ├── groups
│   │   │   ├── [id].vue
│   │   │   ├── add.vue
│   │   │   └── index.vue
│   │   ├── settings.vue
│   │   └── users
│   │       ├── [id].vue
│   │       ├── add.vue
│   │       └── index.vue
│   ├── personnel
│   │   ├── [id].vue
│   │   └── index.vue
│   ├── settings
│   │   └── account
│   │       ├── privacy.vue
│   │       └── profile.vue
│   └── venues
│       ├── [id].vue
│       ├── add.vue
│       ├── empty.vue
│       └── index.vue
├── plugins
│   └── temporal-polyfill.client.ts
├── public
│   └── img
│       ├── me.jpg
│       └── shadcn.jpg
├── sandbox.html
├── schemas
│   └── tour.ts
├── stores
├── tsconfig.json
└── utils
    ├── mockData
    │   ├── days.ts
    │   ├── events.ts
    │   ├── guests.ts
    │   ├── hotels.ts
    │   ├── index.ts
    │   ├── organizations.ts
    │   ├── people.ts
    │   ├── tours.ts
    │   ├── types.ts
    │   ├── userGroups.ts
    │   ├── users.ts
    │   └── venues.ts
    ├── navigation.ts
    └── scheduleXAdapter.ts

64 directories, 269 files