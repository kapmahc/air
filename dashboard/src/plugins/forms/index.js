import Apply from './Apply'
import Cancel from './Cancel'
import Report from './Report'
import Show from './Show'
import Index from './Index'

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
    { path: '/forms/:id', name: 'forms.show', component: Show },
    { path: '/forms/:id/report', name: 'forms.export', component: Report },
    { path: '/forms/:id/apply', name: 'forms.apply', component: Apply },
    { path: '/forms/:id/cancel', name: 'forms.cancel', component: Cancel }
  ]
}
