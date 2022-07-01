import { testDbConnection } from "../../test_setup.js"
import { newNote } from "../../../src/apis/notes_api.js"

describe("notesAPI", () => {
    it("creates a new note", async () => {
        const noteName = "First Note"
        newNote(noteName)
        const dbNote = await testDbConnection.select({
            from: "notes_db",
            name: noteName
        })

        expect(dbNote.name).toEqual(noteName)
    })
})