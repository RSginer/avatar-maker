
Object.observe(app.estado, function (changes) {
    console.log(" ");
    console.log(" %c ¡ESTADO GENERAL ACTUALIZADO! ", 'font-weight: bold; color: white; font-size: 1.5em;border: 1px solid black;padding:15px;margin:5px;background-color:grey;width:100%;border-radius:4px;');
        console.log(" ");
    for (var i = 0; i < changes.length; i++) {
        console.log("%c PROPIEDAD => " + changes[i].name, 'color: #0085d2');
        console.log("%c ANTIGUO VALOR => " + JSON.stringify(changes[i].oldValue), 'color: grey');
        console.log("%c NUEVO VALOR => " + JSON.stringify(changes[i].object[changes[i].name]), 'color: darkgreen');
    }
    // console.log("%c AppState:" + JSON.stringify(changes[changes.length -1].object, undefined, 3), 'color: grey');
});
Object.observe(app.estado.avatar, function (changes) {
    console.log(" ");
    console.log(" %c ¡AVATAR ACTUALIZADO! ", 'font-weight: bold; color: yellowgreen; font-size: 1.5em;border: 1px solid black;padding:15px;margin:5px;background-color:#222222;width:100%;border-radius:4px;');
    console.log(" ");
    for (var i = 0; i < changes.length; i++) {
        console.log("%c PROPIEDAD => " + changes[i].name, 'color: #0085d2');
        console.log("%c ANTIGUO VALOR => " + JSON.stringify(changes[i].oldValue, undefined, 3), 'color: grey');
        console.log("%c NUEVO VALOR => " + JSON.stringify(changes[i].object[changes[0].name], undefined, 3), 'color: darkgreen');
    }
    // console.log("%c AppState:" + JSON.stringify(changes[changes.length -1].object, undefined, 3), 'color: grey');
});