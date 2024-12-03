/**
 * Modelo de dados (fornecedores)
 */

//importação de bibliotecas
const { model, Schema } = require("mongoose");

//criação da estrutura de dados ("tabela") que será usada no banco
const fornecedorSchema = new Schema({
  razaoFornecedor: {
    type: String,
  },
  foneFornecedor: {
    type: String,
  },
  siteFornecedor: {
    type: String,
  },
});

// exportar para o main
//modificar nome da coleção para Fornecedores
module.exports = model("Fornecedores", fornecedorSchema)

