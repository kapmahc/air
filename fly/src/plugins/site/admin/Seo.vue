<template>
  <dashboard-layout title="site.admin.seo.title">
    <el-col :md="{span:16, offset:1}">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('site.admin.seo.googleVerifyCode')" prop="googleVerifyCode">
          <el-input v-model="form.googleVerifyCode" />
        </el-form-item>
        <el-form-item :label="$t('site.admin.seo.baiduVerifyCode')" prop="baiduVerifyCode">
          <el-input v-model="form.baiduVerifyCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">{{$t("buttons.submit")}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :md="{span:16, offset:3}">
      <ul class="list-group">
        <li :key="i" v-for="(l, i) in links">
          <a :href="`/${l}`" target="_blank">{{l}}</a>
        </li>
      </ul>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get, post} from '@/ajax'
import {LANGUAGES} from '@/i18n'

export default {
  data () {
    return {
      form: {
        googleVerifyCode: '',
        baiduVerifyCode: ''
      }
    }
  },
  created () {
    get('/admin/site/seo').then((rst) => { this.form = rst }).catch(this.$message.error)
  },
  computed: {
    rules () {
      return {
      }
    },
    links () {
      return [
        'robots.txt',
        'sitemap.xml.gz',
        `google${this.form.googleVerifyCode}.html`,
        `baidu_verify_${this.form.baiduVerifyCode}.html`
      ].concat(LANGUAGES.map((l) => `rss-${l}.atom`))
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/admin/site/seo', this.form)
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
