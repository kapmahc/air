<template>
  <dashboard-layout title="site.admin.status.title" admin>
    <el-col :md="{span: 10, offset: 1}">
      <h4>{{$t('site.admin.status.routes')}}</h4>
      <el-table :data="item.routes" border stripe style="width: 100%">
        <el-table-column width="120" prop="method" label="HTTP METHOD" />
        <el-table-column prop="path" label="PATH" />
      </el-table>
    </el-col>
    <ItemPanel :value="item.os" action="os"/>
    <ItemPanel :value="item.network" action="network"/>
    <ItemPanel :value="item.database" action="database"/>
    <ItemPanel :value="item.jobs" action="jobs"/>
    <el-col :md="{span: 10, offset: 1}">
      <h4>{{$t('site.admin.status.cache')}}</h4>
      <el-table :data="item.cache.map((r) => { return {val: r} })" border stripe style="width: 100%">
        <el-table-column prop="val" label="VAL" />
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get} from '@/ajax'
import ItemPanel from './StatusItem'

export default {
  created () {
    get('/admin/site/status').then((rst) => { this.item = rst }).catch(this.$message.error)
  },
  data () {
    return {
      item: {
        database: {},
        os: {},
        jobs: {},
        network: {},
        cache: [],
        routes: []
      }
    }
  },
  components: {
    ItemPanel
  }
}
</script>
