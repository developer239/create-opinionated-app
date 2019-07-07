import fs from 'fs'
import path from 'path'

const validateProjectFolder = (value: string) => {
  const validateName = require('validate-npm-package-name')

  const { errors } = validateName(value)

  if (errors) {
    return 'Invalid name.'
  }

  if (fs.existsSync(path.resolve(value.toLowerCase()))) {
    return 'Project with this name already exists.'
  }

  return true
}

export const validator = {
  validateProjectFolder,
}
