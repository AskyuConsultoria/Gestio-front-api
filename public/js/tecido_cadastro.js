async function cadastrarTecido(){

    const nome = document.getElementById("nome_novo_tecido").value
    const usuario = sessionStorage.getItem("id")
    const codigo = document.getElementById("codigo_novo_tecido").value

    const dados = {
        "id": codigo,
        "nome": nome,
        "usuario": usuario
    }
    console.log(dados)
    const respostaCadastro = await fetch(`http://localhost:8080/askyu/askyu/tecidos/${usuario}/${codigo}`, {
    method: "POST" ,
    body: JSON.stringify(dados),
    headers: {"Content-type": "application/json; charset=UTF-8"},
})

    if(respostaCadastro.status == 201){
     construirModalGenerico("statusButton", "modalGenerico.hide()", null, "Tecido salvo com sucesso.")
     setTimeout(() =>  window.location.href="./Lista-tecido.html" , 800) 
    } else{
        alert("Ocorreu um erro ao cadastrar a peça")
    }
    
}


if (document.querySelector('#modal-generico')) {
    const modalGenerico = new bootstrap.Modal(document.getElementById('modal-generico'))
  
    window.modalGenerico = modalGenerico
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