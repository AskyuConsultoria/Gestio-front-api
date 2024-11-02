async function listarPecas(){
    const id = sessionStorage.getItem("id")

    const data = await fetch(`http://localhost:8080/pecas/${id}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }
    
    console.log(data)
    const FormatedData = await data.json()

    console.log("Resposta: ", FormatedData)

    FormatedData.forEach(peca => {
        document.getElementById("container").innerHTML += `
            <div class="peca-card card mb-2 mx-auto position-relative">
            <a onclick="irPara(${peca.id})">
                <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                    <div class="d-flex flex-row align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                        <div class="imagem-container">
                            <img src="./assets/tesoura.svg" alt="icone-tesoura" class="imagem1">
                            <img src="./assets/tesoura-hover.svg" alt="icone-tesoura" class="imagem2">
                        </div>
                        <h5 class="peca-nome card-title mb-0 ms-2">${peca.nome}</h5>
                        </div>
                    </div>
                    <div class="card-text mt-2">
                        <small class="descricao">${peca.descricao}</small>
                    </div>
                    </div>
                </div>
                </div>
                <div class="container-right mt-4" data-bs-toggle="tooltip" data-bs-placement="top" title="Para visualizar as medidas da peça clique aqui">
                <div class="seta-container">
                    <img src="./assets/next 3.svg" alt="seta visualizar medida da peça" class="seta1">
                    <img src="./assets/proximo 1.svg" alt="seta visualizar medida da peça" class="seta2">
                </div>
                </div>
            </a>
        </div>
        `

        document.getElementById("peca").innerHTML += `<option value="${peca.id}">${peca.nome}</option>`
        
    });

    descEditar()

}

async function listarMedidas(){
    const usuario = sessionStorage.getItem("id")
    const idPeca = sessionStorage.getItem("idPeca")

    const data1 = await fetch(`http://localhost:8080/pecas/${usuario}/${idPeca}`);
        if (!data1.ok) {
        throw new Error('Erro ' + data1.statusText);
        }

    const FormatedData1 = await data1.json()

    console.log(FormatedData1)

    document.getElementById("peca_bread_road").innerHTML = (FormatedData1.nome).toUpperCase()
    document.getElementById("titulo").innerHTML = (FormatedData1.nome).toUpperCase()

    const data = await fetch(`http://localhost:8080/nomes-medidas/${usuario}/${idPeca}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

const FormatedData = await data.json()

console.log("Resposta: ", FormatedData)

FormatedData.forEach(medida => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%;">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2">${medida.nome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <img src="./assets/lixeira.svg" alt="lixeira exclusão" class="lixeira btn btn-danger"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarMedida(${medida.id})">
            </div>
        </div>`
});

}

async function descEditar(){
    var id = document.getElementById("peca").value

    const usuario = sessionStorage.getItem("id")
    const idPeca = sessionStorage.getItem("idPeca")

    const data = await fetch(`http://localhost:8080/pecas/${usuario}/${id}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
    }

    const formatedData = await data.json()

    console.log("Resposta: ", formatedData)

    document.getElementById("desc-default").value = formatedData.descricao
}


async function editarPeca(){

    const usuario = sessionStorage.getItem("id")
    const descricao = document.getElementById("desc-default").value
    const select = document.getElementById("peca")
    var indice = select.selectedIndex;
    const nome = select.options[indice].text;
    const idPeca = select.value

    const dados = {
        "nome": nome,
        "descricao": descricao,
        "usuario": usuario 
    }

    const respostaCadastro = await fetch(`http://localhost:8080/pecas/${usuario}/${idPeca}`, {
    method: "PUT" ,
    body: JSON.stringify(dados),
    headers: {"Content-type": "application/json; charset=UTF-8"},
})

    if(respostaCadastro.status == 200){
       window.location.href="./Lista-peca.html"
    } else{
        alert("Ocorreu um erro ao cadastrar a peça")
    }
    
}

function irPara(id){
    sessionStorage.setItem("idPeca", id)
    window.location.href="./Lista-medida.html"
}

async function deletarPeca(){

    const idPeca = sessionStorage.getItem("idPeca")
    const usuario = sessionStorage.getItem("id")


    const respostaCadastro = await fetch(`http://localhost:8080/pecas/${usuario}/${idPeca}`, {
    method: "DELETE"
})

    if(respostaCadastro.status == 200){
       window.location.href="./Lista-peca.html"
    } else{
        alert("Ocorreu um erro ao deletar a peça")
    }
    
}

async function deletarMedida(idMedida){

    const idPeca = sessionStorage.getItem("idPeca")
    const usuario = sessionStorage.getItem("id")


    const respostaMedida = await fetch(`http://localhost:8080/nomes-medidas/${usuario}/${idPeca}/${idMedida}`, {
    method: "DELETE",
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
    console.log(respostaMedida)
    if(respostaMedida.status == 200){
       window.location.href="./Lista-medida.html"
    } else{
        alert("Ocorreu um erro ao deletar a peça")
    }
    
}
