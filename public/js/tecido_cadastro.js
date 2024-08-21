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
    const respostaCadastro = await fetch(`http://localhost:8080/tecidos/${usuario}/${codigo}`, {
    method: "POST" ,
    body: JSON.stringify(dados),
    headers: {"Content-type": "application/json; charset=UTF-8"},
})

    if(respostaCadastro.status == 201){
       window.location.href="./Lista-tecido.html"
    } else{
        alert("Ocorreu um erro ao cadastrar a peça")
    }
    
}