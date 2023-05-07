<template>
  <div class="asideMenu">
    <h4 class="title">
      <el-icon class="titleIcon" size="18px" style="position: relative; top: 0.5px; margin: 0 0 0 0"
        ><Notification />
      </el-icon>
      <Transition name="title">
        <span v-if="!isCollapse">住院管理系统</span>
      </Transition>
    </h4>
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="white"
      active-text-color="#0a60bd"
    >
      <el-sub-menu :index="menu.label" v-for="menu in menuData" :key="menu.label">
        <template #title>
          <el-icon><component :is="menu.icon"></component></el-icon>
          <span>{{ menu.label }}</span>
        </template>

        <el-menu-item
          class="ItemStyle"
          :index="menuItem.label"
          v-for="menuItem in menu.children"
          :key="menuItem.label"
          @click="clickMenuItem(menuItem)"
          style="padding-left: 30px"
          :disabled="menuItem.label == '收费信息查询'"
        >
          <el-icon size="13"><component :is="menuItem.icon"></component></el-icon>
          {{ menuItem.label }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../store/index'
import type { childrenData } from '../store/type'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const mainStore = useMainStore()
    const menuData = mainStore.userMenus
    const { isCollapse } = storeToRefs(mainStore)
    const router = useRouter()
    function clickMenuItem(item: childrenData) {
      router.push({ name: item.name })
      // 如果重复点击此时需要对各个边界情况做出分析
      if (mainStore.tabData.findIndex((i) => i.name == item.name) == -1) {
        mainStore.tabData.push(item)
      } else {
        // console.log('不添加')
      }
    }
    return { menuData, clickMenuItem, isCollapse }
  }
})
</script>

<style lang="less" scoped>
.asideMenu {
  .title {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    line-height: 61px;
    height: 61px;
    background: #001529;
    .titleIcon {
      color: white;
      width: 24px;
      height: 18px;
    }
  }
}
.el-menu-vertical-demo {
  border: 0px;
}

.ItemStyle {
  font-size: 12px;
  background: #0c2135;
  //为什么不生效？
  // padding-left: 30px;
  &:hover {
    background: #409eff;
  }
}
.title-enter-active,
.title-leave-active {
  transition: opacity 0.2s linear;
}

.title-enter-from,
.title-leave-to {
  opacity: 0;
}
</style>
