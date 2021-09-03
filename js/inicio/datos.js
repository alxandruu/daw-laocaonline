window.addEventListener("load", inicio);

function inicio() {
    var valida = document.getElementsByClassName("validarJugadores");
    for (let i = 0; i < valida.length; i++) {
        valida[i].addEventListener('click', enviarDatos);
    }

}

function enviarDatos() {
    var padre = this.parentElement;
    var nameinput = this.getAttribute("name");
    var nombre = padre.querySelector('.nombre');

    var color = padre.querySelector('.color');
    nombre = nombre.value;

    color = color.value;
    localStorage.setItem("usu_" + nameinput, nombre);
    localStorage.setItem("color_" + nameinput, color);
}