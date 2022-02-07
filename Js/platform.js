
// modales
let modal1 = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");

// botones
let btn = document.getElementById("myBtn");
let btn2 = document.getElementById("myBtn2");
let btn3 = document.getElementById('botonModal2')
let btn4 = document.getElementById('botonModal3')

// cruz del modal de inicio
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close")[1];

// boton dentro de modal de inicio que comienza el juego
let btnComenzar = document.getElementById("botonModal");

// cuando se aprieta boton de inicio se abre modal de inicio

btn.onclick = function() {
    if (document.getElementById('nombrep1').innerHTML === 'Jugador 1') {
        modal1.style.display = "block";
    } else {
        comenzar();
        btn2.style.display = 'none';
    }
}

btn2.onclick = function(){
    modal1.style.display = "block";
    btn2.style.display = 'none';
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

// para manejar los puntos

let player1 = '';
const delay = ms => new Promise(res => setTimeout(res, ms));
const retardarDraw = async () => {
    await delay(2500);
    draw();
}


// canvas

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


//posicion inicial

let x = canvas.width/2;
let y = canvas.height-canvas.height*0.1;

// incrementos
let dx = canvas.width * 0.0042;
let dy = -canvas.height * 0.00625;
let radioBola = canvas.height*0.016;
let velocidadPlat = canvas.width * 0.0146;
let aceleracion = 0.02;
let velocidadMaxima = canvas.width * 0.08;

//plataforma

let plataformaAlto = canvas.height*0.02;
let plataformaAncho = canvas.width*0.15;
let plataformaX = (canvas.width-plataformaAncho)/2;


// capturadores de teclas

let derecha = false
let izquierda = false

// grid de ladrillos

let marginLadTop = canvas.height * 0.1;
let marginLadIzq = canvas.width * 0.0625;

let filasLad = 9;
let columnasLad = Math.round(canvas.width/30);
let anchoLad = (canvas.width / (columnasLad+2));
let altoLad = canvas.height * 0.03;

let paddingH = 2;
let paddingV = altoLad / 2;


let ladrillos = []
function creadorLadrillos(nivel){
    
    for (let c = 0; c < columnasLad; c++) {
        ladrillos [c] = [];
        for (let r = 0; r < filasLad; r++) {
            ladrillos [c][r] = { x:0, y:0, estado:1 };
            ladrillos[c][r].x = marginLadIzq + c*(anchoLad+paddingH);
            ladrillos[c][r].y = marginLadTop + r*(altoLad+paddingV);
            if (nivel == 1){
                if (c % 3 == 0){
                    ladrillos[c][r].estado = 0;
                }
            }else if (nivel == 2 || nivel == 3){
                if( r % 2 == 0){
                    ladrillos[c][r].estado = 2;
                    if ( nivel == 3 && c % 3 == 0){
                        ladrillos[c][r].estado = 3;
                    }
                }
            } else if (nivel == 4){
                if(r>2 && r<6){
                    ladrillos[c][r].estado = 2;
                } else if (r>5){
                    ladrillos[c][r].estado = 3;
                }
            } else if( nivel >= 5 && nivel <10){
                ladrillos[c][r].estado = Math.round(Math.random()*3);
            } else if (nivel == 10){

            }
        }
    }
}

let puntos = 0;
let vidas = 3;
let sumaLadrillos = 0;
let comienzo = 1;
let cambioVida = 0;
let reiniciado = 0;
let nivel = 1;

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

document.addEventListener("mousemove", mouseMoveHandler, false);

document.addEventListener('touchstart', touchHandler, true);
document.addEventListener('touchmove', touchHandler, true);
document.addEventListener('touchend', touchHandler, true);
document.addEventListener('touchcancel', touchHandler, true);


// funcion comenzar

function comenzar(){
    player1 = document.querySelector('#player1').value;
    document.getElementById('nombrep1').innerHTML = player1;
    modal1.style.display = "none";
    document.getElementById('headline').style.margin = '10px';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('myBtn').style.display = 'none';
    document.getElementById('myCanvas').style.display = "flex";
    document.getElementById('myCanvas').style.flexWrap = "wrap";
    document.getElementById('myCanvas').style.height = "70vh";
    if(reiniciado == 1) {
        puntos = 0;
        vidas = 3;
        sumaLadrillos = 0;
        comienzo = 1;
        cambioVida = 0;
        x = canvas.width/2;
        y = canvas.height-canvas.height*0.1;
        dx = canvas.width * 0.0042;
        dy = -canvas.height * 0.00625;
        plataformaX = (canvas.width-plataformaAncho)/2;
    } else if (reiniciado == 2){
        cambioVida = 0;
        x = canvas.width/2;
        y = canvas.height-canvas.height*0.1;
        dx = canvas.width * 0.0042;
        dy = -canvas.height * 0.00625;
        plataformaX = (canvas.width-plataformaAncho)/2;
    }
    creadorLadrillos(nivel);
    retardarDraw();
}


function reinicio(numero){
    modal2.style.display = "none";
    document.getElementById('headline').style.marginTop = '150px';
    document.getElementById('titulo').style.display = 'block';
    document.getElementById('myBtn').style.display = 'initial';
    document.getElementById('myCanvas').style.display = 'none';
    btn2.style.display = 'block';
    reiniciado = numero;
}

function inicial(){
    x = canvas.width/2;
    y = canvas.height-canvas.height*0.1;
    dx = canvas.width * 0.0042;
    dy = -canvas.height * 0.00625;
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
    ctx.rect((plataformaX), canvas.height-plataformaAlto * 2, plataformaAncho, plataformaAlto);
    ctx.fillStyle = "#533E67";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function dibujoLadrillos(){
    for (let c = 0; c < columnasLad; c++) {
        for (let r = 0; r < filasLad; r++) {
            visible = ladrillos[c][r].estado
            if (visible == 1){
                ctx.beginPath();
                ctx.rect(ladrillos[c][r].x, ladrillos[c][r].y, anchoLad, altoLad);
                ctx.fillStyle = "#FF6746";
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.closePath();
            } else if (visible == 2){
                ctx.beginPath();
                ctx.rect(ladrillos[c][r].x, ladrillos[c][r].y, anchoLad, altoLad);
                ctx.fillStyle = "#A92003";
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();   
                ctx.closePath();
            } else if (visible == 3){
                ctx.beginPath();
                ctx.rect(ladrillos[c][r].x, ladrillos[c][r].y, anchoLad, altoLad);
                ctx.fillStyle = "#5E1101";
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
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntuacion: "+puntos, 8, 20);
}

function dibujoVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
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
                    dx = (Math.random()-0.5)*(dx+3);
                    if (dx < 1){
                        dx = -2;
                    }
                }else {
                    dy = -dy;
                }
            } else if (((x + dx == ladrillos[c][r].x + radioBola|| x + dx == ladrillos[c][r].x + anchoLad - radioBola) || (x + dx > (ladrillos[c][r].x +radioBola) && x + dx < (ladrillos[c][r].x + anchoLad - radioBola))) && (y + dy < ladrillos[c][r].y && y + dy > ladrillos[c][r].y + altoLad) && visible > 0){
                dx = -dx;
                ladrillos[c][r].estado--;
                puntos++;
            }
        }
    }
}

function detectarBordes(){

    if(x + dx > (canvas.width - radioBola) || x + dx < radioBola) {
        if ( dx < velocidadMaxima && nivel > 2){
            dx = -dx * (1 + aceleracion/2);
        } else {
            dx = -dx;
        }
    }

    if(y + dy < radioBola) {
        if(dy<velocidadMaxima && nivel > 2){
            dy = -dy * (1 + aceleracion);
        } else {
            dy = -dy;
        }
        
    } else if((y + dy) >= canvas.height-radioBola-plataformaAlto*2) {
        if((x + radioBola/2) > plataformaX && ((x - radioBola/2) < (plataformaX + plataformaAncho))) {
            if(dy < velocidadMaxima && nivel > 2){
                dy = -dy * (1 + aceleracion);
            } else {
                dy = -dy;
            }
            velocidadPlat = velocidadPlat * (1 + (aceleracion/10))

            // pensarlo mejor!!

        // } else if((x > plataformaX) && (x < (plataformaX + plataformaAncho/4))){
        //     if (dx<0){
        //         dy = -dy;
        //         velocidadPlat = velocidadPlat * (1 + (aceleracion/10))
        //     }else{
        //         dy = -dy;
        //         dx = -dx;
        //         velocidadPlat = velocidadPlat * (1 + (aceleracion/10))
            // }
        // } else if((x > (plataformaX*3/4)) && x < (plataformaX + plataformaAncho)){
        //     if (dx>0){
        //         dy = -dy;
        //         velocidadPlat = velocidadPlat * (1 + (aceleracion/10))
        //     }else{
        //         dy = -dy;
        //         dx = -dx;
        //         velocidadPlat = velocidadPlat * (1 + (aceleracion/10))
        //     }
        }else {
            if(y + dy > canvas.height-plataformaAlto){
                vidas--;
                if (vidas > 0){
                    cambioVida = 1
                }
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
    if(relativeX > 0 && relativeX < canvas.width) {
        plataformaX = relativeX - plataformaAncho/2;
    }
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
    movPlat ();
    dibujoPlataforma();
    dibujoLadrillos();
    dibujoPelota();
    dibujoPuntaje();
    dibujoVidas();
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
            requestAnimationFrame(draw);
        } else if (cambioVida == 1){
            inicial();
        }
        comienzo = 0;
    } else if (sumaLadrillos == 0 ){
        modal2.style.display = "block";
        btn4.style.display = 'block';
        document.getElementById("jugadorGanador").innerHTML = 'Ganaste ' + player1;
        if (nivel == 10){
            document.getElementById("jugadorGanador").innerHTML = 'Fin del Juego ' + player1;
        } else{
            nivel++;
        }
    } else if (!vidas){
        modal2.style.display = "block";
        btn4.style.display = 'none';
        document.getElementById("jugadorGanador").innerHTML = 'Perdiste ' + player1;
    }
}



// me falta direccion aleatoria de comienzo.
//seleccion de mouse o teclas.
// niveles.
// dificultades. ( velocidad pelota, tamano de plataforma)

// ver bug de los bordes!

// 3 2 1 antes de comenzar.