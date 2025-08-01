import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html",[]),
    new Route("/selectcovoit", "Selection", "/pages/selectcovoit.html",[]),
    new Route("/signin", "connexion", "/pages/signin.html",["disconnected"],"/js/auth/signin.js"),
    new Route("/signup", "inscription", "/pages/signup.html",["disconnected"],"/js/auth/signup.js"),
    new Route("/account", "mon compte", "/pages/account.html",["utilisateur", "employer"]),
    new Route("/covoiturage", "covoiturage", "/pages/covoiturage.html",[],"/js/auth/covoiturage.js"),
    new Route("/detailCovoit", "detail", "/pages/detailCovoit.html",[],""),
    new Route("/mesCovoits", "Mes covoits", "/pages/mesCovoits.html",["utilisateur","employer"]),
    new Route("/finTrajet", "fin de trajet", "/pages/finTrajet.html",["utilisateur","employer"]),
    new Route("/avis", "les avis", "/pages/avis.html",["employer"]),
    new Route("/admin", "administrateur", "/pages/admin.html",["admin"]),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide"; 