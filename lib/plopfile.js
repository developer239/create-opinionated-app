// eslint-disable-next-line
const path = require('path')

const projectFolderPrompt = {
  type: 'input',
  name: 'projectFolder',
}

const setGenerator = plop => ({ name, templatePath, filePath }) => {
  plop.setGenerator(name, {
    description: `Create ${name}`,
    prompts: [projectFolderPrompt],
    actions: [
      {
        type: 'add',
        path: path.join(process.cwd(), '{{ projectFolder }}', filePath),
        templateFile: templatePath,
      },
    ],
  })
}

module.exports = plop => {
  setGenerator(plop)({
    name: '.editorconfig',
    templatePath: 'templates/editorconfig.hbs',
    filePath: '.editorconfig',
  })

  setGenerator(plop)({
    name: '.browserslistrc',
    templatePath: 'templates/browserslistrc.hbs',
    filePath: '.browserslistrc',
  })

  setGenerator(plop)({
    name: '.eslintrc.js',
    templatePath: 'templates/eslintrc.hbs',
    filePath: '.eslintrc.js',
  })

  setGenerator(plop)({
    name: '.prettierrc',
    templatePath: 'templates/prettierrc.hbs',
    filePath: '.prettierrc',
  })

  setGenerator(plop)({
    name: '.stylelintrc',
    templatePath: 'templates/stylelintrc.hbs',
    filePath: '.stylelintrc',
  })

  setGenerator(plop)({
    name: 'commitlint.config.js',
    templatePath: 'templates/commitlint.hbs',
    filePath: 'commitlint.config.js',
  })

  setGenerator(plop)({
    name: 'commitlint.config.js',
    templatePath: 'templates/commitlint.hbs',
    filePath: 'commitlint.config.js',
  })

  setGenerator(plop)({
    name: '.huskyrc',
    templatePath: 'templates/huskyrc.hbs',
    filePath: '.huskyrc',
  })

  setGenerator(plop)({
    name: '.lintstagedrc',
    templatePath: 'templates/lintstagedrc.hbs',
    filePath: '.lintstagedrc',
  })

  setGenerator(plop)({
    name: '.env',
    templatePath: 'templates/env.hbs',
    filePath: '.env',
  })

  setGenerator(plop)({
    name: 'README.md',
    templatePath: 'templates/readme.hbs',
    filePath: 'README.md',
  })

  plop.setGenerator('src', {
    description: `create basic source files`,
    prompts: [projectFolderPrompt],
    actions: [
      // Layout Component
      {
        type: 'add',
        templateFile: 'templates/src/components/Layout/index.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'components', 'Layout', 'index.ts'),
      },

      // Home Page and /tests
      {
        type: 'add',
        templateFile: 'templates/src/pages/Home/index.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'pages', 'Home', 'index.tsx'),
      },
      {
        type: 'add',
        templateFile: 'templates/src/pages/Home/test/Home.test.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'pages', 'Home', 'test', 'Home.test.tsx'),
      },

      // Not Found Page and /tests
      {
        type: 'add',
        templateFile: 'templates/src/pages/NotFound/index.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'pages', 'NotFound', 'index.tsx'),
      },
      {
        type: 'add',
        templateFile: 'templates/src/pages/NotFound/test/NotFound.test.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'pages', 'NotFound', 'test', 'NotFound.test.tsx'),
      },

      // Test Utilities
      {
        type: 'add',
        templateFile: 'templates/src/testUtils/render.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'testUtils', 'render.tsx'),
      },

      // App File
      {
        type: 'add',
        templateFile: 'templates/src/App.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'App.tsx'),
      },

      // Main Entry File
      {
        type: 'add',
        templateFile: 'templates/src/index.tsx.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'index.tsx'),
      },

      // d.ts Env File
      {
        type: 'add',
        templateFile: 'templates/src/react-app-env.d.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'react-app-env.d.ts'),
      },
    ],
  })
}
