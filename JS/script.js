const DOM = {
    mp3: document.getElementById("mp3"),
    gurenge: document.getElementById("gurenge"),
    kimetsu: document.getElementById("kimetsu"),
    audio: document.getElementById("audioPlayer"),
    imagenCancion: document.getElementById("imagen")
};
DOM.kimetsu.addEventListener("click", reproducirMusica);
DOM.gurenge.addEventListener("click", reproducirMusica);

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