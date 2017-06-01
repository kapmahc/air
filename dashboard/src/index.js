import i18next from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

import './main.css'
import main from './main'
import {LOCALE} from './constants'
import {api} from './ajax'

i18next
  .use(LngDetector)
  .use(XHR)
  .init({
      debug: process.env.NODE_ENV !== 'production',
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
        lookupQuerystring: LOCALE,
        lookupCookie: LOCALE,
        lookupLocalStorage: LOCALE,
        caches: ['localStorage', 'cookie'],
      },
      backend: {
        crossDomain: true,
        withCredentials: true,
        loadPath: api('/locales/{{lng}}')
      }
    },
    (err, t) => {
      main();
    });
