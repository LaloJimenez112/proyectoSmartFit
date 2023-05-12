let mapa = document.getElementById("map");

function findMe() {

    navigator.geolocation.getCurrentPosition(localizacion, error);

}

function localizacion(posicion) {
    var latitude = posicion.coords.latitude;
    var longitude = posicion.coords.longitude;

    var imgURL =
    "http://maps.googleapis.com/maps/api/staticmap?center=" +
    latitude +
    "," +
    longitude +
    "&size=600x300&markers=color:red%7C" +
    latitude +
    "," +
    longitude +
    "&key=AIzaSyCVSBSK7GmEP4ghf2CdjIKMq970YfX2SUo";

    mapa.innerHTML =
    "<p>Latitude: " + latitude + "<br>Longitud: " + longitude + "</p>";
    mapa.innerHTML = "<img src='" + imgURL + "'>";
}

function error() {
    mapa.innerHTML = "<p>No se pude obtener tu posicion</p>";
}
