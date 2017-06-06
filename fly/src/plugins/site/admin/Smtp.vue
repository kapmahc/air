<template>
  <dashboard-layout title="site.admin.smtp.title">
    <el-col :md="{span:16, offset:1}">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('attributes.host')" prop="host">
          <el-input v-model="form.host" />
        </el-form-item>
        <el-form-item :label="$t('attributes.port')">
          <el-select v-model="form.port">
            <el-option :key="p" :label="p" :value="p" v-for="p in ports" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('attributes.ssl')">
          <el-switch v-model="form.ssl" />
        </el-form-item>
        <el-form-item :label="$t('site.admin.smtp.sender')" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item :label="$t('attributes.password')" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item :label="$t('attributes.passwordConfirmation')" prop="passwordConfirmation">
          <el-input type="password" v-model="form.passwordConfirmation" />
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
        host: '',
        username: '',
        port: 25,
        ssl: false,
        password: '',
        passwordConfirmation: ''
      },
      ports: []
    }
  },
  created () {
    get('/admin/site/smtp').then((rst) => {
      this.form = rst.smtp
      this.ports = rst.ports
    }).catch(this.$message.error)
  },
  computed: {
    rules () {
      return {
        email: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' },
          { type: 'email', message: this.$t('helpers.bad-email'), trigger: 'change' }
        ],
        name: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/admin/site/smtp', this.form)
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
