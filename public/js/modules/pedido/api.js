
import { escolherRenderizacao, renderizar, removerEstilizacaoDasInputs } from "./motorGrafico.js"
import * as pedido from "./pedido.js"

var clienteId = pedido.clienteId

window.buscarAgendamento = buscarAgendamento
window.buscarClienteView = buscarClienteView
window.buscarEnderecoPorClienteId = buscarEnderecoPorClienteId
window.buscarTelefonePorClienteId = buscarTelefonePorClienteId
window.atualizarEnderecoAgendamento = atualizarEnderecoAgendamento


async function buscarAgendamento() {

    var agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://192.168.15.3:8080/agendamento/${usuarioId}/${agendamentoId}`, {
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
        const response = await fetch(`http://192.168.15.3:8080/cliente-view/${clienteId}`, {
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
        const response = await fetch(`http://192.168.15.3:8080/clientes/${novoClienteId}/buscarUm`, {
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

async function buscarEnderecoPorId() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var enderecoId = parseInt(sessionStorage.getItem("ENDERECO-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/enderecos/buscar-um/${usuarioId}/${enderecoId}`, {
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
        pedido.preencherDadosEndereco(dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function buscarTelefonePorId() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var enderecoId = parseInt(sessionStorage.getItem("TELEFONE-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/telefone/buscar-um/${usuarioId}/${enderecoId}`, {
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
        pedido.preencherDadosTelefone(dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function buscarEnderecoPorClienteId(nomeModal) {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/enderecos/${usuarioId}/${clienteId}`, {
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
        pedido.escolherModalMultivalorado(nomeModal, dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function buscarTelefonePorClienteId(nomeModal) {
    var usuarioId = sessionStorage.getItem("id")
    var clienteId = sessionStorage.getItem("CLIENTE-ID")    

    try {
        const response = await fetch(`http://192.168.15.3:8080/telefone/${usuarioId}/${clienteId}`, {
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
        pedido.escolherModalMultivalorado(nomeModal, dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}



async function buscarClientesPorNome(clienteNome) {
    var usuarioId = sessionStorage.getItem("id")

    try {
        const response = await fetch(`http://192.168.15.3:8080/clientes/${usuarioId}/filtro-nome?nome=${clienteNome}`, {
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
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/clientes/${clienteId}`, {
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
        return response.status
       

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function atualizarDadosPedido(agendamentoId) {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))
    var enderecoId = parseInt(sessionStorage.getItem("ENDERECO-ID"))
    var telefoneId = parseInt(sessionStorage.getItem("TELEFONE-ID"))


    try {
        const response = await fetch(`http://192.168.15.3:8080/agendamento/${usuarioId}/${agendamentoId}`, {
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
                    id: document.querySelector("#input-etapa").value
                },
                endereco: {
                    id: enderecoId
                },
                telefone: {
                    id: telefoneId
                }
            })
        });

        const dados = await response.json()
        console.log(dados)
        return response.status


    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}

async function atualizarEnderecoAgendamento(enderecoId) {
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var agendamentoId = parseInt(sessionStorage.getItem("AGENDAMENTO-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/agendamento/atualizar-endereco/${usuarioId}/${agendamentoId}/${enderecoId}`, {
            method: "PATCH"
        });

        const dados = await response.json()
        console.log(dados)
        
        buscarEnderecoPorId()
        pedido.esconderModalMultivalorado()
        return response.status
       
    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}


async function atualizarTelefoneAgendamento(telefoneId) {
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var agendamentoId = parseInt(sessionStorage.getItem("AGENDAMENTO-ID"))

    try {
        const response = await fetch(`http://192.168.15.3:8080/agendamento/atualizar-telefone/${usuarioId}/${agendamentoId}/${telefoneId}`, {
            method: "PATCH"
        });

        const dados = await response.json()
        console.log(dados)
        
        buscarTelefonePorId()
        pedido.esconderModalMultivalorado()
        return response.status
       
    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function atualizarEndereco(){
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))
    var enderecoId = parseInt(sessionStorage.getItem("ENDERECO-ID"))
    var telefoneId = parseInt(sessionStorage.getItem(""))

    try {
        const response = await fetch(`http://192.168.15.3:8080/enderecos/${usuarioId}/${enderecoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: enderecoId,
                cep: document.querySelector('#input-cep').value,
                logradouro: document.querySelector('#input-rua').value,
                bairro: document.querySelector('#input-bairro').value,
                uf: document.querySelector('#input-uf').value,
                usuario: {
                    id: usuarioId
                },
                cliente: {
                    id: clienteId
                },
                cidade: document.querySelector('#input-cidade').value,
                numero: document.querySelector('#input-numero').value,
            })
        });

        const dados = await response.json()
        console.log(dados)
        
        buscarEnderecoPorId()
        return response.status
       
    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function criarPedido() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    

    try {
        const response = await fetch(`http://192.168.15.3:8080/agendamento`, {
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
                etapa: 1,
                endereco: sessionStorage.getItem('ENDERECO-ID'),
                telefone: sessionStorage.getItem('TELEFONE-ID')

            })
        });

        const dados = await response.json()
        console.log(dados)

        await pedido.exibirStatusDaRespostaAPI(response.status)
        sessionStorage.setItem("AGENDAMENTO-ID", dados.id)
        sessionStorage.setItem("PAGINA-PEDIDO", "consultar-pedido")
        
        removerEstilizacaoDasInputs()
        escolherRenderizacao(false, null)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}

async function buscarEtapas() {

    try {
        const usuarioId = parseInt(sessionStorage.getItem('id'))

        const response = await fetch(`http://192.168.15.3:8080/etapas/${usuarioId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }


        const dados = await response.json()
        console.log(dados)

        pedido.preencherOptionsEtapa(dados)
        pedido.removerOptionsEtapa()
    }
    catch (error) {
        console.log(`Houve um erro no servidor ${error}`)
    }

}

async function buscarStatusAgendamento(){

    try{
        const usuarioId = parseInt(sessionStorage.getItem('id'))
        const agendamentoId = parseInt(sessionStorage.getItem('AGENDAMENTO-ID'))
    
        const response = await fetch(`http://192.168.15.3:8080/agendamento-log/${usuarioId}/${agendamentoId}`, {
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

        pedido.preencherStatusAgendamento(dados)

    } catch(error){
            console.log(`Houve um erro no servidor ${error}`)
    }
   
}



buscarEtapas()

export {
    buscarAgendamento,
    buscarClienteView,
    buscarClientePorId,
    buscarClientesPorNome,
    buscarEnderecoPorClienteId,
    buscarTelefonePorClienteId,
    buscarEnderecoPorId,
    buscarTelefonePorId,
    atualizarDadosCliente,
    atualizarDadosPedido,
    atualizarEndereco,
    atualizarEnderecoAgendamento,
    atualizarTelefoneAgendamento,
    criarPedido,
    buscarEtapas,
    buscarStatusAgendamento
}