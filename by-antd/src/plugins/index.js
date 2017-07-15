import auth from './auth'
import site from './site'
import forms from './forms'
import mall from './mall'

const routes = []
  .concat(auth)
  .concat(mall)
  .concat(forms)
  .concat(site)

export default routes
