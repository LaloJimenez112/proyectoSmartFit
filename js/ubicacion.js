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
async function encuentrame() {
  //Si podemos utilizar la geolocalizacion entramos al if
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      //Obtenemos la latitud y la longitud del USUARIO
      const latitud = position.coords.latitude;
      const longitud = position.coords.longitude;

      const gyms = [
        new gimnasio("Smart Fit Lomas de Sotelo", 19.458296, -99.211371),
        new gimnasio("Smart Fit Satélite", 19.500557, -99.234313),
        new gimnasio("Smart Fit Lindavista", 19.483128, -99.127689),
        new gimnasio("Smart Fit San Ángel", 19.343288, -99.199297),
        new gimnasio("Smart Fit Coyoacán", 19.341679, -99.157671),
        new gimnasio("Smart Fit Del Valle", 19.386638, -99.166833),
        new gimnasio("Smart Fit Pedregal", 19.314438, -99.207072),
        new gimnasio("Smart Fit Plaza Universidad", 19.358486, -99.170764),
        new gimnasio("Smart Fit Tlalpan", 19.285532, -99.173706),
        new gimnasio("Smart Fit Plaza Aragón", 19.575296, -99.069106),
        new gimnasio("Smart Fit Aragón", 19.474196, -99.056624),
        new gimnasio("Smart Fit Buenavista", 19.447587, -99.154021),
        new gimnasio("Smart Fit Cuitláhuac", 19.475731, -99.157674),
        new gimnasio("Smart Fit Coapa", 19.288972, -99.129038),
        new gimnasio("Smart Fit Azcapotzalco", 19.485161, -99.186182),
        new gimnasio("Smart Fit Condesa", 19.414625, -99.175474),
        new gimnasio("Smart Fit División del Norte", 19.351913, -99.157799),
        new gimnasio("Smart Fit Gran Sur", 19.300376, -99.175406),
        new gimnasio("Smart Fit Insurgentes", 19.393825, -99.174277),
        new gimnasio("Smart Fit Revolución", 19.386797, -99.187973),
        new gimnasio("Smart Fit San Antonio", 19.332506, -99.195058),
        new gimnasio("Smart Fit Santa Fe", 19.362187, -99.265831),
        new gimnasio("Smart Fit Universidad", 19.324962, -99.176038),
        new gimnasio("Smart Fit Vía Vallejo", 19.479407, -99.157401),
        new gimnasio("Smart Fit Villa Coapa", 19.301433, -99.125843),
      ];

      // Pintamos el mapa en el documento HTML con los valores obtenidos de lat y lng
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitud, lng: longitud },
        zoom: 14,
      });

      //Colocar un marcador en la ubicación del usuario
      const marker = new google.maps.Marker({
        position: { lat: latitud, lng: longitud },
        map: map,
        title: "Mi ubicación",
      });
    } catch (error) {
      // Si hay un error al obtener la ubicación del usuario, mostrar un mensaje de error en la consola
      console.log("Error: The Geolocation service failed.");
    }
  } else {
    //Si el navegador no admite la API Geolocation, mostrar un mensaje de error en la consola
    console.log("Error: Your browser doesn't support geolocation.");
  }
}

document.getElementById("busqueda").value = "Smart Fit";
window.encuentrame = encuentrame;
