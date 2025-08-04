import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";
// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html",[]);
// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};
// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);

  //Vérifier les droits d'acces a la page
  const allRolessArray =actualRoute.authorize;
  if(allRolessArray.length > 0){
    if(allRolessArray.includes("disconnected")){
      if (isConnected()){
        window.location.replace("/");
      }
    }
    else {
      const roleUser =getRole();
      if(!allRolessArray.includes(roleUser)){
        window.location.replace("/");
      }
    }
  }

  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML à l'élément avec l'ID "main-page"
  
  document.getElementById("main-page").innerHTML = html;

if (actualRoute.pathJS) {
  import(actualRoute.pathJS).then(module => 
    {
    if (actualRoute.url === "/covoiturage" 
      && typeof module.initCovoiturage === "function") {
      module.initCovoiturage();
    }
  });
}



  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;

  //Afficher et masquer les élements en fonction du rôle
  showAndHideElementsForRoles();

};
// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  // Mise à jour de l'URL dans l'historique du navigateur
  window.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};
// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();