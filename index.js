const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

let mainWindow
let addWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadFile('main.html')
    mainWindow.on('closed', () => app.quit()) // When main window close quit app with other sub window
    
    const mainMenu = Menu.buildFromTemplate(menuTemplate) // Build menu from template
    Menu.setApplicationMenu(mainMenu) // Put created menu into use
})

// Window for create new todos
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'New Todo',
    })
    addWindow.setMenu(null)
    addWindow.loadFile('todo_create.html')
}

// Create menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New Todo',
                // Click event
                click() {
                    createAddWindow()
                },
                // Add key hot key commibantion to click event
                accelerator: process.platform == 'darwin' ? 'Commman+N' : 'Ctrl+N' 
            },
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


// Run if not in production
if (process.env.NODE_ENV != 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools() // Toggle dev tools in focused window
                },
                accelerator: 'Ctrl+Shift+I'
            }
        ]
    })
}