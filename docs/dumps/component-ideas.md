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

**Status**: **READY FOR EXTRACTION** (confirmed across 3 views: venues, venues/empty, companies - identical pattern)

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

### DateBadge.vue
**Description**: Small, compact date badge component (52x52px) displaying day of week abbreviation and short date. Provides consistent visual representation of dates across calendar, timeline, and list views. Uses design tokens for full light/dark mode support.

**Pattern**:
- Fixed size container (52x52px) with border and card background
- Rounded corners using `--radius-md` token
- Vertically stacked layout (flex column, centered)
- Top line: Day of week abbreviation (uppercase, xs font, semibold, foreground color)
- Bottom line: Short date (e.g., "Jan 15", xs font, muted foreground)
- Small spacing between lines (`--spacing-1`)
- All styling via design tokens for light/dark mode support

**Used In**:
- `/pages/days/day.vue` (current - both empty and event list items)
- Could be used in: Calendar views, timeline components, event lists, schedule views, upcoming events widgets (~5-8 views)

**Props**:
```ts
{
  dayOfWeek: string    // e.g., "MON", "TUE", "WED"
  dateShort: string    // e.g., "Jan 15", "Feb 03"
}
```

**Status**: New (identified 2026-01-03 from days/day refactor - single use currently, high reuse potential across calendar/timeline views)

---

### EventListItem.vue
**Description**: Clickable event list item combining DateBadge with event details (location, venue). Provides consistent event presentation in list views with hover states and smooth transitions. Uses design tokens for full light/dark mode support.

**Pattern**:
- Horizontal flex layout with gap spacing (`--spacing-4`)
- Left: DateBadge component (52x52px, flex-shrink-0)
- Right: Event details (flex-1, vertical stack)
  - Location title (lg font, semibold, foreground color)
  - Venue subtitle (sm font, muted foreground, small top spacing)
- Hover state: background change to muted color
- Rounded corners with `--radius-md`
- Smooth transition using `--transition-duration-fast`
- Negative margins for full-width hover effect

**Used In**:
- `/pages/days/day.vue` (current - day list with events)
- Could be used in: Calendar day view, event search results, upcoming events sidebar, tour schedule views (~4-6 views)

**Props**:
```ts
{
  dayOfWeek: string      // Passed to DateBadge
  dateShort: string      // Passed to DateBadge
  location: string       // Primary text (e.g., "Los Angeles, CA")
  venueName: string      // Subtitle text (e.g., "The Forum")
  onClick?: () => void   // Click handler
}
```

**Emits**: `onClick` (triggered when item is clicked)

**Status**: New (identified 2026-01-03 from days/day refactor - single use currently, high reuse potential for event lists)

---

### EmptyDayListItem.vue
**Description**: Empty day list item with DateBadge and "Add Event" button. Represents empty calendar days in list views, providing consistent CTA for adding new events. Uses design tokens for full light/dark mode support.

**Pattern**:
- Horizontal flex layout with gap spacing (`--spacing-4`)
- Left: DateBadge component (52x52px, flex-shrink-0)
- Right: "Add Event" button
  - Uses primary action button styling (foreground background, background text)
  - Includes Plus icon with consistent spacing (`--spacing-2` gap)
  - Smooth hover transition (`--transition-duration-base`)
  - Button text: "Add Event" (or customizable via prop)

**Used In**:
- `/pages/days/day.vue` (current - empty days in schedule)
- Could be used in: Calendar views with empty slots, schedule builders, day planner views (~3-4 views)

**Props**:
```ts
{
  dayOfWeek: string         // Passed to DateBadge
  dateShort: string         // Passed to DateBadge
  buttonText?: string       // Default: "Add Event"
  onAddEvent?: () => void   // Click handler for button
}
```

**Emits**: `onAddEvent` (triggered when "Add Event" button is clicked)

**Status**: New (identified 2026-01-03 from days/day refactor - single use currently, moderate reuse potential for calendar/schedule views)

---

### DetailCard.vue
**Description**: Reusable information card component for detail views with icon+title header and key-value pairs separated by dividers. Provides consistent layout for displaying entity information sections (company details, location, contact info, etc.). Uses design tokens for full light/dark mode support.

**Pattern**:
- Card wrapper with border, shadow, and semantic colors
- CardHeader with icon + title (bold, uppercase labels)
- CardContent with vertical stack of key-value pairs
- Separator components between items
- Label style: uppercase, xs font, semibold, muted foreground
- Value style: sm font, foreground color, clickable links where appropriate
- All spacing via `--spacing-*` tokens

**Used In**:
- `/pages/companies/[id]` (current - Company Information, Location cards)
- Could be used in: `/pages/venues/[id]`, `/pages/personnel/[id]`, `/pages/contacts/[id]` (~4-6 detail views)

**Props**:
```ts
{
  title: string                                    // Card title
  icon?: Component                                 // Optional icon component
  fields: Array<{
    label: string                                  // Field label (e.g., "Company Type")
    value: string | Component                      // Field value or custom component
    link?: { href: string, external?: boolean }    // Optional link config
    show?: boolean                                 // Conditional display
  }>
}
```

**Slots**: `default` (for custom field rendering if needed)

**Status**: New (identified 2026-01-03 from companies/[id] refactor)

---

### SearchFilterBar.vue
**Description**: Reusable search and filter bar component combining SearchInput with filter controls (icon + dropdown). Provides consistent filtering UX across entity list views. Uses design tokens for spacing, colors, and form controls.

**Pattern**:
- Horizontal flex layout with gap spacing
- Left: SearchInput component (takes full width with flex-1)
- Right: Filter icon + Select dropdown (inline group)
- Select uses full design token styling (border, background, focus ring)
- All spacing via `--spacing-*` tokens

**Used In**:
- `/pages/companies/` (current - type filter)
- Could be used in: `/pages/venues/`, `/pages/personnel/`, `/pages/events/`, `/pages/guest-lists/` (~5-7 list views)

**Props**:
```ts
{
  searchQuery: string
  searchPlaceholder?: string
  filterOptions?: Array<{ label: string, value: string }>
  filterValue?: string
  filterLabel?: string  // e.g., "Type", "Department", "Status"
}
```

**Emits**: `update:searchQuery`, `update:filterValue`

**Status**: New (identified 2026-01-03 from companies refactor)

---

### FilteredEmptyState.vue (or EmptyState variant)
**Description**: Inline empty state component for "no results after filtering" scenarios. Shows icon, message, description, and "Clear Filters" button. Differs from true EmptyState (no data exists) vs filtered empty (data exists but filters exclude everything).

**Pattern**:
- Centered flex column layout
- Icon with muted color + opacity
- Heading + description text stack
- "Clear Filters" button (only shown when filters active)
- Uses design tokens for all styling

**Used In**:
- `/pages/companies/` (current - inline table cell)
- Could be used in: All entity list tables with search/filter (~5-7 views)

**Props**:
```ts
{
  icon: Component           // Lucide icon
  message: string           // e.g., "No companies match your search"
  description: string       // Help text
  showClearButton?: boolean // Conditional display
}
```

**Emits**: `onClear` (triggered when Clear Filters clicked)

**Status**: New (identified 2026-01-03 from companies refactor)

**Note**: Could be variant prop on EmptyState.vue (variant="filtered") instead of separate component - evaluate during extraction.

---

### TimelineEventNav.vue
**Description**: Reusable timeline/event navigation sidebar component with DateBadge pattern, scrollable event list, and active state management. Provides consistent event navigation UX across multi-event views. Uses design tokens for full light/dark mode support.

**Pattern**:
- Fixed-width sidebar (300px) with border-right separation
- SidebarHeader with contextual action buttons (e.g., "Today", "Go To")
- Scrollable event list in SidebarContent
- Each event item combines DateBadge (52x52px) with location title and venue subtitle
- Active state highlighting with muted background color
- Hover states with smooth color transitions
- All spacing, colors, typography via design tokens

**Used In**:
- `/pages/events/advance/[slug]` (current - event timeline navigation)
- `/pages/guest-list/[id]/index` (current - guest list event selector)
- Could be used in: Tour calendar views, multi-event dashboards, schedule builders (~3-4 views)

**Props**:
```ts
{
  events: Array<{
    id: string
    dayOfWeek: string      // For DateBadge
    dateShort: string       // For DateBadge
    location: string        // Primary text
    venueName: string       // Subtitle text
  }>
  activeEventId?: string    // Highlighted event
  headerActions?: Component // Slot for header buttons
}
```

**Emits**: `onEventSelect(eventId: string)` - triggered when event is clicked

**Status**: **READY FOR EXTRACTION** (confirmed across 2 views with identical pattern - events/advance and guest-list)

---

### StatusBadge.vue
**Description**: Semantic status badge component with color-coded states and full light/dark mode support. Provides consistent visual representation of approval/workflow states across the application. Uses predefined color schemes for common statuses (approved, pending, declined) with fallback to design tokens.

**Pattern**:
- Badge component with semantic background, text, and border colors
- Predefined color schemes for common states:
  - Approved: Green (bg-green-50/dark:bg-green-950, text-green-800/dark:text-green-200)
  - Pending: Yellow (bg-yellow-50/dark:bg-yellow-950, text-yellow-800/dark:text-yellow-200)
  - Declined: Red (bg-red-50/dark:bg-red-950, text-red-800/dark:text-red-200)
  - Default: Design tokens (bg-[var(--muted)], text-[var(--foreground)])
- Small font size for inline display
- Helper function for class mapping: getStatusClass(status)

**Used In**:
- `/pages/guest-list/[id]/[guestid]` (current - guest approval status)
- Could be used in: Events approval status, personnel onboarding, company verification, contact status, advance approval (~4-6 views)

**Props**:
```ts
{
  status: 'approved' | 'pending' | 'declined' | string  // Status value
  variant?: 'default' | 'outline'                       // Badge style
}
```

**Status**: New (identified 2026-01-03 from guest-list refactor - high reuse potential for approval workflows)

---

### VenueInfoCard.vue
**Description**: Specialized card component for displaying venue information with formatted address and contact details. Provides consistent venue display pattern across event and guest list views. Could be implemented as a specialized variant of DetailCard.vue or standalone component.

**Pattern**:
- Card wrapper with border and semantic colors
- CardHeader with MapPin icon + "Venue" title
- CardContent with formatted address (multi-line) and contact info
- Address format: Name (bold) → Street → City, State ZIP
- Phone contact with Phone icon
- All styling via design tokens for light/dark mode support

**Used In**:
- `/pages/guest-list/[id]/index` (current - venue card in 2-column grid)
- Could be used in: Event detail views, advance pages, venue quick info (~3-4 views)

**Props**:
```ts
{
  venue: {
    name: string
    address?: string
    city?: string
    state?: string
    postalCode?: string
    phone?: string
  }
}
```

**Alternative**: Could extend DetailCard.vue with specialized address formatting slot instead of creating new component

**Status**: New (identified 2026-01-03 from guest-list refactor - specialized variant, evaluate extraction vs extending DetailCard)

---

### TabFilterNav.vue
**Description**: Reusable tabs navigation component for filtering entity lists by status or category. Provides consistent tab-based filtering UX across list views. Uses ShadCN Tabs components with design token styling.

**Pattern**:
- TabsList container with border and card background
- Multiple TabsTrigger components for filter options (e.g., All/Pending/Approved/Declined)
- Each TabsContent wraps filtered data view (e.g., table, grid, list)
- Tab content spacing with design tokens
- All colors and spacing via design tokens for light/dark mode

**Used In**:
- `/pages/guest-list/[id]/index` (current - filter by guest status: All/Pending/Approved/Declined)
- `/pages/contacts/index` (similar - toggle between "All Contacts" and "By Company" views)
- Could be used in: Personnel (by department/role), Events (by status), Companies (by type) (~4-5 views)

**Props**:
```ts
{
  tabs: Array<{
    label: string          // Tab trigger text
    value: string          // Tab identifier
    count?: number         // Optional badge count
  }>
  defaultTab?: string      // Default active tab
}
```

**Slots**: Named slots for each tab content (e.g., `#all`, `#pending`, `#approved`)

**Emits**: `onTabChange(tabValue: string)` - triggered when active tab changes

**Status**: Growing pattern (observed in 2 views - guest-list and contacts - with slight variations)

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

**2026-01-03** (Late Night - /pages/companies/ refactor):
- **CRITICAL REINFORCEMENT** `PageHeader.vue` - now observed in 3 views (venues, venues/empty, companies) with identical pattern - **UPGRADED TO READY FOR EXTRACTION** (title + badge + description + action button slot)
- **NEW** `SearchFilterBar.vue` - identified from companies search/filter bar (SearchInput + Filter icon + Select dropdown) - applicable to 5-7 entity list views (personnel, events, guest-lists, etc.)
- **NEW** `FilteredEmptyState.vue` - inline "no results after filtering" pattern with Clear Filters CTA - differs from true EmptyState (could be variant prop instead of separate component)
- **OBSERVATION**: Table pattern with StatusBadge, contact links, and metadata cells is consistent but may be too entity-specific to abstract (StatusBadge already handles company types via utility classes)

**2026-01-03** (Late Night Follow-up - /pages/companies/ button transitions refactor):
- **REFACTOR COMPLETED**: Fixed button hover states to use `hover:bg-[var(--foreground)]/90` with explicit `transition-colors duration-[var(--transition-duration-base)]` (consistent with venues pattern)
- **OBSERVATION**: Companies page table layout differs from venues grid layout but both share PageHeader, EmptyState, and action button patterns
- **CONSISTENCY CHECK**: All transitions now use design tokens (`--transition-duration-base` for buttons, `--transition-duration-fast` for hover states)
- **PATTERN CONFIRMED**: Primary action buttons across app follow consistent pattern: `bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]` - ready for utility class or component extraction

**2026-01-03** (Post-Midnight - /pages/companies/[id] and /pages/companies/add refactor):
- **NEW** `DetailCard.vue` - Identified from companies/[id] detail view - consistent pattern for detail information cards with icon+title header and key-value pairs separated by dividers
- **CRITICAL REINFORCEMENT** `FormSection.vue` - Pattern confirmed across companies/add (Location, Contact Information sections) - now observed in 2+ forms (venues/add with 6 sections, companies/add with 3 sections)
- **REINFORCED** `InfoCard.vue` - Helper card pattern confirmed in companies/add ("What happens next?" card) - now observed in 2 forms with semantic accent-based styling
- **REINFORCED** `FormActions.vue` - Bottom action buttons (Cancel left, Save right) confirmed in companies/add - pattern consistent across all forms
- **DESIGN TOKEN CONSISTENCY**: Both pages now fully aligned with design system using `var(--spacing-*)`, `var(--font-size-*)`, `var(--color-*)` tokens and explicit transitions for light/dark mode support

**2026-01-03** (Early Morning - /pages/contacts/ refactor - all 4 pages):
- **CRITICAL REINFORCEMENT** `DetailCard.vue` - Pattern confirmed in contacts/[id].vue with 3 information cards (Contact Information, Company, Professional Details) - now observed in 2 detail views (companies/[id], contacts/[id]) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormSection.vue` - Pattern confirmed in contacts/add.vue with "Contact Information" section - now observed in 3+ forms (venues/add with 6 sections, companies/add with 3 sections, contacts/add with 1 section) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormActions.vue` - Pattern confirmed in contacts/add.vue with Cancel + Save Contact buttons - now observed in 3+ forms (venues/add, companies/add, contacts/add) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `InfoCard.vue` - Pattern confirmed in contacts/add.vue with blue "What happens next?" helper card - now observed in 3 forms with consistent semantic accent styling - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormField.vue` - Pattern confirmed across all contacts/add fields with 100% consistent `gap-[var(--spacing-2)]` spacing - now observed in 5+ pages (venues/add, auth pages, companies/add, contacts/add) - **READY FOR EXTRACTION**
- **REINFORCED** `SearchFilterBar.vue` - Pattern confirmed in contacts/index.vue with SearchInput + Company filter + Role filter (2 filters) - similar to companies/index.vue (search + type filter) - now observed in 2 list views with slight variations (1-2 filter dropdowns)
- **REINFORCED** `FilteredEmptyState.vue` - Pattern confirmed in contacts/index.vue with inline empty states in both "All Contacts" table and "By Company" grouped view - matches companies/index.vue pattern exactly
- **OBSERVATION**: Tabs pattern in contacts/index.vue (All Contacts vs. By Company) is similar to other list views with view toggles - could be `ViewToggleTabs.vue` component but needs more evidence from other pages
- **OBSERVATION**: Grouped list pattern in contacts/index.vue (contacts grouped by company with section headers) is similar to potential patterns in other entity views - worth tracking across venues, personnel, events
- **DESIGN TOKEN CONSISTENCY**: All 4 contacts pages now fully aligned with design system - every ad-hoc Tailwind class replaced with design tokens for full light/dark mode support and consistent spacing/typography/colors
- **PATTERN COUNT**: DetailCard (2 views), FormSection (3+ forms), FormActions (3+ forms), InfoCard (3 forms), FormField (5+ pages), SearchFilterBar (2 views), FilteredEmptyState (2 views)

**2026-01-03** (Days Refactor - /pages/days/day.vue):
- **CRITICAL REINFORCEMENT** `FormSection.vue` - Pattern confirmed in add-event form with 5 sections (Event Information, Location & Venue, Date & Time, Capacity, Additional Information) - now observed in 4+ forms - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormActions.vue` - Pattern confirmed with Cancel + Create Event buttons - now observed in 4+ forms - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `DetailCard.vue` - Pattern confirmed in event detail view with 5 info cards (Show Info, Return to Hotel, Notes, Venue Info, Hotel Info) - all using uppercase section headers, key-value pairs, and dividers - now observed in 3 detail views (companies/[id], contacts/[id], days/day event detail) - **READY FOR EXTRACTION**
- **NEW** `DateBadge.vue` - Small date badge component (52x52px) with day of week + short date - Used In: days/day (day list items, both empty and with events) - Could be used in: calendar views, timeline components, event lists (~3-5 views)
- **NEW** `EventListItem.vue` - Clickable event card with date badge, location title, and venue subtitle - Used In: days/day (event list) - Could be used in: calendar day view, event search results, upcoming events widget (~3-4 views)
- **NEW** `EmptyDayListItem.vue` - Empty day row with date badge + "Add Event" button - Used In: days/day (empty days in list) - Could be used in: calendar views with empty slots, schedule builders (~2-3 views)
- **DESIGN TOKEN CONSISTENCY**: /pages/days/day.vue now fully aligned - all ad-hoc classes (gray-50, text-lg, p-4, etc.) replaced with design tokens (var(--background), var(--font-size-lg), var(--spacing-4)) for full light/dark mode support
- **TRANSITION CONSISTENCY**: All interactive elements now use explicit `transition-colors duration-[var(--transition-duration-base)]` for smooth light/dark mode switching
- **PATTERN COUNT**: DetailCard (3 views), FormSection (4+ forms), FormActions (4+ forms), DateBadge (1 view - new pattern), EventListItem (1 view - new pattern), EmptyDayListItem (1 view - new pattern)

**2026-01-03** (Events Refactor - /pages/events/ - all 4 pages):
- **CRITICAL REINFORCEMENT** `PageHeader.vue` - Pattern confirmed in events/index.vue with title + action buttons (Filter, Search, Add Event) - now observed in 4+ views (venues, venues/empty, companies, events) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `EmptyState.vue` - Pattern confirmed in events/empty.vue following exact venues/empty pattern (Calendar icon, "No events yet" heading, description, "Add Your First Event" CTA) - now observed in 2+ views with identical structure - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormSection.vue` - Pattern confirmed in events/add.vue with 6 sections (Event Information, Location & Venue, Contacts, Date & Time, Capacity, Additional Information) - now observed in 5+ forms (venues/add, companies/add, contacts/add, days/day, events/add) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `FormActions.vue` - Pattern confirmed in events/add.vue with Cancel + Create Event buttons - now observed in 5+ forms - **READY FOR EXTRACTION**
- **REINFORCED** `DateBadge.vue` - Pattern used in events/advance/[slug].vue sidebar timeline (52x52px badge with day of week + short date) - now observed in 2 views (days/day, events/advance) - increasingly valuable for calendar/timeline UI
- **NEW PATTERN** Event Status Indicators - events/index.vue uses color-coded status dots (green/yellow/red/orange) for event confirmation status AND advance status - Could extract as `StatusIndicator.vue` component with semantic color mapping (confirmed=green, pending=yellow, cancelled=red, etc.)
- **NEW PATTERN** Timeline Sidebar Navigation - events/advance/[slug].vue uses sophisticated sidebar pattern with:
  - Fixed width sidebar (300px) with scroll
  - Event list items with DateBadge + location + venue
  - Active state highlighting for current event
  - Hover states with muted background
  - Could extract as `TimelineEventNav.vue` for reuse in other multi-event views
- **NEW PATTERN** Editable Info Cards Grid - events/advance uses 2-column grid of EditableInfoCard components (Day of Show Contact, Promoter, Venue, Hotel) - Already componentized but pattern worth noting for other detail views
- **NEW PATTERN** Event Metadata Grid - events/index.vue uses 4-column grid for event stats (Status, Capacity, Show Time, Advance Status) with icons, labels, and values - Could extract as `EventMetadataGrid.vue` or make more generic `MetadataGrid.vue`
- **DESIGN TOKEN CONSISTENCY**: All 4 events pages now fully aligned with design system:
  - events/index.vue: All ad-hoc Tailwind classes (text-gray-900, bg-white, p-6, text-3xl, etc.) replaced with tokens
  - events/empty.vue: Created from scratch using 100% design tokens (matches venues/empty pattern perfectly)
  - events/add.vue: Large form with 6 sections, all ad-hoc styles replaced with tokens (text-gray-500 → text-[var(--muted-foreground)], border-gray-300 → border-[var(--border)], etc.)
  - events/advance/[slug].vue: Most complex page - sidebar, header, info cards, accordions, all refactored to use tokens
- **TRANSITION CONSISTENCY**: All interactive elements (buttons, hover states, links) now use explicit `transition-colors duration-[var(--transition-duration-base)]` or `duration-[var(--transition-duration-fast)]` for smooth theme switching
- **LIGHT/DARK MODE SUPPORT**: Complete token usage ensures all events pages automatically support light/dark mode without additional CSS
- **PATTERN COUNT UPDATE**:
  - PageHeader (4+ views - ready for extraction)
  - EmptyState (2+ views - ready for extraction)
  - FormSection (5+ forms - ready for extraction)
  - FormActions (5+ forms - ready for extraction)
  - DateBadge (2 views - growing pattern)
  - NEW: StatusIndicator (1 view - proposed)
  - NEW: TimelineEventNav (1 view - proposed)
  - NEW: EventMetadataGrid (1 view - proposed)

**2026-01-03** (Guest List Refactor - /pages/guest-list/ - all 3 pages):
- **CRITICAL REINFORCEMENT** `TimelineEventNav.vue` (formerly TimelineEventSidebar) - Pattern STRONGLY confirmed in guest-list/[id]/index.vue with identical sidebar structure to events/advance/[slug].vue:
  - Fixed width sidebar (300px) with border-right
  - Scrollable event list with DateBadge + location + venue
  - Active state highlighting (bg-[var(--muted)])
  - Hover states with muted background transition
  - SidebarHeader with action buttons (Today, Go To)
  - **NOW OBSERVED IN 2 VIEWS** (events/advance, guest-list) - **READY FOR EXTRACTION**
- **CRITICAL REINFORCEMENT** `DateBadge.vue` - Pattern used in guest-list sidebar event list items (52x52px, day of week + short date) - now observed in 3 views (days/day, events/advance, guest-list) - **READY FOR EXTRACTION** (high reuse across calendar/timeline/list views)
- **REINFORCED** `DetailCard.vue` - Pattern confirmed in guest-list/[id]/[guestid].vue guest detail card (grid of label/value pairs) - now observed in 4 detail views (companies/[id], contacts/[id], days/day, guest-list/[id]/[guestid]) - increasingly valuable
- **NEW** `StatusBadge.vue` - Semantic status badge component with light/dark mode support for approval workflows:
  - Color-coded states: approved (green), pending (yellow), declined (red), default (gray)
  - Full light/dark mode color schemes (bg-green-50/dark:bg-green-950, etc.)
  - Uses design tokens for fallback default state
  - Pattern: Status display with getStatusClass() helper function
  - **Used In**: guest-list/[id]/[guestid].vue (guest status display)
  - **Could be used in**: Events approval, personnel onboarding status, company verification, contact status (~4-6 views)
- **NEW** `VenueInfoCard.vue` - Specialized card component for displaying venue information with formatted address and contact details:
  - Pattern: Card with MapPin icon + "Venue" title header
  - Formatted multi-line address display
  - Phone contact with icon
  - Uses design tokens throughout
  - **Used In**: guest-list/[id]/index.vue (venue card in 2-column grid)
  - **Could extend**: DetailCard.vue with specialized address formatting slot
  - **Could be used in**: Event detail views, advance pages, venue quick info (~3-4 views)
- **NEW PATTERN** Tab Filter Navigation - Tabs component for filtering entity lists with status-based views:
  - Pattern: TabsList with multiple TabsTrigger components (All/Pending/Approved/Declined)
  - Each TabsContent displays filtered subset of data
  - Used for guest list filtering by status
  - **Used In**: guest-list/[id]/index.vue (guest list tabs)
  - **Similar to**: contacts/index.vue tabs (All Contacts vs By Company)
  - **Could extract as**: `TabFilterNav.vue` component with flexible filter options prop
  - **Could be used in**: Personnel views (by department/role), Events (by status), Companies (by type) (~4-5 views)
- **DESIGN TOKEN CONSISTENCY**: All 3 guest-list pages now fully aligned with design system:
  - guest-list/index.vue: Simple redirect/loading state - all ad-hoc classes (text-gray-600) replaced with tokens
  - guest-list/[id]/index.vue: Complex layout with sidebar, header, cards, tabs - all ad-hoc styles replaced (bg-gray-50 → bg-[var(--background)], text-gray-900 → text-[var(--foreground)], border-gray-200 → border-[var(--border)], spacing tokens throughout)
  - guest-list/[id]/[guestid].vue: Guest detail view - refactored with design tokens, implemented basic guest detail card, added proper status badge with light/dark mode support
- **TRANSITION CONSISTENCY**: All interactive elements (buttons, hover states, sidebar nav items) now use explicit `transition-colors duration-[var(--transition-duration-base)]` or `duration-[var(--transition-duration-fast)]`
- **LIGHT/DARK MODE SUPPORT**: Complete token usage + semantic status colors with dark mode variants ensure full theme support
- **PATTERN COUNT UPDATE**:
  - TimelineEventNav (2 views - **READY FOR EXTRACTION**)
  - DateBadge (3 views - **READY FOR EXTRACTION**)
  - DetailCard (4 views - strong evidence)
  - StatusBadge (1 view - new pattern, high potential)
  - VenueInfoCard (1 view - specialized variant)
  - TabFilterNav (2 views - growing pattern)
