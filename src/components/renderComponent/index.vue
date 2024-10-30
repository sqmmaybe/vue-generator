<template>
  <div v-if="renderComponentArray.length > 0">
    <el-form
      label-position="right"
    >
      <el-row
        v-for="posIndx in maxPosIndexArray"
        :key="posIndx"
        :gutter="20"
      >
        <template v-for="item in renderComponentArray" :key="item.uuid">
          <el-col v-if="posIndx === item.atPosIndex" :span="item.size">
            <renderInput
              v-if="item.value === 'input'"
              :options="item.options"
            />
            <renderSelect
              v-else-if="item.value === 'select'"
              :options="item.options"
            />
            <renderTable
              v-else-if="item.value === 'table'"
              :options="item.options"
            />
            <renderButton
              v-else-if="item.value === 'button'"
              :options="item.options"
            />
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useOptionsStore } from '../../store'
import { storeToRefs } from 'pinia'

import renderInput from './renderInput.vue'
import renderSelect from './renderSelect.vue'
import renderTable from './renderTable.vue'
import renderButton from './renderButton.vue'

const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)

const renderComponentArray = ref<any[]>([])
const posIndexMap = ref(new Map()) as any

const standradSize = 24
const maxPosIndex = ref(1)
const maxPosIndexArray = ref<number[]>([])

/**计算每个层级有多少个元素 */
const calcPosIndexMap = (array: any) => {
  posIndexMap.value.clear()
  array.forEach((item: any) => {
    if (posIndexMap.value.has(item.atPosIndex)) {
      posIndexMap.value.set(item.atPosIndex, {
        key: item.atPosIndex,
        index: posIndexMap.value.get(item.atPosIndex).index + 1,
        size: standradSize / (posIndexMap.value.get(item.atPosIndex).index + 1)
      })
    }
    else {
      posIndexMap.value.set(item.atPosIndex, {
        key: item.atPosIndex,
        index: 1,
        size: standradSize / 1
      })
    }
  })
} 

/**对每个元素的层级大小计算 */

const calcRenderElementSize = () => {
  maxPosIndex.value = 1
  renderComponentArray.value.forEach((item: any, index: number) => {
    if (item.atPosIndex === posIndexMap.value.get(item.atPosIndex).key) {
      renderComponentArray.value[index].size = posIndexMap.value.get(item.atPosIndex).size
    }

    maxPosIndex.value = Math.max(maxPosIndex.value, item.atPosIndex)
  })
  maxPosIndexArray.value = []
  for (let i = 1 ; i <=  maxPosIndex.value; i++) {
    maxPosIndexArray.value.push(i)
  }

}

watch(
  () => renderOptionsComponentList.value,
  (newVal: any) => {
    renderComponentArray.value = []
    for (let key in newVal) {
      renderComponentArray.value.push(
        {
          ...newVal[key],
          atPosIndex: newVal[key].options.atPosIndex ? newVal[key].options.atPosIndex : 1,
          size: 24
        }
      )
    }
    calcPosIndexMap(renderComponentArray.value)
    calcRenderElementSize()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>

.el-row {
  margin-bottom: 10px;
}
</style>