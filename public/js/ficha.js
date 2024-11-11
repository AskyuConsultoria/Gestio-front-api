var lista = []
var cliente = []

// integrar como backend
// function listarFichas(){
//     console.log('listar')
//     document.getElementById('main')
//     main.innerHTML += `
//         <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
//         <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
//         <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
//         <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
//         <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
//     `
// }

async function deletarFicha(evento, fichaId){
    const usuarioId = sessionStorage.getItem("id")
    const botao = document.getElementById(fichaId)
    botao.remove()
    evento.stopPropagation();

    try{
        var response = await fetch(`http://localhost:8080/itens-pedidos/${usuarioId}/${fichaId}`, {
            method: "DELETE"
        })

        console.log(response)
        return response.status
        
    } catch (error) {
        console.log("Ocorreu um erro:")
        console.log(error)
    }
}


function botaoPeca() {
    if (document.getElementById('lista').style.display == 'none') {
        document.getElementById('lista').style.display = 'block'
    } else {
        document.getElementById('lista').style.display = 'none'
    }
}
function botaoTecido() {
    if (document.getElementById('lista2').style.display == 'none') {
        document.getElementById('lista2').style.display = 'block'
    } else {
        document.getElementById('lista2').style.display = 'none'
    }
}

//Integrar com o backend
async function listarBotaoPeca() {
    const idUsuario = sessionStorage.getItem('id')
    const data = await fetch(`http://localhost:8080/pecas/${idUsuario}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
    }
    const dataFormated = await data.json()
    console.log("Resposta: ", dataFormated)
    
    dataFormated.forEach( peca => {
        document.getElementById('itens').innerHTML += `<li><input id="item${peca.id}" type="checkbox" onclick="mudar('${peca.nome}')">${peca.nome}</li>`
    })
 }

 function listarBotaoTecido() {
     const tecidos = document.getElementById('tecidos')
     tecidos.innerHTML += `
            <li><input type="checkbox" id="tecido" onclick="mudar2('brasil')">brasil</li>
            <li><input type="checkbox" id="tecido" onclick="mudar2('argentina')">argentina</li>
            <li><input type="checkbox" id="tecido" onclick="mudar2('italia')">italia</li>
             `
 }

//Arrumar recebmento de ID para ir para a proxima pagina
function mudarPeca(texto) {
    document.getElementById('inputPeca').innerHTML = texto
    document.getElementById('inputPeca').value = 1
    if (document.getElementById('lista').style.display == 'block') {
        document.getElementById('lista').style.display = 'none'
    } else {
        document.getElementById('lista').style.display = 'block'
    }
}
function mudarTecido(texto2) {
    document.getElementById('inputTecido').innerHTML = texto2
    document.getElementById('inputTecido').value = 2
    if (document.getElementById('lista2').style.display == 'block') {
        document.getElementById('lista2').style.display = 'none'
    } else {
        document.getElementById('lista2').style.display = 'block'
    }
}

// Conectar com o backEnd
async function listarFichas(){
    const idUsuario = sessionStorage.getItem('id')
    const data = await fetch(`http://localhost:8080/itens-pedidos/${idUsuario}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

const dataFormated = await data.json()

console.log("Resposta: ", dataFormated)

lista = dataFormated

lista.forEach(itemPedido => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" id="${itemPedido.id}" onclick="irVisualizarFicha(this)" style="max-width: 92%; background-color: #012171; color: white">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body" id="${itemPedido.id}" onclick="IrVisualizarFicha(this)">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2 fs-5"> ${itemPedido.peca.nome} ♢ ${itemPedido.cliente.nome} ${itemPedido.cliente.sobrenome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <img src="../assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarFicha(event, ${itemPedido.id})">
            </div>
        </div>`
});

}

async function criarPedido(){
    const novoitemPedido = await buscarItemPedido()
    const agendamentoConsultado = await buscarAgendamento()

    try{
        const response = await fetch("http://localhost:8080/pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemPedido: novoitemPedido.id,
                agendamento: agendamentoConsultado.id,
                usuario: novoitemPedido.usuario.id,
                etapa: agendamentoConsultado.etapa.id,
                cliente: agendamentoConsultado.cliente.id,
            })
        })


        const dados = await response.json()
        console.log(dados)
        return dados

    } catch(error){
        console.log("Ocorreu um erro: ")
        console.log(error)
    }
    
}

async function buscarItemPedido(){
    const usuarioId = sessionStorage.getItem("id")
    const itemPedidoId = sessionStorage.getItem("ITEM-PEDIDO-ID")

    try{
        const response =  await fetch(`http://localhost:8080/itens-pedidos/${usuarioId}/${itemPedidoId}/buscar-um`, {
            method: "GET"
        })

        const dados = await response.json()
        console.log(dados)
        return dados

    } catch(error){
        console.log("Ocorreu um erro:")
        console.log(error)
    }
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
        return dados

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }

}


async function validarAssociacaoPedido(itemPedidoId) {
    if(!sessionStorage.getItem("CADASTRO-PEDIDO")) return
    sessionStorage.setItem("ITEM-PEDIDO-ID", itemPedidoId)
    var pedido = await criarPedido()
    sessionStorage.setItem("PECA-ID", pedido.itemPedido.peca.id)
    console.log(pedido)
    location.assign("http://localhost:3333/associar-ficha.html")
}


async function IrVisualizarFicha(elFicha){
    if(sessionStorage.getItem("CADASTRO-PEDIDO")){
        validarAssociacaoPedido(elFicha.id)
    } else {
        sessionStorage.setItem("E-VISUALIZACAO-FICHA", true)
        await associarValoresFicha(elFicha.id)
        location.assign("http://localhost:3333/fichas/vincular_medidas.html")
    }
    
}




function buscaAvançada(texto){
    var listaFiltrada = lista.filter(ficha => ficha.cliente.nome.toLowerCase().includes((texto).toLowerCase()));

    document.getElementById("container").innerHTML = ``
    listaFiltrada.forEach(itemPedido => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white">
            <a onclick="irPara(${itemPedido.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2 fs-5"> ${itemPedido.peca.nome} ♢ ${itemPedido.cliente.nome} ${itemPedido.cliente.sobrenome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <div class="container-right">
                <img src="../assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarFicha(${itemPedido.id})">
            </div>
        </div>`
})}


function buscaAvançadaCliente(texto){
    var listaFiltrada = cliente.filter(cliente => cliente.nome.toLowerCase().includes(texto.toLowerCase()));
    
    document.getElementById("container").innerHTML = ``
    listaFiltrada.forEach(cliente => {
        document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white;">
            <a onclick="irParaPecaTecido(${cliente.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body" onclick="IrVisualizarFicha()">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div id="textoDoCliente${cliente.id}" class="d-flex" style="display: flex; flex-direction: column">
                                <span class="medidas card-title mt-2" style=" width:100%">${cliente.nome} ${cliente.sobrenome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <div class="container-right">
            </div>
        </div>`

        if(cliente.responsavel != null){
            document.getElementById(`textoDoCliente${cliente.id}`).innerHTML+= `<span class="medidas card-title mt-2" style="font-size: 0.5rem; width:100%"> Dependente de: ${cliente.responsavel.nome}</span>`
        }
})}

// integrar com o backend
async function listarClientes(){
    
    const idUsuario = sessionStorage.getItem('id')
    const data = await fetch(`http://localhost:8080/clientes/${idUsuario}`, {
        method: 'GET'
    });
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText, data.message);
        }

const formatedData = await data.json()

console.log("Resposta: ", formatedData)

cliente = formatedData

cliente.forEach(cliente => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white;">
            <a onclick="irParaPecaTecido(${cliente.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div id="textoDoCliente${cliente.id}" class="d-flex" style="display: flex; flex-direction: column">
                                <span class="medidas card-title mt-2" style=" width:100%">${cliente.nome} ${cliente.sobrenome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <div class="container-right">
            </div>
        </div>`

        if(cliente.responsavel != null){
            document.getElementById(`textoDoCliente${cliente.id}`).innerHTML+= `<span class="medidas card-title mt-2" style="font-size: 0.5rem; width:100%"> Dependente de: ${cliente.responsavel.nome}</span>`
        }

    });
}

function irParaPecaTecido(clienteId){
    sessionStorage.setItem("CLIENTE-ID", clienteId);
    window.location.href="../fichas/peca_tecido.html"
}

// redirecionamento
function irPara(fichaId){
    sessionStorage.setItem("FICHA-ID", fichaId)
    window.location.href="#"
}

// configurar oque vai passar para oq antes de proceguir
function irParaFinal(peca, tecido){
    sessionStorage.setItem("Peca", JSON.stringify(peca))
    sessionStorage.setItem("Tecido", JSON.stringify(tecido))
    window.location.href="#"
}

// configurar o obter dados do cliente
async function buscarDadosCliente(){
    var idCliente = sessionStorage.getItem("CLIENTE-ID")

    const data = await fetch( `http://localhost:8080/clientes/${idCliente}/buscarUm`);
    if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
    }

    var cliente = await data.json()

    document.getElementById("nomeCliente").innerHTML = cliente.nome
    if(cliente.responsavel != null){
        document.getElementById("clienteInfo").innerHTML += `<h6 style="padding: none; font-weight:200">Dependente de <span>${cliente.responsavel.nome}</span></h6>`
    }

}


async function associarValoresFicha(itemPedidoId){
  var itemPedido = await buscarDadosFicha(itemPedidoId)
  sessionStorage.setItem('FICHA-ID', itemPedido.id)
  sessionStorage.setItem('PECA-ID', itemPedido.peca.id)
  sessionStorage.setItem('CLIENTE-ID', itemPedido.cliente.id)
}

async function buscarDadosFicha(itemPedidoId){
    const usuarioId = sessionStorage.getItem('id')

    try{
        var response = await fetch(`http://localhost:8080/itens-pedidos/${usuarioId}/${itemPedidoId}/buscar-um`, {
            method: "GET"
        })

        var dados = await response.json()
        console.log(dados)
        return dados

    } catch(error) {
        console.log("Ocorreu um erro: ")
        console.log(error)
    }
    
}







