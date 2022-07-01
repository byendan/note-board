const { contextBridge, ipcRenderer } = require('electron')
const { preload: loadRoot } = require('./FileService/RootPath')
const { preload: loadNotes } = require('./FileService/NotePath')

loadRoot(contextBridge, ipcRenderer)
loadNotes(contextBridge, ipcRenderer)
