import registerServiceWorker from './registerServiceWorker'
import {detectLocale} from './intl'
import { get } from './ajax'
import main from './main'

const user = detectLocale()

get(`/intl/antd/${user.locale}`)
  .then((rst) => {
    user.messages = {...rst}
    main('root', user)
    registerServiceWorker()
  })
  .catch(console.error)
