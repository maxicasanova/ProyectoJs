let reglas = document.getElementById("reglamento");
let musica = document.getElementById("musica");

reglas.onclick = () => {
    Swal.fire({
        title: 'Reglas',
        text: "Hello world!",
        showCloseButton:true,
        confirmButtonText: 'Perfecto',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-warning',
            cancelButton: 'btn btn-secondary'
        }
    })
}


let sound = new Howl({
    src: ['../media/index/fondoIndex.wav'],
    loop: true,
    volume: 0.5,
    id : 'fondo'
});


musica.onclick = () => {
    sound.play();
}

