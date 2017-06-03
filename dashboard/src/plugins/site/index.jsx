import React from 'react';
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
import NoMatch from './NoMatch'
import NewLeaveWord from './leave-words/New'
import SiteInfo from './admin/Info'
import SiteAuthor from './admin/Author'
import SiteSeo from './admin/Seo'
import SiteSmtp from './admin/Smtp'
import SiteStatus from './admin/Status'
import AdminUsers from './admin/Users'
import AdminLocales from './admin/Locales'

export default {
  dashboard (user) {
    var items = []
    if(user.uid && user.admin){
      items.push({
        label: 'site.dashboard.title',
        icon: 'setting',
        items: [
          {href:'/admin/site/status', label:'site.admin.status.title'},
          {href:'/admin/site/info', label:'site.admin.info.title'},
          {href:'/admin/site/author', label:'site.admin.author.title'},
          {href:'/admin/site/seo', label:'site.admin.seo.title'},
          {href:'/admin/site/smtp', label:'site.admin.smtp.title'},
          {href:'/admin/users', label:'site.admin.users.index.title'},
          {href:'/admin/locales', label:'site.admin.locales.index.title'},
        ]
      })
    }
    return items
  },
  routes: [
    <Route key="site.admin.status" path="/admin/site/status" component={SiteStatus}/>,
    <Route key="site.admin.info" path="/admin/site/info" component={SiteInfo}/>,
    <Route key="site.admin.author" path="/admin/site/author" component={SiteAuthor}/>,
    <Route key="site.admin.seo" path="/admin/site/seo" component={SiteSeo}/>,
    <Route key="site.admin.smtp" path="/admin/site/smtp" component={SiteSmtp}/>,
    <Route key="site.admin.users" path="/admin/users" component={AdminUsers}/>,
    <Route key="site.admin.locales" path="/admin/locales" component={AdminLocales}/>,

    <Route key="site.home" exact path="/" component={Home}/>,
    <Route key="site.install" path="/install" component={Install}/>,
    <Route key="site.leave-words.new" path="/leave-words/new" component={NewLeaveWord}/>,
    <Route key="site.dashboard" path="/dashboard" component={Dashboard} />,
    <Route key="site.no-match" component={NoMatch}/>,
  ],
}
