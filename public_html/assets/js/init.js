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
    var cabeza = app.factoryCabezaInicial(app.genero);
    $('.container-de-avatar__caja').append(cabeza);
    var nuevaCabezaState = {
        puesta: true,
        object: {
            id: "cabeza-" + genero + "-1",
            src: cabeza.src,
            tipo: "cabeza"
        }
    };
    app.estado.avatar.cabeza = nuevaCabezaState;
};


pintarPiezas = function () {
    app.pintarOjos();
    app.pintarBocas();
    app.pintarPelos();
};

pintarOjos = function () {
    for (var i = 0; i < app.piezas["ojos"].length; i++) {
        ojo = app.piezas.ojos[i];
        var imgOjo = document.createElement('img');
        $(imgOjo).prop('draggable', true);
        $(imgOjo).addClass('pieza');
        $(imgOjo).data("object", JSON.stringify(ojo));
        $(imgOjo).prop('src', ojo.src);
        imgOjo.addEventListener('dragstart', drag, false);
        $('#ojos').append(imgOjo);
    }
}

pintarBocas = function () {
    for (var i = 0; i < app.piezas["bocas"].length; i++) {
        boca = app.piezas.bocas[i];
        var imgBoca = document.createElement('img');
        $(imgBoca).prop('draggable', true);
        $(imgBoca).addClass('pieza');
        $(imgBoca).data("object", JSON.stringify(boca));
        $(imgBoca).prop('src', boca.src);
        imgBoca.addEventListener('dragstart', drag, false);
        $('#bocas').append(imgBoca);
    }
};

pintarPelos = function () {
    for (var i = 0; i < app.piezas["pelos"].length; i++) {
        pelo = app.piezas.pelos[i];
        var imgPelo = document.createElement('img');
        $(imgPelo).prop('draggable', true);
        $(imgPelo).addClass('pieza');
        $(imgPelo).data("object", JSON.stringify(pelo));
        $(imgPelo).prop('src', pelo.src);
        imgPelo.addEventListener('dragstart', drag, false);
        $('#pelos').append(imgPelo);
    }
}