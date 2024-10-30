<template>
  <div class="css-render">
    <el-table
      :data="dataSource"
      height="250px"
      align="center"
    >
      <el-table-column label="事件类型" prop="eventType" />
      <el-table-column label="事件设置">
        <template #default="scope">
          <el-button @click="setEvents(scope.row.eventType)">{{ '设置' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <settingsDialog ref="settingDialogRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue'
import { functionType } from '../../constants'
import settingsDialog from './settingsDialog.vue';
const props = defineProps<{
  actionName: string,
  currentUUid: string,
  currentType: any
}>()

const { currentUUid, currentType } = toRefs(props)

const dataSource = computed(() => functionType[currentType.value].map((item: string) => {
  return {eventType: item}
}))

const settingDialogRef = ref()

const setEvents = (eventType: string) => {
  settingDialogRef.value.init({
    eventType,
    currentUUid: currentUUid.value
  })
}
</script>

<style lang="scss" scoped>
.css-render {
  width: 100%;
  height: 300px;
  padding: 20px 0;
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

.func-list {
  display: flex;
  width: 160px;
  justify-content: space-between;
  &__name {
    padding: 10px;
  }
}
</style>