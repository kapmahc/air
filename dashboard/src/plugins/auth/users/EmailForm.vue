<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        :title="$t('attributes.email')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.email" />
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
  props: {
    action: {
      type: String
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  methods: {
    submitForm () {
      post(`/users/${this.action}`, this.form)
      .then(res => {
        this.$router.push({name: 'auth.users.sign-in'})
        success(this, this.$t(`auth.users.${this.action}.success`))
      })
      .catch(err => fail(this, err))
    }
  }
}
</script>
