export default (user) => {
  if(!user.uid){
    return []
  }
  var items = [
    {
      icon: 'user',
      label: 'auth.profile.title',
      items: [
        {href: '/users/logs', label: 'auth.users.logs.title'},
        {href: '/users/info', label: 'auth.users.info.title'},
        {href: '/users/change-password', label: 'auth.users.change-password.title'},
        {href: '/attachments', label: 'auth.attachments.index.title'},
      ]
    },
  ]

  if(user.admin){
    items.push({
      icon: 'setting',
      label: 'site.profile.title',
      items: [
        {href: '/admin/site/status', label: 'site.admin.status.title'},
      ]
    })
    items.push({
      icon: 'question-circle-o',
      label: 'forms.profile.title',
      items: [
        {href: '/forms/manage', label: 'forms.manage.title'},
      ]
    })
  }
  return items
}
