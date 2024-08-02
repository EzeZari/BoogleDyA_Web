var btnIngresar = document.getElementById("btnIngresar");
var inputNombre = document.getElementById("nombreJugador").value;
var juego = document.getElementById("juegoBoogle");
var modalInicio = document.getElementById("modalInicio");
var temporizador = document.getElementById("temporizador");
var eleccionTiempo = document.getElementById("tiempoJuego").value;
var tiempodeJuego = 0;
var seleccionando = false;
var palabraFormada = [];
var puntos = 0;
let palabrasEncontradas = [];
var modalFinDeJuego = document.getElementById("modalFinalPartida");
var marcadores = document.getElementById("marcadores")

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
            finDePartida();
        } else {
            tiempoRestante--;
        }
    }, 1000);
}

function eleccionTiempoJuego() {
    eleccionTiempo = document.getElementById("tiempoJuego").value;

    if (eleccionTiempo == "1") {
        tiempodeJuego = 10;
    } else if (eleccionTiempo == "2") {
        tiempodeJuego = 120;
    } else if (eleccionTiempo == "3") {
        tiempodeJuego = 180;
    }
    validarBoton();
}

function asignarLetrasAleatorias() {
    marcadores.style.display = "block"

    const letras = "TOOh";
    const botones = document.querySelectorAll(".gridBoogle .item button");

    botones.forEach(boton => {
        const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
        boton.textContent = letraAleatoria;
        boton.classList.remove("seleccionado");

        boton.classList.remove("seleccionado"); // Quitar selección previa
    });

    // Restablecer estado
    seleccionando = false;
    limpiarSeleccion();
}

function esAdyacente(botonActual) {
    if (!ultimaLetraSeleccionada) return true;

    const grid = document.querySelector(".gridBoogle");
    const botones = Array.from(grid.querySelectorAll(".item button"));

    const indexActual = botones.indexOf(botonActual);
    const indexUltimo = botones.indexOf(ultimaLetraSeleccionada);

    const filaActual = Math.floor(indexActual / 4);
    const colActual = indexActual % 4;
    const filaUltimo = Math.floor(indexUltimo / 4);
    const colUltimo = indexUltimo % 4;

    const filaDiff = Math.abs(filaActual - filaUltimo);
    const colDiff = Math.abs(colActual - colUltimo);

    return (filaDiff <= 1 && colDiff <= 1);
}

function letrasElegidas(event) {
    if (event.target.tagName === "BUTTON") {
        const boton = event.target;

        if (!seleccionando) { // Si no está activada la selección de letra
            seleccionando = true;
            boton.classList.add("seleccionado");
            palabraFormada = boton.textContent;
            ultimaLetraSeleccionada = boton;

        } else if (boton.classList.contains("seleccionado")) {
            seleccionando = false;
            verificarPalabraExistente(palabraFormada);
            limpiarSeleccion();

        } else if (esAdyacente(boton)) { // Verificar si el botón es adyacente
            boton.classList.add("seleccionado");
            palabraFormada += boton.textContent;
            ultimaLetraSeleccionada = boton;
        }

        document.querySelector(".palabraFormacion").textContent = palabraFormada;
    }
}

function letraHover(event) {
    if (event.target.tagName === "BUTTON" && seleccionando) { //event.target.tagName === "BUTTON" Significa que verifica si se hizo click sobre un boton.
        const boton = event.target;

        if (!boton.classList.contains("seleccionado") && esAdyacente(boton)) {
            boton.classList.add("seleccionado"); // Agregar letra a la palabra formada
            palabraFormada += boton.textContent;
            ultimaLetraSeleccionada = boton;

            document.querySelector(".palabraFormacion").textContent = palabraFormada;
        }
    }
}
document.querySelector(".gridBoogle").addEventListener("click", letrasElegidas);
document.querySelector(".gridBoogle").addEventListener("mouseover", letraHover);

function limpiarSeleccion() {
    document.querySelectorAll(".gridBoogle .item button").forEach(boton => {
        boton.classList.remove("seleccionado");
    });
    palabraFormada = "";
    ultimaLetraSeleccionada = null;
    document.querySelector(".palabraFormacion").textContent = palabraFormada;
}

async function verificarPalabraExistente(palabra) {
    // Verificar si la palabra ya ha sido encontrada
    if (palabrasEncontradas.includes(palabra)) {
        document.querySelector(".palabraFormacion").textContent = `Palabra repetida: ${palabra} (sin puntos)`;
        return;
    }

    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            const palabraApi = data[0].word; // Esto se hace porque sino no cuenta la longitud de la palabra obtenida de la API
            const longitudPalabra = palabraApi.length; // Calcula la longitud de la palabra obtenida

            if (longitudPalabra <= 2) {
                document.querySelector(".palabraFormacion").textContent = `Palabra existente, pero demasiado corta: (+2 letras) ${palabra}`;
                // Mostrar puntos obtenidos por esta palabra corta
                actualizarPuntuacion(2);
            } else {
                const puntosObtenidos = sumarPuntos(longitudPalabra);
                document.querySelector(".palabraFormacion").textContent = `Palabra Correcta: ${palabra} (${longitudPalabra} letras)`;
                document.querySelector(".puntuacionActual").textContent = `Puntuacion: ${puntos}`;
                agregarPalabraFormada(palabra, puntosObtenidos);
            }
        } else {
            puntos -= 1;
            actualizarPuntuacion();
            document.querySelector(".palabraFormacion").textContent = `Palabra inexistente : ${palabra} (-1 punto) `;
        }
    } catch (error) {
        document.querySelector(".palabraFormacion").textContent = `ERROR: ${error.message}`;
    }
}

function sumarPuntos(longitud) {
    let puntosObtenidos = 0;
    if (longitud === 3 || longitud === 4) {
        puntosObtenidos = 1;
    } else if (longitud === 5) {
        puntosObtenidos = 2;
    } else if (longitud === 6) {
        puntosObtenidos = 3;
    } else if (longitud === 7) {
        puntosObtenidos = 5;
    } else if (longitud >= 8) {
        puntosObtenidos = 11;
    }
    puntos += puntosObtenidos;
    return puntosObtenidos;
}

function actualizarPuntuacion() {
    document.querySelector(".puntuacionActual").textContent = `Puntuacion: ${puntos}`;
}

function agregarPalabraFormada(palabra, puntosObtenidos) {
    palabrasEncontradas.push(palabra);// Añadir palabra al array global

    const palabrasEncontradasElemento = document.querySelector(".palabrasEncontradas");
    const palabraElemento = document.createElement("p");
    palabraElemento.textContent = `${palabra} (${puntosObtenidos} puntos)`;
    palabrasEncontradasElemento.appendChild(palabraElemento);
}

function finDePartida() {
    modalFinDeJuego.style.display = "block";

    document.querySelector(".puntuacionFInal").textContent = `Su puntuacion es: ${puntos}`;
    const palabrasElemento = document.querySelector(".palabrasFormadasFinal");
    if (palabrasEncontradas.length > 0) {
        palabrasElemento.innerHTML = `Palabras formadas:<br>${palabrasEncontradas.join('<br>')}`; //join('<br>') convierte el array en una cadena donde cada elemento está separado por un salto de línea HTML
    } else {
        palabrasElemento.innerHTML = 'No se encontraron palabras.';
    }
    const minutos = Math.floor(tiempodeJuego / 60);
    document.querySelector(".tiempoJugado").textContent = `Tiempo jugado: ${minutos} minuto`;

    const fechaActual = new Date().toLocaleString();
    document.querySelector(".fechaPartida").textContent = `Fecha y hora de la partida: ${fechaActual}`;
    const inputNombre = document.getElementById("nombreJugador").value;

    const resultados = {
        nombre: inputNombre,
        puntos: puntos,
        fecha: fechaActual
    };
    const historialPartidas = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    historialPartidas.push(resultados);
    localStorage.setItem('historialPartidas', JSON.stringify(historialPartidas));

    palabrasEncontradas = [];
}

function volverInicio() {
    modalInicio.style.display = "block";
    juego.style.display = "none";
    marcadores.style.display = "none"
    modalFinDeJuego.style.display = "none"

    document.querySelector(".palabrasEncontradas").textContent = '';
    puntos = 0
    actualizarPuntuacion();
}
document.querySelector(".btnVolverAJugar").addEventListener("click", volverInicio)

function mostrarHistorialPartidas() {
    const historialPartidas = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    const historialElemento = document.querySelector(".historialPartidas");

    if (historialPartidas.length > 0) {
        historialPartidas.sort((a, b) => b.puntos - a.puntos); //Ordenamos de mayor a menor.
        historialElemento.innerHTML = historialPartidas.map(partida => {
            return `<p>Nombre: ${partida.nombre}, Puntos: ${partida.puntos}, Fecha: ${partida.fecha}</p>`;
        }).join('');
    } else {
        historialElemento.innerHTML = 'No hay partidas guardadas.';
    }
}

document.querySelector(".btnhistorialPartidas").addEventListener("click", mostrarHistorialPartidas);