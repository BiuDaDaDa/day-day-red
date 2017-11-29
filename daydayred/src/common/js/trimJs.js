export default function (str, isglobal) {
  let result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}
