<template>
  <el-row :gutter="10">
    <el-col :span="2" v-for="i in 48" :key="i">
      <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://t15.baidu.com/it/u=1577150282,3246871241&fm=224&app=112&size=h200&n=0&f=JPEG&fmt=auto?sec=1674147600&t=e5e3632d5cda9c831b98542f294793b4"
          class="image"
          @click="skipChargeQuery(data[i])"
        />
        <div style="padding: 4px">
          <span class="index">床号:{{ i }}</span>
          <div class="bottom" :class="!data[i] ? 'content' : ''">
            <span class="patient" v-if="data[i]">病人:{{ data[i]?.name }}</span>
            <el-button v-if="data[i]" @click="openDialog(data[i])" text class="btnBed">点击添加医嘱</el-button>
            <el-button v-if="data[i]" @click="showAdvice(data[i])" text class="btnBed">点击显示医嘱</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- el-form表格部分 -->
  <el-dialog v-model="dialogVisible" title="医嘱" width="30%">
    <el-form :model="useDrug" :rules="rules" ref="refForm">
      <el-form-item label="医嘱：" prop="useDrug">
        <el-input type="textarea" v-model="useDrug.useDrug"></el-input>
      </el-form-item>
      <el-form-item label="价格：" prop="money">
        <el-input type="textarea" v-model="useDrug.money"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="clickConfirm(data[i])"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import rRequest from '../../../service/index'
import type { getBedType } from './types'
import { useMainStore } from '../../../store'
import router from '../../../router/index'
import { ElMessage, ElNotification } from 'element-plus'

export default defineComponent({
  nmae: 'BetQuery',
  setup() {
    const data = ref<getBedType[]>([])
    const dialogVisible = ref(false)
    const useDrug = ref({ useDrug: '', id: 0, name: '', money: '' })
    const rules = {
      useDrug: [{ required: true, message: '请输入医嘱', trigger: 'blur' }],
      money: [{ required: true, message: '请输入价格', trigger: 'blur' }]
    }
    const refForm = ref<InstanceType<typeof ElForm>>()
    const mainStore = useMainStore()

    onMounted(async () => {
      // 再次去重，然后对data.value再赋值
      const resp1 = await rRequest.get<getBedType[]>({
        url: '/user/getBedUser'
      })
      for (let i = 0; i < resp1.length; i++) {
        for (let j = 1; j < resp1.length; j++) {
          if (resp1[i].name == resp1[j].name && i != j) {
            //
            resp1.splice(j, 1)
            j = j - 1
          }
        }
      }
      data.value = resp1
      // console.log(data.value)
    })
    function clickConfirm() {
      //
      refForm.value?.validate(async (valid) => {
        if (valid) {
          //验证通过关闭对话框
          dialogVisible.value = false
          // 集中状态管理这记录了是哪个病人弹出来的信息
          useDrug.value.id = mainStore.patientDataID.id
          useDrug.value.name = mainStore.patientDataID.name
          // console.log('!!!!!!!!!!!!', useDrug.value)
          await rRequest.post({
            url: '/user/addUseDrugEdit',
            data: useDrug.value
          })
          //每次 增加/修改 完成后清空textarea为初始状态
          useDrug.value = { useDrug: '', id: 0, name: '', money: '' }
          //每次 增加/修改 完成后更新data数据显示医嘱
          const resp = await rRequest.get<getBedType[]>({
            url: '/user/getBedUser'
          })

          //对resp进行name去重
          for (let i = 0; i < resp.length; i++) {
            for (let j = 1; j < resp.length; j++) {
              if (resp[i].name == resp[j].name && i != j) {
                //
                resp.splice(j, 1)
                j = j - 1
              }
            }
          }
          data.value = resp
        } else {
          ElMessage('请输入医嘱')
        }
      })
    }
    function openDialog(patientData: getBedType) {
      // 将所所点击btn的patient信息存入store
      mainStore.openDialog(patientData)
      // 打开对话框
      dialogVisible.value = true
      //
    }
    function showAdvice(patientData: getBedType) {
      ElNotification({
        title: '医嘱',
        dangerouslyUseHTMLString: true,
        message: `病人：${patientData.name}<br />医嘱：${patientData.useDrug}`,
        duration: 10000
      })
    }

    // 跳转ChargeQuery
    function skipChargeQuery(patientData: getBedType) {
      //
      // mainStore.openDialog(patientData)
      // console.log(patientData)
      router.push({ name: 'chargeQuery', params: { ...patientData } })
    }

    return {
      data,
      dialogVisible,
      useDrug,
      rules,
      refForm,
      clickConfirm,
      openDialog,
      showAdvice,
      skipChargeQuery
    }
  }
})
</script>

<style lang="less" scoped>
.index {
  display: block;
  font-size: 5px;
  // text-align: center;
  margin-left: 8px;
  padding-left: 8px;
}
.content {
  width: 100px;
  height: 86px;
}

.bottom {
  font-size: 5px;
  margin-top: 5px;
  line-height: 12px;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  .patient {
    display: block;
    color: #409eff;
    margin-left: 8px;
    padding-left: 8px;
    margin-top: 8px;
  }
  .btnBed {
    margin-left: 0;
    margin-top: 5px;
    font-size: 5px;
  }
}
.image {
  width: 100%;
  display: block;
}
.el-col {
  margin-top: 4px;
}
</style>
