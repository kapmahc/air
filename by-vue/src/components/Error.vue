<template>
  <el-card>
    <img src="../assets/fail.png" style="width: 100%;">
    <div>
      <h2>{{title}}</h2>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['title', 'body']
}
</script>
