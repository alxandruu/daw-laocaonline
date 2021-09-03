window.addEventListener('load', load);

function load() {
    jugadores = document.getElementsByClassName('validarJugadores');
    for (let i = 0; i < jugadores.length; i++) {
        jugadores[i].addEventListener('click', validar);
    }

}




// VALIDAR JUGADORES
function validar() {
    if (validarJugador(this)) {
        var inputName = this.getAttribute('name');
        var dado = document.getElementById('dado_' + inputName);
        dado.addEventListener('click', tirarDado);
        this.parentElement.querySelector(".nombreVacio").innerHTML = 'JUGADOR CREADO';
        this.style.display = 'none';
        dado.style.visibility = 'visible';
        dado.style.animation = 'fadeIn 1s';

    }
}

function validarJugador(obj) {
    var padre = obj.parentElement;
    var nombre = padre.querySelector('.nombre');
    var color = padre.querySelector('.color');
    nombre = nombre.value;
    color = color.value;
    salida = true;
    padre.querySelector(".nombreVacio").innerHTML = "";
    padre.querySelector('.coloresIguales').innerHTML = '';
    if (nombre == "") {
        salida = false;
        padre.querySelector(".nombreVacio").innerHTML = "Tienes que introducir un nombre";
    }
    if (nombresIguales(padre, nombre)) {
        salida = false;
        padre.querySelector('.nombreVacio').innerHTML = "Este nombre lo tiene otro jugador";
    }
    if (coloresIguales(padre, color)) {
        salida = false;
        padre.querySelector('.coloresIguales').innerHTML = 'Tu color lo tiene otro jugador';
    }
    return salida;
}

function nombresIguales(jugador, nombre) {
    igual = false;
    nombre = nombre.toLowerCase();
    var jugadores = document.querySelectorAll('.jugador');
    for (let i = 0; i < jugadores.length && igual == false; i++) {
        var jugador_nombre = jugadores[i].querySelector('.nombre').value;
        jugador_nombre = jugador_nombre.toLowerCase();
        if (nombre == jugador_nombre && jugadores[i] != jugador && nombre != '') {
            igual = true;
        }
    }
    return igual;
}

function coloresIguales(jugador, color) {
    igual = false;
    var jugadores = document.querySelectorAll('.jugador');
    for (let i = 0; i < jugadores.length && igual == false; i++) {
        var jugador_color = jugadores[i].querySelector('.color').value;

        if (color == jugador_color && jugadores[i] != jugador) {
            igual = true;
        }
    }
    return igual;
}