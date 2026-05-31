# Kern

> The seed at the core. One source of truth — tokens, components, and rules authored once, consumed everywhere.

Kern is a design system built on W3C DTCG design tokens. Edit `tokens/` and `specs/` once — run `npm run build` — and every consumer updates automatically.

## Four ways to consume

### 1. npm package (React + typed tokens)

```bash
npm i @kern/design-system
```

```jsx
import { Button, Input, Card, CardHeader, CardBody, CardFooter } from '@kern/design-system';
import '@kern/design-system/css'; // or link build/css/variables.css in your HTML

<Card shadow="md">
  <CardHeader><h2>Sign up</h2></CardHeader>
  <CardBody>
    <Input id="email" label="Email" type="email" required />
  </CardBody>
  <CardFooter>
    <Button variant="primary" type="submit">Create account</Button>
    <Button variant="ghost">Cancel</Button>
  </CardFooter>
</Card>
```

Typed token constants:

```ts
import { tokens } from '@kern/design-system/tokens';

tokens.color.action.primary   // "#2563eb"
tokens.spacing[4]             // "1rem"
```

### 2. CSS drop-in (zero build step)

Copy `build/css/variables.css` into any project. All 116 tokens available as `--kern-*` CSS custom properties under `:root`.

```html
<link rel="stylesheet" href="variables.css">
```

```css
.my-button {
  background-color: var(--kern-color-action-primary);
  padding: var(--kern-spacing-2) var(--kern-spacing-4);
  border-radius: var(--kern-radius-md);
}
```

### 3. Tailwind preset

```js
// tailwind.config.js
import kernPreset from '@kern/design-system/tailwind';
export default { presets: [kernPreset] };
```

```jsx
<button className="bg-action-primary text-white px-4 py-2 rounded-md hover:bg-action-primary-hover">
  Click me
</button>
```

### 4. LLM Skill (progressive disclosure)

Copy the `skill/` directory into your project's `.claude/skills/` or reference it in your LLM context:

```text
skill/
  SKILL.md              ← load this first (84 lines, all you need for basic use)
  references/
    tokens.md           ← full token catalog with alias chains
    components.md       ← all props, variants, a11y
    usage-rules.md      ← global principles + per-component do/don't
```

The model loads `SKILL.md` first (cheap context cost). References are loaded on demand.

### 5. Context bundle (paste-into-prompt)

Copy `llm-context/context-bundle.md` into any LLM prompt to give the model the full design system in one shot: all tokens, all specs, all rules, plus a complete end-to-end example.

---

## Building from source

```bash
git clone https://github.com/kern-design/design-system
npm install
npm run build
```

Build output:

```text
build/css/variables.css     CSS custom properties (--kern-*)
build/tailwind/preset.js    Tailwind theme extension
build/ts/tokens.ts          Typed token constants
skill/SKILL.md              LLM Skill entrypoint
skill/references/           Progressive disclosure reference files
llm-context/context-bundle.md  Single flat LLM context file
```

Build time: ~80ms.

## Docs site

```bash
npm run docs:dev    # local dev server
npm run docs:build  # static build
```

## Source of truth

| Source | Type | Edit? |
| -------- | ------ | ------- |
| `tokens/*.json` | W3C DTCG token files | ✅ Yes |
| `specs/*.spec.json` | Component specifications | ✅ Yes |
| `components/` | React reference implementations | ✅ Yes |
| `build/` | Generated artifacts | ❌ Never — run `npm run build` |
| `skill/` | Generated LLM Skill files | ❌ Never — run `npm run build:skill` |
| `llm-context/` | Generated context bundle | ❌ Never — run `npm run build:context` |

## Architecture

```text
tokens/*.json ──┐
                ├─► scripts/build-tokens.mjs ──► build/css, build/tailwind, build/ts
specs/*.json ───┤
                ├─► scripts/build-skill.mjs ───► skill/SKILL.md, skill/references/*
                └─► scripts/build-context-bundle.mjs ──► llm-context/context-bundle.md
```

## Versioning

Kern uses [Conventional Commits](https://www.conventionalcommits.org/) and [Changesets](https://github.com/changesets/changesets) for automated versioning.

```bash
npx changeset        # describe your change
npx changeset version # bump versions
npx changeset publish # publish to npm
```

## License

MIT
