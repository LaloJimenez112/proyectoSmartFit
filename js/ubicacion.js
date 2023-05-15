//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;

//Declaramos la funcion encuentrame
function encuentrame() {
  //Si podemos utilizar la geolocalizacion entramos al if
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //Obtenemos la latitud y la longitud del USUARIO
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;

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
