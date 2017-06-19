export const TOKEN = 'token'

export const DATE_FORMAT = 'YYYY/MM/DD'

export const NonSignInLinks=[
  {icon: 'login', href: '/users/sign-in', label: 'auth.users.sign-in.title'},
  {icon: 'user-add', href: '/users/sign-up', label: 'auth.users.sign-up.title'},
  {icon: 'retweet', href: '/users/forgot-password', label: 'auth.users.forgot-password.title'},
  {icon: 'check-circle-o', href: '/users/confirm', label: 'auth.users.confirm.title'},
  {icon: 'unlock', href: '/users/unlock', label: 'auth.users.unlock.title'},
  {icon: 'question-circle-o', href: '/leave-words/new', label: 'site.leave-words.new.title'},
]

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};
