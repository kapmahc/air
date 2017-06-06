<template>
  <non-sign-in-layout :title="`auth.users.${action}.title`">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('attributes.email')" prop="email">
        <el-input v-model="form.email" />
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
  props: ['action'],
  data () {
    return {
      form: {
        email: ''
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
          post(`/users/${this.action}`, this.form)
            .then(
              function (rst) {
                this.$message.success(this.$t(`auth.messages.email-for-${this.action}`))
                this.$router.push({name: 'auth.users.sign-in'})
              }.bind(this)
            ).catch(this.$message.error)
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
