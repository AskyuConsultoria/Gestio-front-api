async function login(){
    var user = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    
    const data = await fetch(`http://10.18.34.59:8080/usuarios/login?usuario=${user}&senha=${senha}`);
      if (!data.ok) {
        alert("Login não encontrado")
        throw new Error('Erro ' + data.statusText);
      }

    const userData = await data.json()

    console.log("Resposta: ", userData)

    sessionStorage.setItem("id", userData.id)
    sessionStorage.setItem("usuario", userData.usuario)

    // Adicionar Redirecionamento para dashboard quando logar... só descomentar o negocio abaixo se o nome do html for dashboard.html e estivere aqui no public
    window.location = "home.html"
  };