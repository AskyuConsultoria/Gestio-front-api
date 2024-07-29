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

function criarPedidos(listaPedido) {
  const elementoContainer = document.querySelector("#pedidos-conteudo")
  elementoContainer.innerHTML = ""


  for (var i = 0; i < listaPedido.length; i++) {
    // vou ter que corrigir
    elementoContainer.innerHTML += `<div class="d-flex container px-3 col-12 py-2 flex-row w-100">
      <div class="consultar-pedido d-flex flex-row w-100 bg-body rounded shadow-sm" id="consultar-pedido" onclick="salvarDadosETransferirParaOutraPagina(this.id)">
        <div class="d-flex h-100 w-15 rounded rounded-end-0" style="width: 2rem; background-color: #F4D176;"></div>
  
        <div class="d-flex flex-column h-100 bg-body align-items-center justify-content-center" style="width: 85%;">
  
          <div class="d-flex w-100 h-75 align-items-center ps-3 fw-medium">
            ${listaPedido[i].cliente.nome} ${listaPedido[i].cliente.nome}
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
  dia = data.substring(8, 10)
  mes = new Date(data).getMonth()
  ano = new Date(data).getFullYear()

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

function salvarDadosETransferirParaOutraPagina(classe){

  if(typeof classe != 'string'){
    classe = classe[0]
  }
  
  sessionStorage.removeItem("PAGINA-PEDIDO")
 // sessionStorage.setItem("DATA-PEDIDO", dataPedido)

  if(classe == "adicionar-pedido"){
    sessionStorage.setItem("PAGINA-PEDIDO", "adicionar-pedido")
  }

  if(classe == "consultar-pedido"){
    sessionStorage.setItem("PAGINA-PEDIDO", "consultar-pedido")
  }

  window.location = "pedido.html"
}



buscarUltimos7Pedidos(1)
adicionarNomeDeUsuario()