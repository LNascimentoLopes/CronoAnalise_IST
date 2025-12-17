async function login() {
    const usuario = document.getElementById("usuarioLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    const res = await fetch("https://cronoanalise.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", data.usuario);
        window.location.href = "cronometro.html";
    } else {
        alert(data.error);
    }
}
