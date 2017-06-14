<template>
  <p v-html="value"/>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    body: {
      type: String
    }
  },
  computed: {
    value () {
      return marked(this.body)
    }
  }
}
</script>
