// section del tic tac toe.

let ticTac = document.querySelector('#ranTictactoe');
let solitario = document.querySelector('#ranSolitario');
let plataforma = document.querySelector('#ranPlat');

let ticTacRankWin = JSON.parse(window.localStorage.getItem('ticTacWin'));
let ticTacRankDraw = JSON.parse(window.localStorage.getItem('ticTacDraw'));
let ticTacRankLoss = JSON.parse(window.localStorage.getItem('ticTacLoss'));

let listaSolitario = JSON.parse(window.localStorage.getItem('solitario'));
let listaPlataforma = JSON.parse(window.localStorage.getItem('plataforma'));


if(ticTacRankWin || ticTacRankDraw || ticTacRankLoss){
    const encabezado = document.createElement('tr');
    encabezado.id = 'heading';
    encabezado.innerHTML = '<th>Nombre</th><th>Victorias</th><th>Empates</th><th>Derrotas</th>';
    ticTac.appendChild(encabezado);
}

if(ticTacRankWin) construirTicTac(ticTacRankWin);
if(ticTacRankDraw) construirTicTac(ticTacRankDraw);
if(ticTacRankLoss) construirTicTac(ticTacRankLoss);

function construirTicTac(parametro){
    for (let i = 0; i < parametro.length; i++) {
        let cadaUno = parametro[i];
        const filas = [`<td>${cadaUno.nombre}</td><td>${cadaUno.veces}</td><td></td><td></td>`,`<td>${cadaUno.nombre}</td><td></td><td>${cadaUno.veces}</td><td></td>`,`<td>${cadaUno.nombre}</td><td></td><td></td><td>${cadaUno.veces}</td>`]
        let x = 0;
        switch (parametro) {
            case ticTacRankWin:
                x=1;
                break;
            case ticTacRankDraw:
                x=2;
                break;
            case ticTacRankLoss:
                x=3;
                break;
        }
        if(document.getElementById(`${cadaUno.nombre}`)){
            let fila = document.getElementById(`${cadaUno.nombre}`);
            fila.children[x] = cadaUno.veces;
        } else{
            let fila = document.createElement("tr");
            fila.id = cadaUno.nombre;
            fila.innerHTML = filas[x-1];
            ticTac.appendChild(fila);
        }
    }
}


// pensar reducir esto




// section del solitario

if(listaSolitario){
    const encabezado = document.createElement('tr');
    encabezado.innerHTML = '<th>Nombre</th><th>Tiempo</th><th>Puntos</th>';
    solitario.appendChild(encabezado);
    for (let i = 0; i < listaSolitario.length; i++) {
        let cadaUno = listaSolitario[i];
        let fila = document.createElement("tr");
        fila.id = cadaUno.nombre;
        fila.innerHTML = `<td>${cadaUno.nombre}</td><td>${cadaUno.tiempo}</td><td>${cadaUno.puntos}</td>`;
        solitario.appendChild(fila);
    }
}

// section de plataforma

if(listaPlataforma){
    const encabezado = document.createElement('tr');
    encabezado.innerHTML = '<th>Nombre</th><th>Puntos</th><th>Nivel</th>';
    plataforma.appendChild(encabezado);
    for (let i = 0; i < listaPlataforma.length; i++) {
        let cadaUno = listaPlataforma[i];
        let fila = document.createElement("tr");
        fila.id = cadaUno.nombre;
        fila.innerHTML = `<td>${cadaUno.nombre}</td><td>${cadaUno.puntos}</td><td>${cadaUno.nivel}</td>`;
        plataforma.appendChild(fila);
    }
}

let encabezado = ticTac.getElementsByTagName('tr')[0]
sort();

function sort(){
    if(encabezado){
        for (const hijo of encabezado.childNodes) {
            hijo.addEventListener("click", ordenar);
        }
    }
}

function ordenar(e){
    console.log(e.target.innerHTML) //con esto decido que camino tomar en el orden.
    let ticTacRows = ticTac.getElementsByTagName('tr');
    // let lista = [];
    let listaConValores = [];
    for (let i = 1; i < ticTacRows.length; i++) {
        // lista.push(ticTacRows[i].id);
        listaConValores.push([ticTacRows[i].id,ticTacRows[i].childNodes[1].innerHTML])
    }
    // let listaOrdenada = lista.sort();
    let listaConValoresOrd = listaConValores.sort(function(a, b) {
        return b[1] - a[1];
    });
    let listaIndices = 
    console.log(listaConValoresOrd)
    let nuevaTabla = document.createElement("table");
    nuevaTabla.appendChild(document.getElementById('heading'))
    console.log(nuevaTabla)
    console.log(listaConValoresOrd[0])
    // for (const each of listaOrdenada) {
    //     (each !== "") && nuevaTabla.appendChild(document.getElementById(each));
    // }
    for (const each of listaConValoresOrd[0]) {
        (each !== "") && nuevaTabla.appendChild(document.getElementById(each));
    }
    ticTac.innerHTML = nuevaTabla.innerHTML;
    encabezado = ticTac.getElementsByTagName('tr')[0]
    sort();
}

// chequear la validacion para que no queden id anonimos      

