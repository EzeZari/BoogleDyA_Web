var btnIngresar = document.getElementById("btnIngresar");
var inputNombre = document.getElementById("nombreJugador");
var juego = document.getElementById("juegoBoogle");
var modalInicio = document.getElementById("modalInicio");
var temporizador = document.getElementById("temporizador");
var eleccionTiempo = document.getElementById("tiempoJuego");
var tiempodeJuego = 0;
var seleccionando = false;
var palabraFormada = [];
var puntos = 0;
var palabrasEncontradas = [];
var modalFinDeJuego = document.getElementById("modalFinalPartida");
var marcadores = document.querySelector(".marcadores");
var temporizador = document.querySelector(".temporizador");
var puntuacionActual = document.querySelector(".puntuacionActual"); 
var btnHistorial = document.querySelector(".btnHistorial")

function validarNombre() {
    if (inputNombre.value.length >= 3) {
        document.getElementById("mensaje").textContent = "";
    } else {
        document.getElementById("mensaje").textContent = "El nombre debe tener al menos 3 caracteres.";
    }
    validarBoton();
}
function validarBoton() {
    if (inputNombre.value.length >= 3 && eleccionTiempo.value !== "") {
        btnIngresar.disabled = false;
    } else {
        btnIngresar.disabled = true;
    }
}


function recibirNombre() {
    var saludoJugador = document.getElementById("saludoJugador");
    saludoJugador.innerHTML = "¡A jugar " + inputNombre.value + "!";
}

function abrirJuego() {
    modalInicio.style.display = "none";
    juego.style.display = "block";
    //btnHistorial.style.disabled = "none"; Se buguea.
    recibirNombre();
    asignarLetrasAleatorias();
    iniciarTemporizador(tiempodeJuego);
}

btnIngresar.addEventListener("click", abrirJuego);


function iniciarTemporizador(duracion) {
    var tiempoRestante = duracion;
    var intervalo = setInterval(function () {
        var minutos = Math.floor(tiempoRestante / 60);
        var segundos = tiempoRestante % 60;

        temporizador.textContent =
            " Tiempo: "+ (minutos < 10 ? "0" + minutos : minutos) + ":" +
            (segundos < 10 ? "0" + segundos : segundos);

        if (tiempoRestante <= 10) {
            temporizador.style.color = "red"; 
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

    if (eleccionTiempo === "1") {
        tiempodeJuego = 60;
    } else if (eleccionTiempo === "2") {
        tiempodeJuego = 120;
    } else if (eleccionTiempo === "3") {
        tiempodeJuego = 180;
    }
    validarBoton();
}

function asignarLetrasAleatorias() {
    marcadores.style.display = "block";
    temporizador.style.display = "block"
    puntuacionActual.style.display = "block"
    

    var letras = "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ";
    var botones = document.querySelectorAll(".gridBoogle .item button");

    botones.forEach(function (boton) {
        var letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
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

    var grid = document.querySelector(".gridBoogle");
    var botones = Array.from(grid.querySelectorAll(".item button"));

    var indexActual = botones.indexOf(botonActual);
    var indexUltimo = botones.indexOf(ultimaLetraSeleccionada);

    var filaActual = Math.floor(indexActual / 4);
    var colActual = indexActual % 4;
    var filaUltimo = Math.floor(indexUltimo / 4);
    var colUltimo = indexUltimo % 4;

    var filaDiff = Math.abs(filaActual - filaUltimo);
    var colDiff = Math.abs(colActual - colUltimo);

    return (filaDiff <= 1 && colDiff <= 1);
}

function letrasElegidas(event) {
    if (event.target.tagName === "BUTTON") {
        var boton = event.target;

        if (!seleccionando) {
            seleccionando = true;
            boton.classList.add("seleccionado");
            palabraFormada = boton.textContent;
            ultimaLetraSeleccionada = boton;
        } else if (boton.classList.contains("seleccionado")) {
            seleccionando = false;
            verificarPalabraExistente(palabraFormada);
            limpiarSeleccion();
        } else if (esAdyacente(boton)) {
            boton.classList.add("seleccionado");
            palabraFormada += boton.textContent;
            ultimaLetraSeleccionada = boton;
        }

        document.querySelector(".palabraFormacion").textContent = palabraFormada;
    }
}

function letraHover(event) {
    if (event.target.tagName === "BUTTON" && seleccionando) {
        var boton = event.target;

        if (!boton.classList.contains("seleccionado") && esAdyacente(boton)) {
            boton.classList.add("seleccionado");
            palabraFormada += boton.textContent;
            ultimaLetraSeleccionada = boton;

            document.querySelector(".palabraFormacion").textContent = palabraFormada;
        }
    }
}

document.querySelector(".gridBoogle").addEventListener("click", letrasElegidas);
document.querySelector(".gridBoogle").addEventListener("mouseover", letraHover);

// Agregar soporte para touch en dispositivos móviles
document.querySelector(".gridBoogle").addEventListener("touchstart", letrasElegidas);
document.querySelector(".gridBoogle").addEventListener("touchmove", letraHover);

// Evitamos el comportamiento predeterminado del navegador para eventos táctiles
document.querySelector(".gridBoogle").addEventListener("touchend", function (event) {
    event.preventDefault();
});

function limpiarSeleccion() {
    document.querySelectorAll(".gridBoogle .item button").forEach(function (boton) {
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
        var url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;
        var response = await fetch(url);
        var data = await response.json();

        if (data && data.length > 0) {
            var palabraApi = data[0].word; // Esto se hace porque sino no cuenta la longitud de la palabra obtenida de la API
            var longitudPalabra = palabraApi.length; // Calcula la longitud de la palabra obtenida

            if (longitudPalabra <= 2) {
                document.querySelector(".palabraFormacion").textContent = `Palabra existente, pero demasiado corta: (+2 letras) ${palabra}`;
                // Mostrar puntos obtenidos por esta palabra corta
                actualizarPuntuacion(2);
            } else {
                var puntosObtenidos = sumarPuntos(longitudPalabra);
                document.querySelector(".palabraFormacion").textContent = `Palabra Correcta: ${palabra} (${longitudPalabra} letras)`;
                document.querySelector(".puntuacionActual").textContent = `Puntuación: ${puntos}`;
                agregarPalabraFormada(palabra, puntosObtenidos);
            }
        } else {
            puntos -= 1;
            actualizarPuntuacion();
            document.querySelector(".palabraFormacion").textContent = `Palabra inexistente: ${palabra} (-1 punto) `;
        }
    } catch (error) {
        document.querySelector(".palabraFormacion").textContent = `ERROR: ${error.message}`;
    }
}

function sumarPuntos(longitud) {
    var puntosObtenidos = 0;
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
    document.querySelector(".puntuacionActual").textContent = `Puntuación: ${puntos}`;
}

function agregarPalabraFormada(palabra, puntosObtenidos) {
    palabrasEncontradas.push(palabra); // Añadir palabra al array global

    var palabrasEncontradasElemento = document.querySelector(".palabrasEncontradas");
    var palabraElemento = document.createElement("p");
    palabraElemento.textContent = `${palabra} (${puntosObtenidos} puntos)`;
    palabrasEncontradasElemento.appendChild(palabraElemento);
}

function finDePartida() {
    modalFinDeJuego.style.display = "block";
    juego.style.display = "none"
    marcadores.style.display = "none"
    temporizador.style.display="none"
    puntuacionActual.style.display = "none"

    document.querySelector(".puntuacionFInal").textContent = `Su puntuación es: ${puntos}`;
    var palabrasElemento = document.querySelector(".palabrasFormadasFinal");
    if (palabrasEncontradas.length > 0) {
        palabrasElemento.innerHTML = `Palabras formadas:<br>${palabrasEncontradas.join('<br>')}`; // join('<br>') convierte el array en una cadena donde cada elemento está separado por un salto de línea HTML
    } else {
        palabrasElemento.innerHTML = 'No se encontraron palabras.';
    }
    var minutos = Math.floor(tiempodeJuego / 60);
    document.querySelector(".tiempoJugado").textContent = `Tiempo jugado: ${minutos} minuto`;

    var fechaActual = new Date().toLocaleString();
    document.querySelector(".fechaPartida").textContent = `Fecha y hora de la partida: ${fechaActual}`;
    var inputNombre = document.getElementById("nombreJugador").value;

    var resultados = {
        nombre: inputNombre,
        puntos: puntos,
        fecha: fechaActual
    };
    var historialPartidas = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    historialPartidas.push(resultados);
    localStorage.setItem('historialPartidas', JSON.stringify(historialPartidas));

    palabrasEncontradas = [];
}

function volverInicio() {
    modalInicio.style.display = "block";
    juego.style.display = "none";
    marcadores.style.display = "none";
    temporizador.style.display = "none";
    puntuacionActual.style.display = "none"
    modalFinDeJuego.style.display = "none";

    document.querySelector(".palabrasEncontradas").textContent = '';
    puntos = 0;
    actualizarPuntuacion();
}
document.querySelector(".btnVolverAJugar").addEventListener("click", volverInicio);

document.getElementById("btnHistorial").onclick = function () {
    // Obtener el modal
    var modal = document.getElementById("modalHistorial");

    modalInicio.style.display = "none";
    juego.style.display = "none";
    marcadores.style.display = "none";
    modalFinDeJuego.style.display = "none";
    temporizador.style.display="none";
    puntuacionActual.style.display = "none"

    var historialPartidas = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    var historialElemento = document.querySelector(".historialPartidas");

    if (historialPartidas.length > 0) {
        historialPartidas.sort(function (a, b) {
            return b.puntos - a.puntos;
        }); // Ordenamos de mayor a menor
        historialElemento.innerHTML = historialPartidas.map(function (partida) {
            return `<p><b>Nombre:</b> ${partida.nombre},  <b>Puntos:</b> ${partida.puntos},  <b>Fecha:</b> ${partida.fecha}</p>`;
        }).join('');
    } else {
        historialElemento.innerHTML = 'No hay partidas guardadas.';
    }

    modal.style.display = "block";
    var closeBtn = document.querySelector(".close");

    closeBtn.onclick = function () {
        modal.style.display = "none";
        modalInicio.style.display = "block";

    };
};

document.querySelector(".btnhistorialPartidas").addEventListener("click", mostrarHistorialPartidas);