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
        $(img).addClass('avatar');
        $(ev.target.parentNode).prepend(img);
    }else{
       console.log($('img[tipo=' + data.tipo + ']').attr('src'));
    }

    switch (data.tipo) {
        case 'ojos':
        {
            app.estado.avatar.ojos = {
                object: data,
                puesta: true
            }
            break
        }
        case 'pelos':
        {
            app.estado.avatar.pelos = {
                object: data,
                puesta: true
            }
            break;
        }
        case 'bocas':
        {
            app.estado.avatar.bocas = {
                object: data,
                puesta: true
            }
            break;
        }
        default:
            break;
    }

}