<template>
  <i :class="`fa fa-${name}`" aria-hidden="true"></i>
</template>

<script>

export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>
