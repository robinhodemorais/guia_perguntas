const express = require("express");
const app = express();

//estou dizendo para express usar o EJS como View Engine
app.set('view engine','ejs');

app.get("/",(req,res) => {
    res.render("index");
});

app.listen(8080,() => {
    console.log("App rodando!");
})