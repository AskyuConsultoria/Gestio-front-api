async function listarPecas(){
    const id = sessionStorage.getItem("id")

    const data = await fetch(`http://localhost:8080/pecas/${id}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

    const FormatedData = await data.json()

    console.log("Resposta: ", FormatedData)

    FormatedData.forEach(peca => {
        document.getElementById("peca").innerHTML += `
        <div class="container">
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
        
    });

}

async function listarPecasEditar(){
        const id = sessionStorage.getItem("id")

    const data = await fetch(`http://localhost:8080/pecas/${id}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

    const FormatedData = await data.json()

    console.log("Resposta: ", FormatedData)

    FormatedData.forEach(peca => {
        document.getElementById("peca").innerHTML += `<option value="${peca.id}">${peca.nome}</option>`
    });

    sessionStorage.setItem("data", FormatedData)
    
}

function descEditar(){
    var id = document.getElementById("peca").value
    var data = sessionStorage.getItem("data")

    document.getElementById("peca").value = data[id].descricao
}


async function cadastrarPeca(){

    const usuario = sessionStorage.getItem("id")
    const peca = document.getElementById("peca").value
    const descricao = document.getElementById("desc-default").value
    const id = 1

    const dados = {
        "nome": nome,
        "descricao": descricao 
    }

    const respostaCadastro = await fetch(`http://localhost:8080/pecas/${usuario}/${id}`, {
    method: "POST" ,
    body: JSON.stringify(dados),
    headers: {"Content-type": "application/json; charset=UTF-8"},
})

    if(respostaCadastro.status == 201){
       window.location.href="./Lista-peca.html"
    } else{
        alert("Ocorreu um erro ao cadastrar a peça")
    }
    
}

function irPara(id){
    sessionStorage.setItem("idPeca", id)
    window.location.href="./Lista-medida.html"
}