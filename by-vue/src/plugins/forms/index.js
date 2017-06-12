import Apply from './Apply'
import Cancel from './Cancel'
import Report from './Report'
import Index from './Index'
import Edit from './Edit'

export default {
  dashboard (user) {
    var items = []
    if (user && user.admin) {
      items.push({
        label: 'forms.dashboard.title',
        icon: 'user',
        items: [
          {href: 'forms.index'}
        ]
      })
    }
    return items
  },
  routes: [
    { path: '/forms', name: 'forms.index', component: Index },
    { path: '/forms/new', name: 'forms.new', component: Edit },
    { path: '/forms/:id/edit', name: 'forms.edit', component: Edit },
    { path: '/forms/:id/report', name: 'forms.report', component: Report },
    { path: '/forms/:id/apply', name: 'forms.apply', component: Apply },
    { path: '/forms/:id/cancel', name: 'forms.cancel', component: Cancel }
  ]
}
