<template>
  <application-layout>
    <el-row>
      <el-col :md="{span: 16, offset: 4}">
        <h3>{{title}}</h3>
        <md2ht :body="body" />
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item :label="$t('forms.attributes.form.phone-or-email')" prop="who">
            <el-input v-model="form.who" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit('form')">{{$t("buttons.cancel")}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </application-layout>
</template>

<script>
import {get, post} from '@/ajax'

export default {
  data () {
    return {
      title: '',
      body: '',
      form: {
        who: ''
      }
    }
  },
  created () {
    get(`/forms/${this.id}`).then((rst) => {
      this.title = rst.title
      this.body = rst.body
    }).catch(this.$message.error)
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    rules () {
      return {
        who: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(`/forms/${this.id}/cancel`, this.form)
            .then(function (rst) {
              this.$message.success(this.$t('forms.messages.cancel-success'))
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    }
  }
}
</script>
