# Kern Design System — Context Bundle

> **What this is.** A single flat reference for the Kern design system, designed to be pasted into an LLM prompt. Contains every token, every component spec, and every usage rule — read top to bottom.
>
> **How to use.** Reference tokens by their dotted path (e.g. `color.action.primary`). When generating CSS, use the CSS custom property form (e.g. `var(--kern-color-action-primary)`). When generating React, use the components defined below as-is.

---

## 1. The Tokens-First Rule

Never hardcode colors, spacing, font-sizes, radius, or shadows. Always reference a token.

```jsx
// ✗ bad
<div style={{ padding: 16, background: '#2563eb' }} />

// ✓ good (CSS var)
<div style={{ padding: 'var(--kern-spacing-4)', background: 'var(--kern-color-action-primary)' }} />

// ✓ good (typed tokens)
import { tokens } from '@kern/design-system/tokens';
<div style={{ padding: tokens.spacing[4], background: tokens.color.action.primary }} />
```

## 2. Naming conventions

| Form | Pattern | Example |
|---|---|---|
| CSS custom property | `--kern-{category}-{name}` | `--kern-color-action-primary` |
| TypeScript token    | `tokens.{category}.{name}` | `tokens.color.action.primary` |
| Tailwind utility    | category-derived key | `bg-action-primary`, `p-4` |
| Component class     | `.kern-{component}` | `.kern-btn`, `.kern-card` |

The source token tree has `primitive` and `semantic` layers; both are stripped from public names. Reference `color.action.primary` (not `color.semantic.action.primary`).

---

## 3. Tokens (116 total)

### 3.1 Color — Semantic (prefer these)

| Reference | Resolves to | CSS variable | Description |
|---|---|---|---|
| `color.action.primary` | `#2563eb` *(via `color.blue.600`)* | `--kern-color-action-primary` | Primary action background |
| `color.action.primaryHover` | `#1d4ed8` *(via `color.blue.700`)* | `--kern-color-action-primary-hover` | Primary action background on hover |
| `color.action.primaryForeground` | `#ffffff` *(via `color.white`)* | `--kern-color-action-primary-foreground` | Text/icon on primary action |
| `color.action.secondary` | `#f3f4f6` *(via `color.gray.100`)* | `--kern-color-action-secondary` | Secondary action background |
| `color.action.secondaryHover` | `#e5e7eb` *(via `color.gray.200`)* | `--kern-color-action-secondary-hover` | Secondary action background on hover |
| `color.action.secondaryForeground` | `#1f2937` *(via `color.gray.800`)* | `--kern-color-action-secondary-foreground` | Text/icon on secondary action |
| `color.action.ghost` | `transparent` *(via `color.transparent`)* | `--kern-color-action-ghost` | Ghost action background |
| `color.action.ghostHover` | `#f3f4f6` *(via `color.gray.100`)* | `--kern-color-action-ghost-hover` | Ghost action background on hover |
| `color.action.ghostForeground` | `#374151` *(via `color.gray.700`)* | `--kern-color-action-ghost-foreground` | Text/icon on ghost action |
| `color.text.default` | `#111827` *(via `color.gray.900`)* | `--kern-color-text-default` | Default body text |
| `color.text.muted` | `#6b7280` *(via `color.gray.500`)* | `--kern-color-text-muted` | Muted/secondary text |
| `color.text.disabled` | `#d1d5db` *(via `color.gray.300`)* | `--kern-color-text-disabled` | Disabled text |
| `color.text.onDark` | `#ffffff` *(via `color.white`)* | `--kern-color-text-on-dark` | Text on dark backgrounds |
| `color.text.link` | `#2563eb` *(via `color.blue.600`)* | `--kern-color-text-link` | Link text |
| `color.text.linkHover` | `#1d4ed8` *(via `color.blue.700`)* | `--kern-color-text-link-hover` | Link text on hover |
| `color.surface.default` | `#ffffff` *(via `color.white`)* | `--kern-color-surface-default` | Default page/card background |
| `color.surface.subtle` | `#f9fafb` *(via `color.gray.50`)* | `--kern-color-surface-subtle` | Subtle background (sidebar, inputs) |
| `color.surface.raised` | `#ffffff` *(via `color.white`)* | `--kern-color-surface-raised` | Raised surface (card, modal) |
| `color.surface.overlay` | `#111827` *(via `color.gray.900`)* | `--kern-color-surface-overlay` | Overlay/backdrop background |
| `color.border.default` | `#e5e7eb` *(via `color.gray.200`)* | `--kern-color-border-default` | Default border |
| `color.border.strong` | `#9ca3af` *(via `color.gray.400`)* | `--kern-color-border-strong` | Strong/emphasis border |
| `color.border.focus` | `#0ea5e9` *(via `color.blue.500`)* | `--kern-color-border-focus` | Focus ring color |
| `color.feedback.error` | `#dc2626` *(via `color.red.600`)* | `--kern-color-feedback-error` | Error state text/border |
| `color.feedback.errorBackground` | `#fef2f2` *(via `color.red.50`)* | `--kern-color-feedback-error-background` | Error state background |
| `color.feedback.success` | `#16a34a` *(via `color.green.600`)* | `--kern-color-feedback-success` | Success state text/border |
| `color.feedback.successBackground` | `#f0fdf4` *(via `color.green.50`)* | `--kern-color-feedback-success-background` | Success state background |
| `color.feedback.warning` | `#ca8a04` *(via `color.yellow.600`)* | `--kern-color-feedback-warning` | Warning state text/border |
| `color.feedback.warningBackground` | `#fefce8` *(via `color.yellow.50`)* | `--kern-color-feedback-warning-background` | Warning state background |

### 3.2 Color — Primitive

| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `color.blue.50` | `#eff6ff` | `--kern-color-blue-50` | Blue 50 |
| `color.blue.100` | `#dbeafe` | `--kern-color-blue-100` | Blue 100 |
| `color.blue.200` | `#bfdbfe` | `--kern-color-blue-200` | Blue 200 |
| `color.blue.300` | `#93c5fd` | `--kern-color-blue-300` | Blue 300 |
| `color.blue.400` | `#60a5fa` | `--kern-color-blue-400` | Blue 400 |
| `color.blue.500` | `#0ea5e9` | `--kern-color-blue-500` | Blue 500 |
| `color.blue.600` | `#2563eb` | `--kern-color-blue-600` | Blue 600 |
| `color.blue.700` | `#1d4ed8` | `--kern-color-blue-700` | Blue 700 |
| `color.blue.800` | `#1e40af` | `--kern-color-blue-800` | Blue 800 |
| `color.blue.900` | `#1e3a8a` | `--kern-color-blue-900` | Blue 900 |
| `color.gray.50` | `#f9fafb` | `--kern-color-gray-50` | Gray 50 |
| `color.gray.100` | `#f3f4f6` | `--kern-color-gray-100` | Gray 100 |
| `color.gray.200` | `#e5e7eb` | `--kern-color-gray-200` | Gray 200 |
| `color.gray.300` | `#d1d5db` | `--kern-color-gray-300` | Gray 300 |
| `color.gray.400` | `#9ca3af` | `--kern-color-gray-400` | Gray 400 |
| `color.gray.500` | `#6b7280` | `--kern-color-gray-500` | Gray 500 |
| `color.gray.600` | `#4b5563` | `--kern-color-gray-600` | Gray 600 |
| `color.gray.700` | `#374151` | `--kern-color-gray-700` | Gray 700 |
| `color.gray.800` | `#1f2937` | `--kern-color-gray-800` | Gray 800 |
| `color.gray.900` | `#111827` | `--kern-color-gray-900` | Gray 900 |
| `color.red.50` | `#fef2f2` | `--kern-color-red-50` | Red 50 |
| `color.red.100` | `#fee2e2` | `--kern-color-red-100` | Red 100 |
| `color.red.500` | `#ef4444` | `--kern-color-red-500` | Red 500 |
| `color.red.600` | `#dc2626` | `--kern-color-red-600` | Red 600 |
| `color.red.700` | `#b91c1c` | `--kern-color-red-700` | Red 700 |
| `color.green.50` | `#f0fdf4` | `--kern-color-green-50` | Green 50 |
| `color.green.100` | `#dcfce7` | `--kern-color-green-100` | Green 100 |
| `color.green.500` | `#22c55e` | `--kern-color-green-500` | Green 500 |
| `color.green.600` | `#16a34a` | `--kern-color-green-600` | Green 600 |
| `color.green.700` | `#15803d` | `--kern-color-green-700` | Green 700 |
| `color.yellow.50` | `#fefce8` | `--kern-color-yellow-50` | Yellow 50 |
| `color.yellow.100` | `#fef9c3` | `--kern-color-yellow-100` | Yellow 100 |
| `color.yellow.500` | `#eab308` | `--kern-color-yellow-500` | Yellow 500 |
| `color.yellow.600` | `#ca8a04` | `--kern-color-yellow-600` | Yellow 600 |
| `color.white` | `#ffffff` | `--kern-color-white` | White |
| `color.black` | `#000000` | `--kern-color-black` | Black |
| `color.transparent` | `transparent` | `--kern-color-transparent` | Transparent |

### 3.3 Spacing

| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `spacing.0` | `0rem` | `--kern-spacing-0` | 0px |
| `spacing.1` | `0.25rem` | `--kern-spacing-1` | 4px |
| `spacing.2` | `0.5rem` | `--kern-spacing-2` | 8px |
| `spacing.3` | `0.75rem` | `--kern-spacing-3` | 12px |
| `spacing.4` | `1rem` | `--kern-spacing-4` | 16px |
| `spacing.5` | `1.25rem` | `--kern-spacing-5` | 20px |
| `spacing.6` | `1.5rem` | `--kern-spacing-6` | 24px |
| `spacing.7` | `1.75rem` | `--kern-spacing-7` | 28px |
| `spacing.8` | `2rem` | `--kern-spacing-8` | 32px |
| `spacing.10` | `2.5rem` | `--kern-spacing-10` | 40px |
| `spacing.12` | `3rem` | `--kern-spacing-12` | 48px |
| `spacing.16` | `4rem` | `--kern-spacing-16` | 64px |
| `spacing.20` | `5rem` | `--kern-spacing-20` | 80px |
| `spacing.24` | `6rem` | `--kern-spacing-24` | 96px |
| `spacing.0-5` | `0.125rem` | `--kern-spacing-0-5` | 2px |
| `spacing.1-5` | `0.375rem` | `--kern-spacing-1-5` | 6px |
| `spacing.2-5` | `0.625rem` | `--kern-spacing-2-5` | 10px |
| `spacing.3-5` | `0.875rem` | `--kern-spacing-3-5` | 14px |

### 3.4 Typography

#### Font family
| Reference | Value | CSS variable |
|---|---|---|
| `typography.fontFamily.base` | `Inter, system-ui, -apple-system, sans-serif` | `--kern-typography-font-family-base` |
| `typography.fontFamily.mono` | `JetBrains Mono, Menlo, Consolas, monospace` | `--kern-typography-font-family-mono` |

#### Font size
| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `typography.fontSize.xs` | `0.75rem` | `--kern-typography-font-size-xs` | 12px — captions, labels |
| `typography.fontSize.sm` | `0.875rem` | `--kern-typography-font-size-sm` | 14px — secondary text, small buttons |
| `typography.fontSize.md` | `1rem` | `--kern-typography-font-size-md` | 16px — base body text |
| `typography.fontSize.lg` | `1.125rem` | `--kern-typography-font-size-lg` | 18px — lead text, large buttons |
| `typography.fontSize.xl` | `1.25rem` | `--kern-typography-font-size-xl` | 20px — subheadings |
| `typography.fontSize.2xl` | `1.5rem` | `--kern-typography-font-size-2xl` | 24px — section headings |
| `typography.fontSize.3xl` | `1.875rem` | `--kern-typography-font-size-3xl` | 30px — page headings |
| `typography.fontSize.4xl` | `2.25rem` | `--kern-typography-font-size-4xl` | 36px — hero headings |

#### Font weight
| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `typography.fontWeight.regular` | `400` | `--kern-typography-font-weight-regular` | Normal weight |
| `typography.fontWeight.medium` | `500` | `--kern-typography-font-weight-medium` | Medium weight — emphasis |
| `typography.fontWeight.semibold` | `600` | `--kern-typography-font-weight-semibold` | Semibold — headings, labels |
| `typography.fontWeight.bold` | `700` | `--kern-typography-font-weight-bold` | Bold — strong emphasis |

#### Line height
| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `typography.lineHeight.tight` | `1.25` | `--kern-typography-line-height-tight` | Tight — headings |
| `typography.lineHeight.base` | `1.5` | `--kern-typography-line-height-base` | Base — body text |
| `typography.lineHeight.relaxed` | `1.75` | `--kern-typography-line-height-relaxed` | Relaxed — long-form content |

#### Letter spacing
| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `typography.letterSpacing.tight` | `-0.025em` | `--kern-typography-letter-spacing-tight` | Tight tracking — large headings |
| `typography.letterSpacing.normal` | `0em` | `--kern-typography-letter-spacing-normal` | Normal tracking |
| `typography.letterSpacing.wide` | `0.025em` | `--kern-typography-letter-spacing-wide` | Wide tracking — small caps, labels |
| `typography.letterSpacing.wider` | `0.05em` | `--kern-typography-letter-spacing-wider` | Wider tracking — uppercase labels |

### 3.5 Radius

| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `radius.none` | `0rem` | `--kern-radius-none` | No rounding |
| `radius.sm` | `0.25rem` | `--kern-radius-sm` | 4px — subtle rounding (inputs, small badges) |
| `radius.md` | `0.5rem` | `--kern-radius-md` | 8px — default rounding (buttons, cards) |
| `radius.lg` | `0.75rem` | `--kern-radius-lg` | 12px — prominent rounding (modals, large cards) |
| `radius.xl` | `1rem` | `--kern-radius-xl` | 16px — extra prominent |
| `radius.full` | `9999px` | `--kern-radius-full` | Pill / fully rounded (tags, avatars) |

### 3.6 Shadow

| Reference | Value | CSS variable | Description |
|---|---|---|---|
| `shadow.none` | `none` | `--kern-shadow-none` | No shadow |
| `shadow.sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | `--kern-shadow-sm` | Subtle shadow — inputs, small cards |
| `shadow.md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, …` | `--kern-shadow-md` | Default shadow — cards, dropdowns |
| `shadow.lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0…` | `--kern-shadow-lg` | Prominent shadow — modals, popovers |
| `shadow.xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, …` | `--kern-shadow-xl` | Large shadow — overlays |
| `shadow.inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)` | `--kern-shadow-inner` | Inset shadow — pressed states, inset inputs |

---

## 4. Components (3 reference components)

### Button (action)

Triggers an action or event. The primary interactive element for user-initiated actions.

**Props**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `ReactNode` | — | yes | Button label or icon+label content |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | no | Visual style. primary = filled, secondary = outlined/muted fill, ghost = transparent |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | no | Physical size affecting padding and font-size |
| `disabled` | `boolean` | `false` | no | Prevents interaction and signals unavailability |
| `loading` | `boolean` | `false` | no | Shows a spinner and prevents interaction while an async action runs |
| `fullWidth` | `boolean` | `false` | no | Stretches the button to fill its container width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | no | HTML button type. Use 'submit' inside forms |
| `onClick` | `(e: MouseEvent) => void` | — | no | Click handler |

**Variants:** `primary`, `secondary`, `ghost`
**States:** `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`

**Tokens used:** `color.action.primary`, `color.action.primaryHover`, `color.action.primaryForeground`, `color.action.secondary`, `color.action.secondaryHover`, `color.action.secondaryForeground`, `color.action.ghost`, `color.action.ghostHover`, `color.action.ghostForeground`, `color.border.focus`, `color.text.disabled`, `spacing.2`, `spacing.3`, `spacing.4`, `spacing.5`, `spacing.6`, `radius.md`, `typography.fontSize.sm`, `typography.fontSize.md`, `typography.fontWeight.semibold`, `typography.lineHeight.tight`, `typography.fontFamily.base`

**Accessibility:** role=`button` · keyboard=[Enter] [Space]
- aria-disabled='true' when disabled (keep focusable so screen readers announce it)
- aria-busy='true' + aria-label update when loading
- No aria-role needed — native <button> has implicit button role

**Examples**

*Primary variants* — All three variants at default size
```jsx
<Button variant='primary'>Save changes</Button>
<Button variant='secondary'>Cancel</Button>
<Button variant='ghost'>Delete</Button>
```

*Size scale* — sm / md / lg at primary variant
```jsx
<Button size='sm'>Small</Button>
<Button size='md'>Medium</Button>
<Button size='lg'>Large</Button>
```

*Loading state* — Async action in progress
```jsx
<Button loading>Saving…</Button>
```

*Form submit* — Submit button inside a form
```jsx
<Button type='submit' variant='primary'>Create account</Button>
```

### Card (layout)

Layout container that groups related content into a visually distinct surface. Provides structure, not behaviour.

**Props**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `ReactNode` | — | yes | Card content — use CardHeader, CardBody, CardFooter sub-components for structure |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | no | Box shadow level. 'none' for flat/bordered style, 'md'/'lg' for elevated surfaces. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | no | Internal padding applied uniformly. Use 'none' when the card contains a full-bleed image or custom layout. |
| `as` | `ElementType` | `'div'` | no | HTML element or React component to render as the card root. Use 'article' for self-contained content, 'section' for thematic groupings. |
| `className` | `string` | — | no | Additional class names for layout overrides (e.g. width, margin) |

**Variants:** `default`, `flat`, `raised`
**States:** `default`
**Sub-components:** `CardHeader`, `CardBody`, `CardFooter`

**Tokens used:** `color.surface.raised`, `color.surface.default`, `color.border.default`, `shadow.none`, `shadow.sm`, `shadow.md`, `shadow.lg`, `radius.lg`, `spacing.4`, `spacing.5`, `spacing.6`, `spacing.8`

**Accessibility:** role=`depends on `as` prop — see usage rules` · keyboard=[No inherent keyboard interaction]
- If as='article', provide an accessible name via aria-label or aria-labelledby (pointing to the CardHeader heading)
- If the card is clickable as a whole, use a single <a> or <button> wrapping the content — do not add onClick to the card div
- Ensure CardHeader contains a heading element (h2–h6) for screen reader navigation

**Examples**

*Basic card* — Default card with header, body, and footer
```jsx
<Card>
  <CardHeader><h3>Project Alpha</h3></CardHeader>
  <CardBody><p>Last updated 2 hours ago. 3 open tasks remaining.</p></CardBody>
  <CardFooter><Button size='sm'>View project</Button></CardFooter>
</Card>
```

*Flat card* — No shadow, border only — use on subtle backgrounds
```jsx
<Card shadow='none'>
  <CardBody><p>Usage tip: flat cards work well inside a sidebar or on gray-100 backgrounds.</p></CardBody>
</Card>
```

*Raised card* — Elevated surface for high-priority content
```jsx
<Card shadow='lg'>
  <CardHeader><h3>Action required</h3></CardHeader>
  <CardBody><p>Your trial expires in 3 days.</p></CardBody>
  <CardFooter><Button variant='primary'>Upgrade now</Button></CardFooter>
</Card>
```

*Full-bleed content* — Image flush to card edges
```jsx
<Card padding='none'>
  <img src='cover.jpg' alt='Project cover' style={{ borderRadius: 'var(--kern-radius-lg) var(--kern-radius-lg) 0 0', width: '100%' }} />
  <CardBody><p>Project description</p></CardBody>
</Card>
```

### Input (form)

Single-line text entry field. Pairs with a visible label and optional helper text.

**Props**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
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

**Variants:** `default`, `error`
**States:** `default`, `focus`, `error`, `error-focus`, `disabled`, `filled`

**Tokens used:** `color.surface.subtle`, `color.surface.default`, `color.border.default`, `color.border.focus`, `color.text.default`, `color.text.muted`, `color.text.disabled`, `color.feedback.error`, `color.feedback.errorBackground`, `spacing.2`, `spacing.3`, `spacing.4`, `radius.md`, `shadow.sm`, `typography.fontSize.sm`, `typography.fontSize.md`, `typography.fontWeight.medium`, `typography.fontWeight.regular`, `typography.lineHeight.base`, `typography.fontFamily.base`

**Accessibility:** role=`textbox` · keyboard=[Tab] [Shift+Tab]
- aria-required='true' when required prop is set
- aria-invalid='true' when errorMessage is present
- aria-describedby pointing to helperText or errorMessage element id
- <label htmlFor={id}> must always be present and visible

**Examples**

*Basic input* — Controlled input with label and placeholder
```jsx
<Input id='email' label='Email address' placeholder='you@example.com' type='email' />
```

*With helper text* — Supplementary hint below the field
```jsx
<Input id='password' label='Password' type='password' helperText='Must be at least 8 characters' />
```

*Error state* — Validation error replaces helper text
```jsx
<Input id='username' label='Username' value='ab' errorMessage='Username must be at least 3 characters' />
```

*Required field* — Required indicator and aria-required
```jsx
<Input id='name' label='Full name' required />
```

*Disabled* — Non-interactive field
```jsx
<Input id='locked' label='Account ID' value='acc_8f3k2' disabled />
```

---

## 5. Usage rules

### 5.1 Global principles

1. **Tokens-first.** Never hardcode colors, spacing, font-sizes, radius, or shadows.
2. **Semantic over primitive.** Reach for `color.action.primary` before `color.blue.600`.
3. **One source of truth.** Edit `tokens/` and `specs/` only. Everything else is generated.
4. **Composition over invention.** Combine existing components and tokens before designing new variants.
5. **Accessibility is not optional.** Keyboard-operable, focus-visible, screen-reader-friendly. Color alone never communicates state.
6. **Predictable spacing rhythm.** Stick to the spacing scale.
7. **Hierarchy through scale.** Use font-size and spacing to establish hierarchy before reaching for bold or color emphasis.

### 5.2 Composition patterns

- **Card + Button:** Put primary actions inside `CardFooter`, never floating in `CardBody`.
- **Input + Form:** Always pair Input with a visible `<label>`. Use `errorMessage` after submit, not before user interaction.
- **Button groups:** Pair one primary Button with one secondary/ghost. Never two primaries side-by-side.

### 5.3 Per-component do/don't

#### Button

**Do**
- Use one primary Button per section — it signals the single most important action.
- Label with a verb that describes the outcome: 'Save changes', 'Create project', 'Delete account'.
- Use loading state for async operations lasting more than 300ms.
- Use type='submit' when the button submits a form.
- Pair a primary button with a secondary or ghost for a cancel/back option.

**Don't**
- Don't use a Button for navigation — use a link (<a>) instead.
- Don't stack multiple primary Buttons in the same view.
- Don't use disabled to hide unavailable actions — consider explaining why it's unavailable.
- Don't truncate button labels — if space is tight, shorten the copy, not the element.
- Don't use the ghost variant for the most critical action in a section.

#### Card

**Do**
- Use Card to group a coherent set of related information — a product, a person, a task.
- Use CardHeader / CardBody / CardFooter to establish clear information hierarchy within the card.
- Choose the semantic element carefully: use as='article' for self-contained content, as='section' for labelled groupings, as='li' inside a list of cards.
- Use shadow='none' with an explicit border when cards appear on a non-white background.
- Keep Cards focused — if a card's content covers two unrelated topics, split into two cards.

**Don't**
- Don't nest Cards inside Cards — it creates visual ambiguity about hierarchy.
- Don't put interactive elements like links or buttons directly on the card root — put them inside CardFooter or inline in CardBody.
- Don't use Card as a generic wrapper for every UI region — use semantic HTML (section, aside, main) without a card surface when elevation isn't needed.
- Don't use large shadow='lg' cards on light backgrounds for non-critical content — it creates false urgency.
- Don't use padding='none' without providing your own spacing — content touching card edges looks broken.

#### Input

**Do**
- Always provide a visible label — use the label prop, not placeholder alone.
- Use helperText to set user expectations before they interact (e.g. 'Must be 8+ characters').
- Use errorMessage after validation, not before — don't show errors before the user has had a chance to fill in the field.
- Use type='email', type='password', etc. for correct mobile keyboard and browser auto-fill.
- Mark required fields with required prop and communicate requirements in the label or helperText.

**Don't**
- Don't use placeholder as a label — it disappears on input and fails contrast requirements.
- Don't show an error before the field has been interacted with.
- Don't rely on color alone to communicate error state — the error message text is essential.
- Don't disable a field to prevent editing when readonly is more appropriate.
- Don't use for multi-line text — use a <textarea> instead.

---

## 6. Quick lookup: CSS custom properties

Drop `build/css/variables.css` into any page (no build step needed) to get every token below as a CSS custom property under `:root`. Reference with `var(--kern-…)`.

```
--kern-color-blue-50                             #eff6ff
--kern-color-blue-100                            #dbeafe
--kern-color-blue-200                            #bfdbfe
--kern-color-blue-300                            #93c5fd
--kern-color-blue-400                            #60a5fa
--kern-color-blue-500                            #0ea5e9
--kern-color-blue-600                            #2563eb
--kern-color-blue-700                            #1d4ed8
--kern-color-blue-800                            #1e40af
--kern-color-blue-900                            #1e3a8a
--kern-color-gray-50                             #f9fafb
--kern-color-gray-100                            #f3f4f6
--kern-color-gray-200                            #e5e7eb
--kern-color-gray-300                            #d1d5db
--kern-color-gray-400                            #9ca3af
--kern-color-gray-500                            #6b7280
--kern-color-gray-600                            #4b5563
--kern-color-gray-700                            #374151
--kern-color-gray-800                            #1f2937
--kern-color-gray-900                            #111827
--kern-color-red-50                              #fef2f2
--kern-color-red-100                             #fee2e2
--kern-color-red-500                             #ef4444
--kern-color-red-600                             #dc2626
--kern-color-red-700                             #b91c1c
--kern-color-green-50                            #f0fdf4
--kern-color-green-100                           #dcfce7
--kern-color-green-500                           #22c55e
--kern-color-green-600                           #16a34a
--kern-color-green-700                           #15803d
--kern-color-yellow-50                           #fefce8
--kern-color-yellow-100                          #fef9c3
--kern-color-yellow-500                          #eab308
--kern-color-yellow-600                          #ca8a04
--kern-color-white                               #ffffff
--kern-color-black                               #000000
--kern-color-transparent                         transparent
--kern-color-action-primary                      #2563eb
--kern-color-action-primary-hover                #1d4ed8
--kern-color-action-primary-foreground           #ffffff
--kern-color-action-secondary                    #f3f4f6
--kern-color-action-secondary-hover              #e5e7eb
--kern-color-action-secondary-foreground         #1f2937
--kern-color-action-ghost                        transparent
--kern-color-action-ghost-hover                  #f3f4f6
--kern-color-action-ghost-foreground             #374151
--kern-color-text-default                        #111827
--kern-color-text-muted                          #6b7280
--kern-color-text-disabled                       #d1d5db
--kern-color-text-on-dark                        #ffffff
--kern-color-text-link                           #2563eb
--kern-color-text-link-hover                     #1d4ed8
--kern-color-surface-default                     #ffffff
--kern-color-surface-subtle                      #f9fafb
--kern-color-surface-raised                      #ffffff
--kern-color-surface-overlay                     #111827
--kern-color-border-default                      #e5e7eb
--kern-color-border-strong                       #9ca3af
--kern-color-border-focus                        #0ea5e9
--kern-color-feedback-error                      #dc2626
--kern-color-feedback-error-background           #fef2f2
--kern-color-feedback-success                    #16a34a
--kern-color-feedback-success-background         #f0fdf4
--kern-color-feedback-warning                    #ca8a04
--kern-color-feedback-warning-background         #fefce8
--kern-radius-none                               0rem
--kern-radius-sm                                 0.25rem
--kern-radius-md                                 0.5rem
--kern-radius-lg                                 0.75rem
--kern-radius-xl                                 1rem
--kern-radius-full                               9999px
--kern-shadow-none                               none
--kern-shadow-sm                                 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--kern-shadow-md                                 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, …
--kern-shadow-lg                                 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0…
--kern-shadow-xl                                 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, …
--kern-shadow-inner                              inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)
--kern-spacing-0                                 0rem
--kern-spacing-1                                 0.25rem
--kern-spacing-2                                 0.5rem
--kern-spacing-3                                 0.75rem
--kern-spacing-4                                 1rem
--kern-spacing-5                                 1.25rem
--kern-spacing-6                                 1.5rem
--kern-spacing-7                                 1.75rem
--kern-spacing-8                                 2rem
--kern-spacing-10                                2.5rem
--kern-spacing-12                                3rem
--kern-spacing-16                                4rem
--kern-spacing-20                                5rem
--kern-spacing-24                                6rem
--kern-spacing-0-5                               0.125rem
--kern-spacing-1-5                               0.375rem
--kern-spacing-2-5                               0.625rem
--kern-spacing-3-5                               0.875rem
--kern-typography-font-family-base               Inter, system-ui, -apple-system, sans-serif
--kern-typography-font-family-mono               JetBrains Mono, Menlo, Consolas, monospace
--kern-typography-font-size-xs                   0.75rem
--kern-typography-font-size-sm                   0.875rem
--kern-typography-font-size-md                   1rem
--kern-typography-font-size-lg                   1.125rem
--kern-typography-font-size-xl                   1.25rem
--kern-typography-font-size-2xl                  1.5rem
--kern-typography-font-size-3xl                  1.875rem
--kern-typography-font-size-4xl                  2.25rem
--kern-typography-font-weight-regular            400
--kern-typography-font-weight-medium             500
--kern-typography-font-weight-semibold           600
--kern-typography-font-weight-bold               700
--kern-typography-line-height-tight              1.25
--kern-typography-line-height-base               1.5
--kern-typography-line-height-relaxed            1.75
--kern-typography-letter-spacing-tight           -0.025em
--kern-typography-letter-spacing-normal          0em
--kern-typography-letter-spacing-wide            0.025em
--kern-typography-letter-spacing-wider           0.05em
```

---

## 7. Example: putting it all together

```jsx
import { Card, CardHeader, CardBody, CardFooter, Button, Input } from '@kern/design-system';

export function SignupCard() {
  return (
    <Card shadow="md">
      <CardHeader>
        <h2 style={{ margin: 0, fontSize: 'var(--kern-typography-font-size-xl)' }}>
          Create your account
        </h2>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kern-spacing-4)' }}>
          <Input id="email" label="Email address" type="email" required />
          <Input id="password" label="Password" type="password" helperText="Min. 8 characters" required />
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" type="submit">Create account</Button>
        <Button variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  );
}
```

This example demonstrates every system rule: tokens-first styling, components from the catalog, do/don't compliance (one primary button, ghost for cancel, labels on inputs, primary action in CardFooter).
