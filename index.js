const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//Modulos
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    //raw significa cru, só trazer os dados e não as demais 
    //informações do banco
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] //ASC = Crescente, DESC = Decrescente
    ]}).then(perguntas => {
        //console.log(perguntas);
        res.render("index",{
            perguntas: perguntas
        });
    });    
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

app.get("/pergunta/:id",(req,res)=> {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        //quando acha a pergunta chama o then
        if (pergunta != undefined) {//se for diferente, achou

            //busca a resposta da pergunta para exibir
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                //pagina que vai exibir
                res.render("pergunta",{
                    //passa para a view a variavel pergunta para recuperar no html
                    pergunta: pergunta,
                    respostas:respostas
                });
            });

        } else { //se não achou
            //se não achou vai para pagina principal
            res.redirect("/");
        }
    });
});

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
       corpo: corpo,
       perguntaId: perguntaId 
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080,() => {
    console.log("App rodando!");
})