import Home from './Home'
import Dashboard from './Dashboard'

import AdminSiteStatus from './admin/site/Status'
import AdminSiteInfo from './admin/site/Info'
import AdminSiteAuthor from './admin/site/Author'
import AdminSiteSeo from './admin/site/Seo'
import AdminSiteSmtp from './admin/site/Smtp'

import AdminPaypal from './admin/Paypal'
import AdminUsersIndex from './admin/users/Index'
import AdminLocalesIndex from './admin/locales/Index'
import AdminLocalesEdit from './admin/locales/Edit'

import PostsIndex from './posts/Index'
import PostsEdit from './posts/Edit'
import PostsShow from './posts/Show'

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
          {href: 'site.posts.index'},
          {href: 'site.notices.index'},
          {href: 'site.links.index'},
          {href: 'site.cards.index'},
          {href: 'site.leave-words.index'},
          {href: 'site.friend-links.index'}
        ]
      })
    }
    return items
  },
  routes: [
    {path: '/', name: 'site.home', component: Home},

    {path: '/posts/:name', name: 'site.posts.show', component: PostsShow},
    {path: '/posts', name: 'site.posts.index', component: PostsIndex},
    {path: '/posts/new', name: 'site.posts.new', component: PostsEdit},
    {path: '/posts/:id/edit', name: 'site.posts.edit', component: PostsEdit},

    {path: '/dashboard', name: 'site.dashboard', component: Dashboard},

    {path: '/admin/paypal', name: 'site.admin.paypal', component: AdminPaypal},

    {path: '/admin/users', name: 'site.admin.users.index', component: AdminUsersIndex},
    {path: '/admin/locales', name: 'site.admin.locales.index', component: AdminLocalesIndex},
    {path: '/admin/locales/new', name: 'site.admin.locales.new', component: AdminLocalesEdit},
    {path: '/admin/locales/:code/edit', name: 'site.admin.locales.edit', component: AdminLocalesEdit},

    {path: '/admin/site/info', name: 'site.admin.info', component: AdminSiteInfo},
    {path: '/admin/site/author', name: 'site.admin.author', component: AdminSiteAuthor},
    {path: '/admin/site/seo', name: 'site.admin.seo', component: AdminSiteSeo},
    {path: '/admin/site/smtp', name: 'site.admin.smtp', component: AdminSiteSmtp},
    {path: '/admin/site/status', name: 'site.admin.status', component: AdminSiteStatus}
  ]
}
