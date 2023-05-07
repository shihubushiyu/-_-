<template>
  <div class="loginPanel">
    <h1 class="title">住院管理系统</h1>

    <el-tabs type="border-card" stretch class="tabCard" v-model="loginType">
      <el-tab-pane class="tabPane" name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="user"><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginUser ref="accountRef"></loginUser>
      </el-tab-pane>
      <el-tab-pane class="tabPane" name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="user"><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <loginPhone ref="phoneRef"></loginPhone>
      </el-tab-pane>
    </el-tabs>

    <div class="accountControl">
      <el-checkbox class="accountCheckbox" v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginUser from './loginUser.vue'
import loginPhone from './loginPhone.vue'
export default defineComponent({
  components: {
    loginUser,
    loginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const loginType = ref<string>('account')
    // 有可能会认为accountRef是个undefined，没有被使用。所以要使用可选链。
    const accountRef = ref<InstanceType<typeof loginUser>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    function login() {
      if (loginType.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      login,
      accountRef,
      loginType
    }
  }
})
</script>
<style lang="less" scoped>
.loginPanel {
  width: 320px;
  .title {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    text-align: center;
  }
  .accountControl {
    display: flex;
    justify-content: space-between;
    .accountCheckbox {
      color: #409eff;
    }
  }
  .loginBtn {
    width: 100%;
    margin-top: 5px;
  }
  // less异常穿透的用法
  /deep/ .tabCard {
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    .el-tabs__header {
      border-radius: 5px;
      .el-tabs__nav-wrap {
        border-radius: 5px;
        .el-tabs__nav-scroll {
          border-radius: 5px;
        }
      }
    }
  }
}

.custom-tabs-label {
  text-align: center;
  .user {
    margin-right: 4px;
    font-size: 18.5px;
    position: relative;
    top: 3.5px;
  }
}
</style>
