const { contextBridge } = require('electron')

console.log("Hello World!!!!!!!!!!!!!!!!!!!!!!")

contextBridge.exposeInMainWorld(
    'backend',
    {
        sayHello: () => console.log("Hello there!")
    }   
)