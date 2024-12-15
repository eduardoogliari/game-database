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
const express = require('express');
const { escapeIdentifier } = require('pg');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');
module.exports = function (pool) {
    const router = express.Router();
    const port = process.env.PORT;
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const sortAttribute = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder = validateQuerySortOrder(req.query.sortOrder);
            // const limitOption = Number.isInteger(parseInt(req.query.limit)) ? req.query.limit : '50';
            // const pageOption = Number.isInteger(parseInt(req.query.pagina)) ? req.query.pagina : '1';
            let limitOption = Number.parseInt((_b = (_a = req.query.limit) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
            limitOption = isNaN(limitOption) ? 50 : limitOption;
            let pageOption = Number.parseInt((_d = (_c = req.query.pagina) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '');
            pageOption = isNaN(pageOption) ? 1 : pageOption;
            const nomeGenero = req.query.nome;
            const whereQuery = (nomeGenero)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomeGenero + '%')
                : '';
            const query = `SELECT id, nome, abreviacao FROM genero ${whereQuery}`;
            const contagemResult = yield pool.query(`SELECT COUNT(*) AS contagem FROM (${query}) AS q`);
            const contagem = contagemResult.rows[0].contagem;
            const pageSize = limitOption;
            const pageTotalCount = (pageSize > 0) ? Math.ceil(contagem / pageSize) : 1;
            const currentPage = (pageOption > pageTotalCount) ? pageTotalCount : pageOption;
            const offset = (currentPage > 1) ? pageSize * (currentPage - 1) : 0;
            const result = yield pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offset]);
            let generos = [];
            // for (let i = 0; i < result.rowCount; ++i) {
            for (const row of result.rows) {
                generos.push({
                    'id': row.id,
                    'nome': row.nome,
                    'abreviacao': row.abreviacao,
                });
            }
            res.status(200)
                .set({
                'Content-Type': 'application/json',
                'Total-Item-Count': contagem,
                'Total-Pages': pageTotalCount,
                'Page-Size': pageSize,
                'Page-Index': currentPage,
            })
                .send(generos);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    }));
    router.get('/:generoId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.generoId;
            const result = yield pool.query("SELECT id, nome, abreviacao FROM genero WHERE genero.id=$1", [id]);
            let genero = { id: undefined, nome: '', abreviacao: '' };
            if (result.rowCount && result.rowCount > 0) {
                genero.id = result.rows[0].id;
                genero.nome = result.rows[0].nome;
                genero.abreviacao = result.rows[0].abreviacao;
            }
            res.status(200).send(genero);
        }
        catch (e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    }));
    return router;
};
//# sourceMappingURL=generos.js.map