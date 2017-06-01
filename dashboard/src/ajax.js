import {TOKEN} from './constants'

export const api = (path) => {
  return `${process.env.REACT_APP_BACKEND}${path}`
}
// ---------------------------------

const parse = (res) => {
  // res.status === 200 || res.status === 0
  return res.ok ? res.json() : res.text().then(err => { throw err })
}

const options = (method) => {
  return {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
    }
  }
}

export const get = (path) => {
  return fetch(api(path), options('get')).then(parse)
}

export const _delete = (path) => {
  return fetch(api(path), options('delete')).then(parse)
}

export const post = (path, body) => {
  var data = options('post')
  data.body = body
  // https://github.github.io/fetch/#options
  data.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  return fetch(api(path), data).then(parse)
}
