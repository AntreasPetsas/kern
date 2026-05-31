import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [
    starlight({
      title: 'Kern',
      description: 'Tokens, components, and rules authored once, consumed everywhere.',
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'Tokens',
          items: [{ label: 'Token Reference', link: '/tokens/' }],
        },
        {
          label: 'Components',
          items: [
            { label: 'Button', link: '/components/button/' },
            { label: 'Input', link: '/components/input/' },
            { label: 'Card', link: '/components/card/' },
          ],
        },
        { label: 'Usage Rules', link: '/usage-rules/' },
      ],
      customCss: ['../build/css/variables.css'],
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        '@kern/components': path.resolve(__dirname, '../components'),
        '@kern/tokens': path.resolve(__dirname, '../build/ts/tokens.ts'),
      },
    },
  },
});
