import { createApp } from 'vue';
import { windowLoad } from '@youliso/electronic/ipc/window';
import { getPlatform } from '@/common';
import App from '@/views/app.vue';
import router from '@/router';
import '@/views/style/index.scss';

switch (getPlatform()) {
  case 'win32':
  case 'linux':
  case 'darwin':
    windowLoad((_, args) => {
      // @ts-ignore
      window.customize = args;
      router.addRoute({
        path: '/',
        redirect: args.route as string
      });
      createApp(App).use(router).mount('#root');
    });
    break;
  case 'android':
  case 'ios':
  case 'web':
    router.addRoute({
      path: '/',
      redirect: '/home'
    });
    createApp(App).use(router).mount('#root');
    break;
}
