<template>
<non-sign-in-layout title="auth.users.sign-in.title">
  <form>
    <div class="form-group">
      <label>{{$t('attributes.email')}}</label>
      <b-form-input v-model="email" type="email"/>
    </div>
    <div class="form-group">
      <label>{{$t('attributes.password')}}</label>
      <b-form-input v-model="password" type="password"/>
    </div>
    <b-button v-on:click="onSubmit" variant="primary">{{$t('buttons.submit')}}</b-button>
  </form>
</non-sign-in-layout>
</template>

<script>
import {post} from '@/ajax'
import {TOKEN} from '@/constants'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      var data = new URLSearchParams()
      data.append('email', this.email)
      data.append('password', this.password)
      post('/users/sign-in', data)
        .then(function (rst) {
          var token = rst.token
          sessionStorage.setItem(TOKEN, token)
          this.$store.commit('signIn', token)
          this.$router.push({name: 'site.dashboard'})
        }.bind(this)).catch(alert)
    }
  }
}
</script>
