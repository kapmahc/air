import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
import NewLeaveWord from './leave-words/New'
import AdminSiteInfo from './admin/Info'
import AdminSiteAuthor from './admin/Author'
import AdminSiteSeo from './admin/Seo'
import AdminSiteSmtp from './admin/Smtp'
import AdminSiteStatus from './admin/Status'
import AdminLocales from './admin/Locales'
import AdminUsers from './admin/Users'
// import AdminCards from './admin/Cards'
import AdminLinks from './admin/Links'
import AdminPosts from './admin/Posts'
import AdminNotices from './admin/Notices'
import AdminLeaveWords from './admin/LeaveWords'
import AdminFriendLinks from './admin/FriendLinks'

import IndexNotices from './notices/Index'
import IndexPosts from './posts/Index'
import ShowPost from './posts/Show'

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
    { path: '/', name: 'site.home', component: Home },
    { path: '/dashboard', name: 'site.dashboard', component: Dashboard },
    { path: '/leave-words/new', name: 'site.leave-words.new', component: NewLeaveWord },
    { path: '/install', name: 'site.install', component: Install },

    { path: '/notices', name: 'notices.index', component: IndexNotices },
    { path: '/posts', name: 'posts.index', component: IndexPosts },
    { path: '/posts/:name', name: 'posts.show', component: ShowPost },

    { path: '/admin/locales', name: 'site.admin.locales.index', component: AdminLocales },
    { path: '/admin/users', name: 'site.admin.users.index', component: AdminUsers },
    { path: '/admin/posts', name: 'site.admin.posts.index', component: AdminPosts },
    { path: '/admin/notices', name: 'site.admin.notices.index', component: AdminNotices },
    { path: '/admin/links', name: 'site.admin.links.index', component: AdminLinks },
    { path: '/admin/cards', name: 'site.admin.cards.index', component: AdminLinks },
    { path: '/admin/leave-words', name: 'site.admin.leave-words.index', component: AdminLeaveWords },
    { path: '/admin/friend-links', name: 'site.admin.friend-links.index', component: AdminFriendLinks },

    { path: '/admin/site/info', name: 'site.admin.info', component: AdminSiteInfo },
    { path: '/admin/site/author', name: 'site.admin.author', component: AdminSiteAuthor },
    { path: '/admin/site/seo', name: 'site.admin.seo', component: AdminSiteSeo },
    { path: '/admin/site/smtp', name: 'site.admin.smtp', component: AdminSiteSmtp },
    { path: '/admin/site/status', name: 'site.admin.status', component: AdminSiteStatus }
  ]
}
