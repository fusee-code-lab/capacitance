import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/pages/home/index.vue')
  }]
});
export default router;

