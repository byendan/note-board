const { ipcRenderer } = require("electron")
const { loadDbConnection } = require("../../src/db_service/db.js")
const fs = require('fs')

const appNotes = (ipcMain, app) => {
    handleLookupNotes(ipcMain, app)
    handleCreateNote(ipcMain, app)
    handleShowNote(ipcMain, app)
    handleUpdateNoteName(ipcMain, app)
    handleUpdateNoteText(ipcMain, app)
}

const notesPath = app => {
    return `${app.getAppPath()}/public/Storage/Notes`
}

// API:
// window.noteService.list
// window.noteService.new
// window.noteService.show
// window.noteService.updateName
// window.noteService.updateText
const preload = (contextBridge, ipcRenderer) => {
    contextBridge.exposeInMainWorld('noteService',{
        list: (setNotes) => lookupNotes(setNotes),
        new: (name, setCurrentNote) => createNote(name, setCurrentNote),
        show: (name, updateText) => showNote(name, updateText),
        updateName: (originalName, newName) => updateNoteName(originalName, newName),
        updateText: (noteName, newText) => updateNoteText(noteName, newText)
    })
}

const writeCache = {}

const lookupNotes = (setNotes) => {
    console.log("notes:list")
    ipcRenderer.invoke('notes:list').then((result) => {
        setNotes(result)
    })
}

const handleLookupNotes = (ipcMain, app) => {
    ipcMain.handle('notes:list', () => {
        return fs.readdirSync(notesPath(app))
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
        const filePath = `${notesPath(app)}/${name}`
        fs.closeSync(fs.openSync(filePath, 'w'));
        return name
    })
}

const showNote = (name, updateText) => {
    console.log(`Debug NotePath#showNote invoking notes:show name: ${name}, updateText: ${updateText}`)
    ipcRenderer.invoke('notes:show', name).then(noteText => {
        try {
            console.log("Debug notes:show found text: ", noteText)
            updateText(noteText)
        } catch(e) {
            console.log("Error with showing note: ", e)
        }
    })
}
const handleShowNote = (ipcMain, app) => {
    ipcMain.handle('notes:show', (req, name) => {
        console.log(`Debug NotePath#handleShowNote notes:show req: ${req}, name: ${name}`)
        const filePath = `${notesPath(app)}/${name}`
        console.log("Debug filePath: ", filePath)
        const noteText = fs.readFileSync(filePath, 'utf-8')
        console.log("Debug Found note text: ", noteText)
        // writeCache[filePath] = fs.createWriteStream(filePath)
        return noteText
    })
}

// if no return type is needed then the one operation does not need a response, so invoke handle is not the right way to 
// use messages

// one way operation
const updateNoteName = (originalName, newName) => {
    console.log("notes:updateName")
    ipcRenderer.invoke('notes:updateName', originalName, newName).then((result) => {
        return 'name updated'
    })
}

const handleUpdateNoteName = (ipcMain, app) => {
    console.log("notes:updateName")
    ipcMain.handle('notes:updateName', (req, originalName, newName) => {
        const originalPath = `${notesPath(app)}/${originalName}`
        writeCache[originalPath].close()
        writeCache[originalPath] = null
        const newPath = `${notesPath(app)}/${newName}`
        fs.rename(originalPath, newPath, () => 'name updated')
        writeCache[newPath] = fs.createWriteStream(newPath)
    })
}

// one way operation
const updateNoteText = (noteName, newText) => {
    console.log(`Debug NotePath#updateNoteText notes:updateText noteName: ${noteName}, newText: ${newText}`)
    ipcRenderer.send('notes:updateText', noteName, newText)
}

const handleUpdateNoteText = (ipcMain, app) => {
    console.log("notes:updateText")
    ipcMain.on('notes:updateText', (req, noteName, newText) => {
        console.log(`Debug NotePath#handleUpdateNoteText. req: ${req}, noteName: ${noteName}, noteText: ${newText} `)
        const notePath = `${notesPath(app)}/${noteName}`
        writeToFile(notePath, newText)
    })
}

const writeToFile = (filePath, content) => {
    try {
        if (writeCache && writeCache[filePath]) {
            writeCache[filePath].write(content)
        } else {
            fs.writeFile(filePath, content, () => {
                // writeCache[filePath] = fs.createWriteStream(filePath)
            })
        }
    } catch (error) {
        console.log("Error writing to file: ", error)
    }
}

// index db backed api 
// 
//

const listNotes = async () => {
    const notesDb = await loadDbConnection()
    // console.log("DB: ", notesDb)
    const noteList = await notesDb.select({ from: "notes_db" })
    // console.log("Note list: ", noteList)
    const noteNameList = noteList.map(({name}) => name)
    console.log("Note names: ", noteNameList)
    return noteNameList
}

module.exports = { preload, appNotes, listNotes }