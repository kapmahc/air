<template>
  <dashboard-layout admin>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.deadline')}}</th>
          <th>{{$t('attributes.content')}}</th>
          <th >
            {{$t('buttons.manage')}}
            <router-link :to="{name: 'forms.new'}"><fa-icon name="plus"/></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td>{{l.deadline}}</td>
          <td>
            {{l.title}}
            <divider/>
            {{l.body}}
          </td>
          <td>
            <router-link :to="{name: 'forms.apply', params: {id: l.id}}">
              <fa-icon name="share"/>
            </router-link>
            <router-link :to="{name: 'forms.cancel', params: {id: l.id}}">
              <fa-icon name="ban"/>
            </router-link>
            <router-link :to="{name: 'forms.report', params: {id: l.id}}">
              <fa-icon name="eye"/>
            </router-link>
            <fa-icon @click.native="onExport(l.id)" name="download"/>
            <router-link :to="{name: 'forms.edit', params: {id: l.id}}">
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
import {api, options, get, fail, destroy} from '@/ajax'

export default {
  components: {
    XTable,
    Divider
  },
  created () {
    get('/forms').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    onExport (id) {
      fetch(api(`/forms/${id}/export`), options('GET'))
        .then(response => response.blob())
        .then(blob => {
          var url = window.URL.createObjectURL(blob)
          var a = document.createElement('a')
          a.href = url
          a.download = `form-${id}.ini`
          a.click()
        })
    },
    onRemove (id) {
      destroy(this, `/forms/${id}`, (rst) => {
        this.items = this.items.filter((l) => l.id !== id)
      })
    }
  }
}
</script>
