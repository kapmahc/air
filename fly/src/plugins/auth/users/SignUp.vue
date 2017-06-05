<template>
  <non-sign-in-layout title="auth.users.sign-up.title">
    <form>
      <div class="form-group">
        <label>{{$t('attributes.fullName')}}</label>
        <b-form-input v-model="name" type="text"/>
      </div>
      <div class="form-group">
        <label for="email">{{$t('attributes.email')}}</label>
        <b-form-input v-model="email" type="email"/>
        <small class="form-text text-muted">{{$t('helpers.email')}}</small>
      </div>
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
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      var data = new URLSearchParams()
      data.append('email', this.email)
      data.append('name', this.name)
      data.append('password', this.password)
      data.append('passwordConfirmation', this.passwordConfirmation)
      post('/users/sign-up', data)
        .then(function (rst) {
          alert(this.$t('auth.messages.email-for-confirm'))
          this.$router.push({name: 'auth.users.sign-in'})
        }.bind(this)).catch(alert)
    }
  }
}
</script>
