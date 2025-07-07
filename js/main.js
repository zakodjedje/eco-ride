fetch('http://localhost:8000/api/trips.php')
  .then(res => res.text())
  .then(data => {
    console.log("Réponse reçue :", data);
  })
  .catch(error => {
  console.error("Erreur :", error);
  });

