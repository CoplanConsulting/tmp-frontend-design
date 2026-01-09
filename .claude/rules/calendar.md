# Calendar Module Rules
**Target**: `pages/calendar/**/*`

## Purpose & Context
- **Primary Purpose**: Quick UI/UX prototyping directory for calendar views, built outside the main app development flow
- **Goal**: Rapid visual iteration and UX testing without affecting core application
- **Status**: Transitioning from prototype to production-grade implementation

## Current Implementation

### Original Build (Prototype Phase)
- **Built with**: `frontend-design` skill for initial rapid prototyping
- **Styling Approach**: Tailwind 4.x utilities for speed
- **Known Issue**: Consistency issues from multiple Claude Code sessions

### Production Migration (In Progress)
- **Target Library**: **schedule-x** (https://schedule-x.dev/docs/calendar)
- **Purpose**: Production-grade calendar functionality
- **Integration**: Replacing prototype implementation with schedule-x components

## Data Pattern
Uses `/utils/mockData` to simulate data and API routes for realistic prototypes:

```typescript
// Imports
import { getCalendarDays, CalendarDay } from '~/utils/mockData'
import { DAY_TYPE_CONFIG } from '~/utils/mockData/types'
```

### Mock Data Structure
- **Function**: `getCalendarDays()` - returns array of calendar day objects
- **Type**: `CalendarDay` - interface for day data
- **Config**: `DAY_TYPE_CONFIG` - configuration object for day types (show, travel, off, etc.)

## Development Guidelines
- Maintain separation from main app development flow
- Use mock data for realistic prototypes
- Test UX patterns before integrating into production
- Document any schedule-x integration patterns for future reference
