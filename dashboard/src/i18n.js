import Vue from 'vue'

import I18n from 'vue-i18n'
Vue.use(I18n)

import enElement from 'element-ui/lib/locale/lang/en'
import zhCNElement from 'element-ui/lib/locale/lang/zh-CN'
import zhTWElement from 'element-ui/lib/locale/lang/zh-TW'

import {get} from './ajax'

const LOCALE = 'locale'

export const i18n = new I18n({})

export function detect () {
  return localStorage.getItem(LOCALE) || 'en-US'
}

function bind (message, locale) {
  switch (locale) {
    case 'zh-Hans':
      return Object.assign(message, zhCNElement)
    case 'zh-Hant':
      return Object.assign(message, zhTWElement)
    default:
      return Object.assign(message, enElement)
  }
}

export function load (locale) {
  get(`/locales/${locale}`)
    .then((message) => {
      i18n.setLocaleMessage(locale, bind(message, locale))
      i18n.locale = locale
      document.title = i18n.t('site.title')
      localStorage.setItem(LOCALE, locale)
    }).catch((err) => console.error(err))
}
