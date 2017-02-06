PiezasApi = function(genero){
    this.genero = genero;
    this.url = "server/" + genero + ".json";
};

PiezasApi.prototype.find = function(){
    return $.ajax({
        url: this.url,
        type: "get"
    });
};