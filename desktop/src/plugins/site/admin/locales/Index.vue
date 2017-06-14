<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('site.attributes.locale.code')}}</th>
          <th>{{$t('site.attributes.locale.message')}}</th>
          <th width="60px">
            {{$t('buttons.manage')}}
            <router-link :to="{name: 'site.admin.locales.new'}"><fa-icon name="plus"/></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.code}}</td>
          <td>{{l.message}}</td>
          <td>
            <router-link :to="{name: 'site.admin.locales.edit', params: {code: l.code}}">
              <fa-icon name="pencil"/>
            </router-link>
            <fa-icon @click.native="onRemove(l.code)" name="trash"/>
          </td>
        </tr>
      </tbody>
    </x-table>
  </dashboard-layout>
</template>

<script>
import { XTable } from 'vux'
import {get, fail, destroy} from '@/ajax'

export default {
  components: {
    XTable
  },
  created () {
    get('/admin/locales').then((rst) => { this.items = Object.entries(rst).map((v) => { return { code: v[0], message: v[1] } }) }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    onRemove (code) {
      destroy(this, `/admin/locales/${code}`, (rst) => {
        this.items = this.items.filter((l) => l.code !== code)
      })
    }
  }
}
</script>
