var btnIngresar = document.getElementById("btnIngresar");
var inputNombre = document.getElementById("nombreJugador").value;
var juego = document.getElementById("juegoBoogle");
var modalInicio = document.getElementById("modalInicio");

function validarNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;

    if (inputNombre.length >= 3) {
        document.getElementById("mensaje").textContent = "";
        btnIngresar.disabled = false;
    } else {
        document.getElementById("mensaje").textContent = "El nombre debe tener al menos 3 caracteres.";
        document.getElementById("mensaje").style.color = "red";
        btnIngresar.disabled = true;
    }
}

function recibirNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;
    var saludoJugador = document.getElementById("saludoJugador")
    saludoJugador.innerHTML = `¡A jugar ${inputNombre}!`
    abrirJuego();
}

function abrirJuego() {
    modalInicio.style.display = "none";
    juego.style.display = "block";
    asignarLetrasAleatorias();
}

btnIngresar.addEventListener("click", recibirNombre)

function asignarLetrasAleatorias() {
    const letras = "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ";
    const botones = document.querySelectorAll(".gridBoogle .item button");

    botones.forEach(boton => {
        const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
        boton.textContent = letraAleatoria;
    });
}