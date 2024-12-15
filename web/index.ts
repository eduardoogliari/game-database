import { Express } from "express";
import { Pool } from "pg";
const express            = require('express');
const logger             = require('morgan');
const ip                 = require('ip');
// const Pool : Pool             = require('pg');
const path               = require('path');
// const cors               = require('cors');
import cors from "cors";
import { CorsOptions } from "cors";
const app : Express      = express();
const plataformasHandler = require('./routes/plataformas');
const jogosHandler       = require('./routes/jogos');
const empresasHandler    = require('./routes/empresas');
const generosHandler     = require('./routes/generos');

const port        = process.env.PORT;
const db_user     = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const hostname    = process.env.DB_HOST;
const db_port     = Number(process.env.DB_PORT);
const db_name     = process.env.DB_NAME;

const pool : Pool = new Pool({
    user:       db_user,
    password:   db_password,
    host:       hostname,
    port:       db_port,
    database:   db_name,
});

const corsOptions: CorsOptions = { exposedHeaders: 'Total-Item-Count, Total-Pages, Page-Index, Page-Size' };

app.use(logger("dev"));
// app.use(cors({ exposedHeaders: 'Total-Item-Count, Total-Pages, Page-Index, Page-Size' }) );
app.use(cors(corsOptions) );
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }) );

app.get('/', async (req, res) => {
    try {
        res.sendStatus(404);
    } catch(err) {
        console.error(err);
        res.status(500).send("Erro interno do servidor");
    }
});

app.use('/plataformas', plataformasHandler(pool) );
app.use('/jogos',  jogosHandler(pool));
app.use('/empresas', empresasHandler(pool));
app.use('/generos', generosHandler(pool));

app.listen(port);

console.log(`
---------------------------------------------\n
Acessivel no endereco ${ip.address()}:${port}\n
---------------------------------------------
`);