<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="route.meta['keepAlive']" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!route.meta['keepAlive']" />
  </router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
