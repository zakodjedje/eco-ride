// js/auth/addCar.js
console.log('🚗 Initialisation du module addCar.js');

// Fonction d’initialisation du formulaire d’ajout de véhicule
export function initAddCarForm() {
  console.log('Initialisation du formulaire ajout de véhicule');

  const form = document.querySelector('#form-ajout-car');
  if (!form) {
    console.error('❌ Le formulaire #form-ajout-car n\'existe pas dans le DOM');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    try {
      // Ajuste le chemin selon la localisation de ton fichier PHP
      const response = await fetch('http://localhost:8000/add-car.php', {
        
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const result = await response.json();
      console.log('✅ Réponse addCar :', result);
      alert('Véhicule ajouté avec succès !');
      form.reset();
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout de la voiture :', error);
    }
  });
}
