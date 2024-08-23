
import * as motorGrafico  from "./motorGrafico.js"
import * as api from "./api.js"

window.verificarDadosEExibirBotaoDeConfirmacao = verificarDadosEExibirBotaoDeConfirmacao
window.construirModalGenerico = construirModalGenerico
window.validarEventoKeyboard = validarEventoKeyboard
window.verificarDadosEExibirBotaoDeConfirmacao = verificarDadosEExibirBotaoDeConfirmacao


window.clienteId = clienteId
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
  document.querySelector('#input-data-inicio').value = agendamento.dataInicio
  document.querySelector('#input-data-fim').value = agendamento.dataFim

  inputAntigoDataInicioPedido = agendamento.dataInicio
  inputAntigoDataFimPedido = agendamento.dataFim

  api.buscarClienteView(clienteId)
}

export function preencherDadosCliente(cliente) {
  clienteId = cliente.id
  telefoneId = cliente.telefone_id
  enderecoId = cliente.endereco_id


  document.querySelector('#input-nome').value = cliente.nome
  document.querySelector('#input-sobrenome').value = cliente.sobrenome
  document.querySelector('#input-numero-celular').value = cliente.numero
  document.querySelector('#input-email').value = cliente.email

  inputAntigoNome = cliente.nome
  inputAntigoSobrenome = cliente.sobrenome
  inputAntigoTelefone = cliente.numero
  inputAntigoEmail = cliente.email

  document.querySelector('#input-cep').value = cliente.cep
  // document.querySelector('#input-numero').value = cliente.numeroEndereco
  document.querySelector('#input-rua').value = cliente.localidade
  document.querySelector('#input-bairro').value = cliente.bairro
  // document.querySelector('#input-cidade').value = cliente.cidade 
  document.querySelector('#input-uf').value = cliente.uf

  inputAntigoCep = cliente.cep
  inputAntigoRua = cliente.localidade
  inputAntigoBairro = cliente.bairro
  inputAntigoUf = cliente.uf

}

export function preencherCardsDeCliente(listaCliente) {
  var boxCliente = document.querySelector("#conteudo-cliente")
  boxCliente.innerHTML = ""
  for (i = 0; i < listaCliente.length; i++) {
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
  var dadoNovo = inputElemento.value

  if (dadoNovo != dadoAntigo) document.querySelector('#confirmButton').classList.replace("d-none", "d-flex")
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

  if (elementoId == "confirmButton") {
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

export function salvarModificacao() {
  var agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")
  if (salvarCliente) api.atualizarDadosCliente(clienteId)
  // if (salvarTelefone) atualizarDadosTelefone(telefoneId)
  // if (salvarEndereco) atualizarDadosEndereco(enderecoId)

  if (salvarPedido && agendamentoId == null) {
    api.criarPedido(agendamentoId)
  } else if (salvarPedido) api.atualizarDadosPedido(agendamentoId)
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


export async function exibirStatusDaRespostaAPI(response) {
  var status = "Alterações salvas com sucesso"
  if (response.status == 500 || response.status == 400 || response.status == 404) status = `Ocorreu um erro no servidor: ${response.status}.`
  dadosForamAtualizados()
  modalGenerico.toggle()
  pedido.esconderBotaoSalvar()
  construirModalGenerico("statusButton", status)
}


export function validarEventoKeyboard(evento) {
  if (evento.key == "Enter") {
    buscarClientesPorNome(document.querySelector("#input-cliente").value)
  }
}


export function esconderBotaoSalvar() {
  document.querySelector('#confirmButton').classList.replace('d-flex', 'd-none')
}
