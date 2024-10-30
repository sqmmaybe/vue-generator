<template>
  <el-dialog
    v-model="dialogVisible"
    title="设置"
    class="settings"
  >
    <div ref="editorContainer" class="container"></div>
    <template #footer>
      <div>
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRenderComponentFunctionHooks } from '../../hooks/useRenderComponentFunction'

const dialogVisible = ref(false)

const currentOptions = ref({
  currentUUid: '',
  eventType: ''
})
const editorContainer = ref(null) as any

const init = (item: any) => {
  if (item) {
    currentOptions.value = item
  }
  else {
    currentOptions.value = {
      currentUUid: '',
      eventType: ''
    }
  }
  dialogVisible.value = true
}

const { createCodeEditor, createRenderFunction, destroyEditor } = useRenderComponentFunctionHooks()

const closeDialog = () => {
  dialogVisible.value = false
}

const cancel = () => {
  closeDialog()
}

const confirm = () => {
  createRenderFunction(currentOptions.value.currentUUid, currentOptions.value.eventType)
  closeDialog()
}

watch(
  () => dialogVisible.value,
  (val: boolean) => {
    if (val) createCodeEditor(currentOptions.value.currentUUid, currentOptions.value.eventType, editorContainer)
    else destroyEditor()
  },
  {
    immediate: true
  }
)

defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.container {
  margin-left: 30px;
  width: 600px;
  height: 400px;
}
</style>