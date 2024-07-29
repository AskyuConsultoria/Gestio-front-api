var listaComponenteExibido = []
var listaComponenteOcultado = []
var clienteId = ""

function renderizar(porcentagemCorpo, label){
    for(i = 0; i < listaComponenteExibido.length; i++){

        if(listaComponenteExibido[i].classList.contains('d-none')){
            listaComponenteExibido[i].classList.replace('d-none', 'd-flex')
        }

       }
    
       for(i = 0; i < listaComponenteOcultado.length; i++){
        
        if(listaComponenteOcultado[i].classList.contains('d-flex')){
            listaComponenteOcultado[i].classList.replace('d-flex', 'd-none')
        }
    
       }

       const pagina = document.querySelector('#body')
       pagina.style.height = porcentagemCorpo
       const labelPedido = document.querySelector('#label-pedido')
       labelPedido.innerHTML = label
}

function escolherRenderizacao(renderizarEscolhaCliente, renderizarPagina){
   var paginaEscolhida = sessionStorage.getItem("PAGINA-PEDIDO")
   
   if(renderizarEscolhaCliente){
    paginaEscolhida = "associar-cliente"
   }

   if(renderizarPagina != undefined){
    paginaEscolhida = renderizarPagina
   }

   listaComponenteExibido = []
   listaComponenteOcultado = []
   var listaComponente = document.querySelectorAll('.componente')

   if(paginaEscolhida == "adicionar-pedido"){
    document.querySelector('.botao-confirmacao').id = "home.html"
    listaComponenteExibido.push(listaComponente[0], listaComponente[2], listaComponente[3]) 
    listaComponenteOcultado.push(listaComponente[1], listaComponente[4], listaComponente[5], listaComponente[6])

    if(clienteId != ""){
        listaComponenteExibido.shift()
        listaComponenteOcultado.shift()
        listaComponenteExibido.push(listaComponente[1])
        renderizar("130%", "Novo Pedido")
        return
    }
     renderizar("110%", "Novo Pedido")
   }

   if(paginaEscolhida == "consultar-pedido"){
    document.querySelector('.botao-confirmacao').id = "home.html"
    listaComponenteExibido.push(listaComponente[1], listaComponente[2], listaComponente[3]) 
    listaComponenteOcultado.push(listaComponente[0], listaComponente[4], listaComponente[5], listaComponente[6])
     buscarAgendamento()
     renderizar("130%", "Pedido")
    }

   if(paginaEscolhida == "associar-cliente"){
    document.querySelector('.botao-confirmacao').id = "adicionar-pedido"
    listaComponenteExibido.push(listaComponente[4], listaComponente[5], listaComponente[6]) 
    listaComponenteOcultado.push(listaComponente[0], listaComponente[1], listaComponente[2], listaComponente[3])
     renderizar("110%", "Novo Pedido")
   }
}

function fecharJanela(){
    var paginaParaIr = document.querySelector('.botao-confirmacao').id

    if(paginaParaIr == "home.html") window.location = paginaParaIr
    if(paginaParaIr == "adicionar-pedido") escolherRenderizacao(false, paginaParaIr)
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

      if(response.status == 204){
        return []
      }
  
      const dados = await response.json()
      console.log(dados)
      preencherDadosDePedidoCompleto(dados)
  
    } catch (error) {
  
      console.log(`Houve um erro: ${error}`)
    }
  
  }

  
function preencherDadosDePedidoCompleto(agendamento){
    document.querySelector('#input-nome').value = agendamento.cliente.nome
    document.querySelector('#input-sobrenome').value = agendamento.cliente.sobrenome 
    document.querySelector('#input-email').value = agendamento.cliente.email 

    document.querySelector('#input-data-inicio').value = agendamento.dataInicio
    document.querySelector('#input-data-fim').value = agendamento.dataFim 
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

      if(response.status == 204){
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


  function preencherCardsDeCliente(listaCliente){
    var boxCliente = document.querySelector("#conteudo-cliente")
    boxCliente.innerHTML = ""
    for(i = 0; i < listaCliente.length; i++){
        boxCliente.innerHTML +=
        `
        <div class="d-flex container px-3 col-12 py-2 flex-row w-100" style="height: 76px;" id="${listaCliente[i].id}" onclick="buscarClientePorId(this.id)">
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

      if(response.status == 204){
        return []
      }
  
      const dados = await response.json()
      console.log(dados)
      associarClienteACriacaoDePedido(novoClienteId, dados)
  
    } catch (error) {
  
      console.log(`Houve um erro: ${error}`)
    }
  
  }

  function associarClienteACriacaoDePedido(novoClienteId, cliente){
    clienteId = novoClienteId
    document.querySelector('#input-nome').value = cliente.nome
    document.querySelector('#input-sobrenome').value = cliente.sobrenome 
    document.querySelector('#input-email').value = cliente.email 
    escolherRenderizacao(false, "adicionar-pedido")
  }

  function validarEventoKeyboard(evento){
    if(evento.key == "Enter"){
        buscarClientesPorNome(document.querySelector("#input-cliente").value)
    }
  }