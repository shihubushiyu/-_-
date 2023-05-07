<template>
  <el-table :data="chargeQueryData" style="width: 100%" show-summary border sum-text="￥合计" stripe class="table">
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="useDrug" label="用药" width="300" />
    <el-table-column prop="DateDrug" label="用药时间" width="300" sortable />
    <el-table-column prop="money" label="价格(元)" sortable />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import rRequest from '../../../service/index'
import type { bedDataInterface } from './types'
import { useMainStore } from '../../../store'
import { storeToRefs } from 'pinia'

export default defineComponent({
  nmae: 'ChargeQuery',
  setup() {
    const route = useRoute()
    const data = ref<bedDataInterface[]>([])

    const mainStore = useMainStore()
    const { chargeQueryData } = storeToRefs(mainStore)
    onMounted(async () => {
      // console.log('@@@', route.params)
      const resp = await rRequest.post<bedDataInterface[]>({
        url: '/detailPatient',
        data: route.params
      })
      resp.forEach((element) => {
        element.DateDrug = element.DateDrug.slice(0, 16)
      })
      // console.log('@@@@@@@@@@@@@@@', resp)
      if (resp.length > 0) {
        //如果resp数组长度大于零 缓存，否则不缓存
        mainStore.setBedQuery(resp)
      }
    })
    return {
      data,
      chargeQueryData
    }
  }
})
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
}
</style>
