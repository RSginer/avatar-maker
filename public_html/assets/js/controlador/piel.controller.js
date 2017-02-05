var app = app;

$('.piel').on('click', function () {
    var pielSeleccionada = this.className.split("piel__suntan-")[1].split(" ")[0];
    $('.piel').removeClass('piel--active');
    $('.piel__suntan-' + pielSeleccionada).addClass('piel--active');
    var cabezaEnAvatar = $('.avatar__cabeza').attr('src');
    var srcCabeza = cabezaEnAvatar.split("cabeza-" + app.genero + "-")[0] + "cabeza-" + app.genero + "-" + pielSeleccionada + ".png";
    var nuevaCabezaState = {
        puesta: true,
        object: {
            id: "cabeza-" + genero + "-" + pielSeleccionada,
            src: srcCabeza,
            tipo: "cabeza"
        }
    };
    app.estado.avatar.cabeza = nuevaCabezaState;
    $('.avatar__cabeza').prop('src', srcCabeza);
});

