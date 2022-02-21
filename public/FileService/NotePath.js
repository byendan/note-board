const { ipcRenderer } = require("electron")
const fs = require('fs')

const appNotes = (ipcMain, app) => {
    handleLookupNotes(ipcMain, app)
    handleCreateNote(ipcMain)
    handleShowNote(ipcMain)
}

// API:
// window.noteService.list
// window.noteService.new
// window.noteService.show
const preload = (contextBridge, ipcRenderer) => {
    contextBridge.exposeInMainWorld('noteService',{
        list: (setNotes) => lookupNotes(setNotes),
        new: (name) => createNote(name),
        show: (name) => showNote(name)
    })
}

const lookupNotes = (setNotes) => {
    ipcRenderer.invoke('notes:list').then((result) => {
        setNotes(result)
    })
}

const handleLookupNotes = (ipcMain, app) => {
    ipcMain.handle('notes:list', () => {
        const directoryPath = `${app.getAppPath()}/Public/Storage/Notes`
        return fs.readdirSync(directoryPath)
    })
}

const createNote = (name, setCurrentNote) => {
    ipcRenderer.invoke('notes:new').then((result) => {
        setCurrentNote(result)
    })
}

const handleCreateNote = (ipcMain) => {
    ipcMain.handle('notes:new', (result) => {
        // create a note file
        return "new file"
    })
}

const showNote = (name, setNote) => {
    ipcRenderer.invoke('notes:show').then((result) => {
        setNote(result)
    })
}

const handleShowNote = (ipcMain) => {
    ipcMain.handle('notes:show', (result) => {
        return 'This file sure has some interesting content'
    })
}

module.exports = { preload, appNotes }