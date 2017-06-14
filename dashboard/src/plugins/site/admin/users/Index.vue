<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('site.admin.users.index.who')}}</th>
          <th>{{$t('site.admin.users.index.lastSignIn')}}</th>
          <th>{{$t('site.admin.users.index.currentSignIn')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.name}}&lt;{{l.email}}&gt;[{{l.signInCount}}]</td>
          <td>{{l.lastSignInAt}}[{{l.lastSignInIp}}]</td>
          <td>{{l.currentSignInAt}}[{{l.currentSignInIp}}]</td>
        </tr>
      </tbody>
    </x-table>
  </dashboard-layout>
</template>

<script>
import { XTable } from 'vux'
import {get, fail} from '@/ajax'

export default {
  components: {
    XTable
  },
  created () {
    get('/admin/users').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
