import React from "react"
import FileDisplay from "./FileDisplay"
import "./Styles/main-window.css"
import WelcomePage from "./WelcomPage"

function MainWindow({ currentFile, updateFileName }) {
    const loadDisplay = () => {
        if (currentFile || currentFile === '') {
            return (
                <FileDisplay
                    fileName={currentFile}
                    updateFileName={updateFileName}
                />
            )
        } else {
            <WelcomePage />
        }
    }

    return (
        <div>
            {loadDisplay()}
        </div>
    )
}

export default MainWindow