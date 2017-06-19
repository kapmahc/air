import auth from './auth'
import site from './site'
import forms from './forms'

const routes = [].concat(auth).concat(forms).concat(site)

export default routes
