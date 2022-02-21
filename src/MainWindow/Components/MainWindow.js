import "./Styles/main-window.css"

function MainWindow({ currentFile }) {
    const title = currentFile ? currentFile : "Welcome, open or create a file to begin"
    return (
        <div>
            <div className="window-header">
                <h1>{title}</h1>
            </div>

            <div className="window-body">
                <div className="file-view">
                    <p>Some kind of text</p>
                </div>
            </div>
        </div>
    )
}

export default MainWindow