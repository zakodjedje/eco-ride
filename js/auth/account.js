// js/auth/account.js
import { initAddCarForm } from './addCar.js';
import { initAddTripForm } from './add-trip.js';

export function initAccountPage() {
  console.log('🔧 Initialisation de la page mon compte');
  // Initialise le formulaire d’ajout de voiture et de trajet
  initAddCarForm();
  initAddTripForm();

  // Ici, tu peux ajouter d’autres initialisations liées au compte (affichage des infos, etc.)
}
