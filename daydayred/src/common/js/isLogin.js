import {getJsCookie} from './util'
export default function () {
  if (getJsCookie('CP_UserIDGuid') === null) {
    window.localStorage.removeItem('datas')
  }
}
