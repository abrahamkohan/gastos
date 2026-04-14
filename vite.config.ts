import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// @ts-ignore
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo' || process.env.DEMO === 'true';
  const isVercel = process.env.VERCEL === '1' || process.env.CI === 'true';

  // Modo demo o Vercel: build como app
  if (isDemo || isVercel) {
    return {
      plugins: [react()],
      root: '.',
      build: {
        outDir: 'dist',
        sourcemap: true,
      },
    };
  }

  // Library build config (para npm publish)
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
