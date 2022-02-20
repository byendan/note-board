import { useState } from "react"

import styles from "./Styles/content-type-dropdown.module.css"

function ContentTypeDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const options = ["Notes", "Tasks", "Projects", "Scratch"]
    const currentOption = options[0]
    const optionList = options.map(name => {
        return (
            <div className="row" key={name}>
                <button className={styles["dropdown-button"]}>{name}</button>
            </div>
        )
    })

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const optionsWrapper = () => {
        if (dropdownOpen) {
            return (
                <div className="options-wrapper">
                    <div className="options-list">
                        {optionList}
                    </div>
                </div>
            )
        } else {
            return <div className="closed-options"></div>
        }
    }

    return (
        <div>
            <div className={styles["dropdown-wrapper"]}>
                <button className={styles["dropdown-button"]} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded={dropdownOpen} onClick={() => toggleDropdown()} >
                   {currentOption}
                </button>
            </div>
            {optionsWrapper()}
        </div>
    )
}

export default ContentTypeDropdown