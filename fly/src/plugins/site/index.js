import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
import NewLeaveWord from './leave-words/New'

export default {
  dashboard (user) {
    var items = []
    if (user && user.admin) {
      items.push({
        label: 'site.dashboard.title',
        icon: 'settings',
        items: [
          {href: 'site.admin.status'},
          null,
          {href: 'site.admin.info'}
        ]
      })
    }
    return items
  },
  routes: [
    { path: '/', name: 'site.home', component: Home },
    { path: '/dashboard', name: 'site.dashboard', component: Dashboard },
    { path: '/leave-words/new', name: 'site.leave-words.new', component: NewLeaveWord },
    { path: '/install', name: 'site.install', component: Install },

    { path: '/admin/site/info', name: 'site.admin.info', component: Install },
    { path: '/admin/site/status', name: 'site.admin.status', component: Install }
  ]
}
