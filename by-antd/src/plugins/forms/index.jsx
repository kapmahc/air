import React from 'react'
import { Route } from 'react-router'

import Manage from './Manage'
import Edit from './Edit'
import Show from './Show'
import Index from './List'

const Apply = ({match}) => <Show action="apply" id={match.params.id} />
const Cancel = ({match}) => <Show action="cancel" id={match.params.id}/>

export default [
  <Route key="forms.manage" path="/forms/manage" component={Manage}/>,
  <Route key="forms.new" path="/forms/new" component={Edit}/>,
  <Route key="forms.edit" path="/forms/edit/:id" component={Edit}/>,
  <Route key="forms.apply" path="/forms/apply/:id" component={Apply}/>,
  <Route key="forms.cancel" path="/forms/cancel/:id" component={Cancel}/>,
  <Route key="forms.index" path="/forms" component={Index}/>,
]
