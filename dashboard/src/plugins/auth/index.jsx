import React from 'react'
import { Route } from 'react-router'

import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import EmailForm from './users/EmailForm'
import ResetPassword from './users/ResetPassword'
import Logs from './users/Logs'
import Info from './users/Info'
import ChangePassword from './users/ChangePassword'

const ForgotPassword = () => <EmailForm action="forgot-password"/>
const Confirm = () => <EmailForm action="confirm"/>
const Unlock = () => <EmailForm action="unlock"/>

export default {
  dashboard(user) {
    var items = []
    if (user.uid){
      items.push({
        label: 'auth.dashboard.title',
        icon: 'info-circle-o',
        items: [
          {href:'/users/logs', label:'auth.users.logs.title'},
          {href:'/users/info', label:'auth.users.info.title'},
          {href:'/users/change-password', label:'auth.users.change-password.title'},
        ],
      })
    }
    return items
  },
  routes: [
    <Route key="auth.users.sign-in" path="/users/sign-in" component={SignIn} />,
    <Route key="auth.users.sign-up" path="/users/sign-up" component={SignUp} />,
    <Route key="auth.users.forgot-password" path="/users/forgot-password" component={ForgotPassword} />,
    <Route key="auth.users.confirm" path="/users/confirm" component={Confirm} />,
    <Route key="auth.users.unlock" path="/users/unlock" component={Unlock} />,
    <Route key="auth.users.reset-password" path="/users/reset-password/:token" component={ResetPassword}/>,

    <Route key="auth.users.logs" path="/users/logs" component={Logs} />,
    <Route key="auth.users.info" path="/users/info" component={Info} />,
    <Route key="auth.users.change-password" path="/users/change-password" component={ChangePassword} />,

  ],
}
