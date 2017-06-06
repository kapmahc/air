import site from './site'
import auth from './auth'

const plugins = {
  auth,
  site
}

export default {
  dashboard (user) {
    return Object.keys(plugins).reduce((a, k) => {
      return a.concat(plugins[k].dashboard(user))
    }, [])
  },
  routes: Object.keys(plugins).reduce((a, k) => {
    return a.concat(plugins[k].routes)
  }, [])
}
