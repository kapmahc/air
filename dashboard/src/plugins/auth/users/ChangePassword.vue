<template>
  <dashboard-layout title="auth.users.change-password.title">
    <el-col :md="{span:16, offset:1}">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('attributes.currentPassword')" prop="currentPassword">
          <el-input type="password" v-model="form.currentPassword" />
        </el-form-item>
        <el-form-item :label="$t('attributes.newPassword')" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" />
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
import {post} from '@/ajax'

export default {
  data () {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    rules () {
      var password2 = (rule, value, callback) => {
        if (value !== this.form.newPassword) {
          callback(new Error(this.$i18n.t('helpers.passwordConfirmation')))
        } else {
          callback()
        }
      }
      return {
        currentPassword: [
            { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        newPassword: [
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
          post('/users/change-password', this.form)
            .then(function (rst) {
              this.$message.success(this.$t('success'))
              this.$refs[formName].resetFields()
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    }
  }
}
</script>
