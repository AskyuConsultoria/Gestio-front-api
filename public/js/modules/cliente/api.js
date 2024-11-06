import * as contato from "./contato.js"

async function cadastrarContato() {

    const usuario = sessionStorage.getItem('id')
    const responsavelId = sessionStorage.getItem("RESPONSAVEL-ID")

    try {
        const response = await fetch(`http://192.168.137.199:8080/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("input-nome").value,
                sobrenome: document.getElementById("input-sobrenome").value,
                email: document.getElementById("input-email").value,
                usuario: usuario,
                responsavel: responsavelId
            })
        });

        const dados = await response.json()
        console.log(dados)

        buscarClientePorId(dados.id)
        sessionStorage.setItem("CLIENTE-ID", dados.id)
        return response.status

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}



async function cadastrarTelefone(tipoTelefone) {
    const usuarioId = sessionStorage.getItem('id')
    const clienteId = sessionStorage.getItem('CLIENTE-ID')

    try {
        const response = await fetch(`http://192.168.137.199:8080/telefone`, {
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
        const response = await fetch(`http://192.168.137.199:8080/clientes/${novoClienteId}/buscarUm`, {
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



async function buscarClientesPorNome(clienteNome) {
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://192.168.137.199:8080/clientes/${usuarioId}/filtro-nome?nome=${clienteNome}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        if (response.status == 204) {
            document.querySelector('#conteudo-cliente').innerHTML = `<span class="d-flex text-secondary py-3 px-3 h-100">Não existem clientes com o nome procurado.<span>`
            return []
        }

        const dados = await response.json()
        console.log(dados)
        
        return dados 

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


export {
    cadastrarContato,
    buscarClientePorId,
    buscarClientesPorNome
}