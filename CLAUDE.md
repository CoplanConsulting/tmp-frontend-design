# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: Tour Management System

A modern tour management application built with Nuxt 3, replacing Eventric's Master Tour system. Manages tour schedules, events, venues, personnel, guest lists, and daily logistics for touring productions.

## Sandbox Manifesto

**THIS IS A UI/UX PROTOTYPING ENVIRONMENT - BACKEND WORK IS STRICTLY OUT OF SCOPE**

This project is a UI sandbox focused exclusively on visual fidelity, user flows, and interaction patterns. The goal is to create a production-grade frontend that can be easily migrated to a backend later.

### What This Project IS
- ✅ **UI/UX Prototyping**: Building polished, interactive interfaces
- ✅ **Component Development**: Creating reusable, well-structured components
- ✅ **Mock Data Integration**: Using realistic test data from `utils/mockData/`
- ✅ **Design System**: Establishing consistent styling with Tailwind 4 + BEM
- ✅ **User Flow Testing**: Demonstrating how features work end-to-end

### What This Project IS NOT
- ❌ **Backend Development**: No API routes, no database integration
- ❌ **State Management**: No Pinia stores, use local component state only
- ❌ **Authentication**: Auth pages are UI demos only, no real auth logic
- ❌ **Data Persistence**: Forms log to console, nothing saves to a database
- ❌ **Testing**: No unit tests, integration tests, or E2E tests

### Why Sandbox Mode?
- **Faster Iteration**: No backend complexity slows down UI development
- **Visual Focus**: Designers and stakeholders can review real interfaces
- **Easy Migration**: Mock data matches `@schemas/tour.ts` for future backend integration
- **Portable Demo**: Can showcase UX patterns without infrastructure dependencies

### Developer Guidelines
When working in this project:
1. **Use Mock Data**: Always import from `utils/mockData/` for realistic content
2. **Local State Only**: Use `ref()`, `computed()`, and props - no global stores
3. **Schema Alignment**: Ensure all mock data matches `@schemas/tour.ts` types
4. **Console Logging**: Forms and actions log to console instead of persisting
5. **No Backend Assumptions**: Don't write code expecting API routes or Supabase

**If a task involves Pinia, API routes, Supabase, authentication logic, or testing - it's out of scope for this sandbox.**

## Task-Master Architecture

This project uses a structured documentation system to streamline development:

- **System Prompts**: `docs/prompts/system/` - PRD templates, task parsers, audit frameworks
  - `PRD_ARCHITECT.md` - Transform brain dumps into PRDs
  - `TASK_PARSER.md` - Break PRDs into 10 actionable tasks (S/M/L sizing)
  - `PROJECT_AUDIT_MASTER.md` - Deep-dive audits to generate living Master Plan
  - `SESSION_SYNC.md` - Post-session debriefs and documentation updates
- **Context Rules**: `.claude/rules/` - Domain-specific guidelines (auto-loaded by file path)
  - `styling.md` - Tailwind 4/BEM rules (Target: `**/*`)
  - `ui.md` - shadcn-vue/component guidelines (Target: `components/**/*`)
  - `calendar.md` - schedule-x/calendar patterns (Target: `pages/calendar/**/*`)
- **Master Plan**: `docs/MASTER_PLAN.md` - Living document of DONE, IN PROGRESS, and DEBT

## Core Tech Stack
- **Framework**: Nuxt 3 (Vue 3, Script Setup, TypeScript)
- **Styling**: Tailwind CSS 4.x (CSS-first configuration via `@theme` in `assets/css/main.css`)
- **UI Library**: shadcn-vue (Radix Vue primitives)
- **Icons**: lucide-vue-next
- **Forms**: vee-validate + zod
- **State**: Local component state (ref, computed, props) - NO Pinia in sandbox mode
- **Data**: Mock data from `utils/mockData/` - NO database or API routes

## Development Commands
```bash
npm install                              # Install dependencies
npx nuxi dev                            # Start dev server
npx nuxi build                          # Production build
npx nuxi typecheck                      # TypeScript checking
npx shadcn-vue@latest add [component]   # Add UI component
```

**Note**: Dev server is typically running in a separate terminal window on `http://localhost:3000` during development. Claude should not start/stop the server unless explicitly requested.

## Architecture Standards

### Layouts & Navigation
- **Standard Layout**: All pages use `layouts/default.vue` with `AppSidebar`
- **Navigation Source**: Single source of truth at `utils/navigation.ts`
  - Exports `navigationSections` (array of sections with icons)
  - Used by `AppSidebar` → `NavMain` component
  - Modify navigation in ONE place only
- **Exception**: `/pages/sidebar/index.vue` is a test page (will be deleted)

### Component Organization
See `.claude/rules/ui.md` for detailed component guidelines, shadcn-vue usage, and folder structure.

**Quick Reference**:
- `components/ui/` - shadcn-vue primitives (auto-generated)
- `components/common/` - Reusable app-specific components
- Top-level: Layout components (AppSidebar, NavMain, NavUser, OrganizationSwitcher)

### Data & State Management
- **UI Sandbox Approach**: Use local reactive state only
  - Use `ref()`, `computed()`, and `reactive()` for component state
  - Pass data via props for parent-child communication
  - Pass data via query params for page-to-page flows
  - Import mock data from `utils/mockData/` for realistic content
  - NO Pinia stores - global state management is out of scope
  - NO API fetching - all data comes from mock imports

### File Organization
- **Pages**: File-based routing in `pages/` (all use default layout)
- **Utils**: Pure functions, helpers, mock data
- **Composables**: Reactive state and logic (e.g., `useNavigation.ts`)
- **Assets**: Processed assets (images, CSS)
- **Public**: Static assets

### Special Directories

#### `/pages/calendar/`
See `.claude/rules/calendar.md` for detailed calendar module guidelines, schedule-x integration, and data patterns.

**Quick Reference**:
- Purpose: UI/UX prototyping for calendar views
- Current Status: Migrating from prototype to **schedule-x** (https://schedule-x.dev/docs/calendar)
- Data: Uses `~/utils/mockData` (getCalendarDays(), CalendarDay, DAY_TYPE_CONFIG)

## Coding Standards

### Vue/Nuxt Conventions
- Use `<script setup lang="ts">` for all components
- Use `@/` alias for absolute imports
- Rely on Nuxt auto-imports (components, composables, utils)
- Define page metadata with `definePageMeta()` when needed

### Styling
See `.claude/rules/styling.md` for detailed styling guidelines, Tailwind 4 configuration, and BEM workflow.

**Quick Reference**:
- Primary: Tailwind 4 utility classes
- Configuration: CSS-first via `@theme` blocks in `assets/css/main.css`
- **CRITICAL**: No `tailwind.config.js` file (Tailwind 4 uses CSS-first config)
- BEM Workflow: Transitioning to BEM atomic design for consistency

### TypeScript
- Define interfaces for all data structures
- Type props and emits in components
- Keep types near their usage (or in utils files)

### Documentation
- **IMPORTANT**: When creating new files/folders or modifying project structure, ALWAYS update `docs/folder-structure.md`
- Update the folder tree to reflect new pages, components, schemas, or utilities
- Add a "Recent Additions" entry with date and description
- This keeps the project documentation accurate and helps onboarding

## Domain-Specific Notes

### Tour Management Features
- **Events**: Shows, travel days, off days
- **Advance**: Detailed event planning (venue, production, facilities, crew, etc.)
- **Personnel**: Crew directory with roles and departments
- **Guest Lists**: Per-event guest management
- **Venues**: Venue database with contacts, capacities, technical specs
- **Calendar**: Monthly view of tour schedule

### User Roles (UI Demo Only)
- **Visual Representation Only**: Auth pages and role indicators are UI demos
- Roles: Admin, Manager, Viewer (shown in UI, not enforced)
- No actual authentication or authorization logic
- Role-based UI elements for demonstration purposes

## Key Principles

1. **Keep it Simple**: Don't over-engineer. One step at a time.
2. **Single Source of Truth**: Navigation, layouts, types - consolidate, don't duplicate
3. **UI Sandbox First**: Focus on visual fidelity and user experience, not backend logic
4. **Mock Data Realism**: Use production-quality mock data from `utils/mockData/`
5. **Schema Alignment**: Ensure all mock data matches `@schemas/tour.ts` for future migration
6. **Mockup-Driven**: UI closely matches design mockups in `/mocks`
7. **Production-Grade**: Use `frontend-design` skill for distinctive, professional aesthetics
