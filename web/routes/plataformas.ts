import { Router } from "express";
import { Pool } from "pg";
const express = require('express');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');


module.exports = function(pool : Pool) {
    const router : Router = express.Router();
    const port = process.env.PORT;

    router.get('/', async (req, res) => {
        try {
            const sortAttribute = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder     = validateQuerySortOrder(req.query.sortOrder);
            // const limitOption = Number.isInteger(parseInt(req.query.limit)) ? req.query.limit : '50';
            // const pageOption = Number.isInteger(parseInt(req.query.pagina)) ? req.query.pagina : '1';

            let limitOption = Number.parseInt(req.query.limit?.toString() ?? '');
            limitOption = isNaN(limitOption) ? 50 : limitOption;

            let pageOption = Number.parseInt(req.query.pagina?.toString() ?? '');
            pageOption = isNaN(pageOption) ? 1 : pageOption;

            const nomePlataforma = req.query.nome;

            const whereQuery = (nomePlataforma)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomePlataforma + '%')
                : '';

            const query = `SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma \
                ${ whereQuery }`;

            const contagemResult = await pool.query(`SELECT COUNT(*) AS contagem FROM (${query}) AS q`);
            const contagem       = contagemResult.rows[0].contagem;
            const pageSize       = limitOption;
            const pageTotalCount = (pageSize > 0) ? Math.ceil(contagem / pageSize) : 1;
            const currentPage    = (pageOption > pageTotalCount) ? pageTotalCount : pageOption;
            const offset         = (currentPage > 1) ? pageSize * (currentPage - 1) : 0;

            const result = await pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offset]);

            let plataformas = [];
            // for (let i = 0; i < result.rowCount; ++i) {
            for( const row of result.rows ) {
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

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:plataformaId', async (req, res) => {
        try {
            const id = req.params.plataformaId;
            const result = await pool.query("SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma WHERE plataforma.id=$1", [id]);

            let plataforma = {
                'id': undefined,
                'nome': '',
                'nome_popular': '',
                'abreviacao': '',
                'foto_url': '',
                'descricao': '',
            };

            if (result.rowCount && result.rowCount > 0) {
                plataforma.id           = result.rows[0].id;
                plataforma.nome         = result.rows[0].nome;
                plataforma.nome_popular = result.rows[0].nome_popular;
                plataforma.abreviacao   = result.rows[0].abreviacao;
                plataforma.foto_url = 'http://localhost:' + port + '/' +result.rows[0].foto_url;
                plataforma.descricao    = result.rows[0].descricao;
            }
            res.status(200).send(plataforma);

        } catch(e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};