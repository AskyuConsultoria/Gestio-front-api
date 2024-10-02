
async function gerarRoteiroViaLLM(){
    const contexto = "Nenhum"
    const etapa = "Primeira entrevista"

    try {
        const response = await fetch(`http://192.168.15.3:8080/api-llm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contexto: contexto,
            etapa: etapa,
            input: document.querySelector('textarea').value
        })

       })

       const dados = await response.text()
       console.log(dados)

       preencherCardPrompt(dados)
    }
    catch(error){
        console.log("Ocorreu um erro: " + error)
    }
  

}

function preencherCardPrompt(textoProcessado){
    var conteudoPrompt = document.querySelector('#conteudo-prompt')
    conteudoPrompt.innerHTML = `<div class="d-flex px-3 py-3 bg-body rounded">
            <div class="d-flex w-25 ps-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="47px" viewBox="0 -960 960 960" width="47px" fill="#000"><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"></path></svg>
            </div>
            <div class="d-flex w-75">
                <span>${textoProcessado}</span>
            </div>
        </div>`

    document.querySelector("#body").style.height = 'auto'
}


function redefinirTamanho(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = textarea.scrollHeight + 'px';

    if (textarea.scrollHeight <= 170) {
        textarea.style.height = textarea.scrollHeight + 'px';
    } else {
        textarea.style.height = '170px'; 
        textarea.style.overflowY = 'auto'; 
    }
}

