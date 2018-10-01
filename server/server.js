const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');

app.use(express.static('server/public'));
app.use(bodyParser.json());

const port = 5000;

app.listen(port,()=>{
    console.log('Server running on port',port);
})

//routes

app.get('/messageBoard',(req,res)=>{
    pool.query(`SELECT * FROM "messages";`).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET:',error);
    })
})

app.post('/messageBoard',(req,res)=>{
    pool.query(`INSERT INTO "messages"
    ("name", "message") VALUES 
    ($1,$2);`,[req.body.name,req.body.message]).then((results)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in POST:',error);
    });
})

