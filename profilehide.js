 window.onload = () => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    const btnLogin = document.querySelector(".btnLogin");
    const btnRegister = document.querySelector(".btnRegister");
    const userBox = document.getElementById("userBox");

    // Se estiver logado → esconder botões
    if (token && usuario) {
      if (btnLogin) btnLogin.style.display = "none";
      if (btnRegister) btnRegister.style.display = "none";

      // Mostrar nome do usuário
      userBox.innerHTML = `
        <div class="loggedUser">
          <span id="usernameLabel">${usuario}</span>
          <div id="logoutMenu" class="logoutMenu" style="display:none;">
            <button id="logoutBtn">Sair</button>
          </div>
        </div>
      `;

      // Toggle do menu de logout
      const usernameLabel = document.getElementById("usernameLabel");
      const logoutMenu = document.getElementById("logoutMenu");
      const logoutBtn = document.getElementById("logoutBtn");

      usernameLabel.onclick = () => {
        logoutMenu.style.display =
          logoutMenu.style.display === "none" ? "block" : "none";
      };

      // Função de sair
      logoutBtn.onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.reload();
      };
    }

    
  };