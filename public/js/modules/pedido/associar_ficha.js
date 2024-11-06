async function buscarPedidosPorAgendamentoId(){
    const usuarioId = sessionStorage.getItem('id')
    const agendamentoId = sessionStorage.getItem('AGENDAMENTO-ID')

    try{
        const reponse = await fetch(`http://192.168.137.199:8080/pedido/buscar-por-agendamento/${usuarioId}/${agendamentoId}`, {
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
        <div class="consultar-pedido d-flex flex-row w-100 rounded shadow-sm" style="background-color: #012171;" id="2024-09-24T23:21:00" onclick="salvarDadosETransferirParaOutraPagina('consultar-pedido',189)">
       
          <div class="d-flex flex-column h-100 rounded align-items-center justify-content-center" style="width: 90%; background-color: #012171;">
    
            <div class="d-flex flex-row w-100 justify-content-between h-75 align-items-center ps-3 pb-3 pt-3">
              <span class="text-white">${listaPedido[i].cliente.nome} ${listaPedido[i].cliente.sobrenome} - ${listaPedido[i].itemPedido.peca.nome}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </div>
  
          </div>
    
        </div>
    </div>`
    }    
}


buscarPedidosPorAgendamentoId()
