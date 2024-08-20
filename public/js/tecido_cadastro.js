async function cadastrarTecido(){

    const nome = document.getElementById("nome_novo_tecido").value
    const descricao = document.getElementById("descricao_novo_tecido").value
    const usuario = sessionStorage.getItem("id")

    const dados = {
        "nome": nome,
        "descricao": descricao,
        "usuario": usuario
    }

    console.log(dados)
    // id Tecido???
    const respostaCadastro = await fetch(`http://localhost:8080/tecidos/${usuario}`, {
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