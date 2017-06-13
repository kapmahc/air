<template>
  <dashboard-layout>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.createdAt')}}</th>
          <th>IP</th>
          <th>{{$t('attributes.content')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.createdAt}}</td>
          <td>{{l.ip}}</td>
          <td>{{l.message}}</td>
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
    get('/users/logs').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
