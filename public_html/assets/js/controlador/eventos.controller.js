function allowDrop(ev) {
    ev.preventDefault();
}

drag = function (ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("object"));
    if (app.estado.avatar[data.tipo].puesta === false) {
        var img = document.createElement('img');
        $(img).prop('tipo', data.tipo);
        img.src = data.src;
        img.setAttribute('id', data.id);
        $(img).addClass('avatar');
        $(ev.target.parentNode).prepend(img);
    } else {
        $('#' + app.estado.avatar[data.tipo].object.id).remove();
        var img = document.createElement('img');
        $(img).prop('tipo', data.tipo);
        img.src = data.src;
        img.setAttribute('id', data.id);
        $(img).addClass('avatar');
        $(ev.target.parentNode).prepend(img);

    }
    app.estado.avatar[data.tipo] = {object: data, puesta: true};
}