
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
        api.buscarClientesPorNome('')
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
        esconderEtapa()
        esconderInputsEndereco()
        esconderInputsNumero()
        esconderCardEndereco()
        esconderBotaoItensPedido()
        esconderBotaoCancelar()

        if (sessionStorage.getItem("CLIENTE-ID") != null) {
            listaComponenteExibido.shift()
            listaComponenteOcultado.shift()
            listaComponenteExibido.push(listaComponente[1])
            removerEstilizacaoDasInputsInvalidas()
            exibirCardEndereco()
            renderizar("158%", "Novo Pedido")
            return
        }
        renderizar("158%", "Novo Pedido")
    }

    if (paginaEscolhida == "consultar-pedido") {
        document.querySelector('.botao-confirmacao').id = "home.html"
        listaComponenteExibido.push(listaComponente[1], listaComponente[2], listaComponente[3])
        listaComponenteOcultado.push(listaComponente[0], listaComponente[4], listaComponente[5], listaComponente[6])
        bloquearInputs()
        exibirBotoesEdicao()
        exibirEtapa()
        exibirBotaoItensPedido()
        exibirBotaoSalvar()
        exibirBotaoCancelar()

        api.buscarAgendamento()
        api.buscarStatusAgendamento()
        renderizar("200%", "Pedido")
    }

    if (paginaEscolhida == "associar-cliente") {
        sessionStorage.removeItem("CLIENTE-ID")
        document.querySelector('.botao-confirmacao').id = "adicionar-pedido"
        listaComponenteExibido.push(listaComponente[4], listaComponente[5], listaComponente[6])
        listaComponenteOcultado.push(listaComponente[0], listaComponente[1], listaComponente[2], listaComponente[3])
        renderizar("110%", "Novo Pedido")
    }
}

function fecharJanela() {
    var paginaParaIr = document.querySelector('.botao-confirmacao').id

    if (paginaParaIr == "adicionar-pedido") {
        escolherRenderizacao(false, paginaParaIr)
        return
    }


    if (pedido.houveMudancaDeDados()) {
        pedido.construirModalGenerico("closeButton")
        return
    }

    if (paginaParaIr == "home.html") {
        sessionStorage.setItem("EXIBICAO-MODAL", true)
        sessionStorage.removeItem("CLIENTE-ID")
        window.location = paginaParaIr
    }

    if (paginaParaIr == "adicionar-pedido") escolherRenderizacao(false, paginaParaIr)
}


function agregarInputsEmLista() {
    var listaInput = []
    var inputs = document.querySelectorAll('input')
    for (var i = 0; i < inputs.length; i++) {
        listaInput.push(inputs[i])
    }
    return listaInput
}

function bloquearInputs() {
    var listaInput = agregarInputsEmLista()

    for (var i = 0; i < listaInput.length; i++) {
        listaInput[i].disabled = true
        document.querySelector('#input-etapa').disabled = true
    }
}

function desbloquearInputs() {
    var listaInput = agregarInputsEmLista()

    for (var i = 0; i < listaInput.length; i++) {
        listaInput[i].disabled = false
        document.querySelector('#input-etapa').disabled = false
    }
}

function desbloquearFormulario(botaoId) {

    var classe = botaoId.substring(botaoId.indexOf('-') + 1);
    var listaInput = document.querySelectorAll(`.${classe}`)

    if (classe == 'cliente') {
        var elNumero = document.querySelector('#input-numero-celular')
        elNumero.disabled = false
    }

    if (classe == 'pedido') {
        var elEtapa = document.querySelector('#input-etapa')
        elEtapa.disabled = false
    }

    for (var i = 0; i < listaInput.length; i++) {
        listaInput[i].disabled = false
    }
}


function esconderBotoesEdicao() {
    var listaBotaoEdicao = document.querySelectorAll('.botao-edicao')

    for (var i = 0; i < listaBotaoEdicao.length; i++) {
        if (listaBotaoEdicao[i].classList.contains('d-block')) {
            listaBotaoEdicao[i].classList.remove('d-block')
        }

        if (!listaBotaoEdicao[i].classList.contains('d-none')) {
            listaBotaoEdicao[i].classList.add('d-none')
        }
    }
}

function exibirBotoesEdicao() {
    var listaBotaoEdicao = document.querySelectorAll('.botao-edicao')

    for (var i = 0; i < listaBotaoEdicao.length; i++) {
        if (listaBotaoEdicao[i].classList.contains('d-none')) {
            listaBotaoEdicao[i].classList.remove('d-none')
        }

        if (!listaBotaoEdicao[i].classList.contains('d-block')) {
            listaBotaoEdicao[i].classList.add('d-block')
        }
    }
}

function esconderBotaoSalvar() {
    var botaoSalvar = document.querySelector('#botao-salvar')

    if (botaoSalvar.classList.contains('d-block')) {
        botaoSalvar.classList.remove('d-block')
    }

    if (!botaoSalvar.classList.contains('d-none')) {
        botaoSalvar.classList.add('d-none')
    }
}

function exibirBotaoSalvar() {
    var botaoSalvar = document.querySelector('#botao-salvar')

    if (botaoSalvar.classList.contains('d-none')) {
        botaoSalvar.classList.remove('d-none')
    }

    if (!botaoSalvar.classList.contains('d-block')) {
        botaoSalvar.classList.add('d-block')
    }

}

function esconderEtapa() {
    var labelEtapa = document.querySelector('#label-etapa')
    var contentEtapa = document.querySelector('#content-etapa')

    if (!labelEtapa.classList.contains('d-none')) {
        labelEtapa.classList.add('d-none')
    }

    if (!contentEtapa.classList.contains('d-none')) {
        contentEtapa.classList.add('d-none')
    }
}

function esconderInputsEndereco() {
    var conteudoEndereco = document.querySelector("#conteudo-endereco")
    if (!conteudoEndereco.classList.contains('d-none')) {
        conteudoEndereco.classList.add('d-none')
    }
}

function exibirInputsEndereco() {
    const conteudoEndereco = document.querySelector("#conteudo-endereco")
    if (conteudoEndereco.classList.contains('d-none')) {
        conteudoEndereco.classList.remove('d-none')
    }

}

function esconderInputsNumero() {
    var conteudoTelefone = document.querySelector("#conteudo-telefone")
    if (!conteudoTelefone.classList.contains('d-none')) {
        conteudoTelefone.classList.add('d-none')
    }
}

function exibirInputsNumero() {
    var conteudoTelefone = document.querySelector("#conteudo-telefone")
    if (conteudoTelefone.classList.contains('d-none')) {
        conteudoTelefone.classList.remove('d-none')
    }

}

function esconderCardEndereco() {
    var cardEndereco = document.querySelector("#card-label-endereco")
    if (!cardEndereco.classList.contains('d-none')) {
        cardEndereco.classList.add('d-none')
    }
}

function exibirCardEndereco() {
    var cardEndereco = document.querySelector("#card-label-endereco")
    if (cardEndereco.classList.contains('d-none')) {
        cardEndereco.classList.remove('d-none')
    }
}

function esconderBotaoCancelar() {
    var botaoCancelar = document.querySelector("#content-btn-cancelar")
    if (!botaoCancelar.classList.contains('d-none')) {
        botaoCancelar.classList.add('d-none')
    }

}

function exibirBotaoCancelar() {
    var botaoCancelar = document.querySelector("#content-btn-cancelar")
    if (botaoCancelar.classList.contains('d-none')) {
        botaoCancelar.classList.remove('d-none')
    }
}

function esconderBotaoItensPedido() {
    var botaoItensPedido = document.querySelector("#conteudo-item-pedido")
    if (!botaoItensPedido.classList.contains('d-none')) {
        botaoItensPedido.classList.add('d-none')
    }

}

function exibirBotaoItensPedido() {
    var botaoItensPedido = document.querySelector("#conteudo-item-pedido")
    if (botaoItensPedido.classList.contains('d-none')) {
        botaoItensPedido.classList.remove('d-none')
    }
}




function exibirEtapa() {
    var labelEtapa = document.querySelector('#label-etapa')
    var contentEtapa = document.querySelector('#content-etapa')

    if (labelEtapa.classList.contains('d-none')) {
        labelEtapa.classList.remove('d-none')
    }

    if (contentEtapa.classList.contains('d-none')) {
        contentEtapa.classList.remove('d-none')
    }


    if (!labelEtapa.classList.contains('d-block')) {
        labelEtapa.classList.add('d-block')
    }

    if (!contentEtapa.classList.contains('d-block')) {
        contentEtapa.classList.add('d-block')
    }
}

function removerEstilizacaoDasInputs() {
    var inputs = document.querySelectorAll('input')
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains('is-valid')) {
            inputs[i].classList.remove('is-valid')
        }
    }

    const selectEtapa = document.querySelector('#input-etapa')
    if (selectEtapa.classList.contains('is-valid')) {
        selectEtapa.classList.remove('is-valid')
    }
}

function removerEstilizacaoDasInputsInvalidas() {
    var inputs = document.querySelectorAll('input')
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains('is-invalid')) {
            inputs[i].classList.remove('is-invalid')
        }
    }

    var divCep = document.querySelector("#div-invalid-cep")
    if(divCep.classList.contains("d-block")) divCep.classList.remove("d-block")
}

function removerDivsInvalidasDosBotoesDeAssociacao(nome){
    var divAssociacao = document.querySelector(`#validacao-associacao-${nome}`)
    if(divAssociacao.classList.contains('d-flex')) divAssociacao.classList.remove('d-flex')
}


export {
    renderizar,
    escolherRenderizacao,
    fecharJanela,
    agregarInputsEmLista,
    bloquearInputs,
    esconderInputsEndereco,
    esconderInputsNumero,
    esconderBotoesEdicao,
    esconderCardEndereco,
    esconderBotaoSalvar,
    esconderBotaoCancelar,
    exibirInputsEndereco,
    exibirInputsNumero,
    exibirBotaoSalvar,
    exibirBotoesEdicao,
    exibirCardEndereco,
    exibirBotaoCancelar,
    desbloquearInputs,
    desbloquearFormulario,
    removerEstilizacaoDasInputs,
    removerEstilizacaoDasInputsInvalidas,
    removerDivsInvalidasDosBotoesDeAssociacao
}


