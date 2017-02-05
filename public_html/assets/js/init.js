var playerName = "Avatar";
var app = this;
var genero = "chica";
$(document).ready(function () {

    app.bootstrap();

    $('#start-button').on('click', function () {
        $('#modal').modal('show');

    });

    $('#boton-jugar').on('click', function () {
        playerName = $('#input-nombre').val();
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


