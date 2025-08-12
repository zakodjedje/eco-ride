import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html",[]),
    new Route("/selectcovoit", "Selection", "/pages/selectcovoit.html",[]),
    new Route("/signin", "connexion", "/pages/signin.html",[],"/js/auth/signin.js"),
    new Route("/signup", "inscription", "/pages/signup.html",[],"/js/auth/signup.js"),
    new Route("/account", "mon compte", "/pages/account.html",[],"/js/auth/account.js"),
    new Route("/covoiturage", "covoiturage", "/pages/covoiturage.html",[],"/js/auth/covoiturage.js"),
    new Route("/detailCovoit", "detail", "/pages/detailCovoit.html",[],""),
    new Route("/mesCovoits", "Mes covoits", "/pages/mesCovoits.html",[]),
    new Route("/finTrajet", "fin de trajet", "/pages/finTrajet.html",[]),
    new Route("/avis", "les avis", "/pages/avis.html",[]),
    new Route("/admin", "administrateur", "/pages/admin.html",[]),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide"; 