//const { response } = require("express")
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'master',
  password: '12345',
  database: 'GYM'
});

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login/:usuarioId/:password", (req, res) => {

    const usuarioId = req.params.usuarioId || ""
    const password = req.params.password || ""

    console.log(usuarioId, password);

    connection.connect((error) => {
        if (error) {
          console.error('Error de conexión: ' + error.stack);
          return;
        }
        console.log('Conexión a la base de datos exitosa');
    });

    connection.query(`SELECT usuarioUsuario, contrasenaUsuario FROM usuario WHERE usuarioUsuario = '${usuarioId}' && contrasenaUsuario = '${password}'`, function (error, results, fields) {
        if (error) {
          console.log('Hubo un error: ' + error);
        }
        else if( results.length > 0){
          res.setHeader("Access-Control-Allow-Origin", "*")
          res.send({respuesta: 'encontrado'})
        }
        else {
          res.setHeader("Access-Control-Allow-Origin", "*")
          res.send({respuesta: 'error'})
        }
    });

    //
})

app.listen(8080, () => {
    console.log("Servidor en marcha")
})