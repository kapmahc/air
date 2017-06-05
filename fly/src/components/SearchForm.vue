<template>
  <form class="form-inline mt-2 mt-md-0">
    <input class="form-control mr-sm-2" type="text" :placeholder="$t('hints.search')">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">{{$t('buttons.search')}}</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
