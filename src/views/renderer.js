//botões
function fechar(){
    api.fecharJanela()
}

function clientes(){
    api.janelaClientes()
}

function fornecedores(){
    api.janelaFornecedores()
}

function produtos(){
    api.janelaProdutos()
}

function relatorios(){
    api.janelaRelatorios()
}

//inserção de data no rodape
function obterData(){
    const data = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return data.toLocaleDateString('pt-BR', options)
}
document.getElementById('dataAtual').innerHTML = obterData()

//icone de status do banco de dados
api.dbMessage(event, message) => {
    //validação e troca do icone de conexao
    if (message === 'connected') {
        document.getElementById('iconDB').src = '../public/img/dbon.png'
    } else {
        document.getElementById('iconDB').src = '../public/img/dboff.png'
    }
}
