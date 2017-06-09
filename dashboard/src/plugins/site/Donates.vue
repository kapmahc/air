<template>
  <application-layout>
    <el-row>
      <el-col :md="{span: 8, offset: 8}">
        <div :key="k" v-for="(v, k) in items" style="padding: 20px">
          <h4>{{$t("site.donates.title")}} - {{$t(`site.donates.by-${k}`)}}</h4>
          <span v-html="v" />
        </div>
      </el-col>
    </el-row>
  </application-layout>
</template>

<script>
import {get} from '@/ajax'
export default {
  data () {
    return {
      items: {}
    }
  },
  created () {
    get('/donates').then((rst) => { this.items = rst }).catch(this.$message.error)
  }
}
</script>
