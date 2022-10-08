var electron = require('electron')

var app = electron.app

var BrowserWindow = electron.BrowserWindow

var minWindow = null
app.on('ready',()=>{
    minWindow = new BrowserWindow({
         width:1200,
         height:800,
    })

    minWindow.loadURL('http://localhost:3000/')

    minWindow.on('close',()=>{
        minWindow = null
    })
})
