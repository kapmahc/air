import Home from './Home'
import Dashboard from './Dashboard'

export default {
  routes: [
    {path: '/', name: 'site.home', component: Home},
    {path: '/dashboard', name: 'site.dashboard', component: Dashboard}
  ]
}
