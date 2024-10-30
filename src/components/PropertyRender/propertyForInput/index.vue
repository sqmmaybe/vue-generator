<template>
  <div>
    <el-form :inline="true" label-width="auto">
      <el-form-item label="value">
        <el-input v-model="renderOptionsComponentList[currentUUid].options.atValue" />
      </el-form-item>
      <el-form-item label="label">
        <el-input v-model="renderOptionsComponentList[currentUUid].options.atLabel" />
      </el-form-item>
      <el-form-item label="placeholder">
        <el-input v-model="renderOptionsComponentList[currentUUid].options.atPlaceHolder" />
      </el-form-item>
      <el-form-item label="type">
        <el-select 
          placeholder="请选择输入框类型"
          v-model="renderOptionsComponentList[currentUUid].options.atType" 
          style="width: 170px;"
        >
          <el-option
            v-for="item in typeSelect"
            :key="item.type"
            :label="item.label"
            :value="item.type"
          />
        </el-select>
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



const typeSelect = [
  {
    label: '文本框',
    type: 'text'
  },
  {
    label: '数字框',
    type: 'number'
  },
  {
    label: '密码框',
    type: 'password'
  },
  {
    label: '文本域',
    type: 'textarea'
  }
]
</script>

<style lang="scss" scoped>
.title {
  padding: 12px 0;
}
</style>