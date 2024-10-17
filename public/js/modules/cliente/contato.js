import * as apiContato from "./api.js"
import * as apiPedido from "../pedido/api.js"
import * as pedido from "../pedido/pedido.js"
import { escolherRenderizacao } from "../cliente/motorGrafico.js"


window.preencherCardsDeCliente = preencherCardsDeCliente
window.validarNumeroDeCaracteresEBuscarClientes = validarNumeroDeCaracteresEBuscarClientes
window.transferirParaPagina = transferirParaPagina
window.limparCache = limparCache
window.validarSeEResponsavelDependente = validarSeEResponsavelDependente

async function salvarContato(){
    var listaDeResponse = []
    var clienteId = sessionStorage.getItem("CLIENTE-ID")

    if(clienteId == null){
        listaDeResponse.push(await apiContato.cadastrarContato()) 
    } else {
        listaDeResponse.push(await apiPedido.atualizarDadosCliente())  
    }

    if (listaDeResponse.length == 0 ) {
        construirModalGenerico("statusButton", "Nenhum dado foi modificado, atualize um dado para salvar.")
        return
      }

   pedido.validarRetornoEExibirModalDeStatus(listaDeResponse)

   if(listaDeResponse[0] == 200){
    sessionStorage.setItem("PAGINA-CONTATO", "consultar-contato")
    escolherRenderizacao()
   }

}

 
function preencherDadosCliente(cliente){
    document.querySelector('#input-nome').value = cliente.nome
    document.querySelector('#input-sobrenome').value = cliente.sobrenome
    document.querySelector('#input-email').value = cliente.email
    sessionStorage.setItem("CLIENTE-ID", cliente.id)
}

async function preencherCardsDeCliente() {
    var nomeCliente = document.querySelector("#input-pesquisa-cliente").value
    var listaCliente = await apiContato.buscarClientesPorNome(nomeCliente)

    var boxCliente = document.querySelector("#conteudo-cliente")
    boxCliente.innerHTML = ""

    for (var i = 0; i < listaCliente.length; i++) {
      boxCliente.innerHTML +=
        `
          <div class="card mb-3 mt-4 w-100" id="${listaCliente[i].id}" data-responsavel-id="${validarSePossuiResponsavelERetornarId(listaCliente[i])}" style="border-radius: 10px; position: relative;" 
          onclick="limparCache(); validarSeEResponsavelDependente(this.dataset.responsavelId); transferirParaPagina('Cadastro-contato.html',['PAGINA-CONTATO', 'CLIENTE-ID'], ['consultar-contato', this.id])">
                <div class="blue-stripe"
                    style="background-color: #012171; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: 20px; height: 100%; position: absolute; left: 0;">
                </div>
                <div class="card-content" style="padding-left: 20px;">
                    <div class="card-body mb-20">
                        <span class="card-title">${listaCliente[i].nome} ${listaCliente[i].sobrenome}</span>
                        ${validarPossuiResponsavelERetornarElementoString(listaCliente[i])}
                    </div>
                </div>
            </div>
          `
    }
  }

  function validarNumeroDeCaracteresEBuscarClientes(nome){
    if(nome.length > 3) preencherCardsDeCliente()
    if(nome.length == 0) document.querySelector("#conteudo-cliente").innerHTML = ""
  }

  function validarPossuiResponsavelERetornarElementoString(cliente){
    if(cliente.responsavel != null){
        return `<span class="card-subtitle" style="margin-top: 10px; display: block;">Dependente: ${cliente.responsavel.nome} ${cliente.responsavel.sobrenome}</span>`
    }else{
        return ""
    }
  }

  function validarSePossuiResponsavelERetornarId(cliente){
    if(cliente.responsavel != null && cliente.responsavel.id != null) return cliente.responsavel.id 
    else return ""
  }

  function validarSeEResponsavelDependente(idResponsavel){
    if(idResponsavel != null){
        sessionStorage.setItem("RESPONSAVEL", false)
        sessionStorage.setItem("RESPONSAVEL-ID", idResponsavel)
        return
    } 
        sessionStorage.setItem("RESPONSAVEL", true)
  }

  function transferirParaPagina(enderecoPagina, listaChaveSessionStorage, listaValorSessionStorage){

    if(listaChaveSessionStorage.length != listaChaveSessionStorage.length){
        console.log("Configuração de Session storage equivocada. Corrigir parametrização no HTML")
    }

    if(listaChaveSessionStorage != undefined && listaValorSessionStorage != undefined){
        for(var i = 0; i < listaChaveSessionStorage.length; i++)
        sessionStorage[`${listaChaveSessionStorage[i]}`] = listaValorSessionStorage[i]
    }

    location.assign(`${enderecoPagina}`)
    
  }

  function limparCache(){
    if(sessionStorage.getItem("TELEFONE-ID") != null){
        sessionStorage.removeItem("TELEFONE-ID")
    }

    if(sessionStorage.getItem("ENDERECO-ID") != null){
        sessionStorage.removeItem("ENDERECO-ID")
    }

    if(sessionStorage.getItem("TELEFONE-MODAL-ID") != null){
        sessionStorage.removeItem("TELEFONE-MODAL-ID")
    }

    if(sessionStorage.getItem("ENDERECO-MODAL-ID") != null){
        sessionStorage.removeItem("ENDERECO-MODAL-ID")
    }
  }

export {
    salvarContato,
    preencherDadosCliente,
    preencherCardsDeCliente,
    transferirParaPagina,
    limparCache,
    validarSeEResponsavelDependente
}