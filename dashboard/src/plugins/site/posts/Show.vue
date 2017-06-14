<template>
  <group :title="item.title">
    <cell-box>
      <md2ht :body="item.body"/>
    </cell-box>
  </group>
</template>

<script>
import { Group, CellBox, Box } from 'vux'
import { get, fail } from '@/ajax'

export default {
  components: {
    Group,
    CellBox,
    Box
  },
  data () {
    return {
      item: {
        name: '',
        title: '',
        body: ''
      }
    }
  },
  created () {
    var name = this.$route.params.name
    if (name) {
      get(`/posts/0?name=${name}`)
        .then((rst) => { this.item = rst })
        .catch((err) => fail(this, err))
    }
  }
}
</script>
