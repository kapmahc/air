import React from 'react'
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import NoMatch from './NoMatch'

export default [
  <Route key="site.home" exact path="/" component={Home}/>,
  <Route key="site.dashboard" path="/dashboard" component={Dashboard}/>,
  <Route key="site.no-match" component={NoMatch}/>
]
