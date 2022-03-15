// Este archivo creo el mazo, que se hace aleatorio con una funcion, y creo las subcolumnas del tablero.
// para juego Solitario.

//  variables

let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["spades", "diamonds", "clubs", "hearts"];
let icons = ['&#9824','&#9830','&#9827','&#x02665']
let mazo1 = '';
let mazo2 = '';
let tablero = document.querySelector('#solitario');

class Carta {
    constructor (x, y){
        this.Value = values[x];
        this.Suit = suits[y];
        this.Id = ((y+1)*100 + (x+1));
        this.Icon = icons[y];
    }
}

let deck1 = getDeck();
let mazo = shuffle(deck1);

// funciones que hacen el mazo

function getDeck() {
	let deck = new Array();
	for(let i = 0; i < suits.length; i++) {
		for(let x = 0; x < values.length; x++) {
			let card = new Carta(x,i);
			deck.push(card);
		}
	}
	return deck;
}

function shuffle(deck){

	for (let i = 0; i < 3000; i++) {
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];
		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
    return deck;
}

// funcion que crea el tablero 

function crearTablero (){
    for (let i = 0; i < 9; i++) {
        const columnas = document.createElement('div');
        columnas.className = 'columna';
        tablero.appendChild(columnas);

        if(i == 0){
            for (let i = 0; i < 2; i++) {
                let subcolumnas = document.createElement('div');
                subcolumnas.className = 'subcolumna';
                subcolumnas.id = `mazo${i+1}`;
                document.getElementsByClassName('columna')[0].appendChild(subcolumnas);
            }
        } else if(i == 8){
            for (let i = 0; i < 4; i++) {
                let subcolumnas = document.createElement('div');
                subcolumnas.style.backgroundImage = backgrounds[i];
                subcolumnas.className = 'subcolumna';
                subcolumnas.id = (i+1)*100;
                document.getElementsByClassName('columna')[8].appendChild(subcolumnas);
            }
        }
    }
    mazo1 = document.getElementById("mazo1");
    mazo2 = document.getElementById("mazo2");
}