<template>
  <div>
    <p>Hello</p>
    {{$t('home.title')}}

    <router-link :to="{name:'site.dashboard'}">Go to Bar</router-link>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
