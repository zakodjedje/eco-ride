document.addEventListener("DOMContentLoaded", () => {
  const signoutBtn = document.getElementById("signout-btn");

  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      fetch("http://localhost:8000/logout.php", {
        method: "POST",
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("✅ Déconnexion réussie");
            // Tu peux rediriger ou recharger la page
            window.location.reload();
          } else {
            console.error("❌ Échec de la déconnexion");
          }
        })
        .catch(err => {
          console.error("❌ Erreur lors de la déconnexion :", err);
        });
    });
  }
});
