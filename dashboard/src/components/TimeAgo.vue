<template>
  <span>{{value}}</span>
</template>

<script>
import timeago from 'timeago.js'

var timeagoInstance = timeago()

export default {
  props: {
    date: {
      type: String
    }
  },
  computed: {
    value () {
      return timeagoInstance.format(this.date)
    }
  }
}
</script>
