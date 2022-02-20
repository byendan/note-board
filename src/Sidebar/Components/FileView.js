import Styles from "./Styles/file-view.module.css"

function FileView() {
    const sampleFiles = ["First note", "second note", "good idea", "hmmm", "la di da"]
    const fileRows = sampleFiles.map(fileName => {
        return (
            <div className="row" key={fileName}>
                <button className={Styles["file-row"]}>{fileName}</button>
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