sessionStorage.setItem('activeSession', 'true');

document.addEventListener('click', (event) => {
    const target = event.target.closest('a');
    if (target) {
        const href = target.getAttribute('href');
        if (href && (href.endsWith('.pdf') || href.startsWith('http'))) {
            sessionStorage.setItem('skipLogout', 'true');
        }
    }
});

window.addEventListener('beforeunload', (event) => {
    if (!sessionStorage.getItem('skipLogout') && !document.referrer.includes(window.location.hostname)) {
        var usuario = sessionStorage.getItem("usuario")

        fetch(`http://localhost:8080/usuarios/login/deslogar?usuario=${usuario}`, {
            method: "POST" ,
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
        
        sessionStorage.removeItem('activeSession');
    }

    sessionStorage.removeItem('skipLogout');
});