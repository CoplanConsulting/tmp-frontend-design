# UI Component Rules
**Target**: `components/**/*`

## UI Library Stack
- **UI Framework**: shadcn-vue (Radix Vue primitives)
- **Icons**: lucide-vue-next
- **Forms**: vee-validate + zod for validation

## Adding New UI Components
```bash
npx shadcn-vue@latest add [component]
```

## Component Organization Structure
```
components/
├── AppSidebar.vue          # Main app sidebar (used in default layout)
├── NavMain.vue             # Navigation menu renderer
├── NavUser.vue             # User profile dropdown
├── OrganizationSwitcher.vue        # Tour/organization switcher
├── common/                 # Reusable app components
│   ├── EmptyState.vue
│   ├── FormSection.vue
│   ├── PageHeader.vue
│   ├── SearchInput.vue
│   ├── StatsCard.vue
│   └── StatusBadge.vue
└── ui/                     # shadcn-vue components (auto-generated)
    ├── accordion/
    ├── avatar/
    ├── badge/
    ├── button/
    ├── card/
    ├── form/
    ├── input/
    ├── select/
    ├── table/
    └── ... (other shadcn components)
```

## Component Guidelines
- **Auto-imported**: All components in `components/` are auto-imported by Nuxt
- **shadcn-vue**: Located in `components/ui/` - these are primitives, don't modify directly
- **Custom Components**: Place in `components/common/` for reusable app-specific components
- **Layout Components**: Top-level components like `AppSidebar`, `NavMain`, etc.

## Vue Component Standards
- Use `<script setup lang="ts">` for all components
- Type props and emits explicitly
- Leverage Nuxt auto-imports for composables and utilities
