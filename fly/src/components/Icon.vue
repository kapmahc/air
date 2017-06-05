<template>
  <i :class="`fa fa-${name} ${size ? 'fa'+size : ''}`"></i>
</template>

<script>
export default {
  props: ['name', 'size']
}
</script>
