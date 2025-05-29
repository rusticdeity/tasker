import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [react(),viteSingleFile()],
  build: {
    outDir: '../dist',
    assetsInlineLimit: Infinity, // Inline all assets
    cssCodeSplit: false,
    rollupOptions: {
	input: 'src/index.html',
	output:{
	  inlineDynamicImports: true,
	  manualChunks: undefined,
	}    
    }
  },
  server: {
    port: 8080
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
})
