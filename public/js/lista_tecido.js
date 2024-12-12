async function listarTecidos(){
    const usuario = sessionStorage.getItem("id")

    const data = await fetch(`http://localhost:8080/tecidos/${usuario}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

const FormatedData = await data.json()

console.log("Resposta: ", FormatedData)

document.getElementById("container").innerHTML = ""

FormatedData.forEach(tecido => {
    document.getElementById("container").innerHTML += `
        <div class="card mb-2 mx-auto position-relative" style="max-width: 92%; background-color: #012171; color: white">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="d-flex">
                                <span class="medidas card-title mt-2">${tecido.nome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <img src="./assets/lixeira_branca.svg" alt="lixeira exclusão" class="lixeira btn" style="border:none"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="construirModalGenerico('actionButton', 'deletarTecido(${tecido.id})', 'modalGenerico.hide()', 'Quer descartar este tecido?')">
            </div>
        </div>`
});

}

async function deletarTecido(idTecido){

    const usuario = sessionStorage.getItem("id")


    const respostaTecido = await fetch(`http://localhost:8080/tecidos/${usuario}/${idTecido}`, {
    method: "DELETE",
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
    console.log(respostaTecido)
    if(respostaTecido.status == 200 || respostaTecido.status == 204){
       construirModalGenerico('statusButton', 'modalGenerico.hide()', null, "Tecido descartado com sucesso.")
       setTimeout(() => listarTecidos(), 800)       
    } else{
        alert("Ocorreu um erro ao deletar o tecido")
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