import UsersSignIn from './users/SignIn'
import UsersSignUp from './users/SignUp'
import UsersEmailForm from './users/EmailForm'
import UsersResetPassword from './users/ResetPassword'

export default {
  dashboard (user) {
    var items = []
    if (user) {
      items.push({
        label: 'auth.profile.title',
        icon: 'user',
        items: [
          {href: 'auth.users.logs'},
          {href: 'auth.users.info'},
          {href: 'auth.users.change-password'},
          {href: 'auth.attachments.index'}
        ]
      })
    }
    return items
  },
  routes: [
    {path: '/users/sign-in', name: 'auth.users.sign-in', component: UsersSignIn},
    {path: '/users/sign-up', name: 'auth.users.sign-up', component: UsersSignUp},
    {path: '/users/forgot-password', name: 'auth.users.forgot-password', component: {template: '<UsersEmailForm action="forgot-password" />', components: {UsersEmailForm}}},
    {path: '/users/confirm', name: 'auth.users.confirm', component: {template: '<UsersEmailForm action="confirm" />', components: {UsersEmailForm}}},
    {path: '/users/unlock', name: 'auth.users.unlock', component: {template: '<UsersEmailForm action="unlock" />', components: {UsersEmailForm}}},
    {path: '/users/reset-password/:token', name: 'auth.users.reset-password', component: UsersResetPassword}
  ]
}
