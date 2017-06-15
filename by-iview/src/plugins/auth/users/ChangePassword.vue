<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        type="password"
        :title="$t('attributes.currentPassword')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.currentPassword" />
      <x-input
        type="password"
        :title="$t('attributes.newPassword')"
        :placeholder="$t('placeholders.password')"
        v-model="form.newPassword" />
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
        newPassword: '',
        currentPassword: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/users/change-password', this.form)
      .then(res => {
        success(this)
        this.form = {newPassword: '', currentPassword: '', passwordConfirmation: ''}
      })
      .catch(err => fail(this, err))
    }
  }
}
</script>
