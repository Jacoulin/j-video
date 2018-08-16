// 引入electron
const electron = require('electron');
// app控制整个Electron的声明周期
const app =electron.app;
// 创建一个本地的窗口
const BrowserWindow = electron.BrowserWindow;
// 保持一个全局的窗口对象，可以不显示，如果没有这个对象，窗口点击关闭的时候，js对象会被gc干掉
let mainWindow;

let isMaximized = false;

let screenWidth;
let screenHeight;

let oriBounds;
let maxBounds;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        show:false,

        // backgroundColor: '#50FFFFFF',
        // transparent: true,
        thickFrame: true,
        frame: false
    });

    screenWidth = electron.screen.getPrimaryDisplay().workAreaSize.width;
    screenHeight = electron.screen.getPrimaryDisplay().workAreaSize.height;
    maxBounds = {
        x: 0,
        y: 0,
        width: screenWidth,
        height: screenHeight
    };

    // 加载静态资源
    mainWindow.loadURL('file://' + __dirname + '/html/index.html');

    // 打开开发者工具
    // mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.on('closed',function(){
        mainWindow = null
    });

    mainWindow.on('maximize', (e, cmd) => {
        console.log('最大化');
    })
}

app.on('ready',createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

const ipcMain = electron.ipcMain;

//窗口最小化
ipcMain.on('window-min-req', (event, arg) => {
    mainWindow.minimize();
});
/**
 * 窗口最大化
 *
 * 设置无边框窗口时，使用win.maximize()对窗口进行最大化，会导致意想不到的错误
 *
 * 改为使用win.setSimpleFullScreen(true)的方式对窗口进行最大化
 *
 */
 /*ipcMain.on('window-max-req', (event, arg) => {
    if (mainWindow.isFullScreen()) {
        mainWindow.setSimpleFullScreen(false);
    } else {
        // mainWindow.maximize();
        mainWindow.setSimpleFullScreen(true);
    }
    console.log(mainWindow.getSize());
    event.returnValue = mainWindow.isFullScreen();
});*/

/*ipcMain.on('window-max-req', (event, arg) => {

    if(isMaximized){
        mainWindow.setBounds(oriBounds);
        isMaximized = false;
    }else{
        oriBounds = mainWindow.getBounds();
        mainWindow.setBounds(maxBounds);
        isMaximized = true;
    }

    event.returnValue = isMaximized;

});*/

ipcMain.on('window-max-req',(event, arg) =>{

    if(mainWindow.isMaximized()){
        mainWindow.unmaximize();
    }else{
        mainWindow.maximize();
    }

    console.log(mainWindow.isMaximizable());
    console.log(mainWindow.isMaximized());
    event.returnValue = mainWindow.isMaximized();
});

//窗口关闭
ipcMain.on('window-close-req', (event, arg) => {
    mainWindow.close();
});