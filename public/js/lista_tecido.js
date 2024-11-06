async function listarTecidos(){
    const usuario = sessionStorage.getItem("id")

    const data = await fetch(`http://localhost:8080/tecidos/${usuario}`);
        if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
        }

const FormatedData = await data.json()

console.log("Resposta: ", FormatedData)

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
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Ao clicar aqui uma medida de peça é excluida" onclick="deletarMedida(${tecido.id})">
            </div>
        </div>`
});

}

async function deletarTecido(idTecido){

    const usuario = sessionStorage.getItem("id")


    const respostaMedida = await fetch(`http://localhost:8080/tecidos/${usuario}/${idTecido}`, {
    method: "DELETE",
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
    console.log(respostaMedida)
    if(respostaMedida.status == 200){
       window.location.href="./Lista-Tecido.html"
    } else{
        alert("Ocorreu um erro ao deletar a peça")
    }
    
}
