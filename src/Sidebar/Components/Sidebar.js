import { slide as Menu } from 'react-burger-menu'

import ContentTypeDropdown from "./ContentTypeDropdown"
import FileView from "./FileView"

import "./Styles/sidebar.css"

function Sidebar({ menuOpen, setMenuOpen }) {
    const updateMenuOpen = (state) => {
        setMenuOpen(state.isOpen)
    }

    const wrapperClass = menuOpen ? "open-menu" : "closed-menu";

    return (
        <div className={wrapperClass} >
            <Menu 
                onStateChange={updateMenuOpen}
                disableCloseOnEsc
                noOverlay
                disableOverlayClick
            >
                <h1 className="menu-item">Sidebar</h1>
                <ContentTypeDropdown />
                <FileView />
            </Menu>
        </div>
    )


    // return (
    //     <div className={`${styles["sidebar-outline"]}`}>
    //         <h1>Sidebar</h1>
    //         <ContentTypeDropdown />
    //         <FileView />
    //     </div>
    // )
}

export default Sidebar