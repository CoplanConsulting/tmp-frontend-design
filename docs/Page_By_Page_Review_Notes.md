#### /auth (forgot-password.vue, login.vue, signup.vue)

- **Inconsistencies**: Medium. Forms likely use varying padding (e.g., ad-hoc p-4), inconsistent button colors (blue info boxes noted as unnecessary), no uniform line-heights. Typography: Labels may lack bold weights; no semantic text colors.
- **Apple Gaps**: Lacks warm neutrals; needs tighter spacing rhythm (e.g., --spacing-4 for fields).
- **Refactor Needs**: Apply tokens to forms/buttons; remove blue boxes.
- **Component Ideas**: AuthForm (reusable for all auth pages); ButtonPrimary.

#### /calendar/index.vue

- **Inconsistencies**: High. Header lacks timezone/view options; custom components (e.g., Schedule-X) have overrides but inconsistent gaps/margins. Colors: Ad-hoc for today/highlights.
- **Apple Gaps**: No modular grid for days; uneven typography in headers/dates.
- **Refactor Needs**: Use --layout-grid-columns for calendar; semantic colors for statuses (--color-accent for highlights).
- **Component Ideas**: CalendarHeader; DayGridItem.

#### /companies ([id].vue, add.vue, empty.vue, index.vue)

- **Inconsistencies**: High. Tabs/search lack pagination spacing; add form missing fields with uneven labels/data contrast. Empty state placeholder text inconsistent.
- **Apple Gaps**: Low hierarchy (labels/data blend); no content gutters.
- **Refactor Needs**: Tokens for card padding (--spacing-4); bold labels (--font-weight-medium).
- **Component Ideas**: EntityTable (reusable for lists); AddFormSection; EmptyState (already noted as template).

#### /contacts ([id].vue, add.vue, empty.vue, index.vue)

- **Inconsistencies**: High. Similar to /companies: Tabs feel suboptimal; blue info box unnecessary; uneven schema-driven fields.
- **Apple Gaps**: Data presentation lacks contrast; no line-height for readability.
- **Refactor Needs**: Normalize with /companies (shared tokens); remove info box.
- **Component Ideas**: ContactCard; InlineEditField (for details).

#### /dashboard.vue

- **Inconsistencies**: Medium. Likely card-based; varying stats spacing/colors.
- **Apple Gaps**: Needs max-width for content focus; subtle shadows.
- **Refactor Needs**: Use --layout-max-width; semantic accents for stats.
- **Component Ideas**: StatsGrid; DashboardCard.

#### /days/day.vue

- **Inconsistencies**: High. Add event section needs component; empty state inconsistent; buttons ("Today"/"Go To") unstyled uniformly.
- **Apple Gaps**: No vertical rhythm for sections; muted text for "No Event" not defined.
- **Refactor Needs**: Tokens for button spacing; line-height for dates.
- **Component Ideas**: AddEventForm; DayEmptyState.

#### /events (add.vue, advance/[slug].vue, index.vue)

- **Inconsistencies**: High. Status views have overlapping filters/tabs; progress % unstyled; links/buttons duplicate.
- **Apple Gaps**: Low contrast in statuses; no grid for event lists.
- **Refactor Needs**: Semantic colors for progress (--color-success); uniform typography for details.
- **Component Ideas**: EventStatusBadge; AdvanceFormSection.

#### /guest-list ([id]/[guestId].vue, [id]/index.vue, index.vue)

- **Inconsistencies**: High. Loading logic messy; header buttons/ticket grids unwired with uneven spacing; add guest broken.
- **Apple Gaps**: Dynamic day/event lacks gutters; low hierarchy in tables.
- **Refactor Needs**: Tokens for table rows (--spacing-3); muted text for empties.
- **Component Ideas**: GuestTableRow; TicketAllocationGrid.

#### /index.vue

- **Inconsistencies**: Low. Likely redirect or simple; minimal styles.
- **Apple Gaps**: N/A if basic.
- **Refactor Needs**: Ensure background/token alignment.
- **Component Ideas**: None immediate.

#### /onboarding (create-tour.vue, index.vue, success.vue)

- **Inconsistencies**: Medium. Date pickers broken; links inconsistent.
- **Apple Gaps**: Forms lack tight spacing; no warm neutrals.
- **Refactor Needs**: Tokens for inputs (--spacing-2 gaps).
- **Component Ideas**: DatePicker; OnboardingStep.

#### /organization (groups/[id].vue, groups/add.vue, groups/index.vue, settings.vue, users/[id].vue, users/add.vue, users/index.vue)

- **Inconsistencies**: High. Permissions toggles unclear (link vs. toggle); UI doesn't match app; blue boxes.
- **Apple Gaps**: Low contrast in lists; no content width caps.
- **Refactor Needs**: Semantic accents for toggles; bold group names.
- **Component Ideas**: PermissionsToggle; UserGroupCard.

#### /personnel ([id].vue, index.vue)

- **Inconsistencies**: Medium. Filtered lists; details share styles with /settings but uneven accordions.
- **Apple Gaps**: Data hierarchy weak; no line-heights for sections.
- **Refactor Needs**: Tokens for accordion spacing.
- **Component Ideas**: PersonDetailAccordion (shared with /settings).

#### /settings/account (privacy.vue, profile.vue)

- **Inconsistencies**: Medium. Accordions lack contrast; inline editing needed.
- **Apple Gaps**: Typography flat; no warm shadows.
- **Refactor Needs**: Bold labels (--font-weight-medium); muted values (--color-text-secondary).
- **Component Ideas**: PrivacyOptionBtn (already BEM-like); ProfileSection.

#### /venues ([id].vue, add.vue, empty.vue, index.vue)

- **Inconsistencies**: High. Buttons unwired; schema fields uneven; low contrast labels/data.
- **Apple Gaps**: Visual hierarchy poor; no gutters in details.
- **Refactor Needs**: Tokens for field groups (--spacing-6); semantic borders.
- **Component Ideas**: VenueDetailCard; AddVenueForm.

**Audit Summary**: High inconsistencies in ~60% of views (e.g., forms/lists with ad-hoc spacing/colors). Apple gaps: Weak hierarchy/contrast everywhere; no rhythm. Total potential components: ~20 (e.g., reusable tables/forms). Prioritize: Start with /venues group (schema-attached), then /events, /settings.