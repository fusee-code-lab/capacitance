const fs = require('fs');
const { name, author, productName } = require('../package.json');
const config = require('./build.json');
const windowConfig = require('../src/cfg/window.json');
const updateConfig = require('../src/cfg/update.json');

/** 渲染进程不需要打包到file的包 */
// config.files.push('!**/node_modules/包名');

/**  config配置  **/
config.publish = [
  {
    provider: updateConfig.provider,
    url: updateConfig.url
  }
];
config.productName = name;
config.appId = `org.${author.name}.${name}`;
config.npmRebuild = true; //是否Rebuild编译
config.asar = false; //是否asar打包

/** 窗口配置 **/
windowConfig.customize.title = productName;

/** win配置 **/
config.nsis.displayLanguageSelector = false; //安装包语言提示
config.nsis.menuCategory = false; //是否创建开始菜单目录
config.nsis.shortcutName = name; //快捷方式名称(可中文)
config.nsis.allowToChangeInstallationDirectory = true; //是否允许用户修改安装为位置
config.win.requestedExecutionLevel = ['asInvoker', 'highestAvailable'][0]; //应用权限

/** linux配置 **/
config.linux.target = 'AppImage'; //默认为AppImage
config.linux.executableName = name;

//更新配置
updateConfig.dirname = `${name.toLowerCase()}-updater`;
let update =
  'provider: ' +
  updateConfig.provider +
  '\n' +
  'url: ' +
  updateConfig.url +
  '\n' +
  'updaterCacheDirName: ' +
  updateConfig.dirname +
  '';

let nsh = '';
if (config.nsis.allowToChangeInstallationDirectory) {
  nsh =
    '!macro customHeader\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro preInit\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInit\n' +
    '    ReadRegStr $0 HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall" "UninstallString"\n' +
    '    ${If} $0 != ""\n' +
    '       # ExecWait $0 $1\n' +
    '    ${EndIf}\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInstall\n' +
    '\n' +
    '!macroend\n' +
    '\n' +
    '!macro customInstallMode\n' +
    '   # set $isForceMachineInstall or $isForceCurrentInstall\n' +
    '   # to enforce one or the other modes.\n' +
    '   #set $isForceMachineInstall\n' +
    '!macroend';
} else {
  nsh =
    '; Script generated by the HM NIS Edit Script Wizard.\n' +
    '\n' +
    '; HM NIS Edit Wizard helper defines custom install default dir\n' +
    '!macro preInit\n' +
    '    SetRegView 64\n' +
    '    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    SetRegView 32\n' +
    '    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\\' +
    name +
    '"\n' +
    '!macroend';
}

fs.writeFileSync('scripts/app-update.yml', update);
fs.writeFileSync('scripts/build.json', JSON.stringify(config, null, 2));
fs.writeFileSync('scripts/installer.nsh', nsh);
fs.writeFileSync('src/cfg/window.json', JSON.stringify(windowConfig, null, 2));
fs.writeFileSync('src/cfg/update.json', JSON.stringify(updateConfig, null, 2));
