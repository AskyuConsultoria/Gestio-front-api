import * as apiContato from "../../cadastro-contato.js"
import * as apiPedido from "../pedido/api.js"
import * as pedido from "../pedido/pedido.js"
import { escolherRenderizacao } from "../cliente/motorGrafico.js"

async function salvarContato(){
    var listaDeResponse = []
    var clienteId = sessionStorage.getItem("CLIENTE-ID")

    if(clienteId == null){
        listaDeResponse.push(await apiContato.cadastrarContato()) 
    } else {
        listaDeResponse.push(await apiPedido.atualizarDadosCliente())  
    }

    if (listaDeResponse.length == 0 ) {
        construirModalGenerico("statusButton", "Nenhum dado foi modificado, atualize um dado para salvar.")
        return
      }

   pedido.validarRetornoEExibirModalDeStatus(listaDeResponse)

   if(listaDeResponse[0] == 200){
    sessionStorage.setItem("PAGINA-CONTATO", "consultar-contato")
    escolherRenderizacao()
   }

}



 
function preencherDadosCliente(cliente){
    document.querySelector('#input-nome').value = cliente.nome
    document.querySelector('#input-sobrenome').value = cliente.sobrenome
    document.querySelector('#input-email').value = cliente.email
    sessionStorage.setItem("CLIENTE-ID", cliente.id)
}


export {
    salvarContato,
    preencherDadosCliente
}