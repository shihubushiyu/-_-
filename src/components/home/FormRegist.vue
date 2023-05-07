<template>
  <el-form :model="registData" label-width="90px" label-position="left" :rules="rules" ref="FormData">
    <el-form-item label="病人姓名:" prop="name">
      <el-input v-model="registData.name" />
    </el-form-item>
    <el-form-item label="病人性别" prop="sex">
      <el-radio-group v-model="registData.sex">
        <el-radio label="男" />
        <el-radio label="女" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号:" prop="sf">
      <el-input v-model="registData.sf" />
    </el-form-item>
    <el-form-item label="就诊日期:" prop="date">
      <el-date-picker
        v-model="registData.date"
        type="date"
        placeholder="选择就诊日期"
        :default-value="new Date(2022, 1, 1)"
      />
    </el-form-item>
    <el-form-item label="卡号:" prop="cardId">
      <el-input v-model="registData.cardId" />
    </el-form-item>
    <el-form-item label="主治医师:" prop="doctor">
      <el-select v-model="registData.doctor" placeholder="请选择主治医师">
        <el-option label="鲁龙龙" value="鲁龙龙" />
        <el-option label="医生乙" value="医生乙" />
        <el-option label="医生丙" value="医生丙" />
        <el-option label="医生丁" value="医生丁" />
      </el-select>
    </el-form-item>
    <el-form-item label="家庭住址:" prop="address">
      <el-input v-model="registData.address"></el-input>
    </el-form-item>
    <el-form-item label="手机号:" prop="phone">
      <el-input v-model="registData.phone" />
    </el-form-item>
    <el-form-item label="诊断意见:" prop="textarea">
      <el-input
        v-model="registData.textarea"
        :autosize="{ minRows: 3, maxRows: 4 }"
        type="textarea"
        placeholder="请输入诊断意见"
      />
    </el-form-item>
    <el-form-item label="是否住院:" prop="isHospital">
      <el-radio-group v-model="registData.isHospital">
        <el-radio label="是" />
        <el-radio label="否" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitFormData"> 提交 </el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { nanoid } from 'nanoid'
import rRequest from '../../service/index'
import { useMainStore } from '../../store/index'
import { storeToRefs } from 'pinia'

export default defineComponent({
  nmae: 'FormRegist',
  emits: ['changeVisible'],
  setup(props, content) {
    const mainStore = useMainStore()
    const { registData } = storeToRefs(mainStore)
    const rules = {
      name: [{ required: true, message: '请输入病人名字', trigger: 'blur' }],
      sex: [{ required: true, message: '请选择病人性别', trigger: 'blur' }],
      sf: [
        { required: true, message: '请输入病人身份证号', trigger: 'blur' },
        {
          pattern: /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
          message: '身份证号格式错误',
          trigger: 'blur'
        }
      ],
      date: [{ required: true, message: '请选择病人出生日期', trigger: 'blur' }],
      cardId: [{ required: true, message: '请输入卡号', trigger: 'blur' }],
      doctor: [{ required: true, message: '请选择医师', trigger: 'change' }],
      address: [{ required: true, message: '请选输入病人地址', trigger: 'blur' }],
      phone: [
        { required: true, message: '请选输入病人手机号', trigger: 'blur' },
        {
          pattern: /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/,
          trigger: 'blur',
          message: '手机号格式不对'
        }
      ],
      isHospital: [{ required: true, message: '请选择病人是否住院', trigger: 'blur' }],
      textarea: [{ required: true, message: '请写出诊断意见', trigger: 'blur' }]
    }
    const FormData = ref<InstanceType<typeof ElForm>>()
    function submitFormData() {
      FormData.value?.validate(async (isValidate) => {
        if (isValidate) {
          //如果符合rules规则
          // console.log('验证通过')
          // 如果id为空,执行插入操作
          if (!registData.value.id) {
            registData.value.id = nanoid()
            // 挂号费5块
            registData.value.money -= 5
            await rRequest.post<string>({
              url: '/user/addUser',
              data: registData.value
            })
            content.emit('changeVisible')
            // 再将表单值清空
            registData.value = {
              id: '',
              name: '',
              sex: '',
              sf: '',
              date: '',
              cardId: '',
              doctor: '',
              address: '',
              phone: '',
              isHospital: '',
              textarea: '',
              money: 100
            }
          } else {
            // 如果id不为空,执行编辑操作；不赋值id
            await rRequest.post({
              url: '/user/editUser',
              data: registData.value
            })
            content.emit('changeVisible')
            // 再将表单值清空
            registData.value = {
              id: '',
              name: '',
              sex: '',
              sf: '',
              date: '',
              cardId: '',
              doctor: '',
              address: '',
              phone: '',
              isHospital: '',
              textarea: '',
              money: 100
            }
          }
        } else {
          console.log('验证未通过')
        }
      })
    }
    function cancel() {
      content.emit('changeVisible')
    }
    return {
      registData,
      rules,
      FormData,
      submitFormData,
      cancel
    }
  }
})
</script>

<style></style>
