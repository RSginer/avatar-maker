function allowDrop(ev) {
    ev.preventDefault();
}

drag = function (ev) {
    ev.preventDefault();
    alert("Hello");

    ev.dataTransfer.setData("text", $(this).data("object"));

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    var img = document.createElement('img');
    img.src = data;
    $(img).addClass('avatar');
    $(ev.target.parentNode).prepend(img);
}