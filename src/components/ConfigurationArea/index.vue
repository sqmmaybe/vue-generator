<template>
  <el-drawer
    height="30%"
    v-model="drawer"
    direction="rtl"
    title="组件配置项"
  >
    <template #default>
      <el-tabs
        v-model="actionName"
        type="card"
      >
        <el-tab-pane label="属性" name="property">
          <div class="content">
            <div class="content-val">
              <property-input
                v-if="currentType === 'input'"
                :currentUUid="_currentUUid"
                :drawerTag="drawer"
              />
              <property-select
                v-else-if="currentType === 'select'"
                :currentUUid="_currentUUid"
                :drawerTag="drawer"
              />
              <property-table
                v-else-if="currentType === 'table'"
                :currentUUid="_currentUUid"
                :drawerTag="drawer"
              />
              <property-button
                v-else-if="currentType === 'button'"
                :currentUUid="_currentUUid"
                :drawerTag="drawer"
              />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="样式" name="style">
          <div class="content">
            <div class="content-val flow-css">
              <CssRender
                :actionName="actionName"
                :currentUUid="_currentUUid"
              />
            </div> 
          </div>
        </el-tab-pane>

        <el-tab-pane label="事件" name="func">
          <div class="content">
            <div class="content-val flow-css">
              <FunctionRender
                :actionName="actionName"
                :currentUUid="_currentUUid"
                :currentType="currentType"
              />
            </div> 
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PropertyInput from '../PropertyRender/propertyForInput/index.vue'
import PropertySelect from '../PropertyRender/propertyForSelect/index.vue'
import PropertyTable from '../PropertyRender/PropertyForTable/index.vue'
import PropertyButton from '../PropertyRender/propertyForButton/index.vue'
import CssRender from '../CssRender/index.vue'
import FunctionRender from '../FunctionRender/index.vue'
import { useOptionsStore } from '../../store'
import { storeToRefs } from 'pinia'
const optionsStore = useOptionsStore()

const { renderOptionsComponentList } = storeToRefs(optionsStore)

const drawer = ref(false)
const currentType = ref('')
const _currentUUid = ref('')
const actionName = ref('property')
const init = (currentUUid: string) => {
  drawer.value = true
  actionName.value = 'property'
  _currentUUid.value = currentUUid
  if (currentUUid) {
    currentType.value = renderOptionsComponentList.value[currentUUid].value
  }
  else {
    currentType.value = ''
  }
  console.log(renderOptionsComponentList.value)
}


const closeDraw = () => drawer.value = false

const confirm = () => {
  closeDraw()
}

const close = () => {
  closeDraw()
}

defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  &-val {
    padding: 12px;
    background-color: var(--c-black-light);
    display: flex;
    flex-direction: column;
  }
}

.flow-css {
  max-height: 300px;
  overflow-y: auto;
}
</style>

<style>

.el-drawer {
  --el-drawer-bg-color: var(--sidebar-bg-color);
  box-shadow: var(--box-shadow-1);
  color: var(--font-color-1);
}

.el-drawer__header {
  margin-bottom: 0px;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  --el-border-color-light: none;
}

.el-tabs__item {
  --el-text-color-primary: #fff;
}

.el-tabs__item.is-active, .el-tabs__item:hover {
  --el-color-primary: var(--el-color-success);
}

.el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid transparent;
}
</style>