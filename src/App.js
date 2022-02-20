import { useState } from 'react'

import Sidebar from "./Sidebar/Components/Sidebar"
import MainWindow from "./MainWindow/Components/MainWindow"

import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sideWidth = menuOpen ? "300px" : "65px"

  return (
    <div className="App" id="outer-container">
      <div className="page-wrap" id="page-wrap">
            <div 
              className="sidebar-box"
              style={{ width: sideWidth }}
            >
              <Sidebar 
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </div>

          <div 
            className="mainwindow-box"
            style={{ left: sideWidth }}
          >
            <MainWindow />
          </div>
      </div>
    </div>
  )
}

export default App;
