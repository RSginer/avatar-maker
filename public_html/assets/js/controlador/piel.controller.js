var app = app;
cambiarPiel = function (botonPiel) {
    var pielSeleccionada = botonPiel.className.split("piel__suntan-")[1].split(" ")[0];
    $('.piel').removeClass('piel--active');
    $('.piel__suntan-' + pielSeleccionada).addClass('piel--active');
    var cabezaEnAvatar = $('.avatar__cabeza').attr('src');
    var srcCabeza = cabezaEnAvatar.split("cabeza-" + app.genero + "-")[0] + "cabeza-" + app.genero + "-" + pielSeleccionada + ".png";
    app.estado.avatar.cabeza.puesta = true;
    app.estado.avatar.cabeza.object = {
        id: "cabeza-" + genero + "-" + pielSeleccionada,
        src: srcCabeza,
        tipo: "cabeza"
    };
    app.estado.avatar.cabeza.element = $('.avatar__cabeza');
    $('.avatar__cabeza').prop('src', srcCabeza);

};