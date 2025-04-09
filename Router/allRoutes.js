import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/selectcovoit", "Selection", "/pages/selectcovoit.html"),
    new Route("/signin", "connexion", "/pages/signin.html"),
    new Route("/signup", "inscription", "/pages/signup.html"),
    new Route("/account", "mon compte", "/pages/account.html"),
    new Route("/covoiturage", "covoiturage", "/pages/covoiturage.html"),
    new Route("/detailCovoit", "detail", "/pages/detailCovoit.html"),
    new Route("/mesCovoits", "Mes covoits", "/pages/mesCovoits.html"),
    new Route("/finTrajet", "fin de trajet", "/pages/finTrajet.html"),
    new Route("/avis", "les avis", "/pages/avis.html"),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";