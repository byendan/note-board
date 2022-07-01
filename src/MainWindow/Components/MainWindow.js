import React from "react"
import NotePage from "./NotePage"
import "./Styles/main-window.css"

function MainWindow({ currentFile, fileType }) {
    return (
        <div>
            <NotePage 
                noteName={currentFile}
            />
        </div>
    )
}

export default MainWindow