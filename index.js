const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

connection
    .authenticate()
    .then(()=> {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

//estou dizendo para express usar o EJS como View Engine
app.set('view engine','ejs');
//seta para usar os arquivos staticos, html, css, js, imagens e etc
//public é a pasta onde fica os arquivos estaticos
app.use(express.static('public'));
//habilita o bodyParser no Express
app.use(bodyParser.urlencoded({extended:false}));
//permite que le os dados via json
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/perguntar",(req,res)=> {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    //console.log(req.body);
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        title:titulo,
        description:descricao
    }).then(()=> {
        //redireciona para uma pagina
        res.redirect("/");
    });
});

app.listen(8080,() => {
    console.log("App rodando!");
})