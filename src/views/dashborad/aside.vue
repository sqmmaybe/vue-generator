<template>
  <div class="aside">
    <div class="introd common">
      <el-icon><Guide /></el-icon>
      <div style="margin-left: 10px;">面板</div>
    </div>

    <div class="common">
      <div class="common-title ui-list">UI框架</div>
      <div
        v-for="item in farmWorkList"
        :key="item.id"
        :class="['ui-list-item', uiActiveTag === item.id ? 'ui-list-item-active' : 'ui-list-item-none']"
        @click="setUIFarmWork(item)"
      > 
        {{ item.label }}
      </div>
    </div>
    <div class="common">
      <div class="common-title ui-list">组件</div>
      <div
        v-for="item in componentList"
        :key="item.id"
        class='ui-list-item ui-list-item-none'
        @click="setOptionsComponent(item)"
      > 
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { Guide } from '@element-plus/icons-vue'
import { farmWorkList, componentList } from '../../constants/index'
import type { IcomponentList } from '../../typings'
import { ref } from 'vue'
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { useOptionsStore } from '../../store'

const optionsStore = useOptionsStore()


const uiActiveTag = ref(1)
const setUIFarmWork = (item: IcomponentList) => {
  uiActiveTag.value = item.id
}

const setOptionsComponent = (item: IcomponentList) => {
  const randomId = uuidv4();
  optionsStore.setRenderOptionsComponent({
    uuid: randomId,
    ...item,
    options: {
      originEvent: {}
    }
  })

  console.log(optionsStore.getRenderOptionsComponentList)
}
</script>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 220px;
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

.ui-list {
  &-item {
    display: flex;
    justify-content: center;
    font-size: var(--font-size-small);
    padding: 12px 0;

    &-none {
      color: var(--font-color-3);
    }

    &-active {
      color: var(--font-color-active);
    }

    &:hover {
      cursor: pointer;
      color: var(--font-color-active);
    }

    // &:focus {
    //   color: var(--font-color-active);
    // }
  }
}

.common {
  padding: 20px;
  border-bottom: 1px solid var(--border-color-1);
}

.common-title {
  font-size: var(--font-size-middle);
  color: var(--font-color-1);
}
</style>