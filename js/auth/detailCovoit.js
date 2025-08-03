// detailCovoit.js

// On écoute les clics sur le document pour capturer ceux sur le bouton valider
document.addEventListener("click", function(e) {
  if (e.target && e.target.id === "btnValidateCredit") {
    e.preventDefault();

    fetch("http://localhost:8000/session-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(response => {
      console.log("📦 Réponse du serveur :", response);
      if (response.connected) {
        alert("✅ crédit retiré");
        // Fermeture du modal Bootstrap
        const modalEl = document.getElementById("credit-valide");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
      } else {
        window.location.href = "signin";
      }
    })
    .catch(err => {
      console.error("❌ Erreur fetch :", err);
      alert("❌ Erreur serveur.");
    });
  }
});
