<template>
  <non-sign-in-layout title="site.leave-words.new.title">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('attributes.content')" prop="body">
        <el-input type="textarea" v-model="form.body"></el-input>
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
        body: ''
      }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/leave-words', Object.assign(this.form, {type: 'text'}))
            .then(function (rst) {
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
