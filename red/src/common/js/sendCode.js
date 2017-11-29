import { Toast } from 'mint-ui'
export default function (res, event) {
  let msg = res
  if (msg === '该手机号已被注册！' || msg === '短信发送失败，请稍后再试！') {
    Toast({
      message: `${msg}`,
      position: 'middle',
      iconClass: 'iconfont icon-guanbi1',
      duration: 5000
    })
  } else {
    let num = 60
    let timer = setInterval(function () {
      num--
      event.target.innerHTML = num + '秒后重新获取'
      event.target.style.color = '#ccc'
      event.target.disabled = 'disabled'
      if (num === 0) {
        event.target.disabled = ''
        event.target.style.color = '#FF6E61'
        event.target.innerHTML = '发送验证码'
        clearInterval(timer)
      }
    }, 1000)
  }
}
