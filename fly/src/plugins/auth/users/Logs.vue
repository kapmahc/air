<template>
  <dashboard-layout title="auth.users.logs.title">
    <el-col :md="{span: 22, offset: 1}">
      <el-table height="250" :data="items" border stripe style="width: 100%">
        <el-table-column width="240" prop="createdAt" label="日期" />
        <el-table-column width="120" prop="ip" label="姓名" />
        <el-table-column prop="message" label="地址" />
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  created () {
    get('/users/logs').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
