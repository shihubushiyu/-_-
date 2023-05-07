<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  }
})
</script>

<style lang="less">
body,
html,
#app {
  height: 100%;
}

//对于chrome浏览器隐藏滚动条
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
:root {
  --animate-duration: 50ms;
  // --animate-delay: 0.9s;
}
</style>
