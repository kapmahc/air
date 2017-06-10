<template>
  <dashboard-layout :title="id ? 'buttons.edit' : 'buttons.new'" admin>
    <el-col :md="{span: 16, offset: 4}">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('attributes.title')" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item :label="$t('attributes.body')" prop="body">
          <el-input type="textarea" v-model="form.body" />
          <span>{{$t('helpers.markdown')}}</span>
        </el-form-item>
        <el-form-item :label="$t('attributes.shutDown')" prop="deadline">
          <el-date-picker
            v-model="form.deadline"
            type="date"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <div :key="i" v-for="(f, i) in form.fields">
          <h4>{{$t('forms.attributes.form.fields')}} {{i}}</h4>
          <el-form-item :label="$t('attributes.type')" :prop="'fields.' + i + '.type'">
            <el-select v-model="f.type">
              <el-option :key="v" :label="v" :value="v" v-for="v in ['text', 'email', 'checkboxs', 'radios']" />
            </el-select>
          </el-form-item>
          <el-form-item
              :label="$t('attributes.name')"
              :prop="'fields.' + i + '.name'"
              :rules="not_empty"
              >
              <el-input v-model="f.name" />
          </el-form-item>
          <el-form-item
              :label="$t('attributes.default')"
              :prop="'fields.' + i + '.value'"
              >
              <el-input v-model="f.value" />
          </el-form-item>
          <el-form-item
              :label="$t('attributes.label')"
              :prop="'fields.' + i + '.label'"
              :rules="not_empty"
              >
              <el-input v-model="f.label" />
          </el-form-item>
          <el-form-item
              :label="$t('attributes.content')"
              :prop="'fields.' + i + '.body'"
              >
              <el-input type="textarea" v-model="f.body" />
              <span>{{$t('helpers.one-record-per-line')}}</span>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click.prevent="removeField(f)">{{$t('buttons.remove')}}</el-button>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="addField">{{$t('forms.index.add-field')}}</el-button>
          <el-button type="primary" @click="handleSubmit('form')">{{$t("buttons.submit")}}</el-button>
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
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      form: {
        title: '',
        body: '',
        deadline: '',
        fields: []
      },
      title: ''
    }
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
    rules () {
      return {
        title: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        body: [
          { required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ],
        deadline: [
          { type: 'date', required: true, message: this.$t('helpers.not-empty'), trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.id) {
      get(`/forms/models/${this.id}`).then((rst) => {
        this.form = Object.assign({}, rst, {deadline: new Date(rst.deadline)})
      }).catch(this.$message.error)
    }
  },
  methods: {
    addField () {
      this.form.fields.push({name: '', type: 'text', body: '', label: ''})
    },
    removeField (item) {
      var idx = this.form.fields.indexOf(item)
      if (idx !== -1) {
        this.form.fields.splice(idx, 1)
      }
    },
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(this.id ? `/forms/models/${this.id}` : '/forms/models', Object.assign({}, this.form, {type: 'markdown'}))
            .then(function (rst) {
              this.$message.success(this.$t('success'))
              this.$router.push({name: 'forms.index'})
            }.bind(this)).catch(this.$message.error)
        } else {
          return false
        }
      })
    }
  }
}
</script>
