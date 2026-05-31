# Tokens — Full Catalog

> Generated from `tokens/*.json`. Do not edit by hand — edit the source files and run `npm run build:skill`.

This is the exhaustive token reference. The reference form is what you type in code; the CSS var name is what's emitted in `build/css/variables.css`.

## Color — Semantic (prefer these)

Semantic tokens communicate intent. They resolve to primitive values but provide stable names that survive palette changes.

| Reference | Resolves to | CSS variable | Description |
| --- | --- | --- | --- |
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

## Color — Primitive

Raw palette. Use only when no semantic token fits. Prefer adding a semantic alias.

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
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

## Spacing

Use these for padding, margin, gap, and any rhythmic spacing. Values are in rem; pixel equivalents are in the description.

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
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

## Typography

### Font family

| Reference | Value | CSS variable |
| --- | --- | --- |
| `typography.fontFamily.base` | `Inter, system-ui, -apple-system, sans-serif` | `--kern-typography-font-family-base` |
| `typography.fontFamily.mono` | `JetBrains Mono, Menlo, Consolas, monospace` | `--kern-typography-font-family-mono` |

### Font size

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `typography.fontSize.xs` | `0.75rem` | `--kern-typography-font-size-xs` | 12px — captions, labels |
| `typography.fontSize.sm` | `0.875rem` | `--kern-typography-font-size-sm` | 14px — secondary text, small buttons |
| `typography.fontSize.md` | `1rem` | `--kern-typography-font-size-md` | 16px — base body text |
| `typography.fontSize.lg` | `1.125rem` | `--kern-typography-font-size-lg` | 18px — lead text, large buttons |
| `typography.fontSize.xl` | `1.25rem` | `--kern-typography-font-size-xl` | 20px — subheadings |
| `typography.fontSize.2xl` | `1.5rem` | `--kern-typography-font-size-2xl` | 24px — section headings |
| `typography.fontSize.3xl` | `1.875rem` | `--kern-typography-font-size-3xl` | 30px — page headings |
| `typography.fontSize.4xl` | `2.25rem` | `--kern-typography-font-size-4xl` | 36px — hero headings |

### Font weight

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `typography.fontWeight.regular` | `400` | `--kern-typography-font-weight-regular` | Normal weight |
| `typography.fontWeight.medium` | `500` | `--kern-typography-font-weight-medium` | Medium weight — emphasis |
| `typography.fontWeight.semibold` | `600` | `--kern-typography-font-weight-semibold` | Semibold — headings, labels |
| `typography.fontWeight.bold` | `700` | `--kern-typography-font-weight-bold` | Bold — strong emphasis |

### Line height

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `typography.lineHeight.tight` | `1.25` | `--kern-typography-line-height-tight` | Tight — headings |
| `typography.lineHeight.base` | `1.5` | `--kern-typography-line-height-base` | Base — body text |
| `typography.lineHeight.relaxed` | `1.75` | `--kern-typography-line-height-relaxed` | Relaxed — long-form content |

### Letter spacing

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `typography.letterSpacing.tight` | `-0.025em` | `--kern-typography-letter-spacing-tight` | Tight tracking — large headings |
| `typography.letterSpacing.normal` | `0em` | `--kern-typography-letter-spacing-normal` | Normal tracking |
| `typography.letterSpacing.wide` | `0.025em` | `--kern-typography-letter-spacing-wide` | Wide tracking — small caps, labels |
| `typography.letterSpacing.wider` | `0.05em` | `--kern-typography-letter-spacing-wider` | Wider tracking — uppercase labels |

## Radius

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `radius.none` | `0rem` | `--kern-radius-none` | No rounding |
| `radius.sm` | `0.25rem` | `--kern-radius-sm` | 4px — subtle rounding (inputs, small badges) |
| `radius.md` | `0.5rem` | `--kern-radius-md` | 8px — default rounding (buttons, cards) |
| `radius.lg` | `0.75rem` | `--kern-radius-lg` | 12px — prominent rounding (modals, large cards) |
| `radius.xl` | `1rem` | `--kern-radius-xl` | 16px — extra prominent |
| `radius.full` | `9999px` | `--kern-radius-full` | Pill / fully rounded (tags, avatars) |

## Shadow

| Reference | Value | CSS variable | Description |
| --- | --- | --- | --- |
| `shadow.none` | `none` | `--kern-shadow-none` | No shadow |
| `shadow.sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | `--kern-shadow-sm` | Subtle shadow — inputs, small cards |
| `shadow.md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | `--kern-shadow-md` | Default shadow — cards, dropdowns |
| `shadow.lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` | `--kern-shadow-lg` | Prominent shadow — modals, popovers |
| `shadow.xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` | `--kern-shadow-xl` | Large shadow — overlays |
| `shadow.inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)` | `--kern-shadow-inner` | Inset shadow — pressed states, inset inputs |

## How to use

### In plain CSS

```css
.my-card {
  background-color: var(--kern-color-surface-raised);
  padding: var(--kern-spacing-5);
  border-radius: var(--kern-radius-lg);
  box-shadow: var(--kern-shadow-md);
}
```

### In React with inline styles

```jsx
<div style={{
  background: 'var(--kern-color-surface-raised)',
  padding: 'var(--kern-spacing-5)',
}}>…</div>
```

### In React with typed tokens

```tsx
import { tokens } from '@kern/design-system/tokens';
<div style={{ background: tokens.color.surface.raised, padding: tokens.spacing[5] }}>…</div>
```

### With Tailwind preset

```jsx
<div className="bg-action-primary p-5 rounded-lg shadow-md">…</div>
```
