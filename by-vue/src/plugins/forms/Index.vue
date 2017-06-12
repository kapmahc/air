<template>
  <dashboard-layout title="forms.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-button @click="handleEdit(null)" type="info" size="mini" icon="plus"/>
      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column width="120" prop="deadline" :label="$t('attributes.shutDown')" />
        <el-table-column :label="$t('attributes.body')">
          <template scope="scope">
            <span>{{scope.row.title}}</span>
            <pre><code>{{scope.row.body}}</code></pre>
          </template>
        </el-table-column>
        <el-table-column width="160" :label="$t('buttons.manage')">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleExport(scope.row.id)" size="mini" icon="arrow-down" />
              <el-button @click="handleReport(scope.row.id)" type="success" size="mini" icon="menu" />
              <el-button @click="handleView(scope.row.id)" type="info" size="mini" icon="document" />
              <el-button @click="handleEdit(scope.row.id)" type="warning" size="mini" icon="edit" />
              <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini" icon="delete" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {api, options, get, _delete} from '@/ajax'

export default {
  created () {
    get('/forms').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    handleEdit (id) {
      this.$router.push(id ? {name: 'forms.edit', params: {id}} : {name: 'forms.new'})
    },
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
        _delete(`/forms/${id}`).then(function (rst) {
          this.$message.success('success')
          this.items = this.items.filter((o) => o.id !== id)
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    },
    handleView (id) {
      this.$router.push({name: 'forms.apply', params: {id}})
    },
    handleReport (id) {
      this.$router.push({name: 'forms.report', params: {id}})
    },
    handleExport (id) {
      // get().then((rst) => {
      //   console.log('aaa')
      // }).catch(this.$message.error)
      fetch(api(`/forms/${id}/export`), options('GET'))
        .then(response => response.blob())
        .then(blob => {
          var url = window.URL.createObjectURL(blob)
          var a = document.createElement('a')
          a.href = url
          a.download = `form-${id}.ini`
          a.click()
        })
    }
  }
}
</script>
