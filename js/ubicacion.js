//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;
let lugaresCercanos = [];
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

//Declaramos la funcion encuentrame
async function obtenerLugaresCercanos() {
  return new Promise(async (resolve, reject) => {
    try {
      // Crea una instancia del servicio de Places
      const service = new google.maps.places.PlacesService(map);
      let lugaresCercanos = [];

      for (const placeId of gimnasiosIds) {
        // Hacer una solicitud al servidor para obtener los detalles del lugar
        const place = await obtenerDetallesLugar(service, placeId);

        // Calcula la distancia entre la ubicación del usuario y el lugar
        const distance = calcularDistancia(
          userLocation,
          place.geometry.location
        );

        // Filtra los lugares que están a menos de 500 metros de distancia
        if (distance <= 10000) {
          // Agrega el lugar a la lista de lugares cercanos
          lugaresCercanos.push(place);
        }
      }

      // Muestra los lugares cercanos en la consola
      console.log(lugaresCercanos);

      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
}

function obtenerDetallesLugar(service, placeId) {
  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId: placeId,
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(new Error(`Error al obtener detalles del lugar: ${status}`));
        }
      }
    );
  });
}

async function encuentrame() {
  return new Promise((resolve, reject) => {
    // Si podemos utilizar la geolocalización, entramos al if
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Obtenemos la latitud y la longitud del USUARIO
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            userLocation = { lat: latitud, lng: longitud };

            // Pintamos el mapa en el documento HTML con los valores obtenidos de lat y lng
            map = new google.maps.Map(document.getElementById("map"), {
              center: userLocation,
              zoom: 12,
            });

            // Colocar un marcador en la ubicación del usuario
            let marker = new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Mi ubicación",
            });

            // Espera a que se completen todas las solicitudes de lugares cercanos
            await obtenerLugaresCercanos();

            resolve();
          } catch (error) {
            console.error(error);
            reject();
          }
        },
        () => {
          // Si hay un error al obtener la ubicación del usuario, mostrar un mensaje de error en la consola
          console.log("Error: The Geolocation service failed.");
          reject();
        }
      );
    } else {
      // Si el navegador no admite la API Geolocation, mostrar un mensaje de error en la consola
      console.log("Error: Your browser doesn't support geolocation.");
      reject();
    }
  });
}

window.encuentrame = encuentrame;
