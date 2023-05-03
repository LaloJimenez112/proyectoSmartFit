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
        if (error) throw error;
        console.log(results);
    });

    connection.end()

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor en marcha")
})