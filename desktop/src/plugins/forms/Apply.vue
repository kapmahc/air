<template>
  <application-layout>
    <el-row>
      <el-col :md="{span: 16, offset: 4}">
        <h3>{{title}}</h3>
        <md2ht :body="body" />
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item :label="$t('attributes.email')" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item :label="$t('attributes.fullName')" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item :label="$t('attributes.phone')" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item
            :label="f.label"
            :key="i"
            :prop="'fields.' + i + '.value'"
            v-for="(f, i) in form.fields"
            :rules="f.type === 'checkboxs' ? array_empty : not_empty"
            >
            <el-checkbox-group v-if="f.type === 'checkboxs'" v-model="f.value">
              <el-checkbox :key="j" v-for="(it, j) in f.body" :label="it" />
            </el-checkbox-group>
            <el-radio-group v-else-if="f.type === 'radios'" v-model="f.value">
              <el-radio :key="j" v-for="(it, j) in f.body" :label="it" />
            </el-radio-group>
            <el-input v-else :prop="'fields.' + i + '.value'" v-model="f.value" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit('form')">{{$t("buttons.apply")}}</el-button>
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
        username: '',
        email: '',
        phone: '',
        fields: []
      }
    }
  },
  created () {
    get(`/forms/${this.id}`).then((rst) => {
      this.title = rst.title
      this.body = rst.body
      this.form.fields = rst.fields.map((f) => {
        switch (f.type) {
          case 'checkboxs':
            return Object.assign({}, f, {value: f.value.split('\n'), body: f.body.split('\n')})
          case 'radios':
            return Object.assign({}, f, {body: f.body.split('\n')})
          default:
            return f
        }
      })
    }).catch(this.$message.error)
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    not_empty () {
      return {
        required: true, message: this.$t('helpers.not-empty')
      }
    },
    array_empty () {
      return {
        type: 'array', required: true, message: this.$t('helpers.not-empty')
      }
    },
    rules () {
      return {
        email: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' },
          { type: 'email', message: this.$t('helpers.bad-email'), trigger: 'change' }
        ],
        username: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        phone: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var records = this.form.fields.map((f) => {
            switch (f.type) {
              case 'checkboxs':
                return Object.assign({}, f, {value: f.value.join('\n')})
              default:
                return f
            }
          })
          post(`/forms/${this.id}/apply`, Object.assign({}, this.form, {records}))
            .then(function (rst) {
              this.$message.success(this.$t('forms.messages.apply-success'))
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    }
  }
}
</script>
