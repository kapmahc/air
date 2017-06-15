import Vue from 'vue'
import I18n from 'vue-i18n'
Vue.use(I18n)

import zhHansIview from 'iview/src/locale/lang/zh-CN'
import zhHantIview from 'iview/src/locale/lang/zh-TW'
import enUSIview from 'iview/src/locale/lang/en-US'

import {get} from './ajax'

const KEY = 'locale'

export const i18n = new I18n({})

export function detect () {
  return localStorage.getItem(KEY) || 'en-US'
}

function bind (message, locale) {
  switch (locale) {
    case 'zh-Hans':
      return Object.assign({}, message, zhHansIview)
    case 'zh-Hant':
      return Object.assign({}, message, zhHantIview)
    default:
      return Object.assign({}, message, enUSIview)
  }
}

export function load (locale) {
  get(`/locales/${locale}`)
    .then((message) => {
      i18n.setLocaleMessage(locale, bind(message.iview, locale))
      i18n.locale = locale
      localStorage.setItem(KEY, locale)
    }).catch(console.error)
}
