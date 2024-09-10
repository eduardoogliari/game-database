const express = require('express');
const logger = require('morgan');
const path = require('path');
const ip = require('ip');
const app = express();

const web_host = process.env.WEB_HOST;
const web_port = process.env.WEB_PORT;
const port = process.env.PORT;

app.use( logger("dev") );

app.use(express.static(path.join(__dirname, '/public')));
// console.log(path.join(__dirname, '/public'));
// console.log(path.join(__dirname, '/public', 'index.html'));

app.get('/', (req, res) => {
    // res.sendFile( path.join(__dirname, '/public', 'index.html') );
    res.sendFile('index.html');
});

app.listen( port );

console.log(`
FRONTEND: Escutando em ${ip.address()}:${port}
`);
