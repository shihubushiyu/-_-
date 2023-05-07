<template>
  <div class="loginUser">
    <el-form label-width="80px" label-position="left" :rules="rules" :model="account" ref="ruleFormRef">
      <!-- prop用来找规则，rules中的键名 -->
      <el-form-item label="User:" prop="user">
        <el-input class="inputStyle" v-model="account.user" />
      </el-form-item>
      <el-form-item label="Password:" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus' //这里导入了ELForm用来声明类型。
import { defineComponent, reactive, ref } from 'vue'
import cache from '../../../utils/cache'
import { useMainStore } from '../../../store/index'

export default defineComponent({
  setup() {
    const account = reactive({ user: cache.getCache('user') ?? '', password: cache.getCache('password') ?? '' })
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const rules = {
      //trigger 表示触发时机，有两个取值：1.blur表示失去焦点触发规则并且校验规则，不符合则提示message；2.change表示输入框改变就触发校验规则rules。
      user: [
        { required: true, trigger: 'blur', message: '用户名是必传内容' },
        {
          pattern: /^[a-zA-Z0-9]{5,10}$/,
          trigger: 'blur',
          message: '用户名必须是5-10个字母或者数字'
        }
      ],
      password: [
        { required: true, trigger: 'blur', message: '密码是必传内容' },
        {
          pattern: /^[a-zA-Z0-9]{3,}$/,
          trigger: 'blur',
          message: '密码必须是3位以上字母或者数字'
        }
      ]
    }
    const mainStore = useMainStore()

    function loginAction(isKeepPassword: boolean) {
      ruleFormRef.value?.validate((valid) => {
        // 如果rules验证通过，执行登录逻辑
        if (valid) {
          //验证通过
          if (isKeepPassword) {
            // 判断是否记住密码
            // 本地缓存账号密码
            cache.setCache('user', account.user)
            cache.setCache('password', account.password)
            mainStore.login(account)
          } else {
            // 如果不是记住密码，则清空账号密码的缓存缓存
            cache.deleteCache('user')
            cache.deleteCache('password')
          }
        } else {
          console.log('验证未通过')
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      ruleFormRef
    }
  }
})
</script>
<style lang="less" scoped></style>
