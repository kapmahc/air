<template>
  <dashboard-layout title="site.admin.notices.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-dialog :title="$t('buttons.edit')" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item :label="$t('attributes.body')" prop="body">
            <el-input type="textarea" v-model="form.body" />
            <span>{{$t('helpers.markdown')}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t("buttons.cancel")}}</el-button>
          <el-button type="primary" @click="handleSave('form')">{{$t("buttons.ok")}}</el-button>
        </div>
      </el-dialog>

      <el-button @click="handleEdit(null)" type="info" size="mini" icon="plus"/>

      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column :label="$t('attributes.body')">
          <template scope="scope">
            <pre><code>{{scope.row.body}}</code></pre>
          </template>
        </el-table-column>
        <el-table-column width="80" :label="$t('buttons.manage')">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleEdit(scope.row)" type="info" size="mini" icon="edit" />
              <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini" icon="delete" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get, post, _delete} from '@/ajax'

export default {
  created () {
    get('/notices').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: [],
      form: {
        body: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    rules () {
      return {
        body: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleEdit (form) {
      this.form = form || {body: ''}
      this.dialogFormVisible = true
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
        _delete(`/notices/${id}`).then(function (rst) {
          this.$message.success('success')
          this.items = this.items.filter((o) => o.id !== id)
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    },
    handleSave (formName) {
      this.$refs[formName].validate((valid) => {
        const id = this.form.id
        if (valid) {
          post(id ? `/notices/${id}` : '/notices', Object.assign({}, this.form, {type: 'markdown'}))
            .then(function (rst) {
              this.items = this.items.filter((o) => o.id !== id)
              this.items.unshift(Object.assign({}, id ? this.form : rst))
              this.dialogFormVisible = false
              this.$message.success(this.$t('success'))
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    }
  }
}
</script>
