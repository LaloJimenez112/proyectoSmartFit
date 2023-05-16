//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;
let lugaresCercanos = [];
//Cremaos una variable donde almacenamos la ubicacion del usuario
let userLocation;

//LISTA DE GIMNASIOS EN LA CDMX
const gimnasiosIds = [
  "ChIJtRKjR83-0YURSRoKZak2sSs",//Zocalo
  "ChIJsT3Hgdb-0YURN-n3sjWWlUI"//Salto del agua
];


//Declaramos la funcion encuentrame
async function encuentrame() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      //Si podemos utilizar la geolocalizacion entramos al if
      if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position) {
              
            //Obtenemos la latitud y la longitud del USUARIO
            latitud = position.coords.latitude
            longitud = position.coords.longitude
            userLocation = {lat: latitud, lng: longitud};
                
            map = new google.maps.Map(document.getElementById('map'));
            map.setCenter(userLocation);
            map.setZoom(12)

            //Colocar un marcador en la ubicación del usuario
            let marker = new google.maps.Marker({
                position: userLocation,
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

          resolve();

      },1000);
    });
    
}

async function obtenerLugaresCercanos(){
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      // Crea una instancia del servicio de Places
      map = new google.maps.Map(document.getElementById('map'));
      console.log(map)
      
      const service = new google.maps.places.PlacesService(map);

      gimnasiosIds.forEach((placeId) => {
        service.getDetails({placeId: placeId,},
            (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(status)
                // Calcula la distancia entre la ubicación del usuario y el lugar
                console.log(userLocation);
                const distance = calcularDistancia(userLocation, place.geometry.location);
                
                // //PINTAR EL LUGAR
                // let marker = new google.maps.Marker({
                //   position: {lat: place.geometry.location.lat(), lng:place.geometry.location.lng()},
                //   map: map,
                //   title: 'Gimansio'
                // });

                // Filtra los lugares que están a menos de 500 metros de distancia*****
                if (distance <= 10000) {
                  // Agrega el lugar a tu lista de lugares cercanos
                  lugaresCercanos.push(place);
                  console.log(lugaresCercanos)
                }
              }
            }
          );
        });

        resolve(lugaresCercanos);
      });
    }, 1000);   
}


// Definimos una función para calcular la distancia entre dos puntos en un plano
function calcularDistancia(usuarioUbicacion, gimnasioUbicacion) {
  console.log(
    gimnasioUbicacion.lat(),
    gimnasioUbicacion.lng(),
    usuarioUbicacion.lat,
    usuarioUbicacion.lng
  )
  const distanciaX = gimnasioUbicacion.lat() - usuarioUbicacion.lat;
  const distanciaY = gimnasioUbicacion.lng() - usuarioUbicacion.lng;
  return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
}

// function filtrarLugaresPorDistancia(places, maximaDistancia) {
//   return places.filter((place) => {
//     const distance = calcularDistancia(userLocation, place.geometry.location);
//     return distance <= maximaDistancia;
//   });
// }

async function pruebas(){
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      console.log('Terminando funcion obtener lugares cercanos');
      lugaresCercanos.forEach((lugar) => {
        console.log(lugar);
      });
      resolve();
    }, 1000)
   
  });
}

async function main (){
  console.log('Iniciando main')
  await encuentrame();
  console.log('Ya se obtuvo la ubicacion del usuario');
  await obtenerLugaresCercanos();
  await pruebas();
  
}

window.main = main;
// window.addEventListener('load', main)

//Primero identar el codigo(OPCIONAL)
//Eliminar el filtrado por distancia
//Buscar los elementos que tengan la menor distancia
//{placeId: "", distancia: ""}
//Agregar en una lista 
//Ordenar esa lista del menor al mayor
//Pintar los primeros 3 obetos de esa lista con un marcador diferenciado
//Por color o forma lo que sea...

//Crear conectividad entre pantallas
//Reestilizar el mapa
//Agregar la opcion de ver mas gimnasios

//Simulacion de usuarios en el gimnasio 
//Y determinar cual de los primeros 3 gimnasios es el mas bueno.
