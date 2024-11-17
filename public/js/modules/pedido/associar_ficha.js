async function buscarPedidosPorAgendamentoId(){
    const usuarioId = sessionStorage.getItem('id')
    const agendamentoId = sessionStorage.getItem('AGENDAMENTO-ID')

    try{
        const reponse = await fetch(`http://localhost:8080/pedido/buscar-por-agendamento/${usuarioId}/${agendamentoId}`, {
            method: "GET",
        });

        const dados = await reponse.json()

        if(dados.length == 0){
            return []
        }

        console.log(dados)
    
        preencherCardsPedido(dados)
    }
    catch(error){
        console.log("Ocorreu um erro: " + error)
    }
}


function preencherCardsPedido(listaPedido){
    const conteudoPedido = document.querySelector('#conteudo-pedido')
    conteudoPedido.innerHTML = ""
    for(var i = 0; i < listaPedido.length; i++){
        conteudoPedido.innerHTML += `<div class="d-flex container px-3 col-12 py-2 flex-row w-100">
        <div class="consultar-pedido d-flex flex-row w-100 rounded shadow-sm" style="background-color: #012171;" id="${listaPedido[i].itemPedido.id}" data-peca-id="${listaPedido[i].itemPedido.peca.id}" onclick="salvarDadosETransferirParaOutraPagina(this.id, this.dataset.pecaId)">
       
          <div class="d-flex flex-column h-100 rounded align-items-center justify-content-center" style="width: 90%; background-color: #012171;">
    
            <div class="d-flex flex-row w-100 justify-content-between h-75 align-items-center ps-3 pb-3 pt-3">
              <span class="text-white">${listaPedido[i].itemPedido.cliente.nome} ${listaPedido[i].itemPedido.cliente.sobrenome} - ${listaPedido[i].itemPedido.peca.nome}</span>
              <svg onclick="construirModalGenerico('actionButton', 'excluirPedidoPorId(event, ${listaPedido[i].id})', 'modalGenerico.hide()', 'Você quer descartar este pedido?'); event.stopPropagation();" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </div>
  
          </div>
    
        </div>
    </div>`
    }    
}


async function excluirPedidoPorId(evento, pedidoId){
    const usuarioId = sessionStorage.getItem("id")
    try{
        const response = await fetch(`http://localhost:8080/pedido/${usuarioId}/${pedidoId}`, {
            method: "DELETE"
        })


        console.log(response)
        if(response.ok){
            construirModalGenerico("statusButton", "modalGenerico.hide()", null, "Pedido descartado com sucesso.")
        }
        buscarPedidosPorAgendamentoId()
        return response.status

    } catch(error){
        alert(`Ocorreu um erro: ${error.message}`)
        console.log(error)
    }
}


function removerCacheFicha(){
    sessionStorage.removeItem("ITEM-PEDIDO-ID")
    sessionStorage.removeItem("FICHA-ID")
}

function salvarDadosETransferirParaOutraPagina(fichaId, pecaId){
    sessionStorage.removeItem("CADASTRO-PEDIDO")
    sessionStorage.setItem("E-VISUALIZACAO-FICHA", true)
    sessionStorage.setItem("FICHA-ID", fichaId)
    sessionStorage.setItem("PECA-ID", pecaId)
    window.location.assign("http://localhost:3333/fichas/vincular_medidas.html")
}


buscarPedidosPorAgendamentoId()


function construirModalGenerico(elementoId, primeiraFuncao, segundaFuncao, textoModal) {
    var elementoBody = document.querySelector("#body-modal-generico")
    var elementoFooter = document.querySelector("#footer-modal-generico")
  
    elementoFooter.innerHTML = ""
  
    if (elementoId == "statusButton") {
      elementoFooter.innerHTML =
        `
       <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick=${primeiraFuncao} style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </button>
      `
      modalGenerico.show()
    }
  
    if (elementoId == "actionButton") {
      elementoFooter.innerHTML = `
  
      <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="${primeiraFuncao}"  style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </button>
  
      <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="${segundaFuncao}" style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
      `
  
      modalGenerico.show()
    }

    elementoBody.innerText = textoModal
}
