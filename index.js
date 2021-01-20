const express = require("express");
const app = express();

//estou dizendo para express usar o EJS como View Engine
app.set('view engine','ejs');

app.get("/:nome/:lang",(req,res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;

    res.render("index", {
        nome:nome,
        lang:lang,
        empresa:"Guia do Programador",
        inscritos:8000
    });
});

app.listen(8080,() => {
    console.log("App rodando!");
})