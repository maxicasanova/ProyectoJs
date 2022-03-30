
let listaSolitario = JSON.parse(localStorage.getItem('solitario'));

// variables que afectan al DOM.

let headline = document.querySelector('#headline');
let btn = document.getElementById("myBtn");
let btnDeshacer = document.getElementById('btnDeshacer');
let btnReiniciar = document.getElementById('btnReiniciar');
let cuerpoJuego = document.querySelector('#cuerpoJuego');
let puntosDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[5];
let tiempoDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[3];
let nombreDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[1];


// variables globales.

const puntosCarta = 5;
const puntosAses = 10;
const puntosMazo = 50;
const backgrounds = 
['url(../media/solitario/spades.png)',
'url(../media/solitario/diamonds.png)',
'url(../media/solitario/clubs.png)',
'url(../media/solitario/hearts.png)']

let time0 = Date.now();
let puntos = 0;
let puntosDes = 0;
const suitsInit = ['S', 'D', 'C', 'H']
let padreOrigen = '';
let cartaAnterior = '';
let padreAnterior = '';
let cartaDestapada = 0;
const sonidoMazo = new Audio('../media/sonidos/card-deck.wav');
const cardTap = new Audio('../media/sonidos/card-tap.wav');
sonidoMazo.volume = 0.05;
cardTap.volume = 0.05;

// funciones que empiezan el juego. Interactuan con el otro archivo contructormazo.js

function comenzar(){

    crearTablero();
    mazo1.addEventListener("click", function() {
        if(mazo1.children.length == 0){
            puntos -= puntosMazo;
            if (permitirEfectos) sonidoMazo.play(); 
            while (mazo2.childNodes.length > 0) {
                mazo1.appendChild(mazo2.firstChild);
            }
            mazo1.style.backgroundImage = 'url(../media/solitario/cardBack.png)';
        } else{
            mazo1.firstChild.style.zIndex = mazo2.childNodes.length;
            cartaAnterior = mazo1.firstChild;
            mazo2.appendChild(mazo1.firstChild);
            padreAnterior = mazo1;
            if (permitirEfectos) cardTap.play();
            if(mazo1.children.length == 0) mazo1.style.backgroundImage = 'none';
        }
        mostrarPuntos();
    })

}

function renderDeck(deck){
    let arrayColumnas = document.getElementsByClassName('columna')
	mazo1.innerHTML = '';

	for(var i = 0; i < deck.length; i++){
		let card = document.createElement("div");
		card.innerHTML = '<p>'+ deck[i].Value + '' + deck[i].Icon + '</p>';
		card.classList.add('carta',`${deck[i].Suit}`);
        card.id = deck[i].Id;
        card.draggable = true;

        if(i<28){
            switch (i) {
                case 0:
                    arrayColumnas[1].appendChild(card);
                    break;
                case 1: case 2:
                    arrayColumnas[2].appendChild(card);
                    break;
                case 3: case 4: case 5:
                    arrayColumnas[3].appendChild(card);
                    break;
                case 6: case 7: case 8: case 9:
                    arrayColumnas[4].appendChild(card);
                    break;
                case 10: case 11: case 12: case 13: case 14: 
                    arrayColumnas[5].appendChild(card);
                    break;
                case 15: case 16: case 17: case 18: case 19: case 20: 
                    arrayColumnas[6].appendChild(card);
                    break;
                default:
                    arrayColumnas[7].appendChild(card);
                    break;
            }
            if (permitirEfectos) cardTap.play();
        }else{
            mazo1.appendChild(card);
        }
	}

    for (let x = 2; x < 8; x++) {
        for (let y = 0; y < x ; y++) {
            if (y<x-1){
                arrayColumnas[x].childNodes[y].classList.add('dorso');
                arrayColumnas[x].childNodes[y].draggable = false;
            }
            if (y>0){
                arrayColumnas[x].childNodes[y].style.marginTop = '-62px';
            }
        }
    }
}

// event listeners

tablero.addEventListener('dragover', function(e){
    e.preventDefault();
}, false);

btn.addEventListener('click', function() {

    Swal.fire({
        title: 'Bienvenido!',
        input: 'text',
        inputLabel:'Ingrese su nombre',
        inputPlaceholder: 'Jugador1',
        showCloseButton:true,
        confirmButtonText: 'Empezamos',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-danger'
        }
    })
    const name = Swal.getInput()
    Swal.getConfirmButton().onclick = function() {
        if (name.value !== "") {
            nombreDom.innerHTML = capitalize(name.value);
            Swal.close();
            time0 = Date.now();
            ocultarObjetos(headline);
            mostrarObjetos(cuerpoJuego);
            comenzar();
            renderDeck(mazo);
            myInterval = setInterval(clock, 1000);
        } else {
            Swal.showValidationMessage('Asegurese de completar su nombre.');
        }
    }
})

tablero.addEventListener('dragover', function(e){
    e.preventDefault();
}, false);

document.addEventListener('drop',function(e) {
    let id = e.dataTransfer.getData('text');
    let draggableElement = document.getElementById(id);
    cartaAnterior = draggableElement;
    let dropzone = e.target;
    let numeroDrop = parseInt(dropzone.id);
    let numeroDrag = parseInt(draggableElement.id);
    let numeroDrop2 = parseInt(dropzone.id.substr(1));
    let numeroDrag2 = parseInt(draggableElement.id.substr(1));
    const condicion1 = (dropzone.className == 'columna' && dropzone.innerHTML == '' && numeroDrag2 == 13);
    const condicion2 = (dropzone.className == 'carta diamonds' || dropzone.className == 'carta hearts');
    const condicion3 = (draggableElement.className == 'carta clubs' || draggableElement.className == 'carta spades');
    const condicion4 = (dropzone.className == 'carta clubs' || dropzone.className == 'carta spades');
    const condicion5 = (draggableElement.className == 'carta diamonds' || draggableElement.className == 'carta hearts');

    function cambiosCarta(){
        draggableElement.style.marginTop = '0px';
        dropzone.appendChild(draggableElement);
        puntos += puntosCarta;
        puntosDes = puntos;
    }

    if (dropzone != padreOrigen){
        if (condicion1) {
            cambiosCarta();
        } else if (condicion2 && condicion3 || condicion4 && condicion5){
            if (numeroDrop2 == numeroDrag2 + 1){
                cambiosCarta();
            }
        }
        if(/\bsubcolumna\b/.test(dropzone.className)){
            if (numeroDrop + 1 == numeroDrag){
                draggableElement.classList.add('subcolumna');
                draggableElement.style.zIndex = dropzone.style.zIndex + 1;
                draggableElement.style.marginTop = '0px';
                draggableElement.draggable = false;
                if(dropzone.id % 100 == 0 ){
                    dropzone.appendChild(draggableElement);
                }else{
                    dropzone.parentNode.appendChild(draggableElement);
                }
                puntos += puntosAses;
                puntosDes = puntos;
            }
        }
        if (permitirEfectos) cardTap.play();
    }
    destaparCartas();
    e.dataTransfer.clearData();
    mostrarPuntos();
    controlGanador();
}, false);


document.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    padreOrigen = document.getElementById(e.target.id).parentElement;
    padreAnterior = padreOrigen;
}, false);


tablero.addEventListener('dblclick', function(e){

    let idObj = parseInt(e.target.id);
    cartaAnterior = document.getElementById(e.target.id);
    padreOrigen = document.getElementById(e.target.id)?.parentElement;
    padreAnterior = padreOrigen;
    for (let i = 1; i < 5; i++) {
        let centena = i*100;
        let subcolumna = document.getElementById(centena);
        let ultimoHijo = parseInt(subcolumna.lastChild?.id) || parseInt(subcolumna.id);
        if(idObj == ultimoHijo + 1){
            e.target.classList.add('subcolumna');
            e.target.style.zIndex = subcolumna.lastChild?.style.zIndex + 1 || 1;
            e.target.style.marginTop = 0;
            e.target.draggable = false;
            subcolumna.appendChild(e.target);
            if (permitirEfectos) cardTap.play();
            puntos += puntosAses;
            puntosDes = puntos;
        }
    }
    destaparCartas();
    mostrarPuntos();
    controlGanador();
})

btnDeshacer.onclick = function(){
    if (padreAnterior == mazo1){
        padreAnterior.prepend(cartaAnterior);
    } else {
        padreAnterior.appendChild(cartaAnterior);
        puntos -= puntosDes;
        mostrarPuntos();
        if (cartaDestapada){
            padreAnterior.childNodes[(padreAnterior.childNodes.length-2)].classList.add('dorso');
            padreAnterior.childNodes[(padreAnterior.childNodes.length-2)].draggable = false;
            cartaAnterior.style.marginTop = '-62px';
        }
    }
    cartaDestapada = 0;
    juegoCompleto = 1;
}

btnReiniciar.onclick = function(){
    tablero.innerHTML = '';
    puntos = 0;
    deck1 = getDeck();
    mazo = shuffle(deck1);
    comenzar();
    renderDeck(mazo);
    mostrarPuntos();
    time0 = Date.now();
    myInterval = setInterval(clock, 1000);
}

// funcion que determina el fin del juego cuando se gana.

function controlGanador (){
    let cartasOcultas = document.getElementsByClassName('dorso');
    ((mazo1.length??true) && (mazo2.length??true ) && cartasOcultas.length == 0) && ganar();
}

// funciones que modifican el tableron tanto en puntos como el tiempo.

function mostrarPuntos(){
    puntosDom.innerHTML = `Puntuacion: ${puntos}`;
}

// funcion para verificar que carta destapar.

function destaparCartas(){
    if(/\bcolumna\b/.test(padreOrigen?.className) && (padreOrigen?.childNodes.length) > 0){
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].classList.remove('dorso');
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].draggable = true;
        if (padreOrigen != mazo1) cartaDestapada = 1;
    } else {
        cartaDestapada = 0;
    }
}

// funcion para calcular el tiempo de juego.

function clock() {
    let time1 = Date.now();
    time1= new Date(time1 - time0),
        minutes = time1.getMinutes(),
        seconds = time1.getSeconds();

    tiempoDom.innerHTML =  harold(minutes) + ":" + harold(seconds);
    
    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}

// funciones para controlar si existe un registro en el localstorage y despues funcion para mostrar mensaje de ganador.

function controlStorage () {
    if(listaSolitario){
        listaSolitario.push({nombre: nombreDom.innerHTML, tiempo: tiempoDom.innerHTML, puntos: puntos});
    }else{
        listaSolitario = [{nombre: nombreDom.innerHTML, tiempo: tiempoDom.innerHTML, puntos: puntos}];
    }
    localStorage.setItem('solitario', JSON.stringify(listaSolitario));
}

// funcion que determina la victoria.

function ganar(){
    clearInterval(myInterval);
    controlStorage();
    if (permitirEfectos) victoria.play();
    Swal.fire({
        title: `Felicidades! ${nombreDom.innerHTML}`,
        text: 'Ganaste la partida',
        icon: 'success',
        confirmButtonText: 'Bravo',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-danger',
        }
    });
}
