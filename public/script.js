async function login(){
    var user = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    const data = await fetch(`http://localhost:8080/usuarios/login?usuario=${user}&senha=${senha}`);
      if (!data.ok) {
        throw new Error('Erro ' + data.statusText);
      }

    const userData = await data.json()

    console.log("Resposta: ", userData)
  };