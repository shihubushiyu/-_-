<template>
  <el-table :data="filterTableData?.slice((curPage - 1) * pageSize, pageSize * curPage)" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="auto" />
    <el-table-column prop="sex" label="性别" width="auto" />
    <el-table-column prop="sf" label="身份证号" width="auto" />
    <el-table-column prop="date" label="就诊日期" width="auto" sortable />
    <el-table-column prop="cardId" label="就诊卡号" width="auto" />
    <el-table-column prop="phone" label="手机号" width="auto" />
    <el-table-column prop="doctor" label="主治医师" width="auto" />
    <el-table-column prop="address" label="地址" width="auto" />
    <el-table-column prop="textarea" label="诊断意见" width="auto" />
    <el-table-column prop="isHospital" label="是否住院" width="auto" align="center" />
    <el-table-column prop="money" label="账户余额" width="auto" align="center" />
    <el-table-column align="center" width="200px">
      <template #header>
        <el-input v-model="search" size="large" placeholder="病人名字搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="filterTableData?.length || 0"
    :page-size="pageSize"
    v-model:current-page="curPage"
    hide-on-single-page
    class="pagination"
  />
  <el-dialog v-model="dialogVisible" title="挂号" width="50%">
    <FormRegist @changeVisible="changeDialog"></FormRegist>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import rRequest from '../../../service'
import type { getTableType } from './types'
import FormRegist from '../../../components/home/FormRegist.vue'
import { useMainStore } from '../../../store/index'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'PatientQuery',
  components: { FormRegist },
  setup() {
    const tableData = ref<getTableType[]>()
    const search = ref('')
    const curPage = ref(1)
    const pageSize = ref(5)
    const dialogVisible = ref(false)
    const mainStore = useMainStore()
    const { registData } = storeToRefs(mainStore)
    onMounted(async () => {
      // 查询病人信息
      const res = await rRequest.get<getTableType[]>({
        url: '/user/getUser'
      })
      tableData.value = res
      // 对是否就诊进行数据的时间map
      tableData.value?.map((item) => (item.date = item.date.slice(0, 10)))
    })
    // 点击编辑按钮
    const handleEdit = (index: number, row: getTableType) => {
      dialogVisible.value = !dialogVisible.value
      registData.value = row
    }
    //点击删除按钮
    const handleDelete = async (index: number, row: getTableType) => {
      const res = await rRequest.post<string>({
        url: '/user/delUser',
        data: row
      })
      if (res == 'delete is success') {
        const res1 = await rRequest.get<getTableType[]>({
          url: '/user/getUser'
        })
        tableData.value = res1
      }
    }
    //计算属性,依赖发生改变,随之也改变,完成分页功能
    const filterTableData = computed(() =>
      tableData.value?.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
    )
    //共有方法打开对话框
    function changeDialog() {
      dialogVisible.value = !dialogVisible.value
    }
    return {
      tableData,
      search,
      handleEdit,
      handleDelete,
      changeDialog,
      filterTableData,
      curPage,
      pageSize,
      dialogVisible
    }
  }
})
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
