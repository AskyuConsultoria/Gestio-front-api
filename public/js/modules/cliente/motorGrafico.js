import * as motorGraficoForm from "../pedido/motorGrafico.js"
import * as apiForm from "../pedido/api.js"
import * as apiContato from "./api.js"

window.escolherRenderizacao = escolherRenderizacao

function escolherRenderizacao(){
    var paginaRenderizada = sessionStorage.getItem("PAGINA-CONTATO")
    var enderecoId = sessionStorage.getItem("ENDERECO-MODAL-ID")
    var telefoneId = sessionStorage.getItem("TELEFONE-MODAL-ID")
    var clienteId = sessionStorage.getItem("CLIENTE-ID")

    if(paginaRenderizada == 'criar-contato'){
        motorGraficoForm.esconderInputsEndereco()
        motorGraficoForm.esconderInputsNumero()
        motorGraficoForm.esconderBotoesEdicao()
        motorGraficoForm.esconderCardEndereco()
        esconderBotoesAssociacao()
        exibirComponenteDependente()
    }

    if(paginaRenderizada == 'consultar-contato'){
        motorGraficoForm.exibirBotoesEdicao()
        motorGraficoForm.exibirCardEndereco()
        motorGraficoForm.esconderInputsEndereco()
        motorGraficoForm.esconderInputsNumero()

        exibirBotoesAssociacao()
        exibirComponenteDependente()
        renderizarTextoConsultaEndereco()
        renderizarTextoConsultaTelefone()

        if(enderecoId != null){
            motorGraficoForm.exibirInputsEndereco()
            renderizarTextoConsultaEndereco()
            apiForm.buscarEnderecoPorId()
        } 

        if(telefoneId != null){
            motorGraficoForm.exibirInputsNumero()
            renderizarTextoConsultaTelefone()
            apiForm.buscarTelefonePorId()
        } 

        if(clienteId != null){
            apiContato.buscarClientePorId(clienteId)
        }
    }
}



function verificarAssociacoesEExibirBotaoSalvar(){
   var enderecoAssociado = !document.querySelector("#input-cep").classList.contains('d-none')
   var telefoneAssociado = !document.querySelector("#input-numero-celular").classList.contains('d-none')

   if(enderecoAssociado && telefoneAssociado) motorGraficoForm.exibirBotaoSalvar()

}

function esconderBotoesAssociacao(){
   var botoesAssociacao = document.querySelectorAll(".botao-associar")

   for(var i = 0; i < botoesAssociacao.length; i++){
      if(!botoesAssociacao[i].classList.contains('d-none')){
        botoesAssociacao[i].classList.add('d-none')
      }
   }
}

function exibirBotoesAssociacao(){
    var botoesAssociacao = document.querySelectorAll(".botao-associar")
 
    for(var i = 0; i < botoesAssociacao.length; i++){
       if(botoesAssociacao[i].classList.contains('d-none')){
         botoesAssociacao[i].classList.remove('d-none')
       }
    }
 }


function exibirComponenteDependente(){
    const responsavelExiste = sessionStorage.getItem("RESPONSAVEL-ID") != null
    const clienteExiste = sessionStorage.getItem("CLIENTE-ID") != null
    const componenteDependentes = document.querySelector("#componente-dependentes")
    if(responsavelExiste && clienteExiste){
        if(componenteDependentes.classList.contains('d-none')){
            componenteDependentes.classList.remove('d-none')
        }
    } else {
        if(componenteDependentes.classList.contains('d-flex')){
            componenteDependentes.classList.remove('d-flex')
        }
        componenteDependentes.classList.add('d-none')
    }
 }
 

function renderizarTextoBotoesCriacaoTelefone(){
    var botoesAssociacao = document.querySelectorAll(".botao-associar")
    botoesAssociacao[0].innerText = "Cadastrar Telefone"
}

function renderizarTextoBotoesCriacaoEndereco(){
    var botoesAssociacao = document.querySelectorAll(".botao-associar")
    botoesAssociacao[1].innerText = "Cadastrar Endereço"
}


function renderizarTextoConsultaTelefone(){
    var botoesAssociacao = document.querySelectorAll(".botao-associar")
    botoesAssociacao[0].innerText = "Visualizar Telefones"
}


function renderizarTextoConsultaEndereco(){
    var botoesAssociacao = document.querySelectorAll(".botao-associar")
    botoesAssociacao[1].innerText = "Visualizar Endereços"
}


export {
    escolherRenderizacao
}