<template>
  <div class='info'>
    <h1>hello</h1>
    <button class="btn">Button</button>
    <button class="btn btn-neutral">Neutral</button>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-accent">Accent</button>
    <button class="btn btn-ghost">Ghost</button>
    <button class="btn btn-link">Link</button>
  </div>
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

