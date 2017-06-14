<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.loc')}}</th>
          <th>{{$t('attributes.href')}}</th>
          <th>{{$t('attributes.title')}}</th>
          <th width="60px">
            {{$t('buttons.manage')}}
            <router-link :to="{name: 'site.cards.new'}"><fa-icon name="plus"/></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.loc}}[{{l.sortOrder}}]</td>
          <td>{{l.href}}</td>
          <td>{{l.title}}</td>
          <td>
            <router-link :to="{name: 'site.cards.edit', params: {id: l.id}}">
              <fa-icon name="pencil"/>
            </router-link>
            <fa-icon @click.native="onRemove(l.id)" name="trash"/>
          </td>
        </tr>
      </tbody>
    </x-table>
  </dashboard-layout>
</template>

<script>
import { XTable, Divider } from 'vux'
import {get, fail, destroy} from '@/ajax'

export default {
  components: {
    XTable,
    Divider
  },
  created () {
    get('/cards').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    onRemove (id) {
      destroy(this, `/cards/${id}`, (rst) => {
        this.items = this.items.filter((l) => l.id !== id)
      })
    }
  }
}
</script>
