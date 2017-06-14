<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.content')}}</th>
          <th width="60px">
            {{$t('buttons.manage')}}
            <router-link :to="{name: 'site.posts.new'}"><fa-icon name="plus"/></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>
            {{l.title}}
            <divider />
            {{l.body}}
          </td>
          <td>
            <router-link :to="{name: 'site.posts.show', params: {name: l.name}}">
              <fa-icon name="eye"/>
            </router-link>
            <router-link :to="{name: 'site.posts.edit', params: {id: l.id}}">
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
    get('/posts').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    onRemove (id) {
      destroy(this, `/posts/${id}`, (rst) => {
        this.items = this.items.filter((l) => l.id !== id)
      })
    }
  }
}
</script>
