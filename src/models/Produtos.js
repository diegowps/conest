/**
 * Modelo de dados (fornecedores)
 */

//importação de bibliotecas
const { model, Schema } = require("mongoose");

//criação da estrutura de dados ("tabela") que será usada no banco
const produtoSchema = new Schema({
  barCode: {
    type: String,
  },
  nomeProduto: {
    type: String,
  },
  preco: {
    type: String,
  },
});

// exportar para o main
//modificar nome da coleção para Produtos
module.exports = model("Produtos", produtoSchema)
