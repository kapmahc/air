import React from 'react'
import { Route } from 'react-router'

import UsersSignIn from './users/SignIn'
import UsersSignUp from './users/SignUp'
import UsersEmailForm from './users/EmailForm'
import UsersResetPassword from './users/ResetPassword'
import UsersInfo from './users/Info'
import UsersChangePassword from './users/ChangePassword'
import UsersLogs from './users/Logs'

const UsersForgotPassword = () => <UsersEmailForm action="forgot-password"/>
const UsersConfirm = () => <UsersEmailForm action="confirm"/>
const UsersUnlock = () => <UsersEmailForm action="unlock"/>

export default [
  <Route key="auth.users.sign-in" path="/users/sign-in" component={UsersSignIn}/>,
  <Route key="auth.users.sign-up" path="/users/sign-up" component={UsersSignUp}/>,
  <Route key="auth.users.forgot-password" path="/users/forgot-password" component={UsersForgotPassword}/>,
  <Route key="auth.users.confirm" path="/users/confirm" component={UsersConfirm}/>,
  <Route key="auth.users.unlock" path="/users/unlock" component={UsersUnlock}/>,
  <Route key="auth.users.reset-password" path="/users/reset-password/:token" component={UsersResetPassword}/>,

  <Route key="auth.users.info" path="/users/info" component={UsersInfo}/>,
  <Route key="auth.users.change-password" path="/users/change-password" component={UsersChangePassword}/>,
  <Route key="auth.users.logs" path="/users/logs" component={UsersLogs}/>,
]
