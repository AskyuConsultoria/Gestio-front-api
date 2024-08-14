var listaComponenteExibido = []
var listaComponenteOcultado = []

var clienteId = ""
var telefoneId = ""
var agendamentoId = ""
var enderecoId = ""


var inputAntigoNome = ""
var inputAntigoSobrenome = ""
var inputAntigoTelefone = ""
var inputAntigoEmail = ""

var inputAntigoDataInicioPedido = ""
var inputAntigoDataFimPedido = ""

var inputAntigoCep = ""
var inputAntigoRua = ""
var inputAntigoBairro = ""
var inputAntigoCidade = ""
var inputAntigoUf = ""

var inputNovoNome = ""
var inputNovoSobrenome = ""
var inputNovoTelefone = ""
var inputNovoEmail = ""

var inputNovoDataInicioPedido = ""
var inputNovoDataFimPedido = ""

var inputNovoCep = ""
var inputNovoRua = ""
var inputNovoBairro = ""
var inputNovoCidade = ""
var inputNovoUf = ""

var salvarCliente = false
var salvarPedido = false
var salvarEndereco = false
var salvarTelefone = false


function renderizar(porcentagemCorpo, label) {
  for (i = 0; i < listaComponenteExibido.length; i++) {

    if (listaComponenteExibido[i].classList.contains('d-none')) {
      listaComponenteExibido[i].classList.replace('d-none', 'd-flex')
    }

  }

  for (i = 0; i < listaComponenteOcultado.length; i++) {

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
    buscarAgendamento()
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
  if(houveMudancaDeDados()){
    construirModalGenerico("closeButton")
    return
  }  

  if (paginaParaIr == "home.html"){
     sessionStorage.setItem("EXIBICAO-MODAL", true)
     window.location = paginaParaIr
  }
  
  if (paginaParaIr == "adicionar-pedido") escolherRenderizacao(false, paginaParaIr)
}

function houveMudancaDeDados(){
  if(salvarPedido || salvarCliente || salvarEndereco || salvarTelefone) return true 
  else return false
}


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
    console.log(dados)
    preencherDadosDePedidoCompleto(dados)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}


async function preencherDadosDePedidoCompleto(agendamento) {
  agendamentoId = agendamento.id
  var clienteId = agendamento.cliente.id
  document.querySelector('#input-data-inicio').value = agendamento.dataInicio
  document.querySelector('#input-data-fim').value = agendamento.dataFim

  inputAntigoDataInicioPedido = agendamento.dataInicio
  inputAntigoDataFimPedido = agendamento.dataFim

  buscarClienteView(clienteId)
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
    preencherDadosCliente(dados)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}

function preencherDadosCliente(cliente) {
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

  escolherRenderizacao(false, "adicionar-pedido")
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
    preencherCardsDeCliente(dados)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}




function preencherCardsDeCliente(listaCliente) {
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
    associarClienteACriacaoDePedido(novoClienteId, dados)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}

function associarClienteACriacaoDePedido(novoClienteId, cliente) {
  clienteId = novoClienteId
  document.querySelector('#input-nome').value = cliente.nome
  document.querySelector('#input-sobrenome').value = cliente.sobrenome
  document.querySelector('#input-email').value = cliente.email
  sessionStorage.removeItem("AGENDAMENTO-ID")
  escolherRenderizacao(false, "adicionar-pedido")
}


function verificarDadosEExibirBotaoDeConfirmacao(idInput, dadoAntigo) {
  var inputElemento = document.querySelector(`#${idInput}`)
  var dadoNovo = inputElemento.value

  if (dadoNovo != dadoAntigo) document.querySelector('#confirmButton').classList.replace("d-none", "d-flex")
  if (inputElemento.classList.contains("cliente")) salvarCliente = true
  if (inputElemento.classList.contains("telefone")) salvarTelefone = true
  if (inputElemento.classList.contains("endereco")) salvarEndereco = true
  if (inputElemento.classList.contains("pedido")) salvarPedido = true
}

function salvarModificacao() {
  var agendamentoId = sessionStorage.getItem("AGENDAMENTO-ID")
  if (salvarCliente) atualizarDadosCliente(clienteId)
  // if (salvarTelefone) atualizarDadosTelefone(telefoneId)
  // if (salvarEndereco) atualizarDadosEndereco(enderecoId)

  if (salvarPedido && agendamentoId == null) {
    criarPedido(agendamentoId)
  } else if (salvarPedido) atualizarDadosPedido(agendamentoId)
}

async function atualizarDadosCliente(clienteId) {
  var usuarioId = sessionStorage.getItem("id")

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
        email: document.querySelector('#input-sobrenome').value
      })
    });

    const dados = await response.json()
    console.log(dados)

   await exibirStatusDaRespostaAPI(response)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }
}

async function atualizarDadosPedido(agendamentoId) {
  var usuarioId = parseInt(sessionStorage.getItem("id"))

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
          id: 1
        }
      })
    });

    const dados = await response.json()
    console.log(dados)

   await exibirStatusDaRespostaAPI(response.status)

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
        usuario: usuarioId,
        cliente: clienteId,
        etapa: 1
      })
    });

    const dados = await response.json()
    console.log(dados)

    await exibirStatusDaRespostaAPI(response.status)


  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}


function validarEventoKeyboard(evento) {
  if (evento.key == "Enter") {
    buscarClientesPorNome(document.querySelector("#input-cliente").value)
  }
}

const modalGenerico = new bootstrap.Modal(document.getElementById('modal-generico'))

function construirModalGenerico(elementoId, status){
  var textoModal = ""
  var elementoBody = document.querySelector("#body-modal-generico")
  var elementoFooter = document.querySelector("#footer-modal-generico")

  elementoFooter.innerHTML = ""

  if(elementoId == "statusButton"){
    elementoFooter.innerHTML =
    `
     <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>
    `
    textoModal = status
    modalGenerico.show()
  }
  
  if(elementoId == "confirmButton"){
    elementoFooter.innerHTML = `

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="salvarModificacao()"  style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </button>

    <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button>
    ` 

    textoModal = "Deseja salvar as alterações no pedido?"
    modalGenerico.show()
  }

  if(elementoId == "closeButton"){
   elementoFooter.innerHTML = `
   <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="salvarModificacao()"  style="background-color: #012171;">
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

function dadosForamAtualizados(){
  salvarCliente = false
  salvarPedido = false
  salvarEndereco = false
  salvarEndereco = false
  salvarTelefone = false
}

async function exibirStatusDaRespostaAPI(response){
  var status = "Alterações salvas com sucesso"
  if(response.status == 500 || response.status == 400 || response.status == 404) status = `Ocorreu um erro no servidor: ${response.status}.`
  dadosForamAtualizados() 
  modalGenerico.toggle()  
  construirModalGenerico("statusButton", status)
  esconderBotaoSalvar()
}

function esconderBotaoSalvar(){
  document.querySelector('#confirmButton').classList.replace('d-flex', 'd-none')
}

