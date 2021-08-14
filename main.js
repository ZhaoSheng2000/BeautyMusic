const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 670,
        show: false,
        // titleBarStyle: 'hidden',
        backgroundColor: '#1e1e1e',
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.loadURL("http://localhost:3000")
    // Open the DevTools.
    mainWindow.webContents.openDevTools()


    //loginWindow
    // const login = new BrowserWindow({
    //     parent: mainWindow,
    //     show: false,
    //     resizable: false,
    //     width: 500,
    //     height: 600,
    //     webPreferences: {
    //        preload: path.join(__dirname, '/preload.js'),
    //         nodeIntegration: true,
    //         contextIsolation: false
    //     }
    // })

    // login.loadURL('http://localhost:3000/login')
    // login.once('ready-to-show', () => {
    //     login.show()
    // })
    // login.webContents.openDevTools()
    // //接收登录窗口登录状态
    // ipcMain.on('login-message', (event, arg) => {
    //     console.log('login-message:' + arg)
    //     if(arg == 'loginSuccess'){
    //         login.close()
    //     }
    // })
    // //接收Home.jsx页面的cookie状态
    // ipcMain.on('ifUserCookie',(e,arg)=>{
    //     console.log('ifUserCookie:'+arg)
    // })




}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
