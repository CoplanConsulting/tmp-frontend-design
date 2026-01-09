# AUDIT REPORT: HomeComing 2.0 Nuxt 3 Project

**Date**: December 24, 2025
**Project**: HomeComing 2.0 - Tour Management System
**Tech Stack**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS 4, shadcn-vue

---

## 1. QUICK HEALTH CHECK (5-10 min)

### ✅ **What's Working Well**

1. **Script Setup Usage** - All components consistently use `<script setup lang="ts">` (pages/dashboard.vue:1, pages/events/index.vue:1, components/AppSidebar.vue:1)
2. **No Options API** - Entire codebase uses Composition API exclusively
3. **TypeScript Configuration** - Properly configured with strict mode enabled (nuxt.config.ts:30-33)
4. **Layout Structure** - Pages correctly use the default layout system
5. **Tailwind 4 CSS-First Config** - Properly configured using `@theme` blocks (assets/css/main.css:5-32)

### ⚠️ **Issues Found (Prioritized)**

#### **CRITICAL**

1. **Improper Navigation in Index Page** (pages/index.vue:2)
   - Uses `navigateTo()` at top level without `await` or lifecycle hook
   - Should use middleware or `onMounted()` hook

   ```vue
   <!-- Current (incorrect) -->
   <script setup lang="ts">
   navigateTo('/dashboard')
   </script>

   <!-- Should be -->
   <script setup lang="ts">
   definePageMeta({
     redirect: '/dashboard'
   })
   </script>
   ```

#### **IMPORTANT**

2. **Hardcoded `<a>` Tags Instead of NuxtLink**
   - Found in: pages/dashboard.vue:68, pages/events/index.vue:61,64,94,97,100
   - Should use `<NuxtLink>` for client-side navigation
   - **Impact**: Full page reloads instead of SPA navigation

3. **Unnecessary Manual Imports** (layouts/default.vue:2-14)
   - Manually importing components that should auto-import
   - Remove manual imports for `AppSidebar`, `Breadcrumb`, `Separator`, `Sidebar` components

4. **Large Commented Code Block** (components/AppSidebar.vue:52-155)
   - 100+ lines of commented navigation config
   - Delete or move to documentation

5. **Missing Server Directory**
   - No `server/api/` routes exist yet
   - All data is mock data in utils files
   - Will need API layer for Supabase integration

#### **NICE-TO-HAVE**

6. **Mixed Import Patterns** (utils/navigation.ts:1-13)
   - Using manual icon imports
   - Could leverage auto-imports for cleaner code

7. **Navigation URL Inconsistency** (utils/navigation.ts:40,41)
   - `/personnel` route doesn't match existing `/people` page
   - `/guest-list/1` hardcoded ID in navigation

---

## 2. COMPREHENSIVE BEST PRACTICES AUDIT (20-30 min)

### **1. Architecture & Organization** ⭐⭐⭐⭐☆ (4/5)

#### ✅ **Strengths**
- **Excellent file structure** following Nuxt conventions
- **Single source of truth** for navigation (utils/navigation.ts)
- **Proper layout inheritance** with default layout
- **Clean component organization** (common/, ui/, feature-specific)

#### ⚠️ **Issues**

**Missing Directories:**
```
project/
├── server/
│   └── api/          # No API routes yet
├── stores/           # Pinia stores not created
└── middleware/       # No route middleware
```

**Recommendation**: Create server/api structure before Supabase integration. Current mock data pattern (utils/mockEvents.ts) is good for development but needs migration path.

---

### **2. Vue 3 & Composition API** ⭐⭐⭐⭐⭐ (5/5)

#### ✅ **Excellent Patterns**

- **Consistent `<script setup lang="ts">`** across all files
- **Proper reactive patterns**:
  ```ts
  // pages/people/index.vue:11-14
  const searchQuery = ref('')
  const selectedtourIds = ref<string>('all')
  const selectedPerson = ref<Person | null>(null)
  ```
- **Computed properties** used correctly (pages/people/index.vue:18-21, 24-48)
- **Props typing** with interfaces (components/NavMain.vue:12-22)

#### ⚠️ **Minor Issues**

- **Lifecycle Hook Missing** (pages/index.vue:2)
  - Top-level `navigateTo()` should be in `onMounted()` or use `definePageMeta` redirect

---

### **3. Nuxt-Specific Patterns** ⭐⭐⭐☆☆ (3/5)

#### ✅ **Good**

- **Auto-imports working** for components (no manual imports in pages)
- **`definePageMeta`** used correctly (pages/events/index.vue:5-7, pages/events/add.vue:8-10)
- **Composables** properly structured (composables/useNavigation.ts)

#### ⚠️ **Critical Missing Patterns**

1. **No Data Fetching** - Should use `useFetch`/`useAsyncData`:
   ```ts
   // Current (mock data)
   import { events } from '~/utils/mockEvents'

   // Should be (when API ready)
   const { data: events } = await useFetch('/api/events')
   ```

2. **No SEO/Meta Management** - Missing:
   ```ts
   useHead({
     title: 'Events - HomeComing 2.0',
     meta: [{ name: 'description', content: '...' }]
   })
   ```

3. **Hardcoded Navigation** - Should use:
   ```vue
   <!-- Instead of <a href="/events"> -->
   <NuxtLink to="/events">
   ```

4. **No Server Routes** - Need to create:
   ```
   server/
   ├── api/
   │   ├── events/
   │   │   ├── index.get.ts
   │   │   └── [id].get.ts
   │   ├── people/
   │   │   └── index.get.ts
   │   └── venues/
   │       ├── index.get.ts
   │       └── [id].get.ts
   ```

---

### **4. TypeScript** ⭐⭐⭐⭐☆ (4/5)

#### ✅ **Strong Typing**

- **Interface definitions** for all data (utils/mockEvents.ts:1-40, utils/navigation.ts:17-28)
- **Proper generic types** (pages/people/index.vue:14)
- **Type-safe forms** using vee-validate + zod (pages/events/add.vue:13-28)
- **Strict mode enabled** (nuxt.config.ts:31)

#### ⚠️ **Improvements Needed**

1. **`any` types** (pages/dashboard.vue:6,11):
   ```ts
   // Current
   const icons: Record<string, any> = {

   // Should be
   import type { Component } from 'vue'
   const icons: Record<string, Component> = {
   ```

2. **Missing return types** on functions:
   ```ts
   // composables/useNavigation.ts:4
   const isActive = (url: string): boolean => route.path === url
   ```

3. **Good example** (pages/people/index.vue:51-54):
   ```ts
   const getTourName = (tourIds: string): string => {  // Explicit return type ✅
     const tour = tours.find(t => t.id === tourIds)
     return tour ? tour.name : 'Unknown Tour'
   }
   ```

---

### **5. Performance & Optimization** ⭐⭐⭐☆☆ (3/5)

#### ✅ **Good**

- **Computed properties** for filtered data (pages/people/index.vue:24-48)
- **Tailwind JIT** compilation
- **Component code splitting** via Nuxt auto-imports

#### ⚠️ **Missing Optimizations**

1. **No lazy loading** for heavy components
   ```ts
   // Could use for modals, sheets, etc.
   const GuestSheet = defineAsyncComponent(() => import('./GuestSheet.vue'))
   ```

2. **No image optimization** (assets/img/me.jpg used directly)
   ```vue
   <!-- Current -->
   <img :src="avatarImg" />

   <!-- Should use Nuxt Image module -->
   <NuxtImg src="/img/me.jpg" width="80" height="80" />
   ```

3. **Large mock data files** imported eagerly
   - utils/mockEvents.ts is 1403 lines
   - Consider lazy loading or pagination

4. **No virtualization** for long lists
   - mockEvents has 34 events (could grow to hundreds)
   - Consider vue-virtual-scroller for tables

---

### **6. State Management** ⭐⭐⭐☆☆ (3/5)

#### ✅ **Current Approach**

- **Composables for shared logic** (composables/useNavigation.ts)
- **Reactive refs** for local state

#### ⚠️ **Needs Improvement**

- **No Pinia stores** (planned per CLAUDE.md but not implemented)
- **No global user state**
- **No current tour context**
- **Team switching** (components/OrganizationSwitcher.vue:32) uses local `ref` instead of global store

**Recommended Structure**:
```
stores/
├── auth.ts          # User authentication & profile
├── tour.ts          # Current tour context & switching
├── ui.ts            # UI state (sidebar collapsed, theme)
└── cache.ts         # Client-side data caching
```

**Example Implementation**:
```ts
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  async function login(credentials: LoginCredentials) {
    // Supabase auth logic
  }

  return { user, isAuthenticated, login }
})
```

---

## 3. WORDPRESS → NUXT MIGRATION REVIEW

### **Mental Model Alignment** ⭐⭐⭐⭐☆ (4/5)

#### ✅ **Good Transitions**

1. **No jQuery patterns** - Pure Vue reactivity ✅
2. **Clean separation** - No mixing server/client concerns in components ✅
3. **Component-based thinking** instead of template parts ✅
4. **No `wp_localize_script` patterns** ✅

#### ⚠️ **WordPress Habits Detected**

**1. Using `<a>` Tags Like WordPress Links**

WordPress developers are used to writing links like this in PHP templates:
```php
<a href="<?php echo home_url('/events/add'); ?>">Add Event</a>
```

This pattern appears throughout the Nuxt app:
```vue
<!-- WordPress mindset (found in 10+ places) -->
<a href="/events/add">Add Event</a>
<a href="/days/day">View Details</a>
<a :href="`/events/advance/${event.id}`">Advance</a>

<!-- Nuxt way -->
<NuxtLink to="/events/add">Add Event</NuxtLink>
<NuxtLink :to="`/events/advance/${event.id}`">Advance</NuxtLink>
```

**Impact**: Loses client-side navigation benefits, triggers full page reloads, loses transition animations.

**2. Mock Data Pattern Similar to WordPress Query**

```ts
// Current (WordPress-like)
import { events } from '~/utils/mockEvents'
const filteredEvents = events.filter(e => e.status === 'confirmed')

// Similar to WordPress:
// $events = get_posts(['post_type' => 'event', 'post_status' => 'publish']);

// Should evolve to Nuxt pattern:
const { data: events } = await useFetch('/api/events', {
  query: { status: 'confirmed' }
})
```

---

### **Data Flow** ⭐⭐⭐☆☆ (3/5)

#### WordPress vs Nuxt Comparison

| Concept | WordPress | Current Nuxt | Should Be |
|---------|-----------|--------------|-----------|
| **Data Source** | `get_posts()` | `import { events }` | `useFetch('/api/events')` |
| **Global State** | `$current_user` | Not implemented | Pinia `useAuthStore()` |
| **Current Context** | `get_current_blog_id()` | Not implemented | Pinia `useTourStore()` |
| **Filtering** | `WP_Query` args | JS `.filter()` | API query params |
| **Mutations** | `wp_update_post()` | Not implemented | `$fetch('/api/events', { method: 'POST' })` |
| **Template Parts** | `get_template_part()` | Vue components ✅ | Vue components ✅ |
| **Hooks/Filters** | `add_action()` | Not needed ✅ | Nuxt hooks (when needed) |

#### ⚠️ **WordPress Mental Model Issues**

**1. No "Single Source of Truth" for Current Context**

WordPress automatically provides global context:
```php
// WordPress globals available everywhere
global $current_user;
global $post;
$blog_id = get_current_blog_id();
```

Nuxt requires explicit state management:
```ts
// Need to create and import stores
const authStore = useAuthStore()
const tourStore = useTourStore()

// Then access
const currentUser = authStore.user
const currentTour = tourStore.activeTour
```

**2. Treating Utils Like WordPress Function Libraries**

```ts
// utils/mockEvents.ts is structured like:
// wp-content/themes/theme/inc/event-functions.php

// Should separate concerns:
// - utils/        → Pure helper functions (date formatting, etc.)
// - composables/  → Reactive state/logic (useEvents, usePeople)
// - server/api/   → Data fetching (replaces WP_Query)
```

**Example Refactor**:
```ts
// Instead of utils/mockEvents.ts
// Create composables/useEvents.ts

export function useEvents() {
  const { data: events, pending, error } = useFetch('/api/events')

  const confirmedEvents = computed(() =>
    events.value?.filter(e => e.status === 'confirmed') ?? []
  )

  return { events, confirmedEvents, pending, error }
}
```

---

### **Component Architecture** ⭐⭐⭐⭐⭐ (5/5)

#### ✅ **Excellent Evolution**

1. **Reusable components** > WordPress template parts ✅
2. **Props/emits** instead of global variables ✅
3. **Scoped styles** via Tailwind ✅
4. **No template hierarchy anti-patterns** ✅

**Example of Good Pattern**:
```vue
<!-- components/common/StatsCard.vue -->
<!-- Props-based, reusable, no global dependencies -->
<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  value: string | number
  icon: Component
  subtitle?: string
}>()
</script>
```

**WordPress Equivalent** (old way):
```php
<!-- wp-content/themes/theme/template-parts/stats-card.php -->
<?php
global $stat_title, $stat_value, $stat_icon;
// Relies on globals being set before include
?>
<div class="stat-card">
  <h3><?php echo $stat_title; ?></h3>
  <p><?php echo $stat_value; ?></p>
</div>
```

---

### **Common WordPress→Nuxt Pitfalls Found**

#### 🔴 **Critical**

1. **Hardcoded URLs everywhere** (20+ instances)
   ```vue
   <!-- WordPress-style hardcoded links -->
   <a href="/guest-list/1">Guest List</a>
   <a href="/events/add">Add Event</a>
   ```

   **Fix**: Use `<NuxtLink>` or `navigateTo()`
   ```vue
   <NuxtLink to="/guest-list/1">Guest List</NuxtLink>
   <Button @click="navigateTo('/events/add')">Add Event</Button>
   ```

2. **No global state management**
   - WordPress provides `$current_user`, `$wpdb` globals everywhere
   - Nuxt needs explicit Pinia stores for shared state
   - Team switching (OrganizationSwitcher.vue) should update global tour context

#### 🟡 **Important**

3. **Manual DOM manipulation mindset avoided** ✅
   - No `document.querySelector()` found
   - Using Vue refs properly
   - **Good job avoiding this common WordPress→Vue mistake!**

4. **Not leveraging composables enough**
   ```ts
   // pages/people/index.vue has filtering logic embedded
   // Could extract to composables/usePeopleFilters.ts

   export function usePeopleFilters(people: Ref<Person[]>) {
     const searchQuery = ref('')
     const selectedDepartment = ref('all')

     const filtered = computed(() => {
       // Filtering logic here
     })

     return { searchQuery, selectedDepartment, filtered }
   }
   ```

5. **Mock data in utils instead of API layer**
   - WordPress: Data comes from database via WP functions
   - Current: Data imported from utils (temporary, OK for development)
   - Should be: Data fetched from server/api (production-ready)

#### 🟢 **Good Habits Adopted**

1. **No inline styles** ✅ (WordPress developers often use style attributes)
2. **No mixing PHP-style logic in templates** ✅
3. **Reactive data patterns** instead of jQuery DOM manipulation ✅
4. **Type safety** instead of loose PHP typing ✅

---

### **WordPress Multisite Analogy**

Your `OrganizationSwitcher` component is conceptually similar to WordPress Multisite blog switching:

```php
// WordPress Multisite
switch_to_blog($blog_id);
// All subsequent queries use this blog context

// Your Nuxt app should work similarly
const tourStore = useTourStore()
tourStore.switchTour(tourIds)
// All components react to the new tour context
```

**Current Implementation** (OrganizationSwitcher.vue:32):
```ts
const activeTeam = ref(props.teams[0])  // Local state only
```

**Should Be**:
```ts
// stores/tour.ts
export const useTourStore = defineStore('tour', () => {
  const activeTour = ref<Tour | null>(null)

  function switchTour(tour: Tour) {
    activeTour.value = tour
    // Invalidate cached data, refetch for new tour, etc.
  }

  return { activeTour, switchTour }
})

// components/OrganizationSwitcher.vue
const tourStore = useTourStore()
const activeTeam = computed(() => tourStore.activeTour)
```

---

## SUMMARY & ACTION ITEMS

### **Immediate Fixes** (1-2 hours)

- [ ] **1. Fix pages/index.vue navigation**
  ```vue
  <script setup lang="ts">
  definePageMeta({
    redirect: '/dashboard'
  })
  </script>
  ```

- [ ] **2. Replace all `<a>` tags with `<NuxtLink>`**
  - pages/dashboard.vue:68
  - pages/events/index.vue:61, 64, 94, 97, 100
  - pages/events/add.vue:53, 309
  - Search for `<a href=` globally and replace

- [ ] **3. Remove manual imports from layouts/default.vue**
  - Remove lines 2-14
  - Let Nuxt auto-import handle these

- [ ] **4. Delete commented code**
  - components/AppSidebar.vue:52-155 (commented navigation)

- [ ] **5. Fix navigation route mismatch**
  - utils/navigation.ts:39 - Change `/personnel` to `/people`
  - OR rename pages/people to pages/personnel

### **Short-term Improvements** (1 week)

- [ ] **6. Create server/api structure**
  ```bash
  mkdir -p server/api/events
  mkdir -p server/api/people
  mkdir -p server/api/venues
  ```

- [ ] **7. Implement Pinia stores**
  ```bash
  mkdir stores
  # Create: stores/auth.ts, stores/tour.ts, stores/ui.ts
  ```

- [ ] **8. Add SEO meta tags**
  - Add `useHead()` to all pages
  - Add `useSeoMeta()` for better SEO

- [ ] **9. Fix `any` types**
  - pages/dashboard.vue:6 - Type icon components properly
  - Search codebase for `: any` and type correctly

- [ ] **10. Extract reusable logic to composables**
  - Create `composables/usePeopleFilters.ts`
  - Create `composables/useEvents.ts`

### **Medium-term Enhancements** (2-4 weeks)

- [ ] **11. Migrate from mock data to real API**
  - Set up Supabase connection
  - Create database schema
  - Migrate mock data to Supabase
  - Replace imports with `useFetch()` calls

- [ ] **12. Implement authentication**
  - Supabase Auth integration
  - Protected routes with middleware
  - User profile management

- [ ] **13. Add form submission handlers**
  - pages/events/add.vue currently just logs to console
  - Connect to API endpoints

### **Long-term Enhancements** (Future sprints)

- [ ] **14. Implement image optimization**
  - Add `@nuxt/image` module
  - Replace `<img>` with `<NuxtImg>`
  - Optimize assets/img/me.jpg

- [ ] **15. Add virtualization for long lists**
  - Install vue-virtual-scroller
  - Apply to events table, people table

- [ ] **16. Create migration documentation**
  - Document WordPress → Nuxt patterns
  - Create code examples for common scenarios

- [ ] **17. Performance optimization**
  - Lazy load heavy components
  - Implement caching strategies
  - Bundle size analysis

---

## OVERALL SCORES

| Category | Score | Notes |
|----------|-------|-------|
| **Quick Health** | 8/10 | Minor issues, mostly quick fixes |
| **Best Practices** | 7/10 | Solid foundation, missing API/state layer |
| **WordPress Migration** | 8/10 | Good mental model shift, some old habits |
| **Vue/Nuxt Patterns** | 8/10 | Excellent Composition API usage |
| **TypeScript** | 8/10 | Strong typing, few `any` types |
| **Architecture** | 7/10 | Good structure, needs server/stores |

### **Key Strengths**
1. ✅ Excellent Vue 3 + Composition API adoption
2. ✅ Consistent TypeScript usage with strict mode
3. ✅ Clean component architecture
4. ✅ No legacy WordPress anti-patterns (jQuery, inline styles, etc.)
5. ✅ Modern Tailwind 4 CSS-first configuration

### **Key Weaknesses**
1. ⚠️ No data fetching layer (server/api)
2. ⚠️ No state management (Pinia stores)
3. ⚠️ Hardcoded `<a>` tags instead of NuxtLink
4. ⚠️ No SEO/meta management
5. ⚠️ Mock data not ready for production

### **Recommended Next Steps**

1. **This Week**: Fix critical issues (#1-5 above)
2. **Next Sprint**: Implement server/api + Pinia stores (#6-7)
3. **Following Sprint**: Supabase integration + auth (#11-12)
4. **Ongoing**: Performance optimization as features grow

---

## CONCLUSION

This is a **well-architected Nuxt 3 application** with excellent fundamentals. The WordPress → Nuxt mental model transition has been largely successful. The main gaps are:

1. Missing server-side data layer (by design, using mocks currently)
2. No global state management (Pinia planned but not implemented)
3. Some lingering WordPress habits (hardcoded links)

**The codebase is production-ready EXCEPT for the data layer.** Once you implement:
- `server/api/` routes
- Pinia stores for global state
- Supabase integration

...you'll have a solid, scalable tour management system.

**Estimated effort to production-ready**:
- Fix critical issues: 2-3 hours
- Implement API + stores: 1-2 weeks
- Supabase integration: 1-2 weeks
- **Total**: 3-4 weeks to production-ready

Great work on the Vue 3/Nuxt 3 adoption! 🎉
