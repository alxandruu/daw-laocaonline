var ganador;
var numero;
var j1_num = 0;
var j2_num = 0;


// TIRAR DADO Y ASIGNAR NUMEROS
function tirarDado() {
    const numAleatorioDado = Math.round(Math.random() * (6 - 1) + 1);
    this.innerHTML = numAleatorioDado;
    numero = numAleatorioDado;
    asignarNumero(this);
    this.removeEventListener('click', tirarDado);
    if (j1_num != 0 && j2_num != 0) {
        if (j1_num != j2_num) {
            noIgual();
        } else if (j1_num == j2_num) {
            Igual();
        }
    }
}

function asignarNumero(obj) {
    dadoID = obj.getAttribute('id');
    if (dadoID == 'dado_jugador1') {
        j1_num = numero;
    } else if (dadoID == 'dado_jugador2') {
        j2_num = numero;
    } else {
        console.log('ERROR AL ASIGNAR NUMERO A JUGADORES')
    }
}

// FUNCIONES ANALIZAR DADOS
function noIgual() {
    dados = document.getElementsByClassName('dado');
    if (j1_num > j2_num) {
        dados[0].style.backgroundColor = '#7AB317';
        dados[1].style.backgroundColor = '#9F111B';
        ganador = localStorage.getItem("usu_jugador1");
    } else if (j1_num < j2_num) {
        dados[1].style.backgroundColor = '#7AB317';
        dados[0].style.backgroundColor = '#9F111B';
        ganador = localStorage.getItem("usu_jugador2");
    } else {
        console.log('ERROR CAMBIAR ESTILOS NUMEROS');
    }
    document.getElementById('nombre').textContent = ganador;
    localStorage.setItem("ganador", ganador);
    document.getElementById('jugar').addEventListener('click', start);
    let comienzo = document.getElementById('comienzo');
    comienzo.style.visibility = 'visible';
    comienzo.style.animation = 'backInUp 1s';


}

function Igual() {
    dados = document.getElementsByClassName('dado');
    for (let i = 0; i < dados.length; i++) {
        dado = dados[i];
        dado.addEventListener('click', tirarDado);
    }
    j1_num = 0;
    j2_num = 0;
}

function start() {
    window.location.href = './paginaJuego.html';
}