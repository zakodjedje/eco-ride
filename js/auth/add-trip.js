// js/auth/add-trip.js
console.log('🚀 Initialisation du module add-trip.js');

export function loadUserVehicles() {
  console.log('📥 Chargement des véhicules utilisateur…');

  fetch('http://localhost:8000/get-user-cars.php',{
    credentials: 'include' // 👉 envoie le cookie de session
  }

  )
    .then(response => response.json())
    .then(data => {
      console.log('📄 Véhicules récupérés :', data);

      const select = document.getElementById('trip-vehicle-select');
      if (!select) {
        console.error('❌ Le select #trip-vehicle-select est introuvable.');
        return;
      }

      select.innerHTML = '';
      // Si data.success est true, data.cars doit être un tableau
      const cars = data.cars || [];

      if (Array.isArray(cars) && cars.length > 0) {
        cars.forEach(car => {
          const option = document.createElement('option');
          option.value = car.id;
          option.textContent = `${car.brand} ${car.model} (${car.plate ?? ''})`;
          select.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.textContent = 'Aucun véhicule disponible';
        select.appendChild(option);
      }
    })
    .catch(err => console.error('❌ Erreur lors de la récupération des véhicules :', err));
}


export function initAddTripForm() {
  console.log('📄 Initialisation du formulaire ajout de trajet');

  // charge les véhicules pour remplir le select
  loadUserVehicles();

  const form = document.getElementById('form-ajout-trip');
  if (!form) {
    console.error('❌ Le formulaire #form-ajout-trip n\'existe pas dans le DOM');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    fetch('http://localhost:8000/add-trip.php', {
      method: 'POST',
      body: formData
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          console.log('✅ Trajet ajouté :', data);
          alert('Trajet ajouté avec succès !');
          form.reset();
        } else {
          console.error('❌ Problème lors de l’ajout du trajet :', data.message);
        }
      })
      .catch(err => console.error('❌ Erreur lors de l\'ajout du trajet :', err));
  });
}
