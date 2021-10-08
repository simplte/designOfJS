// 1.导入 electron 中的 Menu
const { Menu, BrowserWindow } = require('electron')

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    // submenu 代表下一级菜单
    submenu: [
      {
        label: '子菜单一',
        // 添加点击事件
        click: () => {
          // 创建一个新的窗口
          let sonWin = new BrowserWindow({
            width: 200,
            height: 200,
          })
          sonWin.loadFile('./index2.html')
          // 为关闭的时候进行清空
          sonWin.on('close', () => {
            sonWin = null
          })
        },
      },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
  {
    label: '菜单二',
    // submenu 代表下一级菜单
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
]

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)
