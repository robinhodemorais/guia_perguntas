const express = require("express");
const app = express();

//estou dizendo para express usar o EJS como View Engine
app.set('view engine','ejs');
//seta para usar os arquivos staticos, html, css, js, imagens e etc
//public é a pasta onde fica os arquivos estaticos
app.use(express.static('public'));

app.get("/:nome/:lang",(req,res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibitMsg = false;

    var produtos = [
        {nome:"Doritos",preco: 5.90},
        {nome:"Coca-Cola",preco: 7.50},
        {nome:"Leite",preco: 4.99},
        {nome:"Carne",preco: 24.99},
        {nome:"ReBull",preco: 7.99},
        {nome:"Café",preco: 5.99}
    ];

    res.render("index", {
        nome:nome,
        lang:lang,
        empresa:"Guia do Programador",
        inscritos:8000,
        msg:exibitMsg,
        produtos:produtos
    });
});

app.listen(8080,() => {
    console.log("App rodando!");
})