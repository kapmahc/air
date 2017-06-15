import Home from './Home'
// import Dashboard from './Dashboard'
// import About from './About'
// import Menus from './Menus'
//
// import AdminSiteStatus from './admin/site/Status'
// import AdminSiteInfo from './admin/site/Info'
// import AdminSiteAuthor from './admin/site/Author'
// import AdminSiteSeo from './admin/site/Seo'
// import AdminSiteSmtp from './admin/site/Smtp'
//
// import AdminPaypal from './admin/Paypal'
// import AdminUsersIndex from './admin/users/Index'
// import AdminLocalesIndex from './admin/locales/Index'
// import AdminLocalesEdit from './admin/locales/Edit'
//
// import PostsIndex from './posts/Index'
// import PostsManage from './posts/Manage'
// import PostsEdit from './posts/Edit'
// import PostsShow from './posts/Show'
//
// import NoticesIndex from './notices/Index'
// import NoticesManage from './notices/Manage'
// import NoticesEdit from './notices/Edit'
// import NoticesShow from './notices/Show'
//
// import FriendLinksIndex from './friend-links/Index'
// import FriendLinksEdit from './friend-links/Edit'
// import LinksIndex from './links/Index'
// import LinksEdit from './links/Edit'
// import CardsIndex from './cards/Index'
// import CardsEdit from './cards/Edit'
// import LeaveWordsIndex from './leave-words/Index'
// import LeaveWordsEdit from './leave-words/Edit'

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
          {href: 'site.posts.manage'},
          {href: 'site.notices.manage'},
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
    {path: '/', name: 'site.home', component: Home}
    // {path: '/about', name: 'site.about', component: About},
    // {path: '/menus', name: 'site.menus', component: Menus},
    // {path: '/dashboard', name: 'site.dashboard', component: Dashboard},
    //
    // {path: '/posts/show/:name', name: 'site.posts.show', component: PostsShow},
    // {path: '/posts', name: 'site.posts.index', component: PostsIndex},
    // {path: '/posts/manage', name: 'site.posts.manage', component: PostsManage},
    // {path: '/posts/new', name: 'site.posts.new', component: PostsEdit},
    // {path: '/posts/edit/:id', name: 'site.posts.edit', component: PostsEdit},
    //
    // {path: '/friend-links', name: 'site.friend-links.index', component: FriendLinksIndex},
    // {path: '/friend-links/new', name: 'site.friend-links.new', component: FriendLinksEdit},
    // {path: '/friend-links/edit/:id', name: 'site.friend-links.edit', component: FriendLinksEdit},
    // {path: '/links', name: 'site.links.index', component: LinksIndex},
    // {path: '/links/new', name: 'site.links.new', component: LinksEdit},
    // {path: '/links/edit/:id', name: 'site.links.edit', component: LinksEdit},
    // {path: '/cards', name: 'site.cards.index', component: CardsIndex},
    // {path: '/cards/new', name: 'site.cards.new', component: CardsEdit},
    // {path: '/cards/edit/:id', name: 'site.cards.edit', component: CardsEdit},
    // {path: '/leave-words', name: 'site.leave-words.index', component: LeaveWordsIndex},
    // {path: '/leave-words/new', name: 'site.leave-words.new', component: LeaveWordsEdit},
    //
    // {path: '/notices/show/:id', name: 'site.notices.show', component: NoticesShow},
    // {path: '/notices', name: 'site.notices.index', component: NoticesIndex},
    // {path: '/notices/manage', name: 'site.notices.manage', component: NoticesManage},
    // {path: '/notices/new', name: 'site.notices.new', component: NoticesEdit},
    // {path: '/notices/edit/:id', name: 'site.notices.edit', component: NoticesEdit},
    //
    // {path: '/admin/paypal', name: 'site.admin.paypal', component: AdminPaypal},
    //
    // {path: '/admin/users', name: 'site.admin.users.index', component: AdminUsersIndex},
    // {path: '/admin/locales', name: 'site.admin.locales.index', component: AdminLocalesIndex},
    // {path: '/admin/locales/new', name: 'site.admin.locales.new', component: AdminLocalesEdit},
    // {path: '/admin/locales/:code/edit', name: 'site.admin.locales.edit', component: AdminLocalesEdit},
    //
    // {path: '/admin/site/info', name: 'site.admin.info', component: AdminSiteInfo},
    // {path: '/admin/site/author', name: 'site.admin.author', component: AdminSiteAuthor},
    // {path: '/admin/site/seo', name: 'site.admin.seo', component: AdminSiteSeo},
    // {path: '/admin/site/smtp', name: 'site.admin.smtp', component: AdminSiteSmtp},
    // {path: '/admin/site/status', name: 'site.admin.status', component: AdminSiteStatus}
  ]
}
