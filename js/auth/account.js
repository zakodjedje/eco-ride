// js/auth/account.js
import { initAddCarForm } from './addCar.js';
import { initAddTripForm, loadUserVehicles } from './add-trip.js';

export function initAccountPage() {
  console.log('🔧 Initialisation de la page mon compte');
  initAddCarForm();
  initAddTripForm();

  // Charger la liste de véhicules dans le <select> via loadUserVehicles
  loadUserVehicles();

  // Charger et afficher les véhicules dans la section "mes véhicules"
  fetch('http://localhost:8000/get-user-cars.php', {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        populateUserVehiclesList(data.cars);
      } else {
        console.warn(data.message);
      }
    })
    .catch(err => console.error('Erreur lors du chargement des véhicules :', err));
}

function populateUserVehiclesList(cars) {
  const container = document.querySelector('.list-group');

  // Supprimer les anciennes entrées (sauf le titre "mes véhicules")
  container.querySelectorAll('a.list-group-item').forEach(item => item.remove());

  if (Array.isArray(cars) && cars.length > 0) {
    cars.forEach((car, index) => {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'list-group-item list-group-item-action' + (index === 0 ? ' active' : '');
      item.textContent = `${car.brand} ${car.model}`;
      container.appendChild(item);
    });
  } else {
    // Optionnel : afficher un message si l’utilisateur n’a pas de véhicule enregistré
    const item = document.createElement('p');
    item.className = 'text-muted';
    item.textContent = 'Aucun véhicule enregistré.';
    container.appendChild(item);
  }
}
