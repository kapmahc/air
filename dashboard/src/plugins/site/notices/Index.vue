<template>
  <group
    :title="$t('site.posts.index.title')"
  >
    <cell
      :key="i"
      :title="l.body.substring(0, 20)"
      :link="{name: 'site.notices.show', params: {id: l.id}}"
      v-for="(l, i) in items">
      <time-ago :date="l.updatedAt"/>
    </cell>
  </group>
</template>

<script>
import { Group, Cell } from 'vux'
import { get, fail } from '@/ajax'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    get('/notices')
        .then((rst) => { this.items = rst })
        .catch((err) => fail(this, err))
  }
}
</script>
