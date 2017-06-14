<template>
  <div>
    <group :title="$t('site.about.title')">
      <cell
        :key="i"
        :link="{name: 'site.posts.show', params:{name: l}}"
        :title="$t('site.about.'+l)"
        v-for="(l, i) in items"/>
    </group>
    <group-title>{{$t('site.about.donates')}}</group-title>
    <grid :rows="2">
      <grid-item>
        <span
          :key="i"
          v-html="d"
          v-for="(d, i) in donates"
         />
      </grid-item>
    </grid>
    <group-title>{{$t('site.about.friend-links')}}</group-title>
    <grid>
      <grid-item
        :key="i"
        v-for="(l, i) in friendLinks">
        <a :href="l.home" target="_blank">
         <img width="100%" :src="l.logo" :alt="l.title" />
        </a>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Cell, Group, Grid, GridItem, GroupTitle } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Cell,
    Group,
    Grid,
    GridItem,
    GroupTitle
  },
  data () {
    return {
      items: ['contact', 'faq', 'about']
    }
  },
  computed: {
    ...mapState({
      donates: state => state.siteInfo ? state.siteInfo.donates : [],
      friendLinks: state => state.siteInfo ? state.siteInfo.friendLinks : []
    })
  }
}
</script>
