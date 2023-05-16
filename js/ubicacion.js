//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;
let lugaresCercanos = [];
let gym;
//Cremaos una variable donde almacenamos la ubicacion del usuario
let userLocation;

//LISTA DE GIMNASIOS EN LA CDMX
const gimnasiosIds = [
  "ChIJQ86rPMv50YUREiHK4SYF0TQ", // lindaivtsa
  "ChIJz2aPdED_0YURfPnooqGHQyE", //parque delta
  "ChIJKw8LXsn90YURZNMz_cIGzjc", // parque tezontle
  "ChIJMdhFNR350YURCTAtB1Yt-O0", // La raza
  "ChIJ4WnwA5350YURTBfzBlcyncU",
  "ChIJH7gPaRT50YURyfqp6t_NLPo", // la villa
  "ChIJx_ipdpYB0oURG3O1yYIbsPw", //revolucion
  "ChIJ55pysJf_0YURyiDdoEhdYRQ", //Amores
  "ChIJwfQvsCABzoUR-dYEick2oYI", // gran terraza coapa
  "ChIJ3x6yQaT_0YURWW5dwIxwb_M", // universidad
  "ChIJPytfe8b_0YURe-dvUBXYRWs", //la viga
  "ChIJrepD70H_0YUR0yn1nZ4hnbY", // churubusco
  "ChIJQZ_0kBz80YUR7FCMFSjqmJU", //aeropuerto
  "ChIJr6RcObT40YURnzFhKuo26c0", // galerias
  "ChIJwSZ6V1330YUREvypStdtrdA", // tenayuca
  "ChIJke8viYT50YURVkN6kdPl4XA", // camarones
  "ChIJg-tkrHr40YURvsDvjYTXj8k", //ferreria
  "ChIJ2w-CjyD50YURAI6RCjfm83c", // claveria
  "ChIJvarZkN_50YURaBCq7oUm9t8", //diagonal cuitlahuac
  "ChIJoYkAuoz_0YURnB9eZCit4Ts", // Torre diamante
  "ChIJ_crRpyAC0oURzjW29bFuf3k", // plaza carso
  "ChIJe9ns-Izx0YURvGp7M4V0ORU", // macroplaza
  "ChIJGbQmB5Ed0oUR14_wJzlm4Wk", // Perinorte
  "ChIJgRl1Amod0oUR1-yHblKmFBE", //tlanepantla
  "ChIJSVoUV1z_0YURFz-6hd48bn8", //condesa
  "ChIJ969Uh_EC0oURDgkn2T5qPL", //las armas
  "ChIJh4aech_50YURDgzItKVkrLc", //Masaryk 169
  "ChIJT1HAfMX50YURlaQI8CEFHdA", //Reforma 99
  "ChIJC-Zu6KP_0YURpARhglNU2F0", // Reforma 222
  "ChIJh9yBmu370YURYTE7VNDgiPI", //parque tepeyac
  "ChIJ-zoI01X90YURWTSKkbJuCSA", //Ermita
  "ChIJETAZ7Jv90YUR_atlEZqvIAk", //Vicente Guerrero
  "ChIJQ5-mdvABzoURkcE5yIhD41A", // cuemanco
  "ChIJTbix1hoBzoURBzNh7q1Bz60", //Arenal
  "ChIJzbBLsFwAzoURGdbLlau4BxY", //Ciudad Azteca
  "ChIJ-Yf3i7D80YURcCW4pG5Dqdc", //Neza
  "ChIJb-AWbGb70YURavwop6wZhyg", // Neza Norte
  "ChIJM55AAKId0oURFiHIiMvufz8", // multiplaza arboledas
  "ChIJZYZRJzT_0YUR_wigGMN6lzQ", // Genova
  "ChIJX8O-B1H_0YUR3aOfu5H8KFA", //Doctores
  "ChIJFdiOvW3_0YURVWxXVVDLC3s", //Insurgentes
  "ChIJOxuZuZr_0YURXwwXMxP0Z1Y", //Felix Cuevas
  "ChIJO62NY9P40YURVn0V-4XUlWY", // reforma 27
  "ChIJJ-slCfj50YURuhC2kZGn8hU", //reforma 26
  "ChIJuyjdjkj_0YURX0nVgVrqkG4", // Roma norte
];

// //CLASE GIMNASIO
// class gimnasios {
//   constructor(placeId = null, distancia = null){

//   }
// //METODOS
//   asignarPlaceId(placeId){
//     this.placeId = placeId;
//   }
//   asignarDistancia(distancia){
//     this.distancia = distancia;
//   }
// }

//Declaramos la funcion encuentrame
async function encuentrame() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      //Si podemos utilizar la geolocalizacion entramos al if
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            //Obtenemos la latitud y la longitud del USUARIO
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            userLocation = { lat: latitud, lng: longitud };

            map = new google.maps.Map(document.getElementById("map"));
            map.setCenter(userLocation);
            map.setZoom(12);

            //Colocar un marcador en la ubicación del usuario
            let marker = new google.maps.Marker({
              position: userLocation,
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

      resolve();
    }, 1000);
  });
}

async function obtenerLugaresCercanos() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      // Crea una instancia del servicio de Places
      map = new google.maps.Map(document.getElementById("map"));
      console.log(map);

      const service = new google.maps.places.PlacesService(map);

      gimnasiosIds.forEach((placeId) => {
        service.getDetails({ placeId: placeId }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            // Calcula la distancia entre la ubicación del usuario y el lugar
            console.log(userLocation);
            const distance = calcularDistancia(
              userLocation,
              place.geometry.location
            );

            //Agregamos atributos a los objetos de tipo gimnasio
            // gym = new gimnasios()
            // gym.asignarDistancia(distance);
            // gym.asignarPlaceId(placeId);

            lugaresCercanos.push(gym);
            console.log(lugaresCercanos);

            // PINTAR EL LUGAR
            let marker = new google.maps.Marker({
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
              map: map,
              title: "Gimansio",
            });

            // Filtra los lugares que están a menos de 500 metros de distancia*****
            // if (distance <= 10000) {
            //   // Agrega el lugar a tu lista de lugares cercanos
            //   lugaresCercanos.push(place);
            //   console.log(lugaresCercanos)
            // }
          }
        });
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
  );
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

async function pruebas() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("Terminando funcion obtener lugares cercanos");
      lugaresCercanos.forEach((lugar) => {
        console.log(lugar);
      });
      resolve();
    }, 1000);
  });
}

async function main() {
  console.log("Iniciando main");
  await encuentrame();
  console.log("Ya se obtuvo la ubicacion del usuario");
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

// ORDENAMIENTO BURBUJA
function ordenar() {
  let distanciaMinima = lugaresCercanos[0].distancia;
  //DISTANCIA MINIMA
  //   // forEach.lugaresCercanos((lugar) => {
  //   //   if(lugar.distancia < distanciaMinima){
  //   //     distanciaMinima = lugar.distancia;
  //   //   }
  //   // })

  let a;
  let b;
  let aux;
  let i = lugaresCercanos.length();
  for (z = 0; z > i; z++) {
    a = lugaresCercanos[z];
    for (y = 1; y > i; y++) {
      b = lugaresCercanos[y];
      if (a.distancia < b.distancia) {
        aux = b.distancia;
        b.distancia = a.distancia;
        a.distancia = aux;
      }
    }
  }
}

function mostrar() {
  document.getElementById("mostrarInfo").style.display = "block";
}

function ocultar() {
  document.getElementById("mostrarInfo").style.display = "none";
}
