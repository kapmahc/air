<template>
  <group :title="item.updatedAt">
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
        body: ''
      }
    }
  },
  created () {
    var id = this.$route.params.id
    get(`/notices/${id}`)
      .then((rst) => { this.item = rst })
      .catch((err) => fail(this, err))
  }
}
</script>
