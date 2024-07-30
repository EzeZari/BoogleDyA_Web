var btnIngresar = document.getElementById("btnIngresar");
var inputNombre = document.getElementById("nombreJugador").value;
var juego = document.getElementById("juegoBoogle");
var modalInicio = document.getElementById("modalInicio");
var temporizador = document.getElementById("temporizador");
var eleccionTiempo = document.getElementById("tiempoJuego").value;
var tiempodeJuego = 0;
var seleccionando = false;
var palabraFormada = "";
<<<<<<< Updated upstream
=======
var puntos = [];
var seleccionando = false;
var palabraFormada = "";
>>>>>>> Stashed changes

function validarNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;

    if (inputNombre.length >= 3) {
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


function iniciarTemporizador(duracion) {
    var tiempoRestante = duracion;
    var intervalo = setInterval(() => {
        var minutos = Math.floor(tiempoRestante / 60);
        var segundos = tiempoRestante % 60;

        temporizador.textContent =
            (minutos < 10 ? "0" + minutos : minutos) + ":" +
            (segundos < 10 ? "0" + segundos : segundos);

        if (tiempoRestante <= 10) {
            temporizador.style.color = "red" //TODO:Ponerlo en CSS
        }
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            temporizador.textContent = "00:00";
            // TODO:Agregar acción cuando el temporizador llegue a cero
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


function asignarLetrasAleatorias() {
<<<<<<< Updated upstream
=======
    const letras = "bottle";
}

function asignarLetrasAleatorias() {
>>>>>>> Stashed changes
    const letras = "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ";
    const botones = document.querySelectorAll(".gridBoogle .item button");

    botones.forEach(boton => {
        const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
        boton.textContent = letraAleatoria;
<<<<<<< Updated upstream
=======
        boton.classList.remove("seleccionado");
>>>>>>> Stashed changes
        boton.classList.remove("seleccionado"); // Quitar selección previa
    });

    // Restablecer estado
    seleccionando = false;
    limpiarSeleccion();
}

function letrasElegidas(event) {
    if (event.target.tagName === "BUTTON") {
        const boton = event.target;

        if (!seleccionando) { //Si no esta activado la seleccion de letra
            seleccionando = true;
            boton.classList.add("seleccionado");
            palabraFormada = boton.textContent;

        } else if (boton.classList.contains("seleccionado")) {
            seleccionando = false;
            verificarPalabraExistente(palabraFormada);
            limpiarSeleccion();

        } else { //Se va agregando las letras a la palabra en pantalla.
            boton.classList.add("seleccionado");
            palabraFormada += boton.textContent;

        }

        document.querySelector(".palabraFormacion").textContent = palabraFormada;
    }
}

function letraHover(event) {
    if (event.target.tagName === "BUTTON" && seleccionando) { //event.target.tagName === "BUTTON" Significa que verifica si se hizo click sobre un boton.
        const boton = event.target;

        if (!boton.classList.contains("seleccionado")) {
            boton.classList.add("seleccionado"); // Agregar letra a la palabra formada
            palabraFormada += boton.textContent;

            document.querySelector(".palabraFormacion").textContent = palabraFormada;
        }
    }
}

function limpiarSeleccion() {
    document.querySelectorAll(".gridBoogle .item button").forEach(boton => {
        boton.classList.remove("seleccionado");
    });
    palabraFormada = "";
    document.querySelector(".palabraFormacion").textContent = palabraFormada;
}

async function verificarPalabraExistente(palabra) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                console.log("Palabra existente");
                document.querySelector(".palabraFormacion").textContent = `Palabra Correcta: ${palabra}`;
            } else {
                console.log("Palabra no existente");
                document.querySelector(".palabraFormacion").textContent = `Palabra incorrecta: ${palabra}`;
            }
        } else {
            console.log("Palabra no existente o error en la solicitud");
            document.querySelector(".palabraFormacion").textContent = `Palabra no eistente: ${palabra}`;
        }
    } catch (error) {
        console.error("Error al verificar la palabra:", error);
    }
}

<<<<<<< Updated upstream
document.querySelector(".gridBoogle").addEventListener("click", letrasElegidas);
document.querySelector(".gridBoogle").addEventListener("mouseover", letraHover);
=======
function sumarPuntos(longitud) {
    if (longitud === 3 || longitud === 4) {
        puntos += 1;
        console.log(`Puntos: ${puntos}`);
    } else if (longitud === 5) {
        puntos += 2;
        console.log(`Puntos: ${puntos}`);
    } else if (longitud === 6) {
        puntos += 3;
        console.log(`Puntos: ${puntos}`);
    } else if (longitud === 7) {
        puntos += 5;
        console.log(`Puntos: ${puntos}`);
    } else if (longitud >= 8) {
        puntos += 11;
        console.log(`Puntos: ${puntos}`);
    } else {
        console.log("Palabra existente pero no cumple con el criterio de longitud");

    }
}


async function verificarPalabraExistente(palabra) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                console.log("Palabra existente");
                document.querySelector(".palabraFormacion").textContent = `Palabra Correcta: ${palabra}`;
            } else {
                console.log("Palabra no existente");
                document.querySelector(".palabraFormacion").textContent = `Palabra incorrecta: ${palabra}`;
            }
        } else {
            console.log("Palabra no existente o error en la solicitud");
            document.querySelector(".palabraFormacion").textContent = `Palabra no eistente: ${palabra}`;
        }
    } catch (error) {
        console.error("Error al verificar la palabra:", error);
    }
}

document.querySelector(".gridBoogle").addEventListener("click", letrasElegidas);
document.querySelector(".gridBoogle").addEventListener("mouseover", letraHover);
>>>>>>> Stashed changes
