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
}
