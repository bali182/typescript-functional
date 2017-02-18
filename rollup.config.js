import typescript from 'rollup-plugin-typescript'

const targets = ['iife', 'umd', 'amd', 'cjs', 'es',]

export default {
  moduleName: 'tsf',
  entry: 'index.ts',
  targets: ['iife', 'umd', 'amd', 'cjs', 'es'].map(format => ({
    moduleName: 'tsf',
    entry: 'index.js',
    dest: `./dist/tsf-${format}.js`,
    format,
  })),
  plugins: [typescript()],
}
