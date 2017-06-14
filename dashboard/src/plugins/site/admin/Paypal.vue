<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-textarea
        required
        :title="$t('site.admin.paypal.donate-form')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.donate" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </dashboard-layout>
</template>

<script>
import { Group, Box, XInput, XTextarea, XButton } from 'vux'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    XTextarea
  },
  created () {
    get('/admin/paypal').then((rst) => { this.form = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        donate: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/admin/paypal', this.form)
      .then(res => success(this))
      .catch(err => fail(this, err))
    }
  }
}
</script>
