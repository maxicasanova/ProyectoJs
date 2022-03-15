// variables para el localStorage

let listaPlataforma = JSON.parse(localStorage.getItem('plataforma'));

// variables del DOM

let btn = document.getElementById("myBtn");
let headline = document.querySelector('#headline');
let pausa = document.querySelector('#pausa');

// canvas

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//posicion inicial

let x = canvas.width/2;
let y = canvas.height-canvas.height*0.1;

// incrementos
let dx = canvas.width * 0.0042;
let dy = -canvas.height * 0.00625;
const radioBola = canvas.height*0.016;
let velocidadPlat = canvas.width * 0.0146;

//plataforma

const plataformaAlto = canvas.height*0.02;
const plataformaAncho = canvas.width*0.15;
let plataformaX = (canvas.width-plataformaAncho)/2;

// capturadores de teclas

let derecha = false
let izquierda = false

// grid de ladrillos

const marginLadTop = canvas.height * 0.1;
const marginLadIzq = canvas.width * 0.0625;
const filasLad = 9;
const columnasLad = Math.round(canvas.width/30);
const anchoLad = (canvas.width / (columnasLad+2));
const altoLad = canvas.height * 0.03;
const paddingH = 2;
const paddingV = altoLad / 2;
const coloresLadrillos = ["#FF6746", "#A92003", "#5E1101"]
const sonidoPlat = new Audio('../media/sonidos/plataforma.wav');
const sonidoToc = new Audio('../media/sonidos/card-tap.wav');
sonidoPlat.volume = 0.05;
sonidoToc.volume = 0.05;

let ladrillos = []
let otrosNiveles = '';

let nivelesExt = async function () {
    const resp = await fetch('../JSON/nivelesPlat.json');
    otrosNiveles = await resp.json();
}

window.onload = nivelesExt();

function creadorLadrillos(nivel){
    for (let c = 0; c < columnasLad; c++) {
        ladrillos [c] = [];
        for (let r = 0; r < filasLad; r++) {
            ladrillos [c][r] = { x:0, y:0, estado:1 };
            ladrillos[c][r].x = marginLadIzq + c*(anchoLad+paddingH);
            ladrillos[c][r].y = marginLadTop + r*(altoLad+paddingV);
            if (nivel == 1){
                if (c % 3 == 0) ladrillos[c][r].estado = 0;
            }else if (nivel == 2 || nivel == 3){
                if( r % 2 == 0){
                    ladrillos[c][r].estado = 2;
                    if ( nivel == 3 && c % 3 == 0) ladrillos[c][r].estado = 3;
                }
            } else if (nivel == 4){
                if(r>2 && r<6){
                    ladrillos[c][r].estado = 2;
                } else if (r>5){
                    ladrillos[c][r].estado = 3;
                }
            } else if( nivel == 5){
                ladrillos[c][r].estado = Math.round(Math.random()*3);
            } else if (nivel == 6){
                ladrillos[c][r].estado = otrosNiveles.nivel6[c][r];
            }
        }
    }
}

// variables generales

let puntos = 0;
let vidas = 3;
let sumaLadrillos = 0;
let comienzo = 1;
let cambioVida = 0;
let reiniciado = 0;
let nivel = 1;
let player1 = '';
const delay = ms => new Promise(res => setTimeout(res, ms));
const retardarDraw = async () => {
    await delay(2500);
    draw();
}

// cuando se aprieta boton de inicio se abre modal de inicio

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
            confirmButton: 'btn btn-danger',
        }
    });
    Swal.getConfirmButton().onclick = function() {
        player1 = Swal.getInput().value;
        Swal.close();
        mostrarObjetos(canvas);
        mostrarObjetos(pausa)
        ocultarObjetos(headline);
        comenzar();
    }
}

// funciones que detectan las teclas

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        derecha = true;
    }
    else if(e.keyCode == 37) {
        izquierda = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        derecha = false;
    }
    else if(e.keyCode == 37) {
        izquierda = false;
    }
}

// event listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener('touchstart', touchHandler, true);
document.addEventListener('touchmove', touchHandler, true);
document.addEventListener('touchend', touchHandler, true);
document.addEventListener('touchcancel', touchHandler, true);
pausa.addEventListener("click", pausaReanuda, false);

// funcion comenzar

function comenzar(){
    document.getElementById('nombrep1').innerHTML = player1;
    if(reiniciado == 1) {
        puntos = 0;
        vidas = 3;
        sumaLadrillos = 0;
        comienzo = 1;
        nivel = 1;
    } 

    // ver que pasa cuando se pierde!
    creadorLadrillos(nivel);
    inicial();
}

function reinicio(numero){
    if (numero == 1){
        Swal.fire({
            title: 'Perdiste!',
            showCloseButton:true,
            confirmButtonText: 'Jugar de nuevo',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-danger',
            }
        });
    } else if (numero == 2){
        if (nivel == 10){

            //  ojo aca esto esta mal!
            Swal.fire({
                title: 'Perdiste!',
                showCloseButton:true,
                confirmButtonText: 'Jugar de nuevo',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-danger',
                }
                // ver boton de cancelacion o salir.
            });
            numero = 1;
        } else{
            nivel++;
            Swal.fire({
                title: 'Ganaste!',
                showCloseButton:true,
                confirmButtonText: 'Siguiente Nivel',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-danger',
                }
            });
        }
    }
    Swal.getConfirmButton().onclick = function() {
        Swal.close();
        comenzar();
    }
    reiniciado = numero;
}

function inicial(){
    let valoresDx = [canvas.width * 0.0042, -canvas.width * 0.0042, canvas.width * 0.0022, -canvas.width * 0.0022]
    x = canvas.width/2;
    y = canvas.height-canvas.height*0.1;
    dx = valoresDx[Math.round(Math.random()*3)];
    dy = -canvas.height * 0.00425 - (nivel-1)*0.01;
    plataformaX = (canvas.width-plataformaAncho)/2;
    retardarDraw();
}

// dibujo de cada parte

function dibujoPelota() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#837F74";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function dibujoPlataforma() {
    ctx.beginPath();
    ctx.arc((plataformaX + plataformaAncho*0.2), (canvas.height-(plataformaAlto *3/2)), plataformaAlto/2, Math.PI/2, Math.PI*3/2);
    ctx.fillStyle = "#F46B6B";
    ctx.fill();
    ctx.arc((plataformaX + plataformaAncho), (canvas.height-(plataformaAlto *3/2)), plataformaAlto/2, Math.PI*3/2, Math.PI/2);
    ctx.fillStyle = "#F46B6B";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect((plataformaX + plataformaAncho*0.2), canvas.height-plataformaAlto * 2, (plataformaAncho*0.8), plataformaAlto);
    ctx.fillStyle = "#B7A9C5";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function dibujoLadrillos(){
    for (let c = 0; c < columnasLad; c++) {
        for (let r = 0; r < filasLad; r++) {
            visible = ladrillos[c][r].estado
            if (visible > 0 && visible < 4 ){
                ctx.beginPath();
                ctx.rect(ladrillos[c][r].x, ladrillos[c][r].y, anchoLad, altoLad);
                ctx.fillStyle = coloresLadrillos[visible - 1];
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.closePath();
            } 
        }
    }
}

function dibujoPuntaje() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Puntuacion: "+puntos, 8, 20);
}

function dibujoVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
}

function dibujoNivel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Nivel: "+nivel, canvas.width-165, 20);
    ctx.moveTo(0, 25);
    ctx.lineTo(canvas.width, 25);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// funcion que detecta colisiones

function detectarLadrillos(){
    for (let c = 0; c < columnasLad; c++) {
        for (let r = 0; r < filasLad; r++) {
            visible = ladrillos[c][r].estado
            if (((y + dy == ladrillos[c][r].y - radioBola || y + dy == ladrillos[c][r].y + altoLad + radioBola) || (y + dy > ladrillos[c][r].y && y + dy < ladrillos[c][r].y + altoLad)) && (x + dx > ladrillos[c][r].x && x + dx < ladrillos[c][r].x + anchoLad) && visible > 0){
                ladrillos[c][r].estado--;
                puntos++;
                if(ladrillos[c][r].estado == 0 && nivel > 2){
                    dy = - dy;
                    let sentidoAleatorio = [1,-1]
                    dx = sentidoAleatorio[Math.round(Math.random())];
                }else {
                    dy = -dy;
                }
                if (permitirEfectos) sonidoToc.play();
            } else if (((x + dx == ladrillos[c][r].x + radioBola|| x + dx == ladrillos[c][r].x + anchoLad - radioBola) || (x + dx > (ladrillos[c][r].x +radioBola) && x + dx < (ladrillos[c][r].x + anchoLad - radioBola))) && (y + dy < ladrillos[c][r].y && y + dy > ladrillos[c][r].y + altoLad) && visible > 0){
                dx = -dx;
                ladrillos[c][r].estado--;
                puntos++;
                if (permitirEfectos) sonidoToc.play();
            }
        }
    }
}

function detectarBordes(){

    if(x + dx > (canvas.width - radioBola) || x + dx < radioBola) dx = -dx;
    if(y + dy < (radioBola+25)) {
        dy = -dy;
    } else if((y + dy) >= canvas.height-radioBola-plataformaAlto*2) {
        if((x + radioBola/2) > (plataformaX + plataformaAncho*0.2) && ((x - radioBola/2) < (plataformaX + plataformaAncho*0.8))) {
                dy = -dy;
                if (permitirEfectos) sonidoPlat.play();
        } else if(((x + radioBola/2) > plataformaX) && ((x - radioBola/2) < (plataformaX + plataformaAncho*0.2))){
            if (dx<0){
                dy = -dy;
            }else{
                dy = -dy;
                dx = -dx * 1.05;
            }
            if (permitirEfectos) sonidoPlat.play();
        } else if(((x + radioBola/2) > (plataformaX + plataformaAncho*0.8)) && ((x - radioBola/2) < (plataformaX + plataformaAncho))){
            if (dx>0){
                dy = -dy;
            }else{
                dy = -dy;
                dx = -dx * 1.05;
            }
            if (permitirEfectos) sonidoPlat.play();
        }else {
            if(y + dy > canvas.height-plataformaAlto){
                vidas--;
                if (vidas > 0) cambioVida = 1;
                if (permitirEfectos) gameOver.play();
            }
        }
    }
}

//movimiento de la plataforma

function movPlat (){
    if(derecha && plataformaX < canvas.width-plataformaAncho) {
        plataformaX += velocidadPlat;
    }
    else if(izquierda && plataformaX > 0) {
        plataformaX -= velocidadPlat;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    plataformaX = relativeX;
}

function touchHandler(e) {
    if (e.touches.length === 0 ) return;
    e.stopPropagation();

    for (let i = 0; i < e.touches.length; i++) {
        plataformaX = e.touches[i].pageX - plataformaAncho/2 - canvas.offsetLeft;
    }
}

// funcion que renderiza todo el juego

function draw() {
    cambioVida = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    movPlat ();
    dibujoPlataforma();
    dibujoLadrillos();
    dibujoPelota();
    dibujoPuntaje();
    dibujoVidas();
    dibujoNivel();
    detectarBordes();
    detectarLadrillos();

    y += dy;
    x += dx;

    sumaLadrillos = 0;
    for (let c = 0; c < columnasLad; c++) {
        for (let r = 0; r < filasLad; r++) {
            sumaLadrillos += ladrillos[c][r].estado 
        }
    }
    if ((sumaLadrillos > 0 && vidas > 0) || comienzo == 1)  {
        if (cambioVida == 0){
            reqAnim = requestAnimationFrame(draw);
        } else if (cambioVida == 1){
            inicial();
        }
        comienzo = 0;
    } else if (sumaLadrillos == 0 ){
        reinicio(2);
        if (permitirEfectos) victoria.play();
    } else if (!vidas){
        if (permitirEfectos) gameOver.play();
        controlStorage();
        reinicio(1);
    }
}

// funcion para pasuar el juego.

function pausaReanuda (){
    if (pausa.innerHTML == 'Pausa'){
        cancelAnimationFrame(reqAnim);
        pausa.innerHTML = 'Continua';
    } else if (pausa.innerHTML == 'Continua'){
        requestAnimationFrame(draw);
        pausa.innerHTML = 'Pausa';
    }
}

// funcion para controlar si hay registros en el storage, sino, escribirlo.

function controlStorage () {
    if(listaPlataforma){
        listaPlataforma.push({nombre: player1, puntos: puntos, nivel: nivel});
    }else{
        listaPlataforma = [{nombre: player1, puntos: puntos, nivel: nivel}];
    }
    localStorage.setItem('plataforma', JSON.stringify(listaPlataforma));
}

// 3 2 1 antes de comenzar.

// que pasa en el ultimo nivel

