async function registrar() {
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    const res = await fetch("https://cronoanalise.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, email, senha })
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
        window.location.href = "login.html";
    }
}
