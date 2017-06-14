<template>
  <dashboard-layout>
    <dropzone
      id="myVueDropzone"
      :url="url"
      useFontAwesome
      useCustomDropzoneOptions
      :dropzoneOptions="option"
      v-on:vdropzone-success="onSuccess" />
    <x-table full-bordered>
      <thead>
        <tr>
          <th>{{$t('attributes.name')}}</th>
          <th>{{$t('attributes.size')}}</th>
          <th>{{$t('buttons.manage')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(l, i) in items">
          <td><a :href="l.url" target="_blank">{{l.title}}</a></td>
          <td>{{l.length}}KB</td>
          <td>
            <router-link :to="{name: 'auth.attachments.edit', params: {id: l.id}}">
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
import Dropzone from 'vue2-dropzone'
import { XTable } from 'vux'

import {api, get, fail, destroy} from '@/ajax'
import {TOKEN} from '@/constants'

export default {
  components: {
    XTable,
    Dropzone
  },
  created () {
    get('/attachments').then((rst) => { this.items = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    url () {
      return api('/attachments')
    },
    option () {
      return {
        withCredentials: 'include',
        headers: {
          'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
        }
      }
    }
  },
  methods: {
    onSuccess (file, res) {
      this.items.unshift(res)
    },
    onRemove (id) {
      destroy(this, `/attachments/${id}`, (rst) => {
        this.items = this.items.filter((a) => a.id !== id)
      })
    }
  }
}
</script>
