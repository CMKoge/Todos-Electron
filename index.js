const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow
let addWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false
        }
    })
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
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false
        }
    })
    // addWindow.setMenu(null)
    addWindow.loadFile('todo_create.html')
    addWindow.on('closed', () => addWindow = null) // When add window close clear meomry of window(Collect grabage)
}


// Catch data from todo submit
ipcMain.on('todoSubmit', (e, todo) => {
    mainWindow.webContents.send('todoGet', todo) // Send data to main window3
    addWindow.close()
})


// Create menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New',
                // Click event
                click() {
                    createAddWindow()
                },
                // Add key hot key commibantion to click event
                accelerator: process.platform == 'darwin' ? 'Commman+N' : 'Ctrl+N' 
            },
            { 
                label: 'Clear',
                // Click event
                click() {
                  mainWindow.webContents.send('todoClear')
                },
                // Add key hot key commibantion to click event
                accelerator: process.platform == 'darwin' ? 'Commman+D' : 'Ctrl+D' 
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
            { role: 'reload' }, // Short cut to use conventional function
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