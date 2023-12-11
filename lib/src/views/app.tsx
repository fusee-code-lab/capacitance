import { windowShow } from '@youliso/electronic/ipc';

console.log('11')
export const onReay = () => {
  console.log('11')
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
