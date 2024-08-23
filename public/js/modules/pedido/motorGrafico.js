
import * as pedido from "./pedido.js"
import * as api from "./api.js"

var clienteId = pedido.clienteId

window.escolherRenderizacao = escolherRenderizacao
window.fecharJanela = fecharJanela
window.desbloquearFormulario = desbloquearFormulario

export var listaComponenteExibido = []
export var listaComponenteOcultado = []

function renderizar(porcentagemCorpo, label) {
    for (var i = 0; i < listaComponenteExibido.length; i++) {

        if (listaComponenteExibido[i].classList.contains('d-none')) {
            listaComponenteExibido[i].classList.replace('d-none', 'd-flex')
        }

    }

    for (var i = 0; i < listaComponenteOcultado.length; i++) {

        if (listaComponenteOcultado[i].classList.contains('d-flex')) {
            listaComponenteOcultado[i].classList.replace('d-flex', 'd-none')
        }

    }

    const pagina = document.querySelector('#body')
    pagina.style.height = porcentagemCorpo
    const labelPedido = document.querySelector('#label-pedido')
    labelPedido.innerHTML = label
}

function escolherRenderizacao(renderizarEscolhaCliente, renderizarPagina) {
    var paginaEscolhida = sessionStorage.getItem("PAGINA-PEDIDO")

    if (renderizarEscolhaCliente) {
        paginaEscolhida = "associar-cliente"
    }

    if (renderizarPagina != undefined) {
        paginaEscolhida = renderizarPagina
    }

    listaComponenteExibido = []
    listaComponenteOcultado = []
    var listaComponente = document.querySelectorAll('.componente')

    if (paginaEscolhida == "adicionar-pedido") {
        document.querySelector('.botao-confirmacao').id = "home.html"
        listaComponenteExibido.push(listaComponente[0], listaComponente[2], listaComponente[3])
        listaComponenteOcultado.push(listaComponente[1], listaComponente[4], listaComponente[5], listaComponente[6])
        desbloquearInputs()
        esconderBotoesEdicao()

        if (clienteId != "") {
            listaComponenteExibido.shift()
            listaComponenteOcultado.shift()
            listaComponenteExibido.push(listaComponente[1])
            renderizar("130%", "Novo Pedido")
            return
        }
        renderizar("110%", "Novo Pedido")
    }

    if (paginaEscolhida == "consultar-pedido") {
        document.querySelector('.botao-confirmacao').id = "home.html"
        listaComponenteExibido.push(listaComponente[1], listaComponente[2], listaComponente[3])
        listaComponenteOcultado.push(listaComponente[0], listaComponente[4], listaComponente[5], listaComponente[6])
        bloquearInputs()
        exibirBotoesEdicao()
        
        api.buscarAgendamento()
        renderizar("130%", "Pedido")
    }

    if (paginaEscolhida == "associar-cliente") {
        document.querySelector('#confirmButton').classList.replace("d-flex", "d-none")
        document.querySelector('.botao-confirmacao').id = "adicionar-pedido"
        listaComponenteExibido.push(listaComponente[4], listaComponente[5], listaComponente[6])
        listaComponenteOcultado.push(listaComponente[0], listaComponente[1], listaComponente[2], listaComponente[3])
        renderizar("110%", "Novo Pedido")
    }
}

function fecharJanela() {
    var paginaParaIr = document.querySelector('.botao-confirmacao').id
    if (pedido.houveMudancaDeDados()) {
        pedido.construirModalGenerico("closeButton")
        return
    }

    if (paginaParaIr == "home.html") {
        sessionStorage.setItem("EXIBICAO-MODAL", true)
        window.location = paginaParaIr
    }

    if (paginaParaIr == "adicionar-pedido") escolherRenderizacao(false, paginaParaIr)
}


function agregarInputsEmLista(){
    var listaInput = []
    var inputs = document.querySelectorAll('input')
    for(var i = 0; i < inputs.length; i++){
        listaInput.push(inputs[i])
    }
    return listaInput
}

function bloquearInputs(){
    var listaInput = agregarInputsEmLista()

    for(var i = 0; i < listaInput.length; i++){
        listaInput[i].disabled = true
    }
}

function desbloquearInputs(){
    var listaInput = agregarInputsEmLista()

    for(var i = 0; i < listaInput.length; i++){
        listaInput[i].disabled = false
    }
}

function desbloquearFormulario(botaoId){

    var classe = botaoId.substring(botaoId.indexOf('-') + 1);
    var listaInput = document.querySelectorAll(`.${classe}`)

    if(classe == 'cliente'){
        var elNumero = document.querySelector('#input-numero-celular')
        elNumero.disabled = false
    } 

    for(var i = 0; i < listaInput.length; i++){
        listaInput[i].disabled = false
    }
}


function esconderBotoesEdicao(){
    var listaBotaoEdicao = document.querySelectorAll('.botao-edicao')

    for(var i = 0; i < listaBotaoEdicao.length; i++){
        if(!listaBotaoEdicao[i].classList.contains('d-none')){
            listaBotaoEdicao[i].classList.add('d-none')
        } 
    }
}

function exibirBotoesEdicao(){
    var listaBotaoEdicao = document.querySelectorAll('.botao-edicao')

    for(var i = 0; i < listaBotaoEdicao.length; i++){
        if(!listaBotaoEdicao[i].classList.contains('d-block')){
            listaBotaoEdicao[i].classList.add('d-block')
        } 
    }
}


export {
    renderizar,
    escolherRenderizacao,
    fecharJanela,
    agregarInputsEmLista,
    bloquearInputs,
    desbloquearInputs,
    desbloquearFormulario
}


