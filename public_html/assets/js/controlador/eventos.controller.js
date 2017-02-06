validarFormularioInicial = function () {
    var valor = $(this).val();
    if (valor.length > 0) {
        $('#boton-jugar').removeAttr('disabled');
    } else {
        $('#boton-jugar').prop("disabled", true);
    }
}

iniciarJuego = function () {
    app.estado.playerName = $('#input-nombre').val();
    $('#modal').modal('hide');
    app.__init();
}

abrirModalDeInicio = function () {
    $('#modal').modal('show');
};

allowDrop = function (ev) {
    ev.preventDefault();
}

dragPieza = function (ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

dropAvatar = function (ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("object"));
    if (app.estado.avatar[data.tipo].puesta === true) {
        document.getElementById(app.estado.avatar[data.tipo].object.id).setAttribute('id', data.id);
        document.getElementById(data.id).setAttribute('src', data.src);
    } else {
        var imagen = factoryImagen(data);
        $(ev.target.parentNode).prepend(imagen);
    }
    app.estado.avatar[data.tipo] = {object: data, puesta: true};
}

factoryImagen = function (data) {
    var imagen = document.createElement('img');
    $(imagen).prop('tipo', data.tipo);
    imagen.src = data.src;
    imagen.setAttribute('id', data.id);
    $(imagen).addClass('avatar');
    return imagen;
}

cambiarPiel = function () {
    var pielSeleccionada = this.className.split("piel__suntan-")[1].split(" ")[0];
    $('.piel').removeClass('piel--active');
    $('.piel__suntan-' + pielSeleccionada).addClass('piel--active');
    var cabezaEnAvatar = $('.avatar__cabeza').attr('src');
    var srcCabeza = cabezaEnAvatar.split("cabeza-" + app.estado.genero + "-")[0] + "cabeza-" + app.estado.genero + "-" + pielSeleccionada + ".png";
    var nuevaCabeza = new Pieza(true, "cabeza-" + app.estado.genero + "-" + pielSeleccionada, srcCabeza, "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
    $('.avatar__cabeza').prop('src', srcCabeza);
}


$('.piel').on('click', cambiarPiel);
$('#start-button').on('click', abrirModalDeInicio);
$('#boton-jugar').on('click', iniciarJuego);
$('#input-nombre').on('change', validarFormularioInicial);
