var cardsCriados = false
var lista= []

async function buscarAtivo(usuarioId, etapaId) {
  try {
    const response = await fetch(`http://localhost:8080/agendamento/etapa-ativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("Resposta: ", data);  

    lista = data

    return data;
  } catch (error) {
    console.error("Erro: ", error);
    return [];
  }
}

async function buscarInativo(usuarioId, etapaId) {
  try {
    const response = await fetch(` http://localhost:8080/agendamento/etapa-inativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    }
    );
    console.log(response)
    const data = await response.json();
    // validação de se ta vazio ou não, aqui ou no back
    console.log("Resposta: ", data);

    lista = data

    return data
  } catch (error) {
    return console.error("Erro: ", error);

  }
}

async function criarModal(usuarioId, etapaId, nomeEtapa) {
  const nomeUpper = nomeEtapa.toUpperCase();

  const cardsAtivos = await buscarAtivo(usuarioId, etapaId);
  const totalOriginal = cardsAtivos.length;

  var cardPessoa = cardsAtivos.map(agenda => {
    return `<div class="card-pessoa d-flex align-items-start justify-content-evenly flex-column mt-3">
          <div class="texto-card">
            <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
            <span class="dthora">${formatarData(agenda.dataInicio)} ${formatarHorario(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
          </div>
        </div>`;
  }).join('');

  const cardsConcluidos = cardsAtivos.map(agenda => {
    return `<div class="card-pessoa finalizados d-flex align-items-start justify-content-evenly flex-column mt-3">
          <div class="texto-card">
            <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
            <span class="dthora">${formatarData(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
          </div>
        </div>`;
  }).join('');

  if (cardsAtivos.some(agenda => agenda.etapa.ultimaEtapa === true)) {
    var modal = document.querySelector('.finalizado');

    document.getElementById(etapaId).addEventListener('click', function () {
      if (!modal.classList.contains('subir')) {
        modal.classList.remove('descer');
        modal.classList.add('subir');
        console.log("modal subindo");
      }
    });

    document.getElementById('fechar').addEventListener('click', function () {
      if (!modal.classList.contains('descer')) {
        modal.classList.remove('subir');
        modal.classList.add('descer');
        console.log("modal descendo");
        deletarModal()
      }
      
    });
    criarFinalizado(nomeUpper, nomeEtapa, cardsConcluidos);
  }


  else {
    var modal = document.querySelector('.comum');

    document.getElementById(etapaId).addEventListener('click', function () {
      mudarEstiloSwitch()
      if (!modal.classList.contains('subir')) {
        modal.classList.remove('descer');
        modal.classList.add('subir');
        console.log("modal subindo");
      }
    });

    document.getElementById('fechar2').addEventListener('click', function () {
      if (!modal.classList.contains('descer')) {
        modal.classList.remove('subir');
        modal.classList.add('descer');
        console.log("modal descendo");
      }
    });
    criarComum(nomeUpper, cardPessoa, totalOriginal);
  }
}

function criarFinalizado(nomeUpper, nomeEtapa, cardsConcluidos) {
  if (!cardsCriados) {

    var tituloCard = document.querySelector('.modal-etapa-title');
    tituloCard.innerHTML = nomeUpper;

    var nomeEtapa = document.querySelector('.nome-etapa');
    nomeEtapa.innerHTML = nomeUpper;

    var containerPessoa = document.querySelector('#container-pessoa-finalizado');
    containerPessoa.innerHTML = cardsConcluidos;

    cardsCriados = true;
  }
}


async function criarComum(nomeUpper, cardPessoa, totalOriginal) {
  cardsCriados = false;

  console.log("Criando cards comuns...");

  var tituloCard = document.querySelector('.title2');
  tituloCard.innerHTML = nomeUpper;

  var nomeEtapaElement = document.querySelector('.nome2');
  nomeEtapaElement.innerHTML = nomeUpper;

  var containerPessoa = document.querySelector('#container-pessoa-comum');
  containerPessoa.innerHTML = cardPessoa;
  containerPessoa.style.marginRight = '22%';

  var totalPedidos = document.querySelector('.total-pedidos');
  totalPedidos.innerHTML = totalOriginal;

  const switchElement = document.querySelector('.custom-switch');
  const etapa = document.querySelector('.status-etapa');
  const subPedido = document.querySelector('.sub-pedido');


  // Configurar o conteúdo para "Em Andamento"
  etapa.innerHTML = 'EM ANDAMENTO';
  etapa.style.marginRight = '9%';
  subPedido.style.marginLeft = '6%';
  containerPessoa.classList.remove('zero');
}

async function mudarSwitch(){
  var containerPessoa = document.querySelector('#container-pessoa-comum');
  
  const usuarioId = sessionStorage.getItem("id")
  const etapaId = sessionStorage.getItem("idEtapa")

  const cancelados = await buscarInativo(usuarioId, etapaId);
  const etapa = document.querySelector('.status-etapa');
  const subPedido = document.querySelector('.sub-pedido');
  const totalPedidos = document.querySelector('.total-pedidos');


  const switchElement = document.querySelector('.custom-switch');

  if (!switchElement.checked) {
    switchElement.style.backgroundColor = '#dc3545';
    switchElement.style.borderColor = '#dc3545';


    // Se o switch está ativo, busca os cancelados
    if (cancelados && cancelados.length > 0) {
      containerPessoa.innerHTML = ''; // Limpa o conteúdo anterior
      containerPessoa.innerHTML = cancelados.map(cancelado => {
        return `<div class="card-pessoa cancelado d-flex align-items-start justify-content-evenly flex-column mt-3">
                        <div class="texto-card">
                          <div class="nome-pessoa">${cancelado.cliente.nome} ${cancelado.cliente.sobrenome}</div>
                          <span class="dthora">${formatarData(cancelado.dataInicio)} - ${formatarHorario(cancelado.dataFim)}</span> 
                        </div>
                      </div>`;
      }).join('');
      totalPedidos.innerHTML = cancelados.length; // Atualiza o número de pedidos
    } else {
      // Não há pedidos cancelados
      totalPedidos.innerHTML = '0';
      containerPessoa.innerHTML = `<img src="./assets/not-found.svg">
                    <div>Você não possui pedidos cancelados</div>`;
      containerPessoa.classList.add('zero');
      etapa.innerHTML = '';
    }

    subPedido.style.marginLeft = '8%';
    etapa.style.marginRight = '15%';
    etapa.innerHTML = '<div style="color: red">CANCELADOS</div>';

  } else {
    switchElement.style.backgroundColor = '#007bff';
    switchElement.style.borderColor = '#007bff';
    // Se o switch está desativado, mostra os pedidos em andamento
    const cardsAtivos = await buscarAtivo(usuarioId, etapaId);
    const totalOriginal = cardsAtivos.length;

  var cardPessoa = cardsAtivos.map(agenda => {
    return `<div class="card-pessoa d-flex align-items-start justify-content-evenly flex-column mt-3">
          <div class="texto-card">
            <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
            <span class="dthora">${formatarData(agenda.dataInicio)} ${formatarHorario(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
          </div>
        </div>`;
  }).join('');

    containerPessoa.innerHTML = ''; // Limpa o conteúdo anterior
    etapa.innerHTML = 'EM ANDAMENTO';
    totalPedidos.innerHTML = totalOriginal;
    containerPessoa.innerHTML = cardPessoa; // Restaura os pedidos em andamento
    containerPessoa.classList.remove('zero');
    etapa.style.marginRight = '9%';
    subPedido.style.marginLeft = '6%';
    clique=0
  }
}

function formatarData(data) {
  var dia = new Date(data).getDate()
  var mes = new Date(data).getMonth() + 1
  var ano = new Date(data).getFullYear()

  var diaFormatado = ''
  var mesFormatado = ''

  if (dia <= 9) {
    diaFormatado = `0${dia}`
  }
  if (mes <= 9) {
    mesFormatado = `0${mes}`
  }

  diaFormatado = `${dia}`
  mesFormatado = `${mes}`

  return `${diaFormatado}/${mesFormatado}/${ano}`
}

function formatarHorario(data) {
  horas = new Date(data).getHours()

  var horarioFormatado = ""
  if (horas <= 9) {
    horarioFormatado = `0${horas}h`
  }

  horarioFormatado = `${horas}h`
  return horarioFormatado
}

async function buscarTotalEtapa() {
  const usuarioId = sessionStorage.getItem("id")
  const response = await fetch(`http://localhost:8080/agendamento-view-total-etapa/${usuarioId}`, {
    method: "GET"
  });
  const totalEtapa = await response.json()
  return totalEtapa
}

async function listarEtapas() {
  const usuarioId = sessionStorage.getItem("id")
  const cardAgendamento = document.querySelector('.etapas')

  try {
    const response = await fetch(`http://localhost:8080/etapas/${usuarioId}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("Resposta: ", data)
    const totalEtapa = await buscarTotalEtapa();
    for (var i = 0; i < data.length; i++) {
      const etapaId = data[i].id
      const nomeEtapa = data[i].nome
      console.log("ID:", etapaId)

      if (i < totalEtapa.length && data[i].ativo != false) {
        cardAgendamento.innerHTML += `
          <div class="etapa-card card mx-auto position-relative mb-3" value="${nomeEtapa}" id="${etapaId}">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <div class="d-flex flex-row align-items-center justify-content-between mx-3">
                  <h5 class="etapa-nome card-title mb-0">${nomeEtapa}</h5>
                  <div class="total-etapa d-flex flex-column align-items-center">
                  <span id="n-total">${totalEtapa[i].qtd_agendamento}</span>
                    <span>total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }
    }


  } catch (error) {
    console.error("Erro: ", error);
  }

  document.querySelectorAll('.etapa-card').forEach(card => {
    card.addEventListener('click', async () => {
      const usuarioId = sessionStorage.getItem("id");
      const nomeEtapa = card.getAttribute('value');
      const etapaId = card.getAttribute('id');
      sessionStorage.setItem("idEtapa", etapaId)


      await criarModal(usuarioId, etapaId, nomeEtapa);


    });
  });


}



function buscaAvancada(input){
  var txtInput= input.value
  var listaFiltrada = lista.filter(agenda => agenda.cliente.nome.toLowerCase().includes(txtInput.toLowerCase()));

  var containerPessoa = document.querySelector('#container-pessoa-comum');

  containerPessoa.innerHTML=''
  if(input.value.length > 2){
    listaFiltrada.forEach(agenda => {
      containerPessoa.innerHTML += `
      <div class="card-pessoa d-flex align-itens-start justify-content-evenly flex-column mt-3">
              <div class="texto-card">
                <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
                <span class="dthora">${formatarData(agenda.dataInicio)} ${formatarHorario(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
              </div>
            </div>
      `
  })
  }
 }

async function buscaAvancada(input){
  var nomeCliente = input.value
  var valorSwitch = document.querySelector('.custom-switch').checked
  const usuarioId = sessionStorage.getItem('id')

  try{
    const response = await fetch(`http://localhost:8080/agendamento/filtro-cliente-nome/${usuarioId}?nome=${nomeCliente}&ativo=${valorSwitch}`, {
      method: "GET"
    });

    const dados = await response.json()
    console.log(dados)

    criarPedidos(dados, input)

  } catch(error){
    console.log(`Houve um erro: ${error.message}`)
  }
}

async function criarPedidos(pedidos, input){
  var containerPessoa = document.querySelector('#container-pessoa-comum');
  containerPessoa.innerHTML = ''

  if(input.value.length > 2){
    pedidos.forEach(pedido => {
      containerPessoa.innerHTML += `
      <div class="card-pessoa d-flex align-itens-start justify-content-evenly flex-column mt-3">
              <div class="texto-card">
                <div class="nome-pessoa">${pedido.cliente.nome} ${pedido.cliente.sobrenome}</div>
                <span class="dthora">${formatarData(pedido.dataInicio)} ${formatarHorario(pedido.dataInicio)} - ${formatarHorario(pedido.dataFim)}</span> 
              </div>
            </div>
      `
  })

  return
  }

  if(input.value.length == 0){
    var pedidos = await buscarAtivo(
      sessionStorage.getItem('id'),
      sessionStorage.getItem('idEtapa')
    )

    pedidos.forEach(pedido => {
      containerPessoa.innerHTML += `
      <div class="card-pessoa d-flex align-itens-start justify-content-evenly flex-column mt-3">
              <div class="texto-card">
                <div class="nome-pessoa">${pedido.cliente.nome} ${pedido.cliente.sobrenome}</div>
                <span class="dthora">${formatarData(pedido.dataInicio)} ${formatarHorario(pedido.dataInicio)} - ${formatarHorario(pedido.dataFim)}</span> 
              </div>
            </div>
      `
    })

    return
  }

}

function mudarEstiloSwitch(){
 var elSwitch = document.querySelector('.custom-switch')
 elSwitch.checked = true
 elSwitch.style.backgroundColor = '#007bff';
 elSwitch.style.borderColor = '#007bff';
}


