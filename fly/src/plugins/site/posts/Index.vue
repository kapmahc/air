<template>
  <application-layout>
    <el-col :md="{span:16, offset:4}" :key={i} v-for="(o, i) in items">
      <router-link target="_blank" :to="{name: 'posts.show', params: {name: o.name}}"><h2>{{o.title}}</h2></router-link>
      <md2ht :body="o.body" />
    </el-col>
  </application-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    get('/posts').then((rst) => { this.items = rst }).catch(this.$message.error)
  }
}
</script>
