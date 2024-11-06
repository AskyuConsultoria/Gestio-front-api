async function cadastrarPeca(){

    const nome = document.getElementById("nome_nova_peca").value
    const descricao = document.getElementById("descricao_nova_peca").value
    const usuario = sessionStorage.getItem("id")

    const dados = {
        "nome": nome,
        "descricao": descricao,
        "usuario": usuario
    }

    console.log(dados)

    const respostaCadastro = await fetch(`http://192.168.137.199:8080/pecas/${usuario}`, {
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