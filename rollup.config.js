import progress from 'rollup-plugin-progress'
import typescript from 'rollup-plugin-typescript2'

const defaults = { compilerOptions: { declaration: true } }
const override = { compilerOptions: { declaration: false } }

export default {
  input: './src/index.ts',

  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },

  plugins: [
    progress(),
    typescript({
      tsconfigDefaults: defaults,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: override
    })
  ]
}
