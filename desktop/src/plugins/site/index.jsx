import React from 'react'
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import NoMatch from './NoMatch'
import Install from './Install'

import LeaveWordsNew from './leave-words/New'

import AdminSiteInfo from './admin/site/Info'
import AdminSiteAuthor from './admin/site/Author'
import AdminSiteSeo from './admin/site/Seo'
import AdminSiteSmtp from './admin/site/Smtp'
import AdminSiteStatus from './admin/site/Status'
import AdminSitePaypal from './admin/site/Paypal'

import AdminUsersIndex from './admin/users/Index'
import AdminLocalesIndex from './admin/locales/Index'


export default [
  <Route key="site.home" exact path="/" component={Home}/>,
  <Route key="site.dashboard" path="/dashboard" component={Dashboard}/>,
  <Route key="site.install" path="/install" component={Install}/>,

  <Route key="site.leave-words.new" path="/leave-words/new" component={LeaveWordsNew}/>,

  <Route key="site.admin.info" path="/admin/site/info" component={AdminSiteInfo}/>,
  <Route key="site.admin.author" path="/admin/site/author" component={AdminSiteAuthor}/>,
  <Route key="site.admin.smtp" path="/admin/site/smtp" component={AdminSiteSmtp}/>,
  <Route key="site.admin.seo" path="/admin/site/seo" component={AdminSiteSeo}/>,
  <Route key="site.admin.paypal" path="/admin/site/paypal" component={AdminSitePaypal}/>,
  <Route key="site.admin.status" path="/admin/site/status" component={AdminSiteStatus}/>,

  <Route key="site.admin.users.index" path="/admin/users" component={AdminUsersIndex}/>,
  <Route key="site.admin.locales.index" path="/admin/locales" component={AdminLocalesIndex}/>,

  <Route key="site.no-match" component={NoMatch}/>
]
