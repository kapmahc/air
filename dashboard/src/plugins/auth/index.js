import UsersSignIn from './users/SignIn'
import UsersSignUp from './users/SignUp'
import UsersEmailForm from './users/EmailForm'
import UsersResetPassword from './users/ResetPassword'
import UsersLogs from './users/Logs'
import UsersInfo from './users/Info'
import UsersChangePassword from './users/ChangePassword'
import AttachmentsIndex from './Attachments'

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
    {path: '/users/logs', name: 'auth.users.logs', component: UsersLogs},
    {path: '/users/info', name: 'auth.users.info', component: UsersInfo},
    {path: '/users/change-password', name: 'auth.users.change-password', component: UsersChangePassword},
    {path: '/attachments', name: 'auth.attachments.index', component: AttachmentsIndex},

    {path: '/users/sign-in', name: 'auth.users.sign-in', component: UsersSignIn},
    {path: '/users/sign-up', name: 'auth.users.sign-up', component: UsersSignUp},
    {path: '/users/forgot-password', name: 'auth.users.forgot-password', component: {template: '<UsersEmailForm action="forgot-password" />', components: {UsersEmailForm}}},
    {path: '/users/confirm', name: 'auth.users.confirm', component: {template: '<UsersEmailForm action="confirm" />', components: {UsersEmailForm}}},
    {path: '/users/unlock', name: 'auth.users.unlock', component: {template: '<UsersEmailForm action="unlock" />', components: {UsersEmailForm}}},
    {path: '/users/reset-password/:token', name: 'auth.users.reset-password', component: UsersResetPassword}
  ]
}
