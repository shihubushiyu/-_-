<template>
  <h1>ChargeAdd</h1>
  <el-table :data="getBedUser" style="width: 100%">
    <el-table-column prop="id" label="日志" width="180" />
    <el-table-column prop="useDrug" label="日志" width="180" />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import rRequest from '../../../service/index'
import { getTableType } from './types'
export default defineComponent({
  nmae: 'ChargeQuery',
  setup() {
    const chargeData = ref<getTableType[]>([])
    onMounted(async () => {
      rRequest.get({ url: '' })
    })
    return { chargeData }
  }
})
</script>

<style></style>
