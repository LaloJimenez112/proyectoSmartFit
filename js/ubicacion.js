let map
let latitud
let longitud

function findMe() {

    if (navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position) {
            // Crear un objeto LatLng con la ubicación del usuario
                //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                latitud = position.coords.latitude
                longitud = position.coords.longitude
                
                // Crear el mapa con el objeto LatLng como centro
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 19.3494, lng: -99.1935},
                zoom: 13
            });
            //Colocar un marcador en la ubicación del usuario
            let marker = new google.maps.Marker({
                position: {lat: 19.3494, lng: -99.1935},
                map: map,
                title: 'Mi ubicación'
            });
        }, function() {
            // Si hay un error al obtener la ubicación del usuario, mostrar un mensaje de error en la consola
                console.log('Error: The Geolocation service failed.');
            });
    }
    else {
        //Si el navegador no admite la API Geolocation, mostrar un mensaje de error en la consola
        console.log('Error: Your browser doesn\'t support geolocation.');
    }
}

// function localizacion(posicion) {
//     var latitude = posicion.coords.latitude;
//     var longitude = posicion.coords.longitude;

//     var imgURL =
//     "http://maps.googleapis.com/maps/api/staticmap?center=" +
//     latitude +
//     "," +
//     longitude +
//     "&size=600x300&markers=color:red%7C" +
//     latitude +
//     "," +
//     longitude +
//     "&key=AIzaSyCVSBSK7GmEP4ghf2CdjIKMq970YfX2SUo";

//     mapa.innerHTML =
//     "<p>Latitude: " + latitude + "<br>Longitud: " + longitude + "</p>";
//     mapa.innerHTML = "<img src='" + imgURL + "'>";
// }

// function error() {
//     mapa.innerHTML = "<p>No se pude obtener tu posicion</p>";
// }

// //     // Función para inicializar el mapa
// //     function initMap() {
// //       // Obtener la ubicación del usuario
// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(function(position) {
// //           // Crear un objeto LatLng con la ubicación del usuario
// //           var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
// //           // Crear el mapa con el objeto LatLng como centro
// //           var map = new google.maps.Map(document.getElementById('map'), {
// //             center: latLng,
// //             zoom: 13
// //           });
// //           // Colocar un marcador en la ubicación del usuario
// //           var marker = new google.maps.Marker({
// //             position: latLng,
// //             map: map,
// //             title: 'Mi ubicación'
// //           });
// //         }, function() {
// //           // Si hay un error al obtener la ubicación del usuario, mostrar un mensaje de error en la consola
// //           console.log('Error: The Geolocation service failed.');
// //         });
// //       } else {
// //         // Si el navegador no admite la API Geolocation, mostrar un mensaje de error en la consola
// //         console.log('Error: Your browser doesn\'t support geolocation.');
// //       }
// //     }

// //   <script async defer src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap"></script>
 
function cargarAPI() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVSBSK7GmEP4ghf2CdjIKMq970YfX2SUo&callback=findMe';
    script.defer = true;
    document.body.appendChild(script);
}
  
window.onload = cargarAPI;