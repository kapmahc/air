<template>
  <dashboard-layout title="site.admin.paypal.title" admin>
    <el-col :md="{span:16, offset:1}">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('site.admin.paypal.donate')" prop="donate">
          <el-input type="textarea" v-model="form.donate" />
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
        donate: ''
      }
    }
  },
  created () {
    get('/admin/paypal').then((rst) => { this.form = rst }).catch(this.$message.error)
  },
  computed: {
    rules () {
      return {
        donate: [

        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/admin/paypal', this.form)
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
