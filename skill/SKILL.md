---
name: kern-design-system
description: Build UIs using the Kern design system — tokens, components, and rules authored once from a single source of truth. Use when generating React components, CSS, or markup that should match Kern visual conventions.
---

# Kern Design System

You are working in a project that uses the **Kern** design system. Tokens, components, and usage rules are generated from one source of truth. Your job: produce UI that uses these tokens and components consistently.

## Tokens-first rule (non-negotiable)

NEVER hardcode colors, spacing, font-sizes, radius, or shadows. Always reference a token.

```jsx
// ✗ bad — hardcoded
<div style={{ padding: 16, background: '#2563eb' }}>...</div>

// ✓ good — CSS vars (in plain CSS / JSX style)
<div style={{ padding: 'var(--kern-spacing-4)', background: 'var(--kern-color-action-primary)' }}>...</div>

// ✓ good — typed tokens (in JS/TS code)
import { tokens } from '@kern-system/design-system/tokens';
<div style={{ padding: tokens.spacing[4], background: tokens.color.action.primary }}>...</div>
```

## Token surface (116 tokens total)

| Category | Count | Reference form | Example value |
|---|---:|---|---|
| Color    | 65  | `color.action.primary` → `var(--kern-color-action-primary)` | `#2563eb` |
| Spacing  | 18 | `spacing.4` → `var(--kern-spacing-4)`                       | `1rem` |
| Typography | 21 | `typography.fontSize.md` → `var(--kern-typography-font-size-md)` | `1rem` |
| Radius   | 6  | `radius.md` → `var(--kern-radius-md)`                       | `0.5rem` |
| Shadow   | 6  | `shadow.md` → `var(--kern-shadow-md)`                       | `0 4px 6px -1px rgba(0, 0, 0, 0.…` |

→ Full catalog: **`references/tokens.md`** (load when picking a specific token)

## Components (3 reference components)

- **Button** (action) — Triggers an action or event. The primary interactive element for user-initiated actions.
- **Card** (layout) — Layout container that groups related content into a visually distinct surface. Provides structure, not behaviour.
- **Input** (form) — Single-line text entry field. Pairs with a visible label and optional helper text.

→ Full props, variants, states, examples: **`references/components.md`**

## Usage rules

Two layers of rules:
1. **Global** — tokens-first, semantic-over-primitive, accessibility defaults
2. **Per-component** — do/don't for each component (e.g. "one primary Button per section")

→ **`references/usage-rules.md`**

## Naming conventions

| Form | Pattern | Example |
|---|---|---|
| CSS custom property | `--kern-{category}-{name}` | `--kern-color-action-primary` |
| TypeScript token    | `tokens.{category}.{name}`  | `tokens.color.action.primary` |
| Component class     | `.kern-{component}`         | `.kern-btn`, `.kern-card` |
| CSS modifier        | `.kern-{component}--{modifier}` | `.kern-btn--primary` |

The `primitive` and `semantic` layers in the source tokens are stripped from public names — you reference `color.action.primary` (not `color.semantic.action.primary`).

## Primitive vs semantic colors

- **Semantic** (`color.action.primary`, `color.text.default`, `color.surface.subtle`) — what you almost always want. They communicate intent and survive theme changes.
- **Primitive** (`color.blue.500`, `color.gray.100`) — raw palette. Use only when no semantic token fits, and prefer adding a new semantic alias instead.

## Decision flowchart

1. **Need a color?** Look at semantic colors first (`action.*`, `text.*`, `surface.*`, `border.*`, `feedback.*`). Fall back to primitives only if necessary.
2. **Need a size/spacing?** Use the `spacing` scale or component `size` prop. Don't invent new dimensions.
3. **Need a UI primitive?** Check the 3 reference components first. If none fits, follow the same token + accessibility conventions when building new ones.
4. **Unsure about a token name?** Load `references/tokens.md`.
5. **Unsure about a component prop?** Load `references/components.md`.

## When to escalate to references

Always read the relevant reference file before:
- Inventing a token name (it probably already exists)
- Adding a new variant or size to a component
- Suggesting an accessibility pattern
- Writing CSS that uses values not in this entrypoint
