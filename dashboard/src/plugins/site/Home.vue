<template>
  <div>
    <div
      :key="i"
      v-for="(c, i) in items">
      <divider>{{c.title}}</divider>
      <card>
        <img slot="header" :src="c.logo" />
        <div slot="content" class="card-padding">
          <p style="color:#999;font-size:12px;">
            <time-ago :date="c.updatedAt" />
          </p>
          <p style="font-size:14px;line-height:1.2;">
            <md2ht :body="c.summary"/>
          </p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
// <panel :header="$t('site.menus.title')" :list="items" type="1" />

import { Grid, GridItem, Divider, GroupTitle, Panel, Card } from 'vux'
import { mapState } from 'vuex'
// import marked from 'marked'

export default {
  components: {
    Divider,
    Grid,
    GridItem,
    GroupTitle,
    Panel,
    Card
  },
  computed: {
    ...mapState({
      items: state => state.siteInfo ? state.siteInfo.cards : []
      // items: state => state.siteInfo ? state.siteInfo.cards.map((c) => {
      //   return {
      //     src: c.logo,
      //     title: c.title,
      //     desc: marked(c.summary),
      //     url: c.href
      //   }
      // }) : []
    })
  }
}
</script>
