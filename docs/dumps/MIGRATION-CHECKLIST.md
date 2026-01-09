# Tour Manager Pro: Frontend Migration Checklist

> **Purpose**: Track migration progress from `tmp-frontend-design` (UI playground) to `tour-manager-pro` (full application)
> 
> **Created**: December 24, 2024
> **Last Updated**: December 24, 2024

---

## Pre-Migration Verification

Before migrating any component, verify these foundations are aligned:

### Type Alignment ✅

| Type File | Status | Notes |
|-----------|--------|-------|
| `types/schema.ts` | ✅ Created | Mirrors all Drizzle schemas |
| `types/auth.ts` | ✅ Created | Auth simulation types |
| `types/index.ts` | ✅ Created | Central export |

### Mock Data Alignment ✅

| Mock Data File | Schema Aligned | Notes |
|----------------|----------------|-------|
| `mock-data/organizations.ts` | ✅ | Matches `lib/db/schema/organizations.ts` |
| `mock-data/users.ts` | ✅ | Matches `lib/db/schema/profiles.ts` |
| `mock-data/tours.ts` | ✅ | Matches `lib/db/schema/tours.ts` |
| `mock-data/days.ts` | ✅ | Matches `lib/db/schema/days.ts` |
| `mock-data/events.ts` | ✅ | Matches `lib/db/schema/events.ts` |
| `mock-data/venues.ts` | ✅ | Matches `lib/db/schema/venues.ts` |
| `mock-data/people.ts` | ✅ | Matches `lib/db/schema/people.ts` |

---

## Migration Strategy

### Phase 1: Core Infrastructure
Copy these first as they're dependencies for pages:

```
Priority: HIGHEST
Estimated Effort: 2-3 hours
```

| Item | Source Path | Target Path | Status | Migration Notes |
|------|-------------|-------------|--------|-----------------|
| Type definitions | `types/*.ts` | `types/*.ts` | 🔲 | Merge with existing schema types |
| Navigation | `utils/navigation.ts` | `utils/navigation.ts` | 🔲 | May need to merge with existing |
| Base layout | `layouts/default.vue` | `layouts/default.vue` | 🔲 | Merge auth-aware features |

### Phase 2: UI Components
Shared components used across pages:

```
Priority: HIGH
Estimated Effort: 3-4 hours
```

| Component | Source Path | Target Path | Status | Migration Notes |
|-----------|-------------|-------------|--------|-----------------|
| AppSidebar | `components/AppSidebar.vue` | `components/AppSidebar.vue` | 🔲 | Core navigation |
| TeamSwitcher | `components/TeamSwitcher.vue` | `components/TeamSwitcher.vue` | 🔲 | Org switching |
| NavMain | `components/NavMain.vue` | `components/NavMain.vue` | 🔲 | Main nav items |
| NavUser | `components/NavUser.vue` | `components/NavUser.vue` | 🔲 | User dropdown |
| Breadcrumbs | `components/common/*.vue` | `components/common/*.vue` | 🔲 | If created |

### Phase 3: Pages - Tours Domain

```
Priority: HIGH  
Estimated Effort: 4-6 hours
```

| Page | Source Path | Target Path | Status | API Endpoints Needed | Migration Notes |
|------|-------------|-------------|--------|----------------------|-----------------|
| Tours List | `pages/tours/index.vue` | `pages/tours/index.vue` | 🔲 | `GET /api/tours` | Replace mock data |
| Tour Detail | `pages/tours/[id]/index.vue` | `pages/tours/[id]/index.vue` | 🔲 | `GET /api/tours/:id` | |
| Tour Team | `pages/tours/[id]/team.vue` | `pages/tours/[id]/team.vue` | 🔲 | `GET /api/tour-members` | |
| Tour Settings | `pages/tours/[id]/settings.vue` | `pages/tours/[id]/settings.vue` | 🔲 | `PUT /api/tours/:id` | |

### Phase 4: Pages - Days & Events

```
Priority: HIGH
Estimated Effort: 4-6 hours
```

| Page | Source Path | Target Path | Status | API Endpoints Needed | Migration Notes |
|------|-------------|-------------|--------|----------------------|-----------------|
| Dashboard | `pages/dashboard/index.vue` | `pages/dashboard/index.vue` | 🔲 | Multiple | Aggregate data |
| Days List | `pages/days/index.vue` | `pages/days/index.vue` | 🔲 | `GET /api/days` | |
| Day Detail | `pages/days/[id].vue` | `pages/days/[id].vue` | 🔲 | `GET /api/days/:id` | |
| Events List | `pages/events/index.vue` | `pages/events/index.vue` | 🔲 | `GET /api/events` | |
| Event Detail | `pages/events/[id].vue` | `pages/events/[id].vue` | 🔲 | `GET /api/events/:id` | Advance workflow |
| Calendar | `pages/calendar/index.vue` | `pages/calendar/index.vue` | 🔲 | Days + Events | Complex view |

### Phase 5: Pages - Contacts & Venues

```
Priority: MEDIUM
Estimated Effort: 3-4 hours
```

| Page | Source Path | Target Path | Status | API Endpoints Needed | Migration Notes |
|------|-------------|-------------|--------|----------------------|-----------------|
| People List | `pages/people/index.vue` | `pages/people/index.vue` | 🔲 | `GET /api/people` | |
| Person Detail | `pages/people/[id].vue` | `pages/people/[id].vue` | 🔲 | `GET /api/people/:id` | |
| Venues List | `pages/venues/index.vue` | `pages/venues/index.vue` | 🔲 | `GET /api/venues` | |
| Venue Detail | `pages/venues/[id].vue` | `pages/venues/[id].vue` | 🔲 | `GET /api/venues/:id` | |
| Contacts | `pages/contacts/index.vue` | `pages/contacts/index.vue` | 🔲 | People + Companies | Combined view |

### Phase 6: Settings Pages

```
Priority: MEDIUM
Estimated Effort: 4-5 hours
```

| Page | Source Path | Target Path | Status | API Endpoints Needed | Migration Notes |
|------|-------------|-------------|--------|----------------------|-----------------|
| Account Profile | `pages/settings/account/profile.vue` | `pages/settings/account/profile.vue` | 🔲 | `GET/PUT /api/auth/profile` | |
| Account Security | `pages/settings/account/security.vue` | `pages/settings/account/security.vue` | 🔲 | Supabase Auth | Password change |
| Account Privacy | `pages/settings/account/privacy.vue` | `pages/settings/account/privacy.vue` | 🔲 | Profile privacy fields | |
| Org Details | `pages/settings/organization/details.vue` | `pages/settings/organization/details.vue` | 🔲 | `GET/PUT /api/organizations/:id` | Admin only |
| Org Members | `pages/settings/organization/members/index.vue` | `pages/settings/organization/members/index.vue` | 🔲 | `GET /api/organizations/:id/members` | |
| Member Detail | `pages/settings/organization/members/[id].vue` | `pages/settings/organization/members/[id].vue` | 🔲 | Member + Profile | |

### Phase 7: Guest Lists & Special Features

```
Priority: LOW
Estimated Effort: 2-3 hours
```

| Page | Source Path | Target Path | Status | API Endpoints Needed | Migration Notes |
|------|-------------|-------------|--------|----------------------|-----------------|
| Guest Lists | `pages/guest-list/index.vue` | `pages/guest-list/index.vue` | 🔲 | TBD (not in schema yet) | May need schema |
| Export Views | Various | Various | 🔲 | Multiple | PDF generation |

---

## Per-Page Migration Checklist

For each page migration, complete these steps:

### Before Migration

- [ ] Verify page exists and is complete in frontend-design
- [ ] Document all mock data imports used
- [ ] Document all composables/utilities used
- [ ] Identify API endpoints needed
- [ ] Check if API endpoints exist in main repo

### During Migration

1. **Copy the file**
   ```bash
   cp tmp-frontend-design/pages/[path].vue tour-manager-pro/pages/[path].vue
   ```

2. **Update imports**
   - [ ] Replace `@/utils/mock-data` → `useFetch('/api/...')` 
   - [ ] Replace mock types → schema types from `@/lib/db/schema`
   - [ ] Update component imports if paths differ

3. **Add authentication**
   ```typescript
   // Add to <script setup>
   definePageMeta({
     middleware: ['require-auth']
   })
   ```

4. **Add organization scoping**
   - [ ] Ensure API calls include org context
   - [ ] Add org-specific data filtering if needed

5. **Update data fetching**
   ```typescript
   // Before (mock data)
   import { mockTours } from '@/utils/mock-data'
   const tours = mockTours
   
   // After (real API)
   const { data: tours, pending, error } = await useFetch('/api/tours')
   ```

6. **Handle loading states**
   - [ ] Add loading skeleton/spinner
   - [ ] Handle error states
   - [ ] Add empty states

### After Migration

- [ ] Test with real API
- [ ] Verify auth middleware works
- [ ] Test organization scoping
- [ ] Check responsive design
- [ ] Update any hardcoded IDs or routes
- [ ] Remove any mock data references

---

## Common Migration Patterns

### Pattern 1: List Page

```vue
<!-- Before: Mock Data -->
<script setup lang="ts">
import { mockTours, getToursByOrganization } from '@/utils/mock-data'

const tours = computed(() => getToursByOrganization('org-001'))
</script>

<!-- After: Real API -->
<script setup lang="ts">
definePageMeta({ middleware: ['require-auth'] })

const { data: tours, pending, error } = await useFetch('/api/tours')
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <!-- Content -->
  </div>
</template>
```

### Pattern 2: Detail Page with ID

```vue
<!-- Before: Mock Data -->
<script setup lang="ts">
const route = useRoute()
const tour = computed(() => getTourById(route.params.id as string))
</script>

<!-- After: Real API -->
<script setup lang="ts">
definePageMeta({ middleware: ['require-auth'] })

const route = useRoute()
const { data: tour, pending, error } = await useFetch(
  () => `/api/tours/${route.params.id}`
)
</script>
```

### Pattern 3: Form Submission

```vue
<!-- Before: Mock (no submission) -->
<script setup lang="ts">
function handleSubmit() {
  console.log('Would submit:', formData.value)
}
</script>

<!-- After: Real API -->
<script setup lang="ts">
const { execute, pending } = useFetch('/api/tours', {
  method: 'POST',
  body: formData,
  immediate: false,
})

async function handleSubmit() {
  await execute()
  navigateTo('/tours')
}
</script>
```

---

## Files NOT to Migrate

These files are specific to the UI playground and should not be moved:

| File | Reason |
|------|--------|
| `composables/useAuth.ts` (simulation) | Replace with real auth store |
| `utils/mock-data/*.ts` | Use real API instead |
| `types/auth.ts` (simulation types) | Auth types differ in production |
| Any `*.simulation.*` files | Development only |

---

## Post-Migration Cleanup

After all pages are migrated:

- [ ] Remove mock data files from main repo (if any were copied)
- [ ] Update documentation
- [ ] Run full test suite
- [ ] Test all user flows end-to-end
- [ ] Archive or delete tmp-frontend-design repo

---

## Notes & Decisions

### Type Handling

**Decision**: Keep frontend-design types as a "preview" of what main repo types will look like. When migrating, import from `@/lib/db/schema` instead.

### API Response Shapes

The main repo APIs return responses in this shape:
```typescript
// Success
{ data: T }

// Error  
{ error: { message: string, code?: string } }
```

Ensure migrated pages handle both cases.

### Route Parameter Validation

Main repo has Zod validation on route params. Migrated pages should handle validation errors gracefully.

---

## Quick Reference: API Endpoints

| Domain | Endpoint | Methods | Notes |
|--------|----------|---------|-------|
| Auth | `/api/auth/profile` | GET, PUT | User profile |
| Organizations | `/api/organizations` | GET, POST | List/create orgs |
| Organizations | `/api/organizations/:id` | GET, PUT, DELETE | Org CRUD |
| Org Members | `/api/organizations/:id/members` | GET, POST | Member management |
| Tours | `/api/tours` | GET, POST | Tour list/create |
| Tours | `/api/tours/:id` | GET, PUT, DELETE | Tour CRUD |
| Tour Days | `/api/tours/:id/days` | GET, POST | Days for tour |
| Days | `/api/days/:id` | GET, PUT, DELETE | Day CRUD |
| Events | `/api/events` | GET, POST | Event list/create |
| Events | `/api/events/:id` | GET, PUT, DELETE | Event CRUD |
| Venues | `/api/venues` | GET, POST | Venue list/create |
| Venues | `/api/venues/:id` | GET, PUT, DELETE | Venue CRUD |
| People | `/api/people` | GET, POST | Contact list/create |
| People | `/api/people/:id` | GET, PUT, DELETE | Contact CRUD |
| Companies | `/api/companies` | GET, POST | Company list/create |
| Tour Members | `/api/tour-members` | GET, POST | Team management |

---

*This checklist will be updated as migration progresses.*
