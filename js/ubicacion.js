//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;

class gimnasio {
  constructor(nombre, latitud, longitud) {
    this.nombre = nombre;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}

//Declaramos la funcion encuentrame
function encuentrame() {
  //Si podemos utilizar la geolocalizacion entramos al if
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //Obtenemos la latitud y la longitud del USUARIO
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;

        const gyms = [
          new Gimnasio("Smart Fit Lomas de Sotelo", 19.458296, -99.211371),
          new Gimnasio("Smart Fit Satélite", 19.500557, -99.234313),
          new Gimnasio("Smart Fit Lindavista", 19.483128, -99.127689),
          new Gimnasio("Smart Fit San Ángel", 19.343288, -99.199297),
          new Gimnasio("Smart Fit Coyoacán", 19.341679, -99.157671),
          new Gimnasio("Smart Fit Del Valle", 19.386638, -99.166833),
          new Gimnasio("Smart Fit Pedregal", 19.314438, -99.207072),
          new Gimnasio("Smart Fit Plaza Universidad", 19.358486, -99.170764),
          new Gimnasio("Smart Fit Tlalpan", 19.285532, -99.173706),
          new Gimnasio("Smart Fit Plaza Aragón", 19.575296, -99.069106),
          new Gimnasio("Smart Fit Aragón", 19.474196, -99.056624),
          new Gimnasio("Smart Fit Buenavista", 19.447587, -99.154021),
          new Gimnasio("Smart Fit Cuitláhuac", 19.475731, -99.157674),
          new Gimnasio("Smart Fit Coapa", 19.288972, -99.129038),
          new Gimnasio("Smart Fit Azcapotzalco", 19.485161, -99.186182),
          new Gimnasio("Smart Fit Condesa", 19.414625, -99.175474),
          new Gimnasio("Smart Fit División del Norte", 19.351913, -99.157799),
          new Gimnasio("Smart Fit Gran Sur", 19.300376, -99.175406),
          new Gimnasio("Smart Fit Insurgentes", 19.393825, -99.174277),
          new Gimnasio("Smart Fit Revolución", 19.386797, -99.187973),
          new Gimnasio("Smart Fit San Antonio", 19.332506, -99.195058),
          new Gimnasio("Smart Fit Santa Fe", 19.362187, -99.265831),
          new Gimnasio("Smart Fit Universidad", 19.324962, -99.176038),
          new Gimnasio("Smart Fit Vía Vallejo", 19.479407, -99.157401),
          new Gimnasio("Smart Fit Villa Coapa", 19.301433, -99.125843),
        ];

        // Pintamos el mapa en el documento HTML con los valores obtenidos de lat y lng
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: latitud, lng: longitud },
          zoom: 15,
        });

        document.getElementById("busqueda").value = "Smart Fit";

        //Colocar un marcador en la ubicación del usuario
        let marker = new google.maps.Marker({
          position: { lat: latitud, lng: longitud },
          map: map,
          title: "Mi ubicación",
        });
      },
      function () {
        // Si hay un error al obtener la ubicación del usuario, mostrar un mensaje de error en la consola
        console.log("Error: The Geolocation service failed.");
      }
    );
  } else {
    //Si el navegador no admite la API Geolocation, mostrar un mensaje de error en la consola
    console.log("Error: Your browser doesn't support geolocation.");
  }
}

window.encuentrame = encuentrame;
