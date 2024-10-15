import * as contato from "./modules/cliente/contato.js"

async function cadastrarContato() {

    const usuario = sessionStorage.getItem('id')

    try {
        const response = await fetch(`http://localhost:8080/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("input-nome").value,
                sobrenome: document.getElementById("input-sobrenome").value,
                email: document.getElementById("input-email").value,
                usuario: usuario
            })
        });

        const dados = await response.json()
        console.log(dados)

        buscarClientePorId(dados.id)
        return response.status

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}


async function cadastrarTelefone(tipoTelefone) {
    const usuarioId = sessionStorage.getItem('id')
    const clienteId = sessionStorage.getItem('CLIENTE-ID')

    try {
        const response = await fetch(`http://localhost:8080/telefone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: {
                    id: usuarioId
                },
                tipoTelefone: {
                    id: 1
                },
                cliente: {
                    id: clienteId
                },
                numero: document.querySelector(`#${tipoTelefone}`).value
            })
        })
        
        var dados = await response.json()
        console.log(dados) 

       

    } catch (error) {
    console.log(`Houve um erro: ${error}`)
    }

}


async function buscarClientePorId(novoClienteId) {
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://localhost:8080/clientes/${novoClienteId}/buscarUm`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        if (response.status == 204) {
            return []
        }

        const dados = await response.json()
        console.log(dados)

        contato.preencherDadosCliente(dados)
        

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


export {
    cadastrarContato,
    buscarClientePorId
}