const DOM = {
    mp3: document.getElementById("mp3"),
    gurenge: document.getElementById("gurenge"),
    kimetsu: document.getElementById("kimetsu"),
    audio: document.getElementById("audioPlayer"),
    imagenCancion: document.getElementById("imagen"),
    section : document.querySelector("section")
};
(function () {
DOM.kimetsu.addEventListener("click", reproducirMusica);
DOM.gurenge.addEventListener("click", reproducirMusica);
})()

function crearElementos(){
     
     miDiv = document.createElement("div");
    
     DOM.section.insertAdjacentElement("afterbegin", miDiv);
    
     miDiv.classList.add("cancionInfo");
}

function reproducirMusica(){
    if(this.id== "kimetsu" || this.id== "gurenge" ){
        console.log("funciona");
        DOM.audio.pause();
        DOM.audio.currentTime = 0;
        DOM.mp3.src="music/gurenge.mp3";
        DOM.imagenCancion.setAttribute("class","kimetsuCancion");
        DOM.audio.load();
        DOM.audio.play();
    }
}
