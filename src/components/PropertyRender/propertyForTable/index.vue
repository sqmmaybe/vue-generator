<template>
  <div>
    <el-form :inline="true" label-width="auto">

      <el-form-item label="选择项">
        <el-button @click="settingsFunc">行配置项</el-button>
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

    <el-dialog
      v-model="dialogVisible"
      title="配置选项"
    >
      <div class="dialog-content">
        <el-form :inline="true" label-width="auto">
          <div v-for="item in tableList" class="options-list">
            <div class="options-list__item">
              <el-form-item label="行名称">
                <el-col :span="12">
                  <el-input v-model="item.tableName" style="width: 200px" />
                </el-col>
              </el-form-item>

              <el-form-item label="行数据">
                <el-col :span="12">
                  <el-input v-model="item.tableProp" style="width: 200px" />
                </el-col>
              </el-form-item>
            </div>
            <el-button @click="add">+</el-button>
          </div>
        </el-form>
      </div>
      <template #footer>
        <div>
          <el-button @click="cancel">取消</el-button>
          <el-button type="success" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOptionsStore } from '../../../store'
import { storeToRefs } from 'pinia';
import { positionZIndexList } from '../../../constants'
import { usePropertyRenderTableHooks } from '../../../hooks/usePropertyRenderTable'

const props = defineProps<{
  currentUUid: string,
  drawerTag: boolean
}>()

const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)
const { tableList, initTableList, saveTableList, addTableListItem } = usePropertyRenderTableHooks(renderOptionsComponentList.value[props.currentUUid].options)

const dialogVisible = ref(false)


const settingsFunc = () => {
  dialogVisible.value = true
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = () => {
  dialogVisible.value = false
  saveTableList()
}

const add = () => {
  addTableListItem()
}

watch(
  () => dialogVisible.value,
  (val: boolean) => {
    if (val) {
      initTableList()
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.title {
  padding: 12px 0;
}

.dialog-content {
  width: 100%;
  max-height: 400px;
  padding: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
}

.options-list {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  &__item {
    display: flex;
    justify-content: flex-start;
  }
}
</style>