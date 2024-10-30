<template>
  <div class="bg">
    <div class="layout">
      <asideLayout />
      <options />
      <face />
      <operate />
    </div>
  </div>
</template>

<script setup lang="ts">
import asideLayout from './aside.vue'
import options from '../options/index.vue'
import face from '../face/index.vue'
import operate from '../../components/Operate/index.vue'
</script>

<style scoped lang="scss">
.bg {
  background-color: var(--bg-dark);
}

.layout {
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  min-height: 100vh;
}
</style>