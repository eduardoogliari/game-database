import { Express, Router, Request, Response } from "express";
const express = require('express');
// const { escapeIdentifier } = require('pg');
// const format = require('pg-format');
import { Pool } from "pg";
import format from "pg-format";
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool : Pool) {
    const router : Router = express.Router();
    const port = process.env.PORT;

    router.get('/', async (req : Request, res : Response) => {

        try {
            const sortAttribute = validateQueryAttribute( req.query.sortBy, 'nome' );
            const sortOrder     = validateQuerySortOrder(req.query.sortOrder);

            let limitOption   = Number.parseInt(req.query.limit?.toString() ?? '');
            limitOption   = isNaN(limitOption) ? 50 : limitOption;

            let pageOption    = Number.parseInt(req.query.pagina?.toString() ?? '');
            pageOption = isNaN(pageOption) ? 1 : pageOption;

            const nomeEmpresa   = req.query.nome;

            const whereQuery = (nomeEmpresa)
                                    ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomeEmpresa + '%' )
                                    : '';

            const query = `SELECT id, nome, logo_url, descricao FROM empresa ${whereQuery}`;



            const contagemResult = await pool.query(`SELECT COUNT(*) AS contagem FROM (${query}) AS q` );
            const contagem       = contagemResult.rows[0].contagem;
            const pageSize       = limitOption;
            const pageTotalCount = (pageSize > 0) ? Math.ceil(contagem / pageSize) : 1;
            const currentPage    = (pageOption > pageTotalCount) ? pageTotalCount : pageOption;
            const offset         = (currentPage > 1) ? pageSize * (currentPage - 1) : 0;

            const result = await pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offset]);

            let empresas = [];
            for( const row of result.rows ) {
                empresas.push({
                    'id': row.id,
                    'nome': row.nome,
                    'logo_url': 'http://localhost:' + port + '/' + row.logo_url,
                    'descricao': row.descricao,
                });
            }
            // for( let i = 0; i < result.rowCount; ++i ) {
            //     empresas.push({
            //         'id' : result.rows[i].id,
            //         'nome': result.rows[i].nome,
            //         'logo_url': 'http://localhost:' + port + '/' +result.rows[i].logo_url,
            //         'descricao': result.rows[i].descricao,
            //     });
            // }

            res.status(200)
                .set({
                    'Content-Type': 'application/json',
                    'Total-Item-Count': contagem,
                    'Total-Pages': pageTotalCount,
                    'Page-Size': pageSize,
                    'Page-Index': currentPage,
                })
                .send(empresas);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:empresaId', async (req, res) => {
        try {
            const id           = req.params.empresaId;
            const result = await pool.query("SELECT id, nome, logo_url, descricao FROM empresa WHERE empresa.id=$1", [id]);
            let empresa = {
                'id' : undefined,
                'nome' : '',
                'logo_url' : '',
                'descricao' : ''
            };

            if( result.rowCount && result.rowCount > 0 ) {
                empresa.id = result.rows[0].id;
                empresa.nome = result.rows[0].nome;
                empresa.logo_url = 'http://localhost:' + port + '/' + result.rows[0].logo_url;
                empresa.descricao = result.rows[0].descricao;
            }

            res.status(200).send(empresa);

        } catch (e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};