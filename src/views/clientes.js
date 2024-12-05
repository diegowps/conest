/**
 * Processo de renderização
 * clientes.html
 */


//array usado nos metodos para manipulacao da estrutura de dados (para armazenar os dados dos clientes)
let arrayCliente = []


// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1 - slide (capturar os dados dos inputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')
let cepCliente = document.getElementById('inputCepClient')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value, cepCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value,
        cepCli: cepCliente.value

    }
    api.novoCliente(cliente)
})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (receber os dados do main)
/*api.listarClientes((clientes) => {
    // Passo 2 - slide (iterar sobre os dados recebidos)
    let listaClientes = document.getElementById('listaClientes')
    listaClientes.innerHTML = ""
    clientes.forEach(cliente => {
        // Passo 3 - slide (criar um elemento para cada item da lista)
        let itemLista = document.createElement('li')
        itemLista.textContent = `${cliente.nomeCli} - ${cliente.foneCli} - ${cliente.emailCli} - ${cliente.cepCli}`
        // Passo 4 - slide (adicionar o item à lista)
        listaClientes.appendChild(itemLista)
    })
})*/

function buscarCliente(){
    // Passo 1 - slide (receber os dados do main)
    let cliNome = document.getElementById('searchClient').value
    console.log(cliNome) //teste do passo 1
    api.buscarCliente(cliNome)
        // Passo 2 - slide (iterar sobre os dados recebidos)
    api.renderizarCliente((event, dadosCliente) => {
        console.log(dadosCliente)
        // passo 6 slide - renderizacao dos dados do cliente no formulario
        const clienteRender = JSON.parse(dadosCliente)
        console.log(clienteRender)
        arrayCliente = clienteRender

        console.log(arrayCliente)

        arrayCliente.forEach((c) => {
           document.getElementById('inputNameClient').value = c.nomeCli
              document.getElementById('inputPhoneClient').value = c.foneCli
                document.getElementById('inputEmailClient').value = c.emailCli
                document.getElementById('inputCepClient').value = c.cepCli
        })
    })
    
}
/* passo 6 slide - renderizacao dos dados do cliente no formulario*/
arrayCliente = dadosCliente
//teste cliente
console.log(arrayCliente)


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log("teste de recebimento do main - pedido para resetar o form")
    document.getElementById('inputNameClient').value = ""
    document.getElementById('inputPhoneClient').value = ""
    document.getElementById('inputEmailClient').value = ""
    document.getElementById('inputCepClient').value = ""
}
)
// Fim Reset Form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<