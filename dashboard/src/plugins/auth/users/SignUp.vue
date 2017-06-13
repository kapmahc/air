<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        :title="$t('attributes.username')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.name" />
      <x-input
        :title="$t('attributes.email')"
        :placeholder="$t('placeholders.email')"
        v-model="form.email" />
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
  </div>
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
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    submitForm () {
      let that = this
      post('/users/sign-up', this.form)
      .then(res => {
        that.$router.push({name: 'auth.users.sign-in'})
        success(that)
      })
      .catch(err => fail(that, err))
    }
  }
}
</script>
