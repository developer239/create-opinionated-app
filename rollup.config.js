import progress from 'rollup-plugin-progress'
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

const defaults = { compilerOptions: { declaration: true } }
const override = { compilerOptions: { declaration: false } }

export default {
  input: './src/index.ts',

  output: {
    file: 'lib/index.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },

  plugins: [
    progress(),
    typescript({
      tsconfigDefaults: defaults,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: override,
      objectHashIgnoreUnknownHack: true,
    }),
    copy({
      targets: [
        { src: 'src/packages/*', dest: 'lib/generators' }
      ],
    })
  ],
}
