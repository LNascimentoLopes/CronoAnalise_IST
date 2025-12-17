function carregarUsuario() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        document.getElementById("userBox").innerHTML = `
            <button onclick="window.location.href='login.html'">Entrar</button>
        `;
        return;
    }

    document.getElementById("userBox").innerHTML = `
        <div onclick="logout()" style="cursor:pointer;">
            <p>${usuario}</p>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    location.reload();
}

carregarUsuario();
