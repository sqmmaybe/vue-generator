<template>
  <div class="operate">
    <div class="operate-content">
      <el-button @click="showIcon">
        <el-icon style="color: #67c23a">
          <DArrowRight v-if="showIconTag" />
          <DArrowLeft v-else />
        </el-icon>
      </el-button>

      <div class="operate-content__download" v-if="showIconTag">
        <el-button
          v-for="item in downType"
          :key="item.value"
          type="primary"
          size="small"
          @click="downResult"
        >
          {{ item.label }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//@ts-ignore
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { downType } from '../../constants'
import { useOptionsStore } from '../../store'
import { storeToRefs } from 'pinia';

const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)

const showIconTag = ref(false)
const showIcon = () => {
  showIconTag.value = !showIconTag.value
}

const downResult = () => {
  console.log(renderOptionsComponentList.value)
}
</script>

<style lang="scss" scoped>
.operate {
  position: fixed;
  top: 50%;
  right: 10px;

  &-content {
    position: relative;

    &__download {
      position: absolute;
      padding: 10px 20px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      right: 60px;
      top: 0px;
    }
  }
}
</style>