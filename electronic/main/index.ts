import type { BrowserWindowConstructorOptions } from 'electron';
import {
  logOn,
  fileOn,
  pathOn,
  machineOn,
  appBeforeOn,
  appProtocolRegister,
  globalInstance,
  shortcutInstance,
  windowInstance,
  Session,
  createTray,
  Update,
  logError
} from '@youliso/electronic/main';
import { join } from 'path';
import { app, nativeTheme } from 'electron';
import { customize, opt } from '@/electronic/cfg/window.json';
import updateCfg from '@/electronic/cfg/update.json';
import logo from '@/electronic/assets/icon/logo.png';

// @ts-ignore
let browserWindowOptions: BrowserWindowConstructorOptions = opt;

if (process.platform === 'linux') {
  browserWindowOptions.frame = true;
}

// 设置窗口管理默认参数
if (!app.isPackaged) {
  // 调试模式
  if (browserWindowOptions.webPreferences) {
    browserWindowOptions.webPreferences.devTools = true;
  } else {
    browserWindowOptions.webPreferences = {
      devTools: true
    };
  }
  windowInstance.setDefaultCfg({
    defaultLoadType: 'url',
    defaultUrl: `http://localhost:5173`,
    defaultPreload: join(__dirname, '../preload/index.js'),
    defaultCustomize: customize,
    defaultBrowserWindowOptions: browserWindowOptions
  });
} else {
  windowInstance.setDefaultCfg({
    defaultLoadType: 'file',
    defaultUrl: join(__dirname, '../../webdist/index.html'),
    defaultPreload: join(__dirname, '../preload/index.js'),
    defaultCustomize: customize,
    defaultBrowserWindowOptions: browserWindowOptions
  });
}

// 应用初始化之前监听和多窗口处理
appBeforeOn({
  additionalData: { type: 'new' },
  isFocusMainWin: true
});

// 注册协议
appProtocolRegister();

app
  .whenReady()
  .then(async () => {
    // 创建托盘
    const tray = createTray({
      name: app.name,
      iconPath: logo as string
    });
    // 创建更新
    const update = new Update(
      { provider: updateCfg.provider as any, url: updateCfg.url },
      'resources/build/cfg/app-update.yml',
      updateCfg.dirname
    );
    // 创建session
    const session = new Session();
    // 模块监听
    logOn();
    fileOn();
    pathOn();
    machineOn();
    globalInstance.on();
    shortcutInstance.on();
    windowInstance.on();
    tray.on('click', () => windowInstance.func('show'));
    update.on();
    session.on();

    windowInstance.interceptor = (browserWindowOptions) => {
      if (browserWindowOptions.titleBarStyle === 'hidden') {
        switch (process.platform) {
          case 'win32':
            browserWindowOptions.titleBarOverlay = {
              color: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',
              symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
              height: 32
            };
            break;
        }
      }
      return {
        ...browserWindowOptions
      };
    };

    // 监听系统主题变化
    nativeTheme.on('updated', () => {
      windowInstance.getAll().forEach((win) => {
        switch (process.platform) {
          case 'win32':
            win.setTitleBarOverlay({
              color: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',
              symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000'
            });
            break;
        }
      });
    });

    // 创建窗口
    const win = windowInstance.create(customize, browserWindowOptions);
    win && windowInstance.load(win, { openDevTools: !app.isPackaged }).catch(logError);
  })
  .catch(logError);
