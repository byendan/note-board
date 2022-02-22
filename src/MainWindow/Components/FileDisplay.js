import { Input } from 'reactstrap'

function FileDisplay({fileName, updateFileName}) {
    const nameFieldChange = (event) => {
        updateFileName(fileName, event.target.value)
    }

    return (
        <div>
            <Input value={fileName} id="name" onChange={nameFieldChange}/>
        </div>
    )
}

export default FileDisplay