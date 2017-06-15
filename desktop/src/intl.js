import enUSAntd from 'antd/lib/locale-provider/en_US'
import zhTWAntd from 'antd/lib/locale-provider/zh_TW'

import 'moment/locale/zh-cn'
import 'moment/locale/zh-tw'

import dataEn from 'react-intl/locale-data/en'
import dataZh from 'react-intl/locale-data/zh'

import {LOCALE} from './constants'

const switchLocale = () => {
  switch (localStorage.getItem(LOCALE)) {
    case 'zh-Hans':
      return {
        locale: 'zh-Hans',
        antd: null,
        data: dataZh,
        moment: 'zh-cn',
        timeago: 'zh_CN',
      }
    case 'zh-Hant':
      return {
        id: 'zh-Hant',
        antd: zhTWAntd,
        data: dataZh,
        moment: 'zh-tw',
        timeago: 'zh_TW',
      }
    default:
      return {
        id: 'en-US',
        antd: enUSAntd,
        data: dataEn,
        moment: 'en',
        timeago: 'en',
      }
  }
}

export default switchLocale
