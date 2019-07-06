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
    name: 'editorconfig',
    templatePath: 'templates/editorconfig.hbs',
    filePath: '.editorconfig',
  })

  setGenerator(plop)({
    name: 'browserslist',
    templatePath: 'templates/browserslistrc.hbs',
    filePath: '.browserslistrc',
  })

  setGenerator(plop)({
    name: 'eslintrc',
    templatePath: 'templates/eslintrc.hbs',
    filePath: '.eslintrc.js',
  })

  setGenerator(plop)({
    name: 'prettier',
    templatePath: 'templates/prettierrc.hbs',
    filePath: '.prettierrc',
  })

  setGenerator(plop)({
    name: 'stylelint',
    templatePath: 'templates/stylelintrc.hbs',
    filePath: '.stylelintrc',
  })
}
