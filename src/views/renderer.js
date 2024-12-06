// botões
function fechar() {
    api.fecharJanela()
}

function clientes() {
    api.janelaClientes()
}

function fornecedores() {
    api.janelaFornecedores()
}

function produtos() {
    api.janelaProdutos()
}

function relatorios() {
    api.janelaRelatorios()
}

// inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

// Ícone de status do banco de dados
api.dbMensagem((event, message) => {
    // validação e troca do ícone
    if (message === "conectado") {             
        document.getElementById('iconDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconDB').src = "../public/img/dboff.png"
    }
})

/* API */
const cepInput = document.getElementById('cep');
const addressInput = document.getElementById('address');
const numberInput = document.getElementById('number');
const stateDropdown = document.getElementById('state');
const phoneInput = document.getElementById('phone');
const fetchAddressButton = document.getElementById('fetch-address');

// Lista de estados brasileiros para popular o dropdown
const estados = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'TO', nome: 'Tocantins' },
];

// Popula o dropdown de estados
estados.forEach(({ sigla, nome }) => {
  const option = document.createElement('option');
  option.value = sigla;
  option.textContent = nome;
  stateDropdown.appendChild(option);
});

// Função para buscar dados na API ViaCEP
const fetchAddress = async () => {
  const cep = cepInput.value.trim();

  if (cep.length !== 8 || isNaN(cep)) {
    alert('Por favor, insira um CEP válido (8 dígitos numéricos).');
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert('CEP não encontrado.');
      return;
    }

    // Preenche os campos com os dados da API
    addressInput.value = `${data.logradouro}`;
    stateDropdown.value = data.uf;

    // Caso o campo de telefone esteja vazio, preenche o DDD
    if (!phoneInput.value) {
      phoneInput.value = `(${data.ddd}) `;
    }
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    alert('Erro ao buscar o endereço. Tente novamente.');
  }
};

// Adiciona o evento de clique no botão de busca
fetchAddressButton.addEventListener('click', fetchAddress);

// Concatenar endereço e número ao salvar o formulário
const form = document.getElementById('address-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const numero = numberInput.value.trim();
  if (numero) {
    addressInput.value += `, ${numero}`;
  }

  alert('Formulário salvo com sucesso!');
});


/* fim do arq renderer.js */