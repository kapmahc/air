import React from 'react'
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import NoMatch from './NoMatch'
import Install from './Install'
import Donates from './Donates'

import LeaveWordsNew from './leave-words/New'
import AdminLeaveWordsIndex from './admin/leave-words/Index'

import AdminSiteInfo from './admin/site/Info'
import AdminSiteAuthor from './admin/site/Author'
import AdminSiteSeo from './admin/site/Seo'
import AdminSiteSmtp from './admin/site/Smtp'
import AdminSiteStatus from './admin/site/Status'
import AdminSitePaypal from './admin/site/Paypal'

import AdminUsersIndex from './admin/users/Index'
import AdminLocalesIndex from './admin/locales/Index'
import AdminLocalesEdit from './admin/locales/Edit'

import AdminPostsIndex from './admin/posts/Index'
import AdminPostsEdit from './admin/posts/Edit'
import PostsIndex from './posts/Index'
import PostsShow from './posts/Show'

import AdminNoticesIndex from './admin/notices/Index'
import AdminNoticesEdit from './admin/notices/Edit'
import NoticesIndex from './notices/Index'

import AdminLinksIndex from './admin/links/Index'
import AdminLinksEdit from './admin/links/Edit'

import AdminCardsIndex from './admin/cards/Index'
import AdminCardsEdit from './admin/cards/Edit'

import AdminFriendLinksIndex from './admin/friend-links/Index'
import AdminFriendLinksEdit from './admin/friend-links/Edit'


export default [
  <Route key="site.home" exact path="/" component={Home}/>,
  <Route key="site.dashboard" path="/dashboard" component={Dashboard}/>,
  <Route key="site.install" path="/install" component={Install}/>,
  <Route key="site.donates" path="/donates" component={Donates}/>,

  <Route key="site.admin.leave-words.index" path="/admin/leave-words" component={AdminLeaveWordsIndex}/>,
  <Route key="site.leave-words.new" path="/leave-words/new" component={LeaveWordsNew}/>,

  <Route key="site.admin.info" path="/admin/site/info" component={AdminSiteInfo}/>,
  <Route key="site.admin.author" path="/admin/site/author" component={AdminSiteAuthor}/>,
  <Route key="site.admin.smtp" path="/admin/site/smtp" component={AdminSiteSmtp}/>,
  <Route key="site.admin.seo" path="/admin/site/seo" component={AdminSiteSeo}/>,
  <Route key="site.admin.paypal" path="/admin/site/paypal" component={AdminSitePaypal}/>,
  <Route key="site.admin.status" path="/admin/site/status" component={AdminSiteStatus}/>,

  <Route key="site.admin.users.index" path="/admin/users" component={AdminUsersIndex}/>,
  <Route key="site.admin.locales.new" path="/admin/locales/new" component={AdminLocalesEdit}/>,
  <Route key="site.admin.locales.edit" path="/admin/locales/edit/:code" component={AdminLocalesEdit}/>,
  <Route key="site.admin.locales.index" path="/admin/locales" component={AdminLocalesIndex}/>,

  <Route key="site.admin.posts.new" path="/admin/posts/new" component={AdminPostsEdit}/>,
  <Route key="site.admin.posts.edit" path="/admin/posts/edit/:id" component={AdminPostsEdit}/>,
  <Route key="site.admin.posts.index" path="/admin/posts" component={AdminPostsIndex}/>,
  <Route key="site.posts.show" path="/posts/:name" component={PostsShow}/>,
  <Route key="site.posts.index" path="/posts" component={PostsIndex}/>,

  <Route key="site.admin.notices.new" path="/admin/notices/new" component={AdminNoticesEdit}/>,
  <Route key="site.admin.notices.edit" path="/admin/notices/edit/:id" component={AdminNoticesEdit}/>,
  <Route key="site.admin.notices.index" path="/admin/notices" component={AdminNoticesIndex}/>,
  <Route key="site.notices.index" path="/notices" component={NoticesIndex}/>,

  <Route key="site.admin.links.new" path="/admin/links/new" component={AdminLinksEdit}/>,
  <Route key="site.admin.links.edit" path="/admin/links/edit/:id" component={AdminLinksEdit}/>,
  <Route key="site.admin.links.index" path="/admin/links" component={AdminLinksIndex}/>,

  <Route key="site.admin.friend-links.new" path="/admin/friend-links/new" component={AdminFriendLinksEdit}/>,
  <Route key="site.admin.friend-links.edit" path="/admin/friend-links/edit/:id" component={AdminFriendLinksEdit}/>,
  <Route key="site.admin.friend-links.index" path="/admin/friend-links" component={AdminFriendLinksIndex}/>,

  <Route key="site.admin.cards.new" path="/admin/cards/new" component={AdminCardsEdit}/>,
  <Route key="site.admin.cards.edit" path="/admin/cards/edit/:id" component={AdminCardsEdit}/>,
  <Route key="site.admin.cards.index" path="/admin/cards" component={AdminCardsIndex}/>,

  <Route key="site.no-match" component={NoMatch}/>
]
