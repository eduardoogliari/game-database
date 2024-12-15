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
            const nomePlataforma = req.query.nome;
            const whereQuery = (nomePlataforma)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomePlataforma + '%')
                : '';
            const query = `SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma \
                ${whereQuery}`;
            const contagemResult = yield pool.query(`SELECT COUNT(*) AS contagem FROM (${query}) AS q`);
            const contagem = contagemResult.rows[0].contagem;
            const pageSize = limitOption;
            const pageTotalCount = (pageSize > 0) ? Math.ceil(contagem / pageSize) : 1;
            const currentPage = (pageOption > pageTotalCount) ? pageTotalCount : pageOption;
            const offset = (currentPage > 1) ? pageSize * (currentPage - 1) : 0;
            const result = yield pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offset]);
            let plataformas = [];
            // for (let i = 0; i < result.rowCount; ++i) {
            for (const row of result.rows) {
                plataformas.push({
                    'id': row.id,
                    'nome': row.nome,
                    'nome_popular': row.nome_popular,
                    'abreviacao': row.abreviacao,
                    'foto_url': 'http://localhost:' + port + '/' + row.foto_url,
                    'descricao': row.descricao,
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
                .send(plataformas);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    }));
    router.get('/:plataformaId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.plataformaId;
            const result = yield pool.query("SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma WHERE plataforma.id=$1", [id]);
            let plataforma = {
                'id': undefined,
                'nome': '',
                'nome_popular': '',
                'abreviacao': '',
                'foto_url': '',
                'descricao': '',
            };
            if (result.rowCount && result.rowCount > 0) {
                plataforma.id = result.rows[0].id;
                plataforma.nome = result.rows[0].nome;
                plataforma.nome_popular = result.rows[0].nome_popular;
                plataforma.abreviacao = result.rows[0].abreviacao;
                plataforma.foto_url = 'http://localhost:' + port + '/' + result.rows[0].foto_url;
                plataforma.descricao = result.rows[0].descricao;
            }
            res.status(200).send(plataforma);
        }
        catch (e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    }));
    return router;
};
//# sourceMappingURL=plataformas.js.map