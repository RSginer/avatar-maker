AvatarMaker = function () {
    avatarMaker = this;
    Pieza = function (id, src, tipo) {
        pieza = this;
        pieza.id = id;
        pieza.src = src;
        pieza.tipo = tipo;
    };

    AppState = function () {
        estado = this;
        estado.genero = "";
        estado.playerName = "Avatar";
        estado.piezas = [];
        estado.avatar = {
            cabeza: {
                pieza: null
            },
            bocas: {
                pieza: null
            },
            ojos: {
                pieza: null
            },
            pelos: {
                pieza: null
            }
        };
    };

    avatarMaker.estado = new AppState();
};


AvatarMaker.prototype.bootstrap = function () {
    tabs();
    function tabs() {
        $('#tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
};


AvatarMaker.prototype.jugar = function () {
    $('.start-window, .start-credits, .start-title').addClass('hideStartWindow');
    setTimeout(function () {
        $('.start-window, .start-credits, .start-title').remove();
        $('#nombre').html(this.estado.playerName);
        $('.container-de-avatar , .container-de-piezas').removeClass('hidden');
    }, 2000);
};

AvatarMaker.prototype.cargarPiezas = function (genero) {
    var piezasApi = new PiezasApi(genero);
    piezasApi.find().done(function (data) {
        avatarMaker.estado.piezas = data;
        avatarMaker.pintarPiezas();
    });
};

AvatarMaker.prototype.factoryCabezaInicial = function (genero) {
    var cabezaInicialImg = document.createElement('img');
    $(cabezaInicialImg).prop('src', "assets/images/" + genero + "/cabezas/cabeza-" + genero + "-1.png");
    $(cabezaInicialImg).addClass('avatar');
    $(cabezaInicialImg).addClass('avatar__cabeza');
    return cabezaInicialImg;
};



AvatarMaker.prototype.pintarPiezas = function () {
    Object.keys(this.estado.piezas).forEach(function (tipoPieza) {
        for (var i = 0; i < this.estado.piezas[tipoPieza].length; i++) {
            pieza = this.estado.piezas[tipoPieza][i];
            var imagenPieza = document.createElement('img');
            $(imagenPieza).prop('draggable', true);
            $(imagenPieza).addClass('pieza');
            $(imagenPieza).data("object", JSON.stringify(pieza));
            $(imagenPieza).prop('src', pieza.src);
            imagenPieza.addEventListener('dragstart', this.dragPieza, false);
            $('#' + tipoPieza).append(imagenPieza);
        }
    });
};
AvatarMaker.prototype.pintarCabezaInicial = function () {
    var cabeza = this.factoryCabezaInicial(this.estado.genero);
    $('.container-de-avatar__caja').append(cabeza);
    var nuevaCabeza = new Pieza(true, "cabeza-" + this.estado.genero + "-1", cabeza.src, "cabeza");
    this.estado.avatar.cabeza = nuevaCabeza;
};

AvatarMaker.prototype.__init = function () {
    this.estado.genero = $('input[name=genero]:checked').val();
    this.pintarCabezaInicial();
    this.cargarPiezas(this.estado.genero);
    this.jugar();
};
