<template>
  <group
    :title="$t('site.posts.index.title')"
  >
    <cell
      :key="i"
      :title="l.title"
      :link="{name: 'site.posts.show', params: {name: l.name}}"
      v-for="(l, i) in items"/>
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
    get('/posts')
        .then((rst) => { this.items = rst })
        .catch((err) => fail(this, err))
  }
}
</script>
