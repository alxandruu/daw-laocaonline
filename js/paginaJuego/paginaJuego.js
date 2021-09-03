window.addEventListener('load', load);
var numDado;
var asFicha;
var casillas = document.getElementsByClassName('casilla');
var ad_com = document.querySelector('#ad-com p');
var resTurno = [
    [localStorage.getItem("usu_jugador1"), 0],
    [localStorage.getItem("usu_jugador2"), 0]
];

function load() {
    document.getElementById('dado').addEventListener('click', tirarDado);
    fichaEmpieza();
    asignarEstilos();
}




// TURNOS
function cambiarTurno() {
    let attr = asFicha.getAttribute('id');
    if (attr == 'ficha1') {
        asFicha = document.getElementById('ficha2');
        document.getElementById('nombre_jugador').textContent = localStorage.getItem("usu_jugador2");
    } else if (attr == 'ficha2') {
        asFicha = document.getElementById('ficha1');
        document.getElementById('nombre_jugador').textContent = localStorage.getItem("usu_jugador1");
    } else {
        console.log('Error en condiciones | cambiarTurno');
    }
}
// MOVER FICHA

function posFicha() {
    let posicion;
    let exit = false;
    for (let i = 0; i < casillas.length && !exit; i++) {
        let hijosCasillas = casillas[i].children;
        for (let j = 0; j < hijosCasillas.length && !exit; j++) {
            if (asFicha === hijosCasillas[j]) {
                posicion = i;
                exit = true;
            }
        }
    }
    return posicion;
}

function mover() {
    ad_com.textContent = '';
    let casillaFinal = casillas[posFicha() + numDado];
    if (hayRestTurno()) {
        minusRestTurno();
    }
    if (casillaFinal != null && !hayRestTurno()) {
        casillaFinal.appendChild(asFicha);
        asFicha.style.animation = 'fadeInTopLeft 1s';
        if (casillaFinal == casillas[casillas.length - 1]) {
            final();
        }
    }
    analizar();
}


function tirarDado() {
    const dado = document.getElementById('dado');
    const numAleatorioDado = Math.round(Math.random() * (6 - 1) + 1);
    dado.innerHTML = numAleatorioDado;
    numDado = numAleatorioDado;
    mover();
}

function asignarEstilos() {
    document.getElementById('ficha1').style.backgroundColor = localStorage.getItem("color_jugador1");
    document.getElementById('ficha2').style.backgroundColor = localStorage.getItem("color_jugador2");
    document.getElementById("nombre_jugador").textContent = localStorage.getItem("ganador");

}

function fichaEmpieza() {
    if (localStorage.getItem("ganador") == localStorage.getItem("usu_jugador1")) {
        asFicha = document.getElementById('ficha1');
    } else if (localStorage.getItem("ganador") == localStorage.getItem("usu_jugador2")) {
        asFicha = document.getElementById('ficha2');
    }
}

function analizar() {
    let posicionFicha = posFicha();
    let casFicha = casillas[posicionFicha];
    let casEspecial = casFicha.getAttribute('id');
    if (casEspecial != null && !hayRestTurno()) {
        document.getElementById('audio_special').play();
        if (casEspecial == 'oca') {
            ad_com.textContent = 'OCA = DE OCA EN OCA Y TIRO PORQUE ME TOCA';
            oca(posicionFicha);
        } else if (casEspecial == "puente") {
            ad_com.textContent = "PUENTE = IRAS A LA POSADA Y PIERDES 1 TURNO";
            puente();
            cambiarTurno();
        } else if (casEspecial == 'posada') {
            posada();
            ad_com.textContent = "DESCANSAS EN LA POSADA | PIERDES 1";
            cambiarTurno();
        } else if (casEspecial == 'calavera') {
            ad_com.textContent = "CALAVERA = VUELVES A LA CASILLA DE SALIDA ";
            calavera();
            cambiarTurno();
        } else if (casEspecial == 'dados') {
            ad_com.textContent = "DADOS = TU DADO ES UN " + numDado + " | MUEVES " + numDado + " POSICIONES";
            dados(posicionFicha);
            cambiarTurno();
        } else if (casEspecial == "carcel") {
            carcel();
            ad_com.textContent = "CARCEL = 2 TURNOS SIN JUGAR";
            cambiarTurno();
        } else if (casEspecial == "laberinto") {
            ad_com.textContent = "LABERINTO = Retrocede a la casilla 25";
            laberinto();
            cambiarTurno();
        } else {
            console.log('ERROR AL IDENTIFICAR CASILLA ESPECIAL');
        }
    } else {
        cambiarEstilos();
        cambiarTurno();
    }
}


function cambiarEstilos() {
    let attr = asFicha.getAttribute('id');
    if (attr == 'ficha1') {
        document.getElementById("dado").style.backgroundColor = localStorage.getItem("color_jugador1");
        document.getElementById("nombre_jugador").style.backgroundColor = localStorage.getItem("color_jugador2");
    } else if (attr == 'ficha2') {
        document.getElementById("dado").style.backgroundColor = localStorage.getItem("color_jugador2");
        document.getElementById("nombre_jugador").style.backgroundColor = localStorage.getItem("color_jugador1");
    } else {
        console.log('ERROR EN CAMBIAR ESTILOS');
    }
}


// TURNOS || resTurno


function hayRestTurno() {
    let jugador = document.getElementById('nombre_jugador').textContent;
    salida = false;
    for (let i = 0; i < resTurno.length && !salida; i++) {
        if (resTurno[i][0] == jugador) {
            if (resTurno[i][1] > 0) {
                salida = true;
            }
        }

    }
    return salida;
}

function minusRestTurno() {
    let jugador = document.getElementById('nombre_jugador').textContent;
    for (let i = 0; i < resTurno.length; i++) {
        if (resTurno[i][0] == jugador) {
            resTurno[i][1] = resTurno[i][1] - 1;
        }
    }
}

function final() {
    document.getElementById('audio_win').play();
    document.getElementById('dado').removeEventListener('click', tirarDado);
    let asFicha_id = asFicha.getAttribute('id');
    let ganador_number = asFicha_id.charAt(asFicha_id.length - 1);
    let ganador = localStorage.getItem('usu_jugador' + ganador_number);
    localStorage.setItem('ganador_oca', ganador);
    setInterval(function() { window.location.href = './html/final.html'; }, 3000);

}