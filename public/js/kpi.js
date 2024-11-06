async function buscarRelatorioCliente(usuarioId) {
    try {
        const resposta = await fetch(`http://192.168.137.199:8080/clientes/${usuarioId}/relatorio-kpi`, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error(`Erro de servidor, status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);

        adicionarNumeroCliente(dados)

    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
}


function adicionarNumeroCliente(dados){
    const qtdClienteAtual = dados.quantidadeClienteMesAtual
    const qtdClientePassado = dados.quantidadeClienteMesPassado

    const porcentagemCliente = qtdClienteAtual/qtdClientePassado * 100 
    const elementoPorcentagemSpan = document.querySelector("#kpi-cliente-porcentagem")
    const elementoNumeroSpan = document.querySelector("#kpi-cliente-numero")
    elementoPorcentagemSpan.textContent = `${porcentagemCliente}%`
    elementoPorcentagemSpan.style.color = validarCor(qtdClienteAtual, qtdClientePassado)
    elementoNumeroSpan.textContent = qtdClienteAtual
    adicionarSvgSetaCliente(qtdClienteAtual, qtdClientePassado)
}

function adicionarSvgSetaCliente(qtdClienteAtual, qtdClientePassado){
    const divSetaCliente = document.querySelector("#container-seta-cliente")
    if(qtdClienteAtual > qtdClientePassado){
        // Trata-se de uma seta para cima presente no diretório Img
        divSetaCliente.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" fill="#46C825" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M9.05,10.05a1,1,0,0,0,1.42,0l4.6-4.6V29a1,1,0,0,0,2,0V5.48l4.57,4.57a1,1,0,0,0,1.41-1.41L16.69,2.27a.9.9,0,0,0-1.27,0L9.05,8.64A1,1,0,0,0,9.05,10.05Z"/></g></svg>`
        return
    }
    // Trata-se de uma seta para baixo presente no diretório Img
    divSetaCliente.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" fill="#BB0B15" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M23.05,22a1,1,0,0,0-1.41,0L17,26.56V3a1,1,0,1,0-2,0V26.53L10.47,22a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l6.37,6.37a.9.9,0,0,0,1.27,0l6.36-6.37A1,1,0,0,0,23.05,22Z"/></g></svg>`
    return 
}

async function buscarRelatorioPedido(usuarioId) {
    try {
        const resposta = await fetch(`http://192.168.137.199:8080/pedido/${usuarioId}/relatorio-kpi`, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error(`Erro de servidor, status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);

        adicionarNumeroPedido(dados)

    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
}


function adicionarNumeroPedido(dados){
    const qtdPedidoAtual = dados.quantidadePedidoMesAtual
    const qtdPedidoPassado = dados.quantidadePedidoMesPassado

    const porcentagemPedido = qtdPedidoAtual/qtdPedidoPassado * 100 
    const elementoPorcentagemSpan = document.querySelector("#kpi-pedido-porcentagem")
    const elementoNumeroSpan = document.querySelector("#kpi-pedido-numero")
    elementoPorcentagemSpan.textContent = `${porcentagemPedido}%`
    elementoPorcentagemSpan.style.color = validarCor(qtdPedidoAtual, qtdPedidoPassado)
    elementoNumeroSpan.textContent = qtdPedidoAtual
    adicionarSvgSetaPedido(qtdPedidoAtual, qtdPedidoPassado)
}

function adicionarSvgSetaPedido(qtdPedidoAtual, qtdPedidoPassado){
    const divSetaPedido = document.querySelector("#container-seta-pedido")
    if(qtdPedidoAtual > qtdPedidoPassado){
        // Trata-se de uma seta para cima presente no diretório Img
        divSetaPedido.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" fill="#46C825" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M9.05,10.05a1,1,0,0,0,1.42,0l4.6-4.6V29a1,1,0,0,0,2,0V5.48l4.57,4.57a1,1,0,0,0,1.41-1.41L16.69,2.27a.9.9,0,0,0-1.27,0L9.05,8.64A1,1,0,0,0,9.05,10.05Z"/></g></svg>`
        return
    }
    // Trata-se de uma seta para baixo presente no diretório Img
    divSetaPedido.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" fill="#BB0B15" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M23.05,22a1,1,0,0,0-1.41,0L17,26.56V3a1,1,0,1,0-2,0V26.53L10.47,22a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l6.37,6.37a.9.9,0,0,0,1.27,0l6.36-6.37A1,1,0,0,0,23.05,22Z"/></g></svg>`
    return 
}


function validarCor(qtdAtual, qtdPassado){
    if(qtdPassado > qtdAtual){
        return "#BB0B15"
    }

    return "#46C825"
}