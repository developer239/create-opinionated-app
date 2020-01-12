import path from 'path'
import Handlebars from 'handlebars'
import { state } from 'state'

// TODO: Make these modules work in ES6
// eslint-disable-next-line
const through = require('through2')
// eslint-disable-next-line
const copy = require('recursive-copy')

export const copyFiles = async (source: string, destination: string, context?: Object) => {
  const options = {
    overwrite: true,
    dot: true,
    rename: (filePath: string) => {
      if (filePath.endsWith('.hbs')) {
        return filePath.replace('.hbs', '')
      }

      return filePath
    },
    transform: (src: string) => {
      if (!src.endsWith('.hbs')) {
        return null
      }

      return through((chunk: Buffer, _: BufferEncoding, done: CallableFunction) => {
        const compileTemplate = Handlebars.compile(chunk.toString())
        done(null, compileTemplate(context))
      })
    },
  }

  const sourcePath = path.join(__dirname, 'generators', source)

  const projectFolder = `${process.cwd()}/${state.projectFolder}`
  const destinationPath = path.join(projectFolder, destination)

  await copy(sourcePath, destinationPath, options)
}
