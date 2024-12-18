/**
 * Processo de renderização
 * clientes.html
 */

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1 - slide (capturar os dados dos inputs do form)
let formFornecedor = document.getElementById('frmFornecedor')
let razaoFornecedor = document.getElementById('inputRazaoFornecedor')
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let urlFornecedor = document.getElementById('inputUrlFornecedor')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formFornecedor.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    //console.log(razaoFornecedor.value, foneFornecedor.value, siteFornecedor.value)

    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const fornecedor = {
        razaoForn: razaoFornecedor.value,
        foneForn: foneFornecedor.value,
        urlForn: urlFornecedor.value
    }
    api.novoFornecedor(fornecedor)
})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log("teste de recebimento do main - pedido para resetar o form")
    document.getElementById('inputRazaoFornecedor').value = ""
    document.getElementById('inputPhoneFornecedor').value = ""
    document.getElementById('inputUrlFornecedor').value = ""
})

// Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<