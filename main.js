var btnIngresar = document.getElementById("btnIngresar");
var inputNombre = document.getElementById("nombreJugador").value;
var juego = document.getElementById("juegoBoogle");
var modalInicio = document.getElementById("modalInicio");
var temporizador = document.getElementById("temporizador");
var eleccionTiempo = document.getElementById("tiempoJuego").value;
var tiempodeJuego = 0;

function validarNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;
    
    if (inputNombre.length >= 3 ) {
        document.getElementById("mensaje").textContent = "";
    } else {
        document.getElementById("mensaje").textContent = "El nombre debe tener al menos 3 caracteres.";
    }
    validarBoton();
}
function validarBoton() {
    var inputNombre = document.getElementById("nombreJugador").value;
    var eleccionTiempo = document.getElementById("tiempoJuego").value;
    if (inputNombre.length >= 3 && eleccionTiempo !== "") {
        btnIngresar.disabled = false;
    } else {
        btnIngresar.disabled = true;
    }
}


function recibirNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;
    var saludoJugador = document.getElementById("saludoJugador")
    saludoJugador.innerHTML = `¡A jugar ${inputNombre}!`
}

function abrirJuego() {
    modalInicio.style.display = "none";
    juego.style.display = "block";
    recibirNombre();
    asignarLetrasAleatorias();
    iniciarTemporizador(tiempodeJuego); 
}

btnIngresar.addEventListener("click", abrirJuego) 

function asignarLetrasAleatorias() {
    const letras = "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ";
    const botones = document.querySelectorAll(".gridBoogle .item button");
    
    botones.forEach(boton => {
        const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
        boton.textContent = letraAleatoria;
    });
}

function iniciarTemporizador(duracion) {
    var tiempoRestante = duracion;
    var intervalo = setInterval(() => {
        var minutos = Math.floor(tiempoRestante / 60);
        var segundos = tiempoRestante % 60;
        
        temporizador.textContent =
        (minutos < 10 ? "0" + minutos : minutos) + ":" +
        (segundos < 10 ? "0" + segundos : segundos);
        
        if (tiempoRestante <= 10) {
            temporizador.style.color = "red" //Ponerlo en CSS
        }
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            temporizador.textContent = "00:00";
            // Agregar acción cuando el temporizador llegue a cero
        } else {
            tiempoRestante--;
        }
    }, 1000);
}


function eleccionTiempoJuego() {
    eleccionTiempo = document.getElementById("tiempoJuego").value;
    
    if (eleccionTiempo == "1") {
        tiempodeJuego = 60;
    } else if (eleccionTiempo == "2") {
        tiempodeJuego = 120;
    } else if (eleccionTiempo == "3") {
        tiempodeJuego = 180;
    } 
    validarBoton();
}