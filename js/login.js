let usuarioInput
let contrasenaInput
let userName
let passContent

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
        .then(function(res){
            if (res.ok) {
                console.log('Datos enviados con exito');
            }
        })
}

window.addEventListener('load', main);
