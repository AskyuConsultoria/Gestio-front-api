var lista = []
var cliente = []

// integrar como backend
function listarFichas(){
    console.log('listar')
    document.getElementById('main')
    main.innerHTML += `
        <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
        <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
        <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
        <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
        <a href="" id="1">Calça &#9826 John Doe <button onclick="deletar()" style="background-color: #012171;"><img src="/imgs/button_trash_apagar.png" ></button></a>
    `
}

// integrar com o back
function deletarFicha(){
    console.log('deletar')
    const botao = document.getElementById('1')
    botao.remove()
    event.preventDefault();
    console.log('prevenido')
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
function listarBotaoPeca() {
     const itens = document.getElementById('itens')
     itens.innerHTML += `
            <li><input id="item" type="checkbox" onclick="mudar('blusa')">blusa</li>    
             `
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

function salvarPecaTecido() {
    sessionStorage.setItem('idPeca', document.getElementById('inputPeca').innerHTML)
    sessionStorage.setItem('idTecido', document.getElementById('inputTecido').innerHTML)
    window.location.href="../fichas/vincular_medidas.html"
}

// Conectar com o backEnd
async function listarFichas(){

//     const data = await fetch(``);
//         if (!data.ok) {
//         throw new Error('Erro ' + data.statusText);
//         }

// const lista = await data.json()

// console.log("Resposta: ", lista)

var teste = [
    {
        id: "1",
        nome: "palito"
    },
    {
        id: "2",
        nome: "terno"
    },
    {
        id: "3",
        nome: "calça"
    }
]

lista = teste

lista.forEach(ficha => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white">
            <a onclick="irPara(${ficha.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2">${ficha.nome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <div class="container-right">
                <img src="../assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarFicha(${ficha.id})">
            </div>
        </div>`
});



}

function buscaAvançada(texto){
    var listaFiltrada = lista.filter(ficha => ficha.nome.toLowerCase().includes(texto.toLowerCase()));

    document.getElementById("container").innerHTML = ``
    listaFiltrada.forEach(ficha => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white">
            <a onclick="irPara(${ficha.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2">${ficha.nome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <div class="container-right">
                <img src="../assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarFicha(${ficha.id})">
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
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div id="textoDoCliente${cliente.id}" class="d-flex" style="display: flex; flex-direction: column">
                                <span class="medidas card-title mt-2" style=" width:100%">${cliente.nome}</span>
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
function listarClientes(){
    
//     const data = await fetch(``);
//         if (!data.ok) {
//         throw new Error('Erro ' + data.statusText);
//         }

// const cliente = await data.json()

// console.log("Resposta: ", cliente)

var teste = [
    {
        id: "1",
        nome: "john doe",
        responsavel: {
            id: "2",
            nome: "jane doe"
        }
    },
    {
        id: "2",
        nome: "jane doe",
        responsavel: null
    },
    {
        id: "3",
        nome: "joão",
        responsavel: null
    }
]

cliente = teste

cliente.forEach(cliente => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white;">
            <a onclick="irParaPecaTecido(${cliente.id})">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div id="textoDoCliente${cliente.id}" class="d-flex" style="display: flex; flex-direction: column">
                                <span class="medidas card-title mt-2" style=" width:100%">${cliente.nome}</span>
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

function irParaPecaTecido(idCliente){
    sessionStorage.setItem("idCliente", idCliente);
    window.location.href="../fichas/peca_tecido.html"
}

// redirecionamento
function irPara(idFicha){
    sessionStorage.setItem("idFicha", idFicha)
    window.location.href="#"
}

// configurar oque vai passar para oq antes de proceguir
function irParaFinal(peca, tecido){
    sessionStorage.setItem("Peca", JSON.stringify(peca))
    sessionStorage.setItem("Tecido", JSON.stringify(tecido))
    window.location.href="#"
}

// configurar o obter dados do cliente
function buscarDadosCliente(){
    var idCliente = sessionStorage.getItem("idCliente")
    var idUsuario = sessionStorage.getItem("idUsuario")
    var cliente = {
        id: "1",
        nome: "John doe",
        responsavel: {
            id: "2",
            nome: "Jane doe"
        }
    }
    document.getElementById("nomeCliente").innerHTML = cliente.nome
    if(cliente.responsavel != null){
        document.getElementById("clienteInfo").innerHTML += `<h6 style="padding: none; font-weight:200">Dependente de <span>${cliente.responsavel.nome}</span></h6>`
    }
}

