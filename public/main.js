const { app, BrowserWindow, webContents } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

// require('@electron/remote/main').enable(webContents)

require('@electron/remote/main').initialize()

function createWindow() {
    console.log("Printing from main")
    const win = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            preload: `${path.join(__dirname, 'preload.js')}`
        }
    })

    win.loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
      )
    win.webContents.openDevTools();
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})