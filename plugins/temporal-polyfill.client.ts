/**
 * Temporal API Polyfill
 *
 * Required for @schedule-x/calendar which uses the Temporal API.
 * The Temporal API is a Stage 3 ECMAScript proposal not yet implemented in browsers.
 *
 * Per schedule-x docs: https://schedule-x.dev/docs/calendar
 * Import temporal-polyfill/global to make Temporal available globally.
 */

import 'temporal-polyfill/global'

export default defineNuxtPlugin(() => {
  // Polyfill is now available globally via the import above
})
