const { urlencoded } = require("body-parser");
const express = require("express");
const path = require('path');

const app = express();

//to handle form data 
//'content-type' : application/X-www-form-urlencoded
const whitelist =   ['https://www.youtube.com','http://localhost:8080','http://127.0.0.1:8080'];

const corsOptions = {
    origin : (origin ,callback)=>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true)

        }else{
            callback(new Error('Not allowed by CORS policy  '))
        }


    },
    optionsSuccessStatus : 200
}
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.static("public"))

app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send(err.message)
})


app.get('^/$|index(1)?',(req,res)=>{
    // res.sendFile('./views/index.html',{  root: __dirname})

    res.sendFile(path.join(__dirname,'views','index1.html'))

    console.log({  root: __dirname})
})
app.get('/index2',(req,res)=>{
    // res.sendFile('./views/index.html',{  root: __dirname})

    res.sendFile(path.join(__dirname,'views','index2.html'))

    console.log({  root: __dirname})
})
app.get('/index3',(req,res)=>{
    res.redirect('/index2').status(301).send('NOT OK')
})
app.get('/*' ,(req,res)=>{

    res.status(404).sendFile(path.join(__dirname,"views","404.html"))
})


app.listen(8080,()=>{console.log("server is running on PORT : 8080")}) 

//301 - new location permanently 302 temporeily