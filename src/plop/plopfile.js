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

module.exports = plop => {}
