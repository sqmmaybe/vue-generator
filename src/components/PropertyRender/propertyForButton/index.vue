<template>
  <div>
    <el-form :inline="true" label-width="auto">
      <el-form-item label="类型">
        <el-select
          placeholder="请选择按钮类型"
          v-model="renderOptionsComponentList[currentUUid].options.btnType"
          style="width: 200px;"
        > 
          <el-option
            v-for="item in btnTypeList"
            :key="item.type"
            :label="item.label"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="名称">
        <el-input v-model="renderOptionsComponentList[currentUUid].options.btnName" />
      </el-form-item>


      <el-form-item label="层级">
        <el-select 
          placeholder="请选择当前元素的层级"
          v-model="renderOptionsComponentList[currentUUid].options.atPosIndex" 
          style="width: 200px;"
        >
          <el-option
            v-for="item in positionZIndexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useOptionsStore } from '../../../store'
import { storeToRefs } from 'pinia';
import { positionZIndexList } from '../../../constants'
const optionsStore = useOptionsStore()

const { renderOptionsComponentList } = storeToRefs(optionsStore)

defineProps<{
  currentUUid: string,
  drawerTag: boolean
}>()

const btnTypeList = [
  {
    type: 'primary',
    label: 'primary'
  },
  {
    type:'success',
    label:'success'
  },
  {
    type: 'info',
    label: 'info'
  },
  {
    type: 'warning',
    label: 'warning'
  },
  {
    type: 'danger',
    label: 'danger'
  }
]
</script>

<style lang="scss" scoped>
.title {
  padding: 12px 0;
}
</style>