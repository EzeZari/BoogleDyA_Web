var btnIngresar = document.getElementById("btnIngresar")

function validarNombre() {
    var inputNombre = document.getElementById("nombreJugador").value;
    
    if (inputNombre.length >= 3) {
        document.getElementById("mensaje").textContent = "";
        btnIngresar.disabled= false;
    } else {
        document.getElementById("mensaje").textContent = "El nombre debe tener al menos 3 caracteres.";
        document.getElementById("mensaje").style.color = "red";
        btnIngresar.disabled = true;
    }
}

function recibirNombre(){
    var inputNombre = document.getElementById("nombreJugador").value;
    console.log(inputNombre)

}

btnIngresar.addEventListener("click",recibirNombre)