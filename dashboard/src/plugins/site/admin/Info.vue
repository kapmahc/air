<template>
  <dashboard-layout title="site.admin.info.title" admin>
    <el-col :md="{span:16, offset:1}">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('site.attributes.title')" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item :label="$t('site.attributes.subTitle')" prop="subTitle">
          <el-input v-model="form.subTitle" />
        </el-form-item>
        <el-form-item :label="$t('site.attributes.keywords')" prop="keywords">
          <el-input v-model="form.keywords" />
        </el-form-item>
        <el-form-item :label="$t('site.attributes.description')" prop="description">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>
        <el-form-item :label="$t('site.attributes.copyright')" prop="copyright">
          <el-input v-model="form.copyright" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">{{$t("buttons.submit")}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get, post} from '@/ajax'

export default {
  data () {
    return {
      form: {
        title: '',
        subTitle: '',
        keywords: '',
        description: '',
        copyright: ''
      }
    }
  },
  created () {
    get('/site/info').then((rst) => { this.form = rst }).catch(this.$message.error)
  },
  computed: {
    rules () {
      return {
        title: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        subTitle: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        keywords: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        description: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        copyright: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/admin/site/info', this.form)
            .then(function (rst) {
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
