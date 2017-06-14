<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        required
        :title="$t('attributes.name')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.title" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </div>
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
    get(`/attachments/${this.id}`).then((rst) => { this.form = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        title: ''
      }
    }
  },
  methods: {
    submitForm () {
      post(`/attachments/${this.id}`, this.form)
      .then(res => {
        success(this)
        this.$router.push({name: 'auth.attachments.index'})
      })
      .catch(err => fail(this, err))
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  }
}
</script>
