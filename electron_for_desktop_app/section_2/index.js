const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain } = electron;


let mainWindow;

app.on('ready', () => {
    mainWindow =  new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('videoSubmit', (event, path)  =>{
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('videon kesto: ', metadata.format.duration);
        mainWindow.webContents.send('videoMetadata', metadata.format.duration);
    });
});











