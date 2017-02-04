var playerName = "Avatar";
var app = this;

$(document).ready(function () {

    app.bootstrap();

    $('#start-button').on('click', function () {
        app.__init();
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
