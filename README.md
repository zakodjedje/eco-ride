# eco-ride
site test vitrine pour l'application ecoride

# installation
installation bootstrap npm
creation .gitignore
ajout css, java, et icon
creation dossier SCSS
creation fichier _custom.css
import@ du fichier _custom dans le fichier main.css 

# création d'une branche
git checkout -b developpement

# etape
changement variable couleur, variable police
header bootstrap
footer/ appliquer une position relative au html, et une absolu au footer
faire la page acceuil mettre ne backgroun en cover et en center center
creer la page select covoit, intégré a allroutes, et remplacer les boutons qui redirige vers cette page
intégre les cards qui vont représenté les profils des candidats
on fait la page connexion signin, on ajoute la route dans allroutes
on fait la page connexion signup, on ajoute la route dans allroutes
creation de la page espaces mon compte avec tout les paramettres
creation de la page covoiturage avec sa barre de recherche 
creation de la page detail covoit
ajout modale sur page detail convoit
complété une fonctionnalité de la page mon compte, (demarage d'une course) et rajouter une modale pour le -2 credit + liste de vehicule
page historique covoit "tout mes covoit"
page de fin de trajet
page des avis deposé avec card et detail de precision de course avec la modal detail
page administrateur, avec graphique et gestion compte employer
vérification des champ de formulaire avec JS PAGE SIGNUP/ cree dossier js et dossier auth, puis fichier signup.js
spécification de champ de formulaire email, regex et foncton validateMail
desactivation du button inscription si champs non remplis, rajoue du return dans les fonctions, pour recuperer les boolens des champs, class feed-back ajouté html
confirmation du champ confirmation mot de passe en js
mettre en place un systeme de connexion en dur, creation page signin.js
creation fichier script.js pour gerer les cookies/ creation function getToken, setToken
implémentation pour savoir si on es connecté, function isConnected*
implémentation décconexion, en supprimant le cookie accestoken
affichage du bouton conenxion deconnexion en function de l'etat de connexion : les roles, visiteur utilisateur employer adminitstrateur data-show
gerer les failles de sécurité d'acces a certaine page sans author