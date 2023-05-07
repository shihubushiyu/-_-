<template>
  <div class="navHeader">
    <el-button class="menuBtn" @click="changeIsCollapse"
      ><el-icon size="25" color="black"><Menu /></el-icon
    ></el-button>
    <div class="rightContent">
      <!-- <el-icon size="25" class="bell"><Bell /></el-icon> -->
      <el-dropdown class="rDropdown">
        <img src="../assets/imgs/user.png" class="homeImg" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="dialogVisible = true"
              >退出
              <el-dialog
                v-model="dialogVisible"
                title="提示"
                width="30%"
                :before-close="handleCloseWrong"
                :append-to-body="true"
              >
                <span>确定要退出登录吗？</span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleClose"> 确定 </el-button>
                  </span>
                </template>
              </el-dialog>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMainStore } from '../store/index'
import router from '../router/index'
// import cache from '@/utils/cache'
export default defineComponent({
  setup() {
    const dialogVisible = ref(false)
    const mainStore = useMainStore()
    function changeIsCollapse() {
      mainStore.isCollapse = !mainStore.isCollapse
    }
    function handleClose() {
      // cache.deleteCache('token')
      // cache.deleteCache('tabData')
      // 没有刷新页面store中的数据仍在内存中，如果此时不将状态初始化，会出现缓存现象。牢记：store中的数据只有在刷新时候才会丢失，跳转路由不会丢失数据
      mainStore.$reset()
      router.push({ name: 'login' })
    }
    function handleCloseWrong() {
      dialogVisible.value = false
    }

    return { changeIsCollapse, dialogVisible, handleClose, handleCloseWrong }
  }
})
</script>

<style lang="less" scoped>
.navHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .rightContent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .bell {
      cursor: pointer;
      margin-right: 40px;
    }
    .rDropdown {
      .homeImg {
        width: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
