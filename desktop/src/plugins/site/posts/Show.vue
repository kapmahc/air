<template>
  <group :title="item.title">
    <cell-box>
      <md2ht :body="item.body"/>
    </cell-box>
  </group>
</template>

<script>
import { Group, CellBox } from 'vux'
import { get, fail } from '@/ajax'

export default {
  components: {
    Group,
    CellBox
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
    get(`/posts/0?name=${name}`)
        .then((rst) => { this.item = rst })
        .catch((err) => fail(this, err))
  }
}
</script>
