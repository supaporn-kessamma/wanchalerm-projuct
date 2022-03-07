export const isMatchLength = (value, length) => {
  return String(value).length === length
}
export const isNumber = (value) => {
  return !Number.isNaN(+value)
}
