
function connexionForm(){
  const form = document.getElementById("form-connexion");
  if (!form) {
    console.error("❌ Formulaire de connexion introuvable !");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();


    const email = document.getElementById("EmailInput").value.trim();
    const password = document.getElementById("PasswordInput").value;

    // Préparation des données à envoyer
    const loginData = {
      email,
      password
    };
    

    // Envoi de la requête au back
    fetch("http://localhost:8000/verify-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("🔁 Réponse du back :", data);

        if (data.success) {
          alert("✅ Connexion réussie !");
          
          // Sauvegarde des infos utilisateur (optionnel selon ton système)
          localStorage.setItem("connectedUser", JSON.stringify(data.user));
          
          // Redirection vers la page d'accueil
          window.location.href = "/";
        } else {
          alert("❌ " + data.message);
        }
      })
      .catch(err => {
        console.error("❌ Erreur fetch :", err);
        alert("❌ Erreur de communication avec le serveur.");
      });
  });
}
connexionForm();