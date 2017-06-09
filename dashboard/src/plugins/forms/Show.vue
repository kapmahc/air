<template>
  <application-layout>
    <el-row>
      <el-col :md="{span: 16, offset: 4}">
        <h3>{{item.title}}</h3>
        <md2ht :body="item.body" />
      </el-col>
    </el-row>
  </application-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  data () {
    return {
      item: {
        fields: [],
        title: '',
        body: ''
      }
    }
  },
  created () {
    get(`/forms/${this.$route.params.id}`).then((rst) => { this.item = rst }).catch(this.$message.error)
  },
  methods: {
  }
}
</script>
