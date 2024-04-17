// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs' // Output format is CommonJS
  },
  plugins: [
    nodeResolve() // Resolve modules in node_modules
  ]
};