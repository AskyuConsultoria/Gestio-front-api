

async function buscarUltimos7Pedidos(idUsuario) {

  try {
    const response = await fetch(`http://localhost:8080/agendamento/${idUsuario}/ultimos`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Erro de servidor, status: ${response.status}`);
    }

    const dados = await response.json()
    console.log(dados)
    criarPedidos(dados)

  } catch (error) {

    console.log(`Houve um erro: ${error}`)
  }

}

async function buscarAgendamentoPorClienteNome(nomeCliente){
  const usuarioId = sessionStorage.getItem('id')
  try{
    const response = await fetch(`http://localhost:8080/agendamento/filtro-cliente-nome/${usuarioId}?nome=${nomeCliente}`, {
      method: "GET"
    });

    const dados = await response.json()
    console.log(dados)

    criarPedidos(dados)

  } catch(error){
    console.log(`Houve um erro: ${error.message}`)
  }
}

async function buscarAgendamentoPorClienteEmail(email){
  const usuarioId = sessionStorage.getItem('id')

  try{
    const response = await fetch(`http://localhost:8080/agendamento/filtro-cliente-email/${usuarioId}?email=${email}`, {
      method: "GET"
    });

    const dados = await response.json()
    console.log(dados)

    criarPedidos(dados)

  } catch(error){
    console.log(`Houve um erro: ${error.message}`)
  }
}

async function buscarAgendamentoPorPeca(nome){
  const usuarioId = sessionStorage.getItem('id')

  try{
    const response = await fetch(`http://localhost:8080/pedido-view-agendamento/por-peca/${usuarioId}?nome=${nome}`, {
      method: "GET"
    });

    const dados = await response.json()
    console.log(dados)

    criarPedidosPorView(dados)

  } catch(error){
    console.log(`Houve um erro: ${error.message}`)
  }
}

async function buscarAgendamentoPorTecido(nome){
  const usuarioId = sessionStorage.getItem('id')

  try{
    const response = await fetch(`http://localhost:8080/pedido-view-agendamento/por-tecido/${usuarioId}?nome=${nome}`, {
      method: "GET"
    });

    const dados = await response.json()
    console.log(dados)

    criarPedidosPorView(dados)

  } catch(error){
    console.log(`Houve um erro: ${error.message}`)
  }
}



var pesquisarPorClienteNome = true
var pesquisarPorClienteEmail = false
var pesquisarPorPeca = false
var pesquisarPorTecido = false

const listaDeFiltros = [pesquisarPorClienteNome, pesquisarPorClienteEmail, pesquisarPorPeca, pesquisarPorTecido]

function ativarFiltro(elemento){
  const listaDeDropDown = document.querySelectorAll('.dropdown-item')

  listaDeFiltros.forEach(filtro => filtro = false)
  listaDeDropDown.forEach(elemento => {
    if(elemento.classList.contains('active')) elemento.classList.remove('active')
  })

  elemento.classList.add('active')

  if(elemento.id == "clienteNome") pesquisarPorClienteNome = true 
  if(elemento.id == "clienteEmail") pesquisarPorClienteEmail = true 
  if(elemento.id == "peca") pesquisarPorPeca = true 
  if(elemento.id == "tecido") pesquisarPorTecido = true
}

function realizarPesquisa(input){
  if(input.value.length == 0){
    exibirComponentes()
    buscarUltimos7Pedidos(sessionStorage.getItem('id'))
  } 

  if(input.value.length >= 2){
    if(pesquisarPorClienteNome) buscarAgendamentoPorClienteNome(input.value)
    if(pesquisarPorClienteEmail) buscarAgendamentoPorClienteEmail(input.value)
    if(pesquisarPorPeca) buscarAgendamentoPorPeca(input.value)
    if(pesquisarPorTecido) buscarAgendamentoPorTecido(input.value)
    ocultarComponentes()  
  } 
    
}

function ocultarComponentes(){
  var componentesPagina = document.querySelectorAll('.componente')
  for(var i = 0; i < componentesPagina.length; i++){
    if(!componentesPagina[i].classList.contains("d-none")){
      componentesPagina[i].classList.add("d-none")
    }
  }
}

function exibirComponentes(){
  var componentesPagina = document.querySelectorAll(".componente")
  for(var i = 0; i < componentesPagina.length; i++){
    if(componentesPagina[i].classList.contains("d-none")){
      componentesPagina[i].classList.remove("d-none")
    } 
  }
}

function criarPedidos(listaPedido) {
  const elementoContainer = document.querySelector("#pedidos-conteudo")
  elementoContainer.innerHTML = ""
  formatarData(listaPedido[0].dataInicio)

  for (var i = 0; i < listaPedido.length; i++) {
    elementoContainer.innerHTML += `<div class="d-flex container px-3 col-12 py-2 flex-row w-100">
      <div class="consultar-pedido d-flex flex-row w-100 bg-body rounded shadow-sm" id="${listaPedido[i].dataInicio}" onclick="salvarDadosETransferirParaOutraPagina('consultar-pedido',${listaPedido[i].id})">
        <div class="d-flex h-100 w-15 rounded rounded-end-0" style="width: 2rem; background-color: #F4D176;"></div>
  
        <div class="d-flex flex-column h-100 bg-body align-items-center justify-content-center" style="width: 85%;">
  
          <div class="d-flex w-100 h-75 align-items-center ps-3 fw-medium">
            ${listaPedido[i].cliente.nome} ${listaPedido[i].cliente.sobrenome}
          </div>
  
          <div class="d-flex w-100 h-25 align-items-center ps-3 pt-1 pb-4">
            ${formatarData(listaPedido[i].dataInicio)} das ${formatarHorario(listaPedido[i].dataInicio)} - ${formatarHorario(listaPedido[i].dataFim)}
          </div>
  
        </div>
  
      </div>
     </div>`

  }

}

function criarPedidosPorView(listaPedido){
  const elementoContainer = document.querySelector("#pedidos-conteudo")
  elementoContainer.innerHTML = ""
  formatarData(listaPedido[0].dataInicio)

  for (var i = 0; i < listaPedido.length; i++) {
    elementoContainer.innerHTML += `<div class="d-flex container px-3 col-12 py-2 flex-row w-100">
      <div class="consultar-pedido d-flex flex-row w-100 bg-body rounded shadow-sm" id="${listaPedido[i].dataInicio}" onclick="salvarDadosETransferirParaOutraPagina('consultar-pedido',${listaPedido[i].id})">
        <div class="d-flex h-100 w-15 rounded rounded-end-0" style="width: 2rem; background-color: #F4D176;"></div>
  
        <div class="d-flex flex-column h-100 bg-body align-items-center justify-content-center" style="width: 85%;">
  
          <div class="d-flex w-100 h-75 align-items-center ps-3 fw-medium">
            ${listaPedido[i].nome} ${listaPedido[i].sobrenome}
          </div>
  
          <div class="d-flex w-100 h-25 align-items-center ps-3 pt-1 pb-4">
            ${formatarData(listaPedido[i].dataInicio)} das ${formatarHorario(listaPedido[i].dataInicio)} - ${formatarHorario(listaPedido[i].dataFim)}
          </div>
  
        </div>
  
      </div>
     </div>`
}
}

function formatarData(data) {
  var dia = new Date(data).getDate()
  var mes = new Date(data).getMonth() + 1
  var ano = new Date(data).getFullYear()

  return `${dia}/${mes}/${ano}`
}

function formatarHorario(data) {
  horas = new Date(data).getHours()

  var horarioFormatado = ""
  if (horas <= 9) {
    horarioFormatado = `0${horas}h`
  }

  horarioFormatado = `${horas}h`
  return horarioFormatado
}

function adicionarNomeDeUsuario() {
  var containerNomeUsuario = document.querySelector("#nome-usuario")
  const nomeUsuario = sessionStorage.getItem("usuario")
  containerNomeUsuario.textContent = nomeUsuario
}

function salvarDadosETransferirParaOutraPagina(classe, agendamentoId, dataPedido){

  if(typeof classe != 'string'){
    classe = classe[0]
  }
  
  sessionStorage.removeItem("PAGINA-PEDIDO")
  sessionStorage.removeItem("AGENDAMENTO-ID")
  sessionStorage.setItem("DATA-AGENDAMENTO", dataPedido)

  if(classe == "adicionar-pedido" || "consultar-pedido" && dataPedido != undefined){
    sessionStorage.setItem("DATA-AGENDAMENTO", dataPedido)
  }

  if(classe == "adicionar-pedido"){
    sessionStorage.setItem("PAGINA-PEDIDO", "adicionar-pedido")
  }

  if(classe == "consultar-pedido"){
    sessionStorage.setItem("PAGINA-PEDIDO", "consultar-pedido")
    sessionStorage.setItem("DATA-AGENDAMENTO", dataPedido)
    sessionStorage.setItem("AGENDAMENTO-ID", agendamentoId)
  }

  window.location = "pedido.html"
}


buscarUltimos7Pedidos(sessionStorage.getItem('id'))
adicionarNomeDeUsuario()