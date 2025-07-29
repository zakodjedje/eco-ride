const tokenCookieName = "accesstoken";
const roleCookieName = "role";

const signoutBtn = document.getElementById("signout-btn");

// Fonction utilitaires cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Gérer les tokens
function setToken(token) {
  setCookie(tokenCookieName, token, 7);
}

function getToken() {
  return getCookie(tokenCookieName);
}

function getRole() {
  return getCookie(roleCookieName);
}

function isConnected() {
  const token = getToken();
  return token !== null && token !== undefined;
}

// Déconnexion complète
function logout() {
  fetch("http://localhost:8000/logout.php", {
    method: "POST",
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("✅ Déconnexion réussie");

        // Supprimer cookies custom
        eraseCookie(tokenCookieName);
        eraseCookie(roleCookieName);

        // Mise à jour de l'interface
        const signoutBtn = document.getElementById("signout-btn");
        if (signoutBtn) signoutBtn.style.display = "none";

        const loginLink = document.getElementById("login-link");
        if (loginLink) loginLink.style.display = "block";

        const userInfo = document.getElementById("user-info");
        if (userInfo) userInfo.style.display = "none";

        // Optionnel : recharger la page
        // window.location.reload();
      } else {
        console.error("❌ Échec de la déconnexion");
      }
    })
    .catch(err => {
      console.error("Erreur logout:", err);
    });
}

// Ciblage DOM après chargement
if (signoutBtn) {
  signoutBtn.addEventListener("click", logout);
}

// Affichage dynamique selon session utilisateur
function showAndHideElementsForRoles() {
  const userCo = isConnected();
  const role = getRole();

  const allElementsToEdit = document.querySelectorAll('[data-show]');
  allElementsToEdit.forEach(element => {
    switch (element.dataset.show) {
      case 'disconnected':
        element.style.display = userCo ? 'none' : 'block';
        break;
      case 'connected':
        element.style.display = userCo ? 'block' : 'none';
        break;
      case 'admin':
        element.style.display = (userCo && role === 'admin') ? 'block' : 'none';
        break;
      case 'employer':
        element.style.display = (userCo && role === 'employer') ? 'block' : 'none';
        break;
      case 'utilisateur':
        element.style.display = (userCo && role === 'utilisateur') ? 'block' : 'none';
        break;
      default:
        element.style.display = 'none';
    }
  });
}


// Vérification de session PHP
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8000/session-user.php", {
    method: "GET",
    credentials: "include"  // Pour envoyer le cookie de session
  })
    .then(res => {
      console.log("réponse brute:", res);
      return res.json();
    })
    .then(data => {
      console.log("🔁 Réponse JSON :", data);
      if (data.connected) {
        const user = data.user;
        const userInfo = document.getElementById("user-info");
        if (userInfo) {
          userInfo.style.display = "block";
          document.getElementById("username-display").textContent = `Bienvenue, ${user.username}`;
        }

        const loginLink = document.getElementById("login-link");
        if (loginLink) loginLink.style.display = "none";
      } else {
        const userInfo = document.getElementById("user-info");
        if (userInfo) userInfo.style.display = "none";

        const loginLink = document.getElementById("login-link");
        if (loginLink) loginLink.style.display = "block";
      }

      showAndHideElementsForRoles();
    })
    .catch(err => {
      console.error("Erreur de vérification de session :", err);
    });
});
