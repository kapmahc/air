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
        {href: '/admin/site/info', label: 'site.admin.info.title'},
        {href: '/admin/site/author', label: 'site.admin.author.title'},
        {href: '/admin/site/smtp', label: 'site.admin.smtp.title'},
        {href: '/admin/site/seo', label: 'site.admin.seo.title'},
        {href: '/admin/site/paypal', label: 'site.admin.paypal.title'},
        {href: '/admin/users', label:  'site.admin.users.index.title'},
        {href: '/admin/locales', label:  'site.admin.locales.index.title'},
        {href: '/admin/posts', label:  'site.admin.posts.index.title'},
        {href: '/admin/notices', label:  'site.admin.notices.index.title'},
        {href: '/admin/links', label:  'site.admin.links.index.title'},
        {href: '/admin/cards', label:  'site.admin.cards.index.title'},
        {href: '/admin/leave-words', label:  'site.admin.leave-words.index.title'},
        {href: '/admin/friend-links', label:  'site.admin.friend-links.index.title'},
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
