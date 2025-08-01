export function initCovoiturage() {
  console.log("✅ JS covoiturage initialisé");

  const form = document.getElementById("form-covoiturage");
  if (!form) {
    console.error("❌ Formulaire non trouvé !");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const role = document.getElementById("role").value;

    fetch("http://localhost:8000/search-covoiturage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ role })
    })
      .then(res => res.json())
      .then(response => {
        console.log("📦 Réponse du serveur :", response);
        if (response.success) {
          alert("✅ chauffeur trouvé !!");
        } else {
          alert("❌ pas de chauffeur disponible");
        }
      })
      .catch(err => {
        console.error("❌ Erreur fetch :", err);
        alert("❌ Erreur serveur.");
      });
  });
}

