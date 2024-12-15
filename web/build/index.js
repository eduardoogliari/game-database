"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express = require('express');
const logger = require('morgan');
const ip = require('ip');
// const Pool : Pool             = require('pg');
const path = require('path');
const cors = require('cors');
const app = express();
const plataformasHandler = require('./routes/plataformas');
const jogosHandler = require('./routes/jogos');
const empresasHandler = require('./routes/empresas');
const generosHandler = require('./routes/generos');
const port = process.env.PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const hostname = process.env.DB_HOST;
const db_port = Number(process.env.DB_PORT);
const db_name = process.env.DB_NAME;
const pool = new pg_1.Pool({
    user: db_user,
    password: db_password,
    host: hostname,
    port: db_port,
    database: db_name,
});
app.use(logger("dev"));
app.use(cors({ exposedHeaders: 'Total-Item-Count, Total-Pages, Page-Index, Page-Size' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(404);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro interno do servidor");
    }
}));
app.use('/plataformas', plataformasHandler(pool));
app.use('/jogos', jogosHandler(pool));
app.use('/empresas', empresasHandler(pool));
app.use('/generos', generosHandler(pool));
app.listen(port);
console.log(`
---------------------------------------------\n
Acessivel no endereco ${ip.address()}:${port}\n
---------------------------------------------
`);
//# sourceMappingURL=index.js.map