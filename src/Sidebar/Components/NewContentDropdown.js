import { UncontrolledPopover, PopoverBody } from "reactstrap"

function NewContentDropdown({ newFile, updateName }) {
    const pickNewFile = () => {
        const currentTime = Date().toLocaleString()
        const fileName = `New File ${currentTime}`
        newFile(fileName, updateName)
    }

    return (
        <div>
            <div className="dropdown-wrapper">
                <button className="dropdown-button btn btn-primary" type="button" id="newContentDropdown" data-bs-toggle="dropdown">
                    New
                </button>

                <UncontrolledPopover
                    target="newContentDropdown"
                    lacement="bottom"
                    trigger="focus"
                >
                    <PopoverBody>
                        <div id="new-note">
                            <button
                                className="dropdown-button"
                                onClick={pickNewFile}
                            >
                                Note
                            </button>
                        </div>

                        <div id="new-task">
                            <button
                                className="dropdown-button"
                                onClick={() => console.log("new-task clicked")}
                            >
                                Task
                            </button>
                        </div>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        </div>
    )
}

export default NewContentDropdown