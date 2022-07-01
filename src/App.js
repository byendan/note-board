import { useState } from 'react'

import Sidebar from "./Sidebar/Components/Sidebar"
import MainWindow from "./MainWindow/Components/MainWindow"

import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const [currentFile, setCurrentFile] = useState("Lorem Ipsum")

  console.log("APP RENDERING")

  const sideWidth = menuOpen ? "300px" : "45px"
  
  const createFile = (fileName) => {
    window.noteService.new(fileName)
    setCurrentFile(fileName)
  }

  return (
    <div className="App" id="outer-container">
      <div className="window-header">
          <b>Notes</b>
      </div>
      <div className="content-wrap" id="content-wrap">
            <div 
              className="sidebar-box"
              style={{ width: sideWidth }}
            >
              <Sidebar 
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                selectFile={setCurrentFile}
                newFile={createFile}
                currentFile={currentFile}
              />
            </div>

          <div 
            className="mainwindow-box"
            style={{ left: sideWidth }}
          >
            <MainWindow 
              currentFile={currentFile}
              fileType="Note"
            />
          </div>
      </div>
    </div>
  )
}

export default App;
