<template>
  <dashboard-layout>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        type="password"
        :title="$t('attributes.password')"
        :placeholder="$t('placeholders.password')"
        v-model="form.password" />
      <x-input
        type="password"
        :title="$t('attributes.passwordConfirmation')"
        :placeholder="$t('placeholders.passwordConfirmation')"
        v-model="form.passwordConfirmation" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </dashboard-layout>
</template>

<script>
import { Group, Box, XInput, XButton } from 'vux'
import { post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      form: {
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/users/reset-password', Object.assign({}, this.form, {token: this.$route.params.token}))
      .then(res => {
        this.$router.push({name: 'auth.users.sign-in'})
        success(this, this.$t('auth.users.reset-password.success'))
      })
      .catch(err => fail(this, err))
    }
  }
}
</script>
