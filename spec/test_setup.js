import { loadDbConnection } from '../src/db_service/db.js'

const notesData = [
    {
        title: "one",
        content: "Hello world"
    },
    {
        title: "two",
        content: "Foo bar"
    },
    {
        title: "three",
        content: "Bla bla"
    }
]

const testDbConnection = (async() => {
    const loadedConnection = await loadDbConnection()
    console.log("Loaded test DB")
    await loadedConnection.insert({
        into: 'notes',
        values: notesData
    })
    console.log("Inserted notes table test data")
})()

export { testDbConnection }
