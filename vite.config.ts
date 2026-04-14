import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// @ts-ignore
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo' || process.env.DEMO === 'true';

  if (isDemo) {
    return {
      plugins: [react()],
      root: './demo',
      build: {
        outDir: '../dist-demo',
      },
    };
  }

  // Library build config
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ['src/**/*'],
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.tsx'),
        name: 'PaymentsModule',
        formats: ['es', 'umd'],
        fileName: (format) => `payments-module.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', '@tanstack/react-query', '@supabase/supabase-js'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      cssCodeSplit: false,
    },
  };
});
