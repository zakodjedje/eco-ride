export function initCovoiturage() {
  console.log("✅ JS covoiturage initialisé");

  const form = document.getElementById("form-covoiturage");
  if (!form) {
    console.error("❌ Formulaire non trouvé !");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const depart = document.getElementById("PseudoInput").value.trim();
    const arrivee = document.getElementById("arrivéInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const role = document.getElementById("role").value;
    const filterType = document.getElementById("filterType").value;

    const data = {
      depart,
      arrivee,
      date,
      role,
      filterType
    };

    fetch("http://localhost:8000/search-covoiturage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        console.log("📦 Réponse du serveur :", response);
        if (response.success) {
          // tu pourras adapter ici pour afficher les résultats dans la page
          alert("✅ Trajets trouvés !");
          window.location.href = "selectcovoit";
        } else {
          alert("❌ Aucun trajet trouvé.");
        }
      })
      .catch(err => {
        console.error("❌ Erreur fetch :", err);
        alert("❌ Erreur serveur.");
      });
  });
}

