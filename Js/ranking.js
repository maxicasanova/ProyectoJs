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
    encabezado.innerHTML = '<th>Nombre</th><th>Victorias</th><th>Empates</th><th>Derrotas</th>';
    ticTac.appendChild(encabezado);
}

if(ticTacRankWin){
    for (let i = 0; i < ticTacRankWin.length; i++) {
        let cadaUno = ticTacRankWin[i];
        if(document.getElementById(`${cadaUno.nombre}`)){
            let fila = document.getElementById(`${cadaUno.nombre}`);
            fila.children[1] = cadaUno.veces;
        } else{
            let fila = document.createElement("tr");
            fila.id = cadaUno.nombre;
            fila.innerHTML = `<td>${cadaUno.nombre}</td><td>${cadaUno.veces}</td><td></td><td></td>`;
            ticTac.appendChild(fila);
        }
    }
}

if(ticTacRankDraw){
    for (let i = 0; i < ticTacRankDraw.length; i++) {
        let cadaUno = ticTacRankDraw[i];
        if(document.getElementById(`${cadaUno.nombre}`)){
            let fila = document.getElementById(`${cadaUno.nombre}`);
            fila.children[2].innerHTML = cadaUno.veces;
        } else{
            let fila = document.createElement("tr");
            fila.id = cadaUno.nombre;
            fila.innerHTML = `<td>${cadaUno.nombre}</td><td></td><td>${cadaUno.veces}</td><td></td>`;
            ticTac.appendChild(fila);
        }
    }
}

if(ticTacRankLoss){
    for (let i = 0; i < ticTacRankLoss.length; i++) {
        let cadaUno = ticTacRankLoss[i];
        if(document.getElementById(`${cadaUno.nombre}`)){
            let fila = document.getElementById(`${cadaUno.nombre}`);
            fila.children[3].innerHTML = cadaUno.veces;
        } else{
            let fila = document.createElement("tr");
            fila.id = cadaUno.nombre;
            fila.innerHTML = `<td>${cadaUno.nombre}</td><td></td><td></td><td>${cadaUno.veces}</td>`;
            ticTac.appendChild(fila);
        }
    }
}

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

