export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.substring(1)


export const capitalizeAll = (name: string) => {
  const words = name.match(/[A-Za-z][a-z]*/gu) ?? []

  return words.map(capitalize).join(' ')
}

export const toAlphaNumeric = (name: string) =>
  name.replace(/\W/gu, '')
