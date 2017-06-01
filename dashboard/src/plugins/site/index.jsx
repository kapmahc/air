import React from 'react';
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import Install from './Install'
// import NoMatch from './NoMatch'

export default {
  dashboard: {
    label: 'site.dashboard.title',
    admin: true,
    items: {href:'/site/info', label:'site.admin.info.title'}
  },
  routes: [
    <Route key="site.home" exact path="/" component={Home}/>,
    <Route key="site.install" exact path="/install" component={Install}/>,
    <Route key="site.dashboard" path="/dashboard" component={Dashboard} />,
    // <Route key="site.no-match" component={NoMatch}/>
  ],
}
