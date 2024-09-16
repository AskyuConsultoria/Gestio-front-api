var cardsCriados = false;

async function buscarAtivo(usuarioId, etapaId) {
  try {
    const response = await fetch(`http://localhost:8080/agendamento/etapa-ativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("Resposta: ", data);

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
    criarComum(etapaId, nomeUpper, nomeEtapa, cardPessoa, totalOriginal, usuarioId);
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


// async function criarComum(etapaId, nomeUpper, nomeEtapa, cardPessoa, totalOriginal, usuarioId) {
//   cardsCriados = false;

//   console.log("Criando cards comuns...");

//   var tituloCard = document.querySelector('.title2');
//   tituloCard.innerHTML = nomeUpper;

//   var nomeEtapa = document.querySelector('.nome2');
//   nomeEtapa.innerHTML = nomeUpper;

//   var containerPessoa = document.querySelector('#container-pessoa-comum');
//   containerPessoa.innerHTML = cardPessoa;
//   containerPessoa.style.marginRight = '22%';

//   var totalPedidos = document.querySelector('.total-pedidos');
//   totalPedidos.innerHTML = totalOriginal;

//   const switchElement = document.querySelector('.custom-switch');
//   var isActive = true; // Variável para controlar o estado do switch

//   // Limpar event listeners antigos para evitar múltiplas execuções
//   switchElement.replaceWith(switchElement.cloneNode(true));
//   const newSwitchElement = document.querySelector('.custom-switch');

//   // Adicionar event listener ao novo elemento
//   newSwitchElement.addEventListener('click', async function () {
//     const etapa = document.querySelector('.status-etapa');
//     const subPedido = document.querySelector('.sub-pedido');
//     const totalPedidos = document.querySelector('.total-pedidos');

//     if (isActive) {
//       // Se o switch está ativo, busca os cancelados
//       const cancelados = await buscarInativo(usuarioId, etapaId);

//       if (cancelados && cancelados.length > 0) {
//         containerPessoa.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos itens
//         containerPessoa.innerHTML = cancelados.map(cancelado => {
//           return `<div class="card-pessoa cancelado d-flex align-items-start justify-content-evenly flex-column mt-3">
//                         <div class="texto-card">
//                           <div class="nome-pessoa">${cancelado.cliente.nome} ${cancelado.cliente.sobrenome}</div>
//                           <span class="dthora">${formatarData(cancelado.dataInicio)} - ${formatarHorario(cancelado.dataFim)}</span> 
//                         </div>
//                       </div>`;
//         }).join('');
//         totalPedidos.innerHTML = cancelados.length;
//       } else {
//         totalPedidos.innerHTML = '0';
//         containerPessoa.innerHTML = `<img src="./assets/not-found.svg">
//                     <div>Você não possui pedidos cancelados</div>`;
//         containerPessoa.classList.add('zero');
//         etapa.innerHTML = '';
//       }

//       subPedido.style.marginLeft = '8%';
//       etapa.style.marginRight = '15%';
//       etapa.innerHTML = '<div style="color: red">CANCELADOS</div>';

//     } else {
//       // Se o switch não está ativo, mostra os pedidos em andamento
//       containerPessoa.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos itens
//       etapa.innerHTML = 'EM ANDAMENTO';
//       totalPedidos.innerHTML = totalOriginal;
//       containerPessoa.innerHTML = cardPessoa;
//       containerPessoa.classList.remove('zero');
//       etapa.style.marginRight = '9%';
//       subPedido.style.marginLeft = '6%';
//     }

//     // Alterna o estado do switch
//     isActive = !isActive; // Inverte o estado

//     // Opcional: Atualize a aparência do switch para refletir o estado
//     if (switchElement) {
//       switchElement.classList.remove('active'); // Remova a classe que indica que está ativo
//     } else {
//       switchElement.classList.add('active'); // Adicione a classe que indica que está inativo
//     }
//   });
// }

async function criarComum(etapaId, nomeUpper, nomeEtapa, cardPessoa, totalOriginal, usuarioId) {
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
  var isActive = true; // Variável para controlar o estado do switch

  // Limpar event listeners antigos antes de adicionar um novo
  const newSwitchElement = switchElement.cloneNode(true);
  switchElement.replaceWith(newSwitchElement);

  // Adicionar event listener ao novo elemento
  newSwitchElement.addEventListener('click', async function () {
    const etapa = document.querySelector('.status-etapa');
    const subPedido = document.querySelector('.sub-pedido');
    const totalPedidos = document.querySelector('.total-pedidos');

    if (isActive) {
      // Se o switch está ativo, busca os cancelados
      const cancelados = await buscarInativo(usuarioId, etapaId);

      if (cancelados && cancelados.length > 0) {
        containerPessoa.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos itens
        containerPessoa.innerHTML = cancelados.map(cancelado => {
          return `<div class="card-pessoa cancelado d-flex align-items-start justify-content-evenly flex-column mt-3">
                        <div class="texto-card">
                          <div class="nome-pessoa">${cancelado.cliente.nome} ${cancelado.cliente.sobrenome}</div>
                          <span class="dthora">${formatarData(cancelado.dataInicio)} - ${formatarHorario(cancelado.dataFim)}</span> 
                        </div>
                      </div>`;
        }).join('');
        totalPedidos.innerHTML = cancelados.length;
      } else {
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
      // Se o switch não está ativo, mostra os pedidos em andamento
      containerPessoa.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos itens
      etapa.innerHTML = 'EM ANDAMENTO';
      totalPedidos.innerHTML = totalOriginal;
      containerPessoa.innerHTML = cardPessoa;
      containerPessoa.classList.remove('zero');
      etapa.style.marginRight = '9%';
      subPedido.style.marginLeft = '6%';
    }

    // Alterna o estado do switch
    isActive = !isActive; // Inverte o estado

    // Atualiza a aparência do switch para refletir o estado
    if (isActive) {
      newSwitchElement.classList.add('active'); // Indica que está ativo
    } else {
      newSwitchElement.classList.remove('active'); // Indica que está inativo
    }
  });
}


function deletarModal() {
  document.querySelector('#container-pessoa-finalizado').innerHTML = "";
    document.querySelector('#container-pessoa-comum').innerHTML = "";
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

      await criarModal(usuarioId, etapaId, nomeEtapa);


    });
  });


}
