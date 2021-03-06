//导包
import { app, BrowserWindow } from 'electron';
import { Menu, MenuItem, dialog, ipcMain } from 'electron';
import { appMenuTemplate } from './menu.js';

// 在安装/卸载Windows时处理创建/删除快捷方式。
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

require('electron-reload')(__dirname);

// 保留对window对象的全局引用，如果不保留，则在对javascript对象进行垃圾收集时，该窗口将自动关闭。
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  //增加主菜单（在开发测试时会有一个默认菜单，但打包后这个菜单是没有的，需要自己增加）
  const menu=Menu.buildFromTemplate(appMenuTemplate); //从模板创建主菜单
  //在File菜单下添加名为New的子菜单
  menu.items[0].submenu.append(new MenuItem({ //menu.items获取是的主菜单一级菜单的菜单数组，menu.items[0]在这里就是第1个File菜单对象，在其子菜单submenu中添加新的子菜单
    label: "新建文件",
    click(){
      mainWindow.webContents.send('action', 'new'); //点击后向主页渲染进程发送“新建文件”的命令
    },
    accelerator: 'CmdOrCtrl+N' //快捷键：Ctrl+N
  }));
  //在New菜单后面添加名为Open的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    label: "打开文件",
    click(){
      mainWindow.webContents.send('action', 'open'); //点击后向主页渲染进程发送“打开文件”的命令
    },
    accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
  })); 
  //再添加一个名为Save的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    label: "保存文件",
    click(){
      mainWindow.webContents.send('action', 'save'); //点击后向主页渲染进程发送“保存文件”的命令
    },
    accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
  }));
  //添加一个分隔符
  menu.items[0].submenu.append(new MenuItem({
    type: 'separator'
  }));
  //再添加一个名为Exit的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    role: 'quit'
  }));
  menu.items[0].submenu.append(new MenuItem({
    type: 'separator'
  }));

  //添加一个前进菜单快捷键
  menu.items[0].submenu.append(new MenuItem({
    label: "前进",
    click(){
      if (mainWindow.webContents.canGoForward()) {
      console.log('快捷键->前进');        
        mainWindow.webContents.goForward();
      }
    },
    accelerator: 'CmdOrCtrl+right' //快捷键：Ctrl+->
  }));

  //添加一个后退菜单快捷键
  menu.items[0].submenu.append(new MenuItem({
    label: "后退",
    click(){
      if (mainWindow.webContents.canGoBack()) {
        console.log('快捷键->后退');
        mainWindow.webContents.goBack()
      }
    },
    accelerator: 'CmdOrCtrl+left' //快捷键：Ctrl+<-
  }));

  Menu.setApplicationMenu(menu); //注意：这个代码要放到菜单添加完成之后，否则会造成新增菜单的快捷键无效

  //浏览器前进事件
  mainWindow.on('app-command', (e, cmd) => {
    // 当用户点击鼠标返回按钮时，导航窗口会后退
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      console.log('鼠标点击后退按钮');
      mainWindow.webContents.goBack()
    }
  });

  //浏览器后退事件
  mainWindow.on('app-command', (e, cmd) => {
    // 当用户点击鼠标返回按钮时，导航窗口会后退
    if (cmd === 'browser-forward' && mainWindow.webContents.canGoForward()) {
      console.log('鼠标点击前进按钮');
      mainWindow.webContents.goForward()
    }
  })



  // 在窗口关闭时发出。
  mainWindow.on('closed', () => {
    // 取消对window对象的引用，通常情况下，如果你的应用支持多窗口，你会将windows存储在一个数组中，这时你应该删除相应的元素。
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
