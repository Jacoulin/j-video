// 引入electron
const electron = require('electron');


const ipc = electron.ipcMain
//登录窗口最小化
ipc.on('window-min',function(){
  mainWindow.minimize();
})
//登录窗口最大化
ipc.on('window-close',function(){
  mainWindow.close();
})


// app控制整个Electron的声明周期
const app =electron.app;
// 创建一个本地的窗口
const BrowserWindow = electron.BrowserWindow
// 保持一个全局的窗口对象，可以不显示，如果没有这个对象，窗口点击关闭的时候，js对象会被gc干掉
let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 360,
        height: 480,

        resizable: false,

        maximizable: false,

        transparent: true,

        frame: false
    })
    // 加载静态资源
    mainWindow.loadURL('file://' + __dirname + '/html/login.html');

    // 打开开发者工具
    // mainWindow.webContents.openDevTools()

    mainWindow.on("closed",function(){
        mainWindow = null
    })
}

// 生命周期的函数定义
// 这里好好看api http://electron.atom.io/docs/api/app/
app.on("ready",createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})