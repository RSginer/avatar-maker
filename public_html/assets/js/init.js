var playerName;
var app = this;
var numCambios = 0;
var genero;
var estado = new AppState();
var piezas = {
    bocas: [],
    ojos: [],
    pelos: []
};

$(document).ready(function () {
    app.bootstrap();

    $('#start-button').on('click', function () {
        $('#modal').modal('show');

    });

    $('#boton-jugar').on('click', function () {
        app.playerName = $('#input-nombre').val();
        app.estado.playerName = app.playerName;
        $('#modal').modal('hide');
        app.__init();
    });

    $('#input-nombre').on('change', function () {
        var valor = $(this).val();
        if (valor.length > 0) {
            $('#boton-jugar').removeAttr('disabled');
        } else {
            $('#boton-jugar').prop("disabled", true);
        }
    });
});

__init = function () {
    app.genero = $('input[name=genero]:checked').val();
    app.estado.genero = app.genero;
    app.pintarCabezaIncial();
    app.cargarPiezas(app.genero);
    $('.start-window, .start-credits, .start-title').addClass('hideStartWindow');
    // Esperar que se ejecute la animación
    setTimeout(function () {
        $('.start-window, .start-credits, .start-title').remove();
        $('#nombre').html(app.playerName);
        $('.container-de-avatar , .container-de-piezas').removeClass('hidden');
    }, 2000);

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
        app.piezas = data;
        app.estado.piezas = data;
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
    var cabeza = app.factoryCabezaInicial(app.genero);
    $('.container-de-avatar__caja').append(cabeza);
    app.estado.avatar.cabeza.puesta = true;
    app.estado.avatar.cabeza.object = {
        id: "cabeza-" + genero + "-1",
        src: cabeza.src,
        tipo: "cabeza"
    };
    app.estado.avatar.cabeza.element = cabeza;
};
