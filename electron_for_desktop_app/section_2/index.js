const electron = require('electron');
// const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain, Menu } = electron;


let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow =  new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


function createAddWindow(){
  addWindow = new BrowserWindow({
    height: 200, 
    width: 300,
    title: 'Add new todo'
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);

}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      { 
        label: 'Add file',
        click() { createAddWindow() }
      },
      { 
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ],
  }
];

// this make mac menus shown same way than window or linux
if (process.platform === 'darwin'){
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        label: 'Toggle developer tool',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I': 'Ctrl+Shift+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

ipcMain.on('videoSubmit', (event, path)  =>{
    // ffmpeg.ffprobe(path, (err, metadata) => {
    //     console.log('videon kesto: ', metadata.format.duration);
    //     mainWindow.webContents.send('videoMetadata', metadata.format.duration);
    // });
});











