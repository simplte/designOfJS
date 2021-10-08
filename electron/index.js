// 导入 electron
const { app, BrowserWindow } = require('electron')

let mainWindow = null

app.on('ready', () => {
  // // 新建一个窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
      contextIsolation: false,
    },
  })
  // 加载渲染文件
  mainWindow.loadFile('./index2.html')
  // 窗口关闭后清空变量
  mainWindow.on('close', () => {
    mainWindow = null
  })
})