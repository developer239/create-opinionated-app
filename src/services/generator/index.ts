import ora from 'ora'
import Handlebars from 'handlebars'
import { saveTemplate } from 'services/template'

interface IOptions {
  name: string
  templateFiles: Array<{
    name: string
    data: string
    destination: string[]
    context?: Object
  }>
}

export const generate = async ({
  name,
  templateFiles
}: IOptions) => {
  const spinner = ora()

  spinner.start(`[generator] running ${name}`)

  try {
    for(const templateFile of templateFiles) {
      const compileTemplate = Handlebars.compile(templateFile.data)
      // eslint-disable-next-line no-await-in-loop
      await saveTemplate(templateFile.destination, compileTemplate(templateFile.context))
    }

    spinner.succeed(`[generator] create ${name}`)
  } catch(error) {
    spinner.warn(`[generator] ${name} error: ${error}`)
  }
}
