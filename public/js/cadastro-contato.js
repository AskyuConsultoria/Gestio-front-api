
async function cadastrarContato() {

    const usuario = sessionStorage.getItem('id')
    const outroTelefone = document.getElementById('outroCelular')


    try {
        const response = await fetch(`http://localhost:8080/clientes/${usuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("usuario").value,
                sobrenome: document.getElementById("sobrenome").value,
                email: document.getElementById("email").value,
                usuario: usuario
            })
        });

        const dados = await response.json()
        console.log(dados)

        cadastrarTelefone(dados.id, 'celular')
        if (outroTelefone != null) cadastrarTelefone(dados.id, 'outroCelular')

        return response.status

    } catch (error) {

        console.log(`Houve um erro: ${error}`)
    }
}


async function cadastrarTelefone(clienteId, tipoTelefone) {
    const usuarioId = sessionStorage.getItem('id')

    try {
        const response = await fetch(`http://localhost:8080/telefone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: {
                    id: usuarioId
                },
                tipoTelefone: {
                    id: 1
                },
                cliente: {
                    id: clienteId
                },
                numero: document.querySelector(`#${tipoTelefone}`).value
            })
        })
        
        var dados = await response.json()
        console.log(dados) 

    } catch (error) {
    console.log(`Houve um erro: ${error}`)
    }

}
