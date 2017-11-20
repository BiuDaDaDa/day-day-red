import { Toast } from 'mint-ui'
export default function (value) {
  let re = /^1[34578][0-9]{9}$/g
  if (!re.test(value)) {
    Toast({
      message: '手机格式不正确',
      position: 'middle',
      iconClass: 'iconfont icon-guanbi1',
      duration: 5000
    })
    return false
  }
}
