var casillas = document.getElementsByClassName('casilla');

function oca(posicion) {
    let salida = false;
    let j = 0;
    for (let i = posicion + 1; i < casillas.length && salida == false; i++, j++) {
        let casEspecial = casillas[i].getAttribute('id');
        if (casEspecial == 'oca') {
            salida = true;
        }
    }

    if (salida == true) {
        let casillaFinal = casillas[posicion + j];
        casillaFinal.appendChild(asFicha);
    }
    cambiarEstilos();

}

function carcel() {
    let jugador = document.getElementById('nombre_jugador').textContent;
    for (let i = 0; i < resTurno.length; i++) {
        if (resTurno[i][0] == jugador) {
            resTurno[i][1] = resTurno[i][1] + 3;
        }
    }
    cambiarEstilos();
}

function puente() {
    let salida = false;
    let i;
    for (i = 0; i < casillas.length && salida == false; i++) {
        let casEspecial = casillas[i].getAttribute('id');
        if (casEspecial == 'posada') {
            salida = true;
        }
    }


    let casillaFinal = casillas[i - 1];
    casillaFinal.appendChild(asFicha);
    cambiarEstilos();
    posada();

}

function posada() {
    let jugador = document.getElementById('nombre_jugador').textContent;
    for (let i = 0; i < resTurno.length; i++) {
        if (resTurno[i][0] == jugador) {
            resTurno[i][1] = resTurno[i][1] + 2;
        }
    }
    cambiarEstilos();
}





function calavera() {
    casillas[0].appendChild(asFicha);
    cambiarEstilos();
}




function dados(posicion) {
    let casillaFinal = casillas[posicion + numDado];
    casillaFinal.appendChild(asFicha);
    cambiarEstilos();
}



function laberinto() {
    casillas[24].appendChild(asFicha);
    cambiarEstilos();
}