// variables para el localStorage

let listaSolitario = JSON.parse(localStorage.getItem('solitario'));

// variables que afectan al DOM.

let tablero = document.querySelector('#solitario');
let headline = document.querySelector('#headline');
let cuerpoJuego = document.querySelector('#cuerpoJuego');
let puntosDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[5];
let tiempoDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[3];
let nombreDom = document.querySelector('#cuerpoJuego').childNodes[1].childNodes[1];

let mazo1 = '';
let mazo2 = '';

let btn = document.getElementById("myBtn");
// let btn2 = document.getElementById("myBtn2");


// variables globales.

const puntosCarta = 5;
const puntosAses = 10;
const puntosMazo = 50;

let time0 = Date.now();
let puntos = 0;
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let padreOrigen = '';

let deck1 = getDeck();
let mazo = shuffle(deck1);


// funciones que forman el tablero.

function comenzar(){
    
    for (let i = 0; i < 9; i++) {
        const columnas = document.createElement('div');
        columnas.className = 'columna';
        columnas.style.left = `${i*24+8}px`;
        columnas.style.top = '16px';
        columnas.style.position= 'relative';
        tablero.appendChild(columnas);

        if(i == 0){
            for (let i = 0; i < 2; i++) {
                let subcolumnas = document.createElement('div');
                subcolumnas.className = 'subcolumna';
                subcolumnas.style.position= 'relative';
                subcolumnas.id = `mazo${i+1}`;
                document.getElementsByClassName('columna')[0].appendChild(subcolumnas);
            }
        } else if(i == 8){
            for (let i = 0; i < 4; i++) {
                const backgrounds = ['url(../media/solitario/spades.png)','url(../media/solitario/diamonds.png)','url(../media/solitario/clubs.png)','url(../media/solitario/hearts.png)']
                let subcolumnas = document.createElement('div');
                subcolumnas.style.backgroundImage = backgrounds[i];
                subcolumnas.className = 'subcolumna';
                subcolumnas.style.position= 'relative';
                subcolumnas.id = (i+1)*100;
                document.getElementsByClassName('columna')[8].appendChild(subcolumnas);
            }
        }
    }
    mazo1 = document.getElementById("mazo1");
    mazo2 = document.getElementById("mazo2");

    mazo1.addEventListener("click", function() {
    
        if(mazo1.children.length == 0){
            puntos -= puntosMazo;
            while (mazo2.childNodes.length > 0) {
                mazo1.appendChild(mazo2.firstChild);
            }
        } else{
            mazo1.firstChild.style.zIndex = mazo2.childNodes.length;
            mazo2.appendChild(mazo1.firstChild);
        }
        mostrarPuntos();
        // checkear el final de mazo. y cambiar clase.
    
    }, false)
}

// funciones que formar el mazo de cartas.

function getDeck()
{
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i], Id:((i+1)*100 + (x+1))};
			deck.push(card);
		}
	}

	return deck;
}


function shuffle(deck){

	for (let i = 0; i < 3000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
    return deck;
}

function renderDeck(deck){
    let arrayColumnas = document.getElementsByClassName('columna')
	mazo1.innerHTML = '';

	for(var i = 0; i < deck.length; i++){

		var card = document.createElement("div");
		var icon = '';
		if (deck[i].Suit == 'hearts'){
            icon='&#x02665';
            card.classList.add('hearts');

        }else if (deck[i].Suit == 'spades'){
            icon = '&#9824';
            card.classList.add('spades');

        }else if (deck[i].Suit == 'diamonds'){
            icon = '&#9830';
            card.classList.add('diamonds');
        }else{
            icon = '&#9827';
            card.classList.add('clubs');
        }
		card.innerHTML = '<p>'+ deck[i].Value + '' + icon + '</p>';
		card.classList.add('carta');
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

btn.onclick = function() {

    Swal.fire({
        title: 'Bienvenido!',
        input: 'text',
        inputLabel:'Ingrese su nombre',
        inputPlaceholder: 'Jugador1',
        showCloseButton:true,
        confirmButtonText: 'Empezamos',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-warning',
        }
    })
    const name = Swal.getInput()
    Swal.getConfirmButton().onclick = function() {
        nombreDom.innerHTML = name.value;
        Swal.close();
        ocultarObjetos(headline);
        mostrarObjetos(cuerpoJuego);
        console.log(nombreDom);
        comenzar();
        renderDeck(mazo);
        myInterval = setInterval(clock, 1000);
    }
}


tablero.addEventListener('dragover', function(e){
    e.preventDefault();
}, false);

document.addEventListener('drop',function(e) {
    let id = e.dataTransfer.getData('text');
    let draggableElement = document.getElementById(id);
    draggableElement.classList.remove('hide');
    draggableElement.style.marginTop = '0px';
    let dropzone = e.target;
    let numeroDrop = parseInt(dropzone.id);
    let numeroDrag = parseInt(draggableElement.id);
    let numeroDrop2 = parseInt(dropzone.id.substr(1));
    let numeroDrag2 = parseInt(draggableElement.id.substr(1));

    if (dropzone.className == 'columna' && dropzone.innerHTML == '' && numeroDrag2 == 13) {
        dropzone.appendChild(draggableElement);
        puntos += puntosCarta;
    } else if (dropzone.className == 'diamonds carta' || dropzone.className == 'hearts carta'){
        if (draggableElement.className == 'clubs carta' || draggableElement.className == 'spades carta') {
            if (numeroDrop2 == numeroDrag2 + 1){
                dropzone.appendChild(draggableElement);
                puntos += puntosCarta;
            } else{
                draggableElement.style.marginTop = '-62px';
            }
        } else{
            draggableElement.style.marginTop = '-62px';
        }
    } else if (dropzone.className == 'clubs carta' || dropzone.className == 'spades carta'){
        if (draggableElement.className == 'diamonds carta' || draggableElement.className == 'hearts carta') {
            if (numeroDrop2 == numeroDrag2 + 1){
                dropzone.appendChild(draggableElement);
                puntos += puntosCarta;
            } else {
                draggableElement.style.marginTop = '-62px';
            }
        } else{
            draggableElement.style.marginTop = '-62px';
        }
    } else if(/\bsubcolumna\b/.test(dropzone.className)){

        if (numeroDrop + 1 == numeroDrag){
            draggableElement.classList.add('subcolumna');
            draggableElement.style.zIndex = dropzone.style.zIndex + 1;
            if(dropzone.id % 100 == 0 ){
                dropzone.appendChild(draggableElement);
            }else{
                dropzone.parentNode.appendChild(draggableElement);
            }
            puntos += puntosAses;
            draggableElement.draggable = false;
        }
    } else if (padreOrigen.className == dropzone.className || /\bcarta\b/.test(dropzone.className) || dropzone.id == 'solitario'){
        draggableElement.style.marginTop = '-62px';
    }
    if(/\bcolumna\b/.test(padreOrigen.className) && (padreOrigen.childNodes.length) > 0){
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].classList.remove('dorso');
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].draggable = true;
    }
    e.dataTransfer.clearData();
    mostrarPuntos();
    controlGanador();
}, false);



document.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
    // e.dataTransfer.setDragImage(this, 0, 0);

    // aprender a cambiar el drag image.
    padreOrigen = document.getElementById(e.target.id).parentElement;
}, false);


document.addEventListener('dblclick', function(e){
    let idObj = parseInt(e.target.id);
    padreOrigen = document.getElementById(e.target.id).parentElement;
    for (let i = 1; i < 5; i++) {
        let centena = i*100;
        let subcolumna = document.getElementById(centena);
        let ultimoHijo = parseInt(subcolumna.lastChild?.id) || parseInt(subcolumna.id);
        if(idObj == ultimoHijo + 1){
            e.target.classList.add('subcolumna');
            e.target.style.zIndex = subcolumna.lastChild?.style.zIndex + 1 || 1;
            e.target.style.marginTop = 0;
            subcolumna.appendChild(e.target);
            puntos += puntosAses;
            e.target.draggable = false;
        }
    }
        if(/\bcolumna\b/.test(padreOrigen.className) && (padreOrigen.childNodes.length) > 0){
            padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].classList.remove('dorso');
            padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].draggable = true;
        }
    mostrarPuntos();
    controlGanador();
})


// funcion que determina el fin del juego cuando se gana.

function controlGanador (){
    let cartasOcultas = document.getElementsByClassName('dorso');
    ((mazo1.length??true) && (mazo2.length??true ) && cartasOcultas.length == 0) && ganar();
}


// funciones que modifican el tableron tanto en puntos como el tiempo.

function mostrarPuntos(){
    puntosDom.innerHTML = `Puntuacion: ${puntos}`;
}

function clock() {// We create a new Date object and assign it to a variable called "time".
    let time1 = Date.now();
    time1= new Date(time1 - time0),
        
        hours = time1.getHours() - 21,
        
        minutes = time1.getMinutes(),
        
        seconds = time1.getSeconds();
    
    
    tiempoDom.innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
    
    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}


function ocultarObjetos(objetivo){
    objetivo.classList.add('hidden');
}

function mostrarObjetos (objetivo){
    objetivo.classList.remove('hidden');
}

function controlStorage () {
    listaSolitario? 'append':'new';
}

function ganar(){
    clearInterval(myInterval);
    
    Swal.fire({
        title: 'Felicidades!',
        text: 'Ganaste la partida',
        icon: 'success',
        confirmButtonText: 'Bravo'
    })
}

// definir funcion para determinar ganador
// ordenar el script para que las variables los listener y las funciones esten juntas.
// corregir cuando la suelto en mazo2.
// contador de movimientos
// contador de tiempo
//animacion de final partida.
//set dragImage!.
