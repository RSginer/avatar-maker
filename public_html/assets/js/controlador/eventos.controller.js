function allowDrop(ev) {
    ev.preventDefault();
}

drag = function (ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

function drop(ev) {
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

function factoryImagen(data) {
    var imagen = document.createElement('img');
    $(imagen).prop('tipo', data.tipo);
    imagen.src = data.src;
    imagen.setAttribute('id', data.id);
    $(imagen).addClass('avatar');
    return imagen;
}