import os       from "os";
import path     from "path";
import url      from "url";
import Bonjour  from "bonjour";
import electron from "electron";
import Server   from "./server";

const bonjour       = Bonjour();
const { ipcMain }   = require('electron');
const { spawn }     = require("child_process");
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const port          = 1604 + Math.floor(Math.random()*10);
const server        = new Server(port);

let servers = [];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function informServers () {
    console.log("informing servers", servers);
    servers.forEach((o) => {
        mainWindow.webContents.send( 'lan_player', { addr: o.addresses[0], port: o.port } );
    });
}

function createWindow () {
    app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1080, height: 600});
    
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
    }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	mainWindow = null
    });

    // reset and resend servers
    servers = [];
    informServers();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
	app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
	createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
 
// advertise an HTTP server on port 3000
bonjour.publish({
    name: 'Battleships',
    type: 'battleships',
    port: port,
});
 
// browse for all battleship services
bonjour.find({ type: 'battleships' }, (service) => {
    servers.push(service);
    informServers();
});
