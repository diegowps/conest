const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')
const path = require('node:path')

let win
function createWindow() {
    nativeTheme.themeSource = 'light'
    win = new BrowserWindow({
        width: 1010,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')

    //Botões
    ipcMain.on('open-client', () => {      
        clientWindow()  
    })
    ipcMain.on('open-supplier', () =>{
        supplierWindow()
    })
    ipcMain.on('open-product', () => {
        productWindow()
    })
    ipcMain.on('open-report', () => {
        reportWindow()
    })
}

function aboutWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        about = new BrowserWindow({
            width: 320,
            height: 240,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            //titleBarStyle: 'hidden' // esconder a barra de estilo (ex.: totem de auto atendimento)
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    about.loadFile('./src/views/sobre.html')

    ipcMain.on('close-about', () => {
        console.log('Recebi a mensagem close-about')
        if (about && !about.isDestroyed()) {
            about.close()
        }
    })
}

function clientWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let client
    if (main) {
        client = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    client.loadFile('./src/views/clientes.html')
}

function supplierWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let supplier
    if (main) {
        supplier = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    supplier.loadFile('./src/views/fornecedores.html')
}

function productWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let product
    if (main) {
        product = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    product.loadFile('./src/views/produtos.html')
}

function reportWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let report
    if (main) {
        report = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    report.loadFile('./src/views/relatorios.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit()
            }
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aplicar zoom',
                accelerator: 'Ctrl++',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir zoom',
                accelerator: 'Ctrl+-',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                accelerator: 'Ctrl+0',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/diegowps/conest')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]