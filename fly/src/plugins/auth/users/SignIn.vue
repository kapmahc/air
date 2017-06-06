<template>
  <non-sign-in-layout title="auth.users.sign-in.title">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('attributes.email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('attributes.password')" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
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
import {TOKEN} from '@/constants'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        email: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' },
          { type: 'email', message: this.$t('helpers.bad-email'), trigger: 'change' }
        ],
        password: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/users/sign-in', this.form)
            .then(function (rst) {
              var token = rst.token
              sessionStorage.setItem(TOKEN, token)
              this.$store.commit('signIn', token)
              this.$router.push({name: 'site.dashboard'})
              this.$message.success(this.$t('success'))
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
