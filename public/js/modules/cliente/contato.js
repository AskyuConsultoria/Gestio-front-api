import * as apiContato from "./api.js"
import * as apiPedido from "../pedido/api.js"
import * as pedido from "../pedido/pedido.js"
import { escolherRenderizacao } from "../cliente/motorGrafico.js"


window.preencherCardsDeCliente = preencherCardsDeCliente
window.preencherCardsDeClienteResponsavel = preencherCardsDeClienteResponsavel
window.validarNumeroDeCaracteresEBuscarClientes = validarNumeroDeCaracteresEBuscarClientes
window.transferirParaPagina = transferirParaPagina
window.limparCache = limparCache
window.validarSeEResponsavelDependente = validarSeEResponsavelDependente
window.associarResponsavel = associarResponsavel
window.removerClienteId = removerClienteId
window.desativarCliente = desativarCliente
window.validarDivClicada = validarDivClicada

async function salvarContato() {
  var listaDeResponse = []
  var clienteId = sessionStorage.getItem("CLIENTE-ID")

  if (clienteId == null) {
    listaDeResponse.push(await apiContato.cadastrarContato())
  } else {
    listaDeResponse.push(await apiPedido.atualizarDadosCliente())
  }

  if (listaDeResponse.length == 0) {
    pedido.construirModalGenerico("statusButton", "Nenhum dado foi modificado, atualize um dado para salvar.")
    return
  }

  pedido.validarRetornoEExibirModalDeStatus(listaDeResponse)

  if (listaDeResponse[0] == 200) {
    sessionStorage.setItem("PAGINA-CONTATO", "consultar-contato")
    escolherRenderizacao()
  }

}


function preencherDadosCliente(cliente) {
  document.querySelector('#input-nome').value = cliente.nome
  document.querySelector('#input-sobrenome').value = cliente.sobrenome
  document.querySelector('#input-email').value = cliente.email
  sessionStorage.setItem("CLIENTE-ID", cliente.id)


  if(document.querySelector("#conteudo-botao-dependente")){
    if(cliente.responsavel != null && cliente.responsavel.nome != null){
    document.querySelector("#botao-dependente-cliente").innerText = `${cliente.responsavel.nome} ${cliente.responsavel.sobrenome}`
    }
    document.querySelector("#botao-dependente-cliente").onclick = () => validarDivClicada(event, cliente.responsavel.id, cliente.responsavel.id)
  }
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
          onclick="validarDivClicada(event, this.dataset.responsavelId, this.id);">
                <div class="blue-stripe"
                    style="background-color: #012171; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: 20px; height: 100%; position: absolute; left: 0;">
                </div>
                <div class="card-content" style="padding-left: 20px;">
                    <div class="card-body mb-20">
                        <div class="d-flex justify-content-between">
                          <span class="card-title">${listaCliente[i].nome} ${listaCliente[i].sobrenome}</span>
                          <svg id="svg-delete" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#012171"><path id="svg-path-delete" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path></svg>
                        </div>
                        ${validarPossuiResponsavelERetornarElementoString(listaCliente[i])}
                    </div>
                </div>
            </div>
          `
  }
}


async function preencherCardsDeClienteResponsavel() {
  var nomeCliente = document.querySelector("#input-pesquisa-cliente").value
  var listaCliente = await apiContato.buscarClientesPorNome(nomeCliente)

  var boxCliente = document.querySelector("#conteudo-cliente")
  boxCliente.innerHTML = ""

  for (var i = 0; i < listaCliente.length; i++) {
    boxCliente.innerHTML +=
      `
          <div class="card ms-0 mb-3 mt-4 w-100"  id="${listaCliente[i].id}"  data-responsavel-id="${validarSePossuiResponsavelERetornarId(listaCliente[i])}" style="border-radius: 10px; position: relative;" 
          onclick="limparCache(); removerClienteId(); associarResponsavel(this.id); transferirParaPagina('Cadastro-contato.html',['PAGINA-CONTATO'], ['criar-contato'])">
                <div class="blue-stripe"
                    style="background-color: #012171; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: 20px; height: 100%; position: absolute; left: 0;">
                </div>
                <div class="card-content" style="padding-left: 20px;">
                    <div class="card-body mb-20">
                        <span class="card-title" style="margin-right: 45%">${listaCliente[i].nome} ${listaCliente[i].sobrenome}</span>
                        ${validarPossuiResponsavelERetornarElementoString(listaCliente[i])}
                    </div>
                </div>
            </div>
          `
  }
}

function validarDivClicada(evento, responsavelId, clienteId){

  if(evento.target.id == "svg-delete" || evento.target.id == "svg-path-delete"){
    evento.stopPropagation()
    construirModalGenerico("actionButton", `desativarCliente('${evento}', '${clienteId}')`, "modalGenerico.hide()", "Você deseja descartar este cliente?")
    return
  }

  limparCache()
  validarSeEResponsavelDependente(responsavelId)
  
  if(evento.target.id == "botao-dependente-cliente"){
    sessionStorage.setItem("RESPONSAVEL", true)
  }

  transferirParaPagina('Cadastro-contato.html',['PAGINA-CONTATO', 'CLIENTE-ID'], ['consultar-contato', clienteId])
}


function associarResponsavel(idResponsavel) {
  sessionStorage.setItem("RESPONSAVEL-ID", idResponsavel)
}

function validarNumeroDeCaracteresEBuscarClientes(nome) {
  if (nome.length > -1 && window.location.pathname == "/Contato.html") preencherCardsDeCliente()
  else if (window.location.pathname == "/Adicionar-dependente.html") preencherCardsDeClienteResponsavel()
  if (nome.length == 0) document.querySelector("#conteudo-cliente").innerHTML = ""
}

function validarPossuiResponsavelERetornarElementoString(cliente) {
  if (cliente.responsavel != null) {
    return `<span class="card-subtitle" style="margin-top: 10px; display: block;">Dependente: ${cliente.responsavel.nome} ${cliente.responsavel.sobrenome}</span>`
  } else {
    return ""
  }
}

function validarSePossuiResponsavelERetornarId(cliente) {
  if (cliente.responsavel != null && cliente.responsavel.id != null) return cliente.responsavel.id
  else return ""
}

function validarSeEResponsavelDependente(idResponsavel) {
  if (idResponsavel != null && idResponsavel != "") {
    sessionStorage.setItem("RESPONSAVEL", false)
    sessionStorage.setItem("RESPONSAVEL-ID", idResponsavel)
    return
  }
  sessionStorage.setItem("RESPONSAVEL", true)
}


function transferirParaPagina(enderecoPagina, listaChaveSessionStorage, listaValorSessionStorage) {


  if (listaChaveSessionStorage != undefined && listaValorSessionStorage != undefined) {

    if (listaChaveSessionStorage.length != listaChaveSessionStorage.length) {
      throw ("Configuração de Session storage equivocada. Corrigir parametrização no HTML")
      return
    }

    for (var i = 0; i < listaChaveSessionStorage.length; i++)
      sessionStorage[`${listaChaveSessionStorage[i]}`] = listaValorSessionStorage[i]
  }

  location.assign(`${enderecoPagina}`)

}


function removerClienteId() {
  if (sessionStorage.getItem("CLIENTE-ID") != null) {
    sessionStorage.removeItem("CLIENTE-ID")
  }
}

function limparCache() {
  if (sessionStorage.getItem("TELEFONE-ID") != null) {
    sessionStorage.removeItem("TELEFONE-ID")
  }

  if (sessionStorage.getItem("ENDERECO-ID") != null) {
    sessionStorage.removeItem("ENDERECO-ID")
  }

  if (sessionStorage.getItem("TELEFONE-MODAL-ID") != null) {
    sessionStorage.removeItem("TELEFONE-MODAL-ID")
  }

  if (sessionStorage.getItem("ENDERECO-MODAL-ID") != null) {
    sessionStorage.removeItem("ENDERECO-MODAL-ID")
  }
}

async function desativarCliente(evento, clienteId){
  var usuarioId = sessionStorage.getItem("id")
  try{
    const response = await fetch(`http://10.0.1.226:8080/askyu/clientes/${usuarioId}/${clienteId}`, {
      method: "DELETE"
    })

    if(response.ok){
      console.log(response)
      construirModalGenerico("statusButton", "modalGenerico.hide()", null, "Cliente descartado com sucesso.")
      preencherCardsDeCliente()
    }

  } 
  catch(error){
    console.log(error)
    alert(`Ocorreu um erro: ${error.message}`)
  }
}

function construirModalGenerico(elementoId, primeiraFuncao, segundaFuncao, textoModal) {
  var elementoBody = document.querySelector("#body-modal-generico")
  var elementoFooter = document.querySelector("#footer-modal-generico")

  elementoFooter.innerHTML = ""

  if (elementoId == "statusButton") {
    elementoFooter.innerHTML =
      `
     <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick=${primeiraFuncao} style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>
    `
    modalGenerico.show()
  }

  if (elementoId == "actionButton") {
    elementoFooter.innerHTML = `

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="${primeiraFuncao}"  style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="${segundaFuncao}" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button>
    `

    modalGenerico.show()
  }

  elementoBody.innerText = textoModal
}


export {
  salvarContato,
  preencherDadosCliente,
  preencherCardsDeCliente,
  transferirParaPagina,
  limparCache,
  validarSeEResponsavelDependente,
  validarNumeroDeCaracteresEBuscarClientes,
  desativarCliente,
  validarDivClicada
}