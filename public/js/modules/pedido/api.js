
import * as pedido from "./pedido.js"

var clienteId = pedido.clienteId

window.buscarAgendamento = buscarAgendamento
window.buscarClienteView = buscarClienteView

async function buscarAgendamento() {

    var agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://localhost:8080/agendamento/${usuarioId}/${agendamentoId}`, {
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
        pedido.preencherDadosDePedidoCompleto(dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


async function buscarClienteView(clienteId) {
    try {
        const response = await fetch(`http://localhost:8080/cliente-view/${clienteId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        const dados = await response.json()
        console.log(dados)
        pedido.preencherDadosCliente(dados)

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
        pedido.associarClienteACriacaoDePedido(novoClienteId, dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


async function buscarClientesPorNome(clienteNome) {
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://localhost:8080/clientes/${usuarioId}/filtro-nome?nome=${clienteNome}`, {
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
        pedido.preencherCardsDeCliente(dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


async function atualizarDadosCliente(clienteId) {
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://localhost:8080/clientes/${clienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: clienteId,
                nome: document.querySelector('#input-nome').value,
                sobrenome: document.querySelector('#input-sobrenome').value,
                email: document.querySelector('#input-sobrenome').value
            })
        });

        const dados = await response.json()
        console.log(dados)

        await pedido.exibirStatusDaRespostaAPI(response)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function atualizarDadosPedido(agendamentoId) {
    var usuarioId = parseInt(sessionStorage.getItem("id"))

    try {
        const response = await fetch(`http://localhost:8080/agendamento/${usuarioId}/${agendamentoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: "Agendamento",
                dataInicio: document.querySelector("#input-data-inicio").value,
                dataFim: document.querySelector("#input-data-fim").value,
                usuario: {
                    id: usuarioId
                },
                cliente: {
                    id: clienteId
                },
                etapa: {
                    id: 1
                }
            })
        });

        const dados = await response.json()
        console.log(dados)

        await pedido.exibirStatusDaRespostaAPI(response.status)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}

async function criarPedido() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))

    try {
        const response = await fetch(`http://localhost:8080/agendamento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: "Agendamento",
                dataInicio: document.querySelector("#input-data-inicio").value,
                dataFim: document.querySelector("#input-data-inicio").value,
                usuario: sessionStorage.getItem('id'),
                cliente: sessionStorage.getItem('CLIENTE-ID'),
                etapa: 1
            })
        });

        const dados = await response.json()
        console.log(dados)

        await pedido.exibirStatusDaRespostaAPI(response.status)


    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}

async function buscarEtapas() {

    try {
        const usuarioId = parseInt(sessionStorage.getItem('id'))

        const response = await fetch(`http://localhost:8080/etapas/${usuarioId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }


        const dados = await response.json()
        console.log(dados)
    }
    catch (error) {
        console.log(`Houve um erro no servidor ${error}`)
    }

}

buscarEtapas()

export {
    buscarAgendamento,
    buscarClienteView,
    buscarClientePorId,
    buscarClientesPorNome,
    atualizarDadosCliente,
    atualizarDadosPedido,
    criarPedido,
    buscarEtapas
}