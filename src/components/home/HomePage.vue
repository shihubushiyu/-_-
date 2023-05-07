<template>
  <el-carousel height="500px">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-button class="btn" type="primary" @click="changeDialog">挂号</el-button>
    </el-carousel-item>
  </el-carousel>

  <el-dialog v-model="dialogVisible" title="挂号" width="50%">
    <FormRegist @changeVisible="changeDialog"></FormRegist>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormRegist from './FormRegist.vue'
export default defineComponent({
  nmae: 'HomePage',
  components: { FormRegist },
  setup() {
    const dialogVisible = ref(false)
    function changeDialog() {
      dialogVisible.value = !dialogVisible.value
    }
    return { dialogVisible, changeDialog }
  }
})
</script>

<style lang="less" scoped>
.rowOne {
  margin-top: 10px;
  .colOne {
    margin-top: 10px;
    .registration {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item {
  margin-top: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-carousel__item:nth-child(n) {
  background-image: url('../../assets/imgs/ele1.jpg');
  background-size: cover;
}
</style>
