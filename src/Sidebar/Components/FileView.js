import { useEffect, useState } from 'react'
import Styles from "./Styles/file-view.module.css"

function FileView({selectFile, currentFile}) {
    const [fileNames, setFiles] = useState([])

    useEffect(() => {
        window.noteService.list(setFiles)
    }, [currentFile])

    const fileRows = fileNames.map(fileName => {
        return (
            <div className="row" key={fileName}>
                <button 
                    className={Styles["file-row"]}
                    onClick={() => selectFile(fileName)}
                >
                    {fileName}
                </button>
            </div>
        )
    })
    return (
        <div>
            {fileRows}
        </div>
    )
}

export default FileView