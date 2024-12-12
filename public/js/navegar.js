import { Pilha } from './pilha.js';

function carregarPilha() {
    const pilhaSerializada = sessionStorage.getItem("desfazer");
    return pilhaSerializada ? Object.assign(new Pilha(), JSON.parse(pilhaSerializada)) : new Pilha();
}

let pilha = carregarPilha();

function voltar() {
    let caminho = pilha.pop();
    sessionStorage.setItem("desfazer", JSON.stringify(pilha));
    window.location = caminho;
}

function irPara(local) {
    if (pilha.peek() !== local) {
        pilha.push(window.location.href);
        sessionStorage.setItem("desfazer", JSON.stringify(pilha));
    }
    window.location.href = local;
}

function irParaPeca(idPeca){
    if (pilha.peek() !== "peca-escolhida.html") {
        pilha.push(window.location.href);
        sessionStorage.setItem("desfazer", JSON.stringify(pilha));
    }
    sessionStorage.setItem("idPeca", idPeca)
    window.location.href = "peca-escolhida.html";
}

function voltarEspecifico(pagina){
    window.location.href = pagina;
}

function addVoltar(pagina){
    if (pilha.peek() !== pagina) {
        pilha.push(window.location.href);
        sessionStorage.setItem("desfazer", JSON.stringify(pilha));
    }
}

window.voltar = voltar;
window.irPara = irPara;
window.irParaPeca = irParaPeca;
window.voltarEspecifico = voltarEspecifico;
window.addVoltar = addVoltar;