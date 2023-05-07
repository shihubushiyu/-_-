<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/loginPanel.vue'
export default defineComponent({
  components: {
    loginPanel
  },
  setup() {
    return
  }
})
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0) url('../../assets/imgs/loginImg.jpg') no-repeat;
  background-size: cover;
}
</style>
