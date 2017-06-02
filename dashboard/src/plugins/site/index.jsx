import React from 'react';
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
import NoMatch from './NoMatch'
import NewLeaveWord from './leave-words/New'

export default {
  dashboard (user) {
    var items = []
    if(user.uid && user.admin){
      items.push({
        label: 'site.dashboard.title',
        icon: 'setting',
        items: [
          {href:'/site/info', label:'site.admin.info.title'},
        ]
      })
    }
    return items
  },
  routes: [
    <Route key="site.home" exact path="/" component={Home}/>,
    <Route key="site.install" exact path="/install" component={Install}/>,
    <Route key="site.leave-words.new" exact path="/leave-words/new" component={NewLeaveWord}/>,
    <Route key="site.dashboard" path="/dashboard" component={Dashboard} />,
    <Route key="site.no-match" component={NoMatch}/>,
  ],
}
