// key:键值,value:值 day:时间(以天为单位)
// 设置cookie
// cookie设置工具
export function setJsCookie (key, value, day) {
  var date = new Date()
  date.setTime(date.getTime() + day * 24 + 3600 + 1000)
  document.cookie = key + '=' + value + ';expires=' + date.toUTCString()
}
// 获取cookie
// 根据key:键
export function getJsCookie (key) {
  var arr = document.cookie.split('; ')
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i]
    var theArr = str.split('=')
    if (theArr[0] === key) {
      return theArr[1]
    }
  }
  return null
}
// 删除cookie时间 key:键
export function removeJsCookie (key) {
  var data = new Date()
  data.setTime(data.getTime() - 1)
  // 这个cookie已经不需要再设置什么value随意
  document.cookie = key + '=xxx;expires=' + data.toUTCString()
}
