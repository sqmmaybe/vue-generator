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
      <el-form-item label="选择项">
        <el-button @click="settingsFunc">配置选项</el-button>
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
          <div v-for="item in optionsList" class="options-list">
            <div class="options-list__item">
              <el-form-item label="属性">
                <el-col :span="12">
                  <el-input v-model="item.opLabel" style="width: 200px" />
                </el-col>
              </el-form-item>

              <el-form-item label="值">
                <el-col :span="12">
                  <el-input v-model="item.opValue" style="width: 200px" />
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
import { usePropertyRenderSelectHooks } from '../../../hooks/usePropertyRenderSelect'

const props = defineProps<{
  currentUUid: string,
  drawerTag: boolean
}>()

const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)
const { optionsList, initOptionsList, addOptionsListItem, saveOptionsList } = usePropertyRenderSelectHooks(renderOptionsComponentList.value[props.currentUUid].options)

const dialogVisible = ref(false)


const settingsFunc = () => {
  dialogVisible.value = true
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = () => {
  dialogVisible.value = false
  saveOptionsList()
}

const add = () => {
  addOptionsListItem()
}

watch(
  () => dialogVisible.value,
  (val: boolean) => {
    if (val) {
      initOptionsList()
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