const express = require('express');
const logger  = require('morgan');
const ip      = require('ip');
const {Pool}  = require('pg');
const app     = express();

const port        = process.env.PORT;
const db_user     = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const hostname    = process.env.DB_HOST;
const db_port     = process.env.DB_PORT;
const db_name     = process.env.DB_NAME;

const pool = new Pool({
    user:       db_user,
    password:   db_password,
    host:       hostname,
    port:       db_port,
    database:   db_name,
});

app.use(logger("dev"));

app.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jogo");
        res.json(result);
    } catch(err) {
        console.error(err);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(port);

console.log(`
---------------------------------------------\n
Acessivel no endereco ${ip.address()}:${port}\n
---------------------------------------------
`);