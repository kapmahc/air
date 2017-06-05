<template>
  <non-sign-in-layout title="site.leave-words.new.title">
    <form>
      <div class="form-group">
        <label>{{$t('attributes.body')}}</label>
        <b-form-input textarea v-model="body" :rows="6" />
        <small class="form-text text-muted">{{$t('site.helpers.leave-word.body')}}</small>
      </div>
      <b-button v-on:click="onSubmit" variant="primary">{{$t('buttons.submit')}}</b-button>
    </form>
  </non-sign-in-layout>
</template>

<script>
import {post} from '@/ajax'

export default {
  props: ['action'],
  data () {
    return {
      body: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      var data = new URLSearchParams()
      data.append('body', this.body)
      data.append('type', 'text')
      post('/leave-words', data)
        .then(function (rst) {
          alert(this.$t('success'))
          this.body = ''
        }.bind(this)).catch(alert)
    }
  }
}
</script>
