<template>
  <div class="css-render">
    <div ref="editorContainer" class="css-render__container"></div>
    <div class="css-btn">
      <el-button
        @click="createRenderStyle"
      >样式生成</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useRenderComponentStyleHooks } from '../../hooks/useRenderComponentStyle'

const props = defineProps<{
  actionName: string,
  currentUUid: string
}>()

const { actionName, currentUUid } = toRefs(props)
const editorContainer = ref(null) as any
const { createRenderStyle } = useRenderComponentStyleHooks(actionName, currentUUid, editorContainer)

</script>

<style lang="scss" scoped>
.css-render {
  width: 100%;
  height: 300px;
  position: relative;

  &__container {
    width: 100%;
    height: 100%;
  }
}

.css-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>