const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadFile('main.html')
    
    const mainMenu = Menu.buildFromTemplate(menuTemplate) // Build menu from template
    Menu.setApplicationMenu(mainMenu) // Put created menu into use
})

// Create menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo' },
            { 
                label: 'Quit',
                // Click event
                click() {
                    app.quit()
                },
                // Add key hot key commibantion to click event
                accelerator: process.platform == 'darwin' ? 'Commman+Q' : 'Ctrl+W'
            }
        ]
    }
]

// Check if OS is mac and add show element to menu
if (process.platform == 'darwin') {
    menuTemplate.unshift({})
}