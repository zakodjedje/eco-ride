

// On écoute les clics sur le document pour capturer ceux sur le bouton valider
document.addEventListener("click", function(e) {
  if (e.target && e.target.id === "btnValidateCredit") {
    e.preventDefault();

// On appel le fetch en indiquant l'url avec lequel on va communiquer
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
        
        const modalEl = document.getElementById("creditvalidé");
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
