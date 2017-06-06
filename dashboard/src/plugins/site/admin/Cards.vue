<template>
  <dashboard-layout title="site.admin.cards.index.title" admin>
    <el-col :md="{span: 22, offset: 1}">
      <el-dialog :title="$t('buttons.edit')" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('attributes.loc')">
          <el-select v-model="form.loc">
            <el-option :key="i" :label="i" :value="i" v-for="i in ['top', 'middle', 'bottom']" />
          </el-select>
        </el-form-item>
          <el-form-item :label="$t('attributes.title')" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item :label="$t('attributes.summary')" prop="summary">
            <el-input type="textarea" v-model="form.summary" />
            <span>{{$t('helpers.markdown')}}</span>
          </el-form-item>
          <el-form-item :label="$t('attributes.href')" prop="href">
            <el-input v-model="form.href" />
          </el-form-item>
          <el-form-item :label="$t('attributes.logo')" prop="logo">
            <el-input v-model="form.logo" />
          </el-form-item>
          <el-form-item :label="$t('attributes.sortOrder')">
            <el-select v-model="form.sortOrder">
              <el-option :key="i" :label="i" :value="i" v-for="i in 10" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t("buttons.cancel")}}</el-button>
          <el-button type="primary" @click="handleSave('form')">{{$t("buttons.ok")}}</el-button>
        </div>
      </el-dialog>

      <el-button @click="handleEdit(null)" type="info" size="mini" icon="plus"/>

      <el-table :data="items" border stripe style="width: 100%;">
        <el-table-column width="120" prop="loc" :label="$t('attributes.loc')" />
        <el-table-column width="120" prop="sortOrder" :label="$t('attributes.sortOrder')" />
        <el-table-column :label="$t('attributes.content')">
          <template scope="scope">
            <h3>
              {{scope.row.title}}
              <a :href="scope.row.href" target="_blank">
                {{scope.row.action}}
              </a>
            </h3>
            <img :src="{{scope.row.logo}}"/>
            <pre><code>{{scope.row.summary}}</code></pre>
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
    get('/cards').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: [],
      form: {
        title: '',
        href: '',
        summary: '',
        type: '',
        logo: '',
        loc: '',
        sortOrder: 0
      },
      dialogFormVisible: false
    }
  },
  computed: {
    rules () {
      return {
        label: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        href: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleEdit (form) {
      this.form = form || {title: '', logo: '', summary: '', type: '', href: '', loc: 'top', sortOrder: 5}
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
        _delete(`/cards/${id}`).then(function (rst) {
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
          post(id ? `/cards/${id}` : '/cards', this.form)
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
