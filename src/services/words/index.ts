const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

const toCapitalized = (name: string) => {
  const words = name.match(/[A-Za-z][a-z]*/gu) || []

  return words.map(capitalize).join(' ')
}

export const words = {
  capitalize,
  toCapitalized,
}
