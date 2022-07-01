/* eslint-disable import/no-webpack-loader-syntax */
// import * from 'node-self'
// import require('file-loader')
import JsStore from "jsstore"
import { Worker } from "worker_threads"

const getWorkerPath = () => {
    const basePath = require.resolve('jsstore')
    // console.log("Base jsstore path: ", basePath)
    const splitPath = basePath.split('/')
    const distPath = splitPath.filter((_e, index) => index < splitPath.length - 1)
    // console.log("Dist Path", distPath)
    const jsStorePath = distPath.join('/')
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        const notCompiledPath = `${jsStorePath}/jsstore.worker.js`
        return notCompiledPath
    } else {
        const compiledPath = `${jsStorePath}/jsstore.worker.min.js`
        return compiledPath
    }
}

const workerPath = getWorkerPath()
console.log("WORKER PATH: ", workerPath)
// const jsStorePath = require(workerPath)
// console.log("JS STORE PATH: ", jsStorePath)
const dbWorker = new Worker(workerPath)
// need to teardown the db at the end of testing
dbWorker.on('error', error => {
    console.log("ERROR: ", error)
})

const connection = new JsStore.Connection(dbWorker)

export { connection }