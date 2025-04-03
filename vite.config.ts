import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import * as packageJson from './package.json'
// https://vitejs.dev/config/
export default defineConfig(() => ({
  define: {
    'import.meta.env': process.env
  },
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/components/'],
    }),
  ],
  server: {
    proxy: {
        // Proxy requests starting with "api/qserver" to the bluesky http server
        '/api/qserver': {
            target: 'http://localhost:60610', // Backend server URL
            changeOrigin: true, // Needed for virtual hosted sites
            rewrite: (path) => path.replace(/^\/api\/qserver/, ''), // Remove "/api/qserver" from the path
        },
    },
},
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'BlueskyWeb',
      formats: ['es', 'umd'],
      fileName: (format) => `bluesky-web.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))