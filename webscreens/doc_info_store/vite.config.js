import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [viteSingleFile()],
  build: {
    outDir: '../dist',
    assetsInlineLimit: Infinity, // Inline all assets
    cssCodeSplit: false,
    rollUpOptions: {
	output:{
	  inlineDynamicImports: true,
	  manualChunks: undefined	
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
