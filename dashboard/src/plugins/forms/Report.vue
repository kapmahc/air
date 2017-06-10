<template>
  <dashboard-layout title="buttons.report">
    <el-col :md="{span: 22, offset: 1}">
      <el-table :data="rows" border stripe style="width: 100%">
        <el-table-column :key="i" :prop="h.name" :label="h.label" v-for="(h, i) in headers" />
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  created () {
    get(`/forms/${this.$route.params.id}/report`).then((rst) => {
      this.headers = rst.headers
      this.rows = rst.rows
    }).catch(this.$message.error)
  },
  data () {
    return {
      headers: [],
      rows: []
    }
  }
}
</script>
