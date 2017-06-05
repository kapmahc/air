<template>
  <non-sign-in-layout title="auth.users.reset-password.title">
    <form>
      <div class="form-group">
        <label>{{$t('attributes.password')}}</label>
        <b-form-input v-model="password" type="password"/>
        <small class="form-text text-muted">{{$t('helpers.password')}}</small>
      </div>
      <div class="form-group">
        <label>{{$t('attributes.passwordConfirmation')}}</label>
        <b-form-input v-model="passwordConfirmation" type="password"/>
        <small class="form-text text-muted">{{$t('helpers.passwordConfirmation')}}</small>
      </div>
      <b-button v-on:click="onSubmit" variant="primary">{{$t('buttons.submit')}}</b-button>
    </form>
  </non-sign-in-layout>
</template>

<script>
import {post} from '@/ajax'

export default {
  data () {
    return {
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      var data = new URLSearchParams()
      data.append('token', this.$route.params.token)
      data.append('password', this.password)
      data.append('passwordConfirmation', this.passwordConfirmation)
      post('/users/reset-password', data)
        .then(function (rst) {
          alert(this.$t('auth.messages.reset-password-success'))
          this.$router.push({name: 'auth.users.sign-in'})
        }.bind(this)).catch(alert)
    }
  }
}
</script>
