
import * as pedido from "./pedido.js"

window.validarConteudosNulosEEspecificos = validarConteudosNulosEEspecificos

function agregarConteudosEEnviarParaValidar(){
    var conteudoNome = document.querySelector('#content-nome')
    var conteudoSobrenome = document.querySelector('#content-sobrenome')
    var conteudoEmail = document.querySelector('#content-email')
    var conteudoTelefone = document.querySelector('#content-numero-celular')
    var conteudoDataInicio = document.querySelector('#content-data-inicio')
    var conteudoDataFim = document.querySelector('#content-data-fim')
    var conteudoEtapa = document.querySelector('#content-etapa')
    var conteudoCep = document.querySelector('#content-cep')
    var conteudoRua = document.querySelector('#content-rua')
    var conteudoBairro = document.querySelector('#content-bairro')
    var conteudoCidade = document.querySelector('#content-cidade')
    var conteudoUf = document.querySelector('#content-uf')
  
    var listaDeConteudo = [
      conteudoNome, conteudoSobrenome, conteudoEmail, conteudoTelefone, conteudoDataInicio, conteudoDataFim, conteudoEtapa, conteudoCep, conteudoRua,
      conteudoBairro, conteudoCidade, conteudoUf
    ]
  
    return listaDeConteudo
  }
  
  function validarConteudosNulosEEspecificos(){
    var listaDeConteudo = agregarConteudosEEnviarParaValidar()
    var formularioValido = true
  
    for(var i = 0; i < listaDeConteudo.length; i++){
      var elInput = listaDeConteudo[i].childNodes[1]
      var elDivContent = listaDeConteudo[i].childNodes[3]
  
      if(elInput.value == ''){
        estilizarCamposDoFormulario(false, elInput, elDivContent) 
        formularioValido = false
      } 
      else estilizarCamposDoFormulario(true, elInput, elDivContent)
    }
  
    var camposJson = [
      {
        nome: 'cep',
        validacao: 'diferente',
        digitos: 8,
        mensagem: "Número de digitos do Cep inválido."
      },
      {
        nome: 'numero-celular',
        validacao: 'diferente',
        digitos: 11,
        mensagem: "Número de digitos do telefone inválido"
      },
    ]
      
  
    for(var i = 0; i < camposJson.length; i++){
      var nomeCampo = camposJson[i].nome 
      var validacao = camposJson[i].validacao
      var digitos = camposJson[i].digitos
      var mensagem = camposJson[i].mensagem
      var elInput = document.querySelector(`#input-${nomeCampo}`)
      var elDivContent = document.querySelector(`#content-${nomeCampo}`).childNodes[3]
  
      if(verificarSeCampoAtendeValidacao(nomeCampo, validacao, digitos)){
        estilizarCamposDoFormulario(true, elInput, elDivContent, null)
      } 
      else {
        estilizarCamposDoFormulario(false, elInput, elDivContent, mensagem)
        formularioValido = false
      } 
  
    }
  
    if(formularioValido) pedido.salvarModificacao()
    else modalGenerico.hide()
  }
  
  function estilizarCamposDoFormulario(valido, elInput, elDivContent, mensagem){
  
    if(valido){
      if(elInput.classList.contains('is-invalid')) elInput.classList.remove('is-invalid')
      if(!elInput.classList.contains('is-valid'))  elInput.classList.add('is-valid')  
      elDivContent.classList.remove('d-block')
      if(!elDivContent.classList.contains('d-none')) elDivContent.classList.add('d-none')
    } else {
      if(elInput.classList.contains('is-valid')) elInput.classList.remove('is-valid')
      if(!elInput.classList.contains('is-invalid'))  elInput.classList.add('is-invalid')  
      if(mensagem != undefined) elDivContent.innerHTML = mensagem
      elDivContent.classList.remove('d-none')
      if(!elDivContent.classList.contains('d-block')) elDivContent.classList.add('d-block')
    }
  
  }
  
  function verificarSeCampoAtendeValidacao(nomeCampo, tipoValidacao, digitos){
    var valorCampo = document.querySelector(`#input-${nomeCampo}`).value
  
    if(tipoValidacao == 'diferente'){
  
      if(valorCampo.length != digitos){
        return false
      } else{
        return true
      }
  
    } 
      
  }


export {
    agregarConteudosEEnviarParaValidar,
    validarConteudosNulosEEspecificos,
    estilizarCamposDoFormulario,
    verificarSeCampoAtendeValidacao
}