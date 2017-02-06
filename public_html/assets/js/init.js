var app = this;
var estado = new AppState();

$(document).ready(function () {
    app.bootstrap();
});

__init = function () {
    app.estado.genero = $('input[name=genero]:checked').val();
    app.pintarCabezaIncial();
    app.cargarPiezas(app.estado.genero);
    app.jugar();
};

jugar = function () {
    $('.start-window, .start-credits, .start-title').addClass('hideStartWindow');
    setTimeout(function () {
        $('.start-window, .start-credits, .start-title').remove();
        $('#nombre').html(app.estado.playerName);
        $('.container-de-avatar , .container-de-piezas').removeClass('hidden');
    }, 2000); // Espera 2 segundos para visualizar la animación de inicio
};

bootstrap = function () {
    tabs();
    function tabs() {
        $('#tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
};

cargarPiezas = function (genero) {
    var piezasApi = new PiezasApi(genero);
    piezasApi.find().done(function (data) {
        app.estado.piezas = data;
        app.pintarPiezas();
    });
};

factoryCabezaInicial = function (genero) {
    var cabezaInicialImg = document.createElement('img');
    $(cabezaInicialImg).prop('src', "assets/images/" + genero + "/cabezas/cabeza-" + genero + "-1.png");
    $(cabezaInicialImg).addClass('avatar');
    $(cabezaInicialImg).addClass('avatar__cabeza');
    return cabezaInicialImg;
};

pintarCabezaIncial = function () {
    var cabeza = app.factoryCabezaInicial(app.estado.genero);
    $('.container-de-avatar__caja').append(cabeza);
    var nuevaCabeza = new Pieza(true, "cabeza-" + app.estado.genero + "-1", cabeza.src, "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
};

pintarPiezas = function () {
    Object.keys(app.estado.piezas).forEach(function (tipoPieza) {
        for (var i = 0; i < app.estado.piezas[tipoPieza].length; i++) {
            pieza = app.estado.piezas[tipoPieza][i];
            var imagenPieza = document.createElement('img');
            $(imagenPieza).prop('draggable', true);
            $(imagenPieza).addClass('pieza');
            $(imagenPieza).data("object", JSON.stringify(pieza));
            $(imagenPieza).prop('src', pieza.src);
            imagenPieza.addEventListener('dragstart', app.dragPieza, false);
            $('#' + tipoPieza).append(imagenPieza);
        }
    });
};