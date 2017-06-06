import UsersSignIn from './users/SignIn'
import UsersSignUp from './users/SignUp'
import EmailForm from './users/EmailForm'
import ResetPassword from './users/ResetPassword'

export default {
  dashboard (user) {
    var items = []
    if (user) {
      items.push({
        label: 'auth.dashboard.title',
        icon: 'user',
        items: [
          {href: 'auth.users.logs'},
          {href: 'auth.users.info'},
          {href: 'auth.users.change-password'}
        ]
      })
    }
    return items
  },
  routes: [
    { path: '/users/sign-in', name: 'auth.users.sign-in', component: UsersSignIn },
    { path: '/users/sign-up', name: 'auth.users.sign-up', component: UsersSignUp },
    { path: '/users/forgot-password', name: 'auth.users.forgot-password', component: {template: '<EmailForm action="forgot-password" />', components: {EmailForm}} },
    { path: '/users/confirm', name: 'auth.users.confirm', component: {template: '<EmailForm action="confirm" />', components: {EmailForm}} },
    { path: '/users/unlock', name: 'auth.users.unlock', component: {template: '<EmailForm action="unlock" />', components: {EmailForm}} },
    { path: '/users/reset-password/:token', name: 'auth.users.reset-password', component: ResetPassword },

    { path: '/users/logs', name: 'auth.users.logs', component: ResetPassword },
    { path: '/users/info', name: 'auth.users.info', component: ResetPassword },
    { path: '/users/change-password', name: 'auth.users.change-password', component: ResetPassword }
  ]
}
