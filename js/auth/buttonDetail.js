document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get("id"); // par exemple : detailCovoit.html?id=2

  if (!carId) {
    console.error("Aucun ID trouvé dans l'URL.");
    return;
  }

  fetch(`http://localhost:8000/get-car.php?id=${carId}`)

    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Injecter la voiture dynamiquement dans l'élément existant
        const carContainer = document.querySelector("#carName");

        if (carContainer) {
          carContainer.innerHTML = `${data.car.brand} ${data.car.model} <i class="bi bi-ev-front-fill"></i>`;
        } else {
          console.warn("L'élément #carName est introuvable.");
        }
      } else {
        console.error("Erreur côté serveur :", data.message);
      }
    })
    .catch(error => {
      console.error("Erreur fetch :", error);
    });
});

