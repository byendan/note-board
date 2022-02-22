const { ipcRenderer } = require("electron")
const fs = require('fs')

const appNotes = (ipcMain, app) => {
    handleLookupNotes(ipcMain, app)
    handleCreateNote(ipcMain, app)
    handleShowNote(ipcMain)
    handleUpdateNoteName(ipcMain, app)
}

// API:
// window.noteService.list
// window.noteService.new
// window.noteService.show
const preload = (contextBridge, ipcRenderer) => {
    contextBridge.exposeInMainWorld('noteService',{
        list: (setNotes) => lookupNotes(setNotes),
        new: (name, setCurrentNote) => createNote(name, setCurrentNote),
        show: (name) => showNote(name),
        updateName: (originalName, newName) => updateNoteName(originalName, newName)
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
    console.log("create note with name: ", name)
    ipcRenderer.invoke('notes:new', name).then((result) => {
        setCurrentNote(result)
    })
}

const handleCreateNote = (ipcMain, app) => {
    ipcMain.handle('notes:new', (req, name) => {
        console.log("notes:new received name: ", name)
        const filePath = `${app.getAppPath()}/Public/Storage/Notes/${name}`
        fs.closeSync(fs.openSync(filePath, 'w'));
        return name
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

const updateNoteName = (originalName, newName) => {
    ipcRenderer.invoke('notes:updateName', originalName, newName).then((result) => {
        return 'name updated'
    })
}

const handleUpdateNoteName = (ipcMain, app) => {
    ipcMain.handle('notes:updateName', (req, originalName, newName) => {
        const baseFilePath = `${app.getAppPath()}/Public/Storage/Notes/`
        const originalPath = `${baseFilePath}${originalName}`
        const newPath = `${baseFilePath}${newName}`
        fs.rename(originalPath, newPath, () => 'name updated')
    })
}

module.exports = { preload, appNotes }