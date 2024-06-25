var listaPedido = []

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
 
var elementoCalendarioHeader = document.querySelector("#mes-ano-calendario")
var iconesSetasMeses = document.querySelectorAll(".switch-month")
var elementoCorpoDoCalendario = document.querySelector(".calendar_content")

// Array of month names
const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];


async function buscarPedidosEmIntervaloDeTempo(idUsuario, dataInicio, dataFim){
    
    try{
        const resposta = await fetch(`http://localhost:8080/agendamento/${idUsuario}/intervalo-tempo?dataInicio=${dataInicio}&dataFim=${dataFim}`)
        if(resposta.status == 204){
            return []
        }
        return await resposta.json()
    }
    catch(error) {
        throw new Error(`Erro de servidor: ${error}`)
    }
}

async function acessarDados(idUsuario){
    var dataInicio = montarDataParaISO(new Date(year, month, 1))
    var dataFim = montarDataParaISO(new Date(year, month + 1, 0))

    listaPedido = await buscarPedidosEmIntervaloDeTempo(1, dataInicio, dataFim)
    console.log(listaPedido)
}
 
// Function to generate the calendar
async function manipulate(){
 
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();
 
    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
 
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
 
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
 
    // Variable to store the generated calendar HTML
    let lit = "";
 
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<div class="inactive">${monthlastdate - i + 1}</div>`;
    }
 
    // Renova a lista de pedidos
    await acessarDados(1)
    
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
 
        if(i < listaPedido.length && listaPedido.length != 0){
            var dataIteracao = new Date(listaPedido[i].dataInicio).getDate()

            if(i == dataIteracao){
                lit +=`<div class="com-pedido">${i}</div>`
            } else{
                lit += `<div>${i}</div>`
            }
            
        } else{
            lit += `<div>${i}</div>`
        }

    }
 
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<div class="inactive">${i - dayend + 1}</div>`
    }
 
    // Update the text of the current date element 
    // with the formatted current month and year
    elementoCalendarioHeader.innerText = `${months[month]} ${year}`;
 
    // update the HTML of the dates element 
    // with the generated calendar
    elementoCorpoDoCalendario.innerHTML = lit;
}
 
manipulate();
 
// Attach a click event listener to each icon
iconesSetasMeses.forEach(icon => {
 
    // When an icon is clicked
    icon.addEventListener("click", () => {
 
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
 
        // Check if the month is out of range
        if (month < 0 || month > 11) {
 
            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());
 
            // Set the year to the new year
            year = date.getFullYear();
 
            // Set the month to the new month
            month = date.getMonth();
        }
 
        else {
 
            // Set the date to the current date
            date = new Date();
        }
 
        // Call the manipulate function to 
        // update the calendar display
        manipulate();
    });
});

// Check if the current date is today
// let isToday = i === date.getDate()
// && month === new Date().getMonth()
// && year === new Date().getFullYear()
// ? "active"
// : "";

function montarDataParaISO(data){
  return new Date(data).toISOString()
}