
import * as pedido from "./pedido.js"
import * as cliente from "./../cliente/contato.js"

window.validarConteudosNulosEEspecificos = validarConteudosNulosEEspecificos
window.agregarConteudosEEnviarParaValidar = agregarConteudosEEnviarParaValidar
window.agregarERetornarConteudosCliente = agregarERetornarConteudosCliente
window.agregarERetornarConteudosModal = agregarERetornarConteudosModal



function agregarConteudosEEnviarParaValidar(){
    var conteudoNome = document.querySelector('#content-nome')
    var conteudoSobrenome = document.querySelector('#content-sobrenome')
    var conteudoEmail = document.querySelector('#content-email')
    var conteudoTelefone = document.querySelector('#content-numero-celular')
    var conteudoDataInicio = document.querySelector('#content-data-inicio')
    var conteudoDataFim = document.querySelector('#content-data-fim')
    var conteudoEtapa = document.querySelector('#content-etapa')
    var conteudoCep = document.querySelector('#content-cep')
    var conteudoNumero = document.querySelector('#content-numero')
    var conteudoRua = document.querySelector('#content-rua')
    var conteudoBairro = document.querySelector('#content-bairro')
    var conteudoCidade = document.querySelector('#content-cidade')
    var conteudoUf = document.querySelector('#content-uf')
  
    var listaDeConteudo = [
      conteudoNome, conteudoSobrenome, conteudoEmail, conteudoTelefone, conteudoDataInicio, conteudoDataFim, conteudoEtapa, conteudoCep, conteudoRua, conteudoNumero,
      conteudoBairro, conteudoCidade, conteudoUf
    ]
  
    return listaDeConteudo
  }


function agregarERetornarConteudosCliente(){
  var conteudoNome = document.querySelector('#content-nome')
  var conteudoSobrenome = document.querySelector('#content-sobrenome')
  var conteudoEmail = document.querySelector('#content-email')

  var listaDeConteudo = [
    conteudoNome, conteudoSobrenome, conteudoEmail
  ]

  return listaDeConteudo
}

function agregarERetornarConteudosModal(tipoConteudo){
  var listaDeConteudo = []

  if(tipoConteudo == "endereco"){
    var conteudoCep = document.querySelector('#content-modal-cep')
    var conteudoNumero = document.querySelector('#content-modal-numero')
    var conteudoRua = document.querySelector('#content-modal-rua')
    var conteudoBairro = document.querySelector('#content-modal-bairro')
    var conteudoCidade = document.querySelector('#content-modal-cidade')
    var conteudoUf = document.querySelector('#content-modal-uf')

    listaDeConteudo.push(conteudoCep, conteudoNumero, conteudoRua, conteudoBairro, conteudoCidade, conteudoUf)
  }

  if(tipoConteudo == "telefone"){
    listaDeConteudo.push(document.querySelector("#content-modal-numero-celular"))
  }

  if(tipoConteudo == "cliente"){
    listaDeConteudo.push(document.querySelector("#content-modal-nome"), 
    document.querySelector("#content-modal-sobrenome"), 
    document.querySelector("#content-modal-email"))
  }

  return listaDeConteudo
}
  
  async function validarConteudosNulosEEspecificos(listaDeConteudo, indiceInput, indiceDivContent, tipoFormulario){
    var formularioValido = true
  
    for(var i = 0; i < listaDeConteudo.length; i++){
      var elInput = listaDeConteudo[i].childNodes[indiceInput]
      var elDivContent = listaDeConteudo[i].childNodes[indiceDivContent]
  
      if(elInput.value == ''){
        estilizarCamposDoFormulario(false, elInput, elDivContent) 
        formularioValido = false
      } 
      else estilizarCamposDoFormulario(true, elInput, elDivContent)
    }
  

    if(tipoFormulario == 'pedido'){
      var camposJson = [
        {
          nome: 'cep',
          validacao: 'igual',
          digitos: 8,
          mensagem: "Número de digitos do Cep inválido."
        },
        {
          nome: 'numero-celular',
          validacao: 'igual',
          digitos: 11,
          mensagem: "Número de digitos do telefone inválido"
        },
        {
          nome: "data-inicio",
          validacao: "dataInicioMenorQueDataFim",
          digitos: null,
          mensagem: "Data de início é maior que a de do fim do agendamento."
        }
      ]
    }

    if(tipoFormulario == 'telefone'){
      var camposJson = [
        {
          nome: 'modal-numero-celular',
          validacao: 'igual',
          digitos: 11,
          mensagem: "Número de digitos do telefone inválido"
        }
      ]
    }

    if(tipoFormulario == 'endereco'){
      var camposJson = [

        {
          nome: 'modal-cep',
          validacao: 'igual',
          digitos: 8,
          mensagem: "Número de digitos do Cep inválido."
        },
      ]
    }


    if(tipoFormulario == 'cliente') var camposJson = []
    if(tipoFormulario == 'cliente-modal') var camposJson = []

    
      
  
    for(var i = 0; i < camposJson.length; i++){
      var nomeCampo = camposJson[i].nome 
      var validacao = camposJson[i].validacao
      var digitos = camposJson[i].digitos
      var mensagem = camposJson[i].mensagem
      var elInput = document.querySelector(`#input-${nomeCampo}`)
      var elDivContent = document.querySelector(`#content-${nomeCampo}`)
  

      if(elInput != null && elDivContent != null){

        if(verificarSeCampoAtendeValidacao(nomeCampo, validacao, digitos)){
          estilizarCamposDoFormulario(true, elInput, elDivContent, null)
        } 
        else {
          estilizarCamposDoFormulario(false, elInput, elDivContent, mensagem)
          formularioValido = false
        }

      }
      
  
    }

    if(!sessionStorage.getItem("PAGINA-CONTATO")){
      verificarAssociacaoTelefone(formularioValido)
      verificarAssociacaoEndereco(formularioValido)
      verificarAssociacaoCliente(formularioValido)
    }
    
  
    if(formularioValido){
      if(tipoFormulario == "pedido") pedido.salvarModificacao()
      if(tipoFormulario == "telefone" || tipoFormulario == "endereco" || tipoFormulario == "cliente-modal" ) pedido.salvarModificacaoModal()  
      if(tipoFormulario == "cliente") await cliente.salvarContato()
    } else {
      pedido.esconderModalGenerico()
    }

  }
  
  function estilizarCamposDoFormulario(valido, elInput, elDivContent, mensagem){
  
    if(valido){
      if(elInput.classList.contains('is-invalid')) elInput.classList.remove('is-invalid')
      if(!elInput.classList.contains('is-valid'))  elInput.classList.add('is-valid')  
      for(var i = 0; i < elDivContent.children.length; i++){
        if(elDivContent.children[i].classList.contains('invalid-feedback')){
          if(elDivContent.children[i].classList.contains('d-block')) elDivContent.children[i].classList.remove('d-block')
            if(!elDivContent.children[i].classList.contains('d-none')) elDivContent.children[i].classList.add('d-none')
        }
    }
    } else {
      if(elInput.classList.contains('is-valid')) elInput.classList.remove('is-valid')
      if(!elInput.classList.contains('is-invalid'))  elInput.classList.add('is-invalid')  
        for(var i = 0; i < elDivContent.children.length; i++){
          if(elDivContent.children[i].classList.contains('invalid-feedback')){
            if(mensagem != undefined)   elDivContent.children[i].innerText = mensagem
            if(elDivContent.children[i].classList.contains('d-none')) elDivContent.children[i].classList.remove('d-none')
              if(!elDivContent.children[i].classList.contains('d-block')) elDivContent.children[i].classList.add('d-block')
          }
        }

    }
  
  }

  function removerEstilizacaoDoFormulario(){
    var inputValidas = document.querySelectorAll('.is-valid')
    for(var i = 0; i < inputValidas.length; i++){
      inputValidas[i].classList.remove('is-valid')
    }
  }
  
  function verificarSeCampoAtendeValidacao(nomeCampo, tipoValidacao, digitos){
    var valorCampo = document.querySelector(`#input-${nomeCampo}`).value
  
    if(tipoValidacao == 'igual'){
  
      if(valorCampo.length == digitos){
        return true
      } else{
        return false
      }
  
    } 


    if(tipoValidacao == 'maiorOuIgual'){
  
      if(valorCampo.length >= digitos){
        return true
      } else{
        return false
      }
  
    } 


    if(tipoValidacao == "dataInicioMenorQueDataFim"){
      var dataInicio = new Date(document.querySelector("#input-data-inicio").value)
      var dataFim = new Date(document.querySelector("#input-data-fim").value)

      if(dataInicio > dataFim) return false
      else return true 
    }

    
      
  }


  function verificarAssociacaoTelefone(formularioValido){
    var elInputTelefone = document.querySelector("#conteudo-telefone")
    if(elInputTelefone.classList.contains('d-none')){
      formularioValido = false
      exibirErroAssociacaoTelefone()
      return
    } 

    ocultarErroAssociacaoTelefone()
  }

  function verificarAssociacaoEndereco(formularioValido){
    var elInputEndereco = document.querySelector("#conteudo-endereco")
    if(elInputEndereco.classList.contains('d-none')){
      formularioValido = false
      exibirErroAssociacaoEndereco()
      return
    } 

    ocultarErroAssociacaoEndereco()
  }


  function verificarAssociacaoCliente(formularioValido){
    if(document.querySelector("#associacao-cliente")){
      formularioValido = false
      exibirErroAssociacaoCliente()
      return
    } 

    ocultarErroAssociacaoCliente()
  }

  function exibirErroAssociacaoCliente(){
    var divErroCliente = document.querySelector("#validacao-associacao-cliente")
    if(!divErroCliente.classList.contains('d-flex')) divErroCliente.classList.add('d-flex')
  }

  function exibirErroAssociacaoTelefone(){
      var divErroTelefone = document.querySelector("#validacao-associacao-telefone")
      if(!divErroTelefone.classList.contains('d-flex')) divErroTelefone.classList.add('d-flex')
  }

  function exibirErroAssociacaoEndereco(){
    var divErroEndereco = document.querySelector("#validacao-associacao-endereco")
    if(!divErroEndereco.classList.contains('d-flex')) divErroEndereco.classList.add('d-flex')
  }

  function ocultarErroAssociacaoCliente(){
    var divErroCliente = document.querySelector("#validacao-associacao-cliente")
    if(divErroCliente.classList.contains('d-flex')) divErroCliente.classList.remove('d-flex')
  }

  function ocultarErroAssociacaoTelefone(){
    var divErroTelefone = document.querySelector("#validacao-associacao-telefone")
    if(divErroTelefone.classList.contains('d-flex')) divErroTelefone.classList.remove('d-flex')
  }

  function ocultarErroAssociacaoEndereco(){
    var divErroEndereco = document.querySelector("#validacao-associacao-endereco")
    if(divErroEndereco.classList.contains('d-flex')) divErroEndereco.classList.remove('d-flex')
  }



export {
    agregarConteudosEEnviarParaValidar,
    agregarERetornarConteudosCliente,
    validarConteudosNulosEEspecificos,
    estilizarCamposDoFormulario,
    removerEstilizacaoDoFormulario,
    verificarSeCampoAtendeValidacao
}