export default (regex, extraSymbols) => {
  regex = regex + ''
  if (
    Array.isArray(extraSymbols) &&
    extraSymbols.length > 0
  ) {
    extraSymbols.forEach(e => { regex = '\\' + e + regex })
  }
  return new RegExp('[^' + regex + ']', 'gi')
}
