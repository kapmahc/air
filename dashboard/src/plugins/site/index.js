import Home from './Home'
import Dashboard from './Dashboard'

export default {
  dashboard (user) {
    var items = []
    if (user && user.admin) {
      items.push({
        label: 'site.profile.title',
        icon: 'cogs',
        items: [
          {href: 'site.admin.status'},
          {href: 'site.admin.info'},
          {href: 'site.admin.author'},
          {href: 'site.admin.seo'},
          {href: 'site.admin.smtp'},
          {href: 'site.admin.paypal'},
          {href: 'site.admin.users.index'},
          {href: 'site.admin.locales.index'},
          {href: 'site.admin.posts.index'},
          {href: 'site.admin.notices.index'},
          {href: 'site.admin.links.index'},
          {href: 'site.admin.cards.index'},
          {href: 'site.admin.leave-words.index'},
          {href: 'site.admin.friend-links.index'}
        ]
      })
    }
    return items
  },
  routes: [
    {path: '/', name: 'site.home', component: Home},
    {path: '/dashboard', name: 'site.dashboard', component: Dashboard}
  ]
}
