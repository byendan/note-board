import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"

const sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const NotePage = ({ noteName }) => {
    const [noteContent, updateNoteContent] = useState(sampleText)

    // const loadNote = (ace) => {
    //     console.log("Got an Ace: ", ace)
    //     window.noteService.show(noteName, updateNoteContent)
    // }

    // const syncNote = async (content, aceEvent) => {
    //     console.log("Sending new content: ", content)
    //     console.log(window.noteService)
    //     await window.noteService.updateText(noteName, content)
    // }

    const updateNoteText = (newText, aceEvent) => {
        // console.log(`Debug NotePage#updateNoteText: newText: ${newText}, aceEvent: ${aceEvent}`)
        updateNoteContent(newText)
    }

    return (
        <div>
            <h3>Note: {noteName}</h3>
            <div style={{ width: "100vw", height: "100%", overflow: "auto"}}>
                <AceEditor
                    mode="javascript"
                    theme="github"
                    defaultValue={noteContent}
                    onChange={(value, aceEvent) => { updateNoteText(value, aceEvent)}}
                    name="noteEditor"
                    editorProps={{ $blockScrolling: true }}
                    width="85%"
                    height="85vh"
                />
            </div>

        </div>
    )
}

NotePage.propTypes = {
    noteName: PropTypes.string
}

NotePage.defaultProps = {
    noteName: "Lorem Ipsum"
}

export default NotePage
