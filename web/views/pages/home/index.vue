<template>
  <div class="info">
    <h1>capacitance</h1>
    <select class="select select-bordered select-xs w-full max-w-xs" data-choose-theme>
      <option value="cupcake" selected>cupcake</option>
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { windowShow } from '@youliso/electronic/ipc';
import { themeChange } from 'theme-change';

export default defineComponent({
  setup() {
    onMounted(() => {
      // @ts-ignore
      window.ipc && windowShow();
      themeChange(false);
    });

    return {};
  }
});
</script>

<style lang="scss" scoped>
@import './style/index';
</style>
