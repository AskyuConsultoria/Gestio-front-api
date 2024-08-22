async function buscarFinalizado(usuarioId, etapaId) {
  try {

    var usuarioId = parseInt(usuarioId)
    const response = await fetch(`http://localhost:8080/agendamento/etapa-ativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    }
    );
    const data = await response.json();
    console.log("Resposta: ", data);

    return data

  } catch (error) {
    return console.error("Erro: ", error);
  }
}

async function criarModalAtivo(usuarioId, etapaId, nomeEtapa) {

  //caso seja necessário alteração, segue abaixo os comentários explicando o que cada coisa faz (front-end)

  try {
    const response = await fetch(`http://localhost:8080/agendamento/etapa-ativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("Resposta: ", data);


    //impede que o offcanvas se duplique removendo ele antes de criar o novo
    const offcanvasAnterior = document.getElementById('offcanvasBottom');
    if (offcanvasAnterior) {
      offcanvasAnterior.remove();
    }

    //cria o offcanvas
    const container = document.getElementById('container')
    const offcanvasDiv = document.createElement('div');
    offcanvasDiv.className = 'offcanvas offcanvas-bottom h-100';
    offcanvasDiv.tabIndex = -1;
    offcanvasDiv.id = 'offcanvasBottom';
    offcanvasDiv.ariaLabelledby = 'offcanvasBottomLabel';

    //nome etapa com uppercase
    const nomeUpper = nomeEtapa.toUpperCase()

    //cria um elemento que vai receber o conteudo do offcanvas
    const offcanvasContent = document.createElement('div');

    const totalOriginal = data.length 



    var finalizados = await buscarFinalizado(usuarioId, etapaId)
  


    //variavel que armazena os clientes com pedidos ativos
    var cardPessoa = data.map(agenda => {
      return `<div class="card-pessoa d-flex align-items-start justify-content-evenly flex-column mt-3">
         <div class="texto-card">
           <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
           <span class="dthora">${formatarData(agenda.dataInicio)} ${formatarHorario(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
         </div>
       </div>
     `
    }).join('')


    const cardsConcluidos = finalizados.map(agenda => {
      return `<div class="card-pessoa d-flex align-items-start justify-content-evenly flex-column mt-3">
        <div class="texto-card">
          <div class="nome-pessoa">${agenda.cliente.nome} ${agenda.cliente.sobrenome}</div>
          <span class="dthora">${formatarData(agenda.dataInicio)} - ${formatarHorario(agenda.dataFim)}</span> 
        </div>
      </div>`}
    ).join('');


    //conteudo do offcanvas + etapas com uppercase + clientes com pedidos ativos
    if (!finalizados || finalizados.length === 0) {
      offcanvasContent.innerHTML = `<div class ="offcanvas-header d-flex align-items-center justify-content-between flex-column">
        <img src="./assets/linha drag.svg" alt="voltar" type="button" data-bs-dismiss="offcanvas" id="fechar">
        <div class="header-off d-flex align-items-center">
          <h5 class="offcanvas-title mt-2" id="offcanvasTopLabel">${nomeUpper}</h5>
        </div>
      </div>
      <div class="offcanvas-body">
        <div class="etapa-title mt-3">
          <span class="pedido-etapa">PEDIDOS NA ETAPA <span class="nome-etapa">${nomeUpper}</span></span>
        </div>
        <div class="container-pessoa">
          ${cardsConcluidos}
        </div>
      </div>
    `;
    } else {
      offcanvasContent.innerHTML = `
          <div class="offcanvas-header d-flex align-items-center justify-content-between flex-column">
            <img src="./assets/linha drag.svg" alt="voltar" type="button" data-bs-dismiss="offcanvas" id="fechar">
            <div class="header-off d-flex align-items-center">
              <h5 class="offcanvas-title mt-2" id="offcanvasTopLabel">${nomeUpper}</h5>
            </div>
          </div>
          <div class="offcanvas-body">
              <div class="etapa-title mt-3">
                <span class="pedido-etapa">PEDIDOS NA ETAPA <span class="nome-etapa">${nomeUpper}</span></span>
              </div>
              <div class="sub-pedido mt-3 d-flex align-items-center justify-content-evenly flex-row mt-3">
                <div>VOCÊ ESTÁ VENDO PEDIDOS</div>
                <div class="status-etapa"> EM ANDAMENTO</div>
              </div>
              <div class="barra-busca d-flex align-items-center justify-content-evenly mt-3">
              <img src="./assets/search.svg" alt="lupa-pesquisa">
              <input type="text" placeholder="Pesquise os clientes do pedido">
            </div><div class="switch-card d-flex align-items-center flex-column">
              <div class="form-check form-switch d-flex align-items-center justify-content-between mt-3 p-0 m-0">
                <div class="text-switch mt-1">Total de pedidos: <span class="total-pedidos">${data.length}</span>
                </div>
                <input class="form-check-input custom-switch" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                  checked>
              </div>
              <div class="container-pessoa">
              ${cardPessoa} 
            </div>
            </div>
          </div>
        `
    }


    //equivale ao card de cada etapa
    const card = document.getElementById(etapaId);
    card.dataset.bsTarget = '#offcanvasBottom';

    //coloca o conteudo do offcanvas dentro de uma div e dentro do container 
    offcanvasDiv.appendChild(offcanvasContent);
    container.appendChild(offcanvasDiv);

    //busca por pedidos cancelados (parte do switch)
    var cancelados = await buscarInativo(usuarioId, etapaId)

    //armazena o switch em uma var
    const switchElement = document.querySelector('.custom-switch')
    var i = 1
    //guarda o tamanho original para não quebrar o front
    var originalWidth = document.querySelector('.sub-pedido').style.width

    //evento que cria os cards cancelados com base no buscarInativo()
    switchElement.addEventListener('click', function () {
      var etapa = document.querySelector('.status-etapa')
      //aqui é apenas uma div para manter o width original quando trocar as frases 
      var subPedido = document.querySelector('.sub-pedido')
      //todos os cards + total pedidos
      var containerPessoa = document.querySelector('.container-pessoa')
      var totalPedidos = document.querySelector('.total-pedidos')


      //validação do switch
      if (i == 1) {
        if (cancelados && cancelados.length > 0) {
          containerPessoa.innerHTML = ''
          totalPedidos.innerHTML = cancelados.length
          cancelados.map(cancelado => containerPessoa.innerHTML += `<div class="card-pessoa cancelado d-flex align-items-start justify-content-evenly flex-column mt-3">
            <div class="texto-card">
              <div class="nome-pessoa">${cancelado.cliente.nome} ${cancelado.cliente.sobrenome}</div>
              <span class="dthora">${formatarData(cancelado.dataInicio)} - ${formatarHorario(cancelado.dataFim)}</span> 
            </div>
          </div>`)
        }
        //se estiver vazio subscreve para mensagem
        else {
          totalPedidos.innerHTML = '0'
          containerPessoa.innerHTML = ''
          containerPessoa.innerHTML = `<img src="./assets/not-found.svg">
         <div>Você não possui pedidos cancelados</div>`
          containerPessoa.classList.add('zero');
          etapa.innerHTML = ''
          i++
        }

        subPedido.style.width = '85%'
        etapa.innerHTML = '<div style="color: red">CANCELADOS</div>'
        i++

        //se n estiver clicado o switch, volta ao andamento
      } else {
        etapa.innerHTML = 'EM ANDAMENTO'
        totalPedidos.innerHTML = totalOriginal
        containerPessoa.innerHTML = ''
        subPedido.style.width = originalWidth
        containerPessoa.innerHTML += cardPessoa
        containerPessoa.classList.remove('zero', 'cancel')
        i = 1
      }
    })


    //cria o offcanvas no bootstrap
    const offcanvas = new bootstrap.Offcanvas(offcanvasDiv);


    //fecha o bootstrap para não replicar de novo, ou seja esconde ao clicar
    const fecharOffcanvas = document.getElementById('fechar');
    fecharOffcanvas.addEventListener('click', () => {
      offcanvas.hide();
    });



    //retorna o offcanvas
    return offcanvas

  } catch (error) {
    return console.error("Erro: ", error);
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

async function buscarInativo(usuarioId, etapaId) {
  try {
    const response = await fetch(` http://localhost:8080/agendamento/etapa-inativo/${usuarioId}/${etapaId}`, {
      method: "GET"
    }
    );
    const data = await response.json();
    console.log("Resposta: ", data);

    return data
  } catch (error) {
    return console.error("Erro: ", error);

  }
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
        <div class="etapa-card card mx-auto position-relative mb-3" value="${nomeEtapa}" id="${etapaId}" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom">
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

      var offcanvas = await criarModalAtivo(usuarioId, etapaId, nomeEtapa);

      offcanvas.show()

    });
  });


}
