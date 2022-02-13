const DOM = {
    listaMusica: document.querySelector("#listaMusica"),
    tituloActual: document.getElementById("titulo-actual"),
    animeActual: document.getElementById("anime-actual"),
    artistaActual: document.getElementById("artista-actual"),
    imagenActive: document.getElementById("imagen-active"),
    play: document.querySelector("#play"),
    anterior: document.querySelector("#anterior"),
    pause: document.querySelector("#pause"),
    siguiente: document.querySelector("#siguiente"),
    inputRange: document.querySelector("#range"),
    tiempoActual: document.getElementById("tiempo-actual"),
    tiempoTotal: document.getElementById("tiempo-total"),
    tabLinks: document.querySelectorAll(".tablinks"),
    tabContent: document.querySelectorAll(".tabcontent")
};
var listaMusica;
var strMusica = `[{"id":0,"srcImagen":"../img/kimetsu.jpg","anime":"Kimetsu no yaiba","titulo":"Gurenge","artista":"LiSA","duracion":"3:56 min","srcMusica":"../music/gurenge.mp3"},
{"id":1,"srcImagen":"../img/shingeki.jpg","anime":"Shingeki no kyojin","titulo":"Shinzou wo sasageyo!","artista":"Linked Horizon","duracion":"5:32 min","srcMusica":"../music/sasageyo.mp3"},
{"id":2,"srcImagen":"../img/tokyoGhoul.jpg","anime":"Tokyo Ghoul","titulo":"Unravel","artista":"TK from Ling Tosite Sigure","duracion":"3:55 min","srcMusica":"music/unravel.mp3"},
{"id":3,"srcImagen":"../img/drStone.jpg","anime":"Dr Stone","titulo":"Good Morning World!","artista":"Burnout Syndromes","duracion":"4:31 min","srcMusica":"music/goodMornigWorld.mp3"},
{"id":4,"srcImagen":"../img/deathNote.jpg","anime":"Death Note","titulo":"The WORLD","artista":" Nightmare","duracion":"1:21 min","srcMusica":"../music/theWorld.mp3"},
{"id":5,"srcImagen":"../img/narutoShippuden.jpg","anime":"Naruto Shippuden","titulo":"Blue Bird","artista":"Ikimonogakari","duracion":"3:34 min","srcMusica":"../music/blueBird.mp3"},
{"id":6,"srcImagen":"../img/Shigatsu_wa_Kimi_no_Uso.jpg","anime":"Shigatsu wa Kimi no Uso","titulo":"Hikaru Nara","artista":"Goose House","duracion":"4:11 min","srcMusica":"../music/hikaruNara.mp3"},
{"id":7,"srcImagen":"../img/onePiece.jpg","anime":"One Piece","titulo":"Dreamin' On","artista":"Da-iCE","duracion":"1:59 min","srcMusica":"../music/dreaminOn.mp3"}]`;
var idActual = 0;
var audio = new Audio();

(function () {
    listaMusica = JSON.parse(strMusica);
    generarListaMusica();

    DOM.play.addEventListener('click', play);
    DOM.anterior.addEventListener('click', anterior);
    DOM.siguiente.addEventListener('click', siguiente);
    DOM.pause.addEventListener('click', pause);
    DOM.pause.classList.add("oculto");
    DOM.anterior.classList.add("disable-div");    

    audio.addEventListener("loadeddata", () => {        
        DOM.tiempoActual.textContent = "00:00";
        var duracionCustom = personalizarTiempo(audio.duration);
        defaultRange(audio.duration);
        DOM.tiempoTotal.textContent = duracionCustom;
    });

    audio.addEventListener("timeupdate", () => {
        var tiempoCustom = personalizarTiempo(audio.currentTime);        
        DOM.tiempoActual.textContent = tiempoCustom;
        DOM.inputRange.value = audio.currentTime;
    });

    audio.addEventListener("ended", () => {
        pause();
    });

    cargaPorDefecto();

    DOM.inputRange.addEventListener("change", () => {
        pause();
        audio.currentTime = DOM.inputRange.value;      
        play();
    });

    DOM.tabLinks.forEach(function(elemento) {
        elemento.addEventListener("click", abrirTabs);
    });
})()


// Función que añade una nueva canción a la tabla.
function generarListaMusica() {
    listaMusica.forEach(function (cancion) {

        let divCancion = document.createElement("div");
        divCancion.classList.add("cancion");
        divCancion.setAttribute("id", cancion.id);

        //Elemento img de play
        let play = document.createElement("img");
        play.setAttribute("src", "../img/play.svg");
        play.classList.add("icon");
        divCancion.insertAdjacentElement("beforeend", play);

        let song = document.createElement("img");
        song.setAttribute("src", "../img/music.svg");
        song.classList.add("icon","oculto");
        divCancion.insertAdjacentElement("beforeend", song);


        // Elemento div
        let imgCancion = document.createElement("div");
        imgCancion.style.backgroundImage = "url('" + cancion.srcImagen + "')";
        imgCancion.classList.add("imagen-cancion");
        divCancion.insertAdjacentElement("beforeend", imgCancion);

        //TABLE
        let table = document.createElement("table");
        table.classList.add("cancion-info");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        table.insertAdjacentElement("beforeend", thead);
        table.insertAdjacentElement("beforeend", tbody);

        //THEAD
        let trHead = document.createElement("tr");
        //th
        let anime = document.createElement("th");
        anime.textContent = "Anime";
        let titulo = document.createElement("th");
        titulo.textContent = "Título";
        let artista = document.createElement("th");
        artista.textContent = "Artista";
        let duracion = document.createElement("th");
        duracion.textContent = "Duración";
        duracion.classList.add("duracion");

        trHead.insertAdjacentElement("beforeend", anime);
        trHead.insertAdjacentElement("beforeend", titulo);
        trHead.insertAdjacentElement("beforeend", artista);
        trHead.insertAdjacentElement("beforeend", duracion);

        thead.insertAdjacentElement("beforeend", trHead);

        //TBODY
        let trBody = document.createElement("tr");

        //tr
        let animeCancion = document.createElement("td");
        animeCancion.textContent = cancion.anime;
        let tituloCancion = document.createElement("td");
        tituloCancion.textContent = cancion.titulo;
        let artistaCancion = document.createElement("td");
        artistaCancion.textContent = cancion.artista;
        let duracionCancion = document.createElement("td");
        duracionCancion.textContent = cancion.duracion;
        duracionCancion.classList.add("duracion");

        trBody.insertAdjacentElement("beforeend", animeCancion);
        trBody.insertAdjacentElement("beforeend", tituloCancion);
        trBody.insertAdjacentElement("beforeend", artistaCancion);
        trBody.insertAdjacentElement("beforeend", duracionCancion);

        tbody.insertAdjacentElement("beforeend", trBody);
        //insertando el nuevo contenido en la tabla.
        divCancion.insertAdjacentElement("beforeend", table);
        DOM.listaMusica.insertAdjacentElement("beforeend", divCancion);
    });

    document.querySelectorAll(".cancion").forEach(function (elemento, index) {
        elemento.addEventListener("click", function () {
            idActual = listaMusica[index].id;
            reproducirAudio();
        })
    });
}

function reproducirAudio() {
    actualizarCancion(idActual);
    play();
    DOM.anterior.classList.remove("disable-div");
    DOM.siguiente.classList.remove("disable-div");
    
    if(idActual == 0){
        DOM.anterior.classList.add("disable-div");
    }
    if(idActual == listaMusica.length-1){
        DOM.siguiente.classList.add("disable-div");
    }
}

function play() {   
    audio.play();
    DOM.play.classList.add("oculto");
    DOM.pause.classList.remove("oculto");
}

function pause() {
    audio.pause();
    DOM.play.classList.remove("oculto");
    DOM.pause.classList.add("oculto");
}

function anterior() {
    var idAnterior = idActual;
    if (idAnterior != 0) {
        --idAnterior;
        idActual = idAnterior;
        actualizarCancion(idAnterior);
        play();
        DOM.siguiente.classList.remove("disable-div");
    } if(idAnterior == 0) {
        DOM.anterior.classList.add("disable-div");
    }
}

function siguiente() {
    var idSiguiente = idActual;
    if (idSiguiente != listaMusica.length-1) {
        ++idSiguiente;
        idActual = idSiguiente;
        actualizarCancion(idSiguiente);
        play();
        DOM.anterior.classList.remove("disable-div");
    } if(idSiguiente == listaMusica.length-1) {
        DOM.siguiente.classList.add("disable-div");
    }
}

function actualizarCancion(id) {
    var element = DOM.listaMusica.children[id];
    activarCancion(element);
    DOM.tituloActual.textContent = listaMusica[id].titulo;
    DOM.animeActual.textContent = listaMusica[id].anime;
    DOM.artistaActual.textContent = listaMusica[id].artista;
    DOM.imagenActive.style.backgroundImage = "url('" + listaMusica[id].srcImagen + "')";
    audio.src = listaMusica[idActual].srcMusica;
}

function cargaPorDefecto() {
    actualizarCancion(idActual);
}

function defaultRange(duracion) {
    DOM.inputRange.max = duracion;
    DOM.inputRange.value = 0;
}

function personalizarTiempo(tiempo) {
    const resto = tiempo % 3600;
    const minutos = Math.floor(resto / 60);
    const segundos = Math.floor(resto % 60);
  
    const mm = minutos.toString().padStart(2, '0');
    const ss = segundos.toString().padStart(2, '0');
  
    return `${mm}:${ss}`;
}

function abrirTabs(elemento) {
   var btnTarget = elemento.currentTarget;   
   var option = btnTarget.dataset.option;

   DOM.tabContent.forEach(function(elemento) {
    elemento.classList.remove("active");
   });

   DOM.tabLinks.forEach(function(elemento) {
    elemento.classList.remove("active");
   });

   document.querySelector("#" + option).classList.add("active");
   btnTarget.classList.add("active");
}

function activarCancion(elemento) {
    borrarCancionActiva();
    elemento.classList.add("active");
    elemento.getElementsByTagName("img")[0].classList.add("oculto");
    elemento.getElementsByTagName("img")[1].classList.remove("oculto");
}

function borrarCancionActiva() {
    var elemento = DOM.listaMusica.querySelector(".cancion.active");
    if(elemento != null) {
        elemento.classList.remove("active");
        elemento.getElementsByTagName("img")[0].classList.remove("oculto");
        elemento.getElementsByTagName("img")[1].classList.add("oculto");
    }
}


//TO DO
/*
- botones de reproductor se ponga la manita en el raton
- color del input range naranja 
- hover a los botones quisas un gradiente de naranja a blanco.
*/ 