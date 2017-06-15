import React from 'react'
import { Route } from 'react-router'

import UsersSignIn from './users/SignIn'
import UsersSignUp from './users/SignUp'

export default [
  <Route key="auth.users.sign-in" path="/users/sign-in" component={UsersSignIn}/>,
  <Route key="auth.users.sign-up" path="/users/sign-up" component={UsersSignUp}/>
]
