function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.src);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var img = document.createElement('img');
    img.src = data;
    $(img).addClass('avatar');
    $(ev.target.parentNode).prepend(img);
}