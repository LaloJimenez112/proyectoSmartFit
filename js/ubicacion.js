//Definimos las variables globales al alcance de todas las funciones
let map;
let latitud;
let longitud;
let lugaresCercanos = [];
let gym;
let misGym = [];
let seccion = document.getElementById("mostrarInfo");
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

//CLASE GIMNASIO
class gimnasios {
  constructor(latitud, longitud, placeId, distancia) {
    this.latitud = latitud;
    this.longitud = longitud;
  }
  //METODOS
  asignarPlaceId(placeId) {
    this.placeId = placeId;
  }
  asignarDistancia(distancia) {
    this.distancia = distancia;
  }
}

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
            //console.log(status);
            // Calcula la distancia entre la ubicación del usuario y el lugar
            //console.log(userLocation);
            const distance = calcularDistancia(
              userLocation,
              place.geometry.location
            );

            //Agregamos atributos a los objetos de tipo gimnasio
            gym = new gimnasios(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
            gym.asignarDistancia(distance);
            gym.asignarPlaceId(placeId);

            lugaresCercanos.push(gym);
            // console.log(lugaresCercanos);
          }
        });
      });

      resolve(lugaresCercanos);
    });
  }, 1000);
}

// Definimos una función para calcular la distancia entre dos puntos en un plano
function calcularDistancia(usuarioUbicacion, gimnasioUbicacion) {
  // console.log(
  //   gimnasioUbicacion.lat(),
  //   gimnasioUbicacion.lng(),
  //   usuarioUbicacion.lat,
  //   usuarioUbicacion.lng
  // );

  const uUAuxiliarLat = usuarioUbicacion.lat * (Math.PI / 180);
  const uUAuxiliarLng = usuarioUbicacion.lng * (Math.PI / 180);
  const gUAuxiliarLat = gimnasioUbicacion.lat() * (Math.PI / 180);
  const gUAuxiliarLng = gimnasioUbicacion.lng() * (Math.PI / 180);

  const difLatitudes = uUAuxiliarLat - gUAuxiliarLat;
  const difLongitudes = uUAuxiliarLng - gUAuxiliarLng;

  const operando1 = Math.sin(difLatitudes / 2);
  const operando2 = Math.sin(difLongitudes / 2);

  const a =
    operando1 ** 2 +
    Math.cos(uUAuxiliarLat) * Math.cos(gUAuxiliarLat) * operando2 ** 2;
  const b = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const c = 6371000 * b; //DISTANCIA EN METROS, ESTE METODO ME LO PROPORCIONO CHATGPT

  return c;
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
      lugaresCercanos.sort((a, b) => a.distancia - b.distancia);
      console.log("Terminando funcion obtener lugares cercanos");
      lugaresCercanos.forEach((lugar) => {
        console.log(lugar);
      });

      for (i = 0; i <= 2; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: lugaresCercanos[i].latitud,
            lng: lugaresCercanos[i].longitud,
          },
          map: map,
          title: `Gimansio ${i + 1}`,
        });
      }

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
  await checarAsistencia();
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

function mostrarGymnasiosExtras() {
  document.getElementById("mostrarInfo").style.display = "block";
  misGym.forEach((gyms) => {
    opcionGym = `
      <div>
      <p class="GymTexto">
      Nombre: ${gyms.nombre},
      Direccion: ${gyms.direccion},
      Img: ${gyms.srcfoto}
      </p>
      </div>
    `;
    seccion.innerHTML += opcionGym;
  });
}

function ocultar() {
  document.getElementById("mostrarInfo").style.display = "none";
}

async function actualizarAsistencia() {
  let despliegue = "";
  for (let x = 0; x < 3; x++) {
    const numero = Math.floor(Math.random() * (85 - 15 + 1) + 15);
    let y = x + 1;
    despliegue +=
      "<ul>" +
      "<li>Gimnasio " +
      y +
      ": " +
      numero +
      " personas" +
      "</li>" +
      "</ul>";
  }

  document.getElementById("impresion").innerHTML = despliegue;
}

async function checarAsistencia() {
  await actualizarAsistencia();
  setInterval(actualizarAsistencia, 30000);
}

class gymVarios {
  constructor(nombre, direccion, srcfoto, foto) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.foto = new Image();
    this.foto.src = srcfoto;
  }
}

lindavista = new gymVarios(
  "SmartFit Lindavista",
  "Av. Miguel Othón de Mendizábal Ote. 343, Nueva Industrial Vallejo, Gustavo A. Madero, 07700 Ciudad de México, CDMX",
  "./img/GYM1.jpeg"
);
independencia = new gymVarios(
  "SmartFit Independencia",
  "Independencia No. 40 - Centro Ciudad de México, CDMX - 06010",
  "./img/GYM2.jpeg"
);
santFe = new gymVarios(
  "SmartFit Santa Fe",
  "Dirección: Av. Vasco de Quiroga 3900, Santa Fe, 05348 Ciudad de México, CDMX.",
  "./img/GYM3.jpeg"
);
polanco = new gymVarios(
  "SmartFit Polanco",
  "Dirección: Av. Ejército Nacional 418, Polanco V Secc, 11560 Ciudad de México, CDMX.",
  "./img/GYM4.jpeg"
);
roma = new gymVarios(
  "SmartFit Roma",
  "Dirección: Álvaro Obregón 180, Roma Nte., 06700 Ciudad de México, CDMX.",
  "./img/GYM5.jpeg"
);
insur = new gymVarios(
  "SmartFit Insurgente",
  "Dirección: Insurgentes Sur 1248, Tlacoquemecatl del Valle, 03200 CDMX.",
  "./img/GYM6.jpeg"
);
coyoacan = new gymVarios(
  "SmartFit Coyoacan",
  "Dirección: Av. Universidad 1372, Santa Cruz Atoyac, 03310 Ciudad de México, CDMX.",
  "./img/GYM7.jpeg"
);
doct = new gymVarios(
  "SmartFit Doctores",
  "Dirección: Doctor Liceaga 7 - Doctores Doctor Liceaga 7 - Doctores Ciudad de México, CDMX - 06720",
  "./img/GYM8.jpeg"
);
refor = new gymVarios(
  "SmartFit Reforma",
  "Dirección: PASEO DE LA REFORMA 26 NIVEL 1 - JUÁREZ Ciudad de México, CDMX - 06600",
  "./img/GYM9.jpeg"
);
aero = new gymVarios(
  "SmartFit Aeropuerto",
  "Calz. Ignacio Zaragoza 270, Santa Cruz Aviación, Venustiano Carranza, 15540 Ciudad de México, CDMX",
  "./img/GYM10.jpeg"
);

tlate = new gymVarios(
  "SmartFit Tlatelolco",
  "Av. Ricardo Flores Magón 210 - Guerrero Ciudad de México,06300",
  "./img/GYM10.jpeg"
);

universidad = new gymVarios(
  "SmartFit Universidad",
  "Dirección: Alfonso Reyes 5, Hipódromo Condesa, Cuauhtémoc, 06170 Ciudad de México, CDMX",
  "./img/GYM11.jpeg"
);
condesa = new gymVarios(
  "SmartFit Condesa",
  "Dirección: Av. Universidad 645, Col del Valle Centro, Benito Juárez, 03100 Ciudad de México, CDMX.",
  "./img/GYM12.jpeg"
);
tlalnepantla = new gymVarios(
  "SmartFit Tlalnepantla",
  "Dirección: Av. Gustavo Baz Prada 401, Industrial San Nicolas, 54030 Tlalnepantla de Baz, Méx.",
  "./img/GYM13.jpeg"
);
coapa = new gymVarios(
  "SmartFit Coapa",
  "Dirección: Benito Juárez 117, Coapa, Ex-Hacienda Coapa, Coyoacán, 04850 Ciudad de México, CDMX",
  "./img/GYM14.jpeg"
);
aragon = new gymVarios(
  "SmartFit Plaza Aragon",
  "Dirección: Av Plazas de Aragon 1 - Joyas de Aragón Ciudad Nezahualcoyotl, Edo MEX - 57139",
  "./img/GYM15.jpeg"
);
texcoco = new gymVarios(
  "SmartFit Gran Patio Texcoco",
  "Dirección: AVENIDA MIGUEL HIDALGO S/N PB J-06, 56120 Texcoco, Méx.",
  "./img/GYM16.jpeg"
);
satelite = new gymVarios(
  "SmartFit Satélite",
  "Dirección: Perif. Blvd. Manuel Ávila Camacho 2150, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
  "./img/GYM17.jpeg"
);
satelite = new gymVarios(
  "SmartFit Satélite",
  "Dirección: Perif. Blvd. Manuel Ávila Camacho 2150, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
  "./img/GYM18.jpeg"
);
antenas = new gymVarios(
  "SmartFit Antenas",
  "Dirección: Av. Canal de Garay 3278, Tulyehualco Canal de Garay, Iztapalapa, 09910 Ciudad de México, CDMX.",
  "./img/GYM19.jpeg"
);
tlalilco = new gymVarios(
  "SmartFit Tlatilco",
  "Dirección: Calzada Melchor Ocampo 193, 11300 Ciudad De México, Mex.",
  "./img/GYM20.jpeg"
);
viga = new gymVarios(
  "SmartFit La Viga",
  "Dirección: Calzada de la viga No. 1174 - Militar Marte Ciudad de México, CDMX - 09430.",
  "./img/GYM21.jpeg"
);
rosa = new gymVarios(
  "SmartFit Zona Rosa",
  "Dirección: Puebla No. 326, Colonia Roma Norte, Ciudad de Mexico, CDMX - 06700.",
  "./img/GYM22.jpeg"
);
tepotzotlan = new gymVarios(
  "SmartFit Tepotzotlán",
  "Dirección: Av. Huehuetoca esq. Avenida Jiménez Cantú, Mz. 23 - Fracc. ExHacienda San Miguel Cuautitlán Izcalli, Edo MEX - 54715.",
  "./img/GYM23.jpeg"
);
interlomas = new gymVarios(
  "SmartFit Interlomas",
  "Dirección: Boulevard Magnocentro No 35 - Centro Urbano San Fernando la Herradura Huixquilucan de Degollado, Edo MEX - 527605.",
  "./img/GYM24.jpeg"
);
centro = new gymVarios(
  "SmartFit Centro Histórico",
  "Dirección: Independencia No. 40 - Centro Ciudad de México, CDMX - 06010.",
  "/.img/GYM25.jpeg"
);
metepec = new gymVarios(
  "SmartFit Metepec",
  "Dirección: Prol. Guadalupe Victoria No. 601 NORTE - Purisima Metepec, Edo MEX - 50100.",
  "./img/GYM26.jpeg"
);
churubusco = new gymVarios(
  "SmartFit Churubusco",
  "Dirección: Av. Río Churubusco 1072 - Nueva Rosita Ciudad de México, CDMX - 09420.",
  "./img/GYM27.jpeg"
);
ermita = new gymVarios(
  "SmartFit Ermita",
  "Dirección: Calz. Ermita Iztapalapa No. 3417 - Xalpa Ciudad de México, CDMX - 09640.",
  "./img/GYM28.jpeg"
);
mixcoac = new gymVarios(
  "SmartFit Mixcoac",
  "Dirección: Viaducto Rio de la Piedad 515 - Granjas de Mexico Ciudad de México, CDMX - 08400.",
  "./img/GYM29.jpeg"
);
delta = new gymVarios(
  "SmartFit Parque Delta",
  "Dirección: AV CUAUHTEMOC 462 - NARVARTE Ciudad de México, CDMX - 03020.",
  "./img/GYM30.jpeg"
);
miramontes = new gymVarios(
  "SmartFit Miramontes",
  "Dirección: Canal de Miramontes 2053, Coapa, Girasoles III, Coyoacán, 04920 Ciudad de México, CDMX.",
  "./img/GYM31.jpeg"
);
ajusco = new gymVarios(
  "SmartFit Ajusco",
  "Dirección: Equipamiento Periférico Picacho Ajusco Canal 13 175, 14140 Ciudad de México, CDMX.",
  "./img/GYM32.jpeg"
);
toreo = new gymVarios(
  "SmartFit Toreo",
  "Dirección: Colonia, Miguel Hidalgo, 11220 Ciudad de México, CDMX.",
  "./img/GYM33.jpeg"
);
aragon = new gymVarios(
  "SmartFit Aragón",
  "Dirección: Constitución de la República 139, Amp la Providencia, Gustavo A. Madero, 07500 Ciudad de México, CDMX",
  "./img/GYM34.jpeg"
);
antonio = new gymVarios(
  "SmartFit San Antonio",
  "Dirección: Lorenzo Boturini 258 - Transito Ciudad de México, CDMX - 06820.",
  "./img/GYM35.jpeg"
);
cosme = new gymVarios(
  "SmartFit San Cosme",
  "Dirección: Av. Río Churubusco 1072, Los Picos VI B, Iztapalapa, 09420 Ciudad de México, CDMX",
  "./img/GYM36.jpeg"
);
misGym.push(
  lindavista,
  independencia,
  santFe,
  polanco,
  roma,
  insur,
  coyoacan,
  doct,
  refor,
  aero,
  tlate,
  universidad,
  condesa,
  tlalnepantla,
  coapa,
  aragon,
  texcoco,
  satelite,
  antenas,
  tlalilco,
  viga
);
