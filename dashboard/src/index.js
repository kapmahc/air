import './main.css'

import main from './main'
import detectLocale from './locales'
import {get} from './ajax'

const user = detectLocale()

get(`/locales/${user.locale}`)
  .then((messages) => {
    user.messages = {...messages}
    main(user)
  })
  .catch(alert)
