<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        required
        :title="$t('attributes.loc')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.loc" />
      <x-input
        required
        :title="$t('attributes.href')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.href" />
      <x-input
        required
        :title="$t('attributes.logo')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.logo" />
      <x-input
        required
        :title="$t('attributes.title')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.title" />
      <x-textarea
        required
        :title="$t('attributes.summary')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.summary" />
      <x-input
        required
        :title="$t('attributes.action')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.action" />
      <selector :title="$t('attributes.sortOrder')" :options="orders" v-model="form.sortOrder" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </dashboard-layout>
</template>

<script>
import { Group, Box, XInput, XTextarea, Selector, XButton } from 'vux'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    Selector,
    XTextarea
  },
  data () {
    return {
      form: {
        title: '',
        summary: '',
        logo: '',
        action: '',
        href: '',
        loc: '',
        sortOrder: 0
      }
    }
  },
  methods: {
    submitForm () {
      var id = this.$route.params.id
      post(id ? `/cards/${id}` : '/cards', Object.assign({}, this.form, {type: 'markdown'}))
      .then(res => {
        success(this)
        this.$router.push({name: 'site.cards.index'})
      })
      .catch(err => fail(this, err))
    }
  },
  created () {
    var id = this.$route.params.id
    if (id) {
      get(`/cards/${id}`)
        .then((rst) => { this.form = rst })
        .catch((err) => fail(this, err))
    }
  },
  computed: {
    orders () {
      return Array.from(new Array(21), (x, i) => i - 10)
    }
  }
}
</script>
