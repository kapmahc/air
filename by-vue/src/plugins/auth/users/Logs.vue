<template>
  <dashboard-layout title="auth.users.logs.title">
    <el-col :md="{span: 22, offset: 1}">
      <el-table :data="items" border stripe style="width: 100%">
        <el-table-column width="240" prop="createdAt" :label="$t('attributes.createdAt')" />
        <el-table-column width="120" prop="ip" label="IP" />
        <el-table-column prop="message" :label="$t('auth.attributes.log.message')" />
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
