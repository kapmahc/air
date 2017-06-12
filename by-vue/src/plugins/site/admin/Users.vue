<template>
  <dashboard-layout title="site.admin.users.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column :label="$t('attributes.user')">
          <template scope="scope">
            {{scope.row.name}}&lt;{{scope.row.email}}&gt;[{{scope.row.signInCount}}]
          </template>
        </el-table-column>
        <el-table-column width="320" :label="$t('auth.attributes.user.currentSignIn')">
          <template scope="scope">
            {{scope.row.currentSignInAt}} [{{scope.row.currentSignInIp}}]
          </template>
        </el-table-column>
        <el-table-column width="320" :label="$t('auth.attributes.user.lastSignIn')">
          <template scope="scope">
            {{scope.row.lastSignInAt}} [{{scope.row.lastSignInIp}}]
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get} from '@/ajax'

export default {
  created () {
    get('/admin/users').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
