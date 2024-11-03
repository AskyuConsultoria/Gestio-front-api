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

window.voltar = voltar;
window.irPara = irPara;