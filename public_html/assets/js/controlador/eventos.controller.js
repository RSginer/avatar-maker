// CONTROLES DE INICIO DEL JUEGO
var botonDeComenzar = $('#start-button');
var botonSiguienteDelModal = $('#boton-jugar');
var modal = $('#modal');

function iniciarJuego() {
    app.estado.playerName = $('#input-nombre').val();
    modal.modal('hide');
    app.__init();
};

function abrirModalDeInicio() {
    modal.modal('show');
};

botonDeComenzar.on('click', abrirModalDeInicio);
botonSiguienteDelModal.on('click', iniciarJuego);

// CONTROLES DE DRAG AND DROP
function allowDrop(ev) {
    ev.preventDefault();
};

function dragPieza(ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

function dropAvatar(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("object"));
    if (app.estado.avatar[data.tipo] !== null) {
        var idImagenPuesta = app.estado.avatar[data.tipo].pieza.id;
        var imagenPuesta = document.getElementById(idImagenPuesta);
        imagenPuesta.setAttribute('id', data.id);
        imagenPuesta.setAttribute('src', data.src);
    } else {
        var imagen = factoryImagen(data);
        $(ev.target.parentNode).prepend(imagen);
    }
    app.estado.avatar[data.tipo] = {object: data, puesta: true};
};

function factoryImagen(data) {
    var imagen = document.createElement('img');
    $(imagen).prop('tipo', data.tipo);
    imagen.src = data.src;
    imagen.setAttribute('id', data.id);
    $(imagen).addClass('avatar');
    return imagen;
};

// CONTROLES DE CAMBIAR PIEL
var botonesDeSeleccionDePiel = $('.piel');

function cambiarPiel() {

    var self = this; // HACK

    getNumeroDePielSeleccionadaByClassName = function () {
        return self.className.split("piel__suntan-")[1].split(" ")[0];
    };

    factoryIdCabeza = function (genero, numeroPiel) {
        return "cabeza-" + genero + "-" + numeroPiel;
    };

    getSrcImagenCabezaByNumeroPiel = function (numeroPiel) {
        var cabezaDelAvatar = $('.avatar__cabeza');
        var srcCabezaEnAvatar = cabezaDelAvatar.attr('src');
        var pathDeImagenes = srcCabezaEnAvatar.split("cabeza-" + app.estado.genero + "-")[0];
        var archivoImagenCabeza = "cabeza-" + app.estado.genero + "-" + numeroPiel + ".png";
        var newSrcCabeza = pathDeImagenes + archivoImagenCabeza;
        return newSrcCabeza;
    };

    getBotonPielByNumeroPiel = function (numeroPiel) {
        return $('.piel__suntan-' + numeroPiel);
    };

    var cabezaDelAvatar = $('.avatar__cabeza');
    var pielSeleccionada = getNumeroDePielSeleccionadaByClassName();
    var botonDePielSeleccionada = getBotonPielByNumeroPiel(pielSeleccionada);
    botonesDeSeleccionDePiel.removeClass('piel--active');
    botonDePielSeleccionada.addClass('piel--active');
    var newSrcCabeza = getSrcImagenCabezaByNumeroPiel(pielSeleccionada);
    var nuevaCabeza = new Pieza(
            factoryIdCabeza(app.estado.genero, pielSeleccionada),
            newSrcCabeza,
            "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
    cabezaDelAvatar.prop('src', nuevaCabeza.src);
};

botonesDeSeleccionDePiel.on('click', cambiarPiel);


// CONTROL  GUARDAR IMAGEN
       $("#boton-guardar").click(function() { 
        html2canvas($("#imagen-avatar"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                location.replace(Canvas2Image.convertToPNG(canvas, 400, 400) + '.png')
                Canvas2Image.saveAsImage(Canvas2Image.convertToPNG(canvas), 400, 400, 'png'); 
            }
        });
    });