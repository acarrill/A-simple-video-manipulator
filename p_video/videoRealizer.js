var video01;
var video02;
var video03;
var video04;
var currentVideo;

function Video(id) {
    this.Video = document.getElementById(id);
    this.Video.src = this.Video.src;
    this.Video.setAttribute("preload", "auto");
    //this.Video.setAttribute("controls", "none");
    //this.Video.setAttribute("width", "1080px");
    //this.Video.setAttribute("height", "720px");
    //document.body.appendChild(this.Video);
    this.src = function(src) {
        this.Video.src = src;
    }
    this.play = function(){
        this.Video.play();
    }
    this.stop = function(){
        this.Video.pause();
    }
    this.mute = function(dimmer){
        this.Video.muted = dimmer;
    }
    this.mainVideo = function(){
        video01 = this.Video.src;
        this.Video.src = video01.src;
    }
    //función que activa control de sonido por ratón
    this.soundControl = function a (){
        this.Video.onmouseover = function() {
            //En este punto this es el video asociado al evento
            this.muted = false;
        }
        this.Video.onmouseout = function() {
            this.muted = true;
        }
    }
    //Con click cambia fuente del master y pone sombreado rojo al video elegido
    this.masterControl = function() {
        this.Video.onclick = function() {
            currentVideo.src(this.src);
            //eliminamos sombreado rojo de videos que se reproducen en master
            for (var i = 0; i < document.body.childNodes.length; i++){
                if (document.body.childNodes[i].tagName == "VIDEO" && document.body.childNodes[i].style.borderColor == "red"){
                    document.body.childNodes[i].style.borderColor = "black"
                }
            }
            this.style.borderColor = "red";
            currentVideo.Video.currentTime = this.currentTime;
        }
    }
}

function main() {
    //Creación de los objetos para todos los videos
    currentVideo = new Video("master");
    video01 = new Video("video01");
    video02 = new Video("video02");
    video03 = new Video("video03");
    video04 = new Video("video04");
    video01.Video.style.borderColor = "red"; // inicializamos borde de video en emisión a rojo
    //Control cambio de video en reproducción
    video01.masterControl(currentVideo);
    video02.masterControl(currentVideo);
    video03.masterControl(currentVideo);
    video04.masterControl(currentVideo);
    //Control sonido mouse
    video01.soundControl();
    video02.soundControl();
    video03.soundControl();
    video04.soundControl();
    currentVideo.soundControl();
    //Creación y actualización de reloj
    var p = document.createElement("p");
    var videoClock = document.createTextNode(currentVideo.Video.currentTime);
    p.appendChild(videoClock);
    p.setAttribute('id', 'clock')
    p.style.color = "yellow";
    document.body.appendChild(p);
    function updateClock() {
        videoClock = currentVideo.Video.currentTime;
        p.childNodes[0].data = "Current Time: " + videoClock;
    }
    var clockInterval = setInterval(updateClock, 100);

                                    //PARTE DEDICADA AL FILTRADO
    master = document.getElementById("master");
    canvas = document.getElementById("canvas");
    endCanvas = document.createElement('canvas');
    //Inicializamos objeto que controla filtrado
    var filterControl = new Filters(master, canvas, endCanvas);
    //Cuando el video inicio redimensionaremos los canvas para un correcto editado
    master.addEventListener('play', function(){
        var realWidth = master.clientWidth;
        var realHeight = master.clientHeight;
        filterControl.frontCanvas.width = realWidth;
        filterControl.frontCanvas.height = realHeight;
        filterControl.endCanvas.width = realWidth;
        filterControl.endCanvas.height = realHeight;
    }, false)

    document.filterInputs.whiteBlack.onclick = function(){
        filterControl.whiteBlackFilter();
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.whiteBlackInterval = setInterval(filterControl.whiteBlackFilter, 30);
    }
    document.filterInputs.red.onclick = function(){
        filterControl.redFilter();
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.redInterval = setInterval(filterControl.redFilter, 30);
    }
    document.filterInputs.cyan.onclick = function(){
        filterControl.cyanFilter();
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.cyanInterval = setInterval(filterControl.cyanFilter, 30);
    }
    document.filterInputs.negative.onclick = function(){
        filterControl.negativeFilter();
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.negativeInterval = setInterval(filterControl.negativeFilter, 30);
    }
    document.filterInputs.redNegative.onclick = function(){
        filterControl.redNegativeFilter();
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.redNegativeInterval = setInterval(filterControl.redNegativeFilter, 30);
    }
    document.filterInputs.greenNegative.onclick = function(){
        filterControl.greenNegativeFilter();
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.greenNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        filterControl.greenNegativeInterval = setInterval(filterControl.greenNegativeFilter, 30);
    }
    document.filterInputs.fakeColor.onclick = function(){
        filterControl.fakeColorFilter();
        clearInterval(filterControl.whiteBlackInterval);
        clearInterval(filterControl.redInterval);
        clearInterval(filterControl.cyanInterval);
        clearInterval(filterControl.negativeInterval);
        clearInterval(filterControl.redNegativeInterval);
        clearInterval(filterControl.fakeColorInterval);
        clearInterval(filterControl.greenNegativeInterval);
        filterControl.fakeColorInterval = setInterval(filterControl.fakeColorFilter, 30);
    }
}

function loop() {
    var loopStart = document.inputs.Start.value;
    var loopEnd = document.inputs.End.value;
    var iterations = document.inputs.Iterations.value;
    var currentIteration = 1;
    if (currentIteration <= iterations){
        currentVideo.Video.currentTime = loopStart;
    }
    function loopControl() {
        if (currentVideo.Video.currentTime >= loopEnd && currentIteration <= iterations) {
            currentVideo.Video.currentTime = loopStart;
            currentIteration += 1;
        }
        if (currentIteration > iterations) {
            clearInterval(loopInterval);
        }
    }
    loopInterval = setInterval(loopControl, 100)
    //console.log(loopEnd, loopStart, repeticiones);
}
