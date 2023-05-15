//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;
let lugaresCercanos = [];
//Cremaos una variable donde almacenamos la ubicacion del usuario
let userLocation;

//LISTA DE GIMNASIOS EN LA CDMX
const gimnasiosIds = [
  "ChIJXQvClg8QzYURAZxyA4ewNfw", //Sana fe ...
  "ChIJtbvN6D8B0oUR5gZ4rbPbi9o",
  "ChIJ0w-Qhq3_0YURVJj7TgjzgOw",
  "ChIJOTKpqhcF0YUR5g7Qo1K3Tpk",
  "ChIJXezCEZbh0YUR7I0CvssnJ8c",
  "ChIJoSaKNKJn0YURva8Jmby7ld4",
  "ChIJq35ZWHoJ0YURnO9b-d0JWLU",
  "ChIJLcNUXYwU0YUR9A8WjKU5tug",
  "ChIJC9ndN3hC0oURQTflgXuvmHo",
  "ChIJkSDRvafv0YURtjquS_ADF6s",
  "ChIJfQxv9_Nn0YURdl6GmZBv3qw",
  "ChIJF-b9NNxL0YURK-n5t9R5Ac0",
  "ChIJxS1vG8Jn0YURch5qw5JEDVc",
  "ChIJ6c6y8YZm0YURrVyS6Ug4zQg",
  "ChIJj3FZdJPl0YUR83rmC6muZgA",
  "ChIJn0zUfH3_0YURn1aCqV9GJ0k",
  "ChIJv_qP_JtK0YURkhhYmkvU7iQ",
  "ChIJu3-8zjrp0YURL6wtveu5s9o",
  "ChIJ6Vx5cONo0YURDseE5xQ6t4w",
  "ChIJwUeazJcF0YURDjuNkk0iJ6c",
  "ChIJh-4JYldt0YUR-yhto6vRw1I",
  "ChIJs5cYZVf_0YURNzvc1__rlLw",
  "ChIJ6R-VQJL_0YURjjDKq0-Qh5I",
  "ChIJnVThgJ7b0YURQ97yjM3i4x8",
  "ChIJNc2jU5_y0YURBxsV-6zjCTI",
  "ChIJn6fs8ob_0YURsKzcJhtvm9A",
  "ChIJcU4yw0jN0oUR8s2Uqklqlk4",
  "ChIJu0RvGKq_0YURbcxlK1-qE3E",
  "ChIJZdGm_ze_0YUR8REe0K77p9Q",
  "ChIJJ-UvrZO_0YURdr68OBo-s94",
  "ChIJ04U2ekD_0YURadWs31DPSgg",
  "ChIJIY6Kc4v_0YURrOYiYJ3jhBs",
  "ChIJH6bzZJf_0YUR_zQ9JUGzLd8",
  "ChIJf8sB1S_10YURnGB4YPmPy0k",
  "ChIJr2jYxPqF0YURLphKMnByUd4",
  "ChIJFw1EeACv0YUR1cQ6c1ddr_c",
  "ChIJ1cakfBX_0YURynZyxvCkT5M",
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
