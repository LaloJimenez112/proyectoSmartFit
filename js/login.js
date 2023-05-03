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

    alert('JJJ')

}

window.addEventListener('load', main)
