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
  // dashboard: Object.keys(engines).map((k, i) => {
  //   return engines[k].dashboard
  // }, []),
  // navLinks: Object.keys(engines).reduce((a, k) => {
  //   return a.concat(engines[k].navLinks)
  // }, []),
  routes: Object.keys(plugins).reduce((p, k) => {
    return p.concat(plugins[k].routes)
  }, [])
};
