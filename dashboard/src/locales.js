import dataEn from 'react-intl/locale-data/en'
import dataZh from 'react-intl/locale-data/zh'

import {LOCALE} from './constants'

const enUS = {
  data: dataEn,
  locale: 'en-US'
}

const zhHans = {
  data: dataZh,
  locale: 'zh-Hans'
}

export default () => {
  switch (localStorage.getItem(LOCALE)) {
    case 'zh-Hans':
      return zhHans
    default:
    return enUS
  }
}
