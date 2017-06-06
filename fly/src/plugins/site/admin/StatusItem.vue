<template>
  <el-col :md="{span: 10, offset: 1}">
    <h4>{{$t(`site.admin.status.${action}`)}}</h4>
    <el-table :data="items" border stripe style="width: 100%">
      <el-table-column width="120" prop="key" label="KEY" />
      <el-table-column prop="val" label="VALUE" />
    </el-table>
  </el-col>
</template>

<script>

export default {
  props: {
    value: {
      type: Object
    },
    action: {
      type: String
    }
  },
  computed: {
    items () {
      return Object.entries(this.value).map((v) => {
        return {key: v[0], val: v[1]}
      })
    }
  }
}
</script>
