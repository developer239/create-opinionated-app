import path from 'path'
import updateNotifier from 'update-notifier'

export const checkUpdates = () => {
  // eslint-disable-next-line
  const pkg = require(path.join(__dirname, '../../../package.json'))

  updateNotifier({ pkg }).notify()
}
