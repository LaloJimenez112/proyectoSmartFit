const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login/:usuarioId/:password", (req, res) => {

    const usuarioId = req.params.usuarioId || ""
    const password = req.params.password || ""

    console.log(usuarioId, password);

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor en marcha")
})