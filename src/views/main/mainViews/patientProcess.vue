<template>
  <el-descriptions class="margin-top" :column="3" border v-for="user in userDataPlus" :key="user.name">
    <el-descriptions-item v-for="(val, key) in user" :key="key" width="30px">
      <template #label>
        <div class="cell-item">
          <el-icon style="iconStyle">
            <component :is="val.iconStyle"></component>
          </el-icon>
          {{ key }}
        </div>
      </template>
      {{ key == '卡余额' ? val.val + '￥' : val.val }}
    </el-descriptions-item>

    <!-- <el-descriptions-item>
      <template #label>
        <div></div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div>日志</div>
      </template>
      {{ user }}
    </el-descriptions-item> -->
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import rRequest from '../../../service/index'
import type { getTableTypePlus, getTableType, getBedType } from './types'
export default defineComponent({
  nmae: 'ChargeQuery',
  setup() {
    const getBedUser = ref<getBedType[]>([])
    const userData = ref<getTableType[]>([])
    const userDataPlus = ref<getTableTypePlus[]>([])

    onMounted(async () => {
      userData.value = await rRequest.get({
        url: '/user/getUser'
      })
      // 对是否就诊进行数据的时间map
      userData.value?.map((item) => (item.date = item.date.slice(0, 10)))
      const iconfontList = reactive([
        'User',
        'Avatar',
        'HelpFilled',
        'QuartzWatch',
        'ElementPlus',
        'Iphone',
        'StarFilled',
        'Location',
        'EditPen',
        'Money'
      ])
      const newUserData: getTableTypePlus[] = []
      for (let i = 0; i < userData.value.length; i++) {
        newUserData.push({
          // id: { val: userData.value[i].id, iconStyle: iconfontList[i] },
          姓名: { val: userData.value[i].name, iconStyle: iconfontList[0] },
          性别: { val: userData.value[i].sex, iconStyle: iconfontList[1] },
          身份证号: { val: userData.value[i].sf, iconStyle: iconfontList[2] },
          挂号时间: { val: userData.value[i].date, iconStyle: iconfontList[3] },
          卡号: { val: userData.value[i].cardId, iconStyle: iconfontList[4] },
          手机号码: { val: userData.value[i].phone, iconStyle: iconfontList[5] },
          主治医师: { val: userData.value[i].doctor, iconStyle: iconfontList[6] },
          是否住院: { val: userData.value[i].isHospital, iconStyle: iconfontList[0] },
          诊断意见: { val: userData.value[i].textarea, iconStyle: iconfontList[8] },
          家庭住址: { val: userData.value[i].address, iconStyle: iconfontList[7] },
          卡余额: { val: userData.value[i].money, iconStyle: iconfontList[9] },
          医嘱: { val: userData.value[i].useDrug as string, iconStyle: iconfontList[9] }
        })
      }
      userDataPlus.value = newUserData
      // console.log(newUserData)

      // 对bed的处理
      getBedUser.value = await rRequest.get({
        url: '/user/getBedUser'
      })

      const log = computed(() => {
        return getBedUser.value.map((item) => item.useDrug)
      })
      console.log(log.value)
    })
    const log = computed(() => {
      return getBedUser.value.map((item) => item.useDrug)
    })

    return { userData, userDataPlus, getBedUser, log }
  }
})
</script>

<style lang="less" scoped>
.margin-top {
  margin-top: 20px;
}
</style>
