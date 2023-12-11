import { windowLoad } from '@youliso/electronic/ipc/window';
import { getPlatform } from '@/common';

switch (getPlatform()) {
  case 'win32':
  case 'linux':
  case 'darwin':
    windowLoad((_, args) => {
      // @ts-ignore
      window.customize = args;
      import('@/router').then((router) => router.default.mount('root', args.route));
    });
    break;
  case 'android':
  case 'ios':
  case 'web':
    import('@/router').then((router) => router.default.mount('root'));
    break;
}
