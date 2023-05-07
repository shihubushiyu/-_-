<template>
  <div class="common-layout">
    <el-container class="mainContent">
      <el-aside :width="'atuo'" class="contentAside"><AsideMenu /></el-aside>
      <el-container class="page">
        <el-header class="pageHeader" height="40px"><NavHeader /></el-header>
        <el-main class="pageMain">
          <BreadMenu />
          <!-- <router-view v-slot="{ Component }">
            <Transition enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
              <component :is="Component"></component>
            </Transition>
          </router-view> -->
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import AsideMenu from '../../components/AsideMenu.vue'
import NavHeader from '../../components/NavHeader.vue'
import BreadMenu from '../../components/BreadMenu.vue'
import { useMainStore } from '../../store/index'
import { storeToRefs } from 'pinia'
import 'animate.css'
export default {
  components: {
    AsideMenu,
    NavHeader,
    BreadMenu
  },
  setup() {
    const mainStore = useMainStore()
    const { isCollapse } = storeToRefs(mainStore)
    return { isCollapse }
  }
}
</script>
<style lang="less" scoped>
.mainContent {
  .contentAside {
    height: 120vh;
    background: #0c2135;
  }
  .page {
    .pageHeader {
      background: #0c2135;
      border-bottom: 1px solid #409eff;
    }
    .pageMain {
      padding: 0;
    }
  }
}
// .main-enter-from .main-leave-to {
//   opacity: 0;
// }
// .main-enter-to .main-leave-from {
//   opacity: 1;
// }
// .main-enter-active {
//   animation: animate__fadeIn 2s;
// }
// .main-leave-active {
//   animation: animate__fadeOut 2s;
// }
</style>
