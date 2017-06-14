<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.createdAt')}}</th>
          <th>{{$t('attributes.content')}}</th>
          <th width="60px">
            {{$t('buttons.manage')}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.createdAt}}</td>
          <td>{{l.body}}</td>
          <td>
            <fa-icon @click.native="onRemove(l.id)" name="trash"/>
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
    get('/leave-words').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    onRemove (id) {
      destroy(this, `/leave-words/${id}`, (rst) => {
        this.items = this.items.filter((l) => l.id !== id)
      })
    }
  }
}
</script>
