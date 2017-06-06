<template>
  <application-layout>
    <el-col :md="{span:16, offset:4}">
      <h2>{{item.title}}</h2>
      <md2ht :body="item.body" />
    </el-col>
  </application-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  data () {
    return {
      item: {
        title: '',
        body: '',
        name: ''
      }
    }
  },
  created () {
    get(`/posts/0?name=${this.$route.params.name}`).then((rst) => { this.item = rst }).catch(this.$message.error)
  }
}
</script>
