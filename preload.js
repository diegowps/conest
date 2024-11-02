const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaEstoque: () => ipcRenderer.send('open-stock'),
    janelaRelatorios: () => ipcRenderer.send('open-report')
})