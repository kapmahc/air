<template>
  <non-sign-in-layout title="site.install.title">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('site.attributes.title')" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('site.attributes.subTitle')" prop="subTitle">
        <el-input v-model="form.subTitle"></el-input>
      </el-form-item>
      <el-form-item :label="$t('attributes.email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('attributes.password')" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('attributes.passwordConfirmation')" prop="passwordConfirmation">
        <el-input type="password" v-model="form.passwordConfirmation"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">{{$t("buttons.submit")}}</el-button>
        <el-button @click="resetForm('form')">{{$t("buttons.reset")}}</el-button>
      </el-form-item>
    </el-form>
  </non-sign-in-layout>
</template>

<script>
import {post} from '@/ajax'

export default {
  data () {
    return {
      form: {
        title: '',
        subTitle: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    rules () {
      var password2 = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error(this.$i18n.t('helpers.passwordConfirmation')))
        } else {
          callback()
        }
      }
      return {
        email: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' },
          { type: 'email', message: this.$t('helpers.bad-email'), trigger: 'change' }
        ],
        title: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        subTitle: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        password: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' },
            { min: 6, max: 32, message: this.$t('helpers.password'), trigger: 'change' }
        ],
        passwordConfirmation: [
          { required: true, message: this.$i18n.t('helpers.not-empty'), trigger: 'change' },
          { validator: password2, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/install', this.form)
            .then(function (rst) {
              this.$message.success(this.$t('success'))
              this.$router.push({name: 'auth.users.sign-in'})
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
