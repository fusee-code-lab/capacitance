import { windowShow } from '@youliso/electronic/ipc';

export const onReady = () => {
  // @ts-ignore
  window.ipc && windowShow();
};

export const render = async () => {
  return (
    <div class="container">
      <div>hello word</div>
      <div router></div>
    </div>
  );
};
