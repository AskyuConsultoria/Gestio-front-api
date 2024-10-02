

async function buscarUltimos7Pedidos(idUsuario) {

  try {
    const response = await fetch(`http://10.18.34.59:8080/agendamento/${idUsuario}/ultimos`, {
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


buscarUltimos7Pedidos(1)
adicionarNomeDeUsuario()