<template>
  <!-- <div class="notFount">
    <h1>404界面未找到</h1>
  </div> -->
  <el-empty :image-size="200" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  nmae: 'BetAdd',
  setup() {
    return
  }
})
</script>

<style lang="less" scoped>
.notFount {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.el-empty {
  height: 100vh;
}
</style>
