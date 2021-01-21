const express = require("express");
const app = express();

//estou dizendo para express usar o EJS como View Engine
app.set('view engine','ejs');
//seta para usar os arquivos staticos, html, css, js, imagens e etc
//public é a pasta onde fica os arquivos estaticos
app.use(express.static('public'));

app.get("/",(req,res) => {


    res.render("index");
});

app.get("/perguntar",(req,res)=> {
    res.render("perguntar");
});

app.listen(8080,() => {
    console.log("App rodando!");
})