import { Input } from 'reactstrap'

function NewFileForm({newFile, updateFileName}) {
    const nameFieldChange = (event) => {
        updateFileName(event.target.value)
    }

    return (
        <div>
            <Input value={newFile} id="name" name="name" onChange={nameFieldChange}/>
            <h1>hi</h1>
        </div>
    )
}

export default NewFileForm