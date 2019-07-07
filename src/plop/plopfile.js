// eslint-disable-next-line
const path = require('path')

const setGenerator = plop => ({ name, templatePath, filePath }) => {
  plop.setGenerator(name, {
    description: `Create ${name}`,
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
    templatePath: 'templates/eslintrc.js.hbs',
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
    templatePath: 'templates/commitlint.config.js.hbs',
    filePath: 'commitlint.config.js',
  })

  setGenerator(plop)({
    name: 'commitlint.config.js',
    templatePath: 'templates/commitlint.config.js.hbs',
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
    templatePath: 'templates/README.md.hbs',
    filePath: 'README.md',
  })

  setGenerator(plop)({
    name: 'heroku',
    templatePath: 'templates/Procfile.hbs',
    filePath: 'Procfile',
  })

  setGenerator(plop)({
    name: 'circleci',
    templatePath: 'templates/circleci/config.yml.hbs',
    filePath: '.circleci/config.yml',
  })

  plop.setGenerator('docker', {
    description: `create basic docker files`,
    actions: [
      {
        type: 'add',
        templateFile: 'templates/docker-compose.yml.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'docker-compose.yml'),
      },
      {
        type: 'add',
        templateFile: 'templates/Dockerfile.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'Dockerfile'),
      },
    ],
  })

  plop.setGenerator('router', {
    description: `create basic router files`,
    actions: [
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
    ],
  })

  plop.setGenerator('apollo', {
    description: `create basic react apollo files`,
    actions: [
      {
        type: 'add',
        templateFile: 'templates/src/apolloClient.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'apolloClient.ts'),
      },
    ],
  })

  plop.setGenerator('redux', {
    description: `create basic redux files`,
    actions: [
      {
        type: 'add',
        templateFile: 'templates/src/store/index.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'store', 'index.ts'),
      },
      {
        type: 'add',
        templateFile: 'templates/src/store/reducer.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'store', 'reducer.ts'),
      },
    ],
  })

  plop.setGenerator('src', {
    description: `create basic source files`,
    actions: [
      // Layout Component
      {
        type: 'add',
        templateFile: 'templates/src/components/Layout/index.ts.hbs',
        path: path.join(process.cwd(), '{{ projectFolder }}', 'src', 'components', 'Layout', 'index.ts'),
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
