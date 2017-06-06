<template>
  <application-layout>
    <el-col :md="{span:16, offset:4}">
      <h2 style="padding-left: 20px;">{{$t('site.notices.index.title')}}</h2>
    </el-col>
    <el-col :md="{span:16, offset:4}" :key={i} v-for="(n, i) in items">
      <blockquote>
        <md2ht :body="n.body" />
        <footer>--<cite title="Source Title">{{n.updatedAt}}</cite></footer>
      </blockquote>
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
    get('/notices').then((rst) => { this.items = rst }).catch(this.$message.error)
  }
}
</script>
