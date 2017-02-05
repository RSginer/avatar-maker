
Object.observe(app.estado, function (changes) {
    console.log(" %c ¡ESTADO GENERAL ACTUALIZADO! ", 'font-weight: bold; color: black; font-size: 1.5em');
    for (var i = 0; i < changes.length; i++) {
        console.log("%c PROPIEDAD => " + changes[i].name, 'color: #0085d2');
        console.log("%c ANTIGUO VALOR => " + JSON.stringify(changes[i].oldValue), 'color: grey');
        console.log("%c NUEVO VALOR => " + JSON.stringify(changes[i].object[changes[0].name]), 'color: darkgreen');
    }
    // console.log("%c AppState:" + JSON.stringify(changes[changes.length -1].object, undefined, 3), 'color: grey');
});
Object.observe(app.estado.avatar, function (changes) {
    console.log(" %c ¡ESTADO DE AVATAR ACTUALIZADO! ", 'font-weight: bold; color: orange; font-size: 1.5em');
    for (var i = 0; i < changes.length; i++) {
        console.log("%c PROPIEDAD => " + changes[i].name, 'color: #0085d2');
        console.log("%c ANTIGUO VALOR => " + JSON.stringify(changes[i].oldValue, undefined, 3), 'color: grey');
        console.log("%c NUEVO VALOR => " + JSON.stringify(changes[i].object[changes[0].name], undefined, 3), 'color: darkgreen');
    }
    // console.log("%c AppState:" + JSON.stringify(changes[changes.length -1].object, undefined, 3), 'color: grey');
});