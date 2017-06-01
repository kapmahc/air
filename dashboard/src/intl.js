import {LOCALE} from './constants'

import enUS from 'antd/lib/locale-provider/en_US'
import zhTW from 'antd/lib/locale-provider/zh_TW'

import 'moment/locale/zh-cn'
import 'moment/locale/zh-tw'

export default () => {
  switch (localStorage.getItem(LOCALE)) {
    case 'zh-Hans':
      return {
        moment: 'zh-cn',
        antd: null
      }
    case 'zh-Hant':
      return {
        moment: 'zh-tw',
        antd: zhTW
      }
    default:
      return {
        moment: 'en',
        antd: enUS
      }
  }
}
