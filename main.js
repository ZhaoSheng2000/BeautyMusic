const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 670,
        show: false,
        backgroundColor: '#1e1e1e',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.loadURL("http://localhost:3000")
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
//login    
    const login = new BrowserWindow({ 
        parent: mainWindow,
        show: false,
        resizable: false,
        width: 500,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
     })
     login.loadURL('http://localhost:3000')
     login.once('ready-to-show', () => {
        login.show()
})
login.webContents.openDevTools()
}

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log('asynchronous-message:'+arg) 
    event.reply('asynchronous-reply', 'ipcmain收到消息并且回复给你了的话')
  })


app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
