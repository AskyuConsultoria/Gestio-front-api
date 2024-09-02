
import * as motorGrafico from "./motorGrafico.js"
import * as api from "./api.js"

window.verificarDadosEExibirBotaoDeConfirmacao = verificarDadosEExibirBotaoDeConfirmacao
window.construirModalGenerico = construirModalGenerico
window.validarEventoKeyboard = validarEventoKeyboard
window.verificarDadosEExibirBotaoDeConfirmacao = verificarDadosEExibirBotaoDeConfirmacao
window.construirModalGenerico = construirModalGenerico


window.clienteId = sessionStorage.getItem('CLIENTE-ID')
window.inputClienteId = clienteId;
window.inputTelefoneId = telefoneId;
window.inputAgendamentoId = agendamentoId;
window.inputEnderecoId = enderecoId;

window.inputAntigoNome = inputAntigoNome;
window.inputAntigoSobrenome = inputAntigoSobrenome;
window.inputAntigoTelefone = inputAntigoTelefone;
window.inputAntigoEmail = inputAntigoEmail;

window.inputAntigoDataInicioPedido = inputAntigoDataInicioPedido;
window.inputAntigoDataFimPedido = inputAntigoDataFimPedido;

window.inputAntigoCep = inputAntigoCep;
window.inputAntigoRua = inputAntigoRua;
window.inputAntigoBairro = inputAntigoBairro;
window.inputAntigoCidade = inputAntigoCidade;
window.inputAntigoUf = inputAntigoUf;

window.inputNovoNome = inputNovoNome;
window.inputNovoSobrenome = inputNovoSobrenome;
window.inputNovoTelefone = inputNovoTelefone;
window.inputNovoEmail = inputNovoEmail;

window.inputNovoDataInicioPedido = inputNovoDataInicioPedido;
window.inputNovoDataFimPedido = inputNovoDataFimPedido;

window.inputNovoCep = inputNovoCep;
window.inputNovoRua = inputNovoRua;
window.inputNovoBairro = inputNovoBairro;
window.inputNovoCidade = inputNovoCidade;
window.inputNovoUf = inputNovoUf;

window.inputSalvarCliente = salvarCliente;
window.inputSalvarPedido = salvarPedido;
window.inputSalvarEndereco = salvarEndereco;
window.inputSalvarTelefone = salvarTelefone;


export var clienteId = ""
export var telefoneId = ""
export var agendamentoId = ""
export var enderecoId = ""


export var inputAntigoNome = ""
export var inputAntigoSobrenome = ""
export var inputAntigoTelefone = ""
export var inputAntigoEmail = ""

export var inputAntigoDataInicioPedido = ""
export var inputAntigoDataFimPedido = ""

export var inputAntigoCep = ""
export var inputAntigoRua = ""
export var inputAntigoBairro = ""
export var inputAntigoCidade = ""
export var inputAntigoUf = ""

export var inputNovoNome = ""
export var inputNovoSobrenome = ""
export var inputNovoTelefone = ""
export var inputNovoEmail = ""

export var inputNovoDataInicioPedido = ""
export var inputNovoDataFimPedido = ""

export var inputNovoCep = ""
export var inputNovoRua = ""
export var inputNovoBairro = ""
export var inputNovoCidade = ""
export var inputNovoUf = ""

export var salvarCliente = false
export var salvarPedido = false
export var salvarEndereco = false
export var salvarTelefone = false

export async function preencherDadosDePedidoCompleto(agendamento) {
  agendamentoId = agendamento.id
  var clienteId = agendamento.cliente.id
  sessionStorage.setItem("ETAPA-ID", agendamento.etapa.id)
  sessionStorage.setItem("ENDERECO-ID", agendamento.endereco.id)

  document.querySelector('#input-data-inicio').value = agendamento.dataInicio
  document.querySelector('#input-data-fim').value = agendamento.dataFim

  await api.buscarEtapas()
  var elSelectEtapa = document.querySelector('#input-etapa')
  for (var i = 0; i < elSelectEtapa.options.length; i++) {
    if (elSelectEtapa.options[i].value == agendamento.id) {
      elSelectEtapa.selectedIndex = i
    }
  }

  inputAntigoDataInicioPedido = agendamento.dataInicio
  inputAntigoDataFimPedido = agendamento.dataFim

  if(agendamento.endereco != null){
    document.querySelector('#input-cep').value = agendamento.endereco.cep
    // document.querySelector('#input-numero').value = agendamento.numeroEndereco
    document.querySelector('#input-rua').value = agendamento.endereco.localidade
    document.querySelector('#input-bairro').value = agendamento.endereco.bairro
    // document.querySelector('#input-cidade').value = agendamento.cidade 
    document.querySelector('#input-uf').value = agendamento.endereco.uf
  
    inputAntigoCep = agendamento.endereco.cep
    inputAntigoRua = agendamento.endereco.localidade
    inputAntigoBairro = agendamento.endereco.bairro
    inputAntigoUf = agendamento.endereco.uf
  }

  sessionStorage.setItem('CLIENTE-ID', agendamento.cliente.id)
  
  api.buscarClienteView(clienteId)
}

export function preencherDadosCliente(cliente) { 
  sessionStorage.setItem('CLIENTE-ID', cliente.id)
  sessionStorage.setItem('TELEFONE-ID', cliente.telefone_id)


  document.querySelector('#input-nome').value = cliente.nome
  document.querySelector('#input-sobrenome').value = cliente.sobrenome
  document.querySelector('#input-numero-celular').value = cliente.numero
  document.querySelector('#input-email').value = cliente.email

  inputAntigoNome = cliente.nome
  inputAntigoSobrenome = cliente.sobrenome
  inputAntigoTelefone = cliente.numero
  inputAntigoEmail = cliente.email


  if (sessionStorage.getItem('PAGINA-PEDIDO') == 'adicionar-pedido') {
    motorGrafico.escolherRenderizacao(false, 'adicionar-pedido')
  }

}


export function preencherDadosEndereco(endereco){
    document.querySelector('#input-cep').value = endereco.cep
    // document.querySelector('#input-numero').value = numeroEndereco
    document.querySelector('#input-rua').value = endereco.localidade
    document.querySelector('#input-bairro').value = endereco.bairro
    // document.querySelector('#input-cidade').value = cidade 
    document.querySelector('#input-uf').value = endereco.uf
  
    inputAntigoCep = endereco.cep
    inputAntigoRua = endereco.localidade
    inputAntigoBairro = endereco.bairro
    inputAntigoUf = endereco.uf
}

export function preencherCardsDeCliente(listaCliente) {
  var boxCliente = document.querySelector("#conteudo-cliente")
  boxCliente.innerHTML = ""
  for (var i = 0; i < listaCliente.length; i++) {
    boxCliente.innerHTML +=
      `
        <div class="d-flex container px-3 col-12 py-2 flex-row w-100" style="height: 76px;" id="${listaCliente[i].id}" onclick="buscarClienteView(this.id)">
                <div class="d-flex flex-row w-100 bg-body rounded shadow-sm">
                    <div class="d-flex h-100 w-15 rounded rounded-end-0"
                        style="width: 2rem; background-color: #012171;"></div>

                    <div class="d-flex flex-column h-100 bg-body align-items-center justify-content-center"
                        style="width: 85%;">

                        <div class="d-flex w-100 h-75 align-items-center ps-3 fw-medium">
                            ${listaCliente[i].nome} ${listaCliente[i].sobrenome}
                        </div>

                    </div>

                </div>
        </div>
        `
  }
}

export function preencherOptionsEtapa(listaEtapas) {
  const etapaId = sessionStorage.getItem('ETAPA-ID')
  const elEtapa = document.querySelector('#input-etapa')
  elEtapa.innerHTML = ""

  for (var i = 0; i < listaEtapas.length; i++) {
    var option = document.createElement('option')
    option.value = listaEtapas[i].id
    option.innerText = listaEtapas[i].nome
    elEtapa.appendChild(option)
    if (listaEtapas[i].id == etapaId) elEtapa.selectedIndex = i
  }

}


export function preencherStatusAgendamento(listaAgendamento) {
  const tamanhoLista = listaAgendamento.length
  var elStatus = document.querySelector('#conteudo-status')
  elStatus.innerHTML = ''

  var i = 0
  while (i < tamanhoLista) {
    if (tamanhoLista % 2 != 0 && i == (tamanhoLista - 1)) {
      elStatus.innerHTML += ` <div class="d-flex flew-row px-3 pt-2 pb-2 w-100">
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex justify-content-around rounded bg-body" style="width: 48%;">
                <div class="d-flex justify-content-center align-items-center" style="width: 45%">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                        fill="#012171">
                        <path
                            d="M760-120 480-400l-94 94q8 15 11 32t3 34q0 66-47 113T240-80q-66 0-113-47T80-240q0-66 47-113t113-47q17 0 34 3t32 11l94-94-94-94q-15 8-32 11t-34 3q-66 0-113-47T80-720q0-66 47-113t113-47q66 0 113 47t47 113q0 17-3 34t-11 32l494 494v40H760ZM600-520l-80-80 240-240h120v40L600-520ZM240-640q33 0 56.5-23.5T320-720q0-33-23.5-56.5T240-800q-33 0-56.5 23.5T160-720q0 33 23.5 56.5T240-640Zm240 180q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6ZM240-160q33 0 56.5-23.5T320-240q0-33-23.5-56.5T240-320q-33 0-56.5 23.5T160-240q0 33 23.5 56.5T240-160Z">
                        </path>
                    </svg>

                </div>
                <div class="d-flex flex-column w-75 align-items-center justify-content-center">
                    <div class="d-flex m-1 justify-content-center" style="color: #012171; font-weight: bold">
                        ${listaAgendamento[i].etapa.nome}
                    </div>

                    <div class="d-flex m-1 justify-content-center">
                        ${formatarData(listaAgendamento[i].agendamento.dataInicio)}
                    </div>
                    <div class="d-flex m-1 justify-content-center">
                      ${formatarHorario(listaAgendamento[i].agendamento.dataInicio)} - ${formatarHorario(listaAgendamento[i].agendamento.dataFim)}
                    </div>
                </div>
            </div>
            <div>
            `
      return
    }

    elStatus.innerHTML += ` <div class="d-flex flew-row px-3 pt-2 pb-2 w-100">
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex justify-content-around rounded bg-body" style="width: 48%;">
                <div class="d-flex justify-content-center align-items-center" style="width: 45%">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                        fill="#012171">
                        <path
                            d="M760-120 480-400l-94 94q8 15 11 32t3 34q0 66-47 113T240-80q-66 0-113-47T80-240q0-66 47-113t113-47q17 0 34 3t32 11l94-94-94-94q-15 8-32 11t-34 3q-66 0-113-47T80-720q0-66 47-113t113-47q66 0 113 47t47 113q0 17-3 34t-11 32l494 494v40H760ZM600-520l-80-80 240-240h120v40L600-520ZM240-640q33 0 56.5-23.5T320-720q0-33-23.5-56.5T240-800q-33 0-56.5 23.5T160-720q0 33 23.5 56.5T240-640Zm240 180q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6ZM240-160q33 0 56.5-23.5T320-240q0-33-23.5-56.5T240-320q-33 0-56.5 23.5T160-240q0 33 23.5 56.5T240-160Z">
                        </path>
                    </svg>

                </div>
                <div class="d-flex flex-column w-75 align-items-center  justify-content-center">
                    <div class="d-flex m-1 justify-content-center" style="color: #012171; font-weight: bold">
                        ${listaAgendamento[i].etapa.nome}
                    </div>

                    <div class="d-flex m-1 justify-content-center">
                      ${formatarData(listaAgendamento[i].agendamento.dataInicio)}
                    </div>
                    <div class="d-flex m-1 justify-content-center">
                      ${formatarHorario(listaAgendamento[i].agendamento.dataInicio)} ${formatarHorario(listaAgendamento[i].agendamento.dataFim)}
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-around rounded bg-body" style="width: 48%;">
                <div class="d-flex justify-content-center align-items-center" style="width: 45%">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                        fill="#012171">
                        <path
                            d="M760-120 480-400l-94 94q8 15 11 32t3 34q0 66-47 113T240-80q-66 0-113-47T80-240q0-66 47-113t113-47q17 0 34 3t32 11l94-94-94-94q-15 8-32 11t-34 3q-66 0-113-47T80-720q0-66 47-113t113-47q66 0 113 47t47 113q0 17-3 34t-11 32l494 494v40H760ZM600-520l-80-80 240-240h120v40L600-520ZM240-640q33 0 56.5-23.5T320-720q0-33-23.5-56.5T240-800q-33 0-56.5 23.5T160-720q0 33 23.5 56.5T240-640Zm240 180q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6ZM240-160q33 0 56.5-23.5T320-240q0-33-23.5-56.5T240-320q-33 0-56.5 23.5T160-240q0 33 23.5 56.5T240-160Z">
                        </path>
                    </svg>

                </div>
                <div class="d-flex flex-column w-75 align-items-center  justify-content-center">
                    <div class="d-flex m-1 justify-content-center" style="color: #012171; font-weight: bold">
                        ${listaAgendamento[i + 1].etapa.nome}
                    </div>

                    <div class="d-flex m-1 justify-content-center">
                        ${formatarData(listaAgendamento[i + 1].agendamento.dataInicio)}
                    </div>
                    <div class="d-flex m-1 justify-content-center">
                         ${formatarHorario(listaAgendamento[i + 1].agendamento.dataInicio)} - ${formatarHorario(listaAgendamento[i + 1].agendamento.dataFim)}
                    </div>
                </div>
            </div>

        </div>
    </div>`

    i += 2
  }
}




function formatarData(data) {
  var dia = new Date(data).getDate()
  var mes = new Date(data).getMonth() + 1
  var ano = new Date(data).getFullYear()

  return `${dia}/${mes}/${ano}`
}

function formatarHorario(data) {
  var horas = new Date(data).getHours()

  var horarioFormatado = ""
  if (horas <= 9) {
    horarioFormatado = `0${horas}h`
  }

  horarioFormatado = `${horas}h`
  return horarioFormatado
}

export function associarClienteACriacaoDePedido(novoClienteId, cliente) {
  clienteId = novoClienteId
  document.querySelector('#input-nome').value = cliente.nome
  document.querySelector('#input-sobrenome').value = cliente.sobrenome
  document.querySelector('#input-email').value = cliente.email
  sessionStorage.removeItem("AGENDAMENTO-ID")
  motorGrafico.escolherRenderizacao(false, "adicionar-pedido")
}


export function verificarDadosEExibirBotaoDeConfirmacao(idInput, dadoAntigo) {
  var inputElemento = document.querySelector(`#${idInput}`)

  if (inputElemento.classList.contains("cliente")) salvarCliente = true
  if (inputElemento.classList.contains("telefone")) salvarTelefone = true
  if (inputElemento.classList.contains("endereco")) salvarEndereco = true
  if (inputElemento.classList.contains("pedido")) salvarPedido = true
}


const modalGenerico = new bootstrap.Modal(document.getElementById('modal-generico'))

window.modalGenerico = modalGenerico

export function construirModalGenerico(elementoId, status) {
  var textoModal = ""
  var elementoBody = document.querySelector("#body-modal-generico")
  var elementoFooter = document.querySelector("#footer-modal-generico")

  elementoFooter.innerHTML = ""

  if (elementoId == "statusButton") {
    elementoFooter.innerHTML =
      `
     <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>
    `
    textoModal = status
    modalGenerico.show()
  }

  if (elementoId == "botao-salvar") {
    elementoFooter.innerHTML = `

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="validarConteudosNulosEEspecificos()"  style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button>
    `

    textoModal = "Deseja salvar as alterações no pedido?"
    modalGenerico.show()
  }

  if (elementoId == "closeButton") {
    elementoFooter.innerHTML = `
   <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="validarConteudosNulosEEspecificos()"  style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button>
    `
    textoModal = "Existem alterações não salvas no seu pedido, deseja salvar?"
    modalGenerico.show()
  }

  elementoBody.innerHTML = textoModal
}

export const modalMultivalorado = new bootstrap.Modal(document.querySelector('#modal-multivalorado'))
window.modalMultivalorado = modalMultivalorado

export async function escolherModalMultivalorado(nomeModal, lista) {
  const enderecoId = sessionStorage.getItem('ENDERECO-ID')
  const conteudoModal = document.querySelector('#conteudo-modal-multivalorado')
  conteudoModal.innerHTML = ""

  var inputChecked = ""
  var titulo = ""
  var corpo = ""
  var id = ""

  if (nomeModal == "endereco") {
    titulo = "Endereço do Cliente"
    corpo = "exibirEnderecoCompleto(lista[i])"
  } else if (nomeModal == "telefone") {
    titulo = "Telefone do Cliente"
    corpo = "lista[i].numero"
  }

  for(var i = 0; i < lista.length; i++) {
    conteudoModal.innerHTML += `<div class="d-flex px-3 flex-column">
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${lista[i].id}">
    <span id="span-multivalorado-${i}">${lista[i].cliente.nome} ${lista[i].cliente.sobrenome}</span>
  </div>
  </div>
   <div class="d-flex pt-1 pb-1 text-secondary" style="padding-left: 2.5rem; width: 85%">
    <span style="width: -18px;" id="corpo-multivalorado-${i}">${eval(corpo)}</span>
   </div>
   <hr></hr>
  <div>
  `


  if(lista[i].id == enderecoId && i != 0 && lista.length > 1) exibirEnderecoSalvoPrimeiro(lista[i], i)
  }

  conteudoModal.innerHTML += `<div class="d-flex justify-content-end px-3">
                        <button type="button" class="btn text-secondary me-2" data-bs-dismiss="modal" style="border-color: #eeeaea;">Cancelar</button>
                        <button type="button" class="btn text-white" style="background-color: #012171;" onclick="atualizarEnderecoAgendamento(
                        document.querySelector('.form-check-input:checked').id)">Confirmar</button>
                    </div>`

  modalMultivalorado.show()
  document.getElementById(`${parseInt(enderecoId)}`).checked = true 

}

export function exibirEnderecoCompleto(endereco) {
  // Necessita de inclusão de Cidade antes de cep.
  return `${endereco.logradouro}, ${endereco.localidade}, ${endereco.bairro}, ${endereco.cep}`
}

export function exibirEnderecoSalvoPrimeiro(endereco, iterador){
  var spanMultivalorado = document.querySelector(`#span-multivalorado-${iterador}`)
  var corpoMultivalorado = document.querySelector(`#corpo-multivalorado-${iterador}`)
  var inputCheck = document.getElementById(`${endereco.id}`)


  var primeiroSpan = document.querySelector(`#span-multivalorado-0`)
  var primeiroCorpo = document.querySelector(`#corpo-multivalorado-0`)
  var modalMultivalorado = document.querySelector("#conteudo-modal-multivalorado")
  var primeiraInput = modalMultivalorado.childNodes[0].childNodes[1].childNodes[1]

  var textoPrimeiroSpan = primeiroSpan.innerText
  var textoPrimeiroCorpo = primeiroCorpo.innerText
  var textoPrimeiraInputId = primeiraInput.id

  primeiroSpan.innerText = spanMultivalorado.innerText
  primeiroCorpo.innerText = corpoMultivalorado.innerText
  primeiraInput.id = inputCheck.id

  spanMultivalorado.innerText = textoPrimeiroSpan
  corpoMultivalorado.innerText = textoPrimeiroCorpo
  inputCheck.id = textoPrimeiraInputId
}


export async function salvarModificacao() {
  const agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")
  const listaDeResponse = []

  if (salvarCliente) {
    listaDeResponse.push(await api.atualizarDadosCliente(clienteId))
  }
  // if (salvarTelefone) atualizarDadosTelefone(telefoneId)
   if (salvarEndereco) atualizarDadosEndereco(enderecoId)

  if (salvarPedido && agendamentoId == null) {
    api.criarPedido(agendamentoId)
  } else if (salvarPedido) {
    listaDeResponse.push(await api.atualizarDadosPedido(agendamentoId))
  }

  if (listaDeResponse.length == 0 && salvarPedido == false) {
    construirModalGenerico("statusButton", "Nenhum dado foi modificado, atualize um dado para salvar.")
    return
  }
  validarRetornoEExibirModalDeStatus(listaDeResponse)
}

export function esconderModalMultivalorado(){
  modalMultivalorado.hide()
}

export function houveMudancaDeDados() {
  if (salvarPedido || salvarCliente || salvarEndereco || salvarTelefone) return true
  else return false
}

export function dadosForamAtualizados() {
  salvarCliente = false
  salvarPedido = false
  salvarEndereco = false
  salvarEndereco = false
  salvarTelefone = false
}

function validarRetornoEExibirModalDeStatus(listaResponse) {
  var responseInvalida = 404 || 400 || 501 || 500
  for (var i = 0; i < listaResponse.length; i++) {
    if (listaResponse[i] == responseInvalida) {
      exibirStatusDaRespostaAPI(listaResponse[i])
      return
    }
  }

  exibirStatusDaRespostaAPI(listaResponse[0])
}

export function exibirStatusDaRespostaAPI(response) {
  var status = "Alterações salvas com sucesso"
  if (response.status == 500 || response.status == 400 || response.status == 404) status = `Ocorreu um erro no servidor: ${response.status}.`
  dadosForamAtualizados()
  esconderBotaoSalvar()
  construirModalGenerico("statusButton", status)
}


export function validarEventoKeyboard(evento) {
  if (evento.key == "Enter") {
    api.buscarClientesPorNome(document.querySelector("#input-cliente").value)
  }
}


export function esconderBotaoSalvar() {
  document.querySelector('#confirmButton').classList.replace('d-flex', 'd-none')
}
