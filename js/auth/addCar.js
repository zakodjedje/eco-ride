// Exécuter uniquement quand le DOM est prêt
setTimeout(initInscriptionCar, 500);


function initInscriptionCar() {
  console.log("Init appelée");
  const form = document.getElementById("vehicule-section");
  if (!form) {
    console.warn("Récupération d'inscription introuvable !");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ Récupération du user_id stocké localement
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      alert("Utilisateur non connecté.");
      return;
    }

    // ✅ Validation du champ nombrePlace
    const nombrePlace = form.querySelector("#nombrePlace-car").value;
    if (!nombrePlace) {
      alert("Veuillez sélectionner un nombre de places.");
      return;
    }

    // ✅ Construction des données à envoyer
    const userData = {
      user_id: userId,
      nombrePlace: nombrePlace,
      modele: form.querySelector("#modele-car").value,
      couleur: form.querySelector("#couleur-car").value,
      marque: form.querySelector("#marque-car").value,
      immatriculation: form.querySelector("#immatriculation-car").value,
    };

    // ✅ Envoi des données au serveur
    fetch("http://localhost:8000/add-car.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse back :", data);
        if (data.success) {
          alert("✅ Véhicule ajouté avec succès !");
          window.location.href = "/"; // Redirection (à adapter si besoin)
        } else {
          alert("❌ Erreur : " + JSON.stringify(data.errors || data.message));
        }
      })
      .catch((err) => {
        alert("❌ Erreur de communication : " + err);
      });
  });
}
