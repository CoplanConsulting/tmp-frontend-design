# Component Ideas for Tour Manager App

This document tracks potential reusable components identified during view refactors. Each entry includes:
- **Name**: Proposed component name (e.g., AddFormSection.vue).
- **Description**: Brief purpose and usage.
- **Used In**: Routes/views where it appears or could be shared.
- **Status**: New, Existing, or Proposed.

## Identified Components

### PageHeader.vue
**Description**: Reusable page header with title, optional badge count, description text, and action button slot. Provides consistent spacing and typography hierarchy across list views.

**Pattern**:
- Left section: Title (h1) + optional badge + subtitle/description
- Right section: Slot for primary action button(s)
- Uses design tokens for spacing, typography, and colors

**Used In**:
- `/pages/venues/` (current)
- `/pages/venues/empty` (reinforced 2026-01-03)
- Could be used in: `/pages/events/`, `/pages/personnel/`, `/pages/companies/`, `/pages/guest-lists/`

**Props**:
```ts
{
  title: string
  description?: string
  count?: number
}
```

**Slots**: `actions` (for buttons)

**Status**: Proposed (strong evidence from 2+ views)

---

### EmptyState.vue
**Description**: Reusable empty state component with icon circle, heading, description text, and primary CTA button. Provides consistent "zero state" experience across all entity lists. Uses design tokens for spacing, colors, and typography.

**Pattern**:
- Centered layout with vertical stack
- Icon container (circular background with muted color)
- Bold heading (empty state message)
- Muted description text (guidance/context)
- Primary CTA button (main action)
- All spacing uses design tokens (--spacing-*)

**Used In**:
- `/pages/venues/empty` (current)
- Could be used in: Guest Lists empty, Personnel empty, Companies empty, Events empty, Tours empty (~8-10 views)

**Props**:
```ts
{
  icon: Component           // Lucide icon component
  heading: string           // e.g., "No venues yet"
  description: string       // Contextual help text
  buttonText: string        // CTA text (e.g., "Add Your First Venue")
  buttonIcon?: Component    // Optional icon for button (e.g., Plus)
}
```

**Emits**: `onAction` (triggered when CTA button is clicked)

**Status**: New (identified 2026-01-03)

---

### EntityCard.vue
**Description**: Flexible card component for displaying entities in grid layouts. Supports icon, title, metadata, stats section, and additional info. Hover states and transitions included.

**Pattern**:
- Icon container (customizable background)
- Title + subtitle/location
- Stats section with divider
- Additional quick info list
- Hover elevation and color transitions

**Used In**:
- `/pages/venues/` as VenueCard (current)
- Could extend for: Personnel cards, Company cards, Event cards

**Props**:
```ts
{
  icon: Component
  title: string
  subtitle?: string
  stats?: Array<{ icon: Component, label: string, value: string }>
  metadata?: Array<{ label: string, value: string }>
  href: string
}
```

**Status**: Proposed (currently venue-specific, could be generalized)

---

### StatsBadge.vue
**Description**: Small inline stat display with icon, value, and label. Used within cards or detail views.

**Pattern**:
- Icon (muted color)
- Bold value
- Muted label text
- Flexible gap spacing using tokens

**Used In**:
- `/pages/venues/` (capacity stat in venue cards)
- Could be used in: Event attendance, Personnel count, Company size

**Props**:
```ts
{
  icon: Component
  label: string
  value: string | number
}
```

**Status**: Proposed

---

### FormSection.vue
**Description**: Reusable form section wrapper with consistent heading style, spacing, and optional divider. Reduces duplication in multi-section forms.

**Pattern**:
- Section heading (uppercase, bold, letter-spaced)
- Content slot for form fields
- Automatic spacing via gap tokens
- Optional divider above/below

**Used In**:
- `/pages/venues/add` - 6 sections (Basic Info, Contacts, Technical, Logistics, Hospitality, Parking)
- Could be used in: Event creation, Personnel onboarding forms, Company setup

**Props**:
```ts
{
  title: string
  dividerAbove?: boolean
  dividerBelow?: boolean
}
```

**Slots**: `default` (form fields)

**Status**: New (identified 2026-01-03)

---

### FormActions.vue
**Description**: Sticky or fixed bottom action bar for forms. Consistent left-right layout with Cancel (left) and Primary action (right).

**Pattern**:
- Flex container with space-between
- Left slot: Cancel/secondary actions
- Right slot: Primary action button
- Consistent spacing using tokens
- Optional sticky positioning

**Used In**:
- `/pages/venues/add` (Cancel + Save Venue)
- Could be used in: All create/edit forms (events, personnel, companies)

**Props**:
```ts
{
  sticky?: boolean
}
```

**Slots**: `left` (cancel/secondary), `right` (primary action)

**Status**: New (identified 2026-01-03)

---

### InfoCard.vue
**Description**: Contextual information/help cards with semantic color variants. Displays tips, warnings, or next-step guidance with icon, heading, and content.

**Pattern**:
- Card with semantic background colors (info: blue, warning: yellow, success: green, error: red)
- Icon or emoji prefix
- Bold heading
- Bullet list or paragraph content
- Uses design tokens for colors and spacing

**Used In**:
- `/pages/venues/add` - "What happens next?" helper card (info variant)
- Could be used in: Onboarding tips, validation warnings, success confirmations, contextual help across all forms

**Props**:
```ts
{
  variant?: 'info' | 'warning' | 'success' | 'error'
  heading: string
  icon?: string | Component
}
```

**Slots**: `default` (card content)

**Status**: New (identified 2026-01-03)

---

### AuthCard.vue
**Description**: Full-screen centered authentication card layout. Provides consistent background, centering, spacing, and card styling for all auth pages (login, register, forgot password, reset password). Supports light/dark mode via design tokens.

**Pattern**:
- Full-screen container (min-h-screen) with centered flex layout
- Background using `--background` token
- Centered Card component with max-width constraint
- Consistent padding and gap spacing using design tokens (`--spacing-6`, `--spacing-12`, `--spacing-8`)
- Shadow elevation using design system utilities (`shadow-card`)

**Used In**:
- `/pages/auth/forgot-password` (refactored 2026-01-03)
- `/pages/auth/login` (refactored 2026-01-03)
- `/pages/auth/signup` (refactored 2026-01-03)
- Could be used in: `/pages/auth/reset-password` (~4 auth views total)

**Props**:
```ts
{
  maxWidth?: string  // default: 'sm' (max-w-sm)
}
```

**Slots**: `default` (card content - CardHeader, CardContent, CardFooter)

**Status**: **READY FOR EXTRACTION** (confirmed across 3 auth pages with identical pattern)

---

### FormField.vue (Consideration)
**Description**: Label + Input/Textarea wrapper with consistent spacing, required indicator support, and help text slot. May be too granular - evaluate if ShadCN Label + Input is sufficient.

**Pattern**:
- Label with optional required asterisk
- Input/Textarea component slot
- Optional help text below
- Consistent gap spacing via tokens (`gap-[var(--spacing-2)]`)

**Used In**:
- `/pages/venues/add` - 20+ fields
- `/pages/auth/forgot-password` - email field
- `/pages/auth/login` - email + password fields
- `/pages/auth/signup` - 6 fields (first name, last name, email, company, password, confirm password)
- All forms across the app

**Props**:
```ts
{
  label: string
  required?: boolean
  helpText?: string
  for: string
}
```

**Slots**: `default` (input component)

**Status**: **READY FOR EXTRACTION** (confirmed across 4+ pages with 100% consistent `gap-[var(--spacing-2)]` spacing - provides significant DRY benefits despite abstraction)

---

### AuthLegalFooter.vue
**Description**: Small centered legal disclaimer footer for authentication pages. Displays terms, privacy policy, and other legal links with consistent styling and hover states. Supports light/dark mode via design tokens.

**Pattern**:
- Centered text-xs with `--muted-foreground` color
- Max-width constraint (max-w-md)
- Inline links with underline and hover state transitions
- Spacing using design tokens
- Positioned outside/below main auth card

**Used In**:
- `/pages/auth/login` (refactored 2026-01-03 - "By clicking login, you agree to our...")
- `/pages/auth/signup` (refactored 2026-01-03 - "By clicking sign up, you agree to our...")
- Could be used in: `/pages/auth/forgot-password`, `/pages/auth/reset-password` (~4 auth views)

**Props**:
```ts
{
  message?: string  // default: "By clicking login, you agree to our"
  links?: Array<{ text: string, href: string }>  // Terms, Privacy links
}
```

**Example Usage**:
```vue
<AuthLegalFooter
  message="By signing up, you agree to our"
  :links="[
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' }
  ]"
/>
```

**Status**: Proposed (strong evidence from 2 auth pages - ready for extraction if pattern holds in reset-password)

---

## Recent Additions

**2026-01-03** (Morning - /pages/venues/add refactor):
- Added `FormSection.vue` - identified from /pages/venues/add refactor (6 identical section patterns)
- Added `FormActions.vue` - bottom action bar pattern (Cancel + Save)
- Added `InfoCard.vue` - semantic helper/info cards (blue "What happens next?" card)
- Proposed `FormField.vue` for evaluation - may be too granular given ShadCN components

**2026-01-03** (Afternoon - /pages/venues/empty refactor):
- Added `EmptyState.vue` - highly reusable empty state pattern (icon + heading + description + CTA) - potential for 8-10 views
- Reinforced `PageHeader.vue` - now observed in 2 venues views, strong case for extraction

**2026-01-03** (Evening - /pages/auth/forgot-password refactor):
- Added `AuthCard.vue` - full-screen centered auth layout pattern, applicable to all auth pages (login, register, forgot-password, reset-password)
- Reinforced `FormField.vue` - label + input pattern observed in auth forms as well, increasing case for extraction despite potential over-abstraction concerns

**2026-01-03** (Late Evening - /pages/auth/login refactor):
- Added `AuthLegalFooter.vue` - legal disclaimer footer pattern for auth pages (terms/privacy links)
- **STRONGLY REINFORCED** `AuthCard.vue` - now observed in 2 auth pages (forgot-password + login), upgraded status to "Proposed (strong evidence)"
- **REINFORCED** `FormField.vue` - now observed in 3+ pages (venues/add, forgot-password, login) with identical `gap-2` spacing pattern

**2026-01-03** (Night - /pages/auth/signup refactor):
- **CRITICAL REINFORCEMENT** `AuthCard.vue` - now observed in 3 auth pages (forgot-password, login, signup) - **READY FOR EXTRACTION** (pattern confirmed across all major auth flows)
- **CRITICAL REINFORCEMENT** `FormField.vue` - now observed in 4+ pages (venues/add, forgot-password, login, signup) with 100% consistent `gap-[var(--spacing-2)]` pattern - **READY FOR EXTRACTION**
- **STRONGLY REINFORCED** `AuthLegalFooter.vue` - now observed in 2 auth pages (login, signup) - pattern highly consistent with only message text varying
- **NEW PATTERN IDENTIFIED**: Two-column field groups in forms (e.g., First Name + Last Name, Email + Company, Password + Confirm Password) - seen in signup with `gap-[var(--spacing-4)]` - could be `TwoColumnFieldGroup.vue` but may be too specific (needs evaluation across more forms)
