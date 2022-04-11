// definciion de variables del LocalStorage

let listaGanadores = JSON.parse(localStorage.getItem('ticTacWin'));
let listaEmpates = JSON.parse(localStorage.getItem('ticTacDraw'));
let listaPerdedores = JSON.parse(localStorage.getItem('ticTacLoss'));

// variables que afectan el DOM

// botones

let btn = document.getElementById("myBtn");
let tablero = document.getElementById("tableroSolitario");
let headline = document.getElementById("headline");
let titulo = document.getElementById('titulo');
let queJugador = document.getElementById('queJugador');

// variables globales

const delay = ms => new Promise(res => setTimeout(res, ms));
const circulo = "https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png";
const cruz = "https://img.icons8.com/ios-filled/50/26e07f/circled.png";
let turno = 0;
let forma1 = "";
let forma2 = "";
let player1 = '';
let player2 = '';
let jugadores = '';
let selection = '';
let ganador = "";
let perdedor = '';
let errorTicTac = new Audio('../media/sonidos/errorTicTac.wav');
let tapTicTac = new Audio('../media/sonidos/tapTicTac.wav');

errorTicTac.volume = 0.05;
tapTicTac.volume = 0.05;

// variables necesarias para la funcion comprobacion y juego

let bloques = {bloq1:0,bloq2:0,bloq3:0,bloq4:0,bloq5:0,bloq6:0,bloq7:0,bloq8:0,bloq9:0}
let signo = {bloq1:"",bloq2:"",bloq3:"",bloq4:"",bloq5:"",bloq6:"",bloq7:"",bloq8:"",bloq9:""}

const condicionGanar = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// cuando se aprieta boton de inicio se abre modal de inicio

btn.onclick = function() {
    let inputOptions = {circulo:'Circulo', cruz: 'Cruz'}
    Swal.fire({
        title: 'Bienvenido!',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder = "Jugador 1">' + '<br>' +
            '<input id="swal-input2" class="swal2-input" placeholder = "Jugador 2">' + '<br>' +
            '<input type="radio" id="unJugador" name="jugadores" value="unJugador">' + 
            '<label for="unJugador" class="radio">1 Jugador</label>' + '<br>' +
            '<input type="radio" id="dosJugadores" name="jugadores" value="dosJugadores"> ' + 
            '<label for="dosJugadores" class="radio">2 Jugadores</label>' +
            '<p>Elige simbolo jugador 1</p>',
        input: 'radio',
        inputOptions: inputOptions,
        focusConfirm: false,
        showCloseButton:true,
        confirmButtonText: 'Empezamos',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-warning',
        }
    })
    Swal.getConfirmButton().onclick = function() {
        if (!document.getElementById('swal-input1').value || !document.querySelector('input[name="jugadores"]:checked') || !document.querySelector('input[name="swal2-radio"]:checked')) {
            Swal.showValidationMessage('Asegurese de completar los campos');
        } else {
            player1 = capitalize(document.getElementById('swal-input1').value);
            if(document.getElementById('swal-input2').value) player2 = capitalize(document.getElementById('swal-input2').value);
            jugadores = document.querySelector('input[name="jugadores"]:checked').value;
            selection = Swal.getInput().value;
            Swal.close();
            comenzar();
        }
    }
}

// para iniciar otra partida.

function reinicio(alcance){

    if (alcance == 'total'){
        forma1 = "";
        forma2 = "";
        player1 = '';
        player2 = '';
        ocultarObjetos(tablero);
        ocultarObjetos(queJugador);
        mostrarObjetos(titulo);
        mostrarObjetos(btn);
    }
    turno = 0;
    ganador = "";
    perdedor = '';
    bloques = {bloq1:0,bloq2:0,bloq3:0,bloq4:0,bloq5:0,bloq6:0,bloq7:0,bloq8:0,bloq9:0}
    signo = {bloq1:"",bloq2:"",bloq3:"",bloq4:"",bloq5:"",bloq6:"",bloq7:"",bloq8:"",bloq9:""}

    for (let i = 0; i < 9; i++) {
        document.getElementById(`tarjetas${(i+1)}`).style.backgroundImage = '';
    }
}

// cuando cliqueo el boton comenzar dentro del modal de inicio se ajustan posiciones y aparece el tablero.

function comenzar(){

    if(jugadores == 'unJugador') player2 = 'Skynet';
    document.getElementById('nombrep1').innerHTML = player1
    document.getElementById('nombrep2').innerHTML = player2

    if(selection == 'circulo'){
        document.getElementById('forma1').src = cruz;
        document.getElementById('forma2').src = circulo;
        forma1 = cruz;
        forma2 = circulo;
    }else{
        document.getElementById('forma1').src = circulo;
        document.getElementById('forma2').src = cruz;
        forma1 = circulo;
        forma2 = cruz;
    }

    mostrarObjetos(tablero);
    mostrarObjetos(queJugador);
    ocultarObjetos(titulo);
    ocultarObjetos(btn);

    let empieza = Math.round(Math.random()) + 1;

    if (empieza == 1){
        queJugador.innerHTML = `Es el turno de: ${player1}`;
        mostrarObjetos(queJugador);
        turno = 1;
    } else {
        queJugador.innerHTML = `Es el turno de: ${player2}`;
        mostrarObjetos(queJugador);
        turno = 2;
        if(jugadores == 'unJugador') juegoAutonomo();
    }
}

// funcion que detecta cuando terminar el juego

function comprobacion() {
    ganador = "";
    for (let i = 0; i < 8; i++) {
        condA = condicionGanar[i][0];
        condB = condicionGanar[i][1];
        condC = condicionGanar[i][2];

        if (signo[`bloq${condA}`] === '' || signo[`bloq${condB}`] === '' || signo[`bloq${condC}`]=== '') continue;

        if (signo[`bloq${condA}`] == signo[`bloq${condB}`] && signo[`bloq${condB}`] == signo[`bloq${condC}`]) {
            if (forma1 == signo[`bloq${condC}`]){
                ganador = player1;
                perdedor = player2;
            } else {
                ganador = player2;
                perdedor = player1;
            }
            guardarDatos('ganador');
            mensajeGanador ('ganador');
            break;
        }
    }
    if (bloques.bloq1 == 1 && bloques.bloq2 == 1 && bloques.bloq3 == 1 && bloques.bloq4 == 1 && bloques.bloq5 == 1 && bloques.bloq6 == 1 && bloques.bloq7 == 1 && bloques.bloq8 == 1 && bloques.bloq9 == 1 && ganador === '') {
        guardarDatos('empate');
        mensajeGanador ('empate');
    }
}

// funcion que muestra las imagenes

function juego(casilla){

    if (bloques[`bloq${casilla}`] == 0){
        if (turno == 1) {
            document.getElementById(`tarjetas${casilla}`).style.backgroundImage = `url("${forma1}")`;
            bloques[`bloq${casilla}`] = 1;
            signo[`bloq${casilla}`] = forma1;
            turno = 2;
            document.getElementById('queJugador').innerHTML = `Es el turno de: ${player2}`;
            if(jugadores == 'unJugador') juegoAutonomo();
        } else{
            document.getElementById(`tarjetas${casilla}`).style.backgroundImage = `url("${forma2}")`;
            bloques[`bloq${casilla}`] = 1;
            signo[`bloq${casilla}`] = forma2;
            turno = 1;
            document.getElementById('queJugador').innerHTML = `Es el turno de: ${player1}`;
        }
    comprobacion();
    if (permitirEfectos) tapTicTac.play();
    } else {
        if (permitirEfectos) errorTicTac.play();
    }
}

// funcion que determina como juega la maquina.

const juegoAutonomo = async () => {
    await delay(2500);
    if (ganador == ''){
        while (turno == 2) {
            check = 0;
            checkElegido = 0;
            while (check == 0) {
                for (let i = 0; i < 8; i++) {
                    condA = condicionGanar[i][0];
                    condB = condicionGanar[i][1];
                    condC = condicionGanar[i][2];

                    if (signo[`bloq${condA}`] !== "" && signo[`bloq${condB}`] === signo[`bloq${condA}`]){
                        if (signo[`bloq${condC}`] !== ""){
                            continue;
                        }
                        juego(condC);
                        check = 1;
                        checkElegido = 1;
                        break;
                    } else if (signo[`bloq${condA}`] !== "" && signo[`bloq${condC}`] === signo[`bloq${condA}`]){
                        if (signo[`bloq${condB}`] !== ""){
                            continue;
                        }
                        juego(condB);
                        check = 1;
                        checkElegido = 1;
                        break;
                    } else if (signo[`bloq${condC}`] !== "" && signo[`bloq${condB}`] === signo[`bloq${condC}`]){
                        if (signo[`bloq${condA}`] !== ""){
                            continue;
                        }
                        juego(condA);
                        check = 1;
                        checkElegido = 1;
                        break;
                    } else {
                        continue;
                    }
                }
                check = 1;
            }
            if (checkElegido == 0){
                if (bloques.bloq5 != 1){
                    jugada = 5;
                    juego(jugada);
                } else if ( bloques.bloq1 != 1 || bloques.bloq3 != 1 || bloques.bloq7 != 1 || bloques.bloq9 != 1){
                    for (let i = 1; i < 10; i=i+2) {
                        if (bloques[`bloq${i}`] != 1){
                            jugada = i;
                            juego(jugada);
                            break;
                        }
                    }
                } else{
                    jugada = Math.round(Math.random() * 9);
                    while (bloques[`bloq${jugada}`] == 1) {
                        jugada = Math.round(Math.random() * 9);
                    }
                    juego(jugada);
                }
            }
        }
    }
}

// funcion que interactua con el localStorage.

function guardarDatos(resultado) {
    switch (resultado) {
        case 'ganador':
            let lugarGanador = -1;
            if(listaGanadores == null){
                listaGanadores = [{nombre: ganador, veces:1}];
            } else{
                for (let i = 0; i < listaGanadores.length; i++) {
                    if (listaGanadores[i].nombre == ganador) {
                        lugarGanador = i;
                        break;
                    }
                }
                if (lugarGanador > -1){
                    listaGanadores[lugarGanador].veces ++;
                } else {
                    listaGanadores.push({nombre: ganador, veces:1});
                }
            }
            localStorage.setItem('ticTacWin', JSON.stringify(listaGanadores));

            let lugarPerdedor = -1;
            if(listaPerdedores == null){
                listaPerdedores = [{nombre: perdedor, veces:1}];
            } else{
                for (let i = 0; i < listaPerdedores.length; i++) {
                    if (listaPerdedores[i].nombre == perdedor) {
                        lugarPerdedor = i;
                        break;
                    }
                }
                if (lugarPerdedor > -1){
                    listaPerdedores[lugarPerdedor].veces ++;
                } else {
                    listaPerdedores.push({nombre: perdedor, veces:1});
                }
            }
            localStorage.setItem('ticTacLoss', JSON.stringify(listaPerdedores));
            break;
    
        case 'empate':
            let lugarEmpate1 = -1;
            let lugarEmpate2 = -1;
            if(listaEmpates == null){
                listaEmpates = [{nombre: player1, veces:1},{nombre: player2, veces:1}];
            } else{
                for (let i = 0; i < listaEmpates.length; i++) {
                    if (listaEmpates[i].nombre == player1) {
                        lugarEmpate1 = i;
                    }
                    if (listaEmpates[i].nombre == player2) {
                        lugarEmpate2 = i;
                    }
                }
                if (lugarEmpate1 > -1){
                    listaEmpates[lugarEmpate1].veces ++;
                } else {
                    listaEmpates.push({nombre: player1, veces:1});
                }
                if (lugarEmpate2 > -1){
                    listaEmpates[lugarEmpate2].veces ++;
                } else {
                    listaEmpates.push({nombre: player2, veces:1});
                }
            }
            localStorage.setItem('ticTacDraw', JSON.stringify(listaEmpates));
            break;
        default:
            break;
    }
}

// funcion que determina el fin del juego!

function mensajeGanador (resultado){
    let title = '';
    if (resultado == 'ganador'){
        title = `Ganaste ${ganador}`
        if (permitirEfectos) victoria.play();
    } else {
        title = 'Empate';
        if (permitirEfectos) gameOver.play();
    }
    Swal.fire({
        title: title,
        showCloseButton:true,
        allowOutsideClick:false,
        confirmButtonText: 'Jugar otra',
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-warning',
            cancelButton: 'btn btn-secondary'
        }
    })
    Swal.getConfirmButton().onclick = function() {
        reinicio();
        Swal.close();
        comenzar();
    }
    Swal.getCancelButton().onclick = function() {
        reinicio('total');
        ocultarObjetos(tablero);
        mostrarObjetos(headline);
        Swal.close();
    }
}
