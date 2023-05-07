<template>
  <div class="loginUser">
    <el-form label-width="80px" label-position="left" :rules="rules" :model="account" ref="ruleFormRef">
      <!-- prop用来找规则，rules中的键名 -->
      <el-form-item label="手机号:" prop="phone">
        <el-input class="inputStyle" v-model="account.phone" />
      </el-form-item>
      <!-- prop的取值是字符串，有特殊符号也无所谓  -->
      <el-form-item label="验证码:" prop="verify-code">
        <div class="getCode">
          <el-input v-model="account['verify-code']" />
          <el-button type="primary" class="getCodeBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import cache from '../../../utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({ phone: '', 'verify-code': '' })
    const rules = {
      //trigger 表示触发时机，有两个取值：1.blur表示失去焦点触发规则并且校验规则，不符合则提示message；2.change表示输入框改变就触发校验规则rules。
      phone: [
        { required: true, trigger: 'blur', message: '手机号是必传内容' },
        {
          pattern: /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/,
          trigger: 'blur',
          message: '手机号格式不对'
        }
      ],
      'verify-code': [
        { required: true, trigger: 'blur', message: '验证码是必传内容' },
        {
          pattern: /^[0-9]{6}$/,
          trigger: 'blur',
          message: '验证码必须是6位数字'
        }
      ]
    }
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    function loginAction(isKeepPassword: boolean) {
      ruleFormRef.value?.validate((valid) => {
        // 如果rules验证通过，执行登录逻辑
        if (valid) {
          //验证通过
          if (isKeepPassword) {
            // 判断是否记住密码
            // 本地缓存账号密码
            cache.setCache('user', account.phone)
            cache.setCache('password', account['verify-code'])
          } else {
            // 如果不是记住密码，则清空账号密码的缓存缓存
            cache.deleteCache('phone')
            cache.deleteCache('verify-code')
          }
        } else {
          console.log('验证未通过')
        }
      })
    }
    return {
      account,
      rules,
      loginAction
    }
  }
})
</script>
<style lang="less" scoped>
.getCode {
  display: flex;
  .getCodeBtn {
    margin-left: 5px;
  }
}
</style>
