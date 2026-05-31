// Shared loader: reads tokens/*.json (DTCG) and specs/*.spec.json,
// resolves aliases, and exposes a flat catalog. Used by build-skill.mjs and
// build-context-bundle.mjs so both generators stay in sync.

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

export async function loadAll() {
  const tokenTree = await loadTokenTree();
  const tokens = flattenTokens(tokenTree);
  const tokensByPath = Object.fromEntries(tokens.map((t) => [t.path.join('.'), t]));
  for (const token of tokens) {
    const { resolved, aliasOf } = resolveValue(token.rawValue, tokenTree);
    token.value = resolved;
    token.aliasOf = aliasOf;
  }
  const specs = await loadSpecs();
  return { tokenTree, tokens, tokensByPath, specs };
}

async function loadTokenTree() {
  const tokensDir = path.join(ROOT, 'tokens');
  const files = (await readdir(tokensDir)).filter((f) => f.endsWith('.json'));
  const tree = {};
  for (const file of files) {
    const raw = await readFile(path.join(tokensDir, file), 'utf8');
    Object.assign(tree, JSON.parse(raw));
  }
  return tree;
}

async function loadSpecs() {
  const specsDir = path.join(ROOT, 'specs');
  const files = (await readdir(specsDir)).filter((f) => f.endsWith('.spec.json'));
  const specs = [];
  for (const file of files) {
    const raw = await readFile(path.join(specsDir, file), 'utf8');
    specs.push(JSON.parse(raw));
  }
  return specs;
}

// Walk DTCG tree, collect tokens. $type is inherited from nearest ancestor.
function flattenTokens(obj, currentPath = [], inheritedType = null) {
  const out = [];
  const localType = obj.$type ?? inheritedType;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (val && typeof val === 'object' && '$value' in val) {
      out.push({
        path: [...currentPath, key],
        displayPath: stripLayers([...currentPath, key]).join('.'),
        rawValue: val.$value,
        type: val.$type ?? localType,
        description: val.$description ?? '',
      });
    } else if (val && typeof val === 'object') {
      out.push(...flattenTokens(val, [...currentPath, key], localType));
    }
  }
  return out;
}

// {color.primitive.blue.500} → resolve to actual hex by walking tree.
function resolveValue(value, tree, seenAlias = null) {
  if (typeof value !== 'string') return { resolved: value, aliasOf: seenAlias };
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return { resolved: value, aliasOf: seenAlias };
  const refPath = match[1].split('.');
  let cursor = tree;
  for (const seg of refPath) {
    cursor = cursor?.[seg];
    if (cursor === undefined) return { resolved: value, aliasOf: seenAlias };
  }
  return resolveValue(cursor.$value, tree, stripLayers(refPath).join('.'));
}

// Strip 'primitive' and 'semantic' from a path — matches the name/kern transform
// so display paths line up with build/ts/tokens.ts and CSS var names.
export function stripLayers(path) {
  return path.filter((p) => p !== 'primitive' && p !== 'semantic');
}

// Convert displayPath (e.g. "color.action.primary") to CSS var name.
export function toCssVar(displayPath) {
  return '--kern-' + displayPath.split('.').map(kebab).join('-');
}

export function kebab(str) {
  return String(str)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Helper: group tokens by their top-level category for table-rendering.
export function groupByCategory(tokens) {
  const groups = {};
  for (const token of tokens) {
    const top = token.path[0];
    (groups[top] ??= []).push(token);
  }
  return groups;
}

// Helper: split color tokens into primitive / semantic groups, since both
// branches exist and consumers prefer semantic.
export function splitColorTokens(colorTokens) {
  const primitive = [];
  const semantic = [];
  for (const t of colorTokens) {
    if (t.path.includes('semantic')) semantic.push(t);
    else if (t.path.includes('primitive')) primitive.push(t);
    else primitive.push(t); // tokens with no layer fall under primitive
  }
  return { primitive, semantic };
}
