async function listarPecas() {
    const usuario = sessionStorage.getItem("id");
    const resposta = await fetch(`http://10.0.1.226:8080/askyu/pecas/${usuario}`);
    
    if (resposta.ok) {
        const pecas = await resposta.json();
        const container = document.getElementById("container");
        container.innerHTML = ""; 

        console.log(pecas)

        for(var i = 0; i < pecas.length; i++){
            document.getElementById("container").innerHTML += `
            <div class="card mb-2 mx-auto w-100 position-relative" style="max-width: 92%; background-color: #012171; color: white">
                <div class="row g-0" onclick="irParaPeca(${pecas[i].id})">
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-flex flex-row align-items-center justify-content-between">
                                <div class="d-flex">
                                    <span class="medidas card-title mt-2">${pecas[i].nome}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-right">
                    <img src="./assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="" onclick="construirModalGenerico('actionButton', 'deletarPeca(${pecas[i].id})', 'modalGenerico.hide()', 'Você quer descartar esta peça?')">
                </div>
            </div>`
        }


    } else {
        alert("Erro ao listar peças.");
    }
}



async function cadastrarPeca() {
    const nome = document.getElementById("nome_nova_peca").value;
    const descricao = document.getElementById("descricao_nova_peca").value;
    const usuario = sessionStorage.getItem("id");

    const dadosPeca = {
        "nome": nome,
        "descricao": descricao,
        "usuario": usuario
    };

    console.log(dadosPeca)

    const respostaCadastro = await fetch(`http://10.0.1.226:8080/askyu/pecas/${usuario}`, {
        method: "POST",
        body: JSON.stringify(dadosPeca),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (respostaCadastro.status == 201) {
        await listarPecas(); 
        document.querySelector('.cadastro').classList.remove('subir'); 
        document.querySelector('.cadastro').classList.toggle('descer');
    } else {
        alert("Ocorreu um erro ao cadastrar a peça");
    }
}

async function deletarPeca(id) {
    const usuario = sessionStorage.getItem("id");
    const resposta = await fetch(`http://10.0.1.226:8080/askyu/pecas/${usuario}/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        construirModalGenerico("statusButton", "modalGenerico.hide()", null, "Peça descartada com sucesso.") 
        await listarPecas(); 
    } else {
        alert("Erro ao deletar a peça.");
    }
}

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


