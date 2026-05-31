#!/usr/bin/env node
// Build the LLM context bundle: a single flat markdown file you paste into a
// prompt to give the model the full Kern design system in one shot.
//
// Unlike the Skill (progressive disclosure), this is optimised for density:
// no cross-file pointers, every fact inline, ordered for read-once consumption.
//
// Inputs:  tokens/*.json, specs/*.spec.json
// Output:  llm-context/context-bundle.md

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadAll, groupByCategory, splitColorTokens, toCssVar } from './_sources.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'llm-context');

const t0 = performance.now();
console.log('[kern] building context bundle…');

await mkdir(OUT, { recursive: true });

const { tokens, specs } = await loadAll();
const grouped = groupByCategory(tokens);

await writeFile(path.join(OUT, 'context-bundle.md'), renderBundle({ grouped, specs, tokens }));

const t1 = performance.now();
console.log(`[kern] context bundle built in ${Math.round(t1 - t0)}ms`);
console.log('[kern]   → llm-context/context-bundle.md');

// ─────────────────────────────────────────────────────────────────────

function renderBundle({ grouped, specs, tokens }) {
  return `# Kern Design System — Context Bundle

> **What this is.** A single flat reference for the Kern design system, designed to be pasted into an LLM prompt. Contains every token, every component spec, and every usage rule — read top to bottom.
>
> **How to use.** Reference tokens by their dotted path (e.g. \`color.action.primary\`). When generating CSS, use the CSS custom property form (e.g. \`var(--kern-color-action-primary)\`). When generating React, use the components defined below as-is.

---

## 1. The Tokens-First Rule

Never hardcode colors, spacing, font-sizes, radius, or shadows. Always reference a token.

\`\`\`jsx
// ✗ bad
<div style={{ padding: 16, background: '#2563eb' }} />

// ✓ good (CSS var)
<div style={{ padding: 'var(--kern-spacing-4)', background: 'var(--kern-color-action-primary)' }} />

// ✓ good (typed tokens)
import { tokens } from '@kern-system/design-system/tokens';
<div style={{ padding: tokens.spacing[4], background: tokens.color.action.primary }} />
\`\`\`

## 2. Naming conventions

| Form | Pattern | Example |
|---|---|---|
| CSS custom property | \`--kern-{category}-{name}\` | \`--kern-color-action-primary\` |
| TypeScript token    | \`tokens.{category}.{name}\` | \`tokens.color.action.primary\` |
| Tailwind utility    | category-derived key | \`bg-action-primary\`, \`p-4\` |
| Component class     | \`.kern-{component}\` | \`.kern-btn\`, \`.kern-card\` |

The source token tree has \`primitive\` and \`semantic\` layers; both are stripped from public names. Reference \`color.action.primary\` (not \`color.semantic.action.primary\`).

---

## 3. Tokens (${tokens.length} total)

### 3.1 Color — Semantic (prefer these)

${renderTokenTable((grouped.color ?? []).filter((t) => t.path.includes('semantic')), {
  showAlias: true,
})}

### 3.2 Color — Primitive

${renderTokenTable((grouped.color ?? []).filter((t) => !t.path.includes('semantic')), {
  showAlias: false,
})}

### 3.3 Spacing

${renderTokenTable(grouped.spacing ?? [], { showAlias: false })}

### 3.4 Typography

#### Font family
${renderTokenTable((grouped.typography ?? []).filter((t) => t.path[1] === 'fontFamily'), { showAlias: false, slim: true })}

#### Font size
${renderTokenTable((grouped.typography ?? []).filter((t) => t.path[1] === 'fontSize'), { showAlias: false })}

#### Font weight
${renderTokenTable((grouped.typography ?? []).filter((t) => t.path[1] === 'fontWeight'), { showAlias: false })}

#### Line height
${renderTokenTable((grouped.typography ?? []).filter((t) => t.path[1] === 'lineHeight'), { showAlias: false })}

#### Letter spacing
${renderTokenTable((grouped.typography ?? []).filter((t) => t.path[1] === 'letterSpacing'), { showAlias: false })}

### 3.5 Radius

${renderTokenTable(grouped.radius ?? [], { showAlias: false })}

### 3.6 Shadow

${renderTokenTable(grouped.shadow ?? [], { showAlias: false })}

---

## 4. Components (${specs.length} reference components)

${specs.map(renderSpecSection).join('\n\n')}

---

## 5. Usage rules

### 5.1 Global principles

1. **Tokens-first.** Never hardcode colors, spacing, font-sizes, radius, or shadows.
2. **Semantic over primitive.** Reach for \`color.action.primary\` before \`color.blue.600\`.
3. **One source of truth.** Edit \`tokens/\` and \`specs/\` only. Everything else is generated.
4. **Composition over invention.** Combine existing components and tokens before designing new variants.
5. **Accessibility is not optional.** Keyboard-operable, focus-visible, screen-reader-friendly. Color alone never communicates state.
6. **Predictable spacing rhythm.** Stick to the spacing scale.
7. **Hierarchy through scale.** Use font-size and spacing to establish hierarchy before reaching for bold or color emphasis.

### 5.2 Composition patterns

- **Card + Button:** Put primary actions inside \`CardFooter\`, never floating in \`CardBody\`.
- **Input + Form:** Always pair Input with a visible \`<label>\`. Use \`errorMessage\` after submit, not before user interaction.
- **Button groups:** Pair one primary Button with one secondary/ghost. Never two primaries side-by-side.

### 5.3 Per-component do/don't

${specs.map(renderRules).join('\n\n')}

---

## 6. Quick lookup: CSS custom properties

Drop \`build/css/variables.css\` into any page (no build step needed) to get every token below as a CSS custom property under \`:root\`. Reference with \`var(--kern-…)\`.

\`\`\`
${tokens.map((t) => `${toCssVar(t.displayPath).padEnd(48)} ${formatValue(t.value)}`).join('\n')}
\`\`\`

---

## 7. Example: putting it all together

\`\`\`jsx
import { Card, CardHeader, CardBody, CardFooter, Button, Input } from '@kern-system/design-system';

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
\`\`\`

This example demonstrates every system rule: tokens-first styling, components from the catalog, do/don't compliance (one primary button, ghost for cancel, labels on inputs, primary action in CardFooter).
`;
}

// ───────────────────────────── helpers ──────────────────────────────

function renderTokenTable(items, { showAlias, slim }) {
  if (items.length === 0) return '_(none)_';
  if (slim) {
    return [
      '| Reference | Value | CSS variable |',
      '|---|---|---|',
      ...items.map(
        (t) =>
          `| \`${t.displayPath}\` | \`${formatValue(t.value)}\` | \`${toCssVar(t.displayPath)}\` |`,
      ),
    ].join('\n');
  }
  if (showAlias) {
    return [
      '| Reference | Resolves to | CSS variable | Description |',
      '|---|---|---|---|',
      ...items.map((t) => {
        const alias = t.aliasOf ? ` *(via \`${t.aliasOf}\`)*` : '';
        return `| \`${t.displayPath}\` | \`${formatValue(t.value)}\`${alias} | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`;
      }),
    ].join('\n');
  }
  return [
    '| Reference | Value | CSS variable | Description |',
    '|---|---|---|---|',
    ...items.map(
      (t) =>
        `| \`${t.displayPath}\` | \`${formatValue(t.value)}\` | \`${toCssVar(t.displayPath)}\` | ${t.description || '—'} |`,
    ),
  ].join('\n');
}

function formatValue(v) {
  if (v == null) return '—';
  const s = String(v);
  return s.length > 64 ? s.slice(0, 61) + '…' : s;
}

function renderSpecSection(spec) {
  return `### ${spec.name} (${spec.category})

${spec.description}

**Props**

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
${spec.props
  .map(
    (p) =>
      `| \`${p.name}\` | \`${escapePipes(p.type)}\` | ${p.default == null ? '—' : `\`${escapePipes(p.default)}\``} | ${p.required ? 'yes' : 'no'} | ${p.description} |`,
  )
  .join('\n')}

**Variants:** ${spec.variants.map((v) => `\`${v.name}\``).join(', ')}
**States:** ${spec.states.map((s) => `\`${s.name}\``).join(', ')}
${spec.subComponents ? `**Sub-components:** ${spec.subComponents.map((s) => `\`${s.name}\``).join(', ')}\n` : ''}
**Tokens used:** ${spec.tokensUsed.map((t) => `\`${stripLayersInPath(t)}\``).join(', ')}

**Accessibility:** role=\`${spec.accessibility.role}\` · keyboard=${spec.accessibility.keyboard.map((k) => `[${k.split(' — ')[0].split(' - ')[0]}]`).join(' ')}
${spec.accessibility.aria.map((a) => `- ${a}`).join('\n')}

**Examples**

${spec.examples.map((ex) => `*${ex.label}* — ${ex.description}\n\`\`\`jsx\n${ex.code}\n\`\`\``).join('\n\n')}`;
}

function renderRules(spec) {
  return `#### ${spec.name}

**Do**
${spec.usageRules.do.map((d) => `- ${d}`).join('\n')}

**Don't**
${spec.usageRules.dont.map((d) => `- ${d}`).join('\n')}`;
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
