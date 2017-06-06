import auth from './auth'
import site from './site'
// import reading from './reading'
// import forum from './forum'

const plugins = {
  auth,
  // forum,
  // reading
  site
}

export default {  
  dashboard(user) {
    return Object.keys(plugins).reduce((a, k) => {
      return a.concat(plugins[k].dashboard(user))
    }, [])
  },
  routes: Object.keys(plugins).reduce((p, k) => {
    return p.concat(plugins[k].routes)
  }, [])
};
