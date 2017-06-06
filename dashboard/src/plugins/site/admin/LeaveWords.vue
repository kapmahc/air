<template>
  <dashboard-layout title="site.admin.locales.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-dialog :title="$t('buttons.edit')" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item :label="$t('site.attributes.locale.code')" prop="code">
            <el-input v-model="form.code" />
          </el-form-item>
          <el-form-item :label="$t('site.attributes.locale.message')" prop="message">
            <el-input v-model="form.message" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t("buttons.cancel")}}</el-button>
          <el-button type="primary" @click="handleSave('form')">{{$t("buttons.ok")}}</el-button>
        </div>
      </el-dialog>

      <el-button @click="handleEdit(null)" type="info" size="mini" icon="plus"/>

      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column width="320" prop="code" :label="$t('site.attributes.locale.code')" />
        <el-table-column prop="message" :label="$t('site.attributes.locale.message')" />
        <el-table-column width="80" :label="$t('buttons.manage')">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleEdit(scope.row)" type="info" size="mini" icon="edit" />
              <el-button @click="handleRemove(scope.row.code)" type="danger" size="mini" icon="delete" />
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
    get('/admin/locales').then((rst) => { this.items = Object.entries(rst).map((v) => { return { code: v[0], message: v[1] } }) }).catch(this.$message.error)
  },
  data () {
    return {
      items: [],
      form: {
        code: '',
        message: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    rules () {
      return {
        code: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        message: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleEdit (form) {
      this.form = form || {code: '', message: ''}
      this.dialogFormVisible = true
    },
    handleRemove (code) {
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
        _delete(`/admin/locales/${code}`).then(function (rst) {
          this.$message.success('success')
          this.items = this.items.filter((o) => o.code !== code)
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    },
    handleSave (formName) {
      this.$refs[formName].validate((valid) => {
        const code = this.form.code
        if (valid) {
          post('/admin/locales', this.form)
            .then(function (rst) {
              this.items = this.items.filter((o) => o.code !== code)
              this.items.unshift(Object.assign({}, this.form))
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
