import Vue from 'vue'

import I18n from 'vue-i18n'
Vue.use(I18n)

import {get} from './ajax'

const LOCALE = 'locale'

export const LANGUAGES = ['en-US', 'zh-Hans', 'zh-Hant']

export const i18n = new I18n({})

export function detect () {
  return localStorage.getItem(LOCALE) || 'en-US'
}

export function load (locale) {
  get(`/locales/${locale}`)
    .then((message) => {
      i18n.setLocaleMessage(locale, message)
      i18n.locale = locale
      document.title = i18n.t('site.title')
      localStorage.setItem(LOCALE, locale)
    }).catch((err) => console.error(err))
}
