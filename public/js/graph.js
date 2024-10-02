async function buscarViewPedido(usuarioId){
    try {
        const resposta = await fetch(`http://10.18.34.59:8080/pedido-view/${usuarioId}`, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error(`Erro de servidor, status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);
        
        return dados

    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
}

async function buscarViewTecido(usuarioId){
    try {
        const resposta = await fetch(`http://10.18.34.59:8080/tecido-view/${usuarioId}`, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error(`Erro de servidor, status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);
        
        return dados

    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
}



function adicionarLabelsPedido(dados){
    var labelsPedido = []
    for(var i = 0; i < dados.length; i++){
        labelsPedido.push(dados[i].nome)
    }
    return labelsPedido
}

function adicionarDadosPedido(dados){
    var dataPedido = []
    for(var i = 0; i < dados.length; i++){
        dataPedido.push(dados[i].qtdPedidos)
    }
    return dataPedido
}

function adicionarLabelsTecido(dados){
    var labelsTecido = []
    for(var i = 0; i < dados.length; i++){
        labelsTecido.push(dados[i].nome)
    }
    return labelsTecido
}

function adicionarDadosTecido(dados){
    var dataTecido = []
    for(var i = 0; i < dados.length; i++){
        dataTecido.push(dados[i].qtdTecidos)
    }
    return dataTecido
}










