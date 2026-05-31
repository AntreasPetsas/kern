#!/usr/bin/env node
// Build pipeline: tokens/*.json (DTCG) → build/css, build/ts, build/tailwind
// Run: npm run build:tokens

import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.mjs';
import { performance } from 'node:perf_hooks';

const t0 = performance.now();

console.log('[kern] building tokens…');
console.log('[kern]   source : tokens/**/*.json (DTCG)');
console.log('[kern]   targets: build/css, build/ts, build/tailwind');

const sd = new StyleDictionary(config);
await sd.hasInitialized;
await sd.buildAllPlatforms();

const t1 = performance.now();
console.log(`[kern] tokens built in ${Math.round(t1 - t0)}ms`);
console.log('[kern]   → build/css/variables.css');
console.log('[kern]   → build/ts/tokens.ts');
console.log('[kern]   → build/tailwind/preset.js');
