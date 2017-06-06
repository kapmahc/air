import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
import NewLeaveWord from './leave-words/New'
import AdminSiteInfo from './admin/Info'
import AdminSiteAuthor from './admin/Author'
import AdminSiteSeo from './admin/Seo'
import AdminSiteSmtp from './admin/Smtp'
import AdminSiteStatus from './admin/Status'

export default {
  dashboard (user) {
    var items = []
    if (user && user.admin) {
      items.push({
        label: 'site.dashboard.title',
        icon: 'cogs',
        items: [
          {href: 'site.admin.status'},
          {href: 'site.admin.info'},
          {href: 'site.admin.author'},
          {href: 'site.admin.seo'},
          {href: 'site.admin.smtp'},
          {href: 'site.admin.users.index'},
          {href: 'site.admin.locales.index'},
          {href: 'site.admin.posts.index'},
          {href: 'site.admin.notices.index'},
          {href: 'site.admin.leave-words.index'},
          {href: 'site.admin.links.index'},
          {href: 'site.admin.cards.index'},
          {href: 'site.admin.friend-links.index'}
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

    { path: '/admin/site/info', name: 'site.admin.info', component: AdminSiteInfo },
    { path: '/admin/site/author', name: 'site.admin.author', component: AdminSiteAuthor },
    { path: '/admin/site/seo', name: 'site.admin.seo', component: AdminSiteSeo },
    { path: '/admin/site/smtp', name: 'site.admin.smtp', component: AdminSiteSmtp },
    { path: '/admin/site/status', name: 'site.admin.status', component: AdminSiteStatus }
  ]
}
