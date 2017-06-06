<template>
  <dashboard-layout title="site.admin.leave-words.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column width="240" prop="createdAt" :label="$t('attributes.createdAt')" />
        <el-table-column prop="body" :label="$t('attributes.body')" >
          <template scope="scope">
            <pre><code>{{scope.row.body}}</code></pre>
          </template>
        </el-table-column>
        <el-table-column width="80" :label="$t('buttons.manage')">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini" icon="delete" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get, _delete} from '@/ajax'

export default {
  created () {
    get('/leave-words').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    handleRemove (id) {
      this.$confirm(
        this.$t('are-you-sure'),
        '',
        {
          confirmButtonText: this.$t('buttons.ok'),
          cancelButtonText: this.$t('buttons.cancel'),
          type: 'warning'
        }
      )
      .then(() => {
        _delete(`/leave-words/${id}`).then(function (rst) {
          this.$message.success('success')
          this.items = this.items.filter((o) => o.id !== id)
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    }
  }
}
</script>
