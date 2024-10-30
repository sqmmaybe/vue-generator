<template>
  <el-form-item :label="options.atLabel">
    <el-input
      v-model="options.atValue"
      :placeholder="options.atPlaceHolder"
      :type="options.atType"
      :style="`${options.style}`"
      v-on="funcEvalList"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  options: any
}>()

const funcEvalList = computed(() => {
  const _event = {} as any
  for (let key in props.options.originEvent) {
    const _newStr = `${props.options.originEvent[key][0].functionExpress} ${props.options.originEvent[key][0].functionName}()`
    _event[key] = evalJS(_newStr)
  }
  return _event
})

const evalJS = (funcStr: string) => {
  return new Function(funcStr)
}

</script>

<style lang="scss" scoped>
</style>