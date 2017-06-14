<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        :title="$t('attributes.email')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.email" />
      <x-input
        required
        :title="$t('attributes.username')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.name" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </dashboard-layout>
</template>

<script>
import { Group, Box, XInput, XButton } from 'vux'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  created () {
    get('/site/info').then((rst) => { this.form = rst.author }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/admin/site/author', this.form)
      .then(res => success(this))
      .catch(err => fail(this, err))
    }
  }
}
</script>
