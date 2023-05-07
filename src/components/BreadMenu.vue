<template>
  <el-tag
    v-for="tag in tabData"
    :key="tag.name"
    class="tags"
    :class="tag.name == $route.name ? 'active' : 'unActive'"
    :closable="tag.name != 'home'"
    @click="tabClick(tag)"
    @close="tabClose(tag)"
  >
    {{ tag.label }}
  </el-tag>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'
import router from '@/router'
import type { childrenData } from '../store/type'
export default defineComponent({
  nmae: 'BreadMenu',
  setup() {
    const mainStore = useMainStore()
    const { tabData } = storeToRefs(mainStore)
    // const tabData = ref<childrenData[]>(cache.getCache('tabData'))
    //给v-model中tabs绑定发的响应式数据，能够获取tab-pane中name属性
    const paneName = ref<string>()

    function tabClose(tag: childrenData) {
      const index = tabData.value.findIndex((i) => i.name == tag.name)
      console.log(index)
      if (index + 1 == tabData.value.length) {
        //如果刚好index+1等于tabData的长度，说明此时点击的是最后一个tab-pane
        router.push({ name: tabData.value[index - 1].name })
        tabData.value = tabData.value.filter((item) => item.name != tag.name)
      } else {
        //
        router.push({ name: tabData.value[index + 1].name })
        tabData.value = tabData.value.filter((item) => item.name != tag.name)
      }
    }
    function tabClick(tag: childrenData) {
      // console.log(tag)
      router.push({ name: tag.name })
    }
    return { tabData, paneName, tabClose, tabClick }
  }
})
</script>

<style lang="less" scoped>
.tags {
  cursor: pointer;
  margin-left: 5px;
  margin-top: 10px;
  &:hover {
    color: blue;
  }
}
.active {
  border: 1px solid blue;
  color: blue;
  background-color: rgba(156, 177, 198, 0.4);
}
</style>
