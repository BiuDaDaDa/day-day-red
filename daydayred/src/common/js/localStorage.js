const STORAGR_KEY = 'datas'
export function fetch () {
  return JSON.parse(window.localStorage.getItem(STORAGR_KEY) || '[]')
}
export function save (items) {
  window.localStorage.setItem(STORAGR_KEY, JSON.stringify(items))
}
