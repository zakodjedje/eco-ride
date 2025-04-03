import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/selectcovoit", "Selection", "/pages/selectcovoit.html"),
    new Route("/signin", "connexion", "/pages/signin.html"),
    new Route("/signup", "inscription", "/pages/signup.html"),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";