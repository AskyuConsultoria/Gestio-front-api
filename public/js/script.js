

  if (document.querySelector('#modal-generico')) {
    const modalGenerico = new bootstrap.Modal(document.getElementById('modal-generico'))
  
    window.modalGenerico = modalGenerico
  }

  async function login(){
    var user = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    
    const data = await fetch(`http://localhost:8080/usuarios/login?usuario=${user}&senha=${senha}`);
      if (!data.ok) {
        if (data.status === 404) {
          construirModalGenerico("statusButton", null, null, "Usuário ou senha estão errados")
        } else if (data.status === 400) {
          construirModalGenerico("statusButton", null, null, "Algum dado inserido incorretamente!")
        } 
        else if (data.status === 409){
          await fetch(`http://localhost:8080/usuarios/login/deslogar?usuario=${user}`, {
            method: "POST" ,
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
          construirModalGenerico("statusButton", null, null, "Por Favor tente novamente com a mesma senha e usuario!")
        } 
        else {
          construirModalGenerico("statusButton", null, null, "Erro no login. Contate a nossa equipe ou aguarde!")
        throw new Error('Erro ' + data.statusText);
        }
      } else{
        const userData = await data.json()

        console.log("Resposta: ", userData)

        sessionStorage.setItem("id", userData.id)
        sessionStorage.setItem("usuario", userData.usuario)

        // Adicionar Redirecionamento para dashboard quando logar... só descomentar o negocio abaixo se o nome do html for dashboard.html e estivere aqui no public
        window.location = "home.html"
      };
}



  function construirModalGenerico(elementoId, primeiraFuncao, segundaFuncao, textoModal) {
    var elementoBody = document.querySelector("#body-modal-generico")
    var elementoFooter = document.querySelector("#footer-modal-generico")
  
    elementoFooter.innerHTML = ""
  
    if (elementoId == "statusButton") {
      elementoFooter.innerHTML =
        `
       <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="modalGenerico.hide()" style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </button>
      `
      modalGenerico.show()
    }
  
    if (elementoId == "actionButton") {
      elementoFooter.innerHTML = `
  
      <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button me-3" onclick="${primeiraFuncao}"  style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </button>
  
      <button type="button" class="justify-content-center align-items-center rounded-5 p-2 rounded-button ms-3" onclick="${segundaFuncao}" style="background-color: #012171;">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
      `
  
      modalGenerico.show()
    }

    elementoBody.innerText = textoModal
}
