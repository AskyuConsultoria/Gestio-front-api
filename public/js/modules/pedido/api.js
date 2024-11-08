import { escolherRenderizacao, renderizar, removerEstilizacaoDasInputs } from "./motorGrafico.js"
import * as pedido from "./pedido.js"

var clienteId = pedido.clienteId

window.buscarAgendamento = buscarAgendamento
window.buscarClienteView = buscarClienteView
window.buscarEnderecoPorClienteId = buscarEnderecoPorClienteId
window.buscarTelefonePorClienteId = buscarTelefonePorClienteId
window.buscarClientesPorResponsavelId = buscarClientesPorResponsavelId
window.atualizarEnderecoAgendamento = atualizarEnderecoAgendamento
window.escolherRenderizacao = escolherRenderizacao


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
        // await criarCardPipe(dados)
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

async function buscarEnderecoPorId() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var enderecoId = parseInt(sessionStorage.getItem("ENDERECO-ID"))
    if(sessionStorage.getItem("ENDERECO-MODAL-ID") != null) enderecoId = sessionStorage.getItem("ENDERECO-MODAL-ID")

    try {
        const response = await fetch(`http://localhost:8080/enderecos/buscar-um/${usuarioId}/${enderecoId}`, {
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
    var telefoneId = parseInt(sessionStorage.getItem("TELEFONE-ID"))
    if(sessionStorage.getItem("TELEFONE-MODAL-ID") != null) telefoneId = sessionStorage.getItem("TELEFONE-MODAL-ID")

    try {
        const response = await fetch(`http://localhost:8080/telefone/buscar-um/${usuarioId}/${telefoneId}`, {
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


async function buscarTelefonePorIdEtapa() {
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var telefoneId = parseInt(sessionStorage.getItem("TELEFONE-ID"))

    try {
        const response = await fetch(`http://localhost:8080/telefone/buscar-um/${usuarioId}/${telefoneId}`, {
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
        return dados

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function buscarEnderecoPorClienteId(nomeModal) {
    var usuarioId = sessionStorage.getItem("id")
    var clienteId = sessionStorage.getItem("CLIENTE-ID")

    if(clienteId == null){
        pedido.escolherModalMultivalorado(nomeModal, [])
        return
    }
  
    var usuarioId = parseInt(sessionStorage.getItem("id"))
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))

    try {
        const response = await fetch(`http://localhost:8080/enderecos/${usuarioId}/${clienteId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        if (response.status == 204) {
            pedido.escolherModalMultivalorado(nomeModal, [])
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
    
    if(clienteId == null){
        pedido.escolherModalMultivalorado(nomeModal, [])
        return
    }


    try {
        const response = await fetch(`http://localhost:8080/telefone/${usuarioId}/${clienteId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        if (response.status == 204) {
            pedido.escolherModalMultivalorado(nomeModal, [])
        }

        const dados = await response.json()
        console.log(dados)
        pedido.escolherModalMultivalorado(nomeModal, dados)

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function buscarClientesPorResponsavelId(nomeModal) {
    var usuarioId = sessionStorage.getItem("id")
    var clienteId = sessionStorage.getItem("CLIENTE-ID")
    var responsavelId = sessionStorage.getItem("RESPONSAVEL-ID") 
    var isResponsavel = sessionStorage.getItem("RESPONSAVEL") == "true"   

    if(isResponsavel == true) responsavelId = clienteId
       

    try {
        const response = await fetch(`http://localhost:8080/clientes/por-responsavel/${usuarioId}/${responsavelId}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro de servidor, status: ${response.status}`);
        }

        if (response.status == 204) {
            pedido.escolherModalMultivalorado(nomeModal, [])
            return
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
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))

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
                email: document.querySelector('#input-email').value
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
        const response = await fetch(`http://localhost:8080/agendamento/atualizar-endereco/${usuarioId}/${agendamentoId}/${enderecoId}`, {
            method: "PATCH"
        });

        const dados = await response.json()
        console.log(dados)
        
       await  buscarEnderecoPorId()
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
        const response = await fetch(`http://localhost:8080/agendamento/atualizar-telefone/${usuarioId}/${agendamentoId}/${telefoneId}`, {
            method: "PATCH"
        });

        const dados = await response.json()
        console.log(dados)
        
        await buscarTelefonePorId()
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

    try {
        const response = await fetch(`http://localhost:8080/enderecos/${usuarioId}/${enderecoId}`, {
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


async function atualizarTelefone(){
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var telefoneId = parseInt(sessionStorage.getItem("TELEFONE-ID"))
    var numero = document.querySelector("#input-numero-celular").value

    try {
        const response = await fetch(`http://localhost:8080/telefone/${usuarioId}/${telefoneId}?numero=${numero}`, {
            method: "PATCH",
        });

        const dados = await response.json()
        console.log(dados)
        
        buscarTelefonePorId()
        return response.status
       
    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function atualizarEnderecoModal(){
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))
    var enderecoId = parseInt(sessionStorage.getItem("ENDERECO-MODAL-ID"))

    try {
        const response = await fetch(`http://localhost:8080/enderecos/${usuarioId}/${enderecoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: enderecoId,
                cep: document.querySelector('#input-modal-cep').value,
                logradouro: document.querySelector('#input-modal-rua').value,
                bairro: document.querySelector('#input-modal-bairro').value,
                uf: document.querySelector('#input-modal-uf').value,
                usuario: {
                    id: usuarioId
                },
                cliente: {
                    id: clienteId
                },
                cidade: document.querySelector('#input-modal-cidade').value,
                numero: document.querySelector('#input-modal-numero').value,
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


async function atualizarTelefoneModal(){
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var telefoneId = parseInt(sessionStorage.getItem("TELEFONE-MODAL-ID"))
    var numero = document.querySelector("#input-modal-numero-celular").value

    try {
        const response = await fetch(`http://localhost:8080/telefone/${usuarioId}/${telefoneId}?numero=${numero}`, {
            method: "PATCH",
        });

        const dados = await response.json()
        console.log(dados)
        
        buscarTelefonePorId()
        return response.status
       
    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}

async function atualizarClienteModal() {
    const usuario = sessionStorage.getItem('id')
    const clienteId = sessionStorage.getItem("CLIENTE-ID")
    const responsavelId = sessionStorage.getItem("RESPONSAVEL-ID")

    try {
        const response = await fetch(`http://localhost:8080/clientes/${clienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("input-modal-nome").value,
                sobrenome: document.getElementById("input-modal-sobrenome").value,
                email: document.getElementById("input-modal-email").value,
                usuario: usuario,
                responsavel: responsavelId
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


async function cadastrarClienteModal() {

    const usuario = sessionStorage.getItem('id')
    const responsavelId = sessionStorage.getItem("RESPONSAVEL-ID")

    try {
        const response = await fetch(`http://localhost:8080/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("input-modal-nome").value,
                sobrenome: document.getElementById("input-modal-sobrenome").value,
                email: document.getElementById("input-modal-email").value,
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
                etapa: 1,
                endereco: sessionStorage.getItem('ENDERECO-MODAL-ID'),
                telefone: sessionStorage.getItem('TELEFONE-MODAL-ID')
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


// async function criarCardPipe(agendamento) {
//     console.log("agendamento:", agendamento)
//     const phone= await buscarTelefonePorIdEtapa()
//     sessionStorage.setItem("TELEFONE-ID", phone.id)

//     const dados = {
//         "nome": agendamento.cliente.nome + " " + agendamento.cliente.sobrenome,
//         "email": agendamento.cliente.email,
//         "phone": phone.numero,
//         "resumo": agendamento.nome,
//         "data": agendamento.dataInicio
//     }

//     console.log(dados)


//     await fetch(`https://hook.us1.make.com/7uc2ai9y5vrw9lkpp6kvaff21o548d93`, {
//         method: "POST",
//         body: JSON.stringify(dados),
//         headers: { "Content-type": "application/json; charset=UTF-8" },
//     })

// }


async function cadastrarEnderecoModal(){
    var usuarioId = parseInt(sessionStorage.getItem("id")) 
    var clienteId = parseInt(sessionStorage.getItem("CLIENTE-ID"))
    
    try {
        const response = await fetch(`http://localhost:8080/enderecos/${usuarioId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cep: document.querySelector('#input-modal-cep').value,
                logradouro: document.querySelector('#input-modal-rua').value,
                bairro: document.querySelector('#input-modal-bairro').value,
                uf: document.querySelector('#input-modal-uf').value,
                usuario: {
                    id: usuarioId
                },
                cliente: {
                    id: clienteId
                },
                cidade: document.querySelector('#input-modal-cidade').value,
                numero: document.querySelector('#input-modal-numero').value,
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

async function cadastrarTelefoneModal() {
    const usuarioId = sessionStorage.getItem('id')
    const clienteId = sessionStorage.getItem("CLIENTE-ID")

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
                numero: document.querySelector(`#input-modal-numero-celular`).value
            })
        })
        
        var dados = await response.json()
        console.log(dados) 

        buscarTelefonePorId()
        return response.status

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
    
        const response = await fetch(`http://localhost:8080/agendamento-log/${usuarioId}/${agendamentoId}`, {
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

async function desativarPedidosPorAgendamento(){
    const usuarioId = sessionStorage.getItem("id")
    const agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")

    try{
        var response = await fetch(`http://localhost:8080/pedido/excluir-por-agendamento/${usuarioId}/${agendamentoId}`,{
            method: "DELETE"
        })

        var dados = await response.json()
        console.log(dados)
        return response.status

    } catch(error){
        console.log("Ocorreu um erro: ")
        console.log(error)
        return response.status
    }
    
}

async function desativarAgendamento() {
    var usuarioId = sessionStorage.getItem("id")
    var agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")

    try{
        var response = await fetch(`http://localhost:8080/agendamento/${usuarioId}/${agendamentoId}`, {
            method: "DELETE"
        })

        var dados = await response.json()
        return response.status

    } catch (error){
        console.log("Ocorreu um erro: ")
        return error
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
    buscarClientesPorResponsavelId,
    buscarEnderecoPorId,
    buscarTelefonePorId,
    atualizarDadosCliente,
    atualizarDadosPedido,
    atualizarEndereco,
    atualizarTelefone,
    atualizarEnderecoModal,
    atualizarTelefoneModal,
    atualizarClienteModal,
    atualizarEnderecoAgendamento,
    atualizarTelefoneAgendamento,
    criarPedido,
    cadastrarEnderecoModal,
    cadastrarTelefoneModal,
    cadastrarClienteModal,
    buscarEtapas,
    buscarStatusAgendamento,
    buscarTelefonePorIdEtapa,
    desativarPedidosPorAgendamento,
    desativarAgendamento
}
