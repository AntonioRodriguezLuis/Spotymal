const DOM = {
    mp3: document.getElementById("mp3"),
    gurenge: document.getElementById("gurenge"),
    kimetsu: document.getElementById("kimetsu")
};
DOM.kimetsu.addEventListener("click", reproducirMusica);

function reproducirMusica(){
    if(this.id== "kimetsu"){
        DOM.mp3.src ="";
    }
}