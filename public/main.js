const { app, BrowserWindow, webContents, ipcMain } = require('electron')
const { appRootPath } = require('./FileService/RootPath')
const { appNotes } = require('./FileService/NotePath')

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            preload: `${path.join(__dirname, 'preload.js')}`
        }
    })

    console.log("Browser Window initialized")

    mainWindow.loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
      )
      
    mainWindow.webContents.openDevTools();

    return mainWindow
}

app.whenReady().then(() => {
    appRootPath(ipcMain, app)
    appNotes(ipcMain, app)
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})