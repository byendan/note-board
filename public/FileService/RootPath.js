// Proof of concept
const { ipcRenderer } = require("electron")

// preload
const loadRoot = (setRootPath) => {
    ipcRenderer.invoke('path:root').then((result) => {
        setRootPath(result)
    })
}

// api handler
const appRootPath = (ipcMain, app) => {
    ipcMain.handle('path:root', () => {
        const result = app.getAppPath()
        console.log("path:root being handled", result)
        return `${result}/public/Storage`
    } )
}

// API 
// window.rootService.rootDirectory()

const preload = (contextBridge, ipcRenderer) => {
    contextBridge.exposeInMainWorld('rootService',{
        rootDirectory: (setRootPath) => loadRoot(setRootPath)
    })
}

module.exports = { preload, appRootPath }