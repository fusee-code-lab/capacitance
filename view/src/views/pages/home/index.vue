<template>
  <div class='info'>hello</div>
</template>
<script lang='ts'>
import { defineComponent, onMounted } from 'vue';
import { windowShow } from '@youliso/electronic/ipc';

export default defineComponent({
  setup() {
    onMounted(() => {
      // @ts-ignore
      window.ipc && windowShow();
    });
    return {};
  }
});
</script>

<style lang='scss' scoped>
@import "./style/index";
</style>

