var nombre = document.getElementById("nombre");
var email = document.getElementById("email");
var mensaje = document.getElementById("mensaje");
var btnEnviar = document.getElementById("btnEnviar");

var errorNombre = document.getElementById("nombreError");
var errorMail = document.getElementById("emailError");
var errorMensaje = document.getElementById("mensajeError");
var errorClick = document.getElementById("errorClick");

function validarEmail() {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email.value)) {
        errorMail.textContent = 'El email tiene formato incorrecto';
        return false;
    } else {
        errorMail.textContent = '';
        return true;
    }
}

function validarMensaje() {
    if (mensaje.value.trim().length < 5) {
        errorMensaje.textContent = 'El mensaje debe tener al menos 5 caracteres';
        return false;
    } else {
        errorMensaje.textContent = '';
        return true;
    }
}

function validarNombre() {
    if (nombre.value.trim() === "") {
        errorNombre.textContent = 'El nombre está en blanco';
        return false;
    } else {
        errorNombre.textContent = '';
        return true;
    }
}

mensaje.addEventListener("blur", validarMensaje);
email.addEventListener("blur", validarEmail);
nombre.addEventListener("blur", validarNombre);

btnEnviar.addEventListener("click", function (event) {
    var nombreValido = validarNombre();
    var emailValido = validarEmail();
    var mensajeValido = validarMensaje();

    if (nombreValido && emailValido && mensajeValido) {
        errorClick.textContent = '';
    } else {
        errorClick.textContent = 'Por favor, corrige los errores antes de enviar.';
        event.preventDefault();
    }
});