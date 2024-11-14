const { contextBridge, ipcRenderer } = require('electron')

//estabelecer a conexao com o banco de dados(envio pedido para a main)

ipcRenderer.send('dbConnected')

contextBridge.exposeInMainWorld('api', {
    dbMessage:(message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaEstoque: () => ipcRenderer.send('open-stock'),
    janelaRelatorios: () => ipcRenderer.send('open-report')
})