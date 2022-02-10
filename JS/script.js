const DOM = {
    mp3: document.getElementById("mp3"),
    gurenge: document.getElementById("gurenge"),
    kimetsu: document.getElementById("kimetsu"),
    audio: document.getElementById("audioPlayer"),
    imagenCancion: document.getElementById("imagen"),
    section: document.querySelector("section"),
    listaMusica: document.getElementById("listaMusica")
};
var listaMusica;
var strMusica = '[{"id":1,"srcImagen":"../img/kimetsu.jpg","titulo":"Kimetsu no yaiba Opening 1: Gurenge","artista":"LiSA","duracion":"3:56 min","srcMusica":"music/gurenge.mp3"},{"id":2,"srcImagen":"../img/shingeki.jpg","titulo":"Shingeki no kyojin Opening 3: SHINZOU WO SASAGEYO!","artista":"Linked Horizon","duracion":"5:32 min","srcMusica":"music/sasageyo.mp3"},{"id":3,"srcImagen":"../img/tokyoGhoul.jpg","titulo":"Tokyo Ghoul Opening 1: Unravel","artista":"TK from Ling Tosite Sigure","duracion":"3:55 min","srcMusica":"music/unravel.mp3"},{"id":4,"srcImagen":"../img/drStone.jpg","titulo":"Dr Stone Opening 1: Good Morning World!","artista":"Burnout Syndromes","duracion":"4:31 min","srcMusica":"music/goodMornigWorld.mp3"}]';

(function () {
    listaMusica = JSON.parse(strMusica);
    generarListaMusica();
})()

function crearElementos() {

    miDiv = document.createElement("div");

    DOM.section.insertAdjacentElement("afterbegin", miDiv);

    miDiv.classList.add("cancionInfo");
}

function generarListaMusica() {
    listaMusica.forEach(function (cancion) {
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var divCancion = document.createElement("div");
        var divInfo = document.createElement("div");
        var imagen = document.createElement("img");
        var titulo = document.createElement("h3");
        var artista = document.createElement("p");
        var duracion = document.createElement("p");
        li.classList.add(cancion.srcMusica);
        titulo.innerText =cancion.titulo;
        artista.innerText = "Artista: " + cancion.artista;
        duracion.innerText = "Duración: " + cancion.duracion;
        li.setAttribute("id", cancion.id);
        imagen.setAttribute("src", cancion.srcImagen);
        divCancion.classList.add("cancionInfo");
        divCancion.classList.add("Info");
        DOM.listaMusica.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(divCancion);
        divCancion.appendChild(imagen);
        divCancion.appendChild(divInfo);
        divInfo.appendChild(titulo);
        divInfo.appendChild(artista);
        divInfo.appendChild(duracion);
    });
    document.querySelectorAll("li").forEach(function (elemento,index) {
        elemento.addEventListener("click", function () {
            reproducirMusica(index,elemento.classList);
        })
    });
}

function reproducirMusica(index,url) {
    var clase="cancion"+index;
    DOM.audio.pause();
    DOM.audio.currentTime = 0;
    DOM.mp3.src = url;
    DOM.imagenCancion.setAttribute("class", clase);
    DOM.audio.load();
    DOM.audio.play();
}