import {TOKEN} from './constants'

export const fail = (that, err) => {
  that.$vux.toast.show({type: 'warn', text: err, width: '100%'})
  console.error(err)
}
export const success = (that, msg) => that.$vux.toast.show({type: 'success', text: msg || that.$t('messages.success'), width: '100%'})

export const api = (path) => {
  return `${process.env.API_HOST}${path}`
}

export const destroy = (that, path, success) => that.$vux.confirm.show({
  title: that.$t('messages.are-your-sure'),
  onConfirm () {
    _delete(path).then(rst => success(rst)).catch((err) => fail(that, err))
  }
})
// ---------------------------------

const parse = (res) => {
  // res.status === 200 || res.status === 0
  return res.ok ? res.json() : res.text().then(err => { throw err })
}

export const options = (method) => {
  return {
    method: method,
    mode: 'cors',
    credentials: true,
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
  data.body = JSON.stringify(body)
  // https://github.github.io/fetch/#options
  return fetch(api(path), data).then(parse)
}
