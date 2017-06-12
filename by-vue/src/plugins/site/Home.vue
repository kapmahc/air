<template>
  <application-layout>
    <el-carousel :interval="5000" type="card" arrow="always">
      <el-carousel-item v-for="(o, i) in info.cards.filter((c) => c.loc === 'carousel')" :key="i">
        <a :href="o.href" target="_blank"><img :src="o.logo"/></a>
      </el-carousel-item>
    </el-carousel>
    <el-row style="padding: 16px" v-for="(o, i) in info.cards.filter((c) => c.loc === 'zone')" :key="i">
      <hr class="line" />
      <el-col v-if="i%2 === 0" :md="{span: 12, offset: 1}">
        <a :href="o.href" target="_blank">{{o.title}}</a>
        <md2ht :body="o.summary" />
      </el-col>
      <el-col v-else :md="{span: 9, offset: 1}">
        <img :src="o.logo" class="zone"/>
      </el-col>

      <el-col v-if="i%2 === 0" :md="{span: 9, offset: 1}">
        <img :src="o.logo" class="zone"/>
      </el-col>
      <el-col v-else :md="{span: 12, offset: 1}">
        <a :href="o.href" target="_blank">{{o.title}}</a>
        <md2ht :body="o.summary" />
      </el-col>
    </el-row>
  </application-layout>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    info () {
      return this.$store.state.siteInfo
    }
  }
}
</script>

<style scoped>
  img.zone {
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
