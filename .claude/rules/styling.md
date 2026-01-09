# Styling Rules
**Target**: `**/*`

## Tailwind CSS 4.x Configuration
- **Primary Approach**: Tailwind 4 utility classes
- **Configuration Method**: CSS-first configuration via `@theme` blocks in `assets/css/main.css`
- **CRITICAL**: No `tailwind.config.js` file exists (Tailwind 4 uses CSS-first config)
- **Tokens**: Define design tokens in `assets/css/main.css` using `@theme` blocks

## Styling Standards
- **No inline styles** - use Tailwind utility classes or CSS variables
- **Arbitrary values**: Use `[42px]`, `[#ff0000]` for exact mockup matching
- Prefer utility classes over custom CSS when possible

## BEM Workflow Integration
- **Current State**: `main.css` is transitioning to manage a BEM (Block Element Modifier) workflow alongside Tailwind utilities
- **Reason**: Addressing styling inconsistencies from multiple prototyping sessions
- **Future Direction**: The main project will move completely to a BEM atomic design approach for better consistency and maintainability

## CSS Variable Usage
- Define custom properties in `assets/css/main.css`
- Use CSS variables for theme-aware values
- Leverage Tailwind's design token system through `@theme` blocks
