
const { app, BrowserWindow, Menu, shell, ipcMain, dialog} = require('electron/main')
const path = require('node:path')


// Importação do módulo de conexão
const { dbConnect, desconectar } = require('./database.js')
// status de conexão com o banco. No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e usá-la quando necessário. Fechar e reabrir constantemente a conexão aumenta a sobrecarga e reduz o desempenho do servidor.
// a variável abaixo é usada para garantir que o banco de dados inicie desconectado (evitar abrir outra instância)
let dbcon = null

// importação do Schema Clientes da camada model
const clienteModel = require('./src/models/Clientes.js')

// importação do Schema Fornecedores da camada model
const fornecedorModel = require('./src/models/Fornecedores.js')


// janela principal
let win
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Menu personalizado (comentar para debugar)
    //Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

    // botões
    ipcMain.on('open-client', () => {
        clientWindow()
    })

    ipcMain.on('open-supplier', () => {
        supplierWindow()
    })

    ipcMain.on('open-product', () => {
        productWindow()
    })

    ipcMain.on('open-report', () => {
        reportWindow()
    })
}

// Janela sobre
function aboutWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        about = new BrowserWindow({
            width: 360,
            height: 215,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    about.loadFile('./src/views/sobre.html')

    ipcMain.on('close-about', () => {
        if (about && !about.isDestroyed()) {
            about.close()
        }
    })
}

// Janela clientes
function clientWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let client
    if (main) {
        client = new BrowserWindow({
            width: 800,
            height: 600,
            //autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    client.loadFile('./src/views/clientes.html')
}

// Janela fornecedores
function supplierWindow() {
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

// Janela produtos
function productWindow() {
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

// Janela relatórios
function reportWindow() {
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
    // Melhor local para estabelecer a conexão com o banco de dados
    // Importar antes o módulo de conexão no início do código

    // conexão com o banco
    ipcMain.on('db-connect', async (event, message) => {
        // a linha abaixo estabelece a conexão com o banco
        dbcon = await dbConnect()
        // enviar ao renderizador uma mensagem para trocar o ícone do status do banco de dados
        event.reply('db-message', "conectado")     
    })

    // desconectar do banco ao encerrar a aplicação
    app.on('before-quit', async () => {
        await desconectar(dbcon)
    })

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
                type: 'separator'
            },
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
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/diegowps')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]
//****************************************************************   */
//************************clientes**************************** */
/*****************************************************************   */

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do formulário do cliente
ipcMain.on('new-client', async (event, cliente) => {
    //teste de recebimento dos dados (Passo 2 - slide) Importante!
    console.log(cliente)

    // Passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        // a linha abaixo usa a biblioteca moongoose para salvar
        await novoCliente.save()

        //confirmação de cliente adicionado no banco
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Cliente adicionado com sucesso",
            buttons: ['OK']
        })
        // enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})
//fim do crud create<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/********CRUD Read********************* */
ipcMain.on('search-client', async (event, cliNome) => {
    // teste do recebimento do nome do cliente
    console.log(cliNome)

    // Passo 2 - slide (buscar os dados no banco de dados)
    try {
        // a linha abaixo usa a biblioteca moongoose para buscar
        const dadosCliente = await clienteModel.find
        ({ nomeCliente: new RegExp(cliNome, 'i') })
        console.log(dadosCliente) //teste de retorno dos dados passo 3 e 4


         //teste de retorno dos dados passo 3
//find() -> buscar no banco(moongoose)
//RegExp -> filtro pelo nome cliente 'i' insensitive (maiusculo ou minusculo) 
//Atenção: nomeCliente > model | cliNome > renderizador
//Passos 3 e 4 - 
        // Passo 3 - slide (enviar os dados para o renderizador) pesquisar banco de dados pelo nome
        // passo 5 slide > enviar dados para o renderizador (JSON.stringify > transforma em string JSON)
    event.reply('data-client', JSON.stringify(dadosCliente))



    } catch (error) {
        console.log(error)
    }    
})




/********fim CRUD read */

//****************************************************************   */
//************************fornecedores**************************** */
/*****************************************************************   */

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do formulário do fornecedor
ipcMain.on('new-fornecedor', async (event, fornecedor) => {
    //teste de recebimento dos dados (Passo 2 - slide) Importante!
    console.log(fornecedor)

    // Passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoFornecedor = new fornecedorModel({
            razaoFornecedor: fornecedor.razaoForn,
            foneFornecedor: fornecedor.foneForn,
            siteFornecedor: fornecedor.siteForn
        })
        // a linha abaixo usa a biblioteca moongoose para salvar
        await novoFornecedor.save()

        //confirmação de fornecedor adicionado no banco
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Fornecedor adicionado com sucesso",
            buttons: ['OK']
        })
        // enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})


//****************************************************************   */
//************************produtos**************************** */
/*****************************************************************   */

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do formulário do produto
ipcMain.on('new-produto', async (event, produto) => {
    //teste de recebimento dos dados (Passo 2 - slide) Importante!
    console.log(produto)

    // Passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoProduto = new produtoModel({
            nomeProduto: produto.nomeProd,
            barProduto: produto.barProd,
            precoProduto: produto.precoProd
        })
        // a linha abaixo usa a biblioteca moongoose para salvar
        await novoProduto.save()

        //confirmação de fornecedor adicionado no banco
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Produto adicionado com sucesso",
            buttons: ['OK']
        })
        // enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})
/* >>>>>>>>API VIACEP<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


const https = require('https');


ipcMain.handle('fetch-viacep', async (_, cep) => {
  return new Promise((resolve, reject) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', (err) => reject(err));
  });
});
 
