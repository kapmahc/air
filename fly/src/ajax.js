import {TOKEN} from './constants'

export const api = (path) => {
  return `${process.env.API_HOST}${path}`
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

/* for jquery */

// import $ from 'jquery'
//
// $.ajaxSetup({
//   beforeSend: function (xhr) {
//     xhr.setRequestHeader('Authorization', `BEARER ${window.sessionStorage.getItem(TOKEN)}`)
//   }
// })

// export const fail = (e) => alert(e.responseText || e.statusText)

// export const get = (path, success, fail) => {
//   if (!fail) {
//     fail = _fail
//   }
//   $.get(api(path), success).fail(fail)
// }

// export const _delete = (path, success, fail) => {
//   if (!fail) {
//     fail = _fail
//   }
//   $.ajax({
//     url: api(path),
//     type: 'DELETE',
//     success
//   }).fail(fail)
// }

// export const post = (path, body, success, fail) => {
//   if (!fail) {
//     fail = _fail
//   }
//   $.post(api(path), body, success).fail(fail)
// }
