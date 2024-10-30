<template>
  <div class="face">
    <div class="face-content">
      <renderComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import renderComponent from '../../components/renderComponent/index.vue'
</script>

<style lang="scss" scoped>
.face {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 10px;
  box-shadow: var(--box-shadow-1);
  background-color: var(--c-black-light);

  &-content {
    background-color: #ffffff;
    width: calc(100% - 40px);
    height: 100%;
    padding: 20px;
  }
}
</style>