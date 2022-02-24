// variables que afectan el DOM

// modales
let modal1 = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");

// botones
let btn = document.getElementById("myBtn");
let btn2 = document.getElementById("myBtn2");
let btn3 = document.getElementById('botonModal2')

// cruz del modal de inicio
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close")[1];

// boton dentro de modal de inicio que comienza el juego
let btnComenzar = document.getElementById("botonModal");


// variables globales

const delay = ms => new Promise(res => setTimeout(res, ms));
const circulo = "https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png";
const cruz = "https://img.icons8.com/ios-filled/50/26e07f/circled.png";
let turno = 0;
let forma1 = "";
let forma2 = "";
let player1 = '';
let player2 = '';
let dificultad = 2;
let jugadores = '';
let ganador = "";
let perdedor = '';

// cuando se aprieta boton de inicio se abre modal de inicio

btn.onclick = function() {
    if (document.getElementById('nombrep1').innerHTML === 'Jugador 1') {
        modal1.style.display = "block";
        document.getElementById('player1').focus();
    } else {
        reinicio();
        comenzar();
        btn2.style.display = 'none';
    }
}

btn2.onclick = function(){
    modal1.style.display = "block";
    btn2.style.display = 'none';
}

// para iniciar otra partida.

function reinicio(){
    modal2.style.display = "none";
    document.getElementById('headline').style.marginTop = '150px';
    document.getElementById('titulo').style.display = 'block';
    document.getElementById('myBtn').style.display = 'initial';
    document.getElementById('tablero').style.display = 'none';
    document.getElementById('queJugador').style.display = 'none';
    btn2.style.display = 'block';

    turno = 0;
    forma1 = "";
    forma2 = "";
    player1 = '';
    player2 = '';
    ganador = "";

    for (let i = 0; i < 9; i++) {
        document.getElementById(`tarjetas${(i+1)}`).style.backgroundImage = '';
    }

}

// Cuando se clickea <span> (x), se cierran los modales
span.onclick = function() {
modal1.style.display = "none";
}

span2.onclick = function() {
    modal2.style.display = "none";
    }

// Si se aprieta fuera del modal se cierra.
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// cuando cliqueo el boton comenzar dentro del modal de inicio se ajustan posiciones y aparece el tablero.

function comenzar(){

    jugadores = document.querySelector('input[name="jugadores"]:checked').value;
    player1 = document.querySelector('#player1').value;
    if(jugadores == 'unJugador'){
        player2 = 'Skynet';
    } else {
        player2 = document.querySelector('#player2').value;
    }
    let selection = document.querySelector('input[name="razon"]:checked').value;

    // nombres de jugadores y seleccion de figura

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

    modal1.style.display = "none";
    document.getElementById('headline').style.marginTop = '10px';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('myBtn').style.display = 'none';
    document.getElementById('tablero').style.display = "flex";
    document.getElementById('tablero').style.flexWrap = "wrap";

    let empieza = Math.round(Math.random()) + 1;

    if (empieza == 1){
        document.getElementById('queJugador').innerHTML = `Es el turno de: ${player1}`;
        document.getElementById('queJugador').style.display = 'block';
        turno = 1;

    } else {
        document.getElementById('queJugador').innerHTML = `Es el turno de: ${player2}`;
        document.getElementById('queJugador').style.display = 'block';
        turno = 2;
        if(jugadores == 'unJugador'){
            juegoAutonomo(dificultad);
        }
    }

}

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



// funcion que detecta cuando terminar el juego

function comprobacion() {
    let ganador = "";
    for (let i = 0; i < 8; i++) {
        condA = condicionGanar[i][0];
        condB = condicionGanar[i][1];
        condC = condicionGanar[i][2];

        if (signo[`bloq${condA}`] === '' || signo[`bloq${condB}`] === '' || signo[`bloq${condC}`]=== '') {
            continue;
        }

        if (signo[`bloq${condA}`] == signo[`bloq${condB}`] && signo[`bloq${condB}`] == signo[`bloq${condC}`]) {
            if (forma1 == signo[`bloq${condC}`]){
                ganador = player1;
            } else {
                ganador = player2;
            }
            document.getElementById('jugadorGanador').innerHTML = ganador;
            document.getElementById('jugadorGanador').style.display = 'block';
            modal2.style.display = "block";
            // localStorage.setItem('ticTacWin',`${ganador}`)
            // localStorage.setItem('ticTacLoss', `${perdedor}`)
            break;
        }
    }
    if (bloques.bloq1 == 1 && bloques.bloq2 == 1 && bloques.bloq3 == 1 && bloques.bloq4 == 1 && bloques.bloq5 == 1 && bloques.bloq6 == 1 && bloques.bloq7 == 1 && bloques.bloq8 == 1 && bloques.bloq9 == 1 && ganador === '') {
        document.getElementById('jugadorGanador').innerHTML = "Empate";
        // let empatados = [`${ganador}`, `${perdedor}`]
        // localStorage.setItem('ticTacDraw', `${empatados}`)
        document.getElementById('jugadorGanador').style.display = 'block';
        modal2.style.display = "block";

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
            comprobacion();
            if(jugadores == 'unJugador'){
                juegoAutonomo(dificultad);
            }

            } else{
            document.getElementById(`tarjetas${casilla}`).style.backgroundImage = `url("${forma2}")`;
            bloques[`bloq${casilla}`] = 1;
            signo[`bloq${casilla}`] = forma2;
            turno = 1;
            document.getElementById('queJugador').innerHTML = `Es el turno de: ${player1}`;
            comprobacion();

            }
    } else {
        // poner cartel de casillero ocupado
    }
    
}



const juegoAutonomo = async (dificultad) => {
    await delay(2500);
    if (ganador == ''){
        if (dificultad == 1){
            aleatorio = Math.round(Math.random() * 9);
            while (bloques[`bloq${aleatorio}`] == 1) {
                aleatorio = Math.round(Math.random() * 9);
            }
            juego(aleatorio);
        } else if (dificultad == 2){
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
}


// function guardarDatos(resultado) {
//     switch (resultado) {
//         case 'ganador':

//             localStorage.getItem('ticTacWin') == undefined ? localStorage.setItem() : localStorage.setItem();
//             // localStorage.setItem('ticTacWin',`${ganador}`)
//             // localStorage.setItem('ticTacLoss', `${perdedor}`)
//             break;
    
//         case 'empate':
        
//             break;
//         default:
//             break;
//     }
// }

//  falta comprobacion de formularios en modal de inicio.