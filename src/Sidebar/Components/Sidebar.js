import { slide as Menu } from 'react-burger-menu'

import ContentTypeDropdown from "./ContentTypeDropdown"
import FileView from "./FileView"

import "./Styles/sidebar.css"

function Sidebar({ menuOpen, setMenuOpen, selectFile }) {
    const updateMenuOpen = (state) => {
        setMenuOpen(state.isOpen)
    }

    const wrapperClass = menuOpen ? "open-menu" : "closed-menu";

    return (
        <div className={wrapperClass} >
            <Menu 
                onStateChange={updateMenuOpen}
                isOpen={menuOpen}
                disableCloseOnEsc
                noOverlay
                disableOverlayClick
            >
                <div className="sidebar-header">
                    <p>View</p>
                </div>
                <ContentTypeDropdown />
                <FileView
                    selectFile={selectFile}
                />
            </Menu>
        </div>
    )
}

export default Sidebar