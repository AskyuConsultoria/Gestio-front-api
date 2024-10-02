async function cadastrarMedida(){

    const nome = document.getElementById("nome_nova_medida").value
    const usuario = sessionStorage.getItem("id")
    const idPeca = sessionStorage.getItem("idPeca")

    const dados = {
        "nome": nome,
        "peca": idPeca,
        "usuario": usuario
    }

    console.log(dados)

    const respostaCadastro = await fetch(`http://192.168.15.3:8080/nomes-medidas/${usuario}/${idPeca}`, {
    method: "POST" ,
    body: JSON.stringify(dados),
    headers: {"Content-type": "application/json; charset=UTF-8"},
})

    if(respostaCadastro.status == 201){
       window.location.href="./Lista-medida.html"
    } else{
        alert("Ocorreu um erro ao cadastrar a peça")
    }
    
}