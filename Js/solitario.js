
let tablero = document.querySelector('#solitario');

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
}

comenzar();

let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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

let deck1 = getDeck();

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

let padreOrigen = '';

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
    } else if (dropzone.className == 'diamonds card' || dropzone.className == 'hearts card'){
        if (draggableElement.className == 'clubs card' || draggableElement.className == 'spades card') {
            if (numeroDrop2 == numeroDrag2 + 1){
                dropzone.appendChild(draggableElement);
            } else{
                draggableElement.style.marginTop = '-62px';
            }
        } else{
            draggableElement.style.marginTop = '-62px';
        }
    } else if (dropzone.className == 'clubs card' || dropzone.className == 'spades card'){
        if (draggableElement.className == 'diamonds card' || draggableElement.className == 'hearts card') {
            if (numeroDrop2 == numeroDrag2 + 1){
                dropzone.appendChild(draggableElement);
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
            draggableElement.draggable = false;
        }
    } else if (padreOrigen.className == dropzone.className || /\bcard\b/.test(dropzone.className) || dropzone.id == 'solitario'){
        draggableElement.style.marginTop = '-62px';
    }
    if(/\bcolumna\b/.test(padreOrigen.className) && (padreOrigen.childNodes.length) > 0){
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].classList.remove('dorso');
        padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].draggable = true;
    }
    console.log(dropzone.id, dropzone.className)
    e.dataTransfer.clearData();
    controlGanador();
}, false);

function renderDeck(deck){
    let arrayColumnas = document.getElementsByClassName('columna')
	document.getElementById('mazo1').innerHTML = '';

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
		card.classList.add('card');
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
            document.getElementById("mazo1").appendChild(card);
        }

	}

    for (let x = 2; x < 8; x++) {
        for (let y = 0; y < x ; y++) {
            console.log(arrayColumnas[x])
            console.log(arrayColumnas[x].childNodes)
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

document.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
    // e.dataTransfer.setDragImage(this, 0, 0);

    // aprender a cambiar el drag image.
    padreOrigen = document.getElementById(e.target.id).parentElement;
}, false);

let mazo = shuffle(deck1);

renderDeck(mazo);

let mazo1 = document.getElementById("mazo1");
let mazo2 = document.getElementById("mazo2");

document.getElementById("mazo1").addEventListener("click", function() {
    
    if(mazo1.children.length == 0){
        while (mazo2.childNodes.length > 0) {
            mazo1.appendChild(mazo2.firstChild);
        }
    } else{
        mazo1.firstChild.style.zIndex = mazo2.childNodes.length;
        mazo2.appendChild(mazo1.firstChild);
    }

    // checkear el final de mazo. y cambiar clase.

}, false)


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
            e.target.draggable = false;
        }
    }
        if(/\bcolumna\b/.test(padreOrigen.className) && (padreOrigen.childNodes.length) > 0){
            padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].classList.remove('dorso');
            padreOrigen.childNodes[(padreOrigen.childNodes.length-1)].draggable = true;
        }
    controlGanador();
})

function controlGanador (){
    let cartasOcultas = document.getElementsByClassName('dorso');
    ((mazo1.length??true) && (mazo2.length??true ) && cartasOcultas.length == 0) && alert('Ganaste');
}

// function ganar(){

// }

// definir funcion para determinar ganador
// ordenar el script para que las variables los listener y las funciones esten juntas.
// corregir cuando la suelto en mazo2.
// contador de movimientos
// contador de tiempo
//animacion de final partida.
//set dragImage!.
