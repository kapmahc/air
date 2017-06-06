<template>
  <el-menu theme="dark" mode="horizontal" @select="handleSelect">
    <el-menu-item index="to-site.home">{{$t("site.subTitle")}}</el-menu-item>
    <LanguageBar />
    <PersonalBar />
  </el-menu>
</template>

<script>
import PersonalBar from './PersonalBar'
import LanguageBar from './LanguageBar'

export default {
  data () {
    return {
    }
  },
  components: {
    PersonalBar,
    LanguageBar
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key.startsWith('to-')) {
        this.$router.push({name: key.substring(3)})
      }
    }
  }
}
</script>
