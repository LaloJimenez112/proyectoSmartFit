//const { response } = require("express")
let usuarioInput
let contrasenaInput
let userName
let passContent

const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', function(event){
    event.preventDefault();
})

function main(){
    console.log('Cargado')
}

function recovery(){

    usuarioInput = document.getElementById('userInput');
    contrasenaInput = document.getElementById('passInput');
    userName = usuarioInput.value;
    passContent = contrasenaInput.value;

    console.log('El contenido del input es: '+ userName);
    console.log('El contenido del input es: '+ passContent);

    fetch(`http://localhost:8080/login/${userName}/${passContent}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            saludo: "hola"
        })
    })
        .then(response => response.json())
        .then(data => {
            if(data.respuesta == 'encontrado'){
                window.location.replace('./ubicaciones.html');
            }
            else{
                alert('USUARIO NO ENCONTRADO');
                location.reload();
            }

        })
        .catch(error => {
            console.log('Error:' + error);
        })
}

window.addEventListener('load', main);
