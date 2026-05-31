#!/usr/bin/env node
// Build the LLM Skill: progressive-disclosure structure where SKILL.md is a
// thin entrypoint and references/ holds detailed catalogs loaded on demand.
//
// Inputs:  tokens/*.json, specs/*.spec.json
// Outputs: skill/SKILL.md, skill/references/{tokens,components,usage-rules}.md

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadAll, groupByCategory, splitColorTokens, toCssVar } from './_sources.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'skill');
const REFS = path.join(OUT, 'references');

const t0 = performance.now();
console.log('[kern] building skill…');

await mkdir(REFS, { recursive: true });

const { tokens, specs } = await loadAll();
const grouped = groupByCategory(tokens);

await writeFile(path.join(OUT, 'SKILL.md'), renderSkillEntry({ grouped, specs }));
await writeFile(path.join(REFS, 'tokens.md'), renderTokensRef({ grouped }));
await writeFile(path.join(REFS, 'components.md'), renderComponentsRef({ specs }));
await writeFile(path.join(REFS, 'usage-rules.md'), renderUsageRulesRef({ specs }));

const t1 = performance.now();
console.log(`[kern] skill built in ${Math.round(t1 - t0)}ms`);
console.log('[kern]   → skill/SKILL.md');
console.log('[kern]   → skill/references/tokens.md');
console.log('[kern]   → skill/references/components.md');
console.log('[kern]   → skill/references/usage-rules.md');

// ───────────────────────────── SKILL.md ──────────────────────────────

function renderSkillEntry({ grouped, specs }) {
  const colorCount = (grouped.color ?? []).length;
  const spacingCount = (grouped.spacing ?? []).length;
  const typographyCount = (grouped.typography ?? []).length;
  const radiusCount = (grouped.radius ?? []).length;
  const shadowCount = (grouped.shadow ?? []).length;

  const examples = pickExamples(grouped);

  return `---
name: kern-design-system
description: Build UIs using the Kern design system — tokens, components, and rules authored once from a single source of truth. Use when generating React components, CSS, or markup that should match Kern visual conventions.
---

# Kern Design System

You are working in a project that uses the **Kern** design system. Tokens, components, and usage rules are generated from one source of truth. Your job: produce UI that uses these tokens and components consistently.

## Tokens-first rule (non-negotiable)

NEVER hardcode colors, spacing, font-sizes, radius, or shadows. Always reference a token.

\`\`\`jsx
// ✗ bad — hardcoded
<div style={{ padding: 16, background: '#2563eb' }}>...</div>

// ✓ good — CSS vars (in plain CSS / JSX style)
<div style={{ padding: 'var(--kern-spacing-4)', background: 'var(--kern-color-action-primary)' }}>...</div>

// ✓ good — typed tokens (in JS/TS code)
import { tokens } from '@kern-system/design-system/tokens';
<div style={{ padding: tokens.spacing[4], background: tokens.color.action.primary }}>...</div>
\`\`\`

## Token surface (${colorCount + spacingCount + typographyCount + radiusCount + shadowCount} tokens total)

| Category | Count | Reference form | Example value |
|---|---:|---|---|
| Color    | ${colorCount}  | \`color.action.primary\` → \`var(--kern-color-action-primary)\` | ${examples.color} |
| Spacing  | ${spacingCount} | \`spacing.4\` → \`var(--kern-spacing-4)\`                       | ${examples.spacing} |
| Typography | ${typographyCount} | \`typography.fontSize.md\` → \`var(--kern-typography-font-size-md)\` | ${examples.typography} |
| Radius   | ${radiusCount}  | \`radius.md\` → \`var(--kern-radius-md)\`                       | ${examples.radius} |
| Shadow   | ${shadowCount}  | \`shadow.md\` → \`var(--kern-shadow-md)\`                       | ${examples.shadow} |

→ Full catalog: **\`references/tokens.md\`** (load when picking a specific token)

## Components (${specs.length} reference components)

${specs.map((s) => `- **${s.name}** (${s.category}) — ${s.description}`).join('\n')}

→ Full props, variants, states, examples: **\`references/components.md\`**

## Usage rules

Two layers of rules:
1. **Global** — tokens-first, semantic-over-primitive, accessibility defaults
2. **Per-component** — do/don't for each component (e.g. "one primary Button per section")

→ **\`references/usage-rules.md\`**

## Naming conventions

| Form | Pattern | Example |
|---|---|---|
| CSS custom property | \`--kern-{category}-{name}\` | \`--kern-color-action-primary\` |
| TypeScript token    | \`tokens.{category}.{name}\`  | \`tokens.color.action.primary\` |
| Component class     | \`.kern-{component}\`         | \`.kern-btn\`, \`.kern-card\` |
| CSS modifier        | \`.kern-{component}--{modifier}\` | \`.kern-btn--primary\` |

The \`primitive\` and \`semantic\` layers in the source tokens are stripped from public names — you reference \`color.action.primary\` (not \`color.semantic.action.primary\`).

## Primitive vs semantic colors

- **Semantic** (\`color.action.primary\`, \`color.text.default\`, \`color.surface.subtle\`) — what you almost always want. They communicate intent and survive theme changes.
- **Primitive** (\`color.blue.500\`, \`color.gray.100\`) — raw palette. Use only when no semantic token fits, and prefer adding a new semantic alias instead.

## Decision flowchart

1. **Need a color?** Look at semantic colors first (\`action.*\`, \`text.*\`, \`surface.*\`, \`border.*\`, \`feedback.*\`). Fall back to primitives only if necessary.
2. **Need a size/spacing?** Use the \`spacing\` scale or component \`size\` prop. Don't invent new dimensions.
3. **Need a UI primitive?** Check the 3 reference components first. If none fits, follow the same token + accessibility conventions when building new ones.
4. **Unsure about a token name?** Load \`references/tokens.md\`.
5. **Unsure about a component prop?** Load \`references/components.md\`.

## When to escalate to references

Always read the relevant reference file before:
- Inventing a token name (it probably already exists)
- Adding a new variant or size to a component
- Suggesting an accessibility pattern
- Writing CSS that uses values not in this entrypoint
`;
}

function pickExamples(grouped) {
  const findResolved = (cat, displayPath) =>
    (grouped[cat] ?? []).find((t) => t.displayPath === displayPath);
  return {
    color: fmt(findResolved('color', 'color.action.primary')?.value),
    spacing: fmt(findResolved('spacing', 'spacing.4')?.value),
    typography: fmt(findResolved('typography', 'typography.fontSize.md')?.value),
    radius: fmt(findResolved('radius', 'radius.md')?.value),
    shadow: fmt(truncate(findResolved('shadow', 'shadow.md')?.value, 32)),
  };
}

function fmt(v) {
  return v == null ? '—' : `\`${v}\``;
}
function truncate(s, n) {
  if (!s) return s;
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

// ─────────────────────── references/tokens.md ───────────────────────

function renderTokensRef({ grouped }) {
  const colorTokens = grouped.color ?? [];
  const { primitive, semantic } = splitColorTokens(colorTokens);

  return `# Tokens — Full Catalog

> Generated from \`tokens/*.json\`. Do not edit by hand — edit the source files and run \`npm run build:skill\`.

This is the exhaustive token reference. The reference form is what you type in code; the CSS var name is what's emitted in \`build/css/variables.css\`.

## Color — Semantic (prefer these)

Semantic tokens communicate intent. They resolve to primitive values but provide stable names that survive palette changes.

| Reference | Resolves to | CSS variable | Description |
|---|---|---|---|
${semantic.map(rowSemantic).join('\n')}

## Color — Primitive

Raw palette. Use only when no semantic token fits. Prefer adding a semantic alias.

| Reference | Value | CSS variable | Description |
|---|---|---|---|
${primitive.map(rowPrimitive).join('\n')}

## Spacing

Use these for padding, margin, gap, and any rhythmic spacing. Values are in rem; pixel equivalents are in the description.

| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.spacing ?? []).map(rowGeneric).join('\n')}

## Typography

### Font family
| Reference | Value | CSS variable |
|---|---|---|
${(grouped.typography ?? []).filter((t) => t.path[1] === 'fontFamily').map(rowTypoMini).join('\n')}

### Font size
| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.typography ?? []).filter((t) => t.path[1] === 'fontSize').map(rowGeneric).join('\n')}

### Font weight
| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.typography ?? []).filter((t) => t.path[1] === 'fontWeight').map(rowGeneric).join('\n')}

### Line height
| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.typography ?? []).filter((t) => t.path[1] === 'lineHeight').map(rowGeneric).join('\n')}

### Letter spacing
| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.typography ?? []).filter((t) => t.path[1] === 'letterSpacing').map(rowGeneric).join('\n')}

## Radius

| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.radius ?? []).map(rowGeneric).join('\n')}

## Shadow

| Reference | Value | CSS variable | Description |
|---|---|---|---|
${(grouped.shadow ?? []).map(rowShadow).join('\n')}

## How to use

### In plain CSS
\`\`\`css
.my-card {
  background-color: var(--kern-color-surface-raised);
  padding: var(--kern-spacing-5);
  border-radius: var(--kern-radius-lg);
  box-shadow: var(--kern-shadow-md);
}
\`\`\`

### In React with inline styles
\`\`\`jsx
<div style={{
  background: 'var(--kern-color-surface-raised)',
  padding: 'var(--kern-spacing-5)',
}}>…</div>
\`\`\`

### In React with typed tokens
\`\`\`tsx
import { tokens } from '@kern-system/design-system/tokens';
<div style={{ background: tokens.color.surface.raised, padding: tokens.spacing[5] }}>…</div>
\`\`\`

### With Tailwind preset
\`\`\`jsx
<div className="bg-action-primary p-5 rounded-lg shadow-md">…</div>
\`\`\`
`;
}

function rowSemantic(t) {
  const alias = t.aliasOf ? ` *(via \`${t.aliasOf}\`)*` : '';
  return `| \`${t.displayPath}\` | \`${t.value}\`${alias} | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`;
}
function rowPrimitive(t) {
  return `| \`${t.displayPath}\` | \`${t.value}\` | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`;
}
function rowGeneric(t) {
  return `| \`${t.displayPath}\` | \`${t.value}\` | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`;
}
function rowTypoMini(t) {
  return `| \`${t.displayPath}\` | \`${t.value}\` | \`${toCssVar(t.displayPath)}\` |`;
}
function rowShadow(t) {
  return `| \`${t.displayPath}\` | \`${t.value}\` | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`;
}

// ──────────────────── references/components.md ──────────────────────

function renderComponentsRef({ specs }) {
  return `# Components — Full Reference

> Generated from \`specs/*.spec.json\`. Each component spec drives the React implementation, this reference, and the docs site simultaneously.

${specs.map(renderComponentSection).join('\n\n---\n\n')}
`;
}

function renderComponentSection(spec) {
  return `## ${spec.name}

**Category:** ${spec.category}
${spec.description}

### Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
${spec.props
  .map(
    (p) =>
      `| \`${p.name}\` | \`${escapePipes(p.type)}\` | ${p.default == null ? '—' : `\`${escapePipes(p.default)}\``} | ${p.required ? 'yes' : 'no'} | ${p.description} |`,
  )
  .join('\n')}

### Variants
${spec.variants.map((v) => `- **${v.name}** — ${v.description}`).join('\n')}

### States
${spec.states.map((s) => `- **${s.name}** — ${s.description}`).join('\n')}
${
  spec.subComponents
    ? `\n### Sub-components\n${spec.subComponents.map((s) => `- **${s.name}** — ${s.description}`).join('\n')}\n`
    : ''
}
### Tokens used
${spec.tokensUsed.map((t) => `- \`${stripLayersInPath(t)}\``).join('\n')}

### Accessibility
- **Role:** ${spec.accessibility.role}
- **Keyboard:**
${spec.accessibility.keyboard.map((k) => `  - ${k}`).join('\n')}
- **ARIA:**
${spec.accessibility.aria.map((a) => `  - ${a}`).join('\n')}

### Examples

${spec.examples.map((ex) => `**${ex.label}** — ${ex.description}\n\n\`\`\`jsx\n${ex.code}\n\`\`\``).join('\n\n')}
`;
}

function escapePipes(s) {
  return String(s).replace(/\|/g, '\\|');
}
function stripLayersInPath(p) {
  return p
    .split('.')
    .filter((seg) => seg !== 'primitive' && seg !== 'semantic')
    .join('.');
}

// ──────────────────── references/usage-rules.md ─────────────────────

function renderUsageRulesRef({ specs }) {
  return `# Usage Rules

> Global design principles + per-component do/don't lists.

## Global principles

1. **Tokens-first.** Never hardcode colors, spacing, font-sizes, radius, or shadows. If you find yourself typing a hex code or a px value, stop and find the token.
2. **Semantic over primitive.** Reach for \`color.action.primary\` before \`color.blue.600\`. Semantic tokens communicate intent and survive palette changes.
3. **One source of truth.** \`tokens/\` and \`specs/\` are the only files you ever hand-edit. Everything in \`build/\`, \`skill/\`, and \`llm-context/\` is generated.
4. **Composition over invention.** Combine existing components and tokens before designing new variants. A new variant should solve a generalizable problem, not a one-off layout.
5. **Accessibility is not optional.** Every interactive component must be keyboard-operable, focus-visible, and screen-reader-friendly. Color alone never communicates state.
6. **Predictable spacing rhythm.** Stick to the spacing scale. Custom values create visual noise.
7. **Hierarchy through scale, not weight.** Use font-size and spacing to establish hierarchy before reaching for bold or color emphasis.

## Composition patterns

- **Card + Button:** Put primary actions inside \`CardFooter\`, never floating in \`CardBody\`.
- **Input + Form:** Always pair Input with a visible \`<label>\`. Use \`errorMessage\` after submit, not before user interaction.
- **Button groups:** Pair one primary Button with one secondary/ghost for cancel actions. Never two primaries side-by-side.

## Per-component rules

${specs.map(renderComponentRules).join('\n\n')}
`;
}

function renderComponentRules(spec) {
  return `### ${spec.name}

**Do**
${spec.usageRules.do.map((d) => `- ${d}`).join('\n')}

**Don't**
${spec.usageRules.dont.map((d) => `- ${d}`).join('\n')}`;
}
