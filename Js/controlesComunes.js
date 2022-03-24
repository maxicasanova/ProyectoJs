let reglas = document.getElementById("reglamento");
let musica = document.getElementById("musica");
let musicOn = document.getElementById("musicOn");
let musicOff = document.getElementById("musicOff");
let efectos = document.getElementById('efectos');
let efectosOn = document.getElementById('efectosOn');
let efectosOff = document.getElementById('efectosOff');
let parrafo1 = '';
let played = 0
let permitirEfectos = 1;
let juegoCompleto = 0;
let musicaFondo = new Audio('../media/sonidos/fondoIndex.mp3');
let victoria = new Audio('../media/sonidos/level-completed.wav');
let gameOver = new Audio('../media/sonidos/gameOver.wav');

victoria.volume = 0.05;
gameOver.volume = 0.05;

let parrafo = async function () {
    const resp = await fetch('../JSON/reglamento.json');
    const data = await resp.json();
    let pagina = document.getElementById('titulo').innerHTML;
    parrafo1 =  data[pagina];
}

// event listeners

window.onload = parrafo();

reglas.onclick = () => {
    Swal.fire({
        title: 'Reglas',
        text: parrafo1,
        showCloseButton:true,
        confirmButtonText: 'Perfecto',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-secondary'
        }
    })
}


musica.onclick = () => {
    if(played == 0){
        musicaFondo.play();
        musicaFondo.loop = true;
        musicaFondo.volume = 0.05;
        played = 1;
        ocultarObjetos(musicOff);
        mostrarObjetos(musicOn);
    } else {
        musicaFondo.pause();
        played = 0;
        ocultarObjetos(musicOn);
        mostrarObjetos(musicOff);
    }
    
}

efectos.onclick = () => {
    if(permitirEfectos){
        permitirEfectos = 0;
        ocultarObjetos(efectosOn);
        mostrarObjetos(efectosOff);
    }else{
        permitirEfectos = 1;
        ocultarObjetos(efectosOff);
        mostrarObjetos(efectosOn);
    }
}

// funciones para todos

// funciones para mostrar y ocultar indicaciones del juego.

function ocultarObjetos(objetivo){
    objetivo.classList.add('hidden');
}

function mostrarObjetos (objetivo){
    objetivo.classList.remove('hidden');
}

// para hacer la primera letra de todos los nombres ingresados uppercase

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}


