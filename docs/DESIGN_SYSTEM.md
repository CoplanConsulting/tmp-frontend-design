# Design System Documentation

**Tour Management Pro - Nuxt 3 Application**
**Version**: 1.0
**Last Updated**: 2025-12-29

---

## Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Spacing & Layout](#spacing--layout)
4. [Typography](#typography)
5. [Components](#components)
6. [Best Practices](#best-practices)
7. [Dark Mode](#dark-mode)

---

## Overview

This design system is built on **Tailwind CSS 4.x** using a **CSS-first configuration** approach. All design tokens are defined in `assets/css/main.css` using the `@theme` directive, making them the single source of truth for the application's visual language.

### Key Principles

- **Consistency**: Use design tokens for all spacing, colors, and typography
- **Simplicity**: Prefer global utilities over component-specific styles where appropriate
- **Maintainability**: Define colors and spacing once, use everywhere
- **Accessibility**: Ensure proper contrast ratios in both light and dark modes

---

## Color System

### Semantic Colors

All semantic colors are defined using **OKLCH** color space for better perceptual uniformity and dark mode handling.

#### Base Colors (Light Mode)
```css
--background: oklch(1 0 0);                       /* Pure white */
--foreground: oklch(0.129 0.042 264.695);         /* Very dark blue-gray */
--card: oklch(1 0 0);                             /* White */
--card-foreground: oklch(0.129 0.042 264.695);    /* Dark blue-gray */
```

#### Brand Colors (Light Mode)
```css
--primary: oklch(0.208 0.042 265.755);            /* Dark blue */
--primary-foreground: oklch(0.984 0.003 247.858); /* Off-white */
--secondary: oklch(0.968 0.007 247.896);          /* Very light gray */
--secondary-foreground: oklch(0.208 0.042 265.755); /* Dark blue */
```

### Badge Status Colors

Badge colors are specifically designed for entity types (Promoter, Venue, Production) with automatic dark mode support.

#### Light Mode Badge Colors
| Type | Background | Text | Border | Use Case |
|------|------------|------|--------|----------|
| **Promoter** | `oklch(0.95 0.05 300)` (Light purple) | `oklch(0.4 0.15 300)` (Dark purple) | `oklch(0.85 0.08 300)` | Company type |
| **Venue** | `oklch(0.95 0.05 150)` (Light green) | `oklch(0.4 0.15 150)` (Dark green) | `oklch(0.85 0.08 150)` | Venue type |
| **Production** | `oklch(0.95 0.05 240)` (Light blue) | `oklch(0.4 0.15 240)` (Dark blue) | `oklch(0.85 0.08 240)` | Production companies |
| **Default** | `oklch(0.95 0 0)` (Light gray) | `oklch(0.4 0 0)` (Dark gray) | `oklch(0.85 0 0)` | Fallback/generic |

#### Dark Mode Badge Colors
| Type | Background | Text | Border |
|------|------------|------|--------|
| **Promoter** | `oklch(0.25 0.05 300)` (Very dark purple) | `oklch(0.75 0.1 300)` (Light purple) | `oklch(0.35 0.08 300)` |
| **Venue** | `oklch(0.25 0.05 150)` (Very dark green) | `oklch(0.75 0.1 150)` (Light green) | `oklch(0.35 0.08 150)` |
| **Production** | `oklch(0.25 0.05 240)` (Very dark blue) | `oklch(0.75 0.1 240)` (Light blue) | `oklch(0.35 0.08 240)` |
| **Default** | `oklch(0.25 0 0)` (Very dark gray) | `oklch(0.75 0 0)` (Light gray) | `oklch(0.35 0 0)` |

### Global Badge Utilities

Use these utility classes for status badges:

```css
.badge-promoter    /* Purple badge for Promoter type */
.badge-venue       /* Green badge for Venue type */
.badge-production  /* Blue badge for Production type */
.badge-default     /* Gray badge for default/unknown types */
```

**Example Usage:**
```vue
<!-- ❌ AVOID: Manual color classes -->
<Badge class="bg-purple-100 text-purple-700 border-purple-200">Promoter</Badge>

<!-- ✅ PREFER: Global utility class -->
<Badge class="badge-promoter border font-semibold">Promoter</Badge>

<!-- ✅✅ BEST: StatusBadge component -->
<StatusBadge type="Promoter">Promoter</StatusBadge>
```

---

## Spacing & Layout

### Spacing Scale

All spacing follows an **8px grid system** for consistency and rhythm.

| Token | Value | Pixels | Common Use Cases |
|-------|-------|--------|------------------|
| `--spacing-0` | `0` | 0px | Reset spacing |
| `--spacing-1` | `0.25rem` | 4px | Tight spacing, icon gaps |
| `--spacing-2` | `0.5rem` | 8px | Small gaps, compact layouts |
| `--spacing-3` | `0.75rem` | 12px | Button padding, small margins |
| `--spacing-4` | `1rem` | 16px | **Standard gap**, form field spacing |
| `--spacing-5` | `1.25rem` | 20px | Medium spacing |
| `--spacing-6` | `1.5rem` | 24px | **Section spacing**, card gaps |
| `--spacing-8` | `2rem` | 32px | **Card padding**, large sections |
| `--spacing-10` | `2.5rem` | 40px | Extra large spacing |
| `--spacing-12` | `3rem` | 48px | Page section spacing |
| `--spacing-16` | `4rem` | 64px | Hero sections, large dividers |

### Semantic Layout Utilities

```css
.gap-section    /* gap: 24px - standard section gap */
.p-card         /* padding: 32px - standard card padding */
.mb-section     /* margin-bottom: 24px - section spacing */
```

**When to Use:**
- **Standard Tailwind** (e.g., `gap-4`, `mb-6`): Preferred for most layouts
- **Semantic utilities** (e.g., `.gap-section`): When you want explicit semantic meaning
- **Arbitrary values** (e.g., `gap-[42px]`): Only for exact design mockup matching

---

## Typography

### Font Stack

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Type Scale

| Token | Size | Pixels | Use Case |
|-------|------|--------|----------|
| `--font-size-xs` | `0.75rem` | 12px | Labels, captions, metadata |
| `--font-size-sm` | `0.875rem` | 14px | Body text (small), table cells |
| `--font-size-base` | `1rem` | 16px | **Body text (default)** |
| `--font-size-lg` | `1.125rem` | 18px | Subheadings, emphasis |
| `--font-size-xl` | `1.25rem` | 20px | Section headings |
| `--font-size-2xl` | `1.5rem` | 24px | Card titles, page subtitles |
| `--font-size-3xl` | `1.875rem` | 30px | Page titles, hero headings |

**Typography Best Practices:**
- Use `text-sm` (14px) for table cells and compact layouts
- Use `text-base` (16px) for body text
- Use `text-xl` or `text-2xl` for headings
- Headings use `text-wrap: balance` for better line breaks
- Paragraphs use `text-wrap: pretty` to avoid orphans/widows

---

## Components

### StatusBadge Component

**File**: `components/common/StatusBadge.vue`

Replaces 37+ instances of inline badge color logic across the app.

#### Props

```typescript
type BadgeType = 'Promoter' | 'Venue' | 'Production' | 'default'

interface StatusBadgeProps {
  type: BadgeType
}
```

#### Usage

```vue
<script setup>
import { Building2 } from 'lucide-vue-next'
</script>

<template>
  <!-- Basic usage -->
  <StatusBadge type="Promoter">Promoter</StatusBadge>

  <!-- With dynamic type -->
  <StatusBadge :type="company.type">{{ company.type }}</StatusBadge>

  <!-- All available types -->
  <StatusBadge type="Promoter">Promoter</StatusBadge>
  <StatusBadge type="Venue">Venue</StatusBadge>
  <StatusBadge type="Production">Production</StatusBadge>
  <StatusBadge type="default">Unknown</StatusBadge>
</template>
```

#### Features

- ✅ Automatic dark mode support (CSS variables)
- ✅ Consistent styling (font-semibold, border)
- ✅ Type-safe props (TypeScript)
- ✅ Uses global `.badge-*` utilities
- ✅ No scoped styles needed

---

### SearchInput Component

**File**: `components/common/SearchInput.vue`

Replaces 15+ duplicated search bar patterns.

#### Props

```typescript
interface SearchInputProps {
  placeholder?: string  // Default: 'Search...'
}

// v-model support via defineModel
const model = defineModel<string>()
```

#### Usage

```vue
<script setup>
const searchQuery = ref('')
</script>

<template>
  <!-- Basic usage -->
  <SearchInput v-model="searchQuery" />

  <!-- With custom placeholder -->
  <SearchInput
    v-model="searchQuery"
    placeholder="Search companies..."
  />
</template>
```

#### Features

- ✅ Two-way binding with `v-model`
- ✅ Search icon auto-positioned (lucide-vue-next)
- ✅ Scoped styles for component layout
- ✅ Responsive max-width (max-w-md)
- ✅ Accessible input with proper focus states

#### Styling

```css
/* Component uses scoped styles for layout */
.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 28rem; /* max-w-md */
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  padding-left: 2.5rem; /* pl-10 for icon */
}
```

---

### EmptyState Component

**File**: `components/common/EmptyState.vue`

Replaces 20+ duplicated empty state cards (saving ~300 lines of markup).

#### Props

```typescript
interface EmptyStateProps {
  icon: Component           // Lucide icon component
  title: string             // Main heading
  description: string       // Descriptive text
  dashed?: boolean          // Show dashed border (default: false)
}
```

#### Slots

```typescript
#action  // CTA button or action elements
```

#### Usage

```vue
<script setup>
import { Building2 } from 'lucide-vue-next'

const handleAddCompany = () => {
  // Navigate to add company page
}
</script>

<template>
  <!-- With dashed border -->
  <EmptyState
    v-if="companies.length === 0"
    :icon="Building2"
    title="No companies yet"
    description="Add your first company to start building your network"
    dashed
  >
    <template #action>
      <Button @click="handleAddCompany">Add Company</Button>
    </template>
  </EmptyState>

  <!-- Without dashed border (inline in table) -->
  <EmptyState
    v-if="filteredCompanies.length === 0"
    :icon="Search"
    title="No results found"
    description="Try adjusting your search query"
  >
    <template #action>
      <Button variant="outline" @click="searchQuery = ''">Clear Search</Button>
    </template>
  </EmptyState>
</template>
```

#### Features

- ✅ Flexible icon support (any Lucide icon)
- ✅ Named slot for custom actions
- ✅ Optional dashed border variant
- ✅ Dark mode support via Tailwind utilities
- ✅ Scoped styles with BEM-ish naming

#### Visual Structure

```
┌─────────────────────────────────┐
│                                 │
│        ┌─────────────┐          │
│        │   [Icon]    │          │  ← Icon wrapper (gray circle)
│        └─────────────┘          │
│                                 │
│         Title Text              │  ← text-xl font-bold
│                                 │
│    Description text that can    │  ← text-sm text-gray-600
│    span multiple lines with     │
│    a max width constraint       │
│                                 │
│      [Action Button]            │  ← Named slot
│                                 │
└─────────────────────────────────┘
```

---

## Best Practices

### When to Use Global Utilities vs Scoped Styles

#### ✅ Use Global Utilities For:

- **Status colors** (badges, labels) → Use `.badge-*` utilities
- **Semantic spacing** → Use `.gap-section`, `.p-card`, `.mb-section`
- **Shadows** → Use `.shadow-card`, `.shadow-card-hover`
- **Colors that appear across multiple components** → Define CSS variables

#### ✅ Use Scoped Styles For:

- **Component-specific layout** (SearchInput positioning, EmptyState structure)
- **Complex hover states** unique to one component
- **Animation keyframes** only used in one place
- **One-off visual treatments** that won't be reused

#### ✅ Use Inline Tailwind For:

- **Standard layouts** (flex, grid, padding, margin)
- **Responsive design** (`md:flex-row`, `lg:grid-cols-3`)
- **State variants** (`hover:bg-gray-100`, `focus:ring-2`)
- **One-off spacing adjustments** specific to a single element

### Component Creation Guidelines

#### When to Create a Component:

- **Pattern appears 3+ times** across the app
- **15+ lines of markup** that could be abstracted
- **Complex state logic** that should be encapsulated
- **Reusable UI pattern** (forms, cards, modals, etc.)

#### When NOT to Create a Component:

- **Only used once** and unlikely to be reused
- **Too abstract** - creates unnecessary indirection
- **Simpler as inline markup** (e.g., a single `<div>` wrapper)

### Adding New Badge Types

If you need to add a new badge type (e.g., `Artist`, `Manager`):

1. **Add CSS variables to `assets/css/main.css`:**

```css
/* In :root (light mode) */
:root {
  --badge-artist-bg: oklch(0.95 0.05 60);      /* Light orange */
  --badge-artist-text: oklch(0.4 0.15 60);     /* Dark orange */
  --badge-artist-border: oklch(0.85 0.08 60);  /* Medium orange */
}

/* In .dark (dark mode) */
.dark {
  --badge-artist-bg: oklch(0.25 0.05 60);      /* Very dark orange */
  --badge-artist-text: oklch(0.75 0.1 60);     /* Light orange */
  --badge-artist-border: oklch(0.35 0.08 60);  /* Dark orange border */
}
```

2. **Add utility class to `@layer utilities`:**

```css
@layer utilities {
  .badge-artist {
    background-color: var(--badge-artist-bg);
    color: var(--badge-artist-text);
    border-color: var(--badge-artist-border);
  }
}
```

3. **Update StatusBadge component types:**

```typescript
// components/common/StatusBadge.vue
export type BadgeType = 'Promoter' | 'Venue' | 'Production' | 'Artist' | 'default'

const getBadgeClass = (type: BadgeType): string => {
  const classMap: Record<BadgeType, string> = {
    'Promoter': 'badge-promoter',
    'Venue': 'badge-venue',
    'Production': 'badge-production',
    'Artist': 'badge-artist',
    'default': 'badge-default'
  }
  return classMap[type] || 'badge-default'
}
```

4. **Use the new type:**

```vue
<StatusBadge type="Artist">Artist</StatusBadge>
```

---

## Dark Mode

### How Dark Mode Works

This app uses **@nuxtjs/color-mode** with a custom Tailwind 4 dark mode variant:

```css
/* Custom variant in main.css */
@custom-variant dark (&:is(.dark *));
```

When the user toggles dark mode:
1. The `<html>` element gets a `.dark` class
2. All CSS variables in `.dark { }` override light mode values
3. Components automatically update (no JavaScript needed)

### Dark Mode Toggle

**Location**: `components/NavUser.vue` → User dropdown menu

**Usage:**
```vue
<script setup>
const colorMode = useColorMode()

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <DropdownMenuItem @click="toggleDarkMode">
    <Moon v-if="colorMode.value === 'light'" />
    <Sun v-else />
    {{ colorMode.value === 'dark' ? 'Light' : 'Dark' }} Mode
  </DropdownMenuItem>
</template>
```

### Testing Dark Mode

**Manual Testing Checklist:**

Test these pages in **both light and dark mode**:

- [ ] `/companies` - Badge colors, search, empty state
- [ ] `/contacts` - Badge colors, tabs, grouped view
- [ ] `/venues` - Grid cards, empty state, badges
- [ ] `/personnel` - Search, badges, empty state
- [ ] `/events` - Calendar view, badges, search

**What to Verify:**

✅ **Badge colors** have good contrast in both modes
✅ **Empty state icons/text** are readable
✅ **Search input** placeholder is visible
✅ **No layout shifts** when toggling modes
✅ **No color flicker** during mode transition
✅ **All badge types** (Promoter, Venue, Production) visible in both modes

### Dark Mode Color Contrast Guidelines

All badge colors meet **WCAG AA contrast requirements** (4.5:1 minimum):

| Mode | Background Lightness | Text Lightness | Ratio |
|------|---------------------|----------------|-------|
| **Light** | 95% | 40% | ~8:1 ✅ |
| **Dark** | 25% | 75% | ~6:1 ✅ |

---

## File Structure

```
assets/
├── css/
│   └── main.css          # Design tokens, utilities, base styles
components/
├── common/
│   ├── StatusBadge.vue   # Badge component (global utilities)
│   ├── SearchInput.vue   # Search component (scoped styles)
│   └── EmptyState.vue    # Empty state component (scoped + utilities)
├── ui/                   # shadcn-vue components
│   ├── badge/
│   ├── button/
│   ├── input/
│   └── ...
└── NavUser.vue           # Contains dark mode toggle
docs/
├── CSS_AUDIT_SUMMARY.md       # Phase 1 cleanup summary
├── CSS_REFACTOR_ROADMAP.md    # Phase 2-4 implementation plan
└── DESIGN_SYSTEM.md           # This file
```

---

## Migration Guide

### Migrating Old Badge Code

**Before (❌ Duplicated logic):**
```vue
<script setup>
const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Promoter':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'Venue':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'Production':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}
</script>

<template>
  <Badge :class="getTypeBadgeClass(company.type)" class="font-semibold border">
    {{ company.type }}
  </Badge>
</template>
```

**After (✅ Component):**
```vue
<template>
  <StatusBadge :type="company.type">{{ company.type }}</StatusBadge>
</template>
```

**Lines saved**: ~12 lines per file × 37 files = **~444 lines removed**

### Migrating Old Search Bar Code

**Before (❌ Duplicated markup):**
```vue
<template>
  <div class="relative flex-1 max-w-md">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <Input
      v-model="searchQuery"
      type="text"
      placeholder="Search companies..."
      class="pl-10 border-gray-200"
    />
  </div>
</template>
```

**After (✅ Component):**
```vue
<template>
  <SearchInput v-model="searchQuery" placeholder="Search companies..." />
</template>
```

**Lines saved**: ~7 lines per file × 15 files = **~105 lines removed**

### Migrating Old Empty State Code

**Before (❌ Duplicated markup):**
```vue
<template>
  <Card v-if="companies.length === 0" class="border-2 border-dashed border-gray-300 bg-white">
    <div class="flex flex-col items-center justify-center py-16 px-8">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
        <Building2 class="h-8 w-8 text-gray-600" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No companies yet</h3>
      <p class="text-sm text-gray-600 text-center max-w-md mb-8">
        Add your first company to start building your network
      </p>
      <Button @click="handleAddCompany">Add Company</Button>
    </div>
  </Card>
</template>
```

**After (✅ Component):**
```vue
<template>
  <EmptyState
    v-if="companies.length === 0"
    :icon="Building2"
    title="No companies yet"
    description="Add your first company to start building your network"
    dashed
  >
    <template #action>
      <Button @click="handleAddCompany">Add Company</Button>
    </template>
  </EmptyState>
</template>
```

**Lines saved**: ~15 lines per file × 20 files = **~300 lines removed**

---

## Metrics & Impact

### Refactor Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Badge implementations** | 37 files | 1 component | -97% |
| **Search bar implementations** | 15 files | 1 component | -93% |
| **Empty state implementations** | 20 files | 1 component | -95% |
| **Avg. lines per page** | 234 lines | ~210 lines | -15% |
| **Total lines removed** | - | ~850 lines | - |
| **Inline utility classes/page** | 120+ | ~70 | -42% |

### Maintainability Wins

✅ **Single source of truth** for badge colors (main.css)
✅ **Dark mode** handled automatically via CSS variables
✅ **Type safety** with TypeScript props
✅ **Easier testing** - test components once, not 37 times
✅ **Faster development** - reuse components instead of copying markup

---

## Resources

### Documentation
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [Nuxt Color Mode](https://color-mode.nuxtjs.org/)
- [OKLCH Color Picker](https://oklch.com/)

### Internal Files
- `assets/css/main.css` - Design token definitions
- `docs/CSS_AUDIT_SUMMARY.md` - Phase 1 cleanup details
- `docs/CSS_REFACTOR_ROADMAP.md` - Implementation roadmap

---

**End of Design System Documentation**
Last Updated: 2025-12-29
