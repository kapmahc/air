import registerServiceWorker from './registerServiceWorker'
import detectLocale from './intl'
import { get } from './ajax'
import main from './main'

const user = detectLocale()

get(`/intl/antd/${user.locale}`)
  .then((messages) => {
    user.messages = {...messages}
    main('root', user)
    registerServiceWorker()
  })
  .catch(console.error)
