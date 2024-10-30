<template>
  <div class="options">
    <div class="introd common">
      <el-icon><Platform /></el-icon>
      <div style="margin-left: 10px;">配置组件</div>
    </div>

    <div class="common content">
      <div class="common-title ui-list">组件列表</div>
      <div
        v-if="rdcList.length != 0"
      >
        <div
          v-for="item in rdcList"
          class="rdc-list"
        >
          <el-check-tag
            :key="item.uuid"
            :checked="checkedListItemUUid === item.uuid"
            @change="onChangeList(item)"
            type="success"
          >
            {{ item.label }}
          </el-check-tag>
          <el-tag closable type="success" @close="onCloseChangeList(item.uuid)"></el-tag>
        </div>
      </div>
    </div>

    <configuration ref="drawRef" />
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { Platform } from '@element-plus/icons-vue'
import { useRenderComponentList } from '../../hooks/useRenderComponentList'
import configuration from '../../components/ConfigurationArea/index.vue'
import { ref } from 'vue'
const { rdcList, checkedListItemUUid, setCheckedListTag, removeList } = useRenderComponentList()

const drawRef = ref()
const onChangeList = (item: any) => {
  setCheckedListTag(item)
  drawRef.value.init(checkedListItemUUid.value)
}

const onCloseChangeList = (uuid: string) => {
  removeList(uuid)
}
</script>

<style scoped lang="scss">
.options {
  margin-left: 10px;
  width: 260px;
  padding: 20px;
  box-shadow: var(--box-shadow-1);
  background-color: var(--sidebar-bg-color);
}

.introd {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size-large);
  color: var(--font-color-1);
}

.common {
  padding: 20px;
  border-bottom: 1px solid var(--border-color-1);
}

.common-title {
  font-size: var(--font-size-middle);
  color: var(--font-color-1);
}


.rdc-list {
  display: flex;
  padding: 10px;
  border-radius: 4px;
  .el-check-tag {
    // padding: 12px 40px;
    border-radius: 0px;
  }

  .el-tag {
    padding: 13px 10px;
    border-radius: 0px;
  }
}

.content {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin-bottom: 20px;
}
</style>