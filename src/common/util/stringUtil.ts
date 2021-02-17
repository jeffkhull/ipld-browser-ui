export function getUniqueStrings(input: string[]) {
  const wordSet = input.reduce(function (prev: any, current) {
    prev[current] = true
    return prev
  }, {})
  return Object.keys(wordSet)
}
