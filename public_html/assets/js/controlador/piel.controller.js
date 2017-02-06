var app = app;

$('.piel').on('click', function () {
    var pielSeleccionada = this.className.split("piel__suntan-")[1].split(" ")[0];
    $('.piel').removeClass('piel--active');
    $('.piel__suntan-' + pielSeleccionada).addClass('piel--active');
    var cabezaEnAvatar = $('.avatar__cabeza').attr('src');
    var srcCabeza = cabezaEnAvatar.split("cabeza-" + app.estado.genero + "-")[0] + "cabeza-" + app.estado.genero + "-" + pielSeleccionada + ".png";
    var nuevaCabeza = new Pieza(true, "cabeza-" + app.estado.genero + "-" + pielSeleccionada, srcCabeza, "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
    $('.avatar__cabeza').prop('src', srcCabeza);
});

