const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(bodyParser.json());

const port = 5000;

app.listen(port,()=>{
    console.log('Server running on port',port);
})


console.log('Node working');