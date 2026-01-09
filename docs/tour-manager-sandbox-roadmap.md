# Tour Manager Pro - Sandbox Development Roadmap

> **Last Updated:** December 29, 2025
> **Purpose:** Single source of truth for what exists, what's missing, and what to build next

---

## Master Page Inventory

**Everything in one place.** Every page, empty state, and missing feature.

| Route | Status | Priority | Notes |
|-------|--------|----------|-------|
| **CORE NAVIGATION** |
| `/` | ✅ Done | - | Redirects to `/dashboard` |
| `/dashboard` | ✅ Working | P1 | Needs empty state (no tours) |
| `/dashboard` (empty) | ❌ Not Built | P1 | "No Tours Yet" + [Create Tour] CTA |
| `/calendar` | ✅ Working | P3 | Want to migrate to Schedule-X later |
| `/events` | ✅ Working | P1 | Needs empty state |
| `/events` (empty) | ❌ Not Built | P1 | "No events scheduled" + [Add Event] CTA |
| `/events/add` | ✅ Working | P1 | Need correct routing set up |
| `/events/advance/[slug]` | ✅ Working | - | Inline editing set up via `/components/editable` |
| `/days` | ✅ Working | P2 | Route is `days/day.vue` - unusual pattern |
| `/days/[id]` | ❌ Not Built | P2 | Proper dynamic day route needed |
| `/days/[id]` (empty) | ❌ Not Built | P2 | "No events scheduled" + day type badge |
| `/venues` | ✅ Working | - | Redirects to first venue |
| `/venues/[id]` | ✅ Working | - | Venue detail |
| `/venues` (empty) | ❌ Not Built | P2 | "No venues added" + [Add Venue] CTA |
| `/contacts` | ✅ Working | P2 | Needs polish |
| `/contacts/[id]` | ✅ Working | P2 | Needs polish |
| `/contacts` (empty) | ❌ Not Built | P2 | "No contacts yet" + [Add Contact] CTA |
| `/companies` | ✅ Working | P2 | Companies list |
| `/companies/[id]` | ✅ Working | P2 | Needs polish |
| `/companies` (empty) | ❌ Not Built | P3 | "No companies added" + [Add Company] CTA |
| **GUEST LIST** |
| `/guest-list` | ✅ Working | - | Guest list overview |
| `/guest-list/[id]` | ✅ Working | P1 | Event guest list |
| `/guest-list/[id]` (empty) | ❌ Not Built | P1 | "No guests added" + [Add Guest] CTA |
| `/guest-list/[id]/[guestId]` | 🔴 Stub | P2 | Guest detail - needs implementation |
| **TOUR LOGISTICS** |
| `/accommodations` | ❌ Not Built | P2 | Hotels list |
| `/accommodations/[id]` | ❌ Not Built | P2 | Hotel detail |
| `/transportation` | ❌ Not Built | P3 | In sidebar, not built |
| `/documents` | ❌ Not Built | P3 | In sidebar, not built |
| **ORGANIZATION** |
| `/organization/settings` | ✅ Working | P1 | Org settings - file doesn't exist |
| `/organization/users` | ✅ Working | P2 | Users list (same as personnel) |
| `/organization/users/[id]` |✅ Working | P2 | User detail |
| `/organization/users/add` | ✅ Working | P2 | Add user form |
| `/organization/groups` | ✅ Working | P3 | User groups list |
| `/organization/groups/[id]` | ✅ Working | P3 | Group detail |
| `/organization/groups/add` | ✅ Working | P3 | Add group |
| **USER SETTINGS** |
| `/settings/account/profile` | ✅ Working | - | User profile |
| `/settings/account/privacy` | ✅ Working | - | Privacy settings |
| **ONBOARDING** |
| `/onboarding` | ✅ Working | P1 | Welcome wizard after signup |
| `/onboarding/create-tour` | ✅ Working | P1 | Tour creation form |
| `/onboarding/success` | ✅ Working | P1 | Success + next steps |
| **AUTH (Main Repo)** |
| `/auth/login` | ✅ Working | P1 | Mockup exists, FormKit broken |
| `/auth/signup` | ✅ Working | P1 | Mockup exists, FormKit broken |
| `/auth/forgot-password` | ✅ Working | P3 | Password reset |

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Working | Loads, displays data, interactions work |
| ✅ Done | Complete, no work needed |
| 🟡 Partial | Loads but missing features or needs polish |
| 🔴 Stub | File exists but placeholder only |
| ❌ Not Built | Doesn't exist, needs to be created |

## Priority Legend

| Priority | Meaning |
|----------|---------|
| P1 | Critical - blocks core user flow |
| P2 | Important - needed for full experience |
| P3 | Nice to have - can wait |
| - | Done or no action needed |

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Working/Done | 17 |
| 🟡 Partial | 8 |
| 🔴 Stub | 1 |
| ❌ Not Built | 19 |
| **Total** | **45** |

---

## What To Work On Next

### P1 - Critical (Do First)

1. **Empty state for `/dashboard`** - New user hits dashboard with no tours
2. **Empty state for `/events`** - Tour exists but no events
3. **Empty state for `/guest-list/[id]`** - Event exists but no guests
4. **`/onboarding` flow** - First-time user experience (3 pages)
5. **`/organization/settings`** - Page doesn't exist
6. **Fix `/events/add` routing** - Routing not set up correctly
7. **Auth forms** - Replace broken FormKit with shadcn/ui

### P2 - Important (Do Second)

1. **`/days/[id]`** - Proper dynamic route for day sheet
2. **`/accommodations`** - Hotels list and detail
3. **Polish contacts/companies** - Working but need refinement
4. **`/guest-list/[id]/[guestId]`** - Stub needs implementation
5. **`/organization/users/add`** - Missing add user form
6. **Remaining empty states** - venues, contacts, companies, days

### P3 - Nice to Have (Do Later)

1. **Calendar migration to Schedule-X**
2. **`/transportation`** - Not critical for MVP
3. **`/documents`** - Not critical for MVP
4. **`/auth/forgot-password`**
5. **Organization groups polish**

---

## Confirmed Decisions

| Decision | Answer |
|----------|--------|
| Venues | Shared DB with autocomplete + org's history at venue |
| Hotels | Org-scoped only |
| Guest List | Per-day scope |
| Day Types | Show Day, Travel Day, Day Off, Rehearsal, Press Day, On Hold, Other |
| Schedule Labels | Predefined list with autocomplete |
| Tour Switcher | Most recent on top |
| Calendar Library | Evaluate Schedule-X in P3 |
| Naming | Keep "Events" (not "Shows") for broader market |

---

## Navigation Structure

| Group | Items | Access |
|-------|-------|--------|
| **Navigation** | Dashboard, Events, Days, Calendar, Venues, Contacts | Role-based |
| **Tour Logistics** | Transportation, Accommodations, Documents | Admin |
| **Organization** | Settings, Users, Groups | Admin |

---

## Notes

- `/personnel` routes removed - same as `/organization/users` with different label
- Empty states are conditional renders within existing pages, not separate routes
- Edit mode pattern: Toggle via "Edit Event" button in `/components/editable/`
