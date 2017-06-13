

export function detect () {
  return
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
