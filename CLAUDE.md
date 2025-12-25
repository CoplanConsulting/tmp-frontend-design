# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: HomeComing 2.0 - Tour Management System

A modern tour management application built with Nuxt 3, replacing Eventric's Master Tour system. Manages tour schedules, events, venues, personnel, guest lists, and daily logistics for touring productions.

## Core Tech Stack
- **Framework**: Nuxt 3 (Vue 3, Script Setup, TypeScript)
- **Styling**: Tailwind CSS 4.x (CSS-first configuration via `@theme` in `assets/css/main.css`)
- **UI Library**: shadcn-vue (Radix Vue primitives)
- **Icons**: lucide-vue-next
- **Forms**: vee-validate + zod
- **State**: Pinia (to be implemented for auth/global state)
- **Database**: Supabase (planned)

## Development Commands
```bash
npm install                              # Install dependencies
npx nuxi dev                            # Start dev server
npx nuxi build                          # Production build
npx nuxi typecheck                      # TypeScript checking
npx shadcn-vue@latest add [component]   # Add UI component
```

## Architecture Standards

### Layouts & Navigation
- **Standard Layout**: All pages use `layouts/default.vue` with `AppSidebar`
- **Navigation Source**: Single source of truth at `utils/navigation.ts`
  - Exports `navigationSections` (array of sections with icons)
  - Used by `AppSidebar` → `NavMain` component
  - Modify navigation in ONE place only
- **Exception**: `/pages/sidebar/index.vue` is a test page (will be deleted)

### Component Organization
```
components/
├── AppSidebar.vue          # Main app sidebar (used in default layout)
├── NavMain.vue             # Navigation menu renderer
├── NavUser.vue             # User profile dropdown
├── OrganizationSwitcher.vue        # Tour/organization switcher
├── common/                 # Reusable app components
└── ui/                     # shadcn-vue components
```

### Data & State Management
- **Current**: Mock data in `utils/mock*.ts` files
- **Future**:
  - API routes in `server/api/`
  - Pinia stores for global state (user, current tour, etc.)
  - Supabase for database + auth

### File Organization
- **Pages**: File-based routing in `pages/` (all use default layout)
- **Utils**: Pure functions, helpers, mock data
- **Composables**: Reactive state and logic (e.g., `useNavigation.ts`)
- **Assets**: Processed assets (images, CSS)
- **Public**: Static assets

## Coding Standards

### Vue/Nuxt Conventions
- Use `<script setup lang="ts">` for all components
- Use `@/` alias for absolute imports
- Rely on Nuxt auto-imports (components, composables, utils)
- Define page metadata with `definePageMeta()` when needed

### Styling
- **Primary**: Tailwind 4 utility classes
- **Tokens**: Define in `assets/css/main.css` using `@theme` blocks
- **No inline styles** - use Tailwind or CSS variables
- **Arbitrary values**: Use `[42px]`, `[#ff0000]` for exact mockup matching
- **Important**: No `tailwind.config.js` file (Tailwind 4 uses CSS-first config)

### TypeScript
- Define interfaces for all data structures
- Type props and emits in components
- Keep types near their usage (or in utils files)

## Domain-Specific Notes

### Tour Management Features
- **Events**: Shows, travel days, off days
- **Advance**: Detailed event planning (venue, production, facilities, crew, etc.)
- **Personnel**: Crew directory with roles and departments
- **Guest Lists**: Per-event guest management
- **Venues**: Venue database with contacts, capacities, technical specs
- **Calendar**: Monthly view of tour schedule

### User Roles (Planned)
- Admin, Manager, Viewer (or more granular)
- Role-based CRUD permissions throughout app
- Supabase Row Level Security for data access

## Key Principles

1. **Keep it Simple**: Don't over-engineer. One step at a time.
2. **Single Source of Truth**: Navigation, layouts, types - consolidate, don't duplicate
3. **WordPress Mental Model**: Think of Nuxt like WordPress but flipped:
   - Supabase = Database
   - `/server/api/` = REST API / WordPress functions
   - Pinia stores = Global variables (`$current_user`, `$current_tour`)
   - `layouts/default.vue` = WordPress admin wrapper
4. **Mockup-Driven**: UI closely matches design mockups in `/mocks`
5. **Production-Grade**: Use `frontend-design` skill for distinctive, professional aesthetics
