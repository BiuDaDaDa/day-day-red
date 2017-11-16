import axios from 'axios'
export default function (Vue) {
  Vue.prototype.$request = function (options) {
    let headers = options.headers || {}
    let params = options.params || {}
    axios[options.type](options.url, {
      headers,
      params
    }).then(options.success.bind(this))
      .catch(options.failed.bind(this))
  }
}
