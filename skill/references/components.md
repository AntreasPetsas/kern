# Components — Full Reference

> Generated from `specs/*.spec.json`. Each component spec drives the React implementation, this reference, and the docs site simultaneously.

## Button

**Category:** action
Triggers an action or event. The primary interactive element for user-initiated actions.

### Button Props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | yes | Button label or icon+label content |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | no | Visual style. primary = filled, secondary = outlined/muted fill, ghost = transparent |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | no | Physical size affecting padding and font-size |
| `disabled` | `boolean` | `false` | no | Prevents interaction and signals unavailability |
| `loading` | `boolean` | `false` | no | Shows a spinner and prevents interaction while an async action runs |
| `fullWidth` | `boolean` | `false` | no | Stretches the button to fill its container width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | no | HTML button type. Use 'submit' inside forms |
| `onClick` | `(e: MouseEvent) => void` | — | no | Click handler |

### Button Variants

- **primary** — High-emphasis action. Use once per section for the single most important action.
- **secondary** — Medium-emphasis. Supports the primary action or provides a safe alternative.
- **ghost** — Low-emphasis. Tertiary actions, destructive confirmations, or toolbar controls.

### Button States

- **default** — Resting state
- **hover** — Cursor over the button — background shifts one shade darker
- **focus-visible** — Keyboard-focused — 2px solid focus ring with offset
- **active** — Mouse pressed — slight scale-down for tactile feedback
- **disabled** — Interaction blocked — muted palette, not-allowed cursor
- **loading** — Async action running — spinner replaces or prefixes label, pointer-events none

### Button Tokens used

- `color.action.primary`
- `color.action.primaryHover`
- `color.action.primaryForeground`
- `color.action.secondary`
- `color.action.secondaryHover`
- `color.action.secondaryForeground`
- `color.action.ghost`
- `color.action.ghostHover`
- `color.action.ghostForeground`
- `color.border.focus`
- `color.text.disabled`
- `spacing.2`
- `spacing.3`
- `spacing.4`
- `spacing.5`
- `spacing.6`
- `radius.md`
- `typography.fontSize.sm`
- `typography.fontSize.md`
- `typography.fontWeight.semibold`
- `typography.lineHeight.tight`
- `typography.fontFamily.base`

### Button Accessibility

- **Role:** button
- **Keyboard:**
  - Enter — activates the button
  - Space — activates the button
- **ARIA:**
  - aria-disabled='true' when disabled (keep focusable so screen readers announce it)
  - aria-busy='true' + aria-label update when loading
  - No aria-role needed — native <button> has implicit button role

### Button Examples

**Primary variants** — All three variants at default size

```jsx
<Button variant='primary'>Save changes</Button>
<Button variant='secondary'>Cancel</Button>
<Button variant='ghost'>Delete</Button>
```

**Size scale** — sm / md / lg at primary variant

```jsx
<Button size='sm'>Small</Button>
<Button size='md'>Medium</Button>
<Button size='lg'>Large</Button>
```

**Loading state** — Async action in progress

```jsx
<Button loading>Saving…</Button>
```

**Form submit** — Submit button inside a form

```jsx
<Button type='submit' variant='primary'>Create account</Button>
```

---

## Card

**Category:** layout
Layout container that groups related content into a visually distinct surface. Provides structure, not behaviour.

### Card Props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | yes | Card content — use CardHeader, CardBody, CardFooter sub-components for structure |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | no | Box shadow level. 'none' for flat/bordered style, 'md'/'lg' for elevated surfaces. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | no | Internal padding applied uniformly. Use 'none' when the card contains a full-bleed image or custom layout. |
| `as` | `ElementType` | `'div'` | no | HTML element or React component to render as the card root. Use 'article' for self-contained content, 'section' for thematic groupings. |
| `className` | `string` | — | no | Additional class names for layout overrides (e.g. width, margin) |

### Card Variants

- **default** — White surface with a subtle shadow — standard use case.
- **flat** — No shadow; relies on border alone. Good for use on gray/subtle backgrounds.
- **raised** — Prominent shadow — draws attention, modal-like weight.

### Card States

- **default** — Static container — no interactive states unless consumer adds them

### Card Sub-components

- **CardHeader** — Top area — title, subtitle, and optional action (e.g. menu or icon button)
- **CardBody** — Main content area — text, images, data, form fields
- **CardFooter** — Bottom area — actions (buttons), metadata, or summary text

### Card Tokens used

- `color.surface.raised`
- `color.surface.default`
- `color.border.default`
- `shadow.none`
- `shadow.sm`
- `shadow.md`
- `shadow.lg`
- `radius.lg`
- `spacing.4`
- `spacing.5`
- `spacing.6`
- `spacing.8`

### Card Accessibility

- **Role:** depends on `as` prop — see usage rules
- **Keyboard:**
  - No inherent keyboard interaction — keyboard behaviour is provided by interactive children
- **ARIA:**
  - If as='article', provide an accessible name via aria-label or aria-labelledby (pointing to the CardHeader heading)
  - If the card is clickable as a whole, use a single <a> or <button> wrapping the content — do not add onClick to the card div
  - Ensure CardHeader contains a heading element (h2–h6) for screen reader navigation

### Card Examples

**Basic card** — Default card with header, body, and footer

```jsx
<Card>
  <CardHeader><h3>Project Alpha</h3></CardHeader>
  <CardBody><p>Last updated 2 hours ago. 3 open tasks remaining.</p></CardBody>
  <CardFooter><Button size='sm'>View project</Button></CardFooter>
</Card>
```

**Flat card** — No shadow, border only — use on subtle backgrounds

```jsx
<Card shadow='none'>
  <CardBody><p>Usage tip: flat cards work well inside a sidebar or on gray-100 backgrounds.</p></CardBody>
</Card>
```

**Raised card** — Elevated surface for high-priority content

```jsx
<Card shadow='lg'>
  <CardHeader><h3>Action required</h3></CardHeader>
  <CardBody><p>Your trial expires in 3 days.</p></CardBody>
  <CardFooter><Button variant='primary'>Upgrade now</Button></CardFooter>
</Card>
```

**Full-bleed content** — Image flush to card edges

```jsx
<Card padding='none'>
  <img src='cover.jpg' alt='Project cover' style={{ borderRadius: 'var(--kern-radius-lg) var(--kern-radius-lg) 0 0', width: '100%' }} />
  <CardBody><p>Project description</p></CardBody>
</Card>
```

---

## Input

**Category:** form
Single-line text entry field. Pairs with a visible label and optional helper text.

### Input Props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | `string` | — | yes | Links the input to its <label>. Must be unique per page. |
| `label` | `string` | — | yes | Visible label text. Always required — do not use placeholder as a substitute. |
| `value` | `string` | `''` | no | Controlled value |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | no | Change handler for controlled usage |
| `placeholder` | `string` | — | no | Hint text shown when empty. Supplementary — not a label replacement. |
| `helperText` | `string` | — | no | Supplementary hint below the field. Hidden when errorMessage is present. |
| `errorMessage` | `string` | — | no | Validation error. When set, input switches to error state and this message replaces helperText. |
| `disabled` | `boolean` | `false` | no | Prevents interaction |
| `required` | `boolean` | `false` | no | Marks field as required; adds aria-required and visual indicator |
| `type` | `string` | `'text'` | no | HTML input type (text, email, password, number, search, url, tel) |
| `autoComplete` | `string` | — | no | HTML autocomplete attribute |

### Input Variants

- **default** — Normal state — border default, subtle background.
- **error** — Validation failed — red border, error message displayed below.

### Input States

- **default** — Resting — muted border, subtle fill
- **focus** — Active — focus ring, border color shifts to focus blue
- **error** — Validation failed — red border, error message visible
- **error-focus** — Error state with focus ring — focus ring uses error color
- **disabled** — Greyed out — interaction prevented, opacity reduced
- **filled** — Has a value — no visual change; placeholder hidden

### Input Tokens used

- `color.surface.subtle`
- `color.surface.default`
- `color.border.default`
- `color.border.focus`
- `color.text.default`
- `color.text.muted`
- `color.text.disabled`
- `color.feedback.error`
- `color.feedback.errorBackground`
- `spacing.2`
- `spacing.3`
- `spacing.4`
- `radius.md`
- `shadow.sm`
- `typography.fontSize.sm`
- `typography.fontSize.md`
- `typography.fontWeight.medium`
- `typography.fontWeight.regular`
- `typography.lineHeight.base`
- `typography.fontFamily.base`

### Input Accessibility

- **Role:** textbox
- **Keyboard:**
  - Tab — moves focus to the input
  - Shift+Tab — moves focus away
- **ARIA:**
  - aria-required='true' when required prop is set
  - aria-invalid='true' when errorMessage is present
  - aria-describedby pointing to helperText or errorMessage element id
  - <label htmlFor={id}> must always be present and visible

### Input Examples

**Basic input** — Controlled input with label and placeholder

```jsx
<Input id='email' label='Email address' placeholder='you@example.com' type='email' />
```

**With helper text** — Supplementary hint below the field

```jsx
<Input id='password' label='Password' type='password' helperText='Must be at least 8 characters' />
```

**Error state** — Validation error replaces helper text

```jsx
<Input id='username' label='Username' value='ab' errorMessage='Username must be at least 3 characters' />
```

**Required field** — Required indicator and aria-required

```jsx
<Input id='name' label='Full name' required />
```

**Disabled** — Non-interactive field

```jsx
<Input id='locked' label='Account ID' value='acc_8f3k2' disabled />
```
