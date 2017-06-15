import React from 'react'
import { Route } from 'react-router'

import Home from './Home'
import Dashboard from './Dashboard'
import NoMatch from './NoMatch'
import Install from './Install'

import LeaveWordsNew from './leave-words/New'

export default [
  <Route key="site.home" exact path="/" component={Home}/>,
  <Route key="site.dashboard" path="/dashboard" component={Dashboard}/>,
  <Route key="site.install" path="/install" component={Install}/>,

  <Route key="site.leave-words.new" path="/leave-words/new" component={LeaveWordsNew}/>,

  <Route key="site.no-match" component={NoMatch}/>
]
