<template>
  <dashboard-layout>
    <dropzone
      id="myVueDropzone"
      :url="url"
      useFontAwesome
      useCustomDropzoneOptions
      :dropzoneOptions="option"
      v-on:vdropzone-success="showSuccess">
        <!-- Optional parameters if any! -->
        <input type="hidden" name="token" value="xxx">
    </dropzone>
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
          <td></td>
        </tr>
      </tbody>
    </x-table>
  </dashboard-layout>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import { XTable } from 'vux'

import {api, get, fail} from '@/ajax'
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
    showSuccess (file, res) {
      this.items.unshift(res)
    }
  }
}
</script>
