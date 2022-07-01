import { DATA_TYPE } from "jsstore" 
import { connection } from "./js_store_conn"

const dbName = "notes_db"
const notesTable = {
    name: 'notes',
    columns: [
        {
            name: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'title',
            notNull: true,
            unique: true,
            default: `New Note ${Date.now()}`,
            dataType: DATA_TYPE.String
        },
        {
            name: 'content',
            notNull: false,
            dataType: DATA_TYPE.String
        }
    ]
}

const dbSchema = {
    name: dbName,
    tables: [notesTable]
}

const loadDbConnection = async() => {
    try {
        const openConnection = await connection.initDb(dbSchema)
        return openConnection
    } catch (e) {
        console.log("DB Load Error: ", e)
        return null
    }
}

export { loadDbConnection, dbName }
