<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        required
        :title="$t('attributes.host')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.host" />
      <selector :title="$t('attributes.port')" :options="ports" v-model="form.port" />
      <x-switch :title="$t('attributes.ssl')" v-model="form.ssl" />
      <x-input
        type="password"
        :title="$t('attributes.password')"
        :placeholder="$t('placeholders.not-empty')"
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
import { Group, Box, XSwitch, XInput, XButton, Selector } from 'vux'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Selector,
    XSwitch,
    Box
  },
  created () {
    get('/admin/site/smtp').then((rst) => {
      this.form = rst.smtp
      this.ports = rst.ports
    }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        host: '',
        port: 0,
        ssl: false,
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      ports: []
    }
  },
  methods: {
    submitForm () {
      post('/admin/site/smtp', this.form)
      .then(res => success(this))
      .catch(err => fail(this, err))
    }
  }
}
</script>
