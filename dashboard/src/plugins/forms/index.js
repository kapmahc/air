import Apply from './Apply'
import Cancel from './Cancel'
import Report from './Report'
import Manage from './Manage'
import Edit from './Edit'

export default {
  dashboard (user) {
    var items = []
    if (user && user.admin) {
      items.push({
        label: 'forms.profile.title',
        icon: 'user',
        items: [
          {href: 'forms.manage'}
        ]
      })
    }
    return items
  },
  routes: [
    { path: '/forms/manage', name: 'forms.manage', component: Manage },
    { path: '/forms/new', name: 'forms.new', component: Edit },
    { path: '/forms/edit/:id', name: 'forms.edit', component: Edit },
    { path: '/forms/report/:id', name: 'forms.report', component: Report },
    { path: '/forms/apply/:id', name: 'forms.apply', component: Apply },
    { path: '/forms/cancel/:id', name: 'forms.cancel', component: Cancel }
  ]
}
