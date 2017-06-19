import React from 'react'
import { Route } from 'react-router'

import Manage from './Manage'
import Edit from './Edit'

export default [
  <Route key="forms.manage" path="/forms/manage" component={Manage}/>,
  <Route key="forms.new" path="/forms/new" component={Edit}/>,
  <Route key="forms.edit" path="/forms/edit/:id" component={Edit}/>,  
]
