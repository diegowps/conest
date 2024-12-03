/**
 * Modelo de dados (Clientes)
 */

//importação de bibliotecas
const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("tabela") que será usada no banco
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    }
})

// exportar para o main
module.exports = model('Clientes', clienteSchema)
