import path from "path"
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
      include: ['src/', 'src/vite-env.d.ts'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
        '/api/qserver': {
            target: 'http://localhost:60610', 
            changeOrigin: true, 
            rewrite: (path) => path.replace(/^\/api\/qserver/, ''), // Remove "/api/qserver" from the path
        },
        '/api/qserver/console': {
        target: 'ws://localhost:8000/queue_server',
        ws: true, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/qserver\/console/, ''), // Remove "/api/qserver/console" from the path
      },
      '/api/camera': {
        target: 'ws://localhost:8000/pvcamera',
        ws: true, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/camera/, ''), // Remove "/api/camera" from the path
      },
    },
},
  build: {
    lib: {
      //entry: resolve('src', 'components/index.ts'),
      entry: resolve('src', 'index.ts'),
      name: 'Finch',
      formats: ['es', 'umd'],
      fileName: (format) => `finch.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))