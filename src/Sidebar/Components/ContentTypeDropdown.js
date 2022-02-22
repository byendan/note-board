import { useState } from "react"
import { UncontrolledPopover, PopoverBody } from "reactstrap"
import styles from "./Styles/content-type-dropdown.module.css"

function ContentTypeDropdown() {
    const [currentOption, updateCurrentOption] = useState("Notes")

    const options = ["Notes", "Tasks", "Projects", "Scratch", "All"]
    const optionList = options.map(name => {
        return (
            <div className="row" key={name}>
                <button 
                    className={styles["dropdown-button"]}
                    onClick={() => updateCurrentOption(name)}
                >
                    {name}
                </button>
            </div>
        )
    })

    return (
        <div>
            <div className={styles["dropdown-wrapper"]}>
                <button className={styles["dropdown-button"]} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    {currentOption}
                </button>

                <UncontrolledPopover
                    target="dropdownMenuButton1"
                    lacement="bottom"
                    trigger="focus"
                >
                    <PopoverBody>
                        {optionList}
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        </div>
    )
}

export default ContentTypeDropdown