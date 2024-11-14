/**
 * modulo de conexao com o banco de dados
 * uso do mongoose
 */
const mongoose = require('mongoose');

// definir a url e autenticação do banco de dados
let url = 'mongodb+srv://admin:123senac@clusternewconest.dqb0f.mongodb.net/';
//status de conexão (icone de conexão)
let isConnected = false

// só estabelecer uma conexão se não estiver conectado
const dbConnected = async () => {
    if (isConnected === false) {
        await conectar()
        console.log('Já conectado ao banco de dados')
        return
    }
    }

    //conectar ao banco de dados
    const conectar = async () => {
        if (isConnected === false) {
            try {
                //linha de conexão com o banco de dados
                await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
                isConnected = true //sinalizar que está conectado
                console.log('Conectado ao banco de dados')
            } catch (error) {
                console.log(`Erro ao conectar ao banco de dados: ${error}`)
                return
            }
        }
    }
    //desconectar do banco de dados
    const desconectar = async () => {
        if (isConnected === true) {
            try {
                //linha de desconexão com o banco de dados
            await mongoose.disconnect(url)
            isConnected = false
            console.log('Desconectado do banco de dados')
            }catch (error) {
                console.log(`Erro ao desconectar do banco de dados: ${error}`)
                return
            }
        }
    }

    // exportar as funções de conexão e desconexão
    //exportar  para a main as funções desejadas
    module.exports = { dbConnected, desconectar }